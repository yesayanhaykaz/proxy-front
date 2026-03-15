import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Billing & History | ProxiesSeller",
  description: "Manage your plan, invoices, and transaction history.",
  robots: { index: false, follow: false },
};

type Purchase = {
  purchase_id: string;
  package_name: string;
  category: string;
  price_cents: number;
  created_at: string;
  status: string;
};

async function getPurchases(userId: string): Promise<Purchase[]> {
  if (!userId) return [];
  const res = await fetch("https://api.proxiesseller.cc/api/purchases", {
    headers: { "X-User-Id": userId },
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.purchases || [];
}

function fmt(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

function fmtDate(str: string) {
  return new Date(str).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function fmtTime(str: string) {
  return new Date(str).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

const CAT_BADGE: Record<string, string> = {
  residential: "bg-violet-100 text-violet-700 border-violet-200",
  mobile:      "bg-emerald-100 text-emerald-700 border-emerald-200",
  datacenter:  "bg-sky-100 text-sky-700 border-sky-200",
  fast:        "bg-amber-100 text-amber-700 border-amber-200",
};

export default async function BillingHistoryPage() {
  const cookieStore = cookies();
  const userId   = cookieStore.get("ps_uid")?.value || "";
  const purchases = await getPurchases(userId);
  const latest   = purchases[0];
  const totalSpent = purchases.reduce((s, p) => s + (p.price_cents || 0), 0);
  const activeCount = purchases.filter((p) => p.status === "active").length;

  // Group by month for history section
  const grouped: Record<string, Purchase[]> = {};
  purchases.forEach((p) => {
    const k = new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" });
    (grouped[k] ??= []).push(p);
  });

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .fu3 { animation-delay:.18s; }
        .row:hover { background: #f8fafc; }
        .card { transition: box-shadow .2s, transform .2s; }
        .card:hover { box-shadow: 0 6px 24px rgba(0,0,0,.07); transform: translateY(-1px); }
      `}</style>

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="mx-auto max-w-5xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-900 transition-colors font-semibold">Dashboard</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-800 font-semibold">Billing & History</span>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl px-4 py-2 text-sm font-bold transition-colors">
            Upgrade plan →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">

        {/* Page title */}
        <div className="fu">
          <h1 className="text-3xl font-extrabold tracking-tight">Billing &amp; History</h1>
          <p className="mt-1 text-sm text-slate-400">Your current plan and full transaction record</p>
        </div>

        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-4 fu fu1">
          {[
            { label: "Total Spent",    value: fmt(totalSpent),      accent: "text-slate-900" },
            { label: "Total Orders",   value: String(purchases.length), accent: "text-slate-900" },
            { label: "Active Plans",   value: String(activeCount),  accent: "text-emerald-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 card">
              <div className={`text-2xl font-extrabold mono ${s.accent}`}>{s.value}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Current plan card */}
        {latest && (
          <div className="relative overflow-hidden bg-white rounded-3xl border border-slate-200 p-6 shadow-sm fu fu2">
            {/* Decorative accent strip */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-t-3xl" />
            <div className="flex items-start justify-between gap-4 mt-1">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Current Plan</p>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-xl font-extrabold">{latest.package_name}</h2>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-bold border ${
                    latest.status === "active"
                      ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                      : "bg-slate-100 text-slate-400 border-slate-200"
                  }`}>
                    {latest.status === "active" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                    {latest.status === "active" ? "Active" : "Expired"}
                  </span>
                </div>
                <p className="text-sm text-slate-400">Activated {fmtDate(latest.created_at)}</p>
                {latest.category && (
                  <span className={`inline-flex mt-2 rounded-full border px-2.5 py-1 text-[11px] font-bold ${CAT_BADGE[(latest.category || "").toLowerCase()] || "bg-slate-100 text-slate-500 border-slate-200"}`}>
                    {latest.category}
                  </span>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-3xl font-extrabold mono">{fmt(latest.price_cents)}</p>
                <p className="text-xs text-slate-400 mt-1">one-time</p>
              </div>
            </div>
          </div>
        )}

        {/* Transaction history */}
        <div className="fu fu3">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-extrabold">Transaction History</h2>
              <p className="text-xs text-slate-400 mt-0.5">{purchases.length} transactions</p>
            </div>
            {purchases.length > 0 && (
              <button className="text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors border border-slate-200 rounded-lg px-3 py-1.5 bg-white">
                Export CSV
              </button>
            )}
          </div>

          {purchases.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
              <p className="text-slate-400 text-sm">No transactions yet</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(grouped).map(([month, items]) => (
                <div key={month}>
                  {/* Month separator */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">{month}</span>
                    <div className="flex-1 h-px bg-slate-200" />
                    <span className="text-[11px] text-slate-400 mono font-medium">
                      {fmt(items.reduce((s, p) => s + (p.price_cents || 0), 0))}
                    </span>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                    {/* Table head */}
                    <div className="grid grid-cols-12 px-5 py-3 border-b border-slate-100 text-[11px] text-slate-400 font-extrabold uppercase tracking-wider">
                      <span className="col-span-5">Plan</span>
                      <span className="col-span-2">Type</span>
                      <span className="col-span-2 hidden sm:block">Date</span>
                      <span className="col-span-2 text-center">Status</span>
                      <span className="col-span-1 text-right">Amount</span>
                    </div>
                    {items.map((p, i) => {
                      const catKey = (p.category || "").toLowerCase();
                      const badgeCls = CAT_BADGE[catKey] || "bg-slate-100 text-slate-500 border-slate-200";
                      return (
                        <div
                          key={p.purchase_id}
                          className={`row grid grid-cols-12 items-center px-5 py-3.5 transition-colors ${i < items.length - 1 ? "border-b border-slate-50" : ""}`}
                        >
                          <div className="col-span-5 min-w-0">
                            <p className="font-semibold text-sm text-slate-900 truncate pr-3">{p.package_name}</p>
                            <p className="text-[10px] mono text-slate-300 mt-0.5 truncate">{p.purchase_id.slice(0, 14)}…</p>
                          </div>
                          <div className="col-span-2">
                            <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${badgeCls}`}>
                              {p.category || "—"}
                            </span>
                          </div>
                          <div className="col-span-2 hidden sm:block">
                            <p className="text-sm text-slate-500">{fmtDate(p.created_at)}</p>
                            <p className="text-[10px] text-slate-300 mono">{fmtTime(p.created_at)}</p>
                          </div>
                          <div className="col-span-2 flex justify-center">
                            {p.status === "active" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />Active
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-400">Expired</span>
                            )}
                          </div>
                          <div className="col-span-1 text-right">
                            <span className="font-extrabold mono text-sm text-slate-900">{fmt(p.price_cents)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
