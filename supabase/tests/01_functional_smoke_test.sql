-- Functional smoke test

-- 1. Simulate a signup -> profile auto-created via trigger
insert into auth.users (id, email, raw_user_meta_data)
values ('11111111-1111-1111-1111-111111111111', 'aisha@example.com', '{"full_name":"Aisha Bello"}');

select 'profile_autocreated' as check, full_name, email, total_xp, current_streak
from public.profiles where id = '11111111-1111-1111-1111-111111111111';

-- 2. Set session to act as this user (simulating an authenticated request)
set request.jwt.claim.sub = '11111111-1111-1111-1111-111111111111';
set request.jwt.claim.role = 'authenticated';
set role authenticated;

-- sanity: auth.uid() resolves
select 'auth_uid_check' as check, auth.uid();

-- 3. RLS: can this user see another (nonexistent) user's profile? should be 0 rows besides own
select 'rls_profiles_visible_rows' as check, count(*) from public.profiles;

-- 4. Complete a lesson (idempotent test: call twice)
select 'complete_lesson_first_call' as check, * from public.complete_lesson(
  (select id from public.lessons where title = 'Letters Alif to Tha'), 120
);

select 'complete_lesson_second_call_should_be_noop' as check, * from public.complete_lesson(
  (select id from public.lessons where title = 'Letters Alif to Tha'), 60
);

-- verify XP only awarded once
select 'xp_after_lesson' as check, total_xp from public.profiles where id = auth.uid();
select 'xp_tx_count_for_lesson' as check, count(*) from public.xp_transactions
where user_id = auth.uid() and source_type = 'LESSON_COMPLETION';

-- 5. Complete a quiz
select 'complete_quiz' as check, * from public.complete_quiz(
  (select id from public.quizzes limit 1),
  jsonb_build_array(
    jsonb_build_object(
      'question_id', (select id from public.quiz_questions limit 1),
      'option_id', (select id from public.quiz_options where is_correct = true limit 1)
    )
  )
);

select 'xp_after_quiz' as check, total_xp from public.profiles where id = auth.uid();

-- 6. Log study time to trigger streak logic + daily goal
update public.profiles set daily_goal_minutes = 5 where id = auth.uid();
select public.log_study_time(10);

select 'streak_after_log' as check, current_streak, longest_streak, streak_freezes_available
from public.profiles where id = auth.uid();

-- call log_study_time again same day -- should NOT double the streak bonus
select public.log_study_time(5);
select 'streak_after_second_log_same_day' as check, current_streak
from public.profiles where id = auth.uid();

-- 7. Rewards: should have earned "First Lesson Completed" and "First Quiz Passed"
select 'rewards_earned' as check, r.title
from public.user_rewards ur join public.rewards r on r.id = ur.reward_id
where ur.user_id = auth.uid();

-- 8. Dashboard RPC
select 'dashboard' as check, public.get_user_dashboard();

-- 9. RLS enforcement: second user cannot see first user's progress
reset role;
insert into auth.users (id, email, raw_user_meta_data)
values ('22222222-2222-2222-2222-222222222222', 'musa@example.com', '{"full_name":"Musa Ibrahim"}');

set request.jwt.claim.sub = '22222222-2222-2222-2222-222222222222';
set role authenticated;
select 'rls_cross_user_lesson_progress_should_be_0' as check, count(*)
from public.user_lesson_progress where user_id = '11111111-1111-1111-1111-111111111111';

select 'rls_cross_user_own_progress_should_be_0_too_no_data' as check, count(*)
from public.user_lesson_progress where user_id = auth.uid();

reset role;
