"use client";

import { useState } from "react";

type Country = { name: string; code: string };

const BASE: Country[] = [
  { name: "United States", code: "us" },
  { name: "Canada", code: "ca" },
  { name: "France", code: "fr" },
  { name: "Netherlands", code: "nl" },
  { name: "Russian Federation", code: "ru" },
  { name: "Italy", code: "it" },
  { name: "Europe", code: "eu" },
];

const MORE: Country[] = [
  { name: "Germany", code: "de" },
  { name: "United Kingdom", code: "gb" },
  { name: "Spain", code: "es" },
  { name: "Brazil", code: "br" },
  { name: "Turkey", code: "tr" },
  { name: "India", code: "in" },
  { name: "Singapore", code: "sg" },
  { name: "Japan", code: "jp" },
  { name: "Australia", code: "au" },
];

export function Locations() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? [...BASE, ...MORE] : BASE;
  const moreCount = 100;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold text-slate-700">
            Global reach
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950">Locations worldwide</h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            We continuously expand coverage. Need a specific location? Contact support and we’ll help.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((c) => (
            <div
              key={c.name}
              className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 text-center shadow-sm transition hover:bg-white hover:shadow-md"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://flagcdn.com/w80/${c.code}.png`}
                alt={`${c.name} flag`}
                width={48}
                height={36}
                className="mx-auto mb-3 rounded-md"
                style={{ objectFit: "cover" }}
              />
              <div className="text-sm font-extrabold text-slate-950">{c.name}</div>
              <div className="mt-2 h-1 w-10 rounded-full bg-indigo-600/20 transition group-hover:bg-indigo-600/35 mx-auto" />
            </div>
          ))}

          {!expanded && (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
              <div className="text-lg font-extrabold text-slate-950">+{moreCount} more</div>
              <div className="mt-1 text-xs font-semibold text-slate-600">See additional locations</div>
              <button
                onClick={() => setExpanded(true)}
                className="mt-4 inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-2.5 text-xs font-extrabold text-white transition hover:bg-indigo-500"
              >
                Show more
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
