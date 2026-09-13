-- Verification for round-2 fixes: quiz integrity, publish-chain checks,
-- dashboard ordering/filters, dashboard studied-time consistency.

insert into auth.users (id, email, raw_user_meta_data)
values ('55555555-5555-5555-5555-555555555555', 'fixtest@example.com', '{"full_name":"Fix Test User"}');

-- Grab ids as postgres (a real client would get these from browsing/
-- get_quiz_for_lesson, never a raw table select as a student).
select id as lesson1_id from public.lessons where title = 'Letters Alif to Tha' \gset
select id as lesson2_id from public.lessons where title = 'Letters Jeem to Khaa' \gset
select id as lesson3_id from public.lessons where title = 'Saying Hello' \gset
select id as quiz1_id from public.quizzes where lesson_id = :'lesson1_id' \gset
select id as question1_id from public.quiz_questions where quiz_id = :'quiz1_id' limit 1 \gset
select id as correct_option_id from public.quiz_options where question_id = :'question1_id' and is_correct = true \gset
select id as wrong_option_id from public.quiz_options where question_id = :'question1_id' and is_correct = false limit 1 \gset

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
set request.jwt.claim.role = 'authenticated';
set role authenticated;

------------------------------------------------------------------
-- ITEM 1: duplicate answers for the same question cannot inflate score
------------------------------------------------------------------
-- Submit the SAME correct answer for the SAME question THREE times.
-- If scoring were buggy, this could count as 3x correct (>100%) or at
-- least insert 3 rows. With the fix, only one row should exist and the
-- score should be exactly what one correct answer out of 1 total point
-- yields (100%).
select 'item1_duplicate_answer_attempt' as check, * from public.complete_quiz(
  :'quiz1_id',
  jsonb_build_array(
    jsonb_build_object('question_id', :'question1_id', 'option_id', :'correct_option_id'),
    jsonb_build_object('question_id', :'question1_id', 'option_id', :'correct_option_id'),
    jsonb_build_object('question_id', :'question1_id', 'option_id', :'correct_option_id')
  )
);

reset role;
select 'item1_attempt_answer_row_count_should_be_1' as check, count(*)
from public.quiz_attempt_answers qaa
join public.quiz_attempts qa on qa.id = qaa.attempt_id
where qa.user_id = '55555555-5555-5555-5555-555555555555' and qaa.question_id = :'question1_id';
set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
set role authenticated;

-- Mixed duplicate: first submission wrong, second (duplicate) submission
-- correct -- the FIRST occurrence should win (de-dup keeps first in order),
-- so this should score as INCORRECT (0%), not correct.
select 'item1_first_occurrence_wins' as check, * from public.complete_quiz(
  :'quiz1_id',
  jsonb_build_array(
    jsonb_build_object('question_id', :'question1_id', 'option_id', :'wrong_option_id'),
    jsonb_build_object('question_id', :'question1_id', 'option_id', :'correct_option_id')
  )
);

-- Option that doesn't belong to the question at all -> ignored safely,
-- scored as incorrect, does not error.
select 'item1_mismatched_option_safely_ignored' as check, * from public.complete_quiz(
  :'quiz1_id',
  jsonb_build_array(
    jsonb_build_object('question_id', :'question1_id', 'option_id', gen_random_uuid())
  )
);

reset role;

------------------------------------------------------------------
-- ITEM 2: unpublished chain blocks quiz completion
--
-- These two calls are EXPECTED to raise an error (that's the pass
-- condition) — run this file without -v ON_ERROR_STOP=1, or run just
-- this section separately, so psql continues past the expected errors.
------------------------------------------------------------------
-- Unpublish the unit that owns lesson1/lesson2 (and thus quiz1)
update public.units set is_published = false where id = (select unit_id from public.lessons where id = :'lesson1_id');

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
set role authenticated;

-- EXPECTED: ERROR "This quiz is not currently available ..."
select 'item2_unpublished_unit_blocks_quiz_EXPECT_ERROR' as check,
  public.complete_quiz(:'quiz1_id', '[]'::jsonb);

reset role;
update public.units set is_published = true where id = (select unit_id from public.lessons where id = :'lesson1_id');

-- Also test: unpublish the quiz itself (leave unit/lesson published)
update public.quizzes set is_published = false where id = :'quiz1_id';
set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
set role authenticated;

-- EXPECTED: ERROR "This quiz is not currently available ..."
select 'item2_unpublished_quiz_itself_EXPECT_ERROR' as check,
  public.complete_quiz(:'quiz1_id', '[]'::jsonb);

reset role;
update public.quizzes set is_published = true where id = :'quiz1_id';

------------------------------------------------------------------
-- ITEM 3: dashboard recommendation ordering + full publish-chain filter
------------------------------------------------------------------
-- Unpublish lesson3's unit -> lesson3 should disappear from recommendations
update public.units set is_published = false where id = (select unit_id from public.lessons where id = :'lesson3_id');

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
set role authenticated;

select 'item3_recommendations_exclude_unpublished_unit' as check,
  public.get_user_dashboard() -> 'next_recommended_lessons' as recs;

reset role;
update public.units set is_published = true where id = (select unit_id from public.lessons where id = :'lesson3_id');

------------------------------------------------------------------
-- ITEM 4: dashboard studied-time matches user_daily_goals, not study_sessions
------------------------------------------------------------------
-- Insert a study_sessions row with a LARGE duration that should NOT be
-- reflected in the dashboard anymore (Option B ignores study_sessions).
insert into public.study_sessions (user_id, started_at, ended_at, duration_seconds)
values ('55555555-5555-5555-5555-555555555555', now(), now(), 99999);

set request.jwt.claim.sub = '55555555-5555-5555-5555-555555555555';
set role authenticated;

-- Before any log_study_time call today: should be 0 / no row, despite the
-- 99999-second study_sessions row above.
select 'item4_before_log_study_time' as check,
  public.get_user_dashboard() ->> 'time_studied_today_seconds' as time_studied_today_seconds,
  public.get_user_dashboard() -> 'today_goal' as today_goal;

select public.log_study_time(12);

select 'item4_after_log_study_time_12min' as check,
  public.get_user_dashboard() ->> 'time_studied_today_seconds' as time_studied_today_seconds,
  public.get_user_dashboard() -> 'today_goal' as today_goal;
-- Expect time_studied_today_seconds = 720 (12*60), matching today_goal.minutes_completed = 12

reset role;
