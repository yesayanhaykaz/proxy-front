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
    border: "border-violet-200", bg: "bg-violet-50/50",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "bg-violet-500", bar: "bg-violet-500",
    faIcon: "fa-house",
    iconColor: "text-violet-500",
  },
  Mobile: {
    border: "border-emerald-200", bg: "bg-emerald-50/50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500", bar: "bg-emerald-500",
    faIcon: "fa-mobile-screen",
    iconColor: "text-emerald-500",
  },
  Datacenter: {
    border: "border-sky-200", bg: "bg-sky-50/50",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    dot: "bg-sky-500", bar: "bg-sky-500",
    faIcon: "fa-server",
    iconColor: "text-sky-500",
  },
  Fast: {
    border: "border-amber-200", bg: "bg-amber-50/50",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500", bar: "bg-amber-500",
    faIcon: "fa-bolt",
    iconColor: "text-amber-500",
  },
};

export default async function DashboardPage() {
  const cookieStore = cookies();
  const email  = decodeURIComponent(cookieStore.get("ps_email")?.value || "user");
  const userId = cookieStore.get("ps_uid")?.value || "";
  const subs   = await getSubscriptions(userId);
  const active = subs.filter((s) => s.status === "Active");

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />

      <main className="mx-auto max-w-6xl px-4 py-10">

        {/* Greeting */}
        <div className="fu mb-8">
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-violet-600 mb-2">Dashboard overview</p>
          <h1 className="text-4xl font-extrabold tracking-tight">
            Welcome back, <span className="text-violet-600">{email.split("@")[0]}</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {active.length} active {active.length === 1 ? "proxy" : "proxies"} running
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 fu fu1">
          {[
            { label: "Active Proxies", value: active.length, icon: "fa-circle-check", accent: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-100" },
            { label: "Total Plans",    value: subs.length,   icon: "fa-layer-group",  accent: "text-slate-600",   bg: "bg-slate-100",  border: "border-slate-200"  },
            { label: "Bandwidth",      value: "∞",           icon: "fa-infinity",     accent: "text-slate-600",   bg: "bg-slate-100",  border: "border-slate-200"  },
            { label: "Uptime",         value: "99.9%",       icon: "fa-signal",       accent: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100"},
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-5 card">
              <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl ${s.bg} border ${s.border} mb-3`}>
                <i className={`fa-solid ${s.icon} ${s.accent} text-sm`} />
              </div>
              <div className={`text-2xl font-extrabold ${s.accent}`}>{s.value}</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Subscriptions */}
        <div className="fu fu2">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-extrabold">My Subscriptions</h2>
            <Link href="/pricing" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-700 transition-colors">
              <i className="fa-solid fa-plus text-xs" /> Add proxy
            </Link>
          </div>

          {subs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
                <i className="fa-solid fa-network-wired text-slate-400 text-xl" />
              </div>
              <p className="text-slate-400 text-sm mb-5">No active proxies yet</p>
              <Link href="/pricing" className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Browse plans <i className="fa-solid fa-arrow-right text-xs" />
              </Link>
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
                            <i className={`fa-solid ${c.faIcon} ${c.iconColor} text-sm w-4 text-center`} />
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

                          <p className="text-xs text-slate-400 font-medium mb-4">
                            <i className="fa-regular fa-calendar mr-1.5" />Activated {s.renewsOn}
                          </p>

                          {/* Credentials */}
                          {s.host && (
                            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4">
                              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                                <i className="fa-solid fa-key text-slate-300" />Proxy Credentials
                              </p>
                              <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-3">
                                {[
                                  { k: "Host",     v: s.host,             icon: "fa-globe" },
                                  { k: "Port",     v: String(s.port),     icon: "fa-plug" },
                                  { k: "Username", v: s.proxy_username,   icon: "fa-user" },
                                  { k: "Protocol", v: s.protocol,         icon: "fa-shield" },
                                  { k: "Password", v: "••••••••",         icon: "fa-lock" },
                                ].map(({ k, v, icon }) => (
                                  <div key={k} className="flex items-center gap-2">
                                    <i className={`fa-solid ${icon} text-slate-300 text-[10px] w-3 text-center`} />
                                    <span className="text-[11px] text-slate-400 w-14 shrink-0 font-medium">{k}</span>
                                    <span className="text-[11px] mono font-semibold text-slate-700 truncate">{v}</span>
                                  </div>
                                ))}
                              </div>
                              {proxyStr && (
                                <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                                  <code className="flex-1 min-w-0 truncate bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-[11px] mono text-slate-600">
                                    {proxyStr}
                                  </code>
                                  <button className="shrink-0 flex items-center gap-1.5 bg-slate-900 hover:bg-slate-700 text-white rounded-lg px-3 py-2 text-[11px] font-bold transition-colors">
                                    <i className="fa-regular fa-copy text-[10px]" />Copy
                                  </button>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Usage bar */}
                          <div>
                            <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1.5">
                              <span className="flex items-center gap-1"><i className="fa-solid fa-chart-bar text-[9px]" />Bandwidth usage</span>
                              <span>{s.usage.used} / {s.usage.total} {s.usage.unit}</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                              <div className={`h-full rounded-full ${c.bar} transition-all duration-700`} style={{ width: `${pct(s.usage.used, s.usage.total)}%` }} />
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/dashboard/subscription?id=${encodeURIComponent(s.id)}`}
                          className="shrink-0 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 text-xs font-bold transition-colors shadow-sm"
                        >
                          Details <i className="fa-solid fa-arrow-right text-[10px]" />
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
