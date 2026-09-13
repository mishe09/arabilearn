-- =====================================================================
-- 024_paystack_subscriptions.sql
--
-- HausaArabia Paystack subscription backend
--
-- Current Premium pricing:
--   Monthly: ₦3,000  = 300,000 kobo
--   Yearly:  ₦30,000 = 3,000,000 kobo
--
-- Paystack uses kobo, so:
--   ₦1 = 100 kobo
--
-- Subscription state is server-authoritative.
--
-- Browser clients:
--   - may READ their own subscription/payment records
--   - may NOT activate, update, or delete subscriptions
--
-- Trusted Next.js server routes use the Supabase service-role key
-- after verifying payments directly with Paystack.
-- =====================================================================


-- ---------------------------------------------------------------------
-- USER SUBSCRIPTIONS
-- ---------------------------------------------------------------------

create table if not exists public.user_subscriptions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  provider text not null default 'paystack'
    check (provider in ('paystack')),

  plan_key text not null
    check (plan_key in ('monthly', 'yearly')),

  status text not null default 'pending'
    check (
      status in (
        'pending',
        'active',
        'non_renewing',
        'past_due',
        'cancelled',
        'failed'
      )
    ),

  -- Paystack identifiers
  paystack_plan_code text,
  paystack_customer_code text,
  paystack_subscription_code text,
  paystack_email_token text,

  -- Most recent Paystack transaction reference
  latest_reference text,

  -- Paystack stores amounts in kobo.
  --
  -- Monthly:
  --   ₦3,000 × 100 = 300,000 kobo
  --
  -- Yearly:
  --   ₦30,000 × 100 = 3,000,000 kobo
  amount_kobo integer,

  currency text not null default 'NGN',

  started_at timestamptz,
  current_period_end timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- One current subscription record per learner.
  unique (user_id),

  -- A Paystack transaction reference must never belong to
  -- multiple subscription records.
  unique (latest_reference),

  -- Amount may be null while a subscription has never completed payment.
  constraint user_subscriptions_amount_positive
    check (
      amount_kobo is null
      or amount_kobo > 0
    ),

  -- Current HausaArabia Premium pricing.
  constraint user_subscriptions_plan_amount_matches
    check (
      amount_kobo is null
      or (
        plan_key = 'monthly'
        and amount_kobo = 300000
      )
      or (
        plan_key = 'yearly'
        and amount_kobo = 3000000
      )
    )
);


-- ---------------------------------------------------------------------
-- VERIFIED SUBSCRIPTION PAYMENTS
-- ---------------------------------------------------------------------

create table if not exists public.subscription_payments (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  subscription_id uuid
    references public.user_subscriptions(id)
    on delete set null,

  provider text not null default 'paystack'
    check (provider in ('paystack')),

  -- Paystack transaction reference.
  -- This makes payment processing idempotent.
  provider_reference text not null unique,

  paystack_transaction_id numeric(20, 0),

  plan_key text not null
    check (plan_key in ('monthly', 'yearly')),

  -- Verified amount returned by Paystack, in kobo.
  amount_kobo integer not null,

  currency text not null default 'NGN',

  status text not null
    check (
      status in (
        'success',
        'failed',
        'reversed'
      )
    ),

  paid_at timestamptz,

  created_at timestamptz not null default now(),

  constraint subscription_payments_amount_positive
    check (amount_kobo > 0),

  -- Protect against storing the wrong amount for a plan.
  constraint subscription_payments_plan_amount_matches
    check (
      (
        plan_key = 'monthly'
        and amount_kobo = 300000
      )
      or
      (
        plan_key = 'yearly'
        and amount_kobo = 3000000
      )
    )
);


-- ---------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------

create index if not exists idx_user_subscriptions_user
  on public.user_subscriptions(user_id);

create index if not exists idx_user_subscriptions_status
  on public.user_subscriptions(status);

create index if not exists idx_user_subscriptions_customer
  on public.user_subscriptions(paystack_customer_code);

create index if not exists idx_user_subscriptions_code
  on public.user_subscriptions(paystack_subscription_code);

create index if not exists idx_subscription_payments_user
  on public.subscription_payments(user_id);

create index if not exists idx_subscription_payments_subscription
  on public.subscription_payments(subscription_id);

create index if not exists idx_subscription_payments_reference
  on public.subscription_payments(provider_reference);


-- ---------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------

alter table public.user_subscriptions
  enable row level security;

alter table public.subscription_payments
  enable row level security;


-- ---------------------------------------------------------------------
-- USER SUBSCRIPTIONS POLICIES
--
-- Authenticated users can only READ their own subscription.
-- No browser INSERT / UPDATE / DELETE policy is intentionally created.
-- ---------------------------------------------------------------------

drop policy if exists "user_subscriptions_select_own"
  on public.user_subscriptions;

create policy "user_subscriptions_select_own"
on public.user_subscriptions
for select
to authenticated
using (
  auth.uid() = user_id
);


-- ---------------------------------------------------------------------
-- SUBSCRIPTION PAYMENT POLICIES
--
-- Authenticated users can only READ their own payment history.
-- Writes are server-only.
-- ---------------------------------------------------------------------

drop policy if exists "subscription_payments_select_own"
  on public.subscription_payments;

create policy "subscription_payments_select_own"
on public.subscription_payments
for select
to authenticated
using (
  auth.uid() = user_id
);


-- ---------------------------------------------------------------------
-- TABLE DOCUMENTATION
-- ---------------------------------------------------------------------

comment on table public.user_subscriptions is
  'Authoritative HausaArabia Premium subscription state. Updated only by trusted server-side Paystack verification.';

comment on table public.subscription_payments is
  'Verified Paystack subscription payments. provider_reference is unique so the same transaction cannot be processed twice.';

comment on column public.user_subscriptions.amount_kobo is
  'Current plan charge in kobo. Monthly = 300000 (₦3,000), Yearly = 3000000 (₦30,000).';

comment on column public.subscription_payments.amount_kobo is
  'Verified Paystack payment amount in kobo. Monthly = 300000, Yearly = 3000000.';