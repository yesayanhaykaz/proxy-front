import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Billing | ProxiesSeller",
  description: "Manage your plan, invoices, and payment methods.",
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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function formatAmount(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

export default async function BillingPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get("ps_uid")?.value || "";
  const purchases = await getPurchases(userId);
  const lastPlan = purchases[0];
  const totalSpent = purchases.reduce((sum, p) => sum + (p.price_cents || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
        .card-hover { transition: background 0.2s; }
        .card-hover:hover { background: rgba(255,255,255,0.04); }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .section-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); margin-bottom: 20px; }
        .status-active { background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.25); color: #6ee7b7; border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 700; }
        .status-expired { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.3); border-radius: 100px; padding: 4px 12px; font-size: 11px; font-weight: 700; }
      `}</style>

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors font-medium">Dashboard</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80 font-semibold">Billing</span>
          </div>
          <Link href="/pricing" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-4 py-2 text-sm font-bold hover:opacity-90 transition-opacity">
            Upgrade plan →
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-6">

        {/* Heading */}
        <div className="fade-up">
          <h1 className="text-3xl font-extrabold tracking-tight">Billing</h1>
          <p className="mt-1 text-sm text-white/40">Manage your plan and view invoices</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 fade-up">
          <div className="glass rounded-2xl p-5">
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold mb-2">Total spent</p>
            <p className="text-2xl font-extrabold mono">{formatAmount(totalSpent)}</p>
          </div>
          <div className="glass rounded-2xl p-5">
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold mb-2">Total orders</p>
            <p className="text-2xl font-extrabold">{purchases.length}</p>
          </div>
          <div className="glass rounded-2xl p-5 col-span-2 md:col-span-1">
            <p className="text-[11px] text-white/30 uppercase tracking-wider font-bold mb-2">Active plans</p>
            <p className="text-2xl font-extrabold">{purchases.filter(p => p.status === "active").length}</p>
          </div>
        </div>

        {/* Current plan */}
        {lastPlan && (
          <div className="relative overflow-hidden glass rounded-3xl p-6 fade-up">
            {/* Decorative glow */}
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="section-label">Current Plan</p>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-extrabold">{lastPlan.package_name}</h2>
                    <span className={lastPlan.status === "active" ? "status-active" : "status-expired"}>
                      {lastPlan.status === "active" ? "Active" : "Expired"}
                    </span>
                  </div>
                  <p className="text-sm text-white/40">Activated {formatDate(lastPlan.created_at)}</p>
                  <p className="text-sm text-white/40 mt-1 mono">{lastPlan.category}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-3xl font-extrabold mono">{formatAmount(lastPlan.price_cents)}</p>
                  <p className="text-xs text-white/30 mt-1">one-time</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Invoices */}
        <div className="glass rounded-3xl overflow-hidden fade-up">
          <div className="px-6 py-5 border-b border-white/5 flex items-center justify-between">
            <div>
              <p className="font-bold text-base">Invoices</p>
              <p className="text-xs text-white/40 mt-0.5">{purchases.length} total transactions</p>
            </div>
            {purchases.length > 0 && (
              <button className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors">
                Export CSV
              </button>
            )}
          </div>

          {purchases.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-4xl mb-3 opacity-20">◈</div>
              <p className="text-sm text-white/30">No invoices yet</p>
            </div>
          ) : (
            <div className="divide-y divide-white/5">
              {/* Table header */}
              <div className="grid grid-cols-12 px-6 py-3 text-[11px] text-white/25 font-bold uppercase tracking-wider">
                <span className="col-span-5">Plan</span>
                <span className="col-span-3">Category</span>
                <span className="col-span-2">Date</span>
                <span className="col-span-1 text-center">Status</span>
                <span className="col-span-1 text-right">Amount</span>
              </div>
              {purchases.map((p, i) => (
                <div
                  key={p.purchase_id}
                  className="grid grid-cols-12 items-center px-6 py-4 card-hover transition-colors"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="col-span-5">
                    <p className="font-semibold text-sm truncate pr-4">{p.package_name}</p>
                    <p className="text-[11px] mono text-white/25 mt-0.5 truncate">{p.purchase_id.slice(0, 12)}…</p>
                  </div>
                  <div className="col-span-3">
                    <span className="text-xs text-white/50 bg-white/5 border border-white/8 rounded-lg px-2 py-1">{p.category || "—"}</span>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm text-white/50">{formatDate(p.created_at)}</p>
                  </div>
                  <div className="col-span-1 flex justify-center">
                    <span className={p.status === "active" ? "status-active" : "status-expired"}>
                      {p.status === "active" ? "Active" : "Exp."}
                    </span>
                  </div>
                  <div className="col-span-1 text-right">
                    <p className="font-bold mono text-sm">{formatAmount(p.price_cents)}</p>
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
