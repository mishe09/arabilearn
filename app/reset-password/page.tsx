"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, KeyRound, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [checkingSession, setCheckingSession] = useState(true);
  const [hasSession, setHasSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setHasSession(Boolean(session));
      setCheckingSession(false);
    };

    void checkSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasSession(Boolean(session));
      setCheckingSession(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (password.length < 8) {
      toast.error("Use at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) throw error;

      toast.success("Password updated successfully.");
      router.replace("/dashboard/profile");
      router.refresh();
    } catch (error) {
      console.error("Password update failed:", error);
      toast.error("Could not update your password.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-950 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/10 p-7 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/15">
          <ShieldCheck className="h-6 w-6 text-amber-400" />
        </div>

        <h1 className="text-2xl font-bold text-white">
          Set a new password
        </h1>

        <p className="mt-2 text-sm leading-6 text-white/55">
          Choose a new password for your HausaArabia account.
        </p>

        {checkingSession ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-7 w-7 animate-spin text-amber-400" />
          </div>
        ) : !hasSession ? (
          <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100/80">
            Open this page from the secure password-reset link sent to your email.
            If the link expired, return to your profile and request a new one.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-amber-100">
                New password
              </label>

              <div className="relative">
                <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-white/15 bg-white/10 py-3 pl-10 pr-11 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-amber-400/50"
                  placeholder="At least 8 characters"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-amber-100">
                Confirm password
              </label>

              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                className="w-full rounded-lg border border-white/15 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-amber-400/50"
                placeholder="Repeat your new password"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-3 font-semibold text-emerald-950 transition hover:bg-amber-400 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Update password
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
