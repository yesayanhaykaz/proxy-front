import Link from "next/link";
import { cookies } from "next/headers";
import SubscriptionList from "./SubscriptionList";
import { getPurchases, type Purchase } from "@/lib/purchases";

export const dynamic = "force-dynamic";

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
  const purchases = await getPurchases(userId);
  return purchases.map(mapPurchase);
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const email  = decodeURIComponent(cookieStore.get("ps_email")?.value || "user");
  const userId = cookieStore.get("ps_uid")?.value || "";
  const subs   = await getSubscriptions(userId);
  const active = subs.filter((s) => s.status === "Active");

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .card { transition: box-shadow .2s, transform .2s; }
        .card:hover { box-shadow: 0 8px 32px rgba(0,0,0,.07); transform: translateY(-1px); }
      ` }} />

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

          <SubscriptionList subs={subs} />
        </div>
      </main>
    </div>
  );
}
