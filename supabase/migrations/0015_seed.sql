-- =====================================================================
-- 0015_seed.sql
-- Seed data: RBAC, skill categories, sample curriculum, prayers, radio
-- stations, rewards.
--
-- IDEMPOTENCY NOTE (fixed): every insert below is now safe to run any
-- number of times.
--   - Tables with a natural unique constraint (levels.level_order,
--     units(level_id,unit_order), lessons(unit_id,lesson_order),
--     lesson_content_blocks(lesson_id,block_order),
--     quiz_questions(quiz_id,question_order),
--     quiz_options(question_id,option_order),
--     prayer_categories.category_order, prayers(category_id,prayer_order),
--     roles.name, permissions.code, skill_categories.name) use
--     `ON CONFLICT (...) DO UPDATE ... RETURNING id`, which — unlike
--     `DO NOTHING` — always returns a row, so downstream inserts that
--     need the id (e.g. a lesson needing its unit's id) work identically
--     on the first run and every rerun.
--   - `quizzes` has no natural unique key (a lesson can have more than
--     one quiz by design), so it uses an explicit lookup-then-insert
--     pattern instead.
--   - `radio_stations` and `rewards` previously used a bare
--     `ON CONFLICT DO NOTHING` with NO underlying unique constraint —
--     which does nothing, since there is no constraint for it to catch a
--     conflict against, so reruns silently inserted duplicates. Fixed
--     with a `WHERE NOT EXISTS` guard (and 0017 additionally adds real
--     unique constraints on both as defense in depth).
-- =====================================================================

-- ---------------------------------------------------------------------
-- Roles (already idempotent — real unique constraint on name)
-- ---------------------------------------------------------------------
insert into public.roles (name, description) values
  ('STUDENT', 'Default role for every registered learner'),
  ('CONTENT_ADMIN', 'Can manage curriculum, prayers, radio and rewards content'),
  ('SUPER_ADMIN', 'Full administrative access')
on conflict (name) do nothing;

-- ---------------------------------------------------------------------
-- Permissions (already idempotent — real unique constraint on code)
-- ---------------------------------------------------------------------
insert into public.permissions (code, description) values
  ('curriculum.view', 'View unpublished curriculum content'),
  ('curriculum.create', 'Create levels/units/lessons/content/quizzes'),
  ('curriculum.update', 'Update levels/units/lessons/content/quizzes'),
  ('curriculum.delete', 'Delete levels/units/lessons/content/quizzes'),
  ('prayer.create', 'Create prayer categories/prayers'),
  ('prayer.update', 'Update or delete prayer categories/prayers'),
  ('radio.create', 'Create radio stations'),
  ('radio.update', 'Update or delete radio stations'),
  ('reward.create', 'Create rewards'),
  ('reward.update', 'Update or delete rewards'),
  ('users.view', 'View other users'' profiles and roles'),
  ('reports.view', 'View aggregate/other users'' progress data'),
  ('admin.full_access', 'Full administrative access, short-circuits all permission checks')
on conflict (code) do nothing;

-- ---------------------------------------------------------------------
-- Role -> Permission mapping (already idempotent — composite PK)
-- ---------------------------------------------------------------------
insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r, public.permissions p
where r.name = 'CONTENT_ADMIN'
  and p.code in (
    'curriculum.view','curriculum.create','curriculum.update','curriculum.delete',
    'prayer.create','prayer.update','radio.create','radio.update',
    'reward.create','reward.update'
  )
on conflict do nothing;

insert into public.role_permissions (role_id, permission_id)
select r.id, p.id from public.roles r, public.permissions p
where r.name = 'SUPER_ADMIN' and p.code = 'admin.full_access'
on conflict do nothing;

-- ---------------------------------------------------------------------
-- Skill categories (already idempotent — real unique constraint on name)
-- ---------------------------------------------------------------------
insert into public.skill_categories (name, description) values
  ('Alphabet', 'Arabic letters, shapes and sounds'),
  ('Vocabulary', 'Core Arabic words and phrases'),
  ('Grammar', 'Sentence structure and grammar rules'),
  ('Conversation', 'Everyday spoken dialogue'),
  ('Pronunciation', 'Correct articulation of Arabic sounds'),
  ('Listening', 'Listening comprehension'),
  ('Reading', 'Reading Arabic script'),
  ('Culture', 'Arab culture and context'),
  ('Islamic', 'Islamic Arabic: prayers and religious vocabulary')
on conflict (name) do nothing;

-- ---------------------------------------------------------------------
-- Sample curriculum + prayers + radio + rewards
-- Rewritten as a DO block with explicit variables so every insert can
-- use a real lookup-or-upsert pattern and reliably chain ids downstream,
-- whether this is the first run or the tenth.
-- ---------------------------------------------------------------------
do $$
declare
  v_level_id uuid;
  v_unit1_id uuid;
  v_unit2_id uuid;
  v_lesson1_id uuid;
  v_lesson2_id uuid;
  v_lesson3_id uuid;
  v_quiz_id uuid;
  v_question1_id uuid;
  v_daily_cat_id uuid;
begin
  -- Level
  insert into public.levels (title, description, level_order, required_xp, is_published)
  values ('Beginner Arabic', 'Start your Arabic journey from zero', 1, 0, true)
  on conflict (level_order) do update set title = excluded.title, description = excluded.description
  returning id into v_level_id;

  -- Units
  insert into public.units (level_id, title, description, unit_order, estimated_minutes, xp_reward, is_published)
  values (v_level_id, 'The Arabic Alphabet', 'Learn to recognize and pronounce all 28 letters', 1, 30, 20, true)
  on conflict (level_id, unit_order) do update set title = excluded.title, description = excluded.description
  returning id into v_unit1_id;

  insert into public.units (level_id, title, description, unit_order, estimated_minutes, xp_reward, is_published)
  values (v_level_id, 'Everyday Greetings', 'Common greetings and introductions', 2, 20, 20, true)
  on conflict (level_id, unit_order) do update set title = excluded.title, description = excluded.description
  returning id into v_unit2_id;

  -- Lessons
  insert into public.lessons (unit_id, title, description, lesson_order, lesson_type, estimated_minutes, xp_reward, is_published)
  values (v_unit1_id, 'Letters Alif to Tha', 'Introduction to the first five letters', 1, 'ALPHABET', 10, 10, true)
  on conflict (unit_id, lesson_order) do update set title = excluded.title, description = excluded.description
  returning id into v_lesson1_id;

  insert into public.lessons (unit_id, title, description, lesson_order, lesson_type, estimated_minutes, xp_reward, is_published)
  values (v_unit1_id, 'Letters Jeem to Khaa', 'The next five letters', 2, 'ALPHABET', 10, 10, true)
  on conflict (unit_id, lesson_order) do update set title = excluded.title, description = excluded.description
  returning id into v_lesson2_id;

  insert into public.lessons (unit_id, title, description, lesson_order, lesson_type, estimated_minutes, xp_reward, is_published)
  values (v_unit2_id, 'Saying Hello', 'Greet someone in Arabic', 1, 'CONVERSATION', 8, 10, true)
  on conflict (unit_id, lesson_order) do update set title = excluded.title, description = excluded.description
  returning id into v_lesson3_id;

  -- NOTE: skill_category_id backfill intentionally NOT done here.
  -- That column doesn't exist until migration 0016 (it must run after
  -- this file in a fresh `supabase db push`), and 0016 already backfills
  -- skill_category_id for every existing lesson via lesson_type matching,
  -- which covers these seeded rows automatically once it runs.

  -- Content blocks
  insert into public.lesson_content_blocks (lesson_id, block_order, block_type, arabic_text, transliteration, hausa_explanation, english_explanation)
  values (v_lesson1_id, 1, 'TEXT', 'ا', 'Alif', 'Wasika ta farko a haruffan larabci', 'The first letter of the Arabic alphabet')
  on conflict (lesson_id, block_order) do update set arabic_text = excluded.arabic_text, transliteration = excluded.transliteration;

  insert into public.lesson_content_blocks (lesson_id, block_order, block_type, arabic_text, transliteration, hausa_explanation, english_explanation)
  values (v_lesson3_id, 1, 'EXAMPLE', 'اَلسَّلَامُ عَلَيْكُمْ', 'Assalamu alaikum', 'Ana amfani da wannan don gaisuwa', 'A common greeting meaning "peace be upon you"')
  on conflict (lesson_id, block_order) do update set arabic_text = excluded.arabic_text, transliteration = excluded.transliteration;

  -- Quiz for lesson1: no natural unique key by design (a lesson can have
  -- more than one quiz), so look it up by (lesson_id, title) first.
  select id into v_quiz_id
  from public.quizzes
  where lesson_id = v_lesson1_id and title = 'Alphabet Quiz: Alif to Tha';

  if v_quiz_id is null then
    insert into public.quizzes (lesson_id, title, passing_score, xp_reward)
    values (v_lesson1_id, 'Alphabet Quiz: Alif to Tha', 70, 5)
    returning id into v_quiz_id;
  end if;

  -- Question (unique on quiz_id, question_order)
  insert into public.quiz_questions (quiz_id, question_text, question_type, arabic_text, correct_answer, explanation, points, question_order)
  values (v_quiz_id, 'Which letter is this?', 'MULTIPLE_CHOICE', 'ا', null, 'This is Alif, the first letter.', 1, 1)
  on conflict (quiz_id, question_order) do update set question_text = excluded.question_text
  returning id into v_question1_id;

  -- Options (unique on question_id, option_order)
  insert into public.quiz_options (question_id, option_text, is_correct, option_order)
  values (v_question1_id, 'Alif', true, 1)
  on conflict (question_id, option_order) do update set option_text = excluded.option_text, is_correct = excluded.is_correct;

  insert into public.quiz_options (question_id, option_text, is_correct, option_order)
  values (v_question1_id, 'Baa', false, 2)
  on conflict (question_id, option_order) do update set option_text = excluded.option_text, is_correct = excluded.is_correct;

  insert into public.quiz_options (question_id, option_text, is_correct, option_order)
  values (v_question1_id, 'Taa', false, 3)
  on conflict (question_id, option_order) do update set option_text = excluded.option_text, is_correct = excluded.is_correct;

  -- Prayer categories (unique on category_order)
  insert into public.prayer_categories (title, description, category_order)
  values ('Daily Prayers', 'The five daily obligatory prayers', 1)
  on conflict (category_order) do update set title = excluded.title, description = excluded.description
  returning id into v_daily_cat_id;

  insert into public.prayer_categories (title, description, category_order)
  values ('Hajj Supplications', 'Duas recited during the pilgrimage', 2)
  on conflict (category_order) do update set title = excluded.title, description = excluded.description;

  -- Prayers (unique on category_id, prayer_order)
  insert into public.prayers (category_id, title, arabic_text, transliteration, hausa_translation, english_translation, prayer_order)
  values (
    v_daily_cat_id,
    'Opening Supplication (Du''a al-Istiftah)',
    'سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ',
    'Subhanaka Allahumma wa bihamdika',
    'Tsarki ya tabbata gare ka Ya Allah, kuma godiya ta tabbata gare ka',
    'Glory be to You, O Allah, and praise be to You',
    1
  )
  on conflict (category_id, prayer_order) do update set title = excluded.title;

  -- Radio stations: previously a bare ON CONFLICT DO NOTHING with no
  -- underlying constraint (a no-op); fixed with WHERE NOT EXISTS, which
  -- works regardless of whether 0017's new unique constraint is present.
  insert into public.radio_stations (name, description, stream_url, country, language, is_active)
  select 'Quran Radio Makkah', 'Live Quran recitation from Makkah', 'https://stream.example.com/makkah', 'Saudi Arabia', 'Arabic', true
  where not exists (select 1 from public.radio_stations where name = 'Quran Radio Makkah');

  insert into public.radio_stations (name, description, stream_url, country, language, is_active)
  select 'MBC FM', 'Popular Arabic talk and music station', 'https://stream.example.com/mbcfm', 'Saudi Arabia', 'Arabic', true
  where not exists (select 1 from public.radio_stations where name = 'MBC FM');

  insert into public.radio_stations (name, description, stream_url, country, language, is_active)
  select 'Radio Cairo', 'Egyptian Arabic news and culture', 'https://stream.example.com/cairo', 'Egypt', 'Arabic', true
  where not exists (select 1 from public.radio_stations where name = 'Radio Cairo');

  -- Rewards: same fix as radio_stations.
  insert into public.rewards (title, description, reward_type, required_condition, xp_bonus)
  select 'First Lesson Completed', 'Complete your very first lesson', 'BADGE', '{"type":"lessons_completed","count":1}', 5
  where not exists (select 1 from public.rewards where title = 'First Lesson Completed');

  insert into public.rewards (title, description, reward_type, required_condition, xp_bonus)
  select '7 Day Streak', 'Study 7 days in a row', 'STREAK', '{"type":"streak_days","count":7}', 20
  where not exists (select 1 from public.rewards where title = '7 Day Streak');

  insert into public.rewards (title, description, reward_type, required_condition, xp_bonus)
  select 'Alphabet Master', 'Complete all alphabet lessons', 'TROPHY', '{"type":"lesson_type_completed","lesson_type":"ALPHABET","count":2}', 15
  where not exists (select 1 from public.rewards where title = 'Alphabet Master');

  insert into public.rewards (title, description, reward_type, required_condition, xp_bonus)
  select 'First Quiz Passed', 'Pass your first quiz', 'COMPLETION', '{"type":"quiz_passed","count":1}', 5
  where not exists (select 1 from public.rewards where title = 'First Quiz Passed');

  insert into public.rewards (title, description, reward_type, required_condition, xp_bonus)
  select '100 XP Earned', 'Earn a total of 100 XP', 'XP', '{"type":"total_xp","amount":100}', 10
  where not exists (select 1 from public.rewards where title = '100 XP Earned');

end;
$$;
