-- =====================================================================
-- 0018_resume_and_dashboard_analytics.sql
--
-- Adds:
-- 1. Exact lesson resume state
-- 2. save_lesson_progress() RPC
-- 3. Richer dashboard analytics
-- 4. Zero-valued skills for new users
-- 5. Recently completed lessons for review
-- =====================================================================


-- ---------------------------------------------------------------------
-- Resume information for unfinished lessons
-- ---------------------------------------------------------------------

alter table public.user_lesson_progress
  add column if not exists last_content_block_id uuid
  references public.lesson_content_blocks(id)
  on delete set null;

alter table public.user_lesson_progress
  add column if not exists last_activity_at timestamptz;


create index if not exists idx_user_lesson_progress_resume
  on public.user_lesson_progress(user_id, status, last_activity_at desc);


-- ---------------------------------------------------------------------
-- save_lesson_progress()
--
-- Called while a learner is moving through a lesson.
--
-- This DOES NOT complete the lesson or award XP.
-- complete_lesson() remains responsible for completion + XP.
-- ---------------------------------------------------------------------

create or replace function public.save_lesson_progress(
  p_lesson_id uuid,
  p_progress_percentage numeric default 0,
  p_last_content_block_id uuid default null,
  p_time_spent_seconds integer default 0
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_unit_id uuid;
  v_level_id uuid;
  v_existing_status progress_status;
  v_progress numeric;
begin

  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;


  if p_time_spent_seconds < 0 then
    raise exception 'Time spent cannot be negative';
  end if;


  /*
   * Completion must always go through complete_lesson().
   * That protects XP from being awarded incorrectly.
   */
  v_progress := greatest(
    0,
    least(coalesce(p_progress_percentage, 0), 99.99)
  );


  -- Validate lesson and full publish chain
  select
    l.unit_id,
    u.level_id
  into
    v_unit_id,
    v_level_id
  from public.lessons l
  join public.units u
    on u.id = l.unit_id
  join public.levels lv
    on lv.id = u.level_id
  where l.id = p_lesson_id
    and l.is_published = true
    and u.is_published = true
    and lv.is_published = true;


  if v_unit_id is null then
    raise exception 'Lesson not found or not published';
  end if;


  -- If a content block was supplied, ensure it belongs to this lesson.
  if p_last_content_block_id is not null then

    if not exists (
      select 1
      from public.lesson_content_blocks
      where id = p_last_content_block_id
        and lesson_id = p_lesson_id
    ) then
      raise exception 'Content block does not belong to this lesson';
    end if;

  end if;


  select status
  into v_existing_status
  from public.user_lesson_progress
  where user_id = v_user_id
    and lesson_id = p_lesson_id;


  /*
   * Do not turn a completed lesson back into an unfinished lesson.
   */
  if v_existing_status = 'COMPLETED' then

    return jsonb_build_object(
      'lesson_id', p_lesson_id,
      'status', 'COMPLETED',
      'progress_percentage', 100
    );

  end if;


  -- Save lesson progress
  insert into public.user_lesson_progress (
    user_id,
    lesson_id,
    status,
    progress_percentage,
    started_at,
    time_spent_seconds,
    last_content_block_id,
    last_activity_at
  )
  values (
    v_user_id,
    p_lesson_id,
    'IN_PROGRESS',
    v_progress,
    now(),
    p_time_spent_seconds,
    p_last_content_block_id,
    now()
  )

  on conflict (user_id, lesson_id)
  do update set

    status = 'IN_PROGRESS',

    progress_percentage =
      greatest(
        public.user_lesson_progress.progress_percentage,
        excluded.progress_percentage
      ),

    started_at =
      coalesce(
        public.user_lesson_progress.started_at,
        excluded.started_at
      ),

    time_spent_seconds =
      public.user_lesson_progress.time_spent_seconds
      + excluded.time_spent_seconds,

    last_content_block_id =
      coalesce(
        excluded.last_content_block_id,
        public.user_lesson_progress.last_content_block_id
      ),

    last_activity_at = now();


  -- Mark the parent unit as started.
  insert into public.user_unit_progress (
    user_id,
    unit_id,
    status,
    progress_percentage,
    started_at
  )
  values (
    v_user_id,
    v_unit_id,
    'IN_PROGRESS',
    0,
    now()
  )
  on conflict (user_id, unit_id)
  do nothing;


  -- Mark the parent level as started.
  insert into public.user_level_progress (
    user_id,
    level_id,
    status,
    progress_percentage,
    started_at
  )
  values (
    v_user_id,
    v_level_id,
    'IN_PROGRESS',
    0,
    now()
  )
  on conflict (user_id, level_id)
  do nothing;


  -- Remember which level the learner is currently studying.
  update public.profiles
  set
    current_level_id = v_level_id,
    last_studied_at = now()
  where id = v_user_id;


  return jsonb_build_object(
    'lesson_id', p_lesson_id,
    'status', 'IN_PROGRESS',
    'progress_percentage', v_progress,
    'last_content_block_id', p_last_content_block_id
  );

end;
$$;


revoke execute
on function public.save_lesson_progress(uuid, numeric, uuid, integer)
from public;

grant execute
on function public.save_lesson_progress(uuid, numeric, uuid, integer)
to authenticated;


-- =====================================================================
-- Rich dashboard RPC
-- =====================================================================

create or replace function public.get_user_dashboard()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare

  v_user_id uuid := auth.uid();

  v_profile record;

  v_completed_units integer := 0;
  v_completed_lessons integer := 0;

  v_total_units integer := 0;
  v_total_lessons integer := 0;

  v_current_level jsonb;
  v_current_unit jsonb;

  v_resume_lesson jsonb;

  v_next_recommended jsonb;
  v_recent_completed jsonb;

  v_rewards jsonb;
  v_skills jsonb;
  v_recent_activity jsonb;

  v_overall_pct numeric := 0;

  v_today_goal_row record;
  v_today_goal jsonb;

  v_time_studied_today_seconds integer := 0;
  v_total_time_studied_seconds integer := 0;

begin

  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;


  select *
  into v_profile
  from public.profiles
  where id = v_user_id;


  if v_profile.id is null then
    raise exception 'Profile not found';
  end if;


  -- -------------------------------------------------------------------
  -- Curriculum totals
  -- -------------------------------------------------------------------

  select count(*)
  into v_total_units
  from public.units u
  join public.levels lv
    on lv.id = u.level_id
  where u.is_published = true
    and lv.is_published = true;


  select count(*)
  into v_total_lessons
  from public.lessons l
  join public.units u
    on u.id = l.unit_id
  join public.levels lv
    on lv.id = u.level_id
  where l.is_published = true
    and u.is_published = true
    and lv.is_published = true;


  -- -------------------------------------------------------------------
  -- Completed counts
  -- -------------------------------------------------------------------

  select count(*)
  into v_completed_units
  from public.user_unit_progress
  where user_id = v_user_id
    and status = 'COMPLETED';


  select count(*)
  into v_completed_lessons
  from public.user_lesson_progress
  where user_id = v_user_id
    and status = 'COMPLETED';


  -- -------------------------------------------------------------------
  -- Current level
  -- -------------------------------------------------------------------

  select jsonb_build_object(
    'id', lv.id,
    'title', lv.title,
    'level_order', lv.level_order
  )
  into v_current_level
  from public.levels lv
  where lv.id = coalesce(
    v_profile.current_level_id,

    (
      select ulp.level_id
      from public.user_level_progress ulp
      where ulp.user_id = v_user_id
      order by
        coalesce(
          ulp.started_at,
          ulp.completed_at
        ) desc nulls last
      limit 1
    )
  );


  -- -------------------------------------------------------------------
  -- Current unit
  -- -------------------------------------------------------------------

  select jsonb_build_object(
    'id', u.id,
    'title', u.title,
    'unit_order', u.unit_order,
    'progress_percentage', uup.progress_percentage
  )
  into v_current_unit
  from public.user_unit_progress uup
  join public.units u
    on u.id = uup.unit_id
  where uup.user_id = v_user_id
    and uup.status = 'IN_PROGRESS'
  order by uup.started_at desc nulls last
  limit 1;


  -- -------------------------------------------------------------------
  -- Exact lesson the learner stopped at
  -- -------------------------------------------------------------------

  select jsonb_build_object(

    'id', l.id,

    'title', l.title,

    'lesson_type', l.lesson_type,

    'estimated_minutes', l.estimated_minutes,

    'xp_reward', l.xp_reward,

    'unit_id', u.id,

    'unit_title', u.title,

    'level_id', lv.id,

    'level_title', lv.title,

    'progress_percentage',
      ulp.progress_percentage,

    'time_spent_seconds',
      ulp.time_spent_seconds,

    'last_content_block_id',
      ulp.last_content_block_id,

    'last_content_block_order',
      lcb.block_order,

    'last_activity_at',
      ulp.last_activity_at

  )
  into v_resume_lesson

  from public.user_lesson_progress ulp

  join public.lessons l
    on l.id = ulp.lesson_id

  join public.units u
    on u.id = l.unit_id

  join public.levels lv
    on lv.id = u.level_id

  left join public.lesson_content_blocks lcb
    on lcb.id = ulp.last_content_block_id

  where ulp.user_id = v_user_id

    and ulp.status = 'IN_PROGRESS'

    and l.is_published = true

    and u.is_published = true

    and lv.is_published = true

  order by
    ulp.last_activity_at desc nulls last,
    ulp.started_at desc nulls last

  limit 1;


  -- -------------------------------------------------------------------
  -- Recommended lessons
  --
  -- Published lessons not already completed.
  -- Ordered according to the actual curriculum.
  -- -------------------------------------------------------------------

  select
    coalesce(
      jsonb_agg(x),
      '[]'::jsonb
    )
  into v_next_recommended

  from (

    select

      l.id,

      l.title,

      l.lesson_type,

      l.estimated_minutes,

      l.xp_reward,

      u.id as unit_id,

      u.title as unit_title,

      lv.id as level_id,

      lv.title as level_title,

      coalesce(
        ulp.progress_percentage,
        0
      ) as progress_percentage

    from public.lessons l

    join public.units u
      on u.id = l.unit_id

    join public.levels lv
      on lv.id = u.level_id

    left join public.user_lesson_progress ulp
      on ulp.lesson_id = l.id
      and ulp.user_id = v_user_id

    where l.is_published = true

      and u.is_published = true

      and lv.is_published = true

      and coalesce(
        ulp.status,
        'NOT_STARTED'::progress_status
      ) <> 'COMPLETED'

    order by
      lv.level_order,
      u.unit_order,
      l.lesson_order

    limit 5

  ) x;


  -- -------------------------------------------------------------------
  -- Recently completed lessons
  -- -------------------------------------------------------------------

  select
    coalesce(
      jsonb_agg(x),
      '[]'::jsonb
    )
  into v_recent_completed

  from (

    select

      l.id,

      l.title,

      l.lesson_type,

      l.estimated_minutes,

      l.xp_reward,

      u.title as unit_title,

      ulp.completed_at,

      ulp.xp_earned

    from public.user_lesson_progress ulp

    join public.lessons l
      on l.id = ulp.lesson_id

    join public.units u
      on u.id = l.unit_id

    where ulp.user_id = v_user_id

      and ulp.status = 'COMPLETED'

    order by ulp.completed_at desc nulls last

    limit 5

  ) x;


  -- -------------------------------------------------------------------
  -- Earned rewards only
  -- -------------------------------------------------------------------

  select
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', r.id,
          'title', r.title,
          'reward_type', r.reward_type,
          'icon_url', r.icon_url,
          'earned_at', ur.earned_at
        )
        order by ur.earned_at desc
      ),
      '[]'::jsonb
    )
  into v_rewards

  from public.user_rewards ur

  join public.rewards r
    on r.id = ur.reward_id

  where ur.user_id = v_user_id;


  -- -------------------------------------------------------------------
  -- ALL skill categories.
  --
  -- New users receive 0 instead of fake percentages.
  -- -------------------------------------------------------------------

  select
    coalesce(
      jsonb_agg(
        jsonb_build_object(

          'id', sc.id,

          'skill', sc.name,

          'xp_earned',
            coalesce(
              usp.xp_earned,
              0
            ),

          'completed_lessons',
            coalesce(
              usp.completed_lessons,
              0
            ),

          'progress_percentage',
            coalesce(
              usp.progress_percentage,
              0
            )

        )
        order by sc.name
      ),
      '[]'::jsonb
    )
  into v_skills

  from public.skill_categories sc

  left join public.user_skill_progress usp
    on usp.skill_category_id = sc.id
    and usp.user_id = v_user_id;


  -- -------------------------------------------------------------------
  -- Actual user activity
  -- -------------------------------------------------------------------

  select
    coalesce(
      jsonb_agg(
        jsonb_build_object(

          'source_type',
            xt.source_type,

          'xp_amount',
            xt.xp_amount,

          'description',
            xt.description,

          'created_at',
            xt.created_at

        )
        order by xt.created_at desc
      ),
      '[]'::jsonb
    )
  into v_recent_activity

  from (

    select *

    from public.xp_transactions

    where user_id = v_user_id

    order by created_at desc

    limit 10

  ) xt;


  -- -------------------------------------------------------------------
  -- Today's study goal
  -- -------------------------------------------------------------------

  select
    goal_minutes,
    minutes_completed,
    goal_met
  into v_today_goal_row

  from public.user_daily_goals

  where user_id = v_user_id
    and goal_date = current_date;


  if v_today_goal_row.goal_minutes is null then

    v_today_goal :=
      jsonb_build_object(

        'goal_minutes',
          v_profile.daily_goal_minutes,

        'minutes_completed',
          0,

        'goal_met',
          false
      );

    v_time_studied_today_seconds := 0;

  else

    v_today_goal :=
      jsonb_build_object(

        'goal_minutes',
          v_today_goal_row.goal_minutes,

        'minutes_completed',
          v_today_goal_row.minutes_completed,

        'goal_met',
          v_today_goal_row.goal_met
      );

    v_time_studied_today_seconds :=
      v_today_goal_row.minutes_completed * 60;

  end if;


  -- -------------------------------------------------------------------
  -- All-time lesson study time
  -- -------------------------------------------------------------------

  select
    coalesce(
      sum(time_spent_seconds),
      0
    )
  into v_total_time_studied_seconds

  from public.user_lesson_progress

  where user_id = v_user_id;


  -- -------------------------------------------------------------------
  -- Overall course progress
  -- -------------------------------------------------------------------

  if v_total_lessons > 0 then

    v_overall_pct :=
      round(
        100.0
        * v_completed_lessons
        / v_total_lessons,
        2
      );

  else

    v_overall_pct := 0;

  end if;


  -- -------------------------------------------------------------------
  -- Final dashboard payload
  -- -------------------------------------------------------------------

  return jsonb_build_object(

    'full_name',
      v_profile.full_name,

    'total_xp',
      coalesce(
        v_profile.total_xp,
        0
      ),

    'current_streak',
      coalesce(
        v_profile.current_streak,
        0
      ),

    'longest_streak',
      coalesce(
        v_profile.longest_streak,
        0
      ),

    'daily_goal_minutes',
      v_profile.daily_goal_minutes,

    'time_studied_today_seconds',
      v_time_studied_today_seconds,

    'total_time_studied_seconds',
      v_total_time_studied_seconds,

    'today_goal',
      v_today_goal,

    'total_units_count',
      v_total_units,

    'completed_units_count',
      v_completed_units,

    'total_lessons_count',
      v_total_lessons,

    'completed_lessons_count',
      v_completed_lessons,

    'current_level',
      v_current_level,

    'current_unit',
      v_current_unit,

    'resume_lesson',
      v_resume_lesson,

    'next_recommended_lessons',
      v_next_recommended,

    'recent_completed_lessons',
      v_recent_completed,

    'rewards',
      v_rewards,

    'skills_breakdown',
      v_skills,

    'recent_activity',
      v_recent_activity,

    'overall_progress_percentage',
      coalesce(
        v_overall_pct,
        0
      )

  );

end;
$$;


revoke execute
on function public.get_user_dashboard()
from public;

grant execute
on function public.get_user_dashboard()
to authenticated;