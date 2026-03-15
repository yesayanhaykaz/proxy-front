import Link from "next/link";

export function Hero() {
  const bg =
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80";

  return (
    <section className="relative overflow-hidden bg-slate-950">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');

        .hero-font { font-family: 'Sora', sans-serif; }

        /* Particle grid */
        .hero-grid {
          background-image:
            linear-gradient(rgba(99,102,241,.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99,102,241,.07) 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* Primary CTA — "Explore Plans" */
        .cta-primary {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          box-shadow: 0 0 0 1px rgba(99,102,241,.5), 0 4px 24px rgba(99,102,241,.4);
          transition: transform .18s, box-shadow .18s;
          overflow: hidden;
          text-decoration: none;
        }
        .cta-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity .18s;
        }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 0 0 1px rgba(99,102,241,.6), 0 8px 32px rgba(99,102,241,.55); }
        .cta-primary:hover::before { opacity: 1; }
        .cta-primary:active { transform: scale(.97); }
        .cta-arrow { transition: transform .2s; }
        .cta-primary:hover .cta-arrow { transform: translateX(4px); }

        /* Secondary CTA — "View Docs" */
        .cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 700;
          color: rgba(255,255,255,.85);
          background: rgba(255,255,255,.06);
          border: 1px solid rgba(255,255,255,.12);
          backdrop-filter: blur(8px);
          transition: background .18s, border-color .18s, transform .18s, color .18s;
          text-decoration: none;
        }
        .cta-secondary:hover {
          background: rgba(255,255,255,.11);
          border-color: rgba(255,255,255,.22);
          color: #fff;
          transform: translateY(-1px);
        }
        .cta-secondary:active { transform: scale(.97); }

        /* Builder CTA — "Build Your Proxy" */
        @keyframes shimmer-move {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 1px rgba(56,189,248,.4), 0 4px 24px rgba(56,189,248,.25); }
          50%       { box-shadow: 0 0 0 1px rgba(56,189,248,.7), 0 8px 40px rgba(56,189,248,.5); }
        }
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.4); opacity: .7; }
        }
        .cta-builder {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          border-radius: 14px;
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #0ea5e9 100%);
          background-size: 200% auto;
          animation: shimmer-move 3s linear infinite, pulse-glow 2.5s ease-in-out infinite;
          transition: transform .18s;
          overflow: hidden;
          text-decoration: none;
        }
        .cta-builder::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.18) 0%, transparent 50%);
          opacity: 0;
          transition: opacity .18s;
        }
        .cta-builder:hover { transform: translateY(-2px) scale(1.03); }
        .cta-builder:hover::after { opacity: 1; }
        .cta-builder:active { transform: scale(.97); }
        .cta-builder .b-arrow { transition: transform .2s; }
        .cta-builder:hover .b-arrow { transform: translateX(5px); }
        .live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #a5f3fc;
          animation: dot-pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }

        /* Stat card hover */
        .stat-card {
          transition: background .2s, transform .2s, border-color .2s;
        }
        .stat-card:hover {
          background: rgba(255,255,255,.1) !important;
          border-color: rgba(255,255,255,.2) !important;
          transform: translateY(-2px);
        }

        /* Badge pulse */
        .badge-dot { animation: dot-pulse 2s ease-in-out infinite; }

        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .fu  { animation: fadeUp .6s ease both; }
        .fu1 { animation-delay: .1s; }
        .fu2 { animation-delay: .22s; }
        .fu3 { animation-delay: .34s; }
        .fu4 { animation-delay: .46s; }
        .fu5 { animation-delay: .58s; }
      ` }} />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url('${bg}')` }}
        aria-hidden="true"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/55 to-slate-950/90" />

      {/* Grid texture */}
      <div className="hero-grid absolute inset-0 opacity-60" aria-hidden="true" />

      {/* Glow orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/15 blur-3xl" />
        <div className="absolute -bottom-48 right-[-80px] h-[500px] w-[500px] rounded-full bg-sky-500/12 blur-3xl" />
        <div className="absolute top-1/2 left-[-100px] h-[350px] w-[350px] -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 hero-font">
        <div className="mx-auto max-w-3xl text-center">

          {/* Badge */}
          <div className="fu mx-auto inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-slate-200 backdrop-blur-sm mb-8">
            <span className="badge-dot inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            Global proxies for scraping, SEO &amp; automation
          </div>

          {/* Headline */}
          <h1 className="fu fu1 text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.08]">
            Fast, Secure &amp;{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Global
              </span>
              {/* Underline accent */}
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-violet-400 opacity-60" />
            </span>
            {" "}Proxies
          </h1>

          {/* Sub */}
          <p className="fu fu2 mt-7 text-base leading-relaxed text-slate-300 sm:text-lg max-w-2xl mx-auto">
            Enterprise-grade privacy, speed, and reliability — connect from anywhere with confidence.
            Residential, Mobile, Datacenter and Fast proxies built for scraping, automation, and scale.
          </p>

          {/* CTA buttons */}
          <div className="fu fu3 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pricing" className="cta-primary">
              Explore Plans
              <span className="cta-arrow">→</span>
            </Link>

            <Link href="/documentation" className="cta-secondary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
              View Docs
            </Link>

            <Link href="/proxy-builder" className="cta-builder">
              <span className="live-dot" />
              Build Your Proxy
              <span className="b-arrow">→</span>
            </Link>
          </div>

          {/* Builder hint */}
          <p className="fu fu4 mt-4 text-sm font-semibold text-sky-400/90 flex items-center justify-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Configure location, protocol and traffic in seconds
          </p>

          {/* Stats */}
          <div className="fu fu5 mt-14 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
            {[
              { k: "99.9%", v: "Uptime",        d: "Stable routing & monitoring",  icon: "◎" },
              { k: "195+",  v: "Locations",      d: "Country & city targeting",      icon: "◈" },
              { k: "1 min", v: "Instant Setup",  d: "Start using proxies fast",      icon: "⚡" },
              { k: "24/7",  v: "Support",        d: "Human help when needed",        icon: "✦" },
            ].map((s) => (
              <div
                key={s.v}
                className="stat-card rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="text-xs text-white/30 mb-2">{s.icon}</div>
                <div className="text-xl font-extrabold text-white tracking-tight">{s.k}</div>
                <div className="mt-0.5 text-xs font-bold text-slate-200">{s.v}</div>
                <div className="mt-1.5 text-[11px] leading-snug text-slate-400">{s.d}</div>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <p className="mt-8 text-xs font-medium text-slate-500">
            Works with SEO tools, scrapers, browsers, anti-detect setups, bots and APIs.
          </p>
        </div>
      </div>
    </section>
  );
}