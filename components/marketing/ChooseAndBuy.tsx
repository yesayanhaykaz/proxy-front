"use client";

import { useMemo, useState } from "react";

type ProxyType = "residential" | "mobile" | "datacenter" | "fast";

const TYPE_LABEL: Record<ProxyType, string> = {
  residential: "Residential",
  mobile: "Mobile",
  datacenter: "Datacenter",
  fast: "Fast",
};

const LOCS = [
  { label: "United States", code: "us" },
  { label: "United Kingdom", code: "gb" },
  { label: "Germany", code: "de" },
  { label: "France", code: "fr" },
  { label: "Netherlands", code: "nl" },
];

const TYPE_HELP: Record<ProxyType, { title: string; text: string; icon: string }> = {
  residential: {
    title: "Residential",
    text: "Best for strict targets and high success rates (SERP, socials, marketplaces).",
    icon: "fas fa-house",
  },
  datacenter: {
    title: "Datacenter",
    text: "Fast, stable and cost-effective for automation, SEO tools, and bulk tasks.",
    icon: "fas fa-server",
  },
  mobile: {
    title: "Mobile",
    text: "Highest trust level for ads, socials and sensitive automation workflows.",
    icon: "fas fa-signal",
  },
  fast: {
    title: "Fast",
    text: "Optimized low latency routes for bots, APIs, and high-throughput workloads.",
    icon: "fas fa-bolt",
  },
};

export function ChooseAndBuy() {
  const [type, setType] = useState<ProxyType>("residential");
  const [loc, setLoc] = useState("us");
  const [qty, setQty] = useState(2);
  const [duration, setDuration] = useState(30);

  const pricePerIp = useMemo(() => {
    const base =
      type === "residential" ? 7.49 :
      type === "mobile" ? 9.99 :
      type === "datacenter" ? 4.99 :
      5.99;

    const locFactor = loc === "us" ? 1 : loc === "gb" ? 1.05 : 1.1;
    const durFactor = duration >= 90 ? 0.85 : duration >= 60 ? 0.92 : 1;

    return Math.round(base * locFactor * durFactor * 100) / 100;
  }, [type, loc, duration]);

  const total = useMemo(() => Math.round(pricePerIp * qty * 100) / 100, [pricePerIp, qty]);

  const selectedText =
    `${TYPE_LABEL[type]} • ${loc.toUpperCase()} • ${qty} IP • ` +
    (duration === 30 ? "1 Month" : duration === 60 ? "2 Months" : "3 Months");

  const buyHref = `/pricing?type=${type}&loc=${loc}&qty=${qty}&days=${duration}`;

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold text-slate-700">
            Quick configurator
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950">Choose and buy in seconds</h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Select a proxy type, location, quantity, and duration — we’ll estimate your price instantly.
          </p>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          {/* Left: Config */}
          <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Proxy Type">
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as ProxyType)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value="residential">Residential</option>
                  <option value="mobile">Mobile</option>
                  <option value="datacenter">Datacenter</option>
                  <option value="fast">Fast</option>
                </select>
              </Field>

              <Field label="Location">
                <select
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  {LOCS.map((l) => (
                    <option key={l.code} value={l.code}>
                      {l.label}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Quantity">
                <input
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300"
                />
              </Field>

              <Field label="Duration">
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-300"
                >
                  <option value={30}>1 Month</option>
                  <option value={60}>2 Months</option>
                  <option value={90}>3 Months</option>
                </select>
              </Field>
            </div>

            <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-slate-700">Estimated price / IP</div>
                <div className="text-sm font-extrabold text-indigo-600">${pricePerIp}</div>
              </div>

              <div className="mt-3 flex items-end justify-between">
                <div className="text-sm font-semibold text-slate-600">Total</div>
                <div className="text-3xl font-extrabold text-slate-950">${total}</div>
              </div>

              <div className="mt-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-extrabold text-amber-800">
                LIMITED OFFER — pricing may change
              </div>

              <a
                href={buyHref}
                className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Buy Now
              </a>

              <div className="mt-3 text-xs font-semibold text-slate-500">
                Selected: <span className="text-slate-700">{selectedText}</span>
              </div>
            </div>
          </div>

          {/* Right: Explanation */}
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
            <div className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Best match for your workflow
            </div>

            <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-start gap-4">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl text-indigo-600">
                  <i className={TYPE_HELP[type].icon} />
                </div>
                <div>
                  <div className="text-lg font-extrabold text-slate-950">{TYPE_HELP[type].title} Proxies</div>
                  <div className="mt-1 text-sm font-semibold text-slate-600">{TYPE_HELP[type].text}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {(["residential", "datacenter", "mobile"] as ProxyType[]).map((k) => (
                <MiniCard
                  key={k}
                  active={k === type}
                  title={`${TYPE_HELP[k].title} Proxies`}
                  text={TYPE_HELP[k].text}
                  icon={TYPE_HELP[k].icon}
                />
              ))}
            </div>

            <div className="mt-6 text-xs font-semibold text-slate-500">
              Tip: For strict websites, start with <span className="text-slate-700">Residential</span> or{" "}
              <span className="text-slate-700">Mobile</span>. For performance at scale, use{" "}
              <span className="text-slate-700">Datacenter</span> or <span className="text-slate-700">Fast</span>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-xs font-extrabold text-slate-700">{label}</div>
      {children}
    </div>
  );
}

function MiniCard({
  title,
  text,
  icon,
  active,
}: {
  title: string;
  text: string;
  icon: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl border p-5 transition",
        active
          ? "border-indigo-200 bg-indigo-50"
          : "border-slate-200 bg-slate-50 hover:bg-white hover:shadow-sm",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        <div className={["mt-0.5 text-xl", active ? "text-indigo-700" : "text-indigo-600"].join(" ")}>
          <i className={icon} />
        </div>
        <div>
          <div className="text-sm font-extrabold text-slate-950">{title}</div>
          <div className="mt-1 text-sm font-semibold text-slate-600">{text}</div>
        </div>
      </div>
    </div>
  );
}
