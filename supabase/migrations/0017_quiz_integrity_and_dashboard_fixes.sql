-- =====================================================================
-- 0017_quiz_integrity_and_dashboard_fixes.sql
--
-- Fixes:
--   1. Duplicate quiz answers could inflate score
--   2. complete_quiz() didn't verify the full publish chain
--   3. get_user_dashboard() recommendation ordering/publish filters
--   4. get_user_dashboard() studied-time source inconsistent with
--      log_study_time() (Option B: read from user_daily_goals)
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1a. Hard constraint: one answer per question per attempt.
-- ---------------------------------------------------------------------
alter table public.quiz_attempt_answers
  add constraint uq_quiz_attempt_answer_per_question unique (attempt_id, question_id);

-- ---------------------------------------------------------------------
-- 2a. quizzes gets its own is_published flag (independent of the parent
-- lesson, so a specific quiz can be taken offline without unpublishing
-- the whole lesson). Defaults true so existing seeded quizzes keep working.
-- ---------------------------------------------------------------------
alter table public.quizzes
  add column is_published boolean not null default true;

-- Update the existing "published" RLS policy on quizzes to also require
-- quizzes.is_published, preserving the same admin-bypass shape as before.
drop policy if exists "quizzes_select_published" on public.quizzes;
create policy "quizzes_select_published" on public.quizzes
  for select using (
    (is_published = true
      and exists (select 1 from public.lessons l where l.id = lesson_id and l.is_published = true))
    or public.has_permission('curriculum.view')
  );

-- ---------------------------------------------------------------------
-- 1b/2b. Redefine complete_quiz():
--   - verifies quizzes.is_published, lessons.is_published,
--     units.is_published, levels.is_published (full chain)
--   - de-duplicates p_answers by question_id before grading (keeps the
--     first occurrence in submission order; later duplicates are dropped)
--   - the insert into quiz_attempt_answers is additionally protected by
--     the new unique constraint (ON CONFLICT DO NOTHING) as a hard
--     backstop in case the de-dup step is ever bypassed
--   - selected_option_id is only honored if it actually belongs to the
--     question being answered (already true before, made explicit here)
--   - the final score is computed by re-reading the persisted
--     quiz_attempt_answers rows for this attempt, not from a running
--     total accumulated during the loop, so the stored score can never
--     drift from what's actually in the table (and the unique
--     constraint guarantees each question contributes at most once)
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
  v_quiz_published boolean;
  v_lesson_published boolean;
  v_unit_published boolean;
  v_level_published boolean;
  v_passing_score integer;
  v_xp_reward integer;
  v_total_points integer := 0;
  v_earned_points integer := 0;
  v_score numeric := 0;
  v_passed boolean := false;
  v_xp_granted integer := 0;
  v_already_awarded boolean;
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
    q.lesson_id, q.passing_score, q.xp_reward, q.is_published,
    l.unit_id, l.is_published,
    u.level_id, u.is_published,
    lv.is_published
  into
    v_lesson_id, v_passing_score, v_xp_reward, v_quiz_published,
    v_unit_id, v_lesson_published,
    v_level_id, v_unit_published,
    v_level_published
  from public.quizzes q
  join public.lessons l on l.id = q.lesson_id
  join public.units u on u.id = l.unit_id
  join public.levels lv on lv.id = u.level_id
  where q.id = p_quiz_id;

  if v_lesson_id is null then
    raise exception 'Quiz not found';
  end if;

  if not (v_quiz_published and v_lesson_published and v_unit_published and v_level_published) then
    raise exception 'This quiz is not currently available (unpublished content in its level/unit/lesson/quiz chain)';
  end if;

  insert into public.quiz_attempts (user_id, quiz_id, started_at)
  values (v_user_id, p_quiz_id, now())
  returning id into v_attempt_id;

  select coalesce(sum(points), 0) into v_total_points
  from public.quiz_questions where quiz_id = p_quiz_id;

  -- De-duplicate submitted answers by question_id: keep only the first
  -- occurrence in array order, so a client submitting the same question
  -- twice (accidentally or deliberately) can never be scored twice for it.
  select coalesce(jsonb_agg(first_answer), '[]'::jsonb)
    into v_deduped_answers
  from (
    select distinct on (elem->>'question_id') elem as first_answer
    from jsonb_array_elements(p_answers) with ordinality as t(elem, ord)
    order by elem->>'question_id', ord
  ) dedup;

  for ans in select * from jsonb_array_elements(v_deduped_answers)
  loop
    select * into v_question
    from public.quiz_questions
    where id = (ans->>'question_id')::uuid and quiz_id = p_quiz_id;

    if v_question.id is null then
      continue; -- question doesn't belong to this quiz; ignore safely
    end if;

    v_selected_option_id := nullif(ans->>'option_id', '')::uuid;

    if v_question.question_type in ('MULTIPLE_CHOICE', 'MATCHING', 'LISTENING') then
      -- The option must belong to THIS question. Filtering on both id and
      -- question_id means a mismatched option_id (wrong question) matches
      -- no row here. A fabricated/nonexistent option_id matches no row
      -- either. Both cases are "not found" and are treated identically:
      -- ignored safely (scored incorrect, no dangling FK reference stored)
      -- rather than raising an error the client would need to handle.
      select is_correct into v_is_correct
      from public.quiz_options
      where id = v_selected_option_id and question_id = v_question.id;

      if not found then
        v_is_correct := false;
        v_selected_option_id := null;
      end if;
    else -- TRUE_FALSE / FILL_BLANK compare text answer
      v_selected_option_id := null;
      v_is_correct := lower(trim(coalesce(ans->>'answer_text', ''))) =
                       lower(trim(coalesce(v_question.correct_answer, '')));
    end if;

    insert into public.quiz_attempt_answers (
      attempt_id, question_id, selected_option_id, answer_text, is_correct, points_awarded
    )
    values (
      v_attempt_id,
      v_question.id,
      v_selected_option_id,
      ans->>'answer_text',
      v_is_correct,
      case when v_is_correct then v_question.points else 0 end
    )
    on conflict (attempt_id, question_id) do nothing; -- hard backstop, see comment above
  end loop;

  -- Score from what's actually persisted, not the loop's running total —
  -- this is the number the unique constraint guarantees is duplicate-free.
  select coalesce(sum(points_awarded), 0) into v_earned_points
  from public.quiz_attempt_answers
  where attempt_id = v_attempt_id;

  v_score := case when v_total_points > 0
    then round(100.0 * v_earned_points / v_total_points, 2)
    else 0 end;
  v_passed := v_score >= v_passing_score;

  if v_passed then
    v_already_awarded := public.award_xp(
      v_user_id, 'QUIZ_COMPLETION', p_quiz_id, v_xp_reward, 'Quiz passed'
    );
    if v_already_awarded then
      v_xp_granted := v_xp_reward;
    end if;
  end if;

  update public.quiz_attempts
  set score = v_score, passed = v_passed, xp_earned = v_xp_granted, completed_at = now()
  where id = v_attempt_id;

  return query select v_attempt_id, v_score, v_passed, v_xp_granted;
end;
$$;

-- CREATE OR REPLACE preserves the function's existing ACL (grants) as long
-- as the signature is unchanged, but we re-assert it explicitly so this
-- migration is correct standalone, per the "SECURITY DEFINER functions
-- must have explicit revoke/grant" requirement.
revoke execute on function public.complete_quiz(uuid, jsonb) from public;
grant execute on function public.complete_quiz(uuid, jsonb) to authenticated;

-- ---------------------------------------------------------------------
-- 2c. get_quiz_for_lesson() also gets the is_published check for quizzes,
-- for consistency with complete_quiz(). It already required the parent
-- lesson to be published; now it also skips unpublished quizzes within
-- a published lesson (e.g. a quiz being reworked) instead of surfacing it.
-- ---------------------------------------------------------------------
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
  where q.lesson_id = p_lesson_id and q.is_published = true
  group by q.id;

  return coalesce(v_result, jsonb_build_object('quiz_id', null, 'questions', '[]'::jsonb));
end;
$$;

revoke execute on function public.get_quiz_for_lesson(uuid) from public;
grant execute on function public.get_quiz_for_lesson(uuid) to authenticated;

-- ---------------------------------------------------------------------
-- 3 & 4. Redefine get_user_dashboard():
--   - next_recommended_lessons ordered by levels.level_order,
--     units.unit_order, lessons.lesson_order (previously only ordered by
--     unit_order, lesson_order — level ordering was missing)
--   - filters require levels.is_published AND units.is_published AND
--     lessons.is_published (previously only checked lessons.is_published)
--   - still excludes lessons the user already completed
--   - time_studied_today_seconds now reads
--     user_daily_goals.minutes_completed * 60 for current_date (falls
--     back to 0 if no row exists yet), instead of summing study_sessions,
--     so it always agrees with today_goal (same underlying row)
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
  v_result jsonb;
  v_profile record;
  v_completed_units integer;
  v_completed_lessons integer;
  v_current_level jsonb;
  v_current_unit jsonb;
  v_next_recommended jsonb;
  v_rewards jsonb;
  v_skills jsonb;
  v_recent_activity jsonb;
  v_overall_pct numeric;
  v_today_goal_row record;
  v_today_goal jsonb;
  v_time_studied_today_seconds integer;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select * into v_profile from public.profiles where id = v_user_id;
  if v_profile.id is null then
    raise exception 'Profile not found';
  end if;

  select count(*) into v_completed_units
  from public.user_unit_progress where user_id = v_user_id and status = 'COMPLETED';

  select count(*) into v_completed_lessons
  from public.user_lesson_progress where user_id = v_user_id and status = 'COMPLETED';

  select jsonb_build_object('id', l.id, 'title', l.title, 'level_order', l.level_order)
    into v_current_level
  from public.levels l
  where l.id = v_profile.current_level_id;

  select jsonb_build_object('id', u.id, 'title', u.title, 'unit_order', u.unit_order)
    into v_current_unit
  from public.user_unit_progress uup
  join public.units u on u.id = uup.unit_id
  where uup.user_id = v_user_id and uup.status = 'IN_PROGRESS'
  order by uup.started_at desc
  limit 1;

  -- next recommended lessons: next 3 lessons across the whole published
  -- curriculum, walked in true curriculum order (level, then unit, then
  -- lesson), skipping anything the user has already completed.
  select coalesce(jsonb_agg(x), '[]'::jsonb) into v_next_recommended
  from (
    select l.id, l.title, l.lesson_type, l.xp_reward, u.title as unit_title
    from public.lessons l
    join public.units u on u.id = l.unit_id
    join public.levels lv on lv.id = u.level_id
    where l.is_published = true
      and u.is_published = true
      and lv.is_published = true
      and not exists (
        select 1 from public.user_lesson_progress ulp
        where ulp.lesson_id = l.id and ulp.user_id = v_user_id and ulp.status = 'COMPLETED'
      )
    order by lv.level_order, u.unit_order, l.lesson_order
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

  -- Single source of truth for "today": one row read, used for both
  -- today_goal and time_studied_today_seconds, so they can never disagree.
  select goal_minutes, minutes_completed, goal_met
    into v_today_goal_row
  from public.user_daily_goals
  where user_id = v_user_id and goal_date = current_date;

  if v_today_goal_row is null then
    v_today_goal := jsonb_build_object(
      'goal_minutes', v_profile.daily_goal_minutes,
      'minutes_completed', 0,
      'goal_met', false
    );
    v_time_studied_today_seconds := 0;
  else
    v_today_goal := jsonb_build_object(
      'goal_minutes', v_today_goal_row.goal_minutes,
      'minutes_completed', v_today_goal_row.minutes_completed,
      'goal_met', v_today_goal_row.goal_met
    );
    v_time_studied_today_seconds := v_today_goal_row.minutes_completed * 60;
  end if;

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
    'time_studied_today_seconds', v_time_studied_today_seconds,
    'today_goal', v_today_goal,
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

revoke execute on function public.get_user_dashboard() from public;
grant execute on function public.get_user_dashboard() to authenticated;

comment on function public.get_user_dashboard is
  'time_studied_today_seconds and today_goal both derive from the same '
  'user_daily_goals row for current_date (Option B), so they can never '
  'disagree. study_sessions is still logged separately for session-level '
  'detail but no longer feeds this figure.';

-- ---------------------------------------------------------------------
-- Defensive uniqueness for seed-idempotency support (does not change
-- application behavior; lets 0015's seed reliably use natural-key lookups
-- for radio stations and rewards without relying on bare ON CONFLICT,
-- which only catches conflicts against an existing unique constraint).
-- ---------------------------------------------------------------------
alter table public.radio_stations add constraint uq_radio_stations_name unique (name);
alter table public.rewards add constraint uq_rewards_title unique (title);
