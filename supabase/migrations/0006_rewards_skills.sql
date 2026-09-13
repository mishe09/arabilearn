-- =====================================================================
-- 0006_rewards_skills.sql
-- Rewards / achievements + skills breakdown
-- =====================================================================

create table public.rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  reward_type reward_type not null,
  icon_url text,
  required_condition jsonb not null default '{}'::jsonb,
  xp_bonus integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.user_rewards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  reward_id uuid not null references public.rewards(id) on delete cascade,
  earned_at timestamptz not null default now(),
  unique (user_id, reward_id) -- can't earn the same reward twice
);

create table public.skill_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text
);

create table public.user_skill_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  skill_category_id uuid not null references public.skill_categories(id) on delete cascade,
  xp_earned integer not null default 0,
  completed_lessons integer not null default 0,
  progress_percentage numeric(5,2) not null default 0 check (progress_percentage between 0 and 100),
  updated_at timestamptz not null default now(),
  unique (user_id, skill_category_id)
);

create trigger trg_user_skill_progress_updated_at
before update on public.user_skill_progress
for each row execute function public.set_updated_at();

create index idx_user_rewards_user on public.user_rewards(user_id);
create index idx_user_skill_progress_user on public.user_skill_progress(user_id);

-- Map each lesson_type to a skill_category by matching name. This keeps the
-- relationship data-driven (via skill_categories.name) rather than a rigid FK
-- on lessons, since a lesson_type could theoretically map to more than one
-- skill in the future. Seed data (0014) creates one skill_category per
-- lesson_type value so the mapping is 1:1 out of the box.
