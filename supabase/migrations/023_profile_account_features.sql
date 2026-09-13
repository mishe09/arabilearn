-- =====================================================================
-- 0023_profile_account_features.sql
--
-- Adds the minimum backend support needed for a real profile/account page:
--   * private avatar storage
--   * avatar path on profiles
--   * persisted email-notification preference
--   * secure self-service account deletion RPC
--
-- Existing learning analytics fields (XP, streak, timezone, etc.) remain
-- authoritative and are not duplicated here.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Profile fields
-- ---------------------------------------------------------------------

alter table public.profiles
  add column if not exists avatar_path text,
  add column if not exists email_notifications boolean not null default true;


-- ---------------------------------------------------------------------
-- 2. Private avatar bucket
--
-- Each learner can only read/write files inside:
--   avatars/<their-user-id>/...
-- ---------------------------------------------------------------------

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'avatars',
  'avatars',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']::text[]
)
on conflict (id) do update
set
  public = false,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;


drop policy if exists "avatar_select_own" on storage.objects;
create policy "avatar_select_own"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


drop policy if exists "avatar_insert_own" on storage.objects;
create policy "avatar_insert_own"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


drop policy if exists "avatar_update_own" on storage.objects;
create policy "avatar_update_own"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


drop policy if exists "avatar_delete_own" on storage.objects;
create policy "avatar_delete_own"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);


-- ---------------------------------------------------------------------
-- 3. Secure self-service account deletion
--
-- This function can only delete auth.uid(), never another user.
-- The existing FK cascade from auth.users -> profiles is expected to clean
-- the learner's application data. The frontend removes the avatar object
-- before calling this RPC.
-- ---------------------------------------------------------------------

create or replace function public.delete_my_account()
returns void
language plpgsql
security definer
set search_path = public, auth
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Authentication required';
  end if;

  -- Delete the application profile first. Existing child tables reference
  -- profiles with ON DELETE CASCADE, so learner-owned progress data is
  -- removed with the profile even if the profiles -> auth.users FK itself
  -- is not cascading.
  delete from public.profiles
  where id = v_user_id;

  delete from auth.users
  where id = v_user_id;
end;
$$;

revoke all on function public.delete_my_account() from public;
grant execute on function public.delete_my_account() to authenticated;

comment on function public.delete_my_account() is
  'Deletes only the currently authenticated user account.';


-- ---------------------------------------------------------------------
-- 4. Documentation
-- ---------------------------------------------------------------------

comment on column public.profiles.avatar_path is
  'Private Supabase Storage object path in the avatars bucket.';

comment on column public.profiles.email_notifications is
  'Learner preference for receiving email learning notifications.';
