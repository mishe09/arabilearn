import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import {
  createSupabaseAdmin,
  getPlanConfig,
  isPlanKey,
  paystackRequest,
} from "@/lib/paystack-server";

type VerifyResponse = {
  status: true;
  message: string;
  data: {
    id: number | string;
    domain?: string;
    status: string;
    reference: string;
    amount: number;
    currency: string;
    paid_at?: string | null;
    metadata?: unknown;
    plan?: string | { plan_code?: string } | null;
    customer?: {
      customer_code?: string;
      email?: string;
    } | null;
  };
};

function createAuthenticatedSupabase(cookieStore: Awaited<ReturnType<typeof cookies>>) {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    },
  );
}

function parseMetadata(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      return {};
    }
  }

  return {};
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const reference = requestUrl.searchParams.get("reference");
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    requestUrl.origin;

  const failure = (reason: string) =>
    NextResponse.redirect(
      `${origin}/dashboard/subscription?payment=failed&reason=${encodeURIComponent(reason)}`,
    );

  if (!reference) {
    return failure("missing_reference");
  }

  try {
    const cookieStore = await cookies();
    const supabase = createAuthenticatedSupabase(cookieStore);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.redirect(
        `${origin}/login?next=${encodeURIComponent(`/api/paystack/callback?reference=${reference}`)}`,
      );
    }

    const verified = await paystackRequest<VerifyResponse>(
      `/transaction/verify/${encodeURIComponent(reference)}`,
      { method: "GET" },
    );

    const tx = verified.data;

    if (tx.status !== "success") {
      return failure("transaction_not_successful");
    }

    const metadata = parseMetadata(tx.metadata);
    const metadataUserId = metadata.hausa_arabia_user_id;
    const metadataPlan = metadata.hausa_arabia_plan;

    if (metadataUserId !== user.id || !isPlanKey(metadataPlan)) {
      return failure("payment_identity_mismatch");
    }

    const plan = getPlanConfig(metadataPlan);

    if (tx.amount !== plan.amountKobo || tx.currency !== plan.currency) {
      return failure("payment_amount_mismatch");
    }

    const customerEmail = tx.customer?.email?.trim().toLowerCase();

    if (
      customerEmail &&
      customerEmail !== user.email.trim().toLowerCase()
    ) {
      return failure("payment_email_mismatch");
    }

    const returnedPlanCode =
      typeof tx.plan === "string"
        ? tx.plan
        : tx.plan?.plan_code;

    if (returnedPlanCode && returnedPlanCode !== plan.planCode) {
      return failure("payment_plan_mismatch");
    }

    const admin = createSupabaseAdmin();
    const now = new Date().toISOString();

    const { data: subscription, error: subscriptionError } = await admin
      .from("user_subscriptions")
      .upsert(
        {
          user_id: user.id,
          provider: "paystack",
          plan_key: plan.key,
          status: "active",
          paystack_plan_code: plan.planCode,
          paystack_customer_code: tx.customer?.customer_code ?? null,
          latest_reference: tx.reference,
          amount_kobo: tx.amount,
          currency: tx.currency,
          started_at: tx.paid_at ?? now,
          updated_at: now,
        },
        { onConflict: "user_id" },
      )
      .select("id")
      .single();

    if (subscriptionError || !subscription) {
      console.error("Subscription activation failed:", subscriptionError);
      return failure("subscription_update_failed");
    }

    const { error: paymentError } = await admin
      .from("subscription_payments")
      .upsert(
        {
          user_id: user.id,
          subscription_id: subscription.id,
          provider: "paystack",
          provider_reference: tx.reference,
          paystack_transaction_id: String(tx.id),
          plan_key: plan.key,
          amount_kobo: tx.amount,
          currency: tx.currency,
          status: "success",
          paid_at: tx.paid_at ?? now,
        },
        { onConflict: "provider_reference" },
      );

    if (paymentError) {
      console.error("Verified payment record failed:", paymentError);
      // The subscription is already verified and active. Do not revoke access
      // solely because the secondary audit row failed to insert.
    }

    return NextResponse.redirect(
      `${origin}/dashboard?subscription=success`,
    );
  } catch (error) {
    console.error("Paystack callback error:", error);
    return failure("verification_error");
  }
}
