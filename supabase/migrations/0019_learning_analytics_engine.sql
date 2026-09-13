-- =====================================================================
-- 0019_learning_analytics_engine.sql
-- HausaArabia learner analytics engine
--
-- Product rules implemented here:
--   * A streak day requires meaningful learning time, not a login.
--   * Missing a calendar day breaks the streak; no automatic freeze.
--   * Learner timezone determines the study day.
--   * Daily goal is 30 minutes of lesson/exercise/quiz time.
--   * Daily goal awards +10 XP once per local calendar day.
--   * Quiz awards +5 XP only on the first passing completion per quiz.
--   * Unit completion awards +25 XP once per unit.
--   * Streak milestones: 3d +10, 7d +25, 14d +50, 30d +100, once ever.
--   * Course progress = completed published lessons / total published lessons.
--   * Recent activity is stored independently of XP transactions.
--   * Skill analytics will later be driven by tagged quiz questions. For now
--     Vocabulary / Grammar / Listening / Reading are exposed as zero-state.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Profile timezone + 30-minute daily goal
-- ---------------------------------------------------------------------
alter table public.profiles
  add column if not exists timezone text not null default 'UTC';

alter table public.profiles
  alter column daily_goal_minutes set default 30;

update public.profiles
set daily_goal_minutes = 30
where daily_goal_minutes is distinct from 30;

comment on column public.profiles.timezone is
  'IANA timezone used to determine learner-local study dates and streak boundaries.';

-- ---------------------------------------------------------------------
-- 2. Exact per-day study time
-- Keep the existing minute field for backward compatibility, but seconds
-- become the authoritative value.
-- ---------------------------------------------------------------------
alter table public.user_daily_goals
  add column if not exists seconds_completed integer not null default 0
    check (seconds_completed >= 0);

alter table public.user_daily_goals
  add column if not exists goal_reward_awarded_at timestamptz;

update public.user_daily_goals
set seconds_completed = greatest(seconds_completed, minutes_completed * 60)
where seconds_completed < minutes_completed * 60;

update public.user_daily_goals
set goal_minutes = 30,
    minutes_completed = floor(seconds_completed / 60.0)::integer,
    goal_met = seconds_completed >= 1800;

alter table public.user_streak_logs
  add column if not exists seconds_studied integer not null default 0
    check (seconds_studied >= 0);

update public.user_streak_logs
set seconds_studied = greatest(seconds_studied, minutes_studied * 60)
where seconds_studied < minutes_studied * 60;

-- ---------------------------------------------------------------------
-- 3. One-time unit and streak bonuses
-- ---------------------------------------------------------------------
create table if not exists public.user_unit_completion_bonuses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  xp_awarded integer not null default 25 check (xp_awarded >= 0),
  earned_at timestamptz not null default now(),
  unique (user_id, unit_id)
);

create table if not exists public.user_streak_milestones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  milestone_days integer not null check (milestone_days in (3, 7, 14, 30)),
  xp_awarded integer not null check (xp_awarded >= 0),
  earned_at timestamptz not null default now(),
  unique (user_id, milestone_days)
);

create index if not exists idx_unit_completion_bonuses_user
  on public.user_unit_completion_bonuses(user_id, earned_at desc);

create index if not exists idx_streak_milestones_user
  on public.user_streak_milestones(user_id, earned_at desc);

-- award_xp() handles unique_violation as an idempotent no-op. These indexes
-- extend that protection to the new repeat-sensitive bonus sources.
create unique index if not exists uq_xp_tx_daily_goal_once
  on public.xp_transactions(user_id, source_id)
  where source_type = 'DAILY_GOAL';

create unique index if not exists uq_xp_tx_streak_bonus_once
  on public.xp_transactions(user_id, source_id)
  where source_type = 'STREAK_BONUS';

-- ---------------------------------------------------------------------
-- 4. Real learner activity history (not restricted to XP events)
-- ---------------------------------------------------------------------
create table if not exists public.user_activity_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  reference_id uuid,
  title text not null,
  metadata jsonb not null default '{}'::jsonb,
  dedupe_key text,
  created_at timestamptz not null default now()
);

create index if not exists idx_user_activity_events_user_created
  on public.user_activity_events(user_id, created_at desc);

create unique index if not exists uq_user_activity_events_dedupe
  on public.user_activity_events(user_id, dedupe_key)
  where dedupe_key is not null;

alter table public.user_activity_events enable row level security;
alter table public.user_unit_completion_bonuses enable row level security;
alter table public.user_streak_milestones enable row level security;

drop policy if exists "activity_events_select_own" on public.user_activity_events;
create policy "activity_events_select_own"
  on public.user_activity_events for select
  using (auth.uid() = user_id);

drop policy if exists "unit_completion_bonuses_select_own" on public.user_unit_completion_bonuses;
create policy "unit_completion_bonuses_select_own"
  on public.user_unit_completion_bonuses for select
  using (auth.uid() = user_id);

drop policy if exists "streak_milestones_select_own" on public.user_streak_milestones;
create policy "streak_milestones_select_own"
  on public.user_streak_milestones for select
  using (auth.uid() = user_id);

revoke insert, update, delete on public.user_activity_events from authenticated;
revoke insert, update, delete on public.user_unit_completion_bonuses from authenticated;
revoke insert, update, delete on public.user_streak_milestones from authenticated;
grant select on public.user_activity_events to authenticated;
grant select on public.user_unit_completion_bonuses to authenticated;
grant select on public.user_streak_milestones to authenticated;

-- Internal activity helper. Clients cannot call this directly.
create or replace function public.add_user_activity_event(
  p_user_id uuid,
  p_event_type text,
  p_reference_id uuid,
  p_title text,
  p_metadata jsonb default '{}'::jsonb,
  p_dedupe_key text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_event_id uuid;
begin
  insert into public.user_activity_events (
    user_id, event_type, reference_id, title, metadata, dedupe_key
  )
  values (
    p_user_id,
    p_event_type,
    p_reference_id,
    p_title,
    coalesce(p_metadata, '{}'::jsonb),
    p_dedupe_key
  )
  on conflict (user_id, dedupe_key) where dedupe_key is not null
  do nothing
  returning id into v_event_id;

  return v_event_id;
end;
$$;

revoke execute on function public.add_user_activity_event(uuid, text, uuid, text, jsonb, text) from public;

-- ---------------------------------------------------------------------
-- 5. Reward badges are achievements, not an additional hidden XP source.
--    The agreed XP schedule lives in lesson/quiz/unit/daily-goal/streak
--    functions instead.
-- ---------------------------------------------------------------------
update public.rewards
set xp_bonus = 0
where xp_bonus <> 0;

insert into public.rewards (
  title, description, reward_type, required_condition, xp_bonus
)
values
  ('Daily Goal Achieved', 'Reach the 30-minute learning goal in one day', 'BADGE', '{"type":"daily_goal_met","count":1}'::jsonb, 0),
  ('First Unit Completed', 'Complete your first full unit', 'COMPLETION', '{"type":"units_completed","count":1}'::jsonb, 0),
  ('3 Day Streak', 'Learn on 3 consecutive days', 'STREAK', '{"type":"streak_days","count":3}'::jsonb, 0),
  ('14 Day Streak', 'Learn on 14 consecutive days', 'STREAK', '{"type":"streak_days","count":14}'::jsonb, 0),
  ('30 Day Streak', 'Learn on 30 consecutive days', 'STREAK', '{"type":"streak_days","count":30}'::jsonb, 0)
on conflict (title) do update
set description = excluded.description,
    reward_type = excluded.reward_type,
    required_condition = excluded.required_condition,
    xp_bonus = 0;

-- Existing achievement rows should also match the new no-extra-XP rule.
update public.rewards
set xp_bonus = 0
where title in (
  'First Lesson Completed',
  '7 Day Streak',
  'First Quiz Passed',
  '100 XP Earned',
  'Alphabet Master'
);

-- ---------------------------------------------------------------------
-- 5b. Normalize legacy bonus XP to the newly agreed schedule, then
--     backfill achievements that were already genuinely earned.
-- ---------------------------------------------------------------------
-- Old reward badges carried bonus XP. Badges no longer add XP by
-- themselves, so remove only XP transactions whose source_id is an actual
-- reward row.
delete from public.xp_transactions xt
using public.rewards r
where xt.source_type = 'REWARD'
  and xt.source_id = r.id;

-- The old streak function awarded XP every time the daily goal was reached
-- and used user_id itself as source_id. The new model awards only the
-- 3/7/14/30 milestones, each once ever.
delete from public.xp_transactions
where source_type = 'STREAK_BONUS'
  and source_id = user_id;

-- Reconcile the cached profile total with the remaining authoritative ledger
-- before new milestone/unit/daily-goal backfills are awarded below.
update public.profiles p
set total_xp = coalesce((
  select sum(xt.xp_amount)::integer
  from public.xp_transactions xt
  where xt.user_id = p.id
), 0);

-- Existing completed units receive the new +25 rule once.
do $$
declare
  r record;
  v_bonus_id uuid;
begin
  for r in
    select uup.user_id, uup.unit_id, u.title as unit_title
    from public.user_unit_progress uup
    join public.units u on u.id = uup.unit_id
    where uup.status = 'COMPLETED'
  loop
    v_bonus_id := null;

    insert into public.user_unit_completion_bonuses (
      user_id, unit_id, xp_awarded
    )
    values (r.user_id, r.unit_id, 25)
    on conflict (user_id, unit_id) do nothing
    returning id into v_bonus_id;

    if v_bonus_id is not null then
      perform public.award_xp(
        r.user_id,
        'REWARD',
        v_bonus_id,
        25,
        'Unit completed: ' || r.unit_title
      );

      perform public.add_user_activity_event(
        r.user_id,
        'UNIT_COMPLETED',
        r.unit_id,
        'Unit completed: ' || r.unit_title,
        jsonb_build_object('unit_id', r.unit_id, 'xp_awarded', 25),
        'unit_completed:' || r.unit_id::text
      );
    end if;
  end loop;
end;
$$;

-- Existing days with at least 30 recorded minutes receive the daily-goal
-- reward once. Days that only satisfied the former 10-minute goal do not.
do $$
declare
  r record;
begin
  for r in
    select id, user_id, goal_date, seconds_completed
    from public.user_daily_goals
    where seconds_completed >= 1800
  loop
    if public.award_xp(
      r.user_id,
      'DAILY_GOAL',
      r.id,
      10,
      '30-minute daily learning goal reached'
    ) then
      update public.user_daily_goals
      set goal_reward_awarded_at = coalesce(goal_reward_awarded_at, now())
      where id = r.id;

      perform public.add_user_activity_event(
        r.user_id,
        'DAILY_GOAL_COMPLETED',
        r.id,
        '30-minute daily learning goal completed',
        jsonb_build_object(
          'study_date', r.goal_date,
          'seconds_studied', r.seconds_completed,
          'xp_awarded', 10
        ),
        'daily_goal:' || r.goal_date::text
      );
    end if;
  end loop;
end;
$$;

-- A historical longest streak proves the milestone was reached at least once.
-- Backfill each agreed milestone once, then future calls are protected by the
-- unique (user_id, milestone_days) constraint.
do $$
declare
  r record;
  v_milestone_id uuid;
begin
  for r in
    select
      p.id as user_id,
      m.milestone_days,
      m.xp_awarded
    from public.profiles p
    cross join (
      values
        (3, 10),
        (7, 25),
        (14, 50),
        (30, 100)
    ) as m(milestone_days, xp_awarded)
    where p.longest_streak >= m.milestone_days
  loop
    v_milestone_id := null;

    insert into public.user_streak_milestones (
      user_id, milestone_days, xp_awarded
    )
    values (
      r.user_id, r.milestone_days, r.xp_awarded
    )
    on conflict (user_id, milestone_days) do nothing
    returning id into v_milestone_id;

    if v_milestone_id is not null then
      perform public.award_xp(
        r.user_id,
        'STREAK_BONUS',
        v_milestone_id,
        r.xp_awarded,
        r.milestone_days || '-day streak milestone'
      );

      perform public.add_user_activity_event(
        r.user_id,
        'STREAK_MILESTONE',
        v_milestone_id,
        r.milestone_days || '-day learning streak reached',
        jsonb_build_object(
          'streak_days', r.milestone_days,
          'xp_awarded', r.xp_awarded
        ),
        'streak_milestone:' || r.milestone_days::text
      );
    end if;
  end loop;
end;
$$;

-- Backfill lesson-completion activity so returning learners do not get an
-- empty history immediately after this migration.
insert into public.user_activity_events (
  user_id, event_type, reference_id, title, metadata, dedupe_key, created_at
)
select
  ulp.user_id,
  'LESSON_COMPLETED',
  l.id,
  'Lesson completed: ' || l.title,
  jsonb_build_object(
    'lesson_id', l.id,
    'unit_id', l.unit_id,
    'xp_awarded', ulp.xp_earned
  ),
  'lesson_completed:' || l.id::text,
  coalesce(ulp.completed_at, now())
from public.user_lesson_progress ulp
join public.lessons l on l.id = ulp.lesson_id
where ulp.status = 'COMPLETED'
on conflict (user_id, dedupe_key) where dedupe_key is not null do nothing;

-- Backfill completed quiz attempts as activity. Attempts remain distinct.
insert into public.user_activity_events (
  user_id, event_type, reference_id, title, metadata, dedupe_key, created_at
)
select
  qa.user_id,
  'QUIZ_COMPLETED',
  qa.id,
  case
    when qa.passed then 'Quiz passed: ' || q.title
    else 'Quiz completed: ' || q.title
  end,
  jsonb_build_object(
    'quiz_id', q.id,
    'lesson_id', q.lesson_id,
    'score', qa.score,
    'passed', qa.passed,
    'xp_awarded', qa.xp_earned
  ),
  'quiz_attempt:' || qa.id::text,
  coalesce(qa.completed_at, qa.started_at)
from public.quiz_attempts qa
join public.quizzes q on q.id = qa.quiz_id
where qa.completed_at is not null
on conflict (user_id, dedupe_key) where dedupe_key is not null do nothing;

-- ---------------------------------------------------------------------
-- 6. Reward rule engine: add unit and daily-goal achievement conditions.
-- ---------------------------------------------------------------------
create or replace function public.check_and_award_rewards(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_condition jsonb;
  v_type text;
  v_met boolean;
  v_stat integer;
  v_user_reward_id uuid;
begin
  for r in select * from public.rewards loop
    if exists (
      select 1 from public.user_rewards
      where user_id = p_user_id and reward_id = r.id
    ) then
      continue;
    end if;

    v_condition := r.required_condition;
    v_type := v_condition->>'type';
    v_met := false;

    if v_type = 'lessons_completed' then
      select count(*) into v_stat
      from public.user_lesson_progress
      where user_id = p_user_id and status = 'COMPLETED';
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'units_completed' then
      select count(*) into v_stat
      from public.user_unit_progress
      where user_id = p_user_id and status = 'COMPLETED';
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'daily_goal_met' then
      select count(*) into v_stat
      from public.user_daily_goals
      where user_id = p_user_id and goal_met = true;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'streak_days' then
      select current_streak into v_stat
      from public.profiles
      where id = p_user_id;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'lesson_type_completed' then
      select count(*) into v_stat
      from public.user_lesson_progress ulp
      join public.lessons l on l.id = ulp.lesson_id
      where ulp.user_id = p_user_id
        and ulp.status = 'COMPLETED'
        and l.lesson_type = (v_condition->>'lesson_type')::lesson_type;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'quiz_passed' then
      select count(*) into v_stat
      from public.quiz_attempts
      where user_id = p_user_id and passed = true;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'total_xp' then
      select total_xp into v_stat
      from public.profiles
      where id = p_user_id;
      v_met := v_stat >= coalesce((v_condition->>'amount')::integer, 0);
    end if;

    if v_met then
      v_user_reward_id := null;

      insert into public.user_rewards (user_id, reward_id)
      values (p_user_id, r.id)
      on conflict (user_id, reward_id) do nothing
      returning id into v_user_reward_id;

      if v_user_reward_id is not null then
        if r.xp_bonus > 0 then
          perform public.award_xp(
            p_user_id,
            'REWARD',
            r.id,
            r.xp_bonus,
            'Reward: ' || r.title
          );
        end if;

        perform public.add_user_activity_event(
          p_user_id,
          'REWARD_EARNED',
          r.id,
          'Reward earned: ' || r.title,
          jsonb_build_object('reward_id', r.id, 'reward_title', r.title),
          'reward:' || r.id::text
        );
      end if;
    end if;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------
-- 7. Exact learning-time logger.
-- The browser will send small active-time deltas. Hidden/idle time is
-- filtered client-side; this function additionally rejects unreasonable
-- single deltas to protect against accidental overcounting.
-- ---------------------------------------------------------------------
create or replace function public.record_learning_time(
  p_seconds integer,
  p_timezone text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_timezone text;
  v_study_date date;
  v_goal_minutes integer;
  v_goal_seconds integer;
  v_goal_id uuid;
  v_goal_was_met boolean := false;
  v_goal_is_met boolean := false;
  v_seconds_today integer := 0;
  v_today_existing_streak integer;
  v_yesterday_streak integer;
  v_new_streak integer;
  v_longest_streak integer;
  v_milestone_xp integer := 0;
  v_milestone_id uuid;
  v_daily_goal_xp integer := 0;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_seconds is null or p_seconds <= 0 then
    raise exception 'Study time must be a positive number of seconds';
  end if;

  -- Heartbeats are expected to be small. A 5-minute upper bound prevents
  -- accidental hours of credit from one stale client call while allowing
  -- normal network delays.
  if p_seconds > 300 then
    raise exception 'A single study-time update cannot exceed 300 seconds';
  end if;

  select timezone, daily_goal_minutes, longest_streak
    into v_timezone, v_goal_minutes, v_longest_streak
  from public.profiles
  where id = v_user_id;

  if p_timezone is not null then
    if exists (select 1 from pg_timezone_names where name = p_timezone) then
      v_timezone := p_timezone;
      update public.profiles
      set timezone = p_timezone
      where id = v_user_id and timezone is distinct from p_timezone;
    else
      raise exception 'Invalid IANA timezone: %', p_timezone;
    end if;
  end if;

  v_timezone := coalesce(v_timezone, 'UTC');
  v_goal_minutes := 30;
  v_goal_seconds := v_goal_minutes * 60;
  v_study_date := timezone(v_timezone, now())::date;

  select goal_met
    into v_goal_was_met
  from public.user_daily_goals
  where user_id = v_user_id and goal_date = v_study_date;

  v_goal_was_met := coalesce(v_goal_was_met, false);

  insert into public.user_daily_goals (
    user_id,
    goal_date,
    goal_minutes,
    minutes_completed,
    seconds_completed,
    goal_met
  )
  values (
    v_user_id,
    v_study_date,
    v_goal_minutes,
    floor(p_seconds / 60.0)::integer,
    p_seconds,
    p_seconds >= v_goal_seconds
  )
  on conflict (user_id, goal_date) do update
  set goal_minutes = 30,
      seconds_completed = public.user_daily_goals.seconds_completed + excluded.seconds_completed,
      minutes_completed = floor(
        (public.user_daily_goals.seconds_completed + excluded.seconds_completed) / 60.0
      )::integer,
      goal_met =
        (public.user_daily_goals.seconds_completed + excluded.seconds_completed) >= 1800
  returning id, seconds_completed, goal_met
    into v_goal_id, v_seconds_today, v_goal_is_met;

  -- A streak day begins on the first meaningful learning-time event for
  -- that learner-local calendar day. Repeated heartbeats do not increment it.
  select streak_count_after
    into v_today_existing_streak
  from public.user_streak_logs
  where user_id = v_user_id and study_date = v_study_date;

  if v_today_existing_streak is null then
    select streak_count_after
      into v_yesterday_streak
    from public.user_streak_logs
    where user_id = v_user_id and study_date = v_study_date - 1;

    v_new_streak := coalesce(v_yesterday_streak, 0) + 1;

    insert into public.user_streak_logs (
      user_id,
      study_date,
      minutes_studied,
      seconds_studied,
      goal_met,
      streak_count_after
    )
    values (
      v_user_id,
      v_study_date,
      floor(v_seconds_today / 60.0)::integer,
      v_seconds_today,
      v_goal_is_met,
      v_new_streak
    );

    update public.profiles
    set current_streak = v_new_streak,
        longest_streak = greatest(longest_streak, v_new_streak),
        last_studied_at = now(),
        daily_goal_minutes = 30
    where id = v_user_id;

    -- Streak milestone XP is earned once ever for each milestone.
    if v_new_streak in (3, 7, 14, 30) then
      v_milestone_xp := case v_new_streak
        when 3 then 10
        when 7 then 25
        when 14 then 50
        when 30 then 100
        else 0
      end;

      insert into public.user_streak_milestones (
        user_id, milestone_days, xp_awarded
      )
      values (
        v_user_id, v_new_streak, v_milestone_xp
      )
      on conflict (user_id, milestone_days) do nothing
      returning id into v_milestone_id;

      if v_milestone_id is not null then
        perform public.award_xp(
          v_user_id,
          'STREAK_BONUS',
          v_milestone_id,
          v_milestone_xp,
          v_new_streak || '-day streak milestone'
        );

        perform public.add_user_activity_event(
          v_user_id,
          'STREAK_MILESTONE',
          v_milestone_id,
          v_new_streak || '-day learning streak reached',
          jsonb_build_object(
            'streak_days', v_new_streak,
            'xp_awarded', v_milestone_xp
          ),
          'streak_milestone:' || v_new_streak::text
        );
      end if;
    end if;
  else
    v_new_streak := v_today_existing_streak;

    update public.user_streak_logs
    set seconds_studied = v_seconds_today,
        minutes_studied = floor(v_seconds_today / 60.0)::integer,
        goal_met = v_goal_is_met
    where user_id = v_user_id and study_date = v_study_date;

    update public.profiles
    set last_studied_at = now(),
        daily_goal_minutes = 30
    where id = v_user_id;
  end if;

  -- Crossing 30 minutes awards exactly +10 XP once for this day.
  if v_goal_is_met and not v_goal_was_met then
    if public.award_xp(
      v_user_id,
      'DAILY_GOAL',
      v_goal_id,
      10,
      '30-minute daily learning goal reached'
    ) then
      v_daily_goal_xp := 10;

      update public.user_daily_goals
      set goal_reward_awarded_at = now()
      where id = v_goal_id;

      perform public.add_user_activity_event(
        v_user_id,
        'DAILY_GOAL_COMPLETED',
        v_goal_id,
        '30-minute daily learning goal completed',
        jsonb_build_object(
          'study_date', v_study_date,
          'seconds_studied', v_seconds_today,
          'xp_awarded', 10
        ),
        'daily_goal:' || v_study_date::text
      );
    end if;
  end if;

  perform public.check_and_award_rewards(v_user_id);

  return jsonb_build_object(
    'study_date', v_study_date,
    'timezone', v_timezone,
    'seconds_today', v_seconds_today,
    'minutes_today', floor(v_seconds_today / 60.0)::integer,
    'goal_minutes', 30,
    'goal_met', v_goal_is_met,
    'daily_goal_xp_awarded', v_daily_goal_xp,
    'current_streak', v_new_streak
  );
end;
$$;

revoke execute on function public.record_learning_time(integer, text) from public;
grant execute on function public.record_learning_time(integer, text) to authenticated;

-- Backward-compatible wrapper for the existing lesson page until the client
-- is switched to second-level active-time tracking.
create or replace function public.log_study_time(
  p_minutes integer,
  p_study_date date default current_date
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_remaining_seconds integer;
  v_chunk_seconds integer;
begin
  if p_minutes is null or p_minutes <= 0 then
    return;
  end if;

  v_remaining_seconds := p_minutes * 60;

  while v_remaining_seconds > 0 loop
    v_chunk_seconds := least(v_remaining_seconds, 300);
    perform public.record_learning_time(v_chunk_seconds, null);
    v_remaining_seconds := v_remaining_seconds - v_chunk_seconds;
  end loop;
end;
$$;

revoke execute on function public.log_study_time(integer, date) from public;
grant execute on function public.log_study_time(integer, date) to authenticated;

comment on function public.log_study_time(integer, date) is
  'Compatibility wrapper. New clients should call record_learning_time(seconds, timezone).';

-- ---------------------------------------------------------------------
-- 8. Lesson completion: lesson XP + one-time +25 unit bonus + activity.
-- Skill percentages are intentionally NOT updated here anymore; they will
-- be driven by tagged quiz performance in the skill-assessment phase.
-- ---------------------------------------------------------------------
create or replace function public.complete_lesson(
  p_lesson_id uuid,
  p_time_spent_seconds integer default 0
)
returns table (
  already_completed boolean,
  xp_awarded integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_unit_id uuid;
  v_level_id uuid;
  v_lesson_title text;
  v_unit_title text;
  v_xp_reward integer;
  v_lesson_published boolean;
  v_unit_published boolean;
  v_level_published boolean;
  v_was_already_completed boolean := false;
  v_unit_was_already_completed boolean := false;
  v_unit_is_completed boolean := false;
  v_xp_granted integer := 0;
  v_unit_bonus_id uuid;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_time_spent_seconds < 0 then
    raise exception 'Time spent cannot be negative';
  end if;

  select
    l.unit_id,
    l.title,
    l.xp_reward,
    l.is_published,
    u.level_id,
    u.title,
    u.is_published,
    lv.is_published
  into
    v_unit_id,
    v_lesson_title,
    v_xp_reward,
    v_lesson_published,
    v_level_id,
    v_unit_title,
    v_unit_published,
    v_level_published
  from public.lessons l
  join public.units u on u.id = l.unit_id
  join public.levels lv on lv.id = u.level_id
  where l.id = p_lesson_id;

  if v_unit_id is null then
    raise exception 'Lesson not found';
  end if;

  if not (v_lesson_published and v_unit_published and v_level_published) then
    raise exception 'This lesson is not currently available';
  end if;

  select exists (
    select 1
    from public.user_lesson_progress
    where user_id = v_user_id
      and lesson_id = p_lesson_id
      and status = 'COMPLETED'
  ) into v_was_already_completed;

  select exists (
    select 1
    from public.user_unit_progress
    where user_id = v_user_id
      and unit_id = v_unit_id
      and status = 'COMPLETED'
  ) into v_unit_was_already_completed;

  insert into public.user_lesson_progress (
    user_id,
    lesson_id,
    status,
    progress_percentage,
    started_at,
    completed_at,
    time_spent_seconds,
    xp_earned,
    last_activity_at
  )
  values (
    v_user_id,
    p_lesson_id,
    'COMPLETED',
    100,
    now(),
    now(),
    p_time_spent_seconds,
    v_xp_reward,
    now()
  )
  on conflict (user_id, lesson_id) do update
  set status = 'COMPLETED',
      progress_percentage = 100,
      completed_at = coalesce(public.user_lesson_progress.completed_at, now()),
      time_spent_seconds = public.user_lesson_progress.time_spent_seconds + excluded.time_spent_seconds,
      xp_earned = case
        when public.user_lesson_progress.status = 'COMPLETED'
          then public.user_lesson_progress.xp_earned
        else excluded.xp_earned
      end,
      last_activity_at = now();

  if not v_was_already_completed then
    if public.award_xp(
      v_user_id,
      'LESSON_COMPLETION',
      p_lesson_id,
      v_xp_reward,
      'Lesson completed: ' || v_lesson_title
    ) then
      v_xp_granted := v_xp_reward;
    end if;

    perform public.add_user_activity_event(
      v_user_id,
      'LESSON_COMPLETED',
      p_lesson_id,
      'Lesson completed: ' || v_lesson_title,
      jsonb_build_object(
        'lesson_id', p_lesson_id,
        'unit_id', v_unit_id,
        'xp_awarded', v_xp_granted
      ),
      'lesson_completed:' || p_lesson_id::text
    );
  end if;

  -- Unit progress = completed published lessons / published lessons in unit.
  insert into public.user_unit_progress (
    user_id, unit_id, status, progress_percentage, started_at
  )
  values (
    v_user_id, v_unit_id, 'IN_PROGRESS', 0, now()
  )
  on conflict (user_id, unit_id) do nothing;

  update public.user_unit_progress uup
  set progress_percentage = sub.pct,
      status = case
        when sub.pct >= 100 then 'COMPLETED'::progress_status
        else 'IN_PROGRESS'::progress_status
      end,
      completed_at = case
        when sub.pct >= 100 then coalesce(uup.completed_at, now())
        else null
      end
  from (
    select round(
      100.0 * count(*) filter (where ulp.status = 'COMPLETED')
      / nullif(count(*), 0),
      2
    ) as pct
    from public.lessons l
    left join public.user_lesson_progress ulp
      on ulp.lesson_id = l.id
      and ulp.user_id = v_user_id
    where l.unit_id = v_unit_id
      and l.is_published = true
  ) sub
  where uup.user_id = v_user_id
    and uup.unit_id = v_unit_id;

  select status = 'COMPLETED'
    into v_unit_is_completed
  from public.user_unit_progress
  where user_id = v_user_id and unit_id = v_unit_id;

  -- +25 XP exactly once when the unit first becomes complete.
  if coalesce(v_unit_is_completed, false)
     and not v_unit_was_already_completed then

    insert into public.user_unit_completion_bonuses (
      user_id, unit_id, xp_awarded
    )
    values (
      v_user_id, v_unit_id, 25
    )
    on conflict (user_id, unit_id) do nothing
    returning id into v_unit_bonus_id;

    if v_unit_bonus_id is not null then
      perform public.award_xp(
        v_user_id,
        'REWARD',
        v_unit_bonus_id,
        25,
        'Unit completed: ' || v_unit_title
      );

      perform public.add_user_activity_event(
        v_user_id,
        'UNIT_COMPLETED',
        v_unit_id,
        'Unit completed: ' || v_unit_title,
        jsonb_build_object(
          'unit_id', v_unit_id,
          'xp_awarded', 25
        ),
        'unit_completed:' || v_unit_id::text
      );
    end if;
  end if;

  -- Level progress is still rolled up from completed published units.
  insert into public.user_level_progress (
    user_id, level_id, status, progress_percentage, started_at
  )
  values (
    v_user_id, v_level_id, 'IN_PROGRESS', 0, now()
  )
  on conflict (user_id, level_id) do nothing;

  update public.user_level_progress ulp_level
  set progress_percentage = sub.pct,
      status = case
        when sub.pct >= 100 then 'COMPLETED'::progress_status
        else 'IN_PROGRESS'::progress_status
      end,
      completed_at = case
        when sub.pct >= 100 then coalesce(ulp_level.completed_at, now())
        else null
      end
  from (
    select round(
      100.0 * count(*) filter (where uup.status = 'COMPLETED')
      / nullif(count(*), 0),
      2
    ) as pct
    from public.units u
    left join public.user_unit_progress uup
      on uup.unit_id = u.id
      and uup.user_id = v_user_id
    where u.level_id = v_level_id
      and u.is_published = true
  ) sub
  where ulp_level.user_id = v_user_id
    and ulp_level.level_id = v_level_id;

  update public.profiles
  set current_level_id = v_level_id,
      last_studied_at = now()
  where id = v_user_id;

  perform public.check_and_award_rewards(v_user_id);

  return query
  select v_was_already_completed, v_xp_granted;
end;
$$;

revoke execute on function public.complete_lesson(uuid, integer) from public;
grant execute on function public.complete_lesson(uuid, integer) to authenticated;

-- ---------------------------------------------------------------------
-- 9. Quiz completion: grade server-side, +5 XP on first pass only,
--    and record every completed attempt in recent activity.
-- ---------------------------------------------------------------------
create or replace function public.complete_quiz(
  p_quiz_id uuid,
  p_answers jsonb
)
returns table (
  attempt_id uuid,
  score numeric,
  passed boolean,
  xp_awarded integer
)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  v_user_id uuid := auth.uid();
  v_attempt_id uuid;
  v_lesson_id uuid;
  v_unit_id uuid;
  v_level_id uuid;
  v_quiz_title text;
  v_quiz_published boolean;
  v_lesson_published boolean;
  v_unit_published boolean;
  v_level_published boolean;
  v_passing_score integer;
  v_total_points integer := 0;
  v_earned_points integer := 0;
  v_score numeric := 0;
  v_passed boolean := false;
  v_xp_granted integer := 0;
  v_did_award boolean;
  v_deduped_answers jsonb;
  ans jsonb;
  v_question record;
  v_is_correct boolean;
  v_selected_option_id uuid;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select
    q.lesson_id,
    q.title,
    q.passing_score,
    q.is_published,
    l.unit_id,
    l.is_published,
    u.level_id,
    u.is_published,
    lv.is_published
  into
    v_lesson_id,
    v_quiz_title,
    v_passing_score,
    v_quiz_published,
    v_unit_id,
    v_lesson_published,
    v_level_id,
    v_unit_published,
    v_level_published
  from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  join public.units u on u.id = l.unit_id
  join public.levels lv on lv.id = u.level_id
  where q.id = p_quiz_id;

  if v_lesson_id is null then
    raise exception 'Quiz not found';
  end if;

  if not (
    v_quiz_published
    and v_lesson_published
    and v_unit_published
    and v_level_published
  ) then
    raise exception 'This quiz is not currently available';
  end if;

  insert into public.quiz_attempts (
    user_id, quiz_id, started_at
  )
  values (
    v_user_id, p_quiz_id, now()
  )
  returning id into v_attempt_id;

  select coalesce(sum(points), 0)
    into v_total_points
  from public.quiz_questions
  where quiz_id = p_quiz_id;

  select coalesce(jsonb_agg(first_answer), '[]'::jsonb)
    into v_deduped_answers
  from (
    select distinct on (elem->>'question_id') elem as first_answer
    from jsonb_array_elements(coalesce(p_answers, '[]'::jsonb))
      with ordinality as t(elem, ord)
    order by elem->>'question_id', ord
  ) dedup;

  for ans in select * from jsonb_array_elements(v_deduped_answers)
  loop
    select * into v_question
    from public.quiz_questions
    where id = (ans->>'question_id')::uuid
      and quiz_id = p_quiz_id;

    if v_question.id is null then
      continue;
    end if;

    v_selected_option_id := nullif(ans->>'option_id', '')::uuid;

    if v_question.question_type in (
      'MULTIPLE_CHOICE', 'MATCHING', 'LISTENING'
    ) then
      select is_correct
        into v_is_correct
      from public.quiz_options
      where id = v_selected_option_id
        and question_id = v_question.id;

      if not found then
        v_is_correct := false;
        v_selected_option_id := null;
      end if;
    else
      v_selected_option_id := null;
      v_is_correct :=
        lower(trim(coalesce(ans->>'answer_text', ''))) =
        lower(trim(coalesce(v_question.correct_answer, '')));
    end if;

    insert into public.quiz_attempt_answers (
      attempt_id,
      question_id,
      selected_option_id,
      answer_text,
      is_correct,
      points_awarded
    )
    values (
      v_attempt_id,
      v_question.id,
      v_selected_option_id,
      ans->>'answer_text',
      v_is_correct,
      case when v_is_correct then v_question.points else 0 end
    )
    on conflict (attempt_id, question_id) do nothing;
  end loop;

  select coalesce(sum(points_awarded), 0)
    into v_earned_points
  from public.quiz_attempt_answers
  where attempt_id = v_attempt_id;

  v_score := case
    when v_total_points > 0
      then round(100.0 * v_earned_points / v_total_points, 2)
    else 0
  end;

  v_passed := v_score >= v_passing_score;

  if v_passed then
    v_did_award := public.award_xp(
      v_user_id,
      'QUIZ_COMPLETION',
      p_quiz_id,
      5,
      'Quiz passed: ' || v_quiz_title
    );

    if v_did_award then
      v_xp_granted := 5;
    end if;
  end if;

  update public.quiz_attempts
  set score = v_score,
      passed = v_passed,
      xp_earned = v_xp_granted,
      completed_at = now()
  where id = v_attempt_id;

  perform public.add_user_activity_event(
    v_user_id,
    'QUIZ_COMPLETED',
    v_attempt_id,
    case
      when v_passed then 'Quiz passed: ' || v_quiz_title
      else 'Quiz completed: ' || v_quiz_title
    end,
    jsonb_build_object(
      'quiz_id', p_quiz_id,
      'lesson_id', v_lesson_id,
      'score', v_score,
      'passed', v_passed,
      'xp_awarded', v_xp_granted
    ),
    'quiz_attempt:' || v_attempt_id::text
  );

  if v_passed then
    perform public.check_and_award_rewards(v_user_id);
  end if;

  return query
  select v_attempt_id, v_score, v_passed, v_xp_granted;
end;
$$;

revoke execute on function public.complete_quiz(uuid, jsonb) from public;
grant execute on function public.complete_quiz(uuid, jsonb) to authenticated;

-- Keep displayed quiz rewards aligned with the fixed +5 first-pass rule.
update public.quizzes
set xp_reward = 5
where xp_reward <> 5;

-- ---------------------------------------------------------------------
-- 10. Prayer and radio activity RPCs for the future module wiring.
-- They do NOT count toward learning-time or the 30-minute daily goal.
-- ---------------------------------------------------------------------
alter table public.user_prayer_progress
  add column if not exists recited_count integer not null default 0
    check (recited_count >= 0);

alter table public.user_prayer_progress
  add column if not exists last_recited_at timestamptz;

create or replace function public.record_prayer_recitation(p_prayer_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_prayer_title text;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select title into v_prayer_title
  from public.prayers
  where id = p_prayer_id;

  if v_prayer_title is null then
    raise exception 'Prayer not found';
  end if;

  insert into public.user_prayer_progress (
    user_id, prayer_id, viewed_at, recited_count, last_recited_at
  )
  values (
    v_user_id, p_prayer_id, now(), 1, now()
  )
  on conflict (user_id, prayer_id) do update
  set viewed_at = now(),
      recited_count = public.user_prayer_progress.recited_count + 1,
      last_recited_at = now();

  perform public.add_user_activity_event(
    v_user_id,
    'PRAYER_RECITED',
    p_prayer_id,
    'Prayer recited: ' || v_prayer_title,
    jsonb_build_object('prayer_id', p_prayer_id),
    null
  );
end;
$$;

revoke execute on function public.record_prayer_recitation(uuid) from public;
grant execute on function public.record_prayer_recitation(uuid) to authenticated;

create or replace function public.record_radio_listen(
  p_radio_station_id uuid,
  p_duration_seconds integer
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_station_name text;
  v_session_id uuid;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  if p_duration_seconds is null or p_duration_seconds < 60 then
    raise exception 'Radio activity is recorded after at least 60 seconds of listening';
  end if;

  select name into v_station_name
  from public.radio_stations
  where id = p_radio_station_id
    and is_active = true;

  if v_station_name is null then
    raise exception 'Radio station not found or inactive';
  end if;

  insert into public.radio_listening_sessions (
    user_id,
    radio_station_id,
    started_at,
    ended_at,
    duration_seconds
  )
  values (
    v_user_id,
    p_radio_station_id,
    now() - make_interval(secs => p_duration_seconds),
    now(),
    p_duration_seconds
  )
  returning id into v_session_id;

  perform public.add_user_activity_event(
    v_user_id,
    'RADIO_LISTENED',
    p_radio_station_id,
    'Listened to radio: ' || v_station_name,
    jsonb_build_object(
      'radio_station_id', p_radio_station_id,
      'duration_seconds', p_duration_seconds,
      'session_id', v_session_id
    ),
    'radio_session:' || v_session_id::text
  );

  return v_session_id;
end;
$$;

revoke execute on function public.record_radio_listen(uuid, integer) from public;
grant execute on function public.record_radio_listen(uuid, integer) to authenticated;

-- ---------------------------------------------------------------------
-- 11. Skill breakdown transition.
-- Old skill percentages were lesson-completion percentages. That no longer
-- matches the product definition, so reset the four dashboard skills to 0
-- until quiz-question skill tagging is implemented.
-- ---------------------------------------------------------------------
insert into public.skill_categories (name, description)
values
  ('Vocabulary', 'Vocabulary knowledge measured from scored quiz questions'),
  ('Grammar', 'Grammar knowledge measured from scored quiz questions'),
  ('Listening', 'Listening comprehension measured from scored quiz questions'),
  ('Reading', 'Reading comprehension measured from scored quiz questions')
on conflict (name) do update
set description = excluded.description;

update public.user_skill_progress usp
set xp_earned = 0,
    completed_lessons = 0,
    progress_percentage = 0,
    updated_at = now()
from public.skill_categories sc
where sc.id = usp.skill_category_id
  and sc.name in ('Vocabulary', 'Grammar', 'Listening', 'Reading');

-- ---------------------------------------------------------------------
-- 12. Dashboard RPC: every metric is real per-user backend data.
-- ---------------------------------------------------------------------
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
  v_timezone text;
  v_today date;
  v_total_units integer := 0;
  v_completed_units integer := 0;
  v_total_lessons integer := 0;
  v_completed_lessons integer := 0;
  v_overall_pct numeric := 0;
  v_total_time_seconds bigint := 0;
  v_today_seconds integer := 0;
  v_today_goal_met boolean := false;
  v_current_streak integer := 0;
  v_latest_streak_date date;
  v_latest_streak_count integer;
  v_resume_lesson jsonb;
  v_next_recommended jsonb;
  v_recent_completed jsonb;
  v_active_lesson_id uuid;
  v_active_unit_id uuid;
  v_active_level_id uuid;
  v_current_unit jsonb;
  v_current_level jsonb;
  v_rewards jsonb;
  v_skills jsonb;
  v_recent_activity jsonb;
  v_result jsonb;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select * into v_profile
  from public.profiles
  where id = v_user_id;

  if v_profile.id is null then
    raise exception 'Profile not found';
  end if;

  v_timezone := coalesce(v_profile.timezone, 'UTC');
  v_today := timezone(v_timezone, now())::date;

  -- Published curriculum totals only.
  select count(*) into v_total_units
  from public.units u
  join public.levels lv on lv.id = u.level_id
  where u.is_published = true
    and lv.is_published = true;

  select count(*) into v_total_lessons
  from public.lessons l
  join public.units u on u.id = l.unit_id
  join public.levels lv on lv.id = u.level_id
  where l.is_published = true
    and u.is_published = true
    and lv.is_published = true;

  -- Compute completed units dynamically from the CURRENT published
  -- lessons, rather than trusting a cached unit status. If curriculum is
  -- expanded later, the count immediately reflects the new requirement.
  select count(*) into v_completed_units
  from (
    select u.id
    from public.units u
    join public.levels lv on lv.id = u.level_id
    join public.lessons l
      on l.unit_id = u.id
      and l.is_published = true
    left join public.user_lesson_progress ulp
      on ulp.lesson_id = l.id
      and ulp.user_id = v_user_id
    where u.is_published = true
      and lv.is_published = true
    group by u.id
    having count(l.id) > 0
       and count(*) filter (where ulp.status = 'COMPLETED') = count(l.id)
  ) completed_units;

  select count(*) into v_completed_lessons
  from public.user_lesson_progress ulp
  join public.lessons l on l.id = ulp.lesson_id
  join public.units u on u.id = l.unit_id
  join public.levels lv on lv.id = u.level_id
  where ulp.user_id = v_user_id
    and ulp.status = 'COMPLETED'
    and l.is_published = true
    and u.is_published = true
    and lv.is_published = true;

  v_overall_pct := case
    when v_total_lessons > 0
      then round(100.0 * v_completed_lessons / v_total_lessons, 2)
    else 0
  end;

  -- Exact daily and all-time study time.
  select
    coalesce(sum(seconds_completed), 0),
    coalesce(max(seconds_completed) filter (where goal_date = v_today), 0),
    coalesce(bool_or(goal_met) filter (where goal_date = v_today), false)
  into
    v_total_time_seconds,
    v_today_seconds,
    v_today_goal_met
  from public.user_daily_goals
  where user_id = v_user_id;

  -- Effective streak becomes 0 after a fully missed calendar day, even
  -- before the learner starts a new study session.
  select study_date, streak_count_after
    into v_latest_streak_date, v_latest_streak_count
  from public.user_streak_logs
  where user_id = v_user_id
  order by study_date desc
  limit 1;

  if v_latest_streak_date is null then
    v_current_streak := 0;
  elsif v_latest_streak_date >= v_today - 1 then
    v_current_streak := coalesce(v_latest_streak_count, 0);
  else
    v_current_streak := 0;
  end if;

  -- Exact unfinished lesson to resume.
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
    'progress_percentage', ulp.progress_percentage,
    'time_spent_seconds', ulp.time_spent_seconds,
    'last_content_block_id', ulp.last_content_block_id,
    'last_content_block_order', lcb.block_order,
    'last_activity_at', ulp.last_activity_at
  )
  into v_resume_lesson
  from public.user_lesson_progress ulp
  join public.lessons l on l.id = ulp.lesson_id
  join public.units u on u.id = l.unit_id
  join public.levels lv on lv.id = u.level_id
  left join public.lesson_content_blocks lcb
    on lcb.id = ulp.last_content_block_id
  where ulp.user_id = v_user_id
    and ulp.status = 'IN_PROGRESS'
    and l.is_published = true
    and u.is_published = true
    and lv.is_published = true
  order by ulp.last_activity_at desc nulls last, ulp.started_at desc
  limit 1;

  -- Actual next curriculum lessons, excluding completed lessons.
  select coalesce(jsonb_agg(x), '[]'::jsonb)
    into v_next_recommended
  from (
    select
      l.id,
      l.title,
      l.lesson_type,
      l.estimated_minutes,
      l.xp_reward,
      l.lesson_order,
      u.id as unit_id,
      u.title as unit_title,
      u.unit_order,
      lv.id as level_id,
      lv.title as level_title,
      lv.level_order,
      coalesce(ulp.progress_percentage, 0) as progress_percentage,
      coalesce(ulp.status::text, 'NOT_STARTED') as status
    from public.lessons l
    join public.units u on u.id = l.unit_id
    join public.levels lv on lv.id = u.level_id
    left join public.user_lesson_progress ulp
      on ulp.lesson_id = l.id
      and ulp.user_id = v_user_id
    where l.is_published = true
      and u.is_published = true
      and lv.is_published = true
      and coalesce(ulp.status::text, 'NOT_STARTED') <> 'COMPLETED'
    order by lv.level_order, u.unit_order, l.lesson_order
    limit 5
  ) x;

  -- Choose the current lesson: resume first, otherwise curriculum-first next.
  if v_resume_lesson is not null then
    v_active_lesson_id := (v_resume_lesson->>'id')::uuid;
    v_active_unit_id := (v_resume_lesson->>'unit_id')::uuid;
    v_active_level_id := (v_resume_lesson->>'level_id')::uuid;
  else
    select l.id, u.id, lv.id
      into v_active_lesson_id, v_active_unit_id, v_active_level_id
    from public.lessons l
    join public.units u on u.id = l.unit_id
    join public.levels lv on lv.id = u.level_id
    left join public.user_lesson_progress ulp
      on ulp.lesson_id = l.id
      and ulp.user_id = v_user_id
    where l.is_published = true
      and u.is_published = true
      and lv.is_published = true
      and coalesce(ulp.status::text, 'NOT_STARTED') <> 'COMPLETED'
    order by lv.level_order, u.unit_order, l.lesson_order
    limit 1;
  end if;

  if v_active_unit_id is not null then
    select jsonb_build_object(
      'id', u.id,
      'title', u.title,
      'unit_order', u.unit_order,
      'completed_lessons_count', counts.completed_count,
      'total_lessons_count', counts.total_count,
      'progress_percentage', case
        when counts.total_count > 0
          then round(100.0 * counts.completed_count / counts.total_count, 2)
        else 0
      end
    )
    into v_current_unit
    from public.units u
    cross join lateral (
      select
        count(*) filter (where ulp.status = 'COMPLETED')::integer as completed_count,
        count(*)::integer as total_count
      from public.lessons l
      left join public.user_lesson_progress ulp
        on ulp.lesson_id = l.id
        and ulp.user_id = v_user_id
      where l.unit_id = u.id
        and l.is_published = true
    ) counts
    where u.id = v_active_unit_id;
  end if;

  if v_active_level_id is not null then
    select jsonb_build_object(
      'id', lv.id,
      'title', lv.title,
      'level_order', lv.level_order
    )
    into v_current_level
    from public.levels lv
    where lv.id = v_active_level_id;
  end if;

  select coalesce(jsonb_agg(x), '[]'::jsonb)
    into v_recent_completed
  from (
    select
      l.id,
      l.title,
      u.title as unit_title,
      ulp.xp_earned as xp_earned,
      ulp.completed_at
    from public.user_lesson_progress ulp
    join public.lessons l on l.id = ulp.lesson_id
    join public.units u on u.id = l.unit_id
    where ulp.user_id = v_user_id
      and ulp.status = 'COMPLETED'
    order by ulp.completed_at desc nulls last
    limit 5
  ) x;

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', r.id,
      'title', r.title,
      'description', r.description,
      'reward_type', r.reward_type,
      'icon_url', r.icon_url,
      'earned_at', ur.earned_at
    ) order by ur.earned_at desc), '[]'::jsonb)
    into v_rewards
  from public.user_rewards ur
  join public.rewards r on r.id = ur.reward_id
  where ur.user_id = v_user_id;

  -- These four skills intentionally start at zero until the quiz-skill
  -- mapping migration is implemented.
  select coalesce(jsonb_agg(jsonb_build_object(
      'id', sc.id,
      'skill', sc.name,
      'xp_earned', coalesce(usp.xp_earned, 0),
      'completed_lessons', coalesce(usp.completed_lessons, 0),
      'progress_percentage', coalesce(usp.progress_percentage, 0)
    ) order by case sc.name
      when 'Vocabulary' then 1
      when 'Grammar' then 2
      when 'Listening' then 3
      when 'Reading' then 4
      else 99
    end), '[]'::jsonb)
    into v_skills
  from public.skill_categories sc
  left join public.user_skill_progress usp
    on usp.skill_category_id = sc.id
    and usp.user_id = v_user_id
  where sc.name in ('Vocabulary', 'Grammar', 'Listening', 'Reading');

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', e.id,
      'event_type', e.event_type,
      'source_type', e.event_type,
      'reference_id', e.reference_id,
      'title', e.title,
      'description', e.title,
      'xp_amount', coalesce((e.metadata->>'xp_awarded')::integer, 0),
      'metadata', e.metadata,
      'created_at', e.created_at
    ) order by e.created_at desc), '[]'::jsonb)
    into v_recent_activity
  from (
    select *
    from public.user_activity_events
    where user_id = v_user_id
    order by created_at desc
    limit 10
  ) e;

  v_result := jsonb_build_object(
    'full_name', v_profile.full_name,
    'timezone', v_timezone,
    'total_xp', coalesce(v_profile.total_xp, 0),
    'current_streak', v_current_streak,
    'longest_streak', coalesce(v_profile.longest_streak, 0),
    'daily_goal_minutes', 30,
    'time_studied_today_seconds', v_today_seconds,
    'total_time_studied_seconds', v_total_time_seconds,
    'today_goal', jsonb_build_object(
      'goal_minutes', 30,
      'minutes_completed', floor(v_today_seconds / 60.0)::integer,
      'seconds_completed', v_today_seconds,
      'goal_met', v_today_goal_met
    ),
    'total_units_count', v_total_units,
    'completed_units_count', v_completed_units,
    'total_lessons_count', v_total_lessons,
    'completed_lessons_count', v_completed_lessons,
    'overall_progress_percentage', v_overall_pct,
    'current_level', v_current_level,
    'current_unit', v_current_unit,
    'resume_lesson', v_resume_lesson,
    'next_recommended_lessons', v_next_recommended,
    'recent_completed_lessons', v_recent_completed,
    'rewards', v_rewards,
    'skills_breakdown', v_skills,
    'recent_activity', v_recent_activity
  );

  return v_result;
end;
$$;

revoke execute on function public.get_user_dashboard() from public;
grant execute on function public.get_user_dashboard() to authenticated;

comment on function public.get_user_dashboard() is
  'Authoritative per-user dashboard: learner-local streak, exact study time, '
  '30-minute daily goal, lesson-based course progress, exact resume lesson, '
  'earned rewards, next/completed lessons, skill zero-state, and real activity history.';

-- ---------------------------------------------------------------------
-- 13. Basic grants for the new read-side tables.
-- ---------------------------------------------------------------------
grant select on public.user_activity_events to authenticated;
grant select on public.user_unit_completion_bonuses to authenticated;
grant select on public.user_streak_milestones to authenticated;
