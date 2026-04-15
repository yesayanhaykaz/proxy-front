import Link from "next/link";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import SubscriptionDetailClient from "./SubscriptionDetailClient";
import { getPurchaseById, type Purchase } from "@/lib/purchases";

export const dynamic = "force-dynamic";

const TYPE_CONFIG: Record<string, { border: string; bg: string; badge: string; dot: string; bar: string; faIcon: string; iconColor: string; label: string }> = {
  residential: { border: "border-violet-200", bg: "bg-violet-50/40", badge: "bg-violet-100 text-violet-700 border-violet-200", dot: "bg-violet-500", bar: "bg-violet-500", faIcon: "fa-house",         iconColor: "text-violet-500",  label: "Residential" },
  mobile:      { border: "border-emerald-200",bg: "bg-emerald-50/40",badge: "bg-emerald-100 text-emerald-700 border-emerald-200",dot: "bg-emerald-500",bar: "bg-emerald-500",faIcon: "fa-mobile-screen", iconColor: "text-emerald-500", label: "Mobile"      },
  datacenter:  { border: "border-sky-200",    bg: "bg-sky-50/40",    badge: "bg-sky-100 text-sky-700 border-sky-200",            dot: "bg-sky-500",    bar: "bg-sky-500",    faIcon: "fa-server",        iconColor: "text-sky-500",     label: "Datacenter"  },
  fast:        { border: "border-amber-200",  bg: "bg-amber-50/40",  badge: "bg-amber-100 text-amber-700 border-amber-200",      dot: "bg-amber-500",  bar: "bg-amber-500",  faIcon: "fa-bolt",          iconColor: "text-amber-500",   label: "Fast"        },
};

function fallbackConfig() {
  return TYPE_CONFIG["residential"];
}

export default async function SubscriptionDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get("ps_uid")?.value || "";
  const purchase = await getPurchaseById(userId, params.id);

  if (!purchase) notFound();

  const catKey = (purchase.category || "").toLowerCase();
  const cfg    = TYPE_CONFIG[catKey] ?? fallbackConfig();
  const isActive = purchase.status === "active";

  const proxyStr =
    purchase.host && purchase.proxy_username
      ? `${purchase.protocol}://${purchase.proxy_username}:${purchase.proxy_password}@${purchase.host}:${purchase.port}`
      : null;

  const activatedDate = new Date(purchase.created_at).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const activatedTime = new Date(purchase.created_at).toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="min-h-screen bg-slate-50 font-['Sora',sans-serif] text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        .mono { font-family: 'JetBrains Mono', monospace; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        .fu  { animation: fadeUp .4s ease both; }
        .fu1 { animation-delay:.06s; }
        .fu2 { animation-delay:.12s; }
        .fu3 { animation-delay:.18s; }
        .card { background:#fff; border-radius:24px; border:1.5px solid #e2e8f0; padding:24px; }
        .detail-row { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid #f1f5f9; }
        .detail-row:last-child { border-bottom:none; }
        .detail-label { font-size:12px; font-weight:600; color:#94a3b8; display:flex; align-items:center; gap:8px; }
        .detail-value { font-size:13px; font-weight:700; color:#0f172a; font-family:'JetBrains Mono',monospace; }
      ` }} />

      <main className="mx-auto max-w-3xl px-4 py-10 space-y-5">

        {/* Breadcrumb */}
        <div className="fu flex items-center gap-2 text-sm">
          <Link href="/dashboard" className="text-slate-400 hover:text-slate-700 transition-colors font-medium flex items-center gap-1.5">
            <i className="fa-solid fa-house text-xs" />Dashboard
          </Link>
          <i className="fa-solid fa-chevron-right text-slate-300 text-[10px]" />
          <span className="text-slate-700 font-semibold">Subscription Details</span>
        </div>

        {/* Header card */}
        <div className={`fu fu1 rounded-3xl border ${cfg.border} ${isActive ? cfg.bg : "bg-slate-50/80"} p-6`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <div className={`h-9 w-9 rounded-xl flex items-center justify-center ${isActive ? cfg.bg : "bg-slate-100"} border ${cfg.border}`}>
                  <i className={`fa-solid ${cfg.faIcon} ${isActive ? cfg.iconColor : "text-slate-400"} text-sm`} />
                </div>
                <h1 className="text-xl font-extrabold text-slate-900">{purchase.package_name}</h1>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${cfg.badge}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
                </span>
                {isActive ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-400">
                    <i className="fa-solid fa-clock-rotate-left text-[9px]" />Expired
                  </span>
                )}
              </div>
            </div>
            {purchase.price_cents !== undefined && (
              <div className="text-right shrink-0">
                <p className="text-2xl font-extrabold mono text-slate-900">
                  ${(purchase.price_cents / 100).toFixed(2)}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">one-time</p>
              </div>
            )}
          </div>
        </div>

        {/* Plan info */}
        <div className="card fu fu2">
          <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-slate-300" />Plan Information
          </h2>
          <div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-fingerprint" />Purchase ID</span>
              <span className="detail-value text-xs text-slate-500">{purchase.purchase_id}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-box" />Package</span>
              <span className="detail-value">{purchase.package_name}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-tag" />Category</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${cfg.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />{cfg.label}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-regular fa-calendar" />Activated</span>
              <div className="text-right">
                <p className="detail-value text-xs">{activatedDate}</p>
                <p className="text-[11px] text-slate-400 mono mt-0.5">{activatedTime}</p>
              </div>
            </div>
            <div className="detail-row">
              <span className="detail-label"><i className="fa-solid fa-circle-half-stroke" />Status</span>
              {isActive ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-400">
                  <i className="fa-solid fa-clock-rotate-left text-[9px]" />Expired
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Proxy credentials */}
        {purchase.host ? (
          <div className="card fu fu3">
            <h2 className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <i className="fa-solid fa-key text-slate-300" />Proxy Credentials
            </h2>
            <div>
              {[
                { label: "Host",     value: purchase.host,             icon: "fa-globe"   },
                { label: "Port",     value: String(purchase.port),     icon: "fa-plug"    },
                { label: "Username", value: purchase.proxy_username,   icon: "fa-user"    },
                { label: "Password", value: purchase.proxy_password,   icon: "fa-lock"    },
                { label: "Protocol", value: purchase.protocol,         icon: "fa-shield"  },
              ].map(({ label, value, icon }) => (
                <div key={label} className="detail-row">
                  <span className="detail-label"><i className={`fa-solid ${icon}`} />{label}</span>
                  <span className="detail-value">
                    {label === "Password" ? "••••••••" : value}
                  </span>
                </div>
              ))}
            </div>

            {/* Full proxy string + interactive copy */}
            {proxyStr && (
              <SubscriptionDetailClient
                proxyStr={proxyStr}
                purchaseId={purchase.purchase_id}
                isActive={isActive}
              />
            )}
          </div>
        ) : (
          <div className="card fu fu3 text-center py-10">
            <i className="fa-solid fa-plug-circle-xmark text-slate-300 text-3xl mb-3" />
            <p className="text-sm text-slate-400">No proxy credentials assigned yet.</p>
            <p className="text-xs text-slate-300 mt-1">Contact support if you believe this is an error.</p>
          </div>
        )}

        {/* Reactivate banner if expired */}
        {!isActive && (
          <div className="fu fu3 rounded-3xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <div className="h-10 w-10 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-triangle-exclamation text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-amber-800 mb-1">Subscription expired</p>
                <p className="text-sm text-amber-600">
                  This subscription is no longer active. Reactivate it to restore proxy access instantly.
                </p>
              </div>
            </div>
            <div className="mt-4">
              <SubscriptionDetailClient
                proxyStr={proxyStr}
                purchaseId={purchase.purchase_id}
                isActive={isActive}
              />
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="fu fu3 pb-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors"
          >
            <i className="fa-solid fa-arrow-left text-xs" />Back to dashboard
          </Link>
        </div>

      </main>
    </div>
  );
}
