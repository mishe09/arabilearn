-- =====================================================================
-- 0014_storage.sql
-- Storage buckets + policies
--
-- Bucket layout convention (enforced by policy path checks below):
--   avatars/{user_id}/...            -> user can only write inside own folder
--   lesson-audio/...                 -> admin write, public read
--   lesson-images/...                -> admin write, public read
--   prayer-audio/...                 -> admin write, public read
--   radio-logos/...                  -> admin write, public read
-- =====================================================================

insert into storage.buckets (id, name, public)
values
  ('avatars', 'avatars', true),
  ('lesson-audio', 'lesson-audio', true),
  ('lesson-images', 'lesson-images', true),
  ('prayer-audio', 'prayer-audio', true),
  ('radio-logos', 'radio-logos', true)
on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- avatars: public read, owner-only write (path must start with their uid)
-- ---------------------------------------------------------------------
create policy "avatars_public_read" on storage.objects
  for select using (bucket_id = 'avatars');

create policy "avatars_owner_insert" on storage.objects
  for insert with check (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "avatars_owner_delete" on storage.objects
  for delete using (
    bucket_id = 'avatars'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- ---------------------------------------------------------------------
-- lesson-audio / lesson-images: public read, curriculum-admin write
-- ---------------------------------------------------------------------
create policy "lesson_audio_public_read" on storage.objects
  for select using (bucket_id = 'lesson-audio');
create policy "lesson_audio_admin_write" on storage.objects
  for insert with check (bucket_id = 'lesson-audio' and public.has_permission('curriculum.create'));
create policy "lesson_audio_admin_update" on storage.objects
  for update using (bucket_id = 'lesson-audio' and public.has_permission('curriculum.update'));
create policy "lesson_audio_admin_delete" on storage.objects
  for delete using (bucket_id = 'lesson-audio' and public.has_permission('curriculum.delete'));

create policy "lesson_images_public_read" on storage.objects
  for select using (bucket_id = 'lesson-images');
create policy "lesson_images_admin_write" on storage.objects
  for insert with check (bucket_id = 'lesson-images' and public.has_permission('curriculum.create'));
create policy "lesson_images_admin_update" on storage.objects
  for update using (bucket_id = 'lesson-images' and public.has_permission('curriculum.update'));
create policy "lesson_images_admin_delete" on storage.objects
  for delete using (bucket_id = 'lesson-images' and public.has_permission('curriculum.delete'));

-- ---------------------------------------------------------------------
-- prayer-audio: public read, prayer-admin write
-- ---------------------------------------------------------------------
create policy "prayer_audio_public_read" on storage.objects
  for select using (bucket_id = 'prayer-audio');
create policy "prayer_audio_admin_write" on storage.objects
  for insert with check (bucket_id = 'prayer-audio' and public.has_permission('prayer.create'));
create policy "prayer_audio_admin_update" on storage.objects
  for update using (bucket_id = 'prayer-audio' and public.has_permission('prayer.update'));
create policy "prayer_audio_admin_delete" on storage.objects
  for delete using (bucket_id = 'prayer-audio' and public.has_permission('prayer.update'));

-- ---------------------------------------------------------------------
-- radio-logos: public read, radio-admin write
-- ---------------------------------------------------------------------
create policy "radio_logos_public_read" on storage.objects
  for select using (bucket_id = 'radio-logos');
create policy "radio_logos_admin_write" on storage.objects
  for insert with check (bucket_id = 'radio-logos' and public.has_permission('radio.create'));
create policy "radio_logos_admin_update" on storage.objects
  for update using (bucket_id = 'radio-logos' and public.has_permission('radio.update'));
create policy "radio_logos_admin_delete" on storage.objects
  for delete using (bucket_id = 'radio-logos' and public.has_permission('radio.update'));
