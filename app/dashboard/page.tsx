import Link from "next/link";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type Purchase = {
  purchase_id: string;
  package_name: string;
  category: "Residential" | "Mobile" | "Datacenter" | "Fast";
  status: "active" | "expired";
  created_at: string;
  proxy_username?: string;
  proxy_password?: string;
  host?: string;
  port?: number;
  protocol?: string;
};

type Sub = {
  id: string;
  planName: string;
  type: "Residential" | "Mobile" | "Datacenter" | "Fast";
  status: "Active" | "Expired";
  renewsOn: string;
  usage: { used: number; total: number; unit: "GB" };
  host?: string;
  port?: number;
  proxy_username?: string;
  proxy_password?: string;
  protocol?: string;
};

function pct(used: number, total: number) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((used / total) * 100)));
}

function mapPurchase(p: Purchase): Sub {
  const cat = (p.category || "").toLowerCase();
  let type: Sub["type"];
  switch (cat) {
    case "residential": type = "Residential"; break;
    case "mobile":      type = "Mobile";      break;
    case "datacenter":  type = "Datacenter";  break;
    case "fast":        type = "Fast";        break;
    default:            type = "Residential";
  }
  return {
    id: p.purchase_id,
    planName: p.package_name,
    type,
    status: p.status === "active" ? "Active" : "Expired",
    renewsOn: new Date(p.created_at).toLocaleDateString("en-US", {
      year: "numeric", month: "short", day: "numeric",
    }),
    usage: { used: 0, total: 5, unit: "GB" },
    host: p.host, port: p.port,
    proxy_username: p.proxy_username,
    proxy_password: p.proxy_password,
    protocol: p.protocol,
  };
}

async function getSubscriptions(userId: string): Promise<Sub[]> {
  if (!userId) return [];
  const res = await fetch("https://api.proxiesseller.cc/api/purchases", {
    headers: { "X-User-Id": userId },
    cache: "no-store",
  });
  const data = await res.json();
  return (data.purchases || []).map(mapPurchase);
}

const TYPE_CONFIG = {
  Residential: {
    border: "border-violet-200", bg: "bg-violet-50/40",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "bg-violet-500", bar: "bg-violet-500", icon: "🏠",
  },
  Mobile: {
    border: "border-emerald-200", bg: "bg-emerald-50/40",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500", bar: "bg-emerald-500", icon: "📱",
  },
  Datacenter: {
    border: "border-sky-200", bg: "bg-sky-50/40",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    dot: "bg-sky-500", bar: "bg-sky-500", icon: "🖥️",
  },
  Fast: {
    border: "border-amber-200", bg: "bg-amber-50/40",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500", bar: "bg-amber-500", icon: "⚡",
  },
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const email   = decodeURIComponent(cookieStore.get("ps_email")?.value || "user");
  const userId  = cookieStore.get("ps_uid")?.value || "";
  const subs    = await getSubscriptions(userId);
  const active  = subs.filter((s) => s.status === "Active");

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .card { transition: box-shadow .2s, transform .2s; }
        .card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.08); transform: translateY(-1px); }
      `}</style>

      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-black">P</div>
            <span className="font-bold text-slate-800 text-sm tracking-tight">ProxiesSeller</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[["Dashboard","/dashboard",true],["Billing","/dashboard/billing",false],["History","/dashboard/history",false],["Profile","/dashboard/profile",false],["Settings","/dashboard/settings",false]].map(([l,h,a]) => (
              <Link key={String(h)} href={String(h)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${a ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"}`}>{String(l)}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">{email[0]?.toUpperCase()}</div>
            <span className="hidden md:block text-sm text-slate-500 font-medium max-w-[150px] truncate">{email}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">

        {/* Greeting */}
        <div className="fu mb-8">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-violet-600 mb-2">Dashboard overview</p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="text-violet-600">{email.split("@")[0]}</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">{active.length} active {active.length === 1 ? "proxy" : "proxies"} running</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fu fu1">
          {[
            { label: "Active Proxies", value: active.length,   icon: "✦", accent: "text-violet-600" },
            { label: "Total Plans",    value: subs.length,     icon: "◈", accent: "text-slate-700"  },
            { label: "Bandwidth",      value: "∞",             icon: "⟳", accent: "text-slate-700"  },
            { label: "Uptime",         value: "99.9%",         icon: "◎", accent: "text-emerald-600"},
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 card">
              <div className={`text-lg mb-3 ${s.accent}`}>{s.icon}</div>
              <div className={`text-2xl font-extrabold ${s.accent}`}>{s.value}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Subscriptions */}
        <div className="fu fu2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold">My Subscriptions</h2>
            <Link href="/pricing" className="text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">Add proxy →</Link>
          </div>

          {subs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
              <p className="text-slate-400 text-sm mb-5">No active proxies yet</p>
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">Browse plans →</Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {subs.map((s) => {
                const c = TYPE_CONFIG[s.type];
                const proxyStr = s.host && s.proxy_username
                  ? `${s.protocol}://${s.proxy_username}:${s.proxy_password}@${s.host}:${s.port}`
                  : null;

                return (
                  <div key={s.id} className={`rounded-3xl border ${c.border} ${c.bg} card`}>
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">

                          {/* Header row */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-lg leading-none">{c.icon}</span>
                            <span className="font-extrabold text-base text-slate-900">{s.planName}</span>
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${c.badge}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />{s.type}
                            </span>
                            {s.status === "Active" ? (
                              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                              </span>
                            ) : (
                              <span className="inline-flex rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-400">Expired</span>
                            )}
                          </div>

                          <p className="text-xs text-slate-400 font-medium mb-4">Activated {s.renewsOn}</p>

                          {/* Credentials */}
                          {s.host && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4">
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3">Proxy Credentials</p>
                              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-3">
                                {[["Host", s.host], ["Port", String(s.port)], ["Username", s.proxy_username], ["Protocol", s.protocol], ["Password", "••••••••"]].map(([k, v]) => (
                                  <div key={k} className="flex items-baseline gap-2">
                                    <span className="text-[11px] text-slate-400 w-16 shrink-0 font-medium">{k}</span>
                                    <span className="text-[11px] mono font-semibold text-slate-700 truncate">{v}</span>
                                  </div>
                                ))}
                              </div>
                              {proxyStr && (
                                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                  <code className="flex-1 min-w-0 truncate bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] mono text-slate-600">{proxyStr}</code>
                                  <button className="shrink-0 bg-slate-900 hover:bg-slate-700 text-white rounded-lg px-3 py-2 text-[11px] font-bold transition-colors">Copy</button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Usage */}
                          <div>
                            <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1.5">
                              <span>Bandwidth usage</span>
                              <span>{s.usage.used} / {s.usage.total} {s.usage.unit}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div className={`h-full rounded-full ${c.bar} transition-all duration-700`} style={{ width: `${pct(s.usage.used, s.usage.total)}%` }} />
                            </div>
                          </div>
                        </div>

                        <Link href={`/dashboard/subscription?id=${encodeURIComponent(s.id)}`} className="shrink-0 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 text-xs font-bold transition-colors shadow-sm">
                          Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
