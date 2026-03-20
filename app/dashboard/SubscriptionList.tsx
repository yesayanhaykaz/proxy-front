"use client";

import Link from "next/link";
import { useState } from "react";

type Sub = {
  id: string;
  planName: string;
  type: "Residential" | "Mobile" | "Datacenter" | "Fast";
  status: "Active" | "Expired";
  renewsOn: string;
  usage: { used: number; total: number; unit: "GB" };
  host?: "103.63.28.207";
  port?: number;
  proxy_username?: string;
  proxy_password?: string;
  protocol?: string;
};

const TYPE_CONFIG = {
  Residential: {
    border: "border-violet-200", bg: "bg-violet-50/50",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    dot: "bg-violet-500", bar: "bg-violet-500",
    faIcon: "fa-house", iconColor: "text-violet-500",
  },
  Mobile: {
    border: "border-emerald-200", bg: "bg-emerald-50/50",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    dot: "bg-emerald-500", bar: "bg-emerald-500",
    faIcon: "fa-mobile-screen", iconColor: "text-emerald-500",
  },
  Datacenter: {
    border: "border-sky-200", bg: "bg-sky-50/50",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    dot: "bg-sky-500", bar: "bg-sky-500",
    faIcon: "fa-server", iconColor: "text-sky-500",
  },
  Fast: {
    border: "border-amber-200", bg: "bg-amber-50/50",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    dot: "bg-amber-500", bar: "bg-amber-500",
    faIcon: "fa-bolt", iconColor: "text-amber-500",
  },
};

function pct(used: number, total: number) {
  if (!total) return 0;
  return Math.max(0, Math.min(100, Math.round((used / total) * 100)));
}

function SubscriptionCard({ s }: { s: Sub }) {
  const c = TYPE_CONFIG[s.type];
  const proxyStr =
    s.host && s.proxy_username
      ? `${s.protocol}://${s.proxy_username}:${s.proxy_password}@${s.host}:${s.port}`
      : null;

  const [copied, setCopied] = useState(false);
  const [reactivating, setReactivating] = useState(false);
  const [reactivated, setReactivated] = useState(false);
  const [reactivateError, setReactivateError] = useState("");

  function handleCopy() {
    if (!proxyStr) return;
    navigator.clipboard.writeText(proxyStr).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  async function handleReactivate() {
    setReactivating(true);
    setReactivateError("");
    try {
      const res = await fetch("/api/reactivate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ purchase_id: s.id }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Reactivation failed");
      }
      setReactivated(true);
      // Reload page after short delay to reflect new status
      setTimeout(() => window.location.reload(), 1200);
    } catch (err: any) {
      setReactivateError(err.message || "Something went wrong");
    } finally {
      setReactivating(false);
    }
  }

  const isExpired = s.status === "Expired";

  return (
    <div className={`rounded-3xl border ${c.border} ${isExpired ? "bg-slate-50/80 opacity-80" : c.bg} card`}>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">

            {/* Header */}
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <i className={`fa-solid ${c.faIcon} ${isExpired ? "text-slate-400" : c.iconColor} text-sm w-4 text-center`} />
              <span className="font-extrabold text-base text-slate-900">{s.planName}</span>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold ${c.badge}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />{s.type}
              </span>
              {!isExpired ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />Active
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-400">
                  <i className="fa-solid fa-clock-rotate-left text-[9px]" />Expired
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 font-medium mb-4">
              <i className="fa-regular fa-calendar mr-1.5" />Activated {s.renewsOn}
            </p>

            {/* Credentials — only show for active */}
            {s.host && !isExpired && (
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm mb-4">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-1.5">
                  <i className="fa-solid fa-key text-slate-300" />Proxy Credentials
                </p>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 mb-3">
                  {[
                    { k: "Host",     v: s.host,           icon: "fa-globe" },
                    { k: "Port",     v: String(s.port),   icon: "fa-plug"  },
                    { k: "Username", v: s.proxy_username, icon: "fa-user"  },
                    { k: "Protocol", v: s.protocol,       icon: "fa-shield"},
                    { k: "Password", v: "••••••••",       icon: "fa-lock"  },
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
                    <button
                      onClick={handleCopy}
                      className={`shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-[11px] font-bold transition-all ${
                        copied
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 hover:bg-slate-700 text-white"
                      }`}
                    >
                      <i className={`fa-${copied ? "solid fa-check" : "regular fa-copy"} text-[10px]`} />
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Expired reactivate prompt */}
            {isExpired && (
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
                <p className="text-xs text-amber-700 font-semibold flex items-center gap-1.5 mb-3">
                  <i className="fa-solid fa-triangle-exclamation text-amber-500" />
                  This subscription has expired. Reactivate to restore access.
                </p>
                {reactivateError && (
                  <p className="text-xs text-red-600 mb-2 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-xmark" />{reactivateError}
                  </p>
                )}
                <button
                  onClick={handleReactivate}
                  disabled={reactivating || reactivated}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                    reactivated
                      ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default"
                      : reactivating
                      ? "bg-slate-200 text-slate-500 cursor-wait"
                      : "bg-violet-600 hover:bg-violet-700 text-white"
                  }`}
                >
                  {reactivated ? (
                    <><i className="fa-solid fa-check" />Reactivated!</>
                  ) : reactivating ? (
                    <><i className="fa-solid fa-spinner fa-spin" />Processing…</>
                  ) : (
                    <><i className="fa-solid fa-rotate-right" />Reactivate subscription</>
                  )}
                </button>
              </div>
            )}

            {/* Usage bar */}
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 font-medium mb-1.5">
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-chart-bar text-[9px]" />Bandwidth usage
                </span>
                <span>{s.usage.used} / {s.usage.total} {s.usage.unit}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${isExpired ? "bg-slate-300" : c.bar} transition-all duration-700`}
                  style={{ width: `${pct(s.usage.used, s.usage.total)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Details button */}
          <Link
            href={`/dashboard/subscription/${encodeURIComponent(s.id)}`}
            className="shrink-0 flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 px-4 py-2 text-xs font-bold transition-colors shadow-sm"
          >
            Details <i className="fa-solid fa-arrow-right text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SubscriptionList({ subs }: { subs: Sub[] }) {
  if (subs.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 mb-4">
          <i className="fa-solid fa-network-wired text-slate-400 text-xl" />
        </div>
        <p className="text-slate-400 text-sm mb-5">No active proxies yet</p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-colors"
        >
          Browse plans <i className="fa-solid fa-arrow-right text-xs" />
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {subs.map((s) => (
        <SubscriptionCard key={s.id} s={s} />
      ))}
    </div>
  );
}
