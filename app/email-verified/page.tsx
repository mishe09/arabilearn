"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  CircleAlert,
  MailCheck,
  ArrowRight,
} from "lucide-react";

type VerificationState = "checking" | "success" | "error";

export default function EmailVerifiedPage() {
  const [state, setState] = useState<VerificationState>("checking");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const error =
      params.get("error_description") ||
      params.get("error") ||
      params.get("message");

    if (error) {
      setErrorMessage(error.replace(/\+/g, " "));
      setState("error");
      return;
    }

    /*
     * Supabase completes the email-confirmation step before redirecting
     * the browser to this page. We do not create or trust a client-side
     * "verified" flag here; sign-in remains the authoritative check.
     */
    setState("success");
  }, []);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#064E3B] px-4 py-12">
      {/* Green + gold HausaArabia background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.13) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.13) 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px",
        }}
      />

      <div className="pointer-events-none absolute left-[-8rem] top-[-8rem] h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10rem] right-[-8rem] h-96 w-96 rounded-full bg-emerald-300/10 blur-3xl" />

      <section className="relative z-10 w-full max-w-md overflow-hidden rounded-[28px] border border-white/15 bg-white/[0.09] p-7 text-center shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-9">
        {state === "checking" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-amber-300/30 bg-amber-400/10">
              <MailCheck className="h-8 w-8 animate-pulse text-amber-300" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-white">
              Checking verification
            </h1>

            <p className="mt-3 text-sm leading-6 text-emerald-50/65">
              Finishing your HausaArabia email confirmation.
            </p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-emerald-300/35 bg-emerald-400/15">
              <CheckCircle2 className="h-9 w-9 text-emerald-300" />
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              HausaArabia
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
              Email verified
            </h1>

            <p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-emerald-50/70">
              Your email address has been confirmed successfully. Your account
              is ready.
            </p>

            <p className="mt-3 text-sm font-medium text-amber-200">
              Please sign in to continue learning.
            </p>

            <Link
              href="/#sign-in"
              className="group mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 px-5 py-3.5 font-semibold text-emerald-950 transition hover:bg-amber-300"
            >
              Go to login
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-red-300/30 bg-red-400/10">
              <CircleAlert className="h-9 w-9 text-red-300" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-white">
              Verification link could not be completed
            </h1>

            <p className="mt-3 text-sm leading-6 text-emerald-50/65">
              The confirmation link may have expired, already been used, or be
              invalid.
            </p>

            {errorMessage && (
              <p className="mt-4 rounded-xl border border-red-300/15 bg-red-500/10 px-4 py-3 text-xs leading-5 text-red-100/75">
                {errorMessage}
              </p>
            )}

            <Link
              href="/register"
              className="mt-7 flex w-full items-center justify-center rounded-xl border border-amber-300/30 bg-amber-400/10 px-5 py-3.5 font-semibold text-amber-200 transition hover:bg-amber-400/15"
            >
              Return to registration
            </Link>

            <Link
              href="/#sign-in"
              className="mt-3 inline-flex text-sm font-medium text-emerald-200/70 transition hover:text-white"
            >
              Already verified? Go to login
            </Link>
          </>
        )}
      </section>
    </main>
  );
}
