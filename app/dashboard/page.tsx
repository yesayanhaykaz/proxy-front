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
  location: string;
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
    case "mobile": type = "Mobile"; break;
    case "datacenter": type = "Datacenter"; break;
    case "fast": type = "Fast"; break;
    default: type = "Residential";
  }
  return {
    id: p.purchase_id,
    planName: p.package_name,
    type,
    status: p.status === "active" ? "Active" : "Expired",
    renewsOn: new Date(p.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
    usage: { used: 0, total: 5, unit: "GB" },
    location: "Global",
    host: p.host,
    port: p.port,
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
    gradient: "from-violet-500/20 to-purple-600/10",
    border: "border-violet-500/30",
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    dot: "bg-violet-400",
    icon: "🏠",
  },
  Mobile: {
    gradient: "from-emerald-500/20 to-teal-600/10",
    border: "border-emerald-500/30",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
    icon: "📱",
  },
  Datacenter: {
    gradient: "from-sky-500/20 to-blue-600/10",
    border: "border-sky-500/30",
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    dot: "bg-sky-400",
    icon: "🖥️",
  },
  Fast: {
    gradient: "from-amber-500/20 to-orange-600/10",
    border: "border-amber-500/30",
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400",
    icon: "⚡",
  },
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const email = decodeURIComponent(cookieStore.get("ps_email")?.value || "user");
  const userId = cookieStore.get("ps_uid")?.value || "";
  const subs = await getSubscriptions(userId);
  const activeSubs = subs.filter((s) => s.status === "Active");

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white font-['Sora',sans-serif]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .glass { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.06); }
        .glass-strong { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.09); }
        .glow-purple { box-shadow: 0 0 40px rgba(139,92,246,0.15); }
        .progress-bar { background: linear-gradient(90deg, #8b5cf6, #6366f1); }
        .copy-btn:active { transform: scale(0.95); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.1s; }
        .fade-up-3 { animation-delay: 0.15s; }
        .card-hover { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 20px 40px rgba(0,0,0,0.3); }
        .mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* Top bar */}
      <header className="border-b border-white/5 px-6 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-black">P</div>
            <span className="text-sm font-semibold text-white/60">ProxiesSeller</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[["Dashboard", "/dashboard"], ["Billing", "/dashboard/billing"], ["History", "/dashboard/history"], ["Profile", "/dashboard/profile"]].map(([label, href]) => (
              <Link key={href} href={href} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${label === "Dashboard" ? "bg-white/10 text-white" : "text-white/50 hover:text-white hover:bg-white/5"}`}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-400 to-indigo-500 flex items-center justify-center text-xs font-bold">
              {email[0]?.toUpperCase()}
            </div>
            <span className="hidden md:block text-sm text-white/60 max-w-[140px] truncate">{email}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10">

        {/* Hero greeting */}
        <div className="fade-up mb-10">
          <p className="text-sm font-medium text-violet-400 mb-2">Dashboard overview</p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome back<span className="text-white/20">,</span>{" "}
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              {email.split("@")[0]}
            </span>
          </h1>
          <p className="mt-2 text-white/40 text-sm">
            {activeSubs.length} active {activeSubs.length === 1 ? "proxy" : "proxies"} running
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 fade-up fade-up-1">
          {[
            { label: "Active Proxies", value: activeSubs.length, icon: "✦" },
            { label: "Total Plans", value: subs.length, icon: "◈" },
            { label: "Bandwidth", value: "∞", icon: "⟳" },
            { label: "Uptime", value: "99.9%", icon: "◎" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-5 card-hover">
              <div className="text-lg mb-3 opacity-60">{stat.icon}</div>
              <div className="text-2xl font-extrabold">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Subscriptions */}
        <div className="fade-up fade-up-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold">My Subscriptions</h2>
            <Link href="/pricing" className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
              Add proxy <span>→</span>
            </Link>
          </div>

          {subs.length === 0 ? (
            <div className="glass rounded-3xl p-16 text-center">
              <div className="text-5xl mb-4 opacity-30">⬡</div>
              <p className="text-white/40 text-sm mb-6">No active proxies yet</p>
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-3 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity">
                Browse plans →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {subs.map((s, i) => {
                const config = TYPE_CONFIG[s.type];
                const progress = pct(s.usage.used, s.usage.total);
                const proxyString = s.host && s.proxy_username
                  ? `${s.protocol}://${s.proxy_username}:${s.proxy_password}@${s.host}:${s.port}`
                  : null;

                return (
                  <div
                    key={s.id}
                    className={`relative overflow-hidden rounded-3xl border ${config.border} bg-gradient-to-br ${config.gradient} backdrop-blur card-hover`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                  >
                    {/* Ambient glow */}
                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full ${config.dot} opacity-5 blur-3xl -translate-y-1/2 translate-x-1/2`} />

                    <div className="relative p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">

                          {/* Header */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className="text-lg">{config.icon}</span>
                            <span className="font-bold text-base truncate">{s.planName}</span>
                            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${config.badge}`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
                              {s.type}
                            </span>
                            {s.status === "Active" ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center rounded-full bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-bold text-white/40">
                                Expired
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-white/40 mb-4">Activated {s.renewsOn}</p>

                          {/* Credentials */}
                          {s.host && (
                            <div className="glass rounded-xl p-4 space-y-2 mb-4">
                              <p className="text-[11px] font-bold text-white/30 uppercase tracking-wider mb-3">Proxy Credentials</p>
                              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                                {[
                                  ["Host", s.host],
                                  ["Port", String(s.port)],
                                  ["Username", s.proxy_username],
                                  ["Protocol", s.protocol],
                                ].map(([k, v]) => (
                                  <div key={k} className="flex gap-2">
                                    <span className="text-[11px] text-white/30 w-16 shrink-0">{k}</span>
                                    <span className="text-[11px] mono font-medium text-white/70 truncate">{v}</span>
                                  </div>
                                ))}
                                <div className="col-span-2 flex gap-2">
                                  <span className="text-[11px] text-white/30 w-16 shrink-0">Password</span>
                                  <span className="text-[11px] mono font-medium text-white/70">••••••••</span>
                                </div>
                              </div>
                              {proxyString && (
                                <div className="mt-3 flex items-center gap-2">
                                  <code className="flex-1 min-w-0 truncate rounded-lg bg-black/30 border border-white/10 px-3 py-2 text-[11px] mono text-white/60">
                                    {proxyString}
                                  </code>
                                  <button className="copy-btn shrink-0 rounded-lg bg-white/10 hover:bg-white/15 border border-white/10 px-3 py-2 text-[11px] font-semibold transition-colors">
                                    Copy
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Usage */}
                          <div>
                            <div className="flex justify-between text-[11px] text-white/30 mb-2">
                              <span>Bandwidth usage</span>
                              <span>{s.usage.used} / {s.usage.total} {s.usage.unit}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full rounded-full progress-bar transition-all duration-700"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/dashboard/subscription?id=${encodeURIComponent(s.id)}`}
                          className="shrink-0 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-xs font-semibold transition-colors"
                        >
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
