import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { CheckoutAuthPanel } from "@/components/checkout/CheckoutAuthPanel";
import { getSession } from "@/lib/auth";
import { getBackendBase } from "@/lib/env";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Checkout — ProxiesSeller",
  description: "Secure checkout for ProxiesSeller. Start using proxies instantly.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

async function getPlan(planId: string) {
  const base = getBackendBase();
  const r = await fetch(`${base}/packages`, { cache: "no-store" });
  if (!r.ok) return null;
  const pkgs: any[] = await r.json();
  const p = pkgs.find((x) => String(x.id) === String(planId));
  if (!p) return null;
  const price = Number(p.price_cents) / 100;
  return {
    id: p.id, name: p.name, price, period: "month",
    highlights: [
      { k: "SOCKS5", v: "Protocol" }, { k: "30 days", v: "Duration" },
      { k: "Instant", v: "Setup" },   { k: `$${price.toFixed(2)}`, v: "Price" },
    ],
    bulletsLeft:  ["Instant activation", "Username/password auth", "24/7 Support", "High uptime"],
    bulletsRight: ["Dashboard control", "Usage tracking", "Low block rate", "Multiple locations"],
    trial: "Trial available soon",
  };
}

function getCustomPlan(params: any) {
  const PRICE_TABLE: Record<string, number> = { residential: 2, mobile: 5, datacenter: 0.8, fast: 1.2 };
  const network = params.network || "residential";
  const traffic = Number(params.traffic || 1);
  const price   = PRICE_TABLE[network] * traffic;
  return {
    id: "custom", name: `${network.charAt(0).toUpperCase() + network.slice(1)} Proxy`, price,
    period: "one-time",
    highlights: [
      { k: network,           v: "Network" },
      { k: traffic + " GB",   v: "Traffic" },
      { k: params.session || "sticky", v: "Session" },
      { k: `$${price.toFixed(2)}`,     v: "Price" },
    ],
    bulletsLeft:  ["Instant activation", "Username/password auth", "Global endpoints", "High uptime"],
    bulletsRight: ["Dashboard control", "Usage tracking", "Low block rate", "Multiple locations"],
    trial: "Custom proxy configuration",
  };
}

const NETWORK_ICON: Record<string, string> = {
  residential: "fa-house", mobile: "fa-mobile-screen",
  datacenter: "fa-server", fast: "fa-bolt",
};

// ─── Payment panel (server component) ─────────────────────────────────────────
function CheckoutPaymentPanel({
  email, planId, params,
}: {
  email: string;
  planId: string;
  params: Record<string, string | undefined>;
}) {
  return (
    <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-fit">
      <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-2">
        <i className="fa-solid fa-lock text-slate-300" />Secure Checkout
      </p>
      <h2 className="text-2xl font-extrabold text-slate-900 mb-2">Continue to payment</h2>
      <p className="text-sm text-slate-500 mb-6">
        Signed in as <span className="font-bold text-slate-900">{email || "your account"}</span>
      </p>

      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 mb-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-circle-check text-emerald-500" />You receive instantly
        </p>
        <p className="text-sm font-semibold text-emerald-800">
          Endpoints · Credentials · Ports · Usage tracking · Dashboard control
        </p>
      </div>

      <form action="/api/checkout/start" method="POST" className="space-y-3">
        <input type="hidden" name="plan"     value={planId} />
        <input type="hidden" name="network"  value={params.network  || ""} />
        <input type="hidden" name="session"  value={params.session  || ""} />
        <input type="hidden" name="protocol" value={params.protocol || ""} />
        <input type="hidden" name="country"  value={params.country  || ""} />
        <input type="hidden" name="traffic"  value={params.traffic  || ""} />
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 active:scale-[.98] text-white rounded-2xl px-6 py-3.5 text-sm font-extrabold transition-all"
        >
          <i className="fa-solid fa-bolt text-xs" />Pay &amp; Activate
        </button>
      </form>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { icon: "fa-lock",    label: "SSL Secured" },
          { icon: "fa-bolt",    label: "Instant"     },
          { icon: "fa-headset", label: "24/7 Support"},
        ].map(({ icon, label }) => (
          <div key={label} className="rounded-xl bg-slate-50 border border-slate-200 p-2.5 text-center">
            <i className={`fa-solid ${icon} text-slate-400 text-xs mb-1`} />
            <p className="text-[10px] font-bold text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <p className="text-center text-xs text-slate-400 mt-4">
        Want another plan?{" "}
        <Link href="/pricing" className="font-bold text-violet-600 hover:text-violet-700">
          Back to pricing
        </Link>
      </p>
    </section>
  );
}

// ─── Main page ─────────────────────────────────────────────────────────────────
export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: {
    plan?: string; mode?: "login" | "register"; custom?: string;
    network?: string; session?: string; protocol?: string;
    location?: string; country?: string; traffic?: string;
  };
}) {
  const planId   = searchParams.plan ? String(searchParams.plan) : "";
  const isCustom = planId === "custom";

  if (isCustom && (!searchParams.network || !searchParams.protocol)) {
    redirect("/proxy-builder");
  }

  let plan = null;
  if (isCustom)    plan = getCustomPlan(searchParams);
  else if (planId) plan = await getPlan(planId);

  if (!plan) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-['Sora',sans-serif]">
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-md w-full mx-4 shadow-sm">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 border border-red-200 mb-5">
            <i className="fa-solid fa-circle-exclamation text-red-400 text-xl" />
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 mb-2">Plan not found</h1>
          <p className="text-sm text-slate-500 mb-6">
            Could not find plan: <code className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">{planId || "(empty)"}</code>
          </p>
          <Link href="/pricing" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-5 py-2.5 text-sm font-bold transition-colors">
            <i className="fa-solid fa-arrow-left text-xs" />Back to pricing
          </Link>
        </div>
      </div>
    );
  }

  const session     = await getSession();
  const email       = (session as any)?.email || (session as any)?.user?.email || "";
  const jar         = cookies();
  const hasAuthCookie = jar.getAll().some((c) => {
    const n = c.name.toLowerCase();
    return n.includes("session") || n.includes("auth") || n.includes("token") || n.includes("jwt");
  });
  const isAuthed    = Boolean(session) || hasAuthCookie;
  // encode so the inner `?` does not break whatever login page uses `next` as a query param
  const nextUrl     = encodeURIComponent(`/checkout?${new URLSearchParams(searchParams as any).toString()}`);
  const networkIcon = NETWORK_ICON[(searchParams.network || "").toLowerCase()] || "fa-layer-group";

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif]">
      <style dangerouslySetInnerHTML={{ __html: `
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
      ` }} />

      <main className="mx-auto max-w-6xl px-4 py-12">

        {/* Breadcrumb */}
        <div className="fu flex items-center gap-2 text-sm mb-8">
          <Link href="/pricing" className="text-slate-400 hover:text-slate-700 transition-colors font-medium flex items-center gap-1.5">
            <i className="fa-solid fa-tag text-xs" />Pricing
          </Link>
          <i className="fa-solid fa-chevron-right text-slate-300 text-[10px]" />
          <span className="text-slate-700 font-semibold">Checkout</span>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 fu fu1">

          {/* ── LEFT: Plan summary ── */}
          <section className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm h-fit">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-violet-50 border border-violet-200 flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${networkIcon} text-violet-500 text-lg`} />
                </div>
                <div>
                  <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{plan.name}</h1>
                  <p className="text-sm text-slate-400 capitalize">{plan.period}</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-extrabold text-slate-900 mono">${Number(plan.price).toFixed(2)}</p>
                <p className="text-xs text-slate-400">/{plan.period}</p>
              </div>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-6">
              {plan.highlights.map((h: any) => (
                <div key={h.v} className="rounded-2xl border border-slate-200 bg-slate-50 p-3 text-center">
                  <div className="text-sm font-extrabold text-slate-900 mono">{h.k}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{h.v}</div>
                </div>
              ))}
            </div>

            {/* Feature bullets */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-2.5 mb-6">
              {[...plan.bulletsLeft, ...plan.bulletsRight].map((t: string) => (
                <div key={t} className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 shrink-0">
                    <i className="fa-solid fa-check text-emerald-600 text-[9px]" />
                  </span>
                  {t}
                </div>
              ))}
            </div>

            {/* Trial badge */}
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-600 flex items-center gap-2">
                <i className="fa-solid fa-circle-info text-slate-300" />{plan.trial}
              </p>
              <span className="rounded-full bg-violet-100 border border-violet-200 px-3 py-1 text-xs font-extrabold text-violet-700">Limited</span>
            </div>

            {/* Not authed warning */}
            {!isAuthed && (
              <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 flex items-start gap-3">
                <i className="fa-solid fa-triangle-exclamation text-amber-500 mt-0.5" />
                <p className="text-sm font-semibold text-amber-800">
                  Please log in or create an account to complete checkout.
                </p>
              </div>
            )}
          </section>

          {/* ── RIGHT: Auth or Payment ── */}
          {isAuthed ? (
            <CheckoutPaymentPanel
              email={email}
              planId={String(plan.id)}
              params={searchParams}
            />
          ) : (
            <CheckoutAuthPanel planId={String(plan.id)} next={nextUrl} />
          )}

        </div>
      </main>
    </div>
  );
}
