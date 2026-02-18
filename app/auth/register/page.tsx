import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Create account — ProxiesSeller",
  description:
    "Create your ProxiesSeller account to buy proxies, manage subscriptions, endpoints, authorization, and usage statistics.",
};

function safeNext(next?: string) {
  const n = (next || "").trim();
  return n.startsWith("/") ? n : "/dashboard";
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams?: { next?: string; error?: string };
}) {
  const c = cookies();
  const isLoggedIn = Boolean(c.get("ps_session")?.value);
  if (isLoggedIn) redirect("/dashboard");

  const next = safeNext(searchParams?.next ? String(searchParams.next) : "/dashboard");
  const error = searchParams?.error ? String(searchParams.error) : "";

  const errorText =
    error === "missing_fields"
      ? "Please fill all required fields."
      : error === "weak_password"
      ? "Password must be at least 8 characters."
      : error === "password_mismatch"
      ? "Passwords do not match."
      : error === "email_exists"
      ? "This email is already registered."
      : error
      ? "Registration failed. Please try again."
      : "";

  return (
    <AuthShell
      page="Register"
      rightTopLabel="/auth/register"
      badge="Create your account"
      title={
        <>
          Create your{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            ProxiesSeller
          </span>{" "}
          account
        </>
      }
      subtitle="Get access to the dashboard, buy proxy plans, copy endpoints, and manage authorization in minutes."
      stats={[
        { k: "Fast", v: "Signup", d: "Under 60 seconds" },
        { k: "Secure", v: "Session", d: "HttpOnly cookie" },
        { k: "Instant", v: "Setup", d: "Use proxies right away" },
        { k: "24/7", v: "Support", d: "We’ve got you" },
      ]}
    >
      {errorText ? (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-100">
          {errorText}
        </div>
      ) : null}

      <form className="space-y-4" action="/api/auth/register" method="POST">
        <input type="hidden" name="next" value={next} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="text-sm font-extrabold text-slate-100">First name</label>
            <input
              name="first_name"
              type="text"
              placeholder="John"
              className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>

          <div>
            <label className="text-sm font-extrabold text-slate-100">Last name</label>
            <input
              name="last_name"
              type="text"
              placeholder="Doe"
              className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
            />
          </div>
        </div>

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
          <label className="text-sm font-extrabold text-slate-100">Password</label>
          <input
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>

        <div>
          <label className="text-sm font-extrabold text-slate-100">Confirm password</label>
          <input
            name="confirm_password"
            type="password"
            autoComplete="new-password"
            placeholder="Repeat password"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        >
          Create account <span className="ml-2 text-white/80">→</span>
        </button>

        <div className="pt-2 text-center text-sm text-slate-200/80">
          Already have an account?{" "}
          <Link
            href={`/auth/login?next=${encodeURIComponent(next)}`}
            className="font-extrabold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
          >
            Login
          </Link>
        </div>
      </form>

      <p className="mt-6 text-xs font-semibold text-slate-300">
        By creating an account, you agree to our{" "}
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
