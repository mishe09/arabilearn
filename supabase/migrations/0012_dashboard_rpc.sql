-- =====================================================================
-- 0012_dashboard_rpc.sql
-- get_user_dashboard(): single call for the frontend to render the
-- dashboard. Only callable for the caller's own data (auth.uid()).
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
  v_result jsonb;
  v_profile record;
  v_time_studied_today integer;
  v_completed_units integer;
  v_completed_lessons integer;
  v_current_level jsonb;
  v_current_unit jsonb;
  v_next_recommended jsonb;
  v_rewards jsonb;
  v_skills jsonb;
  v_recent_activity jsonb;
  v_overall_pct numeric;
  v_today_goal jsonb;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select * into v_profile from public.profiles where id = v_user_id;
  if v_profile.id is null then
    raise exception 'Profile not found';
  end if;

  -- time studied today: sum of study_sessions durations + user_daily_goals minutes
  select coalesce(sum(duration_seconds), 0) into v_time_studied_today
  from public.study_sessions
  where user_id = v_user_id and started_at::date = current_date;

  select count(*) into v_completed_units
  from public.user_unit_progress where user_id = v_user_id and status = 'COMPLETED';

  select count(*) into v_completed_lessons
  from public.user_lesson_progress where user_id = v_user_id and status = 'COMPLETED';

  select jsonb_build_object('id', l.id, 'title', l.title, 'level_order', l.level_order)
    into v_current_level
  from public.levels l
  where l.id = v_profile.current_level_id;

  -- current unit = most recently started, not-yet-completed unit
  select jsonb_build_object('id', u.id, 'title', u.title, 'unit_order', u.unit_order)
    into v_current_unit
  from public.user_unit_progress uup
  join public.units u on u.id = uup.unit_id
  where uup.user_id = v_user_id and uup.status = 'IN_PROGRESS'
  order by uup.started_at desc
  limit 1;

  -- next recommended lessons: next 3 published, not-yet-completed lessons
  -- in unit_order/lesson_order sequence
  select coalesce(jsonb_agg(x), '[]'::jsonb) into v_next_recommended
  from (
    select l.id, l.title, l.lesson_type, l.xp_reward, u.title as unit_title
    from public.lessons l
    join public.units u on u.id = l.unit_id
    where l.is_published = true
      and not exists (
        select 1 from public.user_lesson_progress ulp
        where ulp.lesson_id = l.id and ulp.user_id = v_user_id and ulp.status = 'COMPLETED'
      )
    order by u.unit_order, l.lesson_order
    limit 3
  ) x;

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', r.id, 'title', r.title, 'reward_type', r.reward_type,
      'icon_url', r.icon_url, 'earned_at', ur.earned_at
    ) order by ur.earned_at desc), '[]'::jsonb)
    into v_rewards
  from public.user_rewards ur
  join public.rewards r on r.id = ur.reward_id
  where ur.user_id = v_user_id;

  select coalesce(jsonb_agg(jsonb_build_object(
      'skill', sc.name,
      'xp_earned', usp.xp_earned,
      'completed_lessons', usp.completed_lessons,
      'progress_percentage', usp.progress_percentage
    )), '[]'::jsonb)
    into v_skills
  from public.user_skill_progress usp
  join public.skill_categories sc on sc.id = usp.skill_category_id
  where usp.user_id = v_user_id;

  -- recent activity: last 10 XP transactions
  select coalesce(jsonb_agg(jsonb_build_object(
      'source_type', xt.source_type,
      'xp_amount', xt.xp_amount,
      'description', xt.description,
      'created_at', xt.created_at
    ) order by xt.created_at desc), '[]'::jsonb)
    into v_recent_activity
  from (
    select * from public.xp_transactions
    where user_id = v_user_id
    order by created_at desc
    limit 10
  ) xt;

  select jsonb_build_object(
      'goal_minutes', goal_minutes,
      'minutes_completed', minutes_completed,
      'goal_met', goal_met
    )
    into v_today_goal
  from public.user_daily_goals
  where user_id = v_user_id and goal_date = current_date;

  -- overall progress: average of all level progress percentages
  select coalesce(round(avg(progress_percentage), 2), 0) into v_overall_pct
  from public.user_level_progress
  where user_id = v_user_id;

  v_result := jsonb_build_object(
    'full_name', v_profile.full_name,
    'total_xp', v_profile.total_xp,
    'current_streak', v_profile.current_streak,
    'longest_streak', v_profile.longest_streak,
    'streak_freezes_available', v_profile.streak_freezes_available,
    'daily_goal_minutes', v_profile.daily_goal_minutes,
    'time_studied_today_seconds', v_time_studied_today,
    'today_goal', coalesce(v_today_goal, jsonb_build_object(
        'goal_minutes', v_profile.daily_goal_minutes,
        'minutes_completed', 0,
        'goal_met', false
      )),
    'completed_units_count', v_completed_units,
    'completed_lessons_count', v_completed_lessons,
    'current_level', v_current_level,
    'current_unit', v_current_unit,
    'next_recommended_lessons', v_next_recommended,
    'rewards', v_rewards,
    'skills_breakdown', v_skills,
    'recent_activity', v_recent_activity,
    'overall_progress_percentage', v_overall_pct
  );

  return v_result;
end;
$$;

comment on function public.get_user_dashboard is
  'Returns a single JSON payload with everything the dashboard needs for auth.uid(). Call via supabase.rpc(''get_user_dashboard'').';
