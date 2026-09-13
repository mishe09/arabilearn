-- =====================================================================
-- 0013_rls_policies.sql
-- Enable RLS everywhere and define access rules.
--
-- Conventions:
--  - "own row" tables: user can select/insert/update (never delete) their
--    own rows; no public access.
--  - Content tables: public/anon + authenticated can SELECT published rows;
--    only users with the matching curriculum.* / prayer.* / radio.* /
--    reward.* permission can INSERT/UPDATE/DELETE.
--  - RBAC tables: readable by authenticated users (to resolve their own
--    roles/permissions), writable only by admin.full_access.
-- =====================================================================

-- ---------------------------------------------------------------------
-- Enable RLS
-- ---------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.levels enable row level security;
alter table public.units enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_content_blocks enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_options enable row level security;
alter table public.user_level_progress enable row level security;
alter table public.user_unit_progress enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.quiz_attempt_answers enable row level security;
alter table public.xp_transactions enable row level security;
alter table public.study_sessions enable row level security;
alter table public.user_daily_goals enable row level security;
alter table public.user_streak_logs enable row level security;
alter table public.streak_freeze_logs enable row level security;
alter table public.rewards enable row level security;
alter table public.user_rewards enable row level security;
alter table public.skill_categories enable row level security;
alter table public.user_skill_progress enable row level security;
alter table public.prayer_categories enable row level security;
alter table public.prayers enable row level security;
alter table public.user_prayer_bookmarks enable row level security;
alter table public.user_prayer_progress enable row level security;
alter table public.radio_stations enable row level security;
alter table public.user_radio_favorites enable row level security;
alter table public.radio_listening_sessions enable row level security;
alter table public.roles enable row level security;
alter table public.permissions enable row level security;
alter table public.role_permissions enable row level security;
alter table public.user_roles enable row level security;
alter table public.user_permissions enable row level security;

-- ---------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

create policy "profiles_select_admin" on public.profiles
  for select using (public.has_permission('users.view'));

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);
-- inserts happen only via the handle_new_user trigger (security definer)

-- ---------------------------------------------------------------------
-- Curriculum: levels / units / lessons / content blocks
-- ---------------------------------------------------------------------
create policy "levels_select_published" on public.levels
  for select using (is_published = true or public.has_permission('curriculum.view'));
create policy "levels_insert_admin" on public.levels
  for insert with check (public.has_permission('curriculum.create'));
create policy "levels_update_admin" on public.levels
  for update using (public.has_permission('curriculum.update'));
create policy "levels_delete_admin" on public.levels
  for delete using (public.has_permission('curriculum.delete'));

create policy "units_select_published" on public.units
  for select using (is_published = true or public.has_permission('curriculum.view'));
create policy "units_insert_admin" on public.units
  for insert with check (public.has_permission('curriculum.create'));
create policy "units_update_admin" on public.units
  for update using (public.has_permission('curriculum.update'));
create policy "units_delete_admin" on public.units
  for delete using (public.has_permission('curriculum.delete'));

create policy "lessons_select_published" on public.lessons
  for select using (is_published = true or public.has_permission('curriculum.view'));
create policy "lessons_insert_admin" on public.lessons
  for insert with check (public.has_permission('curriculum.create'));
create policy "lessons_update_admin" on public.lessons
  for update using (public.has_permission('curriculum.update'));
create policy "lessons_delete_admin" on public.lessons
  for delete using (public.has_permission('curriculum.delete'));

create policy "content_blocks_select_published" on public.lesson_content_blocks
  for select using (
    exists (select 1 from public.lessons l where l.id = lesson_id and l.is_published = true)
    or public.has_permission('curriculum.view')
  );
create policy "content_blocks_insert_admin" on public.lesson_content_blocks
  for insert with check (public.has_permission('curriculum.create'));
create policy "content_blocks_update_admin" on public.lesson_content_blocks
  for update using (public.has_permission('curriculum.update'));
create policy "content_blocks_delete_admin" on public.lesson_content_blocks
  for delete using (public.has_permission('curriculum.delete'));

-- Quizzes / questions / options: visible if parent lesson is published
create policy "quizzes_select_published" on public.quizzes
  for select using (
    exists (select 1 from public.lessons l where l.id = lesson_id and l.is_published = true)
    or public.has_permission('curriculum.view')
  );
create policy "quizzes_insert_admin" on public.quizzes
  for insert with check (public.has_permission('curriculum.create'));
create policy "quizzes_update_admin" on public.quizzes
  for update using (public.has_permission('curriculum.update'));
create policy "quizzes_delete_admin" on public.quizzes
  for delete using (public.has_permission('curriculum.delete'));

create policy "quiz_questions_select_published" on public.quiz_questions
  for select using (
    exists (
      select 1 from public.quizzes q
      join public.lessons l on l.id = q.lesson_id
      where q.id = quiz_id and l.is_published = true
    )
    or public.has_permission('curriculum.view')
  );
create policy "quiz_questions_insert_admin" on public.quiz_questions
  for insert with check (public.has_permission('curriculum.create'));
create policy "quiz_questions_update_admin" on public.quiz_questions
  for update using (public.has_permission('curriculum.update'));
create policy "quiz_questions_delete_admin" on public.quiz_questions
  for delete using (public.has_permission('curriculum.delete'));

-- NOTE: quiz_options exposes is_correct. Consider excluding is_correct in
-- the client select list, or serve questions/options exclusively through
-- a dedicated RPC that strips answers before a quiz is submitted.
create policy "quiz_options_select_published" on public.quiz_options
  for select using (
    exists (
      select 1 from public.quiz_questions qq
      join public.quizzes q on q.id = qq.quiz_id
      join public.lessons l on l.id = q.lesson_id
      where qq.id = question_id and l.is_published = true
    )
    or public.has_permission('curriculum.view')
  );
create policy "quiz_options_insert_admin" on public.quiz_options
  for insert with check (public.has_permission('curriculum.create'));
create policy "quiz_options_update_admin" on public.quiz_options
  for update using (public.has_permission('curriculum.update'));
create policy "quiz_options_delete_admin" on public.quiz_options
  for delete using (public.has_permission('curriculum.delete'));

-- ---------------------------------------------------------------------
-- Progress tables — strictly own-row only (+ admin read for reports)
-- ---------------------------------------------------------------------
create policy "ulevp_select_own" on public.user_level_progress
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
create policy "ulevp_write_own" on public.user_level_progress
  for insert with check (auth.uid() = user_id);
create policy "ulevp_update_own" on public.user_level_progress
  for update using (auth.uid() = user_id);

create policy "uup_select_own" on public.user_unit_progress
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
create policy "uup_write_own" on public.user_unit_progress
  for insert with check (auth.uid() = user_id);
create policy "uup_update_own" on public.user_unit_progress
  for update using (auth.uid() = user_id);

create policy "ulp_select_own" on public.user_lesson_progress
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
create policy "ulp_write_own" on public.user_lesson_progress
  for insert with check (auth.uid() = user_id);
create policy "ulp_update_own" on public.user_lesson_progress
  for update using (auth.uid() = user_id);

create policy "quiz_attempts_select_own" on public.quiz_attempts
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
create policy "quiz_attempts_write_own" on public.quiz_attempts
  for insert with check (auth.uid() = user_id);
create policy "quiz_attempts_update_own" on public.quiz_attempts
  for update using (auth.uid() = user_id);

create policy "qaa_select_own" on public.quiz_attempt_answers
  for select using (
    exists (select 1 from public.quiz_attempts qa where qa.id = attempt_id and qa.user_id = auth.uid())
    or public.has_permission('reports.view')
  );
create policy "qaa_write_own" on public.quiz_attempt_answers
  for insert with check (
    exists (select 1 from public.quiz_attempts qa where qa.id = attempt_id and qa.user_id = auth.uid())
  );

create policy "xp_tx_select_own" on public.xp_transactions
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
-- inserts happen only via SECURITY DEFINER functions (award_xp)

create policy "study_sessions_select_own" on public.study_sessions
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
create policy "study_sessions_write_own" on public.study_sessions
  for insert with check (auth.uid() = user_id);
create policy "study_sessions_update_own" on public.study_sessions
  for update using (auth.uid() = user_id);

create policy "daily_goals_select_own" on public.user_daily_goals
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
-- writes happen via log_study_time (SECURITY DEFINER)

create policy "streak_logs_select_own" on public.user_streak_logs
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));

create policy "streak_freeze_select_own" on public.streak_freeze_logs
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));

-- ---------------------------------------------------------------------
-- Rewards / skills
-- ---------------------------------------------------------------------
create policy "rewards_select_all" on public.rewards
  for select using (true); -- reward catalog is public info
create policy "rewards_insert_admin" on public.rewards
  for insert with check (public.has_permission('reward.create'));
create policy "rewards_update_admin" on public.rewards
  for update using (public.has_permission('reward.update'));
create policy "rewards_delete_admin" on public.rewards
  for delete using (public.has_permission('reward.update'));

create policy "user_rewards_select_own" on public.user_rewards
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
-- inserts happen via check_and_award_rewards (SECURITY DEFINER)

create policy "skill_categories_select_all" on public.skill_categories
  for select using (true);
create policy "skill_categories_admin_write" on public.skill_categories
  for insert with check (public.has_permission('curriculum.create'));
create policy "skill_categories_admin_update" on public.skill_categories
  for update using (public.has_permission('curriculum.update'));

create policy "user_skill_progress_select_own" on public.user_skill_progress
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
-- writes happen via update_skill_progress_for_lesson (SECURITY DEFINER)

-- ---------------------------------------------------------------------
-- Prayers module
-- ---------------------------------------------------------------------
create policy "prayer_categories_select_all" on public.prayer_categories
  for select using (true);
create policy "prayer_categories_insert_admin" on public.prayer_categories
  for insert with check (public.has_permission('prayer.create'));
create policy "prayer_categories_update_admin" on public.prayer_categories
  for update using (public.has_permission('prayer.update'));
create policy "prayer_categories_delete_admin" on public.prayer_categories
  for delete using (public.has_permission('prayer.update'));

create policy "prayers_select_all" on public.prayers
  for select using (true);
create policy "prayers_insert_admin" on public.prayers
  for insert with check (public.has_permission('prayer.create'));
create policy "prayers_update_admin" on public.prayers
  for update using (public.has_permission('prayer.update'));
create policy "prayers_delete_admin" on public.prayers
  for delete using (public.has_permission('prayer.update'));

create policy "prayer_bookmarks_select_own" on public.user_prayer_bookmarks
  for select using (auth.uid() = user_id);
create policy "prayer_bookmarks_write_own" on public.user_prayer_bookmarks
  for insert with check (auth.uid() = user_id);
create policy "prayer_bookmarks_delete_own" on public.user_prayer_bookmarks
  for delete using (auth.uid() = user_id);

create policy "prayer_progress_select_own" on public.user_prayer_progress
  for select using (auth.uid() = user_id);
create policy "prayer_progress_write_own" on public.user_prayer_progress
  for insert with check (auth.uid() = user_id);
create policy "prayer_progress_update_own" on public.user_prayer_progress
  for update using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- Radio module
-- ---------------------------------------------------------------------
create policy "radio_stations_select_active" on public.radio_stations
  for select using (is_active = true or public.has_permission('radio.create'));
create policy "radio_stations_insert_admin" on public.radio_stations
  for insert with check (public.has_permission('radio.create'));
create policy "radio_stations_update_admin" on public.radio_stations
  for update using (public.has_permission('radio.update'));
create policy "radio_stations_delete_admin" on public.radio_stations
  for delete using (public.has_permission('radio.update'));

create policy "radio_favorites_select_own" on public.user_radio_favorites
  for select using (auth.uid() = user_id);
create policy "radio_favorites_write_own" on public.user_radio_favorites
  for insert with check (auth.uid() = user_id);
create policy "radio_favorites_delete_own" on public.user_radio_favorites
  for delete using (auth.uid() = user_id);

create policy "radio_sessions_select_own" on public.radio_listening_sessions
  for select using (auth.uid() = user_id or public.has_permission('reports.view'));
create policy "radio_sessions_write_own" on public.radio_listening_sessions
  for insert with check (auth.uid() = user_id);
create policy "radio_sessions_update_own" on public.radio_listening_sessions
  for update using (auth.uid() = user_id);

-- ---------------------------------------------------------------------
-- RBAC tables
-- ---------------------------------------------------------------------
create policy "roles_select_auth" on public.roles
  for select using (auth.role() = 'authenticated');
create policy "roles_admin_write" on public.roles
  for all using (public.has_permission('admin.full_access'))
  with check (public.has_permission('admin.full_access'));

create policy "permissions_select_auth" on public.permissions
  for select using (auth.role() = 'authenticated');
create policy "permissions_admin_write" on public.permissions
  for all using (public.has_permission('admin.full_access'))
  with check (public.has_permission('admin.full_access'));

create policy "role_permissions_select_auth" on public.role_permissions
  for select using (auth.role() = 'authenticated');
create policy "role_permissions_admin_write" on public.role_permissions
  for all using (public.has_permission('admin.full_access'))
  with check (public.has_permission('admin.full_access'));

create policy "user_roles_select_own_or_admin" on public.user_roles
  for select using (auth.uid() = user_id or public.has_permission('users.view'));
create policy "user_roles_admin_write" on public.user_roles
  for all using (public.has_permission('admin.full_access'))
  with check (public.has_permission('admin.full_access'));

create policy "user_permissions_select_own_or_admin" on public.user_permissions
  for select using (auth.uid() = user_id or public.has_permission('users.view'));
create policy "user_permissions_admin_write" on public.user_permissions
  for all using (public.has_permission('admin.full_access'))
  with check (public.has_permission('admin.full_access'));
