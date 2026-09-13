import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

import {
  createSupabaseAdmin,
  getPlanConfig,
  isPlanKey,
  paystackRequest,
} from "@/lib/paystack-server";

type InitializeResponse = {
  status: true;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
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

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const planKey = body?.plan;

    if (!isPlanKey(planKey)) {
      return NextResponse.json(
        { message: "Choose a valid subscription plan." },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const supabase = createAuthenticatedSupabase(cookieStore);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user?.email) {
      return NextResponse.json(
        { message: "Please sign in before subscribing." },
        { status: 401 },
      );
    }

    const admin = createSupabaseAdmin();

    const { data: existing } = await admin
      .from("user_subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();

    if (existing?.status === "active") {
      return NextResponse.json(
        { message: "Your Premium subscription is already active." },
        { status: 409 },
      );
    }

    const plan = getPlanConfig(planKey);

    const requestUrl = new URL(request.url);
    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
      requestUrl.origin;

    const callbackUrl = `${siteUrl}/api/paystack/callback`;

    const initialized = await paystackRequest<InitializeResponse>(
      "/transaction/initialize",
      {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
          amount: String(plan.amountKobo),
          currency: plan.currency,
          plan: plan.planCode,
          callback_url: callbackUrl,
          metadata: JSON.stringify({
            hausa_arabia_user_id: user.id,
            hausa_arabia_plan: plan.key,
          }),
        }),
      },
    );

    const { error: pendingError } = await admin
      .from("user_subscriptions")
      .upsert(
        {
          user_id: user.id,
          provider: "paystack",
          plan_key: plan.key,
          status: "pending",
          paystack_plan_code: plan.planCode,
          latest_reference: initialized.data.reference,
          amount_kobo: plan.amountKobo,
          currency: plan.currency,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

    if (pendingError) {
      console.error("Could not save pending subscription:", pendingError);
      return NextResponse.json(
        { message: "Could not prepare your subscription." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      authorizationUrl: initialized.data.authorization_url,
    });
  } catch (error) {
    console.error("Paystack initialize error:", error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Could not start Paystack checkout.",
      },
      { status: 500 },
    );
  }
}
