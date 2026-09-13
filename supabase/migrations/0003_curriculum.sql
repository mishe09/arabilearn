-- =====================================================================
-- 0003_curriculum.sql
-- Level -> Unit -> Lesson -> Content Block -> Quiz -> Question -> Option
-- =====================================================================

create table public.levels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  level_order integer not null,
  required_xp integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (level_order)
);

create table public.units (
  id uuid primary key default gen_random_uuid(),
  level_id uuid not null references public.levels(id) on delete cascade,
  title text not null,
  description text,
  unit_order integer not null,
  estimated_minutes integer not null default 10,
  xp_reward integer not null default 0,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (level_id, unit_order)
);

create table public.lessons (
  id uuid primary key default gen_random_uuid(),
  unit_id uuid not null references public.units(id) on delete cascade,
  title text not null,
  description text,
  lesson_order integer not null,
  lesson_type lesson_type not null,
  estimated_minutes integer not null default 5,
  xp_reward integer not null default 10,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  unique (unit_id, lesson_order)
);

create table public.lesson_content_blocks (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  block_order integer not null,
  block_type content_block_type not null,
  arabic_text text,
  transliteration text,
  hausa_explanation text,
  english_explanation text,
  audio_url text,
  image_url text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  unique (lesson_id, block_order)
);

create table public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  title text not null,
  passing_score integer not null default 70 check (passing_score between 0 and 100),
  xp_reward integer not null default 5,
  created_at timestamptz not null default now()
);

create table public.quiz_questions (
  id uuid primary key default gen_random_uuid(),
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  question_text text not null,
  question_type quiz_question_type not null,
  arabic_text text,
  hausa_prompt text,
  english_prompt text,
  correct_answer text, -- used for FILL_BLANK / TRUE_FALSE; MULTIPLE_CHOICE/MATCHING use quiz_options
  explanation text,
  points integer not null default 1,
  question_order integer not null,
  unique (quiz_id, question_order)
);

create table public.quiz_options (
  id uuid primary key default gen_random_uuid(),
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  option_text text not null,
  is_correct boolean not null default false,
  option_order integer not null,
  unique (question_id, option_order)
);

-- Now that levels exists, wire up profiles.current_level_id
alter table public.profiles
  add constraint profiles_current_level_id_fkey
  foreign key (current_level_id) references public.levels(id) on delete set null;

-- ---------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------
create index idx_units_level_id on public.units(level_id);
create index idx_lessons_unit_id on public.lessons(unit_id);
create index idx_content_blocks_lesson_id on public.lesson_content_blocks(lesson_id);
create index idx_quizzes_lesson_id on public.quizzes(lesson_id);
create index idx_quiz_questions_quiz_id on public.quiz_questions(quiz_id);
create index idx_quiz_options_question_id on public.quiz_options(question_id);
create index idx_levels_published on public.levels(is_published);
create index idx_units_published on public.units(is_published);
create index idx_lessons_published on public.lessons(is_published);
