import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { CheckoutAuthPanel } from "@/components/checkout/CheckoutAuthPanel";
import { getSession } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Checkout — ProxiesSeller",
  description: "Secure checkout for ProxiesSeller. Start using proxies instantly.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getPlan(planId: string) {
  const base = process.env.API_BASE || "http://localhost:8081/api";
  const r = await fetch(`${base}/packages`, { cache: "no-store" });
  if (!r.ok) return null;

  const pkgs: any[] = await r.json();
  const p = pkgs.find((x) => String(x.id) === String(planId));
  if (!p) return null;

  const price = Number(p.price_cents) / 100;

  return {
    id: p.id,
    name: p.name,
    price,
    period: "month",
    highlights: [
      { k: "SOCKS5", v: "Protocol" },
      { k: "30 days", v: "Duration" },
      { k: "Instant", v: "Setup" },
      { k: `$${price.toFixed(2)}`, v: "Price" },
    ],
    bulletsLeft: ["Instant activation", "Username/password auth", "24/7 Support", "High uptime"],
    bulletsRight: ["Dashboard control", "Usage tracking", "Low block rate", "Multiple locations"],
    trial: "Trial available soon",
  };
}

function CheckoutPaymentPanel({ email, planId }: { email: string; planId: string }) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <div className="text-sm font-extrabold text-slate-500">Checkout</div>
      <h2 className="mt-1 text-2xl font-extrabold text-slate-900">Continue to payment</h2>

      <p className="mt-2 text-sm font-semibold text-slate-600">
        You are signed in as{" "}
        <span className="font-extrabold text-slate-900">{email || "your account"}</span>.
      </p>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          After payment you get
        </div>
        <div className="mt-2 text-sm font-semibold text-slate-700">
          Endpoints • Credentials • Ports • Usage tracking • Dashboard control
        </div>
      </div>

      <form action="/api/checkout/start" method="POST" className="mt-6">
        <input type="hidden" name="plan" value={planId} />
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white hover:bg-indigo-500"
        >
          Pay & Activate
        </button>
      </form>

      <div className="mt-4 text-center text-xs font-semibold text-slate-500">
        Want another plan?{" "}
        <Link className="font-extrabold text-indigo-600 hover:text-indigo-500" href="/pricing">
          Back to pricing
        </Link>
      </div>
    </section>
  );
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { plan?: string; mode?: "login" | "register" };
}) {
  const planId = searchParams.plan ? String(searchParams.plan) : "";
  const mode = searchParams.mode === "login" ? "login" : "register";

  const plan = planId ? await getPlan(planId) : null;

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          <h1 className="text-2xl font-extrabold text-slate-900">Plan not found</h1>
          <p className="mt-3 text-slate-600">
            Invalid plan id: <b>{planId || "(empty)"}</b>
          </p>
          <Link
            href="/pricing"
            className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
          >
            Back to pricing
          </Link>
        </div>
      </div>
    );
  }

  // ✅ session decides right panel (server-side)
  const session = await getSession();

  // ✅ supports both shapes: { email } OR { user: { email } }
  const email = (session as any)?.email || (session as any)?.user?.email || "";

  // ✅ cookie fallback for cases where getSession() returns null but cookie exists
  const jar = cookies();
  const all = jar.getAll();
  const hasAuthCookie = all.some((c) => {
    const n = c.name.toLowerCase();
    return n.includes("session") || n.includes("auth") || n.includes("token") || n.includes("jwt");
  });

  const isAuthed = Boolean(session) || hasAuthCookie;

  // ✅ next URL keeps same plan
  const nextUrl = `/checkout?plan=${encodeURIComponent(String(plan.id))}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* LEFT: PLAN */}
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-start justify-between gap-6">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">{plan.name}</h1>
              <div className="text-right">
                <div className="text-4xl font-extrabold text-slate-900">
                  ${Number(plan.price).toFixed(2)}
                </div>
                <div className="text-sm font-semibold text-slate-500">/{plan.period}</div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {plan.highlights.map((h: any) => (
                <div key={h.v} className="rounded-2xl border border-slate-200 bg-white p-4">
                  <div className="text-lg font-extrabold text-slate-900">{h.k}</div>
                  <div className="text-sm text-slate-500">{h.v}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              <ul className="space-y-4 text-sm text-slate-700">
                {plan.bulletsLeft.map((t: string) => (
                  <li key={t} className="flex gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <ul className="space-y-4 text-sm text-slate-700">
                {plan.bulletsRight.map((t: string) => (
                  <li key={t} className="flex gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      ✓
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-sm font-semibold text-slate-700">{plan.trial}</div>
              <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-extrabold text-indigo-700">
                Limited
              </span>
            </div>

            {!isAuthed ? (
              <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
                Please login or create an account to continue checkout.
              </div>
            ) : null}
          </section>

          {/* RIGHT: AUTH or PAYMENT */}
          {isAuthed ? (
            <CheckoutPaymentPanel email={email} planId={String(plan.id)} />
          ) : (
            <CheckoutAuthPanel planId={String(plan.id)} initialMode={mode} next={nextUrl} />
          )}
        </div>
      </main>
    </div>
  );
}
