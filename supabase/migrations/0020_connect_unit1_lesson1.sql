-- Connect the existing Supabase Unit 1 / Lesson 1
-- to the Basic Greetings lesson already stored in data/lessons.ts.

alter table public.lessons
add column if not exists content_key text;

create unique index if not exists uq_lessons_content_key
on public.lessons(content_key)
where content_key is not null;


-- Rename Unit 1.
with first_level as (
  select id
  from public.levels
  where level_order = 1
  limit 1
),
first_unit as (
  select u.id
  from public.units u
  join first_level l on l.id = u.level_id
  where u.unit_order = 1
  limit 1
)
update public.units
set
  title = 'Unit 1: Beginner Foundation (Matakin Farko)',
  description = 'Essential vocabulary and phrases to start your Hausa-Arabic journey.',
  is_published = true
where id = (
  select id from first_unit
);


-- Reuse the EXISTING Supabase Lesson 1 UUID.
-- We are not creating another lesson.
with first_level as (
  select id
  from public.levels
  where level_order = 1
  limit 1
),
first_unit as (
  select u.id
  from public.units u
  join first_level l on l.id = u.level_id
  where u.unit_order = 1
  limit 1
)
update public.lessons
set
  title = 'Basic Greetings (Gaisuwa / التحيات)',
  description = 'Learn how to greet people in Hausa and Arabic — the most essential phrases for any conversation.',
  estimated_minutes = 5,
  xp_reward = 50,
  is_published = true,
  content_key = 'u1-l1-greetings'
where unit_id = (
  select id from first_unit
)
and lesson_order = 1;


-- Make sure the mapping succeeded.
do $$
begin
  if not exists (
    select 1
    from public.lessons l
    join public.units u on u.id = l.unit_id
    join public.levels lv on lv.id = u.level_id
    where lv.level_order = 1
      and u.unit_order = 1
      and l.lesson_order = 1
      and l.content_key = 'u1-l1-greetings'
  ) then
    raise exception 'Could not connect Unit 1 Lesson 1 to u1-l1-greetings';
  end if;
end;
$$;
