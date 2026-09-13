-- =====================================================================
-- 0021_connect_all_existing_lessons.sql
--
-- Connect the lesson metadata in Supabase to the lesson content that
-- already exists in data/lessons.ts.
--
-- IMPORTANT:
-- This DOES NOT copy vocabulary, audio, quizzes, or lesson bodies.
-- It only creates/updates curriculum metadata + content_key mappings.
-- =====================================================================

do $$
declare
  v_level_id uuid;
  v_unit1_id uuid;
  v_unit2_id uuid;
begin
  -- Use the first published curriculum level.
  select id
  into v_level_id
  from public.levels
  where level_order = 1
  limit 1;

  if v_level_id is null then
    raise exception 'Level 1 does not exist';
  end if;

  -- ================================================================
  -- UNIT 1
  -- ================================================================

  select id
  into v_unit1_id
  from public.units
  where level_id = v_level_id
    and unit_order = 1
  limit 1;

  if v_unit1_id is null then
    insert into public.units (
      level_id,
      title,
      description,
      unit_order,
      is_published
    )
    values (
      v_level_id,
      'Unit 1: Beginner Foundation (Matakin Farko)',
      'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
      1,
      true
    )
    returning id into v_unit1_id;
  else
    update public.units
    set
      title = 'Unit 1: Beginner Foundation (Matakin Farko)',
      description = 'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
      is_published = true
    where id = v_unit1_id;
  end if;

  -- Unit 1 Lesson 1
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit1_id,
    'Basic Greetings (Gaisuwa / التحيات)',
    'Learn how to greet people in Arabic — the most essential phrases for any conversation.',
    1,
    'CONVERSATION',
    50,
    true,
    'u1-l1-greetings'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 1 Lesson 2
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit1_id,
    'Numbers (Lambobi / الأرقام)',
    'Count from 1 to 100 in Arabic, using Hausa as your familiar bridge.',
    2,
    'VOCABULARY',
    60,
    true,
    'u1-l2-numbers'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 1 Lesson 3
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit1_id,
    'Colors (Launuka / الألوان)',
    'Learn color names in Arabic, using Hausa as your familiar reference.',
    3,
    'VOCABULARY',
    55,
    true,
    'u1-l3-colors'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 1 Lesson 4
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit1_id,
    'Simple Nouns (Sunaye / الأسماء البسيطة)',
    'Learn everyday object names in Arabic — from household items to clothing and tools.',
    4,
    'VOCABULARY',
    65,
    true,
    'u1-l4-nouns'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;


  -- ================================================================
  -- UNIT 2
  -- ================================================================

  select id
  into v_unit2_id
  from public.units
  where level_id = v_level_id
    and unit_order = 2
  limit 1;

  if v_unit2_id is null then
    insert into public.units (
      level_id,
      title,
      description,
      unit_order,
      is_published
    )
    values (
      v_level_id,
      'Unit 2: Family, Days, Verbs & Conversations (Iyali, Kwanaki, Aikatau & Tattaunawa)',
      'Build real conversational skills: talk about family, days and time, everyday actions, and practice full dialogues and grammar.',
      2,
      true
    )
    returning id into v_unit2_id;
  else
    update public.units
    set
      title = 'Unit 2: Family, Days, Verbs & Conversations (Iyali, Kwanaki, Aikatau & Tattaunawa)',
      description = 'Build real conversational skills: talk about family, days and time, everyday actions, and practice full dialogues and grammar.',
      is_published = true
    where id = v_unit2_id;
  end if;

  -- Unit 2 Lesson 1
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit2_id,
    'Family Members (Iyalan Dangi / أفراد الأسرة)',
    'Learn how to talk about your family in Arabic, using Hausa as your familiar bridge.',
    1,
    'VOCABULARY',
    70,
    true,
    'u2-l1-family'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 2 Lesson 2
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit2_id,
    'Days of the Week (Kwanakin Mako / أيام الأسبوع)',
    'Learn the days of the week, and words for time, in Arabic using Hausa as your guide.',
    2,
    'VOCABULARY',
    75,
    true,
    'u2-l2-days'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 2 Lesson 3
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit2_id,
    'Basic Verbs (Kalmomin Aiki / الأفعال الأساسية)',
    'Learn everyday action words in Arabic, using Hausa as your familiar bridge.',
    3,
    'GRAMMAR',
    80,
    true,
    'u2-l3-verbs'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 2 Lesson 4
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit2_id,
    'Simple Conversation (Tattaunawa / محادثة بسيطة)',
    'Practice real Hausa-to-Arabic conversations: meeting someone, being at home, and shopping at the market.',
    4,
    'CONVERSATION',
    70,
    true,
    'u2-l4-conversations'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

  -- Unit 2 Lesson 5
  insert into public.lessons (
    unit_id,
    title,
    description,
    lesson_order,
    lesson_type,
    xp_reward,
    is_published,
    content_key
  )
  values (
    v_unit2_id,
    'Basic Grammar (Nahawu / قواعد أساسية)',
    'Learn personal pronouns, present tense, negation, and question words in Arabic.',
    5,
    'GRAMMAR',
    90,
    true,
    'u2-l5-grammar'
  )
  on conflict (unit_id, lesson_order)
  do update set
    title = excluded.title,
    description = excluded.description,
    lesson_type = excluded.lesson_type,
    xp_reward = excluded.xp_reward,
    is_published = excluded.is_published,
    content_key = excluded.content_key;

end;
$$;


-- =====================================================================
-- FINAL SAFETY CHECK
-- =====================================================================

do $$
declare
  v_count integer;
begin
  select count(*)
  into v_count
  from public.lessons
  where content_key in (
    'u1-l1-greetings',
    'u1-l2-numbers',
    'u1-l3-colors',
    'u1-l4-nouns',
    'u2-l1-family',
    'u2-l2-days',
    'u2-l3-verbs',
    'u2-l4-conversations',
    'u2-l5-grammar'
  );

  if v_count <> 9 then
    raise exception 'Expected 9 mapped lessons, found %', v_count;
  end if;
end;
$$;
