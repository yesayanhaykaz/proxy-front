"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PlanType = "datacenter" | "residential" | "mobile" | "fast";

const DEMO: Record<PlanType, { name: string; price: number; unit: string; bullets: string[]; href: string }[]> = {
  datacenter: [
    { name: "Starter", price: 9, unit: "/mo", bullets: ["10 IPs", "HTTP/SOCKS", "Fast speed"], href: "/pricing?type=datacenter" },
    { name: "Professional", price: 29, unit: "/mo", bullets: ["50 IPs", "High uptime", "Automation ready"], href: "/pricing?type=datacenter" },
    { name: "Enterprise", price: 99, unit: "/mo", bullets: ["250 IPs", "Dedicated pool", "Priority support"], href: "/pricing?type=datacenter" },
  ],
  residential: [
    { name: "Starter", price: 7, unit: "/GB", bullets: ["Real IPs", "Rotation", "Worldwide"], href: "/pricing?type=residential" },
    { name: "Professional", price: 25, unit: "/GB", bullets: ["Sticky sessions", "Higher success", "Better limits"], href: "/pricing?type=residential" },
    { name: "Enterprise", price: 99, unit: "/GB", bullets: ["Big volume", "Custom locations", "Manager"], href: "/pricing?type=residential" },
  ],
  mobile: [
    { name: "Starter", price: 19, unit: "/GB", bullets: ["3G/4G/5G", "High trust", "Rotation"], href: "/pricing?type=mobile" },
    { name: "Professional", price: 59, unit: "/GB", bullets: ["Stable pool", "Better routing", "Scale ready"], href: "/pricing?type=mobile" },
    { name: "Enterprise", price: 199, unit: "/GB", bullets: ["Custom carriers", "Custom rotation", "Priority"], href: "/pricing?type=mobile" },
  ],
  fast: [
    { name: "Starter", price: 12, unit: "/mo", bullets: ["Low latency", "Quick setup", "Stable"], href: "/pricing?type=fast" },
    { name: "Professional", price: 39, unit: "/mo", bullets: ["More threads", "Better routing", "Great for bots"], href: "/pricing?type=fast" },
    { name: "Enterprise", price: 129, unit: "/mo", bullets: ["Max performance", "Custom pool", "Priority"], href: "/pricing?type=fast" },
  ],
};

const TABS: { key: PlanType; label: string }[] = [
  { key: "datacenter", label: "Datacenter" },
  { key: "residential", label: "Residential" },
  { key: "mobile", label: "Mobile" },
  { key: "fast", label: "Fast" },
];

export function PopularPackages() {
  const [tab, setTab] = useState<PlanType>("datacenter");
  const plans = useMemo(() => DEMO[tab], [tab]);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700">
            Popular picks
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950">Most popular packages</h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">Choose a proxy type — then buy in seconds.</p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={[
                "rounded-2xl px-4 py-2 text-sm font-extrabold transition",
                tab === t.key
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100",
              ].join(" ")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="text-center">
                <div className="text-lg font-extrabold text-slate-950">{p.name}</div>

                <div className="mt-4 text-4xl font-extrabold text-slate-950">
                  ${p.price} <span className="text-sm font-semibold text-slate-500">{p.unit}</span>
                </div>

                <div className="mx-auto mt-4 w-fit rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">
                  LIMITED OFFER
                </div>
              </div>

              <ul className="mt-6 space-y-2 text-sm font-semibold text-slate-600">
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-0.5 text-indigo-600">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Link
                  href={p.href}
                  className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-extrabold text-slate-800 hover:bg-slate-100"
          >
            See all pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
