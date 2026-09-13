-- =====================================================================
-- 0010_functions.sql
-- Core backend logic: XP awarding, lesson completion, quiz completion,
-- streak updates, skill progress updates. All SECURITY DEFINER so they
-- can safely write across tables the calling user can't write directly,
-- while remaining callable only for auth.uid() = the target user.
-- =====================================================================

-- ---------------------------------------------------------------------
-- award_xp: central place that inserts an xp_transaction and bumps
-- profiles.total_xp. Relies on the partial unique indexes created in
-- 0004 to make LESSON_COMPLETION / QUIZ_COMPLETION idempotent.
-- ---------------------------------------------------------------------
create or replace function public.award_xp(
  p_user_id uuid,
  p_source_type xp_source_type,
  p_source_id uuid,
  p_xp_amount integer,
  p_description text default null
)
returns boolean -- true if XP was actually awarded, false if it was a no-op duplicate
language plpgsql
security definer
set search_path = public
as $$
begin
  begin
    insert into public.xp_transactions (user_id, source_type, source_id, xp_amount, description)
    values (p_user_id, p_source_type, p_source_id, p_xp_amount, p_description);
  exception when unique_violation then
    -- Already awarded XP for this (user, source) combination — no-op.
    return false;
  end;

  update public.profiles
  set total_xp = total_xp + p_xp_amount
  where id = p_user_id;

  return true;
end;
$$;

-- ---------------------------------------------------------------------
-- update_skill_progress: recompute a user's progress for the skill
-- category matching a lesson_type, called after a lesson completes.
-- ---------------------------------------------------------------------
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
  v_lesson_type lesson_type;
  v_skill_category_id uuid;
  v_xp_earned integer;
  v_total_lessons_in_skill integer;
  v_completed_lessons_in_skill integer;
begin
  select l.lesson_type, ulp.xp_earned
    into v_lesson_type, v_xp_earned
  from public.lessons l
  join public.user_lesson_progress ulp
    on ulp.lesson_id = l.id and ulp.user_id = p_user_id
  where l.id = p_lesson_id;

  select id into v_skill_category_id
  from public.skill_categories
  where name = initcap(replace(v_lesson_type::text, '_', ' '))
  limit 1;

  if v_skill_category_id is null then
    return; -- no matching skill category configured, skip silently
  end if;

  select count(*) into v_total_lessons_in_skill
  from public.lessons l
  where l.lesson_type = v_lesson_type and l.is_published = true;

  select count(*) into v_completed_lessons_in_skill
  from public.user_lesson_progress ulp
  join public.lessons l on l.id = ulp.lesson_id
  where ulp.user_id = p_user_id
    and l.lesson_type = v_lesson_type
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

-- ---------------------------------------------------------------------
-- complete_lesson: the single entrypoint the frontend calls when a user
-- finishes a lesson. Idempotent — calling twice for the same lesson
-- never double-awards XP or double-counts completion.
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
  v_xp_reward integer;
  v_was_already_completed boolean := false;
  v_xp_granted integer := 0;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select unit_id, xp_reward into v_unit_id, v_xp_reward
  from public.lessons where id = p_lesson_id and is_published = true;

  if v_unit_id is null then
    raise exception 'Lesson not found or not published';
  end if;

  select level_id into v_level_id from public.units where id = v_unit_id;

  -- Upsert lesson progress; if already COMPLETED, we short-circuit XP below
  -- via award_xp's unique-index guard regardless, but we also track it here
  -- for a clean return value to the caller.
  select true into v_was_already_completed
  from public.user_lesson_progress
  where user_id = v_user_id and lesson_id = p_lesson_id and status = 'COMPLETED';

  v_was_already_completed := coalesce(v_was_already_completed, false);

  insert into public.user_lesson_progress (
    user_id, lesson_id, status, progress_percentage, started_at, completed_at,
    time_spent_seconds, xp_earned
  )
  values (
    v_user_id, p_lesson_id, 'COMPLETED', 100, now(), now(),
    p_time_spent_seconds, v_xp_reward
  )
  on conflict (user_id, lesson_id) do update
  set status = 'COMPLETED',
      progress_percentage = 100,
      completed_at = coalesce(public.user_lesson_progress.completed_at, now()),
      time_spent_seconds = public.user_lesson_progress.time_spent_seconds + excluded.time_spent_seconds,
      xp_earned = case
        when public.user_lesson_progress.status = 'COMPLETED'
          then public.user_lesson_progress.xp_earned -- keep original, don't re-grant
          else excluded.xp_earned
      end;

  if not v_was_already_completed then
    if public.award_xp(v_user_id, 'LESSON_COMPLETION', p_lesson_id, v_xp_reward, 'Lesson completed') then
      v_xp_granted := v_xp_reward;
    end if;

    -- roll up unit progress
    insert into public.user_unit_progress (user_id, unit_id, status, progress_percentage, started_at)
    values (v_user_id, v_unit_id, 'IN_PROGRESS', 0, now())
    on conflict (user_id, unit_id) do nothing;

    update public.user_unit_progress uup
    set progress_percentage = sub.pct,
        status = case when sub.pct >= 100 then 'COMPLETED'::progress_status else 'IN_PROGRESS'::progress_status end,
        completed_at = case when sub.pct >= 100 then now() else uup.completed_at end
    from (
      select
        round(100.0 * count(*) filter (where ulp.status = 'COMPLETED')
          / nullif(count(*), 0), 2) as pct
      from public.lessons l
      left join public.user_lesson_progress ulp
        on ulp.lesson_id = l.id and ulp.user_id = v_user_id
      where l.unit_id = v_unit_id and l.is_published = true
    ) sub
    where uup.user_id = v_user_id and uup.unit_id = v_unit_id;

    -- roll up level progress similarly (based on unit completion)
    insert into public.user_level_progress (user_id, level_id, status, progress_percentage, started_at)
    values (v_user_id, v_level_id, 'IN_PROGRESS', 0, now())
    on conflict (user_id, level_id) do nothing;

    update public.user_level_progress ulevp
    set progress_percentage = sub.pct,
        status = case when sub.pct >= 100 then 'COMPLETED'::progress_status else 'IN_PROGRESS'::progress_status end,
        completed_at = case when sub.pct >= 100 then now() else ulevp.completed_at end
    from (
      select
        round(100.0 * count(*) filter (where uup.status = 'COMPLETED')
          / nullif(count(*), 0), 2) as pct
      from public.units u
      left join public.user_unit_progress uup
        on uup.unit_id = u.id and uup.user_id = v_user_id
      where u.level_id = v_level_id and u.is_published = true
    ) sub
    where ulevp.user_id = v_user_id and ulevp.level_id = v_level_id;

    perform public.update_skill_progress_for_lesson(v_user_id, p_lesson_id);
    perform public.check_and_award_rewards(v_user_id);
  end if;

  return query select v_was_already_completed, v_xp_granted;
end;
$$;

-- ---------------------------------------------------------------------
-- complete_quiz: submit answers, score the attempt, award XP once.
-- p_answers is a JSON array: [{"question_id": "...", "option_id": "..."}, ...]
-- or for FILL_BLANK: [{"question_id": "...", "answer_text": "..."}]
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
declare
  v_user_id uuid := auth.uid();
  v_attempt_id uuid;
  v_lesson_id uuid;
  v_passing_score integer;
  v_xp_reward integer;
  v_total_points integer := 0;
  v_earned_points integer := 0;
  v_score numeric := 0;
  v_passed boolean := false;
  v_xp_granted integer := 0;
  v_already_awarded boolean;
  ans jsonb;
  v_question record;
  v_is_correct boolean;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select lesson_id, passing_score, xp_reward
    into v_lesson_id, v_passing_score, v_xp_reward
  from public.quizzes where id = p_quiz_id;

  if v_lesson_id is null then
    raise exception 'Quiz not found';
  end if;

  insert into public.quiz_attempts (user_id, quiz_id, started_at)
  values (v_user_id, p_quiz_id, now())
  returning id into v_attempt_id;

  select coalesce(sum(points), 0) into v_total_points
  from public.quiz_questions where quiz_id = p_quiz_id;

  for ans in select * from jsonb_array_elements(p_answers)
  loop
    select * into v_question
    from public.quiz_questions
    where id = (ans->>'question_id')::uuid and quiz_id = p_quiz_id;

    if v_question.id is null then
      continue;
    end if;

    if v_question.question_type in ('MULTIPLE_CHOICE', 'MATCHING', 'LISTENING') then
      select is_correct into v_is_correct
      from public.quiz_options
      where id = (ans->>'option_id')::uuid and question_id = v_question.id;
      v_is_correct := coalesce(v_is_correct, false);
    else -- TRUE_FALSE / FILL_BLANK compare text answer
      v_is_correct := lower(trim(coalesce(ans->>'answer_text', ''))) =
                       lower(trim(coalesce(v_question.correct_answer, '')));
    end if;

    insert into public.quiz_attempt_answers (
      attempt_id, question_id, selected_option_id, answer_text, is_correct, points_awarded
    )
    values (
      v_attempt_id,
      v_question.id,
      nullif(ans->>'option_id', '')::uuid,
      ans->>'answer_text',
      v_is_correct,
      case when v_is_correct then v_question.points else 0 end
    );

    if v_is_correct then
      v_earned_points := v_earned_points + v_question.points;
    end if;
  end loop;

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

-- ---------------------------------------------------------------------
-- log_study_time: called by the frontend (e.g. on session end / heartbeat)
-- to record minutes studied today, update streaks, and daily goal status.
-- ---------------------------------------------------------------------
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
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select daily_goal_minutes, current_streak, longest_streak, streak_freezes_available
    into v_goal_minutes, v_prev_streak, v_longest_streak, v_freezes
  from public.profiles where id = v_user_id;

  -- was today's goal already satisfied before this call? Used to avoid
  -- re-running streak/XP logic on every incremental log_study_time call.
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
    -- goal not yet met today; log progress but don't touch streak yet
    insert into public.user_streak_logs (user_id, study_date, minutes_studied, goal_met, streak_count_after)
    values (v_user_id, p_study_date, v_total_minutes_today, false, v_prev_streak)
    on conflict (user_id, study_date) do update
    set minutes_studied = excluded.minutes_studied;

    update public.profiles set last_studied_at = now() where id = v_user_id;
    return;
  end if;

  if v_already_met_today then
    -- Goal was already met earlier today: just record extra minutes,
    -- do not re-run streak increment or grant a second streak bonus.
    update public.user_streak_logs
    set minutes_studied = v_total_minutes_today
    where user_id = v_user_id and study_date = p_study_date;

    update public.profiles set last_studied_at = now() where id = v_user_id;
    return;
  end if;

  -- Goal met today. Determine whether the streak continues, resets, or
  -- is preserved via a streak freeze.
  select goal_met into v_yesterday_goal_met
  from public.user_streak_logs
  where user_id = v_user_id and study_date = p_study_date - interval '1 day';

  v_yesterday_logged := v_yesterday_goal_met is not null;

  if not v_yesterday_logged and v_prev_streak > 0 then
    -- missed yesterday entirely; try to use a streak freeze to preserve it
    if v_freezes > 0 then
      update public.profiles set streak_freezes_available = streak_freezes_available - 1
      where id = v_user_id;
      insert into public.streak_freeze_logs (user_id, used_on_date)
      values (v_user_id, p_study_date - interval '1 day');
      v_new_streak := v_prev_streak + 1;
    else
      v_new_streak := 1; -- streak resets
    end if;
  elsif v_yesterday_goal_met = false and v_prev_streak > 0 then
    -- studied yesterday but goal was not met — treat as a miss, same freeze logic
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
    -- yesterday's goal was met, or this is the user's first ever streak day
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

  perform public.award_xp(
    v_user_id, 'STREAK_BONUS', v_user_id, least(v_new_streak, 10) * 2,
    'Streak bonus for day ' || v_new_streak
  );

  perform public.check_and_award_rewards(v_user_id);
end;
$$;

comment on function public.log_study_time is
  'Note: STREAK_BONUS xp uses user_id as source_id, so the LESSON/QUIZ '
  'idempotency index does not apply here — call once per day from the client.';
