import { cookies } from "next/headers";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Purchase = {
  purchase_id: string;
  package_name: string;
  category: string;
  price_cents: number;
  created_at: string;
  status: string;
};

async function getTransactions(userId: string): Promise<Purchase[]> {
  if (!userId) return [];
  const res = await fetch("https://api.proxiesseller.cc/api/purchases", {
    headers: { "X-User-Id": userId },
    cache: "no-store",
  });
  const data = await res.json();
  return data.purchases || [];
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });
}

function formatTime(dateStr: string) {
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });
}

function formatAmount(cents: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);
}

const CATEGORY_STYLES: Record<string, string> = {
  residential: "bg-violet-500/15 text-violet-300 border-violet-500/25",
  mobile: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  datacenter: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  fast: "bg-amber-500/15 text-amber-300 border-amber-500/25",
};

export default async function HistoryPage() {
  const cookieStore = cookies();
  const userId = cookieStore.get("ps_uid")?.value || "";
  const purchases = await getTransactions(userId);

  // Group by month
  const grouped: Record<string, Purchase[]> = {};
  purchases.forEach((p) => {
    const key = new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" });
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(p);
  });

  const totalSpent = purchases.reduce((sum, p) => sum + (p.price_cents || 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.35s ease both; }
        .row-hover { transition: background 0.15s; border-radius: 16px; }
        .row-hover:hover { background: rgba(255,255,255,0.03); }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .status-dot-active { background: #34d399; }
        .status-dot-expired { background: rgba(255,255,255,0.2); }
      `}</style>

      {/* Header */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-white/40 hover:text-white transition-colors font-medium">Dashboard</Link>
            <span className="text-white/20">/</span>
            <span className="text-white/80 font-semibold">Transaction History</span>
          </div>
          {purchases.length > 0 && (
            <button className="text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors border border-violet-500/20 rounded-lg px-3 py-2">
              Export CSV
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 space-y-8">

        {/* Heading + summary */}
        <div className="fade-up">
          <h1 className="text-3xl font-extrabold tracking-tight">Transaction History</h1>
          <p className="mt-1 text-sm text-white/40">
            {purchases.length} transactions · {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(totalSpent / 100)} total
          </p>
        </div>

        {purchases.length === 0 ? (
          <div className="glass rounded-3xl p-20 text-center fade-up">
            <div className="text-5xl mb-4 opacity-20">◳</div>
            <p className="text-white/30 text-sm">No transactions yet.</p>
            <Link href="/pricing" className="inline-flex mt-6 items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl px-5 py-2.5 text-sm font-bold hover:opacity-90 transition-opacity">
              Browse plans →
            </Link>
          </div>
        ) : (
          <>
            {/* Timeline grouped by month */}
            {Object.entries(grouped).map(([month, items]) => (
              <div key={month} className="fade-up">
                {/* Month header */}
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="text-xs font-bold uppercase tracking-widest text-white/25">{month}</h2>
                  <div className="flex-1 h-px bg-white/5" />
                  <span className="text-xs text-white/20 mono">
                    {formatAmount(items.reduce((s, p) => s + (p.price_cents || 0), 0))}
                  </span>
                </div>

                <div className="glass rounded-3xl overflow-hidden">
                  <div className="divide-y divide-white/5">
                    {items.map((p, i) => {
                      const catKey = (p.category || "").toLowerCase();
                      const catStyle = CATEGORY_STYLES[catKey] || "bg-white/5 text-white/40 border-white/10";

                      return (
                        <div
                          key={p.purchase_id}
                          className="flex items-center gap-4 px-6 py-4 row-hover"
                          style={{ animationDelay: `${i * 0.04}s` }}
                        >
                          {/* Status indicator */}
                          <div className="shrink-0">
                            <div className={`h-2 w-2 rounded-full ${p.status === "active" ? "status-dot-active" : "status-dot-expired"}`} />
                          </div>

                          {/* Main info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm truncate">{p.package_name}</p>
                              <span className={`inline-flex rounded-full border px-2 py-0.5 text-[11px] font-bold ${catStyle}`}>
                                {p.category || "—"}
                              </span>
                            </div>
                            <p className="text-[11px] mono text-white/20 mt-0.5">
                              ID: {p.purchase_id.slice(0, 16)}…
                            </p>
                          </div>

                          {/* Date */}
                          <div className="shrink-0 text-right hidden sm:block">
                            <p className="text-sm text-white/50">{formatDate(p.created_at)}</p>
                            <p className="text-[11px] text-white/25 mono mt-0.5">{formatTime(p.created_at)}</p>
                          </div>

                          {/* Amount */}
                          <div className="shrink-0 text-right">
                            <p className="font-extrabold mono text-base">{formatAmount(p.price_cents)}</p>
                            <p className="text-[11px] text-white/25 mt-0.5">
                              {p.status === "active" ? (
                                <span className="text-emerald-400">● Active</span>
                              ) : (
                                <span>Expired</span>
                              )}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
