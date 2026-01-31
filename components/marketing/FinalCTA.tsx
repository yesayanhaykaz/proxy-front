import Link from "next/link";

export function FinalCTA() {
  const bg =
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=2400&q=80";

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Internet background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${bg}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/60 to-slate-950/90" />

      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-[32px] border border-white/12 bg-white/6 p-10 text-center backdrop-blur-sm">
          <div className="mx-auto inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-extrabold text-slate-100">
            Start in minutes
          </div>

          <h3 className="mt-5 text-3xl font-extrabold text-white">Ready to get started?</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm font-semibold text-slate-300">
            Pick a proxy type, choose a plan, and connect fast. Need custom locations, volume, or routing? Contact sales.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-indigo-500"
            >
              View Pricing
              <span className="ml-2 text-white/80">→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-7 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              Contact Sales
            </Link>
          </div>

          <div className="mt-8 text-xs font-semibold text-slate-300">
            Residential • Mobile • Datacenter • Fast — built for scraping, automation, ads & SEO.
          </div>
        </div>
      </div>
    </section>
  );
}
