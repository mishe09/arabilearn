import crypto from "crypto";
import { NextResponse } from "next/server";

import {
  createSupabaseAdmin,
  getPaystackSecretKey,
} from "@/lib/paystack-server";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as JsonRecord)
    : {};
}

function text(record: JsonRecord, key: string): string {
  return typeof record[key] === "string" ? (record[key] as string) : "";
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-paystack-signature") ?? "";

  const expected = crypto
    .createHmac("sha512", getPaystackSecretKey())
    .update(rawBody)
    .digest("hex");

  const valid =
    signature.length === expected.length &&
    crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expected),
    );

  if (!valid) {
    return NextResponse.json(
      { message: "Invalid signature." },
      { status: 401 },
    );
  }

  const event = JSON.parse(rawBody) as JsonRecord;
  const eventName = text(event, "event");
  const data = asRecord(event.data);
  const customer = asRecord(data.customer);
  const subscription = asRecord(data.subscription);

  const customerCode =
    text(customer, "customer_code") ||
    text(data, "customer_code");

  const subscriptionCode =
    text(data, "subscription_code") ||
    text(subscription, "subscription_code");

  const emailToken =
    text(data, "email_token") ||
    text(subscription, "email_token");

  const admin = createSupabaseAdmin();
  const now = new Date().toISOString();

  try {
    if (eventName === "subscription.create" && customerCode) {
      await admin
        .from("user_subscriptions")
        .update({
          status: "active",
          paystack_subscription_code: subscriptionCode || null,
          paystack_email_token: emailToken || null,
          updated_at: now,
        })
        .eq("paystack_customer_code", customerCode);
    }

    if (
      (eventName === "subscription.disable" ||
        eventName === "subscription.not_renew") &&
      (subscriptionCode || customerCode)
    ) {
      let query = admin
        .from("user_subscriptions")
        .update({
          status:
            eventName === "subscription.not_renew"
              ? "non_renewing"
              : "cancelled",
          updated_at: now,
        });

      query = subscriptionCode
        ? query.eq("paystack_subscription_code", subscriptionCode)
        : query.eq("paystack_customer_code", customerCode);

      await query;
    }

    if (
      eventName === "invoice.payment_failed" &&
      (subscriptionCode || customerCode)
    ) {
      let query = admin
        .from("user_subscriptions")
        .update({
          status: "past_due",
          updated_at: now,
        });

      query = subscriptionCode
        ? query.eq("paystack_subscription_code", subscriptionCode)
        : query.eq("paystack_customer_code", customerCode);

      await query;
    }

    if (eventName === "charge.success" && customerCode) {
      await admin
        .from("user_subscriptions")
        .update({
          status: "active",
          updated_at: now,
        })
        .eq("paystack_customer_code", customerCode);
    }
  } catch (error) {
    console.error("Paystack webhook processing error:", error);
    // Paystack recommends acknowledging quickly. Returning 200 avoids
    // retries for an event whose signature was valid but whose local
    // bookkeeping needs investigation.
  }

  return NextResponse.json({ received: true });
}
