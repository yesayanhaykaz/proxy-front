import Link from "next/link";

export function Hero() {
  // Internet background (subtle). Change anytime.
  const bg =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80";

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background image (internet) */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url('${bg}')` }}
        aria-hidden="true"
      />
      {/* Overlay for readability (lighter than before) */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/55 to-slate-950/85" />

      {/* Premium glow layers */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-extrabold text-slate-100">
            <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Global proxies for scraping, SEO & automation
          </div>

          {/* Headline */}
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Fast, Secure & Global{" "}
            <span className="bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
              Proxies
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base leading-relaxed text-slate-200 sm:text-lg">
            Enterprise-grade privacy, speed, and reliability — connect from anywhere with confidence.
            Residential, Mobile, Datacenter and Fast proxies built for scraping, automation, and scale.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Explore Plans
              <span className="ml-2 text-white/80">→</span>
            </Link>
            <Link
              href="/documentation"
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              View Docs
            </Link>
          </div>

          {/* Trust stats (more premium) */}
          <div className="mt-12 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {[
              { k: "99.9%", v: "Uptime", d: "Stable routing & monitoring" },
              { k: "195+", v: "Locations", d: "Country & city targeting" },
              { k: "1 min", v: "Instant Setup", d: "Start using proxies fast" },
              { k: "24/7", v: "Support", d: "Human help when needed" },
            ].map((s) => (
              <div
                key={s.v}
                className="rounded-3xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm transition hover:bg-white/10"
              >
                <div className="text-lg font-extrabold text-white">{s.k}</div>
                <div className="mt-0.5 text-xs font-bold text-slate-200">{s.v}</div>
                <div className="mt-1 text-[11px] leading-snug text-slate-300">{s.d}</div>
              </div>
            ))}
          </div>

          {/* Micro trust line */}
          <p className="mt-8 text-xs font-semibold text-slate-300">
            Works with SEO tools, scrapers, browsers, anti-detect setups, bots and APIs.
          </p>
        </div>
      </div>
    </section>
  );
}
