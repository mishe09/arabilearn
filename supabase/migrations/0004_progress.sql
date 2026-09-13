-- =====================================================================
-- 0004_progress.sql
-- Per-user progress: levels, units, lessons, quiz attempts, XP, sessions
-- =====================================================================

create table public.user_level_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  level_id uuid not null references public.levels(id) on delete cascade,
  status progress_status not null default 'NOT_STARTED',
  progress_percentage numeric(5,2) not null default 0 check (progress_percentage between 0 and 100),
  started_at timestamptz,
  completed_at timestamptz,
  unique (user_id, level_id)
);

create table public.user_unit_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  status progress_status not null default 'NOT_STARTED',
  progress_percentage numeric(5,2) not null default 0 check (progress_percentage between 0 and 100),
  started_at timestamptz,
  completed_at timestamptz,
  unique (user_id, unit_id)
);

create table public.user_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  status progress_status not null default 'NOT_STARTED',
  progress_percentage numeric(5,2) not null default 0 check (progress_percentage between 0 and 100),
  started_at timestamptz,
  completed_at timestamptz,
  time_spent_seconds integer not null default 0,
  xp_earned integer not null default 0,
  unique (user_id, lesson_id) -- enforces idempotency: one progress row per user/lesson
);

create table public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  quiz_id uuid not null references public.quizzes(id) on delete cascade,
  score numeric(5,2) not null default 0,
  passed boolean not null default false,
  xp_earned integer not null default 0,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

create table public.quiz_attempt_answers (
  id uuid primary key default gen_random_uuid(),
  attempt_id uuid not null references public.quiz_attempts(id) on delete cascade,
  question_id uuid not null references public.quiz_questions(id) on delete cascade,
  selected_option_id uuid references public.quiz_options(id) on delete set null,
  answer_text text, -- for FILL_BLANK
  is_correct boolean not null default false,
  points_awarded integer not null default 0
);

create table public.xp_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  source_type xp_source_type not null,
  source_id uuid, -- points to lesson_id / quiz_id / reward_id etc, no hard FK (polymorphic)
  xp_amount integer not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.study_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer not null default 0,
  lesson_id uuid references public.lessons(id) on delete set null,
  unit_id uuid references public.units(id) on delete set null
);

create table public.user_daily_goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goal_date date not null default current_date,
  goal_minutes integer not null,
  minutes_completed integer not null default 0,
  goal_met boolean not null default false,
  unique (user_id, goal_date)
);

-- ---------------------------------------------------------------------
-- Indexes
-- ---------------------------------------------------------------------
create index idx_ulp_user on public.user_level_progress(user_id);
create index idx_uup_user on public.user_unit_progress(user_id);
create index idx_ulep_user on public.user_lesson_progress(user_id);
create index idx_ulep_status on public.user_lesson_progress(user_id, status);
create index idx_quiz_attempts_user on public.quiz_attempts(user_id);
create index idx_quiz_attempts_quiz on public.quiz_attempts(quiz_id);
create index idx_qaa_attempt on public.quiz_attempt_answers(attempt_id);
create index idx_xp_tx_user on public.xp_transactions(user_id);
create index idx_xp_tx_user_source on public.xp_transactions(user_id, source_type, source_id);
create index idx_study_sessions_user on public.study_sessions(user_id);
create index idx_study_sessions_user_started on public.study_sessions(user_id, started_at);
create index idx_daily_goals_user_date on public.user_daily_goals(user_id, goal_date);

-- Idempotency guard: prevent more than one LESSON_COMPLETION xp_transaction
-- per user per lesson (source_id = lesson_id).
create unique index uq_xp_tx_lesson_completion_once
  on public.xp_transactions(user_id, source_id)
  where source_type = 'LESSON_COMPLETION';

-- Idempotency guard: prevent more than one QUIZ_COMPLETION xp_transaction
-- per user per quiz (per passing attempt cycle is handled in the function;
-- this index caps duplicate awards for the same quiz).
create unique index uq_xp_tx_quiz_completion_once
  on public.xp_transactions(user_id, source_id)
  where source_type = 'QUIZ_COMPLETION';
