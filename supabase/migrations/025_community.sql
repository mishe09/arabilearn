-- =====================================================================
-- 025_community.sql
--
-- HausaArabia authenticated community:
--   • learner posts (maximum 3 per learner-local day)
--   • one optional image per post, max 5 MB
--   • leaderboard backed by profiles.total_xp
--   • admin-published event gallery
--   • safe public profile fields exposed through SECURITY DEFINER RPCs
--
-- Community posting does NOT award XP. The leaderboard uses the existing
-- learning XP engine only, so community activity cannot be used to farm XP.
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. COMMUNITY-SAFE PROFILE FIELDS
-- ---------------------------------------------------------------------

alter table public.profiles
  add column if not exists community_location text;

comment on column public.profiles.community_location is
  'Optional city/region/country label the learner chooses to show inside the authenticated community.';

-- ---------------------------------------------------------------------
-- 2. ADMIN MEMBERSHIP
--
-- No browser INSERT/UPDATE/DELETE policies are created for this table.
-- Add trusted admins manually with the service role / Supabase SQL editor.
-- ---------------------------------------------------------------------

create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.app_admins enable row level security;

drop policy if exists "admins_can_read_own_membership"
  on public.app_admins;

create policy "admins_can_read_own_membership"
on public.app_admins
for select
to authenticated
using (user_id = auth.uid());

create or replace function public.is_community_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_admins
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_community_admin() from public;
grant execute on function public.is_community_admin() to authenticated;

-- ---------------------------------------------------------------------
-- 3. LEARNER POSTS
-- ---------------------------------------------------------------------

create table if not exists public.community_posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  image_path text,
  status text not null default 'published'
    check (status in ('published', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint community_posts_body_length
    check (
      char_length(btrim(body)) between 1 and 500
    )
);

create index if not exists idx_community_posts_created_at
  on public.community_posts(created_at desc);

create index if not exists idx_community_posts_user_created_at
  on public.community_posts(user_id, created_at desc);

alter table public.community_posts enable row level security;

drop policy if exists "authenticated_can_read_published_community_posts"
  on public.community_posts;

create policy "authenticated_can_read_published_community_posts"
on public.community_posts
for select
to authenticated
using (
  status = 'published'
  or user_id = auth.uid()
  or public.is_community_admin()
);

-- No direct INSERT policy: all posts must go through create_community_post(),
-- which enforces the daily limit server-side.

drop policy if exists "learners_can_delete_own_community_posts"
  on public.community_posts;

create policy "learners_can_delete_own_community_posts"
on public.community_posts
for delete
to authenticated
using (
  user_id = auth.uid()
  or public.is_community_admin()
);

drop policy if exists "admins_can_moderate_community_posts"
  on public.community_posts;

create policy "admins_can_moderate_community_posts"
on public.community_posts
for update
to authenticated
using (public.is_community_admin())
with check (public.is_community_admin());

-- ---------------------------------------------------------------------
-- 4. ADMIN EVENTS / COMMUNITY GALLERY
-- ---------------------------------------------------------------------

create table if not exists public.community_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  event_date date,
  location text,
  image_path text,
  is_published boolean not null default false,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint community_events_title_length
    check (char_length(btrim(title)) between 1 and 120),

  constraint community_events_description_length
    check (
      description is null
      or char_length(description) <= 1000
    )
);

create index if not exists idx_community_events_published_date
  on public.community_events(is_published, event_date desc, created_at desc);

alter table public.community_events enable row level security;

drop policy if exists "authenticated_can_read_published_events"
  on public.community_events;

create policy "authenticated_can_read_published_events"
on public.community_events
for select
to authenticated
using (
  is_published = true
  or public.is_community_admin()
);

drop policy if exists "admins_can_insert_events"
  on public.community_events;

create policy "admins_can_insert_events"
on public.community_events
for insert
to authenticated
with check (
  public.is_community_admin()
  and created_by = auth.uid()
);

drop policy if exists "admins_can_update_events"
  on public.community_events;

create policy "admins_can_update_events"
on public.community_events
for update
to authenticated
using (public.is_community_admin())
with check (public.is_community_admin());

drop policy if exists "admins_can_delete_events"
  on public.community_events;

create policy "admins_can_delete_events"
on public.community_events
for delete
to authenticated
using (public.is_community_admin());

-- ---------------------------------------------------------------------
-- 5. PRIVATE COMMUNITY MEDIA BUCKET
--
-- Images are readable only by authenticated users.
-- Learners may upload only inside community-posts/<their-user-id>/...
-- Admins may additionally upload inside community-events/...
-- ---------------------------------------------------------------------

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'community-media',
  'community-media',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "authenticated_can_view_community_media"
  on storage.objects;

create policy "authenticated_can_view_community_media"
on storage.objects
for select
to authenticated
using (bucket_id = 'community-media');

drop policy if exists "learners_can_upload_community_post_media"
  on storage.objects;

create policy "learners_can_upload_community_post_media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'community-media'
  and (storage.foldername(name))[1] = 'community-posts'
  and (storage.foldername(name))[2] = auth.uid()::text
);

drop policy if exists "learners_can_delete_own_community_post_media"
  on storage.objects;

create policy "learners_can_delete_own_community_post_media"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'community-media'
  and (
    (
      (storage.foldername(name))[1] = 'community-posts'
      and (storage.foldername(name))[2] = auth.uid()::text
    )
    or public.is_community_admin()
  )
);

drop policy if exists "admins_can_upload_community_event_media"
  on storage.objects;

create policy "admins_can_upload_community_event_media"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'community-media'
  and (storage.foldername(name))[1] = 'community-events'
  and public.is_community_admin()
);

-- Existing profile avatars are private. For the community leaderboard/feed,
-- allow signed-in learners to view avatars of other signed-in learners.
-- The bucket itself remains private (no anonymous public URLs).
drop policy if exists "authenticated_can_view_profile_avatars"
  on storage.objects;

create policy "authenticated_can_view_profile_avatars"
on storage.objects
for select
to authenticated
using (bucket_id = 'avatars');

-- ---------------------------------------------------------------------
-- 6. CREATE POST RPC
--
-- Maximum 3 posts per learner-local calendar day.
-- Uses profiles.timezone when available, otherwise UTC.
-- ---------------------------------------------------------------------

create or replace function public.create_community_post(
  p_body text,
  p_image_path text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_timezone text;
  v_today date;
  v_count integer;
  v_post_id uuid;
  v_body text;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'You must be signed in to post.';
  end if;

  v_body := btrim(coalesce(p_body, ''));

  if char_length(v_body) < 1 then
    raise exception 'Write a message before posting.';
  end if;

  if char_length(v_body) > 500 then
    raise exception 'Community posts are limited to 500 characters.';
  end if;

  if p_image_path is not null
     and p_image_path !~ ('^community-posts/' || v_user_id::text || '/')
  then
    raise exception 'Invalid community image path.';
  end if;

  select coalesce(nullif(timezone, ''), 'UTC')
  into v_timezone
  from public.profiles
  where id = v_user_id;

  v_timezone := coalesce(v_timezone, 'UTC');

  begin
    perform now() at time zone v_timezone;
  exception when others then
    v_timezone := 'UTC';
  end;

  v_today := (now() at time zone v_timezone)::date;

  select count(*)
  into v_count
  from public.community_posts
  where user_id = v_user_id
    and (created_at at time zone v_timezone)::date = v_today;

  if v_count >= 3 then
    raise exception 'You have reached today''s limit of 3 community posts.';
  end if;

  insert into public.community_posts (
    user_id,
    body,
    image_path,
    status
  )
  values (
    v_user_id,
    v_body,
    p_image_path,
    'published'
  )
  returning id into v_post_id;

  return v_post_id;
end;
$$;

revoke all on function public.create_community_post(text, text) from public;
grant execute on function public.create_community_post(text, text) to authenticated;

-- ---------------------------------------------------------------------
-- 7. DAILY POST ALLOWANCE RPC
-- ---------------------------------------------------------------------

create or replace function public.get_community_post_allowance()
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_user_id uuid;
  v_timezone text;
  v_today date;
  v_count integer;
begin
  v_user_id := auth.uid();

  if v_user_id is null then
    raise exception 'Authentication required.';
  end if;

  select coalesce(nullif(timezone, ''), 'UTC')
  into v_timezone
  from public.profiles
  where id = v_user_id;

  v_timezone := coalesce(v_timezone, 'UTC');

  begin
    perform now() at time zone v_timezone;
  exception when others then
    v_timezone := 'UTC';
  end;

  v_today := (now() at time zone v_timezone)::date;

  select count(*)
  into v_count
  from public.community_posts
  where user_id = v_user_id
    and (created_at at time zone v_timezone)::date = v_today;

  return jsonb_build_object(
    'limit', 3,
    'used', v_count,
    'remaining', greatest(0, 3 - v_count)
  );
end;
$$;

revoke all on function public.get_community_post_allowance() from public;
grant execute on function public.get_community_post_allowance() to authenticated;

-- ---------------------------------------------------------------------
-- 8. COMMUNITY FEED RPC
--
-- Returns only fields that are intentionally visible inside the
-- authenticated community.
-- ---------------------------------------------------------------------

create or replace function public.get_community_feed(
  p_limit integer default 30
)
returns table (
  post_id uuid,
  user_id uuid,
  full_name text,
  community_location text,
  avatar_path text,
  total_xp integer,
  body text,
  image_path text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    cp.id as post_id,
    cp.user_id,
    coalesce(nullif(p.full_name, ''), 'HausaArabia Learner') as full_name,
    p.community_location,
    p.avatar_path,
    coalesce(p.total_xp, 0)::integer as total_xp,
    cp.body,
    cp.image_path,
    cp.created_at
  from public.community_posts cp
  join public.profiles p
    on p.id = cp.user_id
  where cp.status = 'published'
  order by cp.created_at desc
  limit least(greatest(coalesce(p_limit, 30), 1), 50);
$$;

revoke all on function public.get_community_feed(integer) from public;
grant execute on function public.get_community_feed(integer) to authenticated;

-- ---------------------------------------------------------------------
-- 9. XP LEADERBOARD RPC
--
-- Uses the existing authoritative profiles.total_xp value.
-- ---------------------------------------------------------------------

create or replace function public.get_community_leaderboard(
  p_limit integer default 10
)
returns table (
  user_id uuid,
  full_name text,
  community_location text,
  avatar_path text,
  total_xp integer,
  current_streak integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    p.id as user_id,
    coalesce(nullif(p.full_name, ''), 'HausaArabia Learner') as full_name,
    p.community_location,
    p.avatar_path,
    coalesce(p.total_xp, 0)::integer as total_xp,
    coalesce(p.current_streak, 0)::integer as current_streak
  from public.profiles p
  order by
    coalesce(p.total_xp, 0) desc,
    coalesce(p.current_streak, 0) desc,
    p.created_at asc
  limit least(greatest(coalesce(p_limit, 10), 1), 25);
$$;

revoke all on function public.get_community_leaderboard(integer) from public;
grant execute on function public.get_community_leaderboard(integer) to authenticated;

-- ---------------------------------------------------------------------
-- 10. PUBLISHED EVENTS RPC
-- ---------------------------------------------------------------------

create or replace function public.get_community_events(
  p_limit integer default 12
)
returns table (
  event_id uuid,
  title text,
  description text,
  event_date date,
  location text,
  image_path text,
  created_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select
    ce.id as event_id,
    ce.title,
    ce.description,
    ce.event_date,
    ce.location,
    ce.image_path,
    ce.created_at
  from public.community_events ce
  where ce.is_published = true
  order by
    ce.event_date desc nulls last,
    ce.created_at desc
  limit least(greatest(coalesce(p_limit, 12), 1), 30);
$$;

revoke all on function public.get_community_events(integer) from public;
grant execute on function public.get_community_events(integer) to authenticated;

-- =====================================================================
-- ADMIN SETUP EXAMPLE
--
-- After this migration is applied, make a trusted account an admin from
-- the Supabase SQL editor (replace the UUID):
--
-- insert into public.app_admins (user_id)
-- values ('YOUR-ADMIN-AUTH-USER-UUID')
-- on conflict (user_id) do nothing;
--
-- Do NOT expose app_admins writes to the browser.
-- =====================================================================
