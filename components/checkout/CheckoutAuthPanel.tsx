"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Lock, Mail } from "lucide-react";

type Mode = "login" | "register";

export function CheckoutAuthPanel(props: {
  planId: string;
  initialMode?: Mode;
  next?: string;
}) {
  const searchParams = useSearchParams();

  const initialMode: Mode = (props.initialMode ?? "register") as Mode;
  const [mode, setMode] = useState<Mode>(initialMode);

  const error = searchParams.get("error") || "";
  const emailFromUrl = searchParams.get("email") || "";

  // ✅ where we should land after auth
  const nextUrl = useMemo(() => {
    const n = (props.next || "").trim();
    if (n.startsWith("/")) return n;
    return `/checkout?plan=${encodeURIComponent(props.planId)}`;
  }, [props.next, props.planId]);

  const actionUrl = useMemo(() => {
    const base =
      mode === "register"
        ? "/api/auth/register-and-checkout"
        : "/api/auth/login-and-checkout";

    // ✅ keep planId + next for server redirect
    return `${base}?plan=${encodeURIComponent(props.planId)}&next=${encodeURIComponent(nextUrl)}`;
  }, [mode, props.planId, nextUrl]);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-slate-500">Checkout</div>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
            {mode === "register" ? "Create account" : "Login"}
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Continue to payment after authentication.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-1">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-extrabold transition",
              mode === "login"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            Login
          </button>
          <button
            type="button"
            onClick={() => setMode("register")}
            className={[
              "rounded-xl px-4 py-2 text-sm font-extrabold transition",
              mode === "register"
                ? "bg-indigo-600 text-white shadow-sm"
                : "text-slate-700 hover:bg-white",
            ].join(" ")}
          >
            Register
          </button>
        </div>
      </div>

      {/* ERROR BOX */}
      {error ? (
        <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
              <AlertTriangle className="h-4 w-4" />
            </span>
            <div>
              <div className="text-sm font-extrabold text-rose-800">
                Something went wrong
              </div>
              <div className="mt-1 text-sm font-semibold text-rose-700">
                {decodeURIComponent(error)}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <form className="mt-6 space-y-4" action={actionUrl} method="POST">
        <input type="hidden" name="planId" value={props.planId} />
        <input type="hidden" name="mode" value={mode} />

        {/* ✅ CRITICAL: server uses this to redirect back to checkout */}
        <input type="hidden" name="next" value={nextUrl} />

        <div>
          <label className="text-xs font-extrabold text-slate-700">Email</label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <Mail className="h-4 w-4 text-slate-400" />
            <input
              name="email"
              type="email"
              required
              defaultValue={emailFromUrl}
              placeholder="you@company.com"
              className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-extrabold text-slate-700">
            Password
          </label>
          <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
            <Lock className="h-4 w-4 text-slate-400" />
            <input
              name="password"
              type="password"
              required
              minLength={8}
              placeholder="Minimum 8 characters"
              className="w-full text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {mode === "register" ? (
          <label className="flex gap-3 text-sm font-semibold text-slate-600">
            <input
              type="checkbox"
              name="agree"
              value="1"
              required
              className="mt-1 h-4 w-4"
            />
            <span>
              I agree to{" "}
              <Link className="underline" href="/privacy">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link className="underline" href="/terms">
                Terms
              </Link>
              .
            </span>
          </label>
        ) : null}

        <button
          type="submit"
          className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-500"
        >
          {mode === "register" ? "Register & Continue" : "Login & Continue"}
        </button>

        <div className="pt-2 text-center text-xs font-semibold text-slate-500">
          Having trouble?{" "}
          <Link className="underline" href="/contact">
            Contact support
          </Link>
        </div>
      </form>
    </section>
  );
}
