"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type ProxyPlan = {
  id: string | number;
  name?: string; // "Residential Proxy"
  type?: string; // residential | mobile | datacenter | fast
  country?: string; // US, EU, Asia, etc
  rotation?: string; // static | rotating
  duration?: string; // 7 days | 30 days | 1 month | etc
  protocol?: string; // socks | http | https
  price?: number; // 2.99
  priceUnit?: string; // "/ IP" or "/ GB"
  bandwidthGb?: number; // 5
  features?: string[]; // list bullets
  popular?: boolean;
};

type Filters = {
  type: string;
  country: string;
  rotation: string;
  duration: string;
  protocol: string;
};

const norm = (v?: string) => (v ?? "").trim().toLowerCase();

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

export function PricingGrid({ plans }: { plans: ProxyPlan[] }) {
  const safePlans = Array.isArray(plans) ? plans : [];

  const [filters, setFilters] = useState<Filters>({
    type: "All Proxy Types",
    country: "All Countries",
    rotation: "All Rotation",
    duration: "All Durations",
    protocol: "All Protocols",
  });

  const options = useMemo(() => {
    const types = new Set<string>();
    const countries = new Set<string>();
    const rotations = new Set<string>();
    const durations = new Set<string>();
    const protocols = new Set<string>();

    for (const p of safePlans) {
      if (p.type) types.add(p.type);
      if (p.country) countries.add(p.country);
      if (p.rotation) rotations.add(p.rotation);
      if (p.duration) durations.add(p.duration);
      if (p.protocol) protocols.add(p.protocol);
    }

    const sort = (a: Set<string>) => Array.from(a).sort((x, y) => x.localeCompare(y));

    return {
      types: sort(types),
      countries: sort(countries),
      rotations: sort(rotations),
      durations: sort(durations),
      protocols: sort(protocols),
    };
  }, [safePlans]);

  const filtered = useMemo(() => {
    return safePlans.filter((p) => {
      const t = norm(p.type);
      const c = norm(p.country);
      const r = norm(p.rotation);
      const d = norm(p.duration);
      const pr = norm(p.protocol);

const ft = norm(filters.type);
const fc = norm(filters.country);
const fr = norm(filters.rotation);
const fd = norm(filters.duration);
const fpr = norm(filters.protocol);

if (!ft.startsWith("all") && ft !== t) return false;
if (!fc.startsWith("all") && fc !== c) return false;
if (!fr.startsWith("all") && fr !== r) return false;
if (!fd.startsWith("all") && fd !== d) return false;
if (!fpr.startsWith("all") && fpr !== pr) return false;

      return true;
    });
  }, [safePlans, filters]);

  const reset = () =>
    setFilters({
      type: "All Proxy Types",
      country: "All Countries",
      rotation: "All Rotation",
      duration: "All Durations",
      protocol: "All Protocols",
    });

  return (
    <div className="space-y-8">
      {/* Filter bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <i className="bi bi-funnel text-indigo-600" />
            <h2 className="text-lg font-extrabold text-slate-950">Filter Plans</h2>
          </div>

          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700 hover:bg-sky-100"
            type="button"
          >
            <i className="bi bi-arrow-counterclockwise" />
            Reset Filters
          </button>
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-5">
          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            value={filters.type}
            onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
          >
            <option>All Proxy Types</option>
            {options.types.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            value={filters.country}
            onChange={(e) => setFilters((f) => ({ ...f, country: e.target.value }))}
          >
            <option>All Countries</option>
            {options.countries.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            value={filters.rotation}
            onChange={(e) => setFilters((f) => ({ ...f, rotation: e.target.value }))}
          >
            <option>All Rotation</option>
            {options.rotations.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            value={filters.duration}
            onChange={(e) => setFilters((f) => ({ ...f, duration: e.target.value }))}
          >
            <option>All Durations</option>
            {options.durations.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>

          <select
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700"
            value={filters.protocol}
            onChange={(e) => setFilters((f) => ({ ...f, protocol: e.target.value }))}
          >
            <option>All Protocols</option>
            {options.protocols.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cards */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
          <div className="text-lg font-extrabold text-slate-950">No plans found</div>
          <div className="mt-2 text-sm text-slate-600">Try resetting filters or choosing fewer filters.</div>
          <div className="mt-4">
            <button
              onClick={reset}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700"
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const rotation = (p.rotation || "").toLowerCase().includes("rot") ? "rotating" : "static";
            const protocol = (p.protocol || "socks").toUpperCase();
            const country = p.country || "US";
            const name = p.name || titleType(p.type);
            const price = typeof p.price === "number" ? p.price.toFixed(2) : "0.00";
            const unit = p.priceUnit || "/ IP";

            const feats =
              p.features && p.features.length
                ? p.features
                : [
                    `${p.bandwidthGb ?? 5}GB Bandwidth`,
                    rotation === "rotating" ? "Rotating IPs Every 10 Min" : "Static IP",
                    "High Anonymity",
                    "Secure",
                    "No IP Bans",
                  ];

            return (
              <div
                key={String(p.id)}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_15px_50px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-center">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-50">
                    <i className="bi bi-clipboard2-check text-2xl text-slate-700" />
                  </div>
                </div>

                <div className="mt-6 text-center">
                  <div className="text-2xl font-extrabold text-slate-950">{name}</div>

                  <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-bold ${badgeStyle(rotation as any)}`}>
                      {rotation === "rotating" ? "Rotating" : "Static"}
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
                  {feats.slice(0, 6).map((f, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm font-semibold text-slate-700">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-sky-600">
                        <i className="bi bi-check2" />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Link
                    href={`/checkout?plan=${encodeURIComponent(String(p.id))}`}
                    className="inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white hover:bg-indigo-500"
                  >
                    Buy now →
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
