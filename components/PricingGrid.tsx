"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ProxyPlan = {
  id: string | number;
  name?: string;
  type?: string;
  country?: string;
  rotation?: string;
  duration?: string;
  protocol?: string;
  price?: number;
  priceUnit?: string;
  bandwidthGb?: number;
  features?: string[];
  popular?: boolean;
};

type Filters = {
  type: string;
  country: string;
  rotation: string;
  duration: string;
  protocol: string;
};

type PricingGridLabels = {
  filterPlans: string;
  resetFilters: string;
  allProxyTypes: string;
  allCountries: string;
  allRotation: string;
  allDurations: string;
  allProtocols: string;
  noPlansFound: string;
  noPlansBody: string;
  buyNow: string;
  rotating: string;
  static: string;
};

const norm = (value?: string) => (value ?? "").trim().toLowerCase();

function titleType(type?: string) {
  const t = (type || "").toLowerCase();
  if (t.includes("res")) return "Residential Proxy";
  if (t.includes("mob")) return "Mobile Proxy";
  if (t.includes("data")) return "Datacenter Proxy";
  if (t.includes("fast")) return "Fast Proxy";
  return "Proxy Plan";
}

function badgeStyle(kind: "static" | "rotating") {
  return kind === "rotating"
    ? "bg-sky-500/15 text-sky-600 border-sky-200"
    : "bg-slate-500/15 text-slate-600 border-slate-200";
}

export function PricingGrid({
  plans,
  labels,
}: {
  plans: ProxyPlan[];
  labels?: Partial<PricingGridLabels>;
}) {
  const copy: PricingGridLabels = {
    filterPlans: labels?.filterPlans || "Filter Plans",
    resetFilters: labels?.resetFilters || "Reset Filters",
    allProxyTypes: labels?.allProxyTypes || "All Proxy Types",
    allCountries: labels?.allCountries || "All Countries",
    allRotation: labels?.allRotation || "All Rotation",
    allDurations: labels?.allDurations || "All Durations",
    allProtocols: labels?.allProtocols || "All Protocols",
    noPlansFound: labels?.noPlansFound || "No plans found",
    noPlansBody:
      labels?.noPlansBody || "Try resetting filters or choosing fewer filters.",
    buyNow: labels?.buyNow || "Buy now",
    rotating: labels?.rotating || "Rotating",
    static: labels?.static || "Static",
  };

  const safePlans = Array.isArray(plans) ? plans : [];
  const [filters, setFilters] = useState<Filters>({
    type: copy.allProxyTypes,
    country: copy.allCountries,
    rotation: copy.allRotation,
    duration: copy.allDurations,
    protocol: copy.allProtocols,
  });

  const options = useMemo(() => {
    const types = new Set<string>();
    const countries = new Set<string>();
    const rotations = new Set<string>();
    const durations = new Set<string>();
    const protocols = new Set<string>();

    for (const plan of safePlans) {
      if (plan.type) types.add(plan.type);
      if (plan.country) countries.add(plan.country);
      if (plan.rotation) rotations.add(plan.rotation);
      if (plan.duration) durations.add(plan.duration);
      if (plan.protocol) protocols.add(plan.protocol);
    }

    const sort = (set: Set<string>) =>
      Array.from(set).sort((left, right) => left.localeCompare(right));

    return {
      types: sort(types),
      countries: sort(countries),
      rotations: sort(rotations),
      durations: sort(durations),
      protocols: sort(protocols),
    };
  }, [safePlans]);

  const filtered = useMemo(() => {
    return safePlans.filter((plan) => {
      const ft = norm(filters.type);
      const fc = norm(filters.country);
      const fr = norm(filters.rotation);
      const fd = norm(filters.duration);
      const fp = norm(filters.protocol);

      if (!ft.startsWith("all") && ft !== norm(plan.type)) return false;
      if (!fc.startsWith("all") && fc !== norm(plan.country)) return false;
      if (!fr.startsWith("all") && fr !== norm(plan.rotation)) return false;
      if (!fd.startsWith("all") && fd !== norm(plan.duration)) return false;
      if (!fp.startsWith("all") && fp !== norm(plan.protocol)) return false;

      return true;
    });
  }, [filters, safePlans]);

  const reset = () =>
    setFilters({
      type: copy.allProxyTypes,
      country: copy.allCountries,
      rotation: copy.allRotation,
      duration: copy.allDurations,
      protocol: copy.allProtocols,
    });

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <i className="bi bi-funnel text-indigo-600" />
            <h2 className="text-lg font-extrabold text-slate-950">{copy.filterPlans}</h2>
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 hover:bg-sky-100"
            type="button"
          >
            <i className="bi bi-arrow-counterclockwise" />
            {copy.resetFilters}
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-5">
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" value={filters.type} onChange={(e) => setFilters((current) => ({ ...current, type: e.target.value }))}>
            <option>{copy.allProxyTypes}</option>
            {options.types.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>

          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" value={filters.country} onChange={(e) => setFilters((current) => ({ ...current, country: e.target.value }))}>
            <option>{copy.allCountries}</option>
            {options.countries.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>

          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" value={filters.rotation} onChange={(e) => setFilters((current) => ({ ...current, rotation: e.target.value }))}>
            <option>{copy.allRotation}</option>
            {options.rotations.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>

          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" value={filters.duration} onChange={(e) => setFilters((current) => ({ ...current, duration: e.target.value }))}>
            <option>{copy.allDurations}</option>
            {options.durations.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>

          <select className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700" value={filters.protocol} onChange={(e) => setFilters((current) => ({ ...current, protocol: e.target.value }))}>
            <option>{copy.allProtocols}</option>
            {options.protocols.map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <div className="text-lg font-extrabold text-slate-950">{copy.noPlansFound}</div>
          <div className="mt-2 text-sm text-slate-600">{copy.noPlansBody}</div>
          <div className="mt-4">
            <button onClick={reset} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700">
              {copy.resetFilters}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((plan) => {
            const rotation = (plan.rotation || "").toLowerCase().includes("rot")
              ? "rotating"
              : "static";
            const protocol = (plan.protocol || "socks").toUpperCase();
            const country = plan.country || "US";
            const name = plan.name || titleType(plan.type);
            const price = typeof plan.price === "number" ? plan.price.toFixed(2) : "0.00";
            const unit = plan.priceUnit || "/ IP";
            const features =
              plan.features && plan.features.length
                ? plan.features
                : [
                    `${plan.bandwidthGb ?? 5}GB Bandwidth`,
                    rotation === "rotating" ? "Rotating IPs Every 10 Min" : "Static IP",
                    "High Anonymity",
                    "Secure",
                    "No IP Bans",
                  ];

            return (
              <div key={String(plan.id)} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,0.08)]">
                <div className="flex items-center justify-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50">
                    <i className="bi bi-clipboard2-check text-2xl text-slate-700" />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="text-2xl font-extrabold text-slate-950">{name}</div>
                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${badgeStyle(rotation as "static" | "rotating")}`}>
                      {rotation === "rotating" ? copy.rotating : copy.static}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                      <i className="bi bi-geo-alt" />
                      {country}
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-bold text-slate-700">
                      <i className="bi bi-diagram-3" />
                      {protocol}
                    </span>
                  </div>

                  <div className="mt-6 text-4xl font-extrabold text-indigo-600">
                    ${price} <span className="text-2xl font-extrabold text-indigo-600">{unit}</span>
                  </div>
                </div>

                <ul className="mt-7 space-y-3">
                  {features.slice(0, 6).map((feature, index) => (
                    <li key={`${feature}-${index}`} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <i className="bi bi-check2" />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link href={`/checkout?plan=${encodeURIComponent(String(plan.id))}`} className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-500">
                    {copy.buyNow} →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
