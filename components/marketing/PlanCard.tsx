"use client";

import { useRouter } from "next/navigation";
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

type Labels = {
  mostPopular?: string;
  bestValue?: string;
  bestFor?: string;
  secureCheckout?: string;
  buyNow?: string;
};

export function PlanCard({
  id,
  typeSlug,
  title,
  price,
  bullets,
  badges,
  subtitle,
  bestFor,
  href,
  popular,
  labels,
}: PreviewPlan & { typeSlug: string; labels?: Labels }) {
  const router = useRouter();
  const copy = {
    mostPopular: labels?.mostPopular || "Most popular",
    bestValue: labels?.bestValue || "Best value",
    bestFor: labels?.bestFor || "Best for",
    secureCheckout:
      labels?.secureCheckout || "Secure checkout · Instant activation · 24/7 support",
    buyNow: labels?.buyNow || "Buy now",
  };

  const handleBuy = () => {
    const isLoggedIn = document.cookie.includes("ps_session=");
    const checkoutUrl = href ?? `/checkout?plan=${encodeURIComponent(id)}`;
    if (!isLoggedIn) {
      router.push(href ?? `/checkout?plan=${encodeURIComponent(id)}`);
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
          {copy.mostPopular}
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
          <div className="mt-1 text-xs font-semibold text-slate-500">{copy.bestValue}</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {defaultBadges.map((badge) => (
          <span
            key={badge}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
          >
            {badge}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2">
        {bullets.slice(0, 6).map((bullet) => (
          <li key={bullet} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-4 w-4" />
            </span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      {bestFor?.length ? (
        <div className="mt-4">
          <div className="text-xs font-extrabold text-slate-900">{copy.bestFor}</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {bestFor.map((item) => (
              <span key={item} className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-bold text-indigo-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-600">
        {copy.secureCheckout}
      </div>

      <button
        onClick={handleBuy}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500 active:scale-[.98]"
      >
        {copy.buyNow} →
      </button>
    </div>
  );
}
