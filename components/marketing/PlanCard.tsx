"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";

type PreviewPlan = {
  id: string;
  title: string;
  price: string;
  bullets: string[];
  badges?: string[];
  subtitle?: string;
  bestFor?: string[];
  href?: string;
  popular?: boolean;
};

export function PlanCard({
  typeSlug,
  title,
  price,
  bullets,
  badges,
  subtitle,
  bestFor,
  href,
  popular,
}: PreviewPlan & { typeSlug: string }) {
  const router = useRouter();

  const handleBuy = () => {
    const isLoggedIn = document.cookie.includes("ps_session=");
    const checkoutUrl = href ?? `/checkout?plan=${encodeURIComponent(title)}&type=${typeSlug}`;
    if (!isLoggedIn) {
      router.push(`/auth/login?next=${encodeURIComponent(checkoutUrl)}`);
      return;
    }
    router.push(checkoutUrl);
  };

  const defaultBadges =
    badges?.length
      ? badges
      : typeSlug === "residential"
      ? ["Rotating", "HTTP/SOCKS5", "Sticky"]
      : typeSlug === "mobile"
      ? ["4G/5G", "Rotating", "High trust"]
      : typeSlug === "datacenter"
      ? ["Static", "Blazing fast", "Affordable"]
      : ["Optimized", "Low latency", "Stable"];

  return (
    <div
      className={`relative rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        popular ? "border-indigo-200 ring-1 ring-indigo-100" : "border-slate-200"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
          Most popular
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <div className="mt-1 text-sm font-semibold text-slate-500">
            {subtitle ?? "Instant activation · Upgrade anytime"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-indigo-600">{price}</div>
          <div className="mt-1 text-xs font-semibold text-slate-500">Best value</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {defaultBadges.map((b) => (
          <span
            key={b}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
          >
            {b}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2">
        {bullets.slice(0, 6).map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-4 w-4" />
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      {bestFor?.length ? (
        <div className="mt-4">
          <div className="text-xs font-extrabold text-slate-900">Best for</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {bestFor.map((t) => (
              <span key={t} className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-bold text-indigo-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-600">
        Secure checkout · Instant activation · 24/7 support
      </div>

      <button
        onClick={handleBuy}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[.98]"
      >
        Buy Now →
      </button>
    </div>
  );
}