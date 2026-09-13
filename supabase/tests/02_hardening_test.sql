-- Hardening verification test

-- Setup: student user
insert into auth.users (id, email, raw_user_meta_data)
values ('33333333-3333-3333-3333-333333333333', 'student@example.com', '{"full_name":"Test Student"}');

-- Setup: admin user with SUPER_ADMIN role (for control-group checks)
insert into auth.users (id, email, raw_user_meta_data)
values ('44444444-4444-4444-4444-444444444444', 'admin@example.com', '{"full_name":"Test Admin"}');
insert into public.user_roles (user_id, role_id)
select '44444444-4444-4444-4444-444444444444', id from public.roles where name = 'SUPER_ADMIN';

------------------------------------------------------------------
-- ITEM 3: skill breakdown backfill
------------------------------------------------------------------
select 'item3_lessons_with_skill_mapped' as check, count(*) as total,
       count(skill_category_id) as mapped
from public.lessons;

------------------------------------------------------------------
-- ITEM 2: indexes exist
------------------------------------------------------------------
select 'item2_new_indexes' as check, indexname from pg_indexes
where schemaname = 'public'
  and indexname in (
    'idx_units_level_published_order','idx_lessons_unit_published_order',
    'idx_lessons_type_published','idx_uup_user_status_started',
    'idx_ulevp_user_status','idx_xp_tx_user_created',
    'idx_quiz_attempts_user_quiz','idx_lessons_skill_category'
  )
order by indexname;

------------------------------------------------------------------
-- ITEM 6: uniqueness constraints exist
------------------------------------------------------------------
select 'item6_unique_indexes' as check, indexname from pg_indexes
where schemaname='public' and indexname in ('uq_xp_tx_reward_once','uq_xp_tx_streak_bonus_per_day');

-- Capture IDs while still postgres/superuser (a real client would get
-- lesson_id from browsing lessons, and the option_id from the answer they
-- pick in get_quiz_for_lesson's response — never from a raw table select).
select id as target_lesson_id from public.lessons where title = 'Letters Alif to Tha' \gset
select id as target_quiz_id from public.quizzes where lesson_id = :'target_lesson_id' \gset
select id as target_question_id from public.quiz_questions where quiz_id = :'target_quiz_id' limit 1 \gset
select id as target_correct_option_id from public.quiz_options where question_id = :'target_question_id' and is_correct = true limit 1 \gset

-- act as student
set request.jwt.claim.sub = '33333333-3333-3333-3333-333333333333';
set request.jwt.claim.role = 'authenticated';
set role authenticated;

------------------------------------------------------------------
-- ITEM 1: quiz answers hidden from students
------------------------------------------------------------------
select 'item1_direct_quiz_options_select_should_be_0' as check, count(*)
from public.quiz_options;

select 'item1_direct_quiz_questions_select_should_be_0' as check, count(*)
from public.quiz_questions;

-- but the RPC should return the quiz WITHOUT is_correct/correct_answer
select 'item1_get_quiz_for_lesson' as check,
  public.get_quiz_for_lesson(:'target_lesson_id');

------------------------------------------------------------------
-- ITEM 5: internal SECURITY DEFINER functions are not directly callable
------------------------------------------------------------------
do $$
begin
  perform public.award_xp('33333333-3333-3333-3333-333333333333', 'REWARD', gen_random_uuid(), 999999, 'hack attempt');
  raise exception 'SECURITY HOLE: award_xp was callable directly by a student';
exception when insufficient_privilege then
  raise notice 'item5_award_xp_blocked: PASS (permission denied as expected)';
end;
$$;

do $$
begin
  perform public.update_skill_progress_for_lesson('33333333-3333-3333-3333-333333333333', (select id from public.lessons limit 1));
  raise exception 'SECURITY HOLE: update_skill_progress_for_lesson was callable directly';
exception when insufficient_privilege then
  raise notice 'item5_update_skill_progress_blocked: PASS';
end;
$$;

do $$
begin
  perform public.check_and_award_rewards('33333333-3333-3333-3333-333333333333');
  raise exception 'SECURITY HOLE: check_and_award_rewards was callable directly';
exception when insufficient_privilege then
  raise notice 'item5_check_and_award_rewards_blocked: PASS';
end;
$$;

------------------------------------------------------------------
-- ITEM 7: direct writes to progress tables are blocked; RPC still works
------------------------------------------------------------------
do $$
begin
  insert into public.user_lesson_progress (user_id, lesson_id, status, xp_earned)
  values ('33333333-3333-3333-3333-333333333333', (select id from public.lessons limit 1), 'COMPLETED', 999999);
  raise exception 'SECURITY HOLE: direct insert into user_lesson_progress succeeded';
exception when insufficient_privilege then
  raise notice 'item7_direct_lesson_progress_insert_blocked: PASS';
end;
$$;

do $$
begin
  insert into public.quiz_attempts (user_id, quiz_id, score, passed, xp_earned)
  values ('33333333-3333-3333-3333-333333333333', (select id from public.quizzes limit 1), 100, true, 999999);
  raise exception 'SECURITY HOLE: direct insert into quiz_attempts succeeded';
exception when insufficient_privilege then
  raise notice 'item7_direct_quiz_attempt_insert_blocked: PASS';
end;
$$;

-- The RPC path should still work fine end to end (proves lockdown didn't break legit flow)
select 'item7_complete_lesson_still_works' as check, * from public.complete_lesson(
  (select id from public.lessons where title = 'Letters Alif to Tha'), 90
);

select 'item3_skill_progress_after_completion' as check, sc.name, usp.completed_lessons, usp.progress_percentage
from public.user_skill_progress usp
join public.skill_categories sc on sc.id = usp.skill_category_id
where usp.user_id = auth.uid();

select 'item7_complete_quiz_still_works' as check, * from public.complete_quiz(
  :'target_quiz_id',
  jsonb_build_array(jsonb_build_object(
    'question_id', :'target_question_id',
    'option_id', :'target_correct_option_id'
  ))
);

select 'item7_dashboard_still_works' as check, public.get_user_dashboard() ->> 'full_name' as full_name;

------------------------------------------------------------------
-- ITEM 4: automatic streak reset (run as postgres/cron context)
------------------------------------------------------------------
reset role;

-- simulate: student had a streak, missed yesterday, no freezes left
update public.profiles
set current_streak = 5, longest_streak = 5, streak_freezes_available = 0
where id = '33333333-3333-3333-3333-333333333333';
delete from public.user_streak_logs where user_id = '33333333-3333-3333-3333-333333333333';

select public.process_daily_streak_resets(current_date);

select 'item4_streak_reset_no_freeze' as check, current_streak, streak_freezes_available
from public.profiles where id = '33333333-3333-3333-3333-333333333333';

-- simulate: streak with a freeze available -> should be preserved, freeze consumed
update public.profiles
set current_streak = 5, longest_streak = 5, streak_freezes_available = 2
where id = '33333333-3333-3333-3333-333333333333';
delete from public.user_streak_logs where user_id = '33333333-3333-3333-3333-333333333333';

select public.process_daily_streak_resets(current_date);

select 'item4_streak_preserved_with_freeze' as check, current_streak, streak_freezes_available
from public.profiles where id = '33333333-3333-3333-3333-333333333333';

select 'item4_freeze_log_written' as check, count(*) from public.streak_freeze_logs
where user_id = '33333333-3333-3333-3333-333333333333' and reason = 'auto_cron_missed_day';
