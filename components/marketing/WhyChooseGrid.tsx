const ITEMS = [
  { icon: "fas fa-bolt", title: "Low latency routing", text: "Optimized paths for scraping, bots, SEO tools, and APIs." },
  { icon: "fas fa-shield-halved", title: "Privacy-first", text: "Secure proxy infrastructure with flexible authentication methods." },
  { icon: "fas fa-globe", title: "Global coverage", text: "Target locations worldwide for stable multi-region operations." },
  { icon: "fas fa-rotate", title: "Rotation control", text: "Sticky or rotating sessions — you choose the best strategy." },
  { icon: "fas fa-chart-line", title: "Scales with you", text: "From small tests to enterprise workloads without rebuilding." },
  { icon: "fas fa-code", title: "Developer friendly", text: "Docs, predictable behavior, and automation-ready tooling." },
  { icon: "fas fa-headset", title: "24/7 support", text: "Human support to solve issues fast when it matters." },
  { icon: "fas fa-robot", title: "Automation ready", text: "Built for browsers, scrapers, multi-accounting, and pipelines." },
  { icon: "fas fa-tags", title: "Fair pricing", text: "Simple plans with clear value — no confusing extras." },
];

export function WhyChooseGrid() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-extrabold text-slate-700">
            Why Proxiesseller
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950">Built for speed, stability, and scale</h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Everything you need to run reliable proxy workflows — from quick tests to big automation.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ITEMS.map((x) => (
            <div
              key={x.title}
              className="group rounded-[28px] border border-slate-200 bg-slate-50 p-7 transition hover:bg-white hover:shadow-sm"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl text-indigo-600">
                <i className={x.icon} />
              </div>
              <div className="mt-5 text-lg font-extrabold text-slate-950">{x.title}</div>
              <div className="mt-2 text-sm font-semibold text-slate-600">{x.text}</div>
              <div className="mt-6 h-1 w-14 rounded-full bg-indigo-600/20 transition group-hover:bg-indigo-600/35" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
