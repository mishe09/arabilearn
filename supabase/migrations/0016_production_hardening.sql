-- =====================================================================
-- 0016_production_hardening.sql
-- Fixes required before production, per review:
--   1. Stop exposing quiz_options.is_correct / quiz_questions.correct_answer
--   2. Stronger indexes for dashboard/progress performance
--   3. Reliable skill breakdown (explicit FK, not string matching)
--   4. Automatic (not just reactive) streak reset via pg_cron
--   5. Lock down SECURITY DEFINER functions (EXECUTE privileges)
--   6. Extra uniqueness constraints to fully prevent duplicate XP
--   7. Make complete_lesson / complete_quiz / get_user_dashboard the only
--      write/read path for progress data — direct table writes revoked
-- =====================================================================

-- =====================================================================
-- PART 3 — Reliable skill breakdown
-- Previously update_skill_progress_for_lesson() matched skill_categories
-- by string-transforming lesson_type (e.g. 'ALPHABET' -> 'Alphabet').
-- That's fragile: renaming a skill_category or adding a lesson_type that
-- doesn't map 1:1 silently breaks the dashboard's skills_breakdown with
-- no error. Replace it with an explicit, indexed foreign key.
-- =====================================================================

alter table public.lessons
  add column skill_category_id uuid references public.skill_categories(id) on delete set null;

-- Backfill existing rows using the same name convention the old code used,
-- so this migration is a no-op for currently-seeded data.
update public.lessons l
set skill_category_id = sc.id
from public.skill_categories sc
where l.skill_category_id is null
  and sc.name = initcap(replace(l.lesson_type::text, '_', ' '));

create index idx_lessons_skill_category on public.lessons(skill_category_id);

comment on column public.lessons.skill_category_id is
  'Explicit mapping to skill_categories, set at content-authoring time. '
  'Falls back to no skill-progress update if left null (see update_skill_progress_for_lesson).';

-- Rewrite the progress function to use the FK instead of string matching.
create or replace function public.update_skill_progress_for_lesson(
  p_user_id uuid,
  p_lesson_id uuid
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_skill_category_id uuid;
  v_xp_earned integer;
  v_total_lessons_in_skill integer;
  v_completed_lessons_in_skill integer;
begin
  select l.skill_category_id, ulp.xp_earned
    into v_skill_category_id, v_xp_earned
  from public.lessons l
  join public.user_lesson_progress ulp
    on ulp.lesson_id = l.id and ulp.user_id = p_user_id
  where l.id = p_lesson_id;

  if v_skill_category_id is null then
    return; -- lesson has no skill mapping configured; nothing to update
  end if;

  select count(*) into v_total_lessons_in_skill
  from public.lessons l
  where l.skill_category_id = v_skill_category_id and l.is_published = true;

  select count(*) into v_completed_lessons_in_skill
  from public.user_lesson_progress ulp
  join public.lessons l on l.id = ulp.lesson_id
  where ulp.user_id = p_user_id
    and l.skill_category_id = v_skill_category_id
    and ulp.status = 'COMPLETED';

  insert into public.user_skill_progress (
    user_id, skill_category_id, xp_earned, completed_lessons, progress_percentage
  )
  values (
    p_user_id,
    v_skill_category_id,
    coalesce(v_xp_earned, 0),
    v_completed_lessons_in_skill,
    case when v_total_lessons_in_skill > 0
      then round(100.0 * v_completed_lessons_in_skill / v_total_lessons_in_skill, 2)
      else 0 end
  )
  on conflict (user_id, skill_category_id) do update
  set xp_earned = public.user_skill_progress.xp_earned + coalesce(v_xp_earned, 0),
      completed_lessons = excluded.completed_lessons,
      progress_percentage = excluded.progress_percentage,
      updated_at = now();
end;
$$;

-- =====================================================================
-- PART 1 — Stop exposing quiz answers to students
-- Previously, students could SELECT quiz_options (including is_correct)
-- and quiz_questions (including correct_answer) directly for any
-- published lesson. Lock those columns down at the table level and
-- serve an answer-free version through a dedicated RPC, mirroring the
-- pattern already used for lesson completion.
-- =====================================================================

drop policy if exists "quiz_questions_select_published" on public.quiz_questions;
create policy "quiz_questions_select_admin_only" on public.quiz_questions
  for select using (public.has_permission('curriculum.view'));

drop policy if exists "quiz_options_select_published" on public.quiz_options;
create policy "quiz_options_select_admin_only" on public.quiz_options
  for select using (public.has_permission('curriculum.view'));

-- Students now reach quiz content exclusively through this function,
-- which strips is_correct / correct_answer and checks publish status.
create or replace function public.get_quiz_for_lesson(p_lesson_id uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_result jsonb;
begin
  if not exists (
    select 1 from public.lessons where id = p_lesson_id and is_published = true
  ) then
    raise exception 'Lesson not found or not published';
  end if;

  select jsonb_build_object(
    'quiz_id', q.id,
    'title', q.title,
    'passing_score', q.passing_score,
    'xp_reward', q.xp_reward,
    'questions', coalesce(jsonb_agg(
      jsonb_build_object(
        'id', qq.id,
        'question_text', qq.question_text,
        'question_type', qq.question_type,
        'arabic_text', qq.arabic_text,
        'hausa_prompt', qq.hausa_prompt,
        'english_prompt', qq.english_prompt,
        'points', qq.points,
        'question_order', qq.question_order,
        'options', (
          select coalesce(jsonb_agg(
            jsonb_build_object('id', qo.id, 'option_text', qo.option_text, 'option_order', qo.option_order)
            order by qo.option_order
          ), '[]'::jsonb)
          from public.quiz_options qo
          where qo.question_id = qq.id
        )
      ) order by qq.question_order
    ) filter (where qq.id is not null), '[]'::jsonb)
  )
  into v_result
  from public.quizzes q
  left join public.quiz_questions qq on qq.quiz_id = q.id
  where q.lesson_id = p_lesson_id
  group by q.id;

  return coalesce(v_result, jsonb_build_object('quiz_id', null, 'questions', '[]'::jsonb));
end;
$$;

comment on function public.get_quiz_for_lesson is
  'Answer-free quiz payload for the "take quiz" screen. Grading happens '
  'server-side in complete_quiz(); the client never sees is_correct or correct_answer.';

-- =====================================================================
-- PART 2 — Indexes for dashboard / progress performance
-- =====================================================================

create index if not exists idx_units_level_published_order
  on public.units(level_id, is_published, unit_order);

create index if not exists idx_lessons_unit_published_order
  on public.lessons(unit_id, is_published, lesson_order);

create index if not exists idx_lessons_type_published
  on public.lessons(lesson_type, is_published);

create index if not exists idx_uup_user_status_started
  on public.user_unit_progress(user_id, status, started_at desc);

create index if not exists idx_ulevp_user_status
  on public.user_level_progress(user_id, status);

create index if not exists idx_xp_tx_user_created
  on public.xp_transactions(user_id, created_at desc);

create index if not exists idx_quiz_attempts_user_quiz
  on public.quiz_attempts(user_id, quiz_id, completed_at desc);

-- =====================================================================
-- PART 6 — Close remaining duplicate-XP gaps
--
-- 0004 already guarantees at most one LESSON_COMPLETION and one
-- QUIZ_COMPLETION xp_transaction per (user, source). REWARD and
-- STREAK_BONUS were not covered:
--   - REWARD: check_and_award_rewards() has a check-then-insert race
--     (two concurrent calls can both pass the "not already earned" check
--     before either commits). Add a DB-level backstop.
--   - STREAK_BONUS previously used source_id = user_id (a constant), so
--     it could never have been protected by a per-source unique index
--     without also blocking every future day's bonus. Switch it to a
--     value deterministic per (user, day) so a per-day guarantee is
--     actually enforceable.
-- =====================================================================

create unique index if not exists uq_xp_tx_reward_once
  on public.xp_transactions(user_id, source_id)
  where source_type = 'REWARD';

create unique index if not exists uq_xp_tx_streak_bonus_per_day
  on public.xp_transactions(user_id, source_id)
  where source_type = 'STREAK_BONUS';

-- Redefine log_study_time to derive a per-(user, day) deterministic
-- source_id for the streak bonus instead of reusing user_id.
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
  v_user_id uuid := auth.uid();
  v_goal_minutes integer;
  v_prev_streak integer;
  v_longest_streak integer;
  v_yesterday_logged boolean;
  v_yesterday_goal_met boolean;
  v_freezes integer;
  v_new_streak integer;
  v_total_minutes_today integer;
  v_goal_met boolean;
  v_already_met_today boolean;
  v_streak_bonus_source_id uuid;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select daily_goal_minutes, current_streak, longest_streak, streak_freezes_available
    into v_goal_minutes, v_prev_streak, v_longest_streak, v_freezes
  from public.profiles where id = v_user_id;

  select goal_met into v_already_met_today
  from public.user_streak_logs
  where user_id = v_user_id and study_date = p_study_date;
  v_already_met_today := coalesce(v_already_met_today, false);

  insert into public.user_daily_goals (user_id, goal_date, goal_minutes, minutes_completed, goal_met)
  values (v_user_id, p_study_date, v_goal_minutes, p_minutes, p_minutes >= v_goal_minutes)
  on conflict (user_id, goal_date) do update
  set minutes_completed = public.user_daily_goals.minutes_completed + excluded.minutes_completed,
      goal_met = (public.user_daily_goals.minutes_completed + excluded.minutes_completed) >= public.user_daily_goals.goal_minutes
  returning minutes_completed, goal_met into v_total_minutes_today, v_goal_met;

  if not v_goal_met then
    insert into public.user_streak_logs (user_id, study_date, minutes_studied, goal_met, streak_count_after)
    values (v_user_id, p_study_date, v_total_minutes_today, false, v_prev_streak)
    on conflict (user_id, study_date) do update
    set minutes_studied = excluded.minutes_studied;

    update public.profiles set last_studied_at = now() where id = v_user_id;
    return;
  end if;

  if v_already_met_today then
    update public.user_streak_logs
    set minutes_studied = v_total_minutes_today
    where user_id = v_user_id and study_date = p_study_date;

    update public.profiles set last_studied_at = now() where id = v_user_id;
    return;
  end if;

  select goal_met into v_yesterday_goal_met
  from public.user_streak_logs
  where user_id = v_user_id and study_date = p_study_date - interval '1 day';

  v_yesterday_logged := v_yesterday_goal_met is not null;

  if not v_yesterday_logged and v_prev_streak > 0 then
    if v_freezes > 0 then
      update public.profiles set streak_freezes_available = streak_freezes_available - 1
      where id = v_user_id;
      insert into public.streak_freeze_logs (user_id, used_on_date)
      values (v_user_id, p_study_date - interval '1 day');
      v_new_streak := v_prev_streak + 1;
    else
      v_new_streak := 1;
    end if;
  elsif v_yesterday_goal_met = false and v_prev_streak > 0 then
    if v_freezes > 0 then
      update public.profiles set streak_freezes_available = streak_freezes_available - 1
      where id = v_user_id;
      insert into public.streak_freeze_logs (user_id, used_on_date)
      values (v_user_id, p_study_date - interval '1 day');
      v_new_streak := v_prev_streak + 1;
    else
      v_new_streak := 1;
    end if;
  else
    v_new_streak := v_prev_streak + 1;
  end if;

  v_longest_streak := greatest(v_longest_streak, v_new_streak);

  update public.profiles
  set current_streak = v_new_streak,
      longest_streak = v_longest_streak,
      last_studied_at = now()
  where id = v_user_id;

  insert into public.user_streak_logs (user_id, study_date, minutes_studied, goal_met, streak_count_after)
  values (v_user_id, p_study_date, v_total_minutes_today, true, v_new_streak)
  on conflict (user_id, study_date) do update
  set minutes_studied = excluded.minutes_studied,
      goal_met = true,
      streak_count_after = v_new_streak;

  -- deterministic per (user, day) id so uq_xp_tx_streak_bonus_per_day can
  -- catch duplicate awards, while still allowing one bonus per new day
  v_streak_bonus_source_id := uuid_generate_v5(uuid_ns_url(), 'streak:' || v_user_id::text || ':' || p_study_date::text);

  perform public.award_xp(
    v_user_id, 'STREAK_BONUS', v_streak_bonus_source_id, least(v_new_streak, 10) * 2,
    'Streak bonus for day ' || v_new_streak
  );

  perform public.check_and_award_rewards(v_user_id);
end;
$$;

-- =====================================================================
-- PART 4 — Automatic (not just reactive) streak reset
--
-- Previously, a broken streak was only detected/resolved the next time
-- the user called log_study_time(). A user who simply stops using the
-- app keeps an inflated current_streak forever. Add a function that
-- proactively resolves "yesterday" for every user once a day, and
-- schedule it with pg_cron if available.
-- =====================================================================

create or replace function public.process_daily_streak_resets(p_as_of_date date default current_date)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_missed_date date := p_as_of_date - interval '1 day';
begin
  for r in
    select p.id as user_id, p.current_streak, p.streak_freezes_available
    from public.profiles p
    where p.current_streak > 0
      -- yesterday wasn't already resolved as a goal-met day
      and not exists (
        select 1 from public.user_streak_logs usl
        where usl.user_id = p.id and usl.study_date = v_missed_date and usl.goal_met = true
      )
      -- and the user hasn't already logged anything for as_of_date;
      -- if they have, log_study_time's reactive path owns "today"
      and not exists (
        select 1 from public.user_streak_logs usl2
        where usl2.user_id = p.id and usl2.study_date = p_as_of_date
      )
  loop
    if r.streak_freezes_available > 0 then
      update public.profiles
      set streak_freezes_available = streak_freezes_available - 1
      where id = r.user_id;

      insert into public.streak_freeze_logs (user_id, used_on_date, reason)
      values (r.user_id, v_missed_date, 'auto_cron_missed_day');

      insert into public.user_streak_logs (user_id, study_date, minutes_studied, goal_met, streak_count_after)
      values (r.user_id, v_missed_date, 0, true, r.current_streak)
      on conflict (user_id, study_date) do nothing;
    else
      update public.profiles
      set current_streak = 0
      where id = r.user_id;

      insert into public.user_streak_logs (user_id, study_date, minutes_studied, goal_met, streak_count_after)
      values (r.user_id, v_missed_date, 0, false, 0)
      on conflict (user_id, study_date) do nothing;
    end if;
  end loop;
end;
$$;

comment on function public.process_daily_streak_resets is
  'Run once daily (via pg_cron below, or an external scheduler) to resolve '
  'streaks for users who went quiet rather than waiting for their next visit.';

-- Attempt to enable pg_cron and schedule the job. On Supabase-hosted
-- projects pg_cron is available but may need to be turned on first via
-- Dashboard > Database > Extensions if this DO block reports a notice
-- instead of succeeding (self-hosted/local Postgres without the pg_cron
-- binary installed will also hit this path).
do $$
begin
  execute 'create extension if not exists pg_cron with schema extensions';
exception when others then
  raise notice 'pg_cron not enabled automatically (%). Enable it via Supabase Dashboard > Database > Extensions, then run: select cron.schedule(''process-daily-streak-resets'', ''5 0 * * *'', $job$select public.process_daily_streak_resets();$job$);', sqlerrm;
end;
$$;

do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.schedule(
      'process-daily-streak-resets',
      '5 0 * * *',
      $job$select public.process_daily_streak_resets();$job$
    );
  end if;
exception when others then
  raise notice 'Could not schedule pg_cron job automatically (%). Schedule it manually once pg_cron is enabled.', sqlerrm;
end;
$$;

-- =====================================================================
-- PART 5 — Lock down SECURITY DEFINER functions
--
-- Postgres grants EXECUTE to PUBLIC by default on every new function.
-- Combined with SECURITY DEFINER, that means any authenticated user
-- could previously call e.g. award_xp(any_user_id, 'REWARD', ..., 999999)
-- directly and credit themselves or anyone else arbitrary XP, or call
-- check_and_award_rewards(other_user_id) / update_skill_progress_for_lesson
-- out of band. Revoke PUBLIC execute on every function in this schema,
-- then explicitly grant back only what each role actually needs:
--   - internal helpers (award_xp, update_skill_progress_for_lesson,
--     check_and_award_rewards, trigger functions, cron function):
--     no direct grants — only reachable via other SECURITY DEFINER
--     functions running as the function owner, or via pg_cron.
--   - has_permission / has_role: needed by RLS policies themselves,
--     evaluated as the querying role, so authenticated + anon need it.
--   - complete_lesson / complete_quiz / log_study_time / get_user_dashboard
--     / get_quiz_for_lesson: the actual frontend contract, authenticated only.
-- =====================================================================

revoke execute on all functions in schema public from public;

grant execute on function public.has_permission(text, uuid) to authenticated, anon;
grant execute on function public.has_role(app_role, uuid) to authenticated, anon;

grant execute on function public.complete_lesson(uuid, integer) to authenticated;
grant execute on function public.complete_quiz(uuid, jsonb) to authenticated;
grant execute on function public.log_study_time(integer, date) to authenticated;
grant execute on function public.get_user_dashboard() to authenticated;
grant execute on function public.get_quiz_for_lesson(uuid) to authenticated;

-- award_xp, update_skill_progress_for_lesson, check_and_award_rewards,
-- process_daily_streak_resets, handle_new_user, set_updated_at are all
-- intentionally left with NO direct grants: they run only as nested calls
-- inside the SECURITY DEFINER functions above (which execute as the
-- function owner, not the caller), as a trigger, or via pg_cron.

-- Any future function created in this schema should get the same
-- default-deny treatment; set that as the default going forward.
alter default privileges in schema public revoke execute on functions from public;

comment on function public.award_xp is
  'Internal only — not directly callable by API roles. Reached exclusively '
  'through complete_lesson / complete_quiz / log_study_time / check_and_award_rewards.';

-- =====================================================================
-- PART 7 — Make the RPC functions the only write path for progress data
--
-- Previously students could INSERT/UPDATE user_level_progress,
-- user_unit_progress, user_lesson_progress, quiz_attempts, and
-- quiz_attempt_answers directly, bypassing complete_lesson()/
-- complete_quiz() entirely — e.g. inserting a COMPLETED lesson row
-- without ever going through the idempotency/XP/skill/reward logic, or
-- fabricating a passed quiz_attempt. Remove client write access to these
-- tables; they become read-your-own-row only. All writes now happen
-- exclusively inside the SECURITY DEFINER RPC functions, which run as
-- the function owner and are unaffected by this RLS change.
-- =====================================================================

drop policy if exists "ulevp_write_own" on public.user_level_progress;
drop policy if exists "ulevp_update_own" on public.user_level_progress;

drop policy if exists "uup_write_own" on public.user_unit_progress;
drop policy if exists "uup_update_own" on public.user_unit_progress;

drop policy if exists "ulp_write_own" on public.user_lesson_progress;
drop policy if exists "ulp_update_own" on public.user_lesson_progress;

drop policy if exists "quiz_attempts_write_own" on public.quiz_attempts;
drop policy if exists "quiz_attempts_update_own" on public.quiz_attempts;

drop policy if exists "qaa_write_own" on public.quiz_attempt_answers;

comment on table public.user_lesson_progress is
  'Read-only to clients (RLS: select-own). All writes happen inside complete_lesson().';
comment on table public.quiz_attempts is
  'Read-only to clients (RLS: select-own). All writes happen inside complete_quiz().';




