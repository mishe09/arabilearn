-- =====================================================================
-- 0007_prayers.sql
-- Hajj / Islamic Prayers module
-- =====================================================================

create table public.prayer_categories (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category_order integer not null,
  unique (category_order)
);

create table public.prayers (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.prayer_categories(id) on delete cascade,
  title text not null,
  arabic_text text not null,
  transliteration text,
  hausa_translation text,
  english_translation text,
  audio_url text,
  prayer_order integer not null,
  created_at timestamptz not null default now(),
  unique (category_id, prayer_order)
);

create table public.user_prayer_bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  prayer_id uuid not null references public.prayers(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, prayer_id)
);

create table public.user_prayer_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  prayer_id uuid not null references public.prayers(id) on delete cascade,
  viewed_at timestamptz,
  listened_count integer not null default 0,
  last_listened_at timestamptz,
  unique (user_id, prayer_id)
);

create index idx_prayers_category on public.prayers(category_id);
create index idx_prayer_bookmarks_user on public.user_prayer_bookmarks(user_id);
create index idx_prayer_progress_user on public.user_prayer_progress(user_id);
