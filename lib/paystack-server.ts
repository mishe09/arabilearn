import { createClient } from "@supabase/supabase-js";

export type PlanKey = "monthly" | "yearly";

export type PaystackPlanConfig = {
  key: PlanKey;
  label: string;
  amountKobo: number;
  currency: "NGN";
  planCode: string;
};

export function getPaystackSecretKey(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;

  if (!key) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }

  return key;
}

export function getPlanConfig(plan: PlanKey): PaystackPlanConfig {
  const monthlyCode = process.env.PAYSTACK_MONTHLY_PLAN_CODE;
  const yearlyCode = process.env.PAYSTACK_YEARLY_PLAN_CODE;

  if (!monthlyCode || !yearlyCode) {
    throw new Error("Paystack plan codes are not configured.");
  }

  if (plan === "monthly") {
    return {
      key: "monthly",
      label: "Monthly",
      amountKobo: 300_000,
      currency: "NGN",
      planCode: monthlyCode,
    };
  }

  return {
    key: "yearly",
    label: "Yearly",
    amountKobo: 3_000_000,
    currency: "NGN",
    planCode: yearlyCode,
  };
}

export function isPlanKey(value: unknown): value is PlanKey {
  return value === "monthly" || value === "yearly";
}

export function createSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server credentials are not configured.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function paystackRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(`https://api.paystack.co${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${getPaystackSecretKey()}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json?.status) {
    const message =
      json?.message ||
      `Paystack request failed with status ${response.status}.`;

    throw new Error(message);
  }

  return json as T;
}
