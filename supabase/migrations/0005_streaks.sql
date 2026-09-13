-- =====================================================================
-- 0005_streaks.sql
-- Streak tracking
-- =====================================================================

create table public.user_streak_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  study_date date not null,
  minutes_studied integer not null default 0,
  goal_met boolean not null default false,
  streak_count_after integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, study_date)
);

create table public.streak_freeze_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  used_on_date date not null,
  reason text default 'missed_day_auto_freeze',
  created_at timestamptz not null default now()
);

create index idx_streak_logs_user on public.user_streak_logs(user_id, study_date);
create index idx_streak_freeze_user on public.streak_freeze_logs(user_id, used_on_date);
