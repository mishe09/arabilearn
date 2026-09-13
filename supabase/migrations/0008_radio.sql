-- =====================================================================
-- 0008_radio.sql
-- Arabic Radio module
-- =====================================================================

create table public.radio_stations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  stream_url text not null,
  logo_url text,
  country text,
  language text default 'Arabic',
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.user_radio_favorites (
  user_id uuid not null references public.profiles(id) on delete cascade,
  radio_station_id uuid not null references public.radio_stations(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, radio_station_id)
);

create table public.radio_listening_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  radio_station_id uuid not null references public.radio_stations(id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer not null default 0
);

create index idx_radio_favorites_user on public.user_radio_favorites(user_id);
create index idx_radio_sessions_user on public.radio_listening_sessions(user_id);
create index idx_radio_stations_active on public.radio_stations(is_active);
