
-- 0022_badge_milestones.sql
--
-- Canonical milestone badges using the EXISTING rewards/user_rewards
-- system. Existing reward IDs are preserved where a legacy milestone
-- already exists, so previously-earned user_rewards stay valid.
--
-- Badges themselves award NO XP. XP remains governed by the dedicated
-- lesson/quiz/unit/daily-goal/streak reward functions.
-- =====================================================================


-- ---------------------------------------------------------------------
-- 1. Rename legacy milestones to the canonical learner-facing badge names.
--    Updating the reward row preserves user_rewards.reward_id history.
-- ---------------------------------------------------------------------

update public.rewards
set title = 'First Steps'
where title = 'First Lesson Completed';

update public.rewards
set title = 'Quiz Starter'
where title = 'First Quiz Passed';

update public.rewards
set title = 'Unit Master'
where title = 'First Unit Completed';

update public.rewards
set title = 'Goal Getter'
where title = 'Daily Goal Achieved';

update public.rewards
set title = 'On Fire'
where title = '3 Day Streak';

update public.rewards
set title = 'Dedicated Learner'
where title = '7 Day Streak';

update public.rewards
set title = 'Consistent'
where title = '14 Day Streak';

update public.rewards
set title = 'Monthly Master'
where title = '30 Day Streak';

update public.rewards
set title = 'Bronze Learner'
where title = '100 XP Earned';


-- ---------------------------------------------------------------------
-- 2. Upsert all canonical badge definitions.
--    This also covers a clean installation where a legacy row is absent.
-- ---------------------------------------------------------------------

insert into public.rewards (
  title,
  description,
  reward_type,
  icon_url,
  required_condition,
  xp_bonus
)
values
  (
    'First Steps',
    'Complete your first lesson',
    'BADGE',
    '🌱',
    '{"type":"lessons_completed","count":1}'::jsonb,
    0
  ),
  (
    'Quiz Starter',
    'Pass your first quiz',
    'BADGE',
    '🧠',
    '{"type":"quiz_passed","count":1}'::jsonb,
    0
  ),
  (
    'Unit Master',
    'Complete your first full unit',
    'COMPLETION',
    '🏆',
    '{"type":"units_completed","count":1}'::jsonb,
    0
  ),
  (
    'Goal Getter',
    'Reach your 30-minute daily learning goal for the first time',
    'BADGE',
    '🎯',
    '{"type":"daily_goal_met","count":1}'::jsonb,
    0
  ),
  (
    'On Fire',
    'Learn on 3 consecutive days',
    'STREAK',
    '🔥',
    '{"type":"streak_days","count":3}'::jsonb,
    0
  ),
  (
    'Dedicated Learner',
    'Learn on 7 consecutive days',
    'STREAK',
    '🔥',
    '{"type":"streak_days","count":7}'::jsonb,
    0
  ),
  (
    'Consistent',
    'Learn on 14 consecutive days',
    'STREAK',
    '⚡',
    '{"type":"streak_days","count":14}'::jsonb,
    0
  ),
  (
    'Monthly Master',
    'Learn on 30 consecutive days',
    'STREAK',
    '👑',
    '{"type":"streak_days","count":30}'::jsonb,
    0
  ),
  (
    'Bronze Learner',
    'Earn 100 total XP',
    'BADGE',
    '🥉',
    '{"type":"total_xp","amount":100}'::jsonb,
    0
  ),
  (
    'Silver Scholar',
    'Earn 500 total XP',
    'BADGE',
    '🥈',
    '{"type":"total_xp","amount":500}'::jsonb,
    0
  ),
  (
    'Gold Speaker',
    'Earn 1000 total XP',
    'BADGE',
    '🥇',
    '{"type":"total_xp","amount":1000}'::jsonb,
    0
  ),
  (
    'Platinum Pro',
    'Earn 2000 total XP',
    'BADGE',
    '💎',
    '{"type":"total_xp","amount":2000}'::jsonb,
    0
  ),
  (
    'Legendary Linguist',
    'Earn 5000 total XP',
    'BADGE',
    '👑',
    '{"type":"total_xp","amount":5000}'::jsonb,
    0
  )
on conflict (title) do update
set
  description = excluded.description,
  reward_type = excluded.reward_type,
  icon_url = excluded.icon_url,
  required_condition = excluded.required_condition,
  xp_bonus = 0;


-- ---------------------------------------------------------------------
-- 3. Enforce the agreed rule: badge rows do not grant additional XP.
-- ---------------------------------------------------------------------

update public.rewards
set xp_bonus = 0
where title in (
  'First Steps',
  'Quiz Starter',
  'Unit Master',
  'Goal Getter',
  'On Fire',
  'Dedicated Learner',
  'Consistent',
  'Monthly Master',
  'Bronze Learner',
  'Silver Scholar',
  'Gold Speaker',
  'Platinum Pro',
  'Legendary Linguist'
);


-- ---------------------------------------------------------------------
-- 4. Backfill badges for existing learners.
--
-- check_and_award_rewards() is idempotent because user_rewards has
-- UNIQUE(user_id, reward_id) and the function skips already-earned rows.
-- ---------------------------------------------------------------------

do $$
declare
  v_user_id uuid;
begin
  for v_user_id in
    select id
    from public.profiles
  loop
    perform public.check_and_award_rewards(v_user_id);
  end loop;
end;
$$;


-- ---------------------------------------------------------------------
-- 5. Safety checks.
-- ---------------------------------------------------------------------

do $$
declare
  v_badge_count integer;
  v_badge_with_xp_count integer;
begin
  select count(*)
  into v_badge_count
  from public.rewards
  where title in (
    'First Steps',
    'Quiz Starter',
    'Unit Master',
    'Goal Getter',
    'On Fire',
    'Dedicated Learner',
    'Consistent',
    'Monthly Master',
    'Bronze Learner',
    'Silver Scholar',
    'Gold Speaker',
    'Platinum Pro',
    'Legendary Linguist'
  );

  if v_badge_count <> 13 then
    raise exception 'Expected 13 canonical milestone badges, found %',
      v_badge_count;
  end if;

  select count(*)
  into v_badge_with_xp_count
  from public.rewards
  where title in (
    'First Steps',
    'Quiz Starter',
    'Unit Master',
    'Goal Getter',
    'On Fire',
    'Dedicated Learner',
    'Consistent',
    'Monthly Master',
    'Bronze Learner',
    'Silver Scholar',
    'Gold Speaker',
    'Platinum Pro',
    'Legendary Linguist'
  )
    and xp_bonus <> 0;

  if v_badge_with_xp_count <> 0 then
    raise exception 'Milestone badges must not award XP';
  end if;
end;
$$;
