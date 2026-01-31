const FEATURES = [
  {
    title: "Blazing Fast Speed",
    desc: "Low latency routes and stable throughput for automation, bots, and scrapers.",
    icon: "fas fa-bolt",
  },
  {
    title: "Secure & Anonymous",
    desc: "Privacy-first proxy infrastructure with flexible authorization options.",
    icon: "fas fa-lock",
  },
  {
    title: "Global Coverage",
    desc: "Geo targeting options for multi-region workflows and reliable access.",
    icon: "fas fa-globe",
  },
];

export function FeatureCards() {
  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto inline-flex rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-extrabold text-slate-700">
            Built for scale
          </div>
          <h2 className="mt-5 text-3xl font-extrabold text-slate-950">
            Speed, privacy, and reliability — without compromise
          </h2>
          <p className="mt-3 text-sm font-semibold text-slate-600">
            Residential, Mobile, Datacenter and Fast proxies — choose the perfect network for your workload.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-xl text-indigo-600">
                <i className={f.icon} />
              </div>

              <h3 className="mt-5 text-lg font-extrabold text-slate-950">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{f.desc}</p>

              <div className="mt-6 h-1 w-14 rounded-full bg-indigo-600/20 transition group-hover:bg-indigo-600/35" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
