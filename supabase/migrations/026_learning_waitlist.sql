-- 026_learning_waitlist.sql
-- HausaArabia Learn: waitlist for registered users.

create table if not exists public.learning_waitlist (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null check (char_length(email) between 3 and 320),
  subject_interest text not null default 'general'
    check (char_length(subject_interest) between 1 and 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learning_waitlist enable row level security;

drop policy if exists "Users can read own learning waitlist entry"
  on public.learning_waitlist;

create policy "Users can read own learning waitlist entry"
on public.learning_waitlist
for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can join learning waitlist"
  on public.learning_waitlist;

create policy "Users can join learning waitlist"
on public.learning_waitlist
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own learning waitlist entry"
  on public.learning_waitlist;

create policy "Users can update own learning waitlist entry"
on public.learning_waitlist
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

grant select, insert, update on public.learning_waitlist to authenticated;
