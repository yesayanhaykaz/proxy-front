"use client";

import { useState } from "react";

interface Props {
  proxyStr: string | null;
  purchaseId: string;
  isActive: boolean;
}

export default function SubscriptionDetailClient({ proxyStr, purchaseId, isActive }: Props) {
  const [copied, setCopied]               = useState(false);
  const [reactivating, setReactivating]   = useState(false);
  const [reactivated, setReactivated]     = useState(false);
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
        body: JSON.stringify({ purchase_id: purchaseId }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Reactivation failed");
      }
      setReactivated(true);
      setTimeout(() => window.location.reload(), 1200);
    } catch (err: any) {
      setReactivateError(err.message || "Something went wrong");
    } finally {
      setReactivating(false);
    }
  }

  return (
    <div className="space-y-3 mt-4">
      {/* Full proxy string copy row — only for active */}
      {isActive && proxyStr && (
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-1.5">
            <i className="fa-solid fa-terminal text-slate-300" />Full proxy string
          </p>
          <div className="flex items-center gap-2">
            <code className="flex-1 min-w-0 truncate bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[12px] font-medium" style={{ fontFamily: "'JetBrains Mono', monospace", color: "#475569" }}>
              {proxyStr}
            </code>
            <button
              onClick={handleCopy}
              className={`shrink-0 flex items-center gap-2 rounded-xl px-4 py-3 text-xs font-bold transition-all ${
                copied
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-900 hover:bg-slate-700 text-white"
              }`}
            >
              <i className={`fa-${copied ? "solid fa-check" : "regular fa-copy"}`} />
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      )}

      {/* Reactivate button — only for expired */}
      {!isActive && (
        <div>
          {reactivateError && (
            <p className="text-xs text-red-600 mb-2 flex items-center gap-1.5">
              <i className="fa-solid fa-circle-xmark" />{reactivateError}
            </p>
          )}
          <button
            onClick={handleReactivate}
            disabled={reactivating || reactivated}
            className={`inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold transition-all ${
              reactivated
                ? "bg-emerald-100 text-emerald-700 border border-emerald-200 cursor-default"
                : reactivating
                ? "bg-slate-200 text-slate-500 cursor-wait"
                : "bg-violet-600 hover:bg-violet-700 text-white"
            }`}
          >
            {reactivated ? (
              <><i className="fa-solid fa-check" />Reactivated! Refreshing…</>
            ) : reactivating ? (
              <><i className="fa-solid fa-spinner fa-spin" />Processing…</>
            ) : (
              <><i className="fa-solid fa-rotate-right" />Reactivate subscription</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
