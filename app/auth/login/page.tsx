// app/auth/login/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Login — ProxiesSeller",
  description:
    "Login to your ProxiesSeller account to manage proxy subscriptions, endpoints, authorization and usage statistics.",
};

function safeNext(next?: string) {
  const n = (next || "").trim();
  return n.startsWith("/") ? n : "/dashboard";
}

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string; error?: string };
}) {
  // ✅ If already logged in -> go dashboard
  const c = cookies();
  const isLoggedIn = Boolean(c.get("ps_session")?.value);
  if (isLoggedIn) redirect("/dashboard");

  const next = safeNext(searchParams?.next ? String(searchParams.next) : "/dashboard");
  const error = searchParams?.error ? String(searchParams.error) : "";

  const errorText =
    error === "missing_fields"
      ? "Please enter your email and password."
      : error
      ? "Login failed. Please try again."
      : "";

  return (
    <AuthShell
      page="Login"
      rightTopLabel="/auth/login"
      badge="Secure access to your dashboard"
      title={
        <>
          Sign in to manage{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Proxies
          </span>
        </>
      }
      subtitle="View active plans, copy endpoints, monitor usage, and manage authorization settings — all in one place."
      stats={[
        { k: "1 min", v: "Access", d: "Open dashboard fast" },
        { k: "24/7", v: "Support", d: "Help when needed" },
        { k: "Secure", v: "Session", d: "Protected login" },
        { k: "Live", v: "Usage", d: "Stats & tracking" },
      ]}
    >
      {errorText ? (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100">
          {errorText}
        </div>
      ) : null}

      <form className="space-y-4" action="/api/auth/login" method="POST">
        <input type="hidden" name="next" value={next} />

        <div>
          <label className="text-sm font-extrabold text-slate-100">Email</label>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>

        <div>
          <div className="flex items-center justify-between gap-3">
            <label className="text-sm font-extrabold text-slate-100">Password</label>
            <Link
              href="/auth/forgot-password"
              className="text-xs font-extrabold text-slate-200/80 underline decoration-white/20 underline-offset-4 hover:text-white hover:decoration-white/40"
            >
              Forgot?
            </Link>
          </div>
          <input
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="inline-flex items-center gap-2 text-sm text-slate-200/80">
            <input
              type="checkbox"
              name="remember"
              value="1"
              className="h-4 w-4 rounded border-white/20 bg-slate-950/40"
            />
            Remember me
          </label>
          <span className="text-xs text-slate-300/70">Private devices only</span>
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Login <span className="ml-2 text-white/80">→</span>
        </button>

        <div className="pt-2 text-center text-sm text-slate-200/80">
          No account?{" "}
          <Link
            href={`/auth/register?next=${encodeURIComponent(next)}`}
            className="font-extrabold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
          >
            Register
          </Link>
        </div>
      </form>

      <p className="mt-6 text-xs font-semibold text-slate-300">
        By logging in, you agree to our{" "}
        <Link
          href="/terms"
          className="font-extrabold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
        >
          Terms
        </Link>{" "}
        and{" "}
        <Link
          href="/privacy"
          className="font-extrabold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </AuthShell>
  );
}
