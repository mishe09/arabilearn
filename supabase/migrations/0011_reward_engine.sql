-- =====================================================================
-- 0011_reward_engine.sql
-- Evaluates rewards.required_condition against a user's current stats
-- and grants any newly-earned rewards. Simple, extensible rule engine
-- driven by JSONB so new rewards can be added without new code.
--
-- required_condition shape (one key per row), examples:
--   {"type": "lessons_completed", "count": 1}
--   {"type": "streak_days", "count": 7}
--   {"type": "lesson_type_completed", "lesson_type": "ALPHABET", "count": 1}
--   {"type": "quiz_passed", "count": 1}
--   {"type": "total_xp", "amount": 100}
-- =====================================================================

create or replace function public.check_and_award_rewards(p_user_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  r record;
  v_condition jsonb;
  v_type text;
  v_met boolean;
  v_stat integer;
begin
  for r in select * from public.rewards loop
    -- skip rewards already earned
    if exists (
      select 1 from public.user_rewards
      where user_id = p_user_id and reward_id = r.id
    ) then
      continue;
    end if;

    v_condition := r.required_condition;
    v_type := v_condition->>'type';
    v_met := false;

    if v_type = 'lessons_completed' then
      select count(*) into v_stat
      from public.user_lesson_progress
      where user_id = p_user_id and status = 'COMPLETED';
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'streak_days' then
      select current_streak into v_stat from public.profiles where id = p_user_id;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'lesson_type_completed' then
      select count(*) into v_stat
      from public.user_lesson_progress ulp
      join public.lessons l on l.id = ulp.lesson_id
      where ulp.user_id = p_user_id
        and ulp.status = 'COMPLETED'
        and l.lesson_type = (v_condition->>'lesson_type')::lesson_type;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'quiz_passed' then
      select count(*) into v_stat
      from public.quiz_attempts
      where user_id = p_user_id and passed = true;
      v_met := v_stat >= coalesce((v_condition->>'count')::integer, 1);

    elsif v_type = 'total_xp' then
      select total_xp into v_stat from public.profiles where id = p_user_id;
      v_met := v_stat >= coalesce((v_condition->>'amount')::integer, 0);
    end if;

    if v_met then
      insert into public.user_rewards (user_id, reward_id)
      values (p_user_id, r.id)
      on conflict (user_id, reward_id) do nothing;

      if r.xp_bonus > 0 then
        perform public.award_xp(p_user_id, 'REWARD', r.id, r.xp_bonus, 'Reward: ' || r.title);
      end if;
    end if;
  end loop;
end;
$$;
