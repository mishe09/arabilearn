# HausaArabia — Supabase Backend

Backend-only deliverable: database schema, RLS policies, triggers, business-logic
functions, and seed data for the HausaArabia app (Arabic learning for Hausa/English
speakers, plus Hajj/Islamic prayers and Arabic radio).

## 0. File structure

```
supabase/
  migrations/            <- production migrations, applied in numeric order
    0001_extensions_and_enums.sql
    0002_profiles.sql
    0003_curriculum.sql
    0004_progress.sql
    0005_streaks.sql
    0006_rewards_skills.sql
    0007_prayers.sql
    0008_radio.sql
    0009_rbac.sql
    0010_functions.sql
    0011_reward_engine.sql
    0012_dashboard_rpc.sql
    0013_rls_policies.sql
    0014_storage.sql
    0015_seed.sql
    0016_production_hardening.sql
    0017_quiz_integrity_and_dashboard_fixes.sql
  tests/                 <- NOT migrations; run manually against a dev/test DB
    00_stub_supabase.sql       (local-only stand-in for auth/storage schemas)
    01_functional_smoke_test.sql
    02_hardening_test.sql
    03_v2_fixes_test.sql
README.md
database.types.ts
```

This matches what the Supabase CLI expects (`supabase/migrations/`) so
`supabase db push` / `supabase db reset` work directly against this folder.
The `tests/` directory is intentionally separate — nothing in it is a schema
change, and none of it should ever be applied via `db push`. `00_stub_supabase.sql`
in particular only exists to let these tests run against a plain local Postgres
instance that doesn't already have Supabase's `auth`/`storage` schemas; **never
run it against a real Supabase project**, which already provides those schemas.

## 1. Setup

```bash
supabase init                 # if not already a supabase project
supabase link --project-ref <your-project-ref>
supabase db push               # applies every file in supabase/migrations/, in order
```

Or, without the CLI: run each file in `supabase/migrations/` **in numeric
order** in the Supabase SQL editor.

After migrating, assign yourself `SUPER_ADMIN` to manage content:

```sql
insert into public.user_roles (user_id, role_id)
select '<your-auth-user-id>', id from public.roles where name = 'SUPER_ADMIN';
```

## 2. Key design decisions

- **Auth**: Supabase Auth handles passwords entirely; `profiles` only stores
  learning-related fields and is auto-populated by a trigger on `auth.users` insert.
- **Idempotent lesson/quiz completion**: unique constraints + partial unique
  indexes on `xp_transactions` guarantee a user can never be paid XP twice for
  the same lesson, quiz, reward, or streak-day, even under retries or races.
- **Permission-based admin model**: RLS policies call `has_permission('curriculum.create')`
  etc. rather than checking role name directly, so you can grant one-off
  permissions via `user_permissions` without creating new roles.
- **Dashboard and lesson/quiz completion are the frontend contract.**
  `get_user_dashboard()`, `complete_lesson()`, `complete_quiz()`,
  `log_study_time()`, and `get_quiz_for_lesson()` are the only functions
  granted to `authenticated`. Progress tables (`user_lesson_progress`,
  `user_unit_progress`, `user_level_progress`, `quiz_attempts`,
  `quiz_attempt_answers`) are read-only to clients — all writes happen inside
  these five functions.
- **Quiz answers are never exposed to students.** `quiz_options.is_correct`
  and `quiz_questions.correct_answer` are admin-only at the RLS level;
  students get quiz content exclusively through `get_quiz_for_lesson()`,
  which strips both fields. Grading happens server-side in `complete_quiz()`.
- **Skill breakdown** is driven by an explicit `lessons.skill_category_id`
  foreign key (not string-matching on `lesson_type`), recalculated after
  every lesson completion.
- **Rewards** are driven by `rewards.required_condition` (JSONB), evaluated
  by `check_and_award_rewards()` — a small rule engine, so new achievements
  can be added via `insert into rewards (...)` without new backend code.

## 3. Example frontend queries (JS client)

```ts
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Sign up
const { data, error } = await supabase.auth.signUp({
  email, password,
  options: { data: { full_name: fullName } } // consumed by handle_new_user()
});

// Get everything the dashboard needs
const { data: dashboard } = await supabase.rpc('get_user_dashboard');

// Browse published curriculum
const { data: levels } = await supabase
  .from('levels')
  .select('*, units(*, lessons(*))')
  .eq('is_published', true)
  .order('level_order');

// Complete a lesson (idempotent — safe to call more than once)
const { data: result } = await supabase.rpc('complete_lesson', {
  p_lesson_id: lessonId,
  p_time_spent_seconds: 180
});
// result: { already_completed, xp_awarded }

// Take a quiz — get the answer-free questions first
const { data: quiz } = await supabase.rpc('get_quiz_for_lesson', { p_lesson_id: lessonId });

// Submit answers (grading + scoring happens server-side)
const { data: quizResult } = await supabase.rpc('complete_quiz', {
  p_quiz_id: quiz.quiz_id,
  p_answers: [
    { question_id: 'q1-uuid', option_id: 'opt-uuid' },
    { question_id: 'q2-uuid', answer_text: 'salaam' }
  ]
});
// quizResult: { attempt_id, score, passed, xp_awarded }

// Log study time (call periodically / on session end)
await supabase.rpc('log_study_time', { p_minutes: 5 });

// Bookmark a prayer / favorite a radio station
await supabase.from('user_prayer_bookmarks').insert({ prayer_id: prayerId });
await supabase.from('user_radio_favorites').insert({ radio_station_id: stationId });

// Upload an avatar (path MUST start with the user's own uid)
await supabase.storage
  .from('avatars')
  .upload(`${user.id}/avatar.png`, file, { upsert: true });
```

## 4. What changed and why

### Round 1 — `0016_production_hardening.sql`
1. Quiz answers (`is_correct`, `correct_answer`) locked down; served via
   `get_quiz_for_lesson()` instead.
2. Added targeted composite indexes for dashboard/progress query patterns.
3. Skill breakdown switched from string-matching to an explicit
   `lessons.skill_category_id` foreign key.
4. Added `process_daily_streak_resets()`, scheduled via `pg_cron`, so
   broken streaks resolve automatically instead of only on the user's next visit.
5. Revoked the default `PUBLIC` `EXECUTE` grant on every function in
   `public`; explicitly re-granted only what each role needs.
6. Closed remaining duplicate-XP gaps (`REWARD`, `STREAK_BONUS`) with
   partial unique indexes on `xp_transactions`.
7. Removed client `INSERT`/`UPDATE` RLS policies on progress tables —
   `complete_lesson()`/`complete_quiz()` became the only write path.

### Round 2 — `0017_quiz_integrity_and_dashboard_fixes.sql` (this round)
1. **Duplicate quiz answers could inflate score.** Added
   `unique(attempt_id, question_id)` on `quiz_attempt_answers`.
   `complete_quiz()` now de-duplicates submitted answers by `question_id`
   before grading (first occurrence in submission order wins), the insert
   carries `on conflict (attempt_id, question_id) do nothing` as a hard
   backstop, and the final score is computed by re-reading the persisted
   answer rows rather than a running total — so it can never drift from
   what's actually stored. A submitted `option_id` that doesn't belong to
   the question (or doesn't exist at all) is now safely ignored (scored
   incorrect, no dangling reference stored) instead of raising a foreign-key
   error.
2. **`complete_quiz()` didn't check the full publish chain.** It now joins
   `quizzes → lessons → units → levels` and requires all four
   `is_published = true` before allowing completion. Added a new
   `quizzes.is_published` column (default `true`) so an individual quiz can
   be taken offline without unpublishing its whole lesson; `get_quiz_for_lesson()`
   and the RLS policy on `quizzes` were updated to match.
3. **Dashboard recommendations weren't ordered/filtered correctly.**
   `get_user_dashboard()`'s `next_recommended_lessons` now orders by
   `levels.level_order, units.unit_order, lessons.lesson_order` (previously
   level ordering was missing) and requires `levels.is_published AND
   units.is_published AND lessons.is_published` (previously only checked
   the lesson).
4. **Studied-time was inconsistent with `log_study_time()`.** Implemented
   Option B: `get_user_dashboard()` now reads
   `time_studied_today_seconds = user_daily_goals.minutes_completed * 60`
   for `current_date` (0 if no row exists yet), and `today_goal` is read
   from that same row — so the two figures can never disagree.
   `study_sessions` is still logged for session-level detail but no longer
   feeds this number.
5. **`0015_seed.sql`'s "safe to rerun" claim was actually false.**
   `radio_stations` and `rewards` used a bare `ON CONFLICT DO NOTHING` with
   no underlying unique constraint on the table — which catches nothing,
   since there's no constraint for a conflict to violate — so reruns
   silently inserted duplicate rows. The curriculum seed (levels → units →
   lessons → quiz → questions → options) used a chain of CTEs with no
   `ON CONFLICT` at all, so a rerun would hard-fail on the first unique
   constraint it hit. **Fixed:** rewrote the seed as an explicit `DO` block.
   Tables with a real natural unique key (`levels.level_order`,
   `units(level_id,unit_order)`, `lessons(unit_id,lesson_order)`,
   `lesson_content_blocks(lesson_id,block_order)`,
   `quiz_questions(quiz_id,question_order)`,
   `quiz_options(question_id,option_order)`,
   `prayer_categories.category_order`, `prayers(category_id,prayer_order)`)
   use `ON CONFLICT (...) DO UPDATE ... RETURNING id`, which — unlike
   `DO NOTHING` — always returns a row, so downstream inserts needing that
   id work identically on the first run and every rerun. `quizzes` has no
   natural unique key by design (a lesson can have more than one quiz), so
   it uses an explicit lookup-then-insert. `radio_stations` and `rewards`
   use `WHERE NOT EXISTS` guards. Verified by actually running the seed
   file three times in a row against a live database (see §5 checklist).
6. **Folder structure.** Moved to `supabase/migrations/` +
   `supabase/tests/` + top-level `README.md` / `database.types.ts`, matching
   what `supabase db push` expects. Test/smoke-test SQL is explicitly kept
   out of `migrations/` since it must never be applied as a schema change.
7. **`database.types.ts` regenerated** to reflect `quizzes.is_published`,
   `lessons.skill_category_id`, and the current RPC function signatures.
   See §6 for the authoritative regeneration command.

A note on a bug this round's own testing caught along the way: the first
draft of the `complete_quiz()` rewrite added `#variable_conflict use_column`
and an `on conflict (attempt_id, question_id)` clause whose bare column name
collided with the function's own `RETURNS TABLE(attempt_id uuid, ...)` output
parameter — a classic PL/pgSQL shadowing gotcha. It was caught by actually
running the migration against Postgres (not just reading it), not by
inspection, which is why every fix in this README was verified the same way.

## 5. Testing checklist

All of the following were run against a real local Postgres 16 instance
(fresh database, all 17 migrations applied via `supabase/tests/00_stub_supabase.sql`
+ `migrations/*.sql` in order) as part of preparing this round of fixes.
Reproduce with `psql`, or run the equivalent from `supabase/tests/`:

1. **Apply migrations** — `supabase db push` (or run `migrations/*.sql` in
   numeric order). Confirm no errors on a totally fresh database.
2. **Create a user** — sign up via Supabase Auth (or, for local testing,
   `insert into auth.users (id, email, raw_user_meta_data) values (...)`)
   and confirm a matching `profiles` row was auto-created by the trigger.
3. **Assign `SUPER_ADMIN`** —
   `insert into user_roles (user_id, role_id) select '<uid>', id from roles where name = 'SUPER_ADMIN';`
   then confirm `has_permission('admin.full_access')` returns `true` for that user.
4. **Call `get_user_dashboard()`** as that user — confirm it returns
   `full_name`, XP/streak fields, `today_goal`, `time_studied_today_seconds`,
   `next_recommended_lessons` (ordered by level → unit → lesson, published only),
   `skills_breakdown`, `rewards`, `recent_activity`.
5. **Call `get_quiz_for_lesson(lesson_id)`** — confirm the response has NO
   `is_correct` or `correct_answer` fields anywhere in the payload.
6. **Call `complete_quiz(quiz_id, answers)`** — confirm it returns
   `{ attempt_id, score, passed, xp_awarded }` and that the answers/score
   actually persisted correctly in `quiz_attempts` / `quiz_attempt_answers`.
7. **Verify duplicate quiz answers cannot inflate score** — submit the same
   `question_id` two or three times in one `complete_quiz()` call; confirm
   (a) only one row exists in `quiz_attempt_answers` for that question, and
   (b) the score matches what a single answer would produce, not multiple.
8. **Verify unpublished quiz content cannot be completed** — set
   `is_published = false` on the quiz's lesson, unit, level, or the quiz row
   itself, one at a time; confirm `complete_quiz()` raises an error each time,
   then restore `is_published = true` and confirm it succeeds again.
9. **Verify seed can run twice without failing** — record row counts for
   `levels/units/lessons/quizzes/quiz_questions/quiz_options/radio_stations/rewards/prayers/prayer_categories`,
   run `migrations/0015_seed.sql` again, and confirm both zero errors and
   identical row counts.

## 6. Regenerating `database.types.ts`

`database.types.ts` in this package was hand-updated to match the current
schema (see §0 for its location), but the authoritative source is always the
Supabase CLI. After applying migrations, regenerate it with:

```bash
# against a linked hosted project
supabase gen types typescript --project-id <project-ref> > database.types.ts

# or against a local Supabase stack
supabase gen types typescript --local > database.types.ts
```

Run this any time the schema changes and commit the regenerated file —
don't hand-edit it going forward.

## 7. Notes / remaining things to decide

- `process_daily_streak_resets()` (round 1, item 4) needs `pg_cron` enabled
  once in the Supabase dashboard on a hosted project; the migration prints
  the exact follow-up `cron.schedule(...)` command if it can't enable it
  automatically.
- `full_name`/`email` on `profiles` are duplicated from `auth.users`. If a
  user changes their email via Supabase Auth, `profiles.email` won't update
  automatically — add a trigger on `auth.users` update if you need them to
  stay in sync.
- `quizzes.is_published` defaults to `true`, so existing/seeded quizzes keep
  working without any action needed after this migration.
