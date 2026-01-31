// app/auth/register/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthShell } from "@/components/auth/AuthShell";

export const metadata: Metadata = {
  title: "Register — ProxiesSeller",
  description:
    "Create a ProxiesSeller account to buy residential, mobile, datacenter and fast proxies, manage subscriptions and track usage.",
};

function safeNext(next?: string) {
  const n = (next || "").trim();
  return n.startsWith("/") ? n : "/dashboard";
}

export default function RegisterPage({
  searchParams,
}: {
  searchParams?: { next?: string };
}) {
  // ✅ If already logged in -> go dashboard
  const c = cookies();
  const isLoggedIn = Boolean(c.get("ps_session")?.value);
  if (isLoggedIn) redirect("/dashboard");

  const next = safeNext(searchParams?.next ? String(searchParams.next) : "/dashboard");

  return (
    <AuthShell
      page="Register"
      rightTopLabel="/auth/register"
      badge="Create your ProxiesSeller account"
      title={
        <>
          Start using{" "}
          <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
            Proxies
          </span>{" "}
          today
        </>
      }
      subtitle="Register to access the dashboard, manage authentication, and keep your plans organized in one place."
      stats={[
        { k: "Fast", v: "Setup", d: "Get started quickly" },
        { k: "Clean", v: "Dashboard", d: "Everything in one place" },
        { k: "Secure", v: "Access", d: "Account protection" },
        { k: "Live", v: "Stats", d: "Usage visibility" },
      ]}
    >
      <form className="space-y-4" action="/pages/register_process.php" method="POST">
        {/* Optional: pass next to your PHP if you want */}
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
          <label className="text-sm font-extrabold text-slate-100">Password</label>
          <input
            name="password"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Create a strong password"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
          />
          <p className="mt-2 text-xs text-slate-300/70">Use at least 8 characters.</p>
        </div>

        <div>
          <label className="text-sm font-extrabold text-slate-100">Confirm password</label>
          <input
            name="password2"
            type="password"
            required
            autoComplete="new-password"
            placeholder="Repeat password"
            className="mt-2 w-full rounded-2xl border border-white/12 bg-slate-950/40 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/30"
          />
        </div>

        <label className="flex gap-2 text-sm text-slate-200/80">
          <input
            type="checkbox"
            name="agree"
            value="1"
            required
            className="mt-1 h-4 w-4 rounded border-white/20 bg-slate-950/40"
          />
          <span>
            I agree to the{" "}
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
          </span>
        </label>

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
        Works with scrapers, browsers, bots, SEO tools, and APIs.
      </p>
    </AuthShell>
  );
}
