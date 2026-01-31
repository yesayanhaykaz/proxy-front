import Link from "next/link";
import type { ReactNode } from "react";

type Stat = { k: string; v: string; d: string };

const bg =
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80";

export function AuthShell({
  page,
  badge,
  title,
  subtitle,
  stats,
  rightTopLabel,
  children,
}: {
  page: "Login" | "Register";
  badge: string;
  title: ReactNode;
  subtitle: string;
  stats: Stat[];
  rightTopLabel: string;
  children: ReactNode;
}) {
  return (
    <section className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-35"
        style={{ backgroundImage: `url('${bg}')` }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/55 to-slate-950/85" />

      {/* Glow + dots */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Full-height layout */}
      <div className="relative mx-auto max-w-6xl px-4">
        {/* If you have fixed header, bump this to pt-24 */}
        <div className="min-h-screen pt-10 pb-10 sm:pt-14 sm:pb-14 lg:pt-16 lg:pb-16">
          <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_420px]">
            {/* Left */}
            <div className="max-w-2xl">
              {/* Breadcrumbs */}
              <nav className="text-sm text-slate-300/70" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white">
                  Home
                </Link>{" "}
                <span className="mx-2">/</span>
                <span className="text-slate-200">{page}</span>
              </nav>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-extrabold text-slate-100">
                <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                {badge}
              </div>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                {title}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                {subtitle}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.v}
                    className="rounded-3xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm transition hover:bg-white/10"
                  >
                    <div className="text-lg font-extrabold text-white">{s.k}</div>
                    <div className="mt-0.5 text-xs font-bold text-slate-200">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[11px] leading-snug text-slate-300">
                      {s.d}
                    </div>
                  </div>
                ))}
              </div>

              {/* SEO helper (internal links) */}
              <div className="mt-8 text-xs text-slate-300/70">
                Need proxies?{" "}
                <Link
                  href="/pricing"
                  className="font-extrabold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                >
                  View pricing
                </Link>{" "}
                • Learn more in{" "}
                <Link
                  href="/faqs"
                  className="font-extrabold text-white underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                >
                  FAQs
                </Link>
              </div>
            </div>

            {/* Right card */}
            <div className="rounded-3xl border border-white/12 bg-white/6 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold text-white">{page}</div>
                <span className="rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-extrabold text-slate-100">
                  {rightTopLabel}
                </span>
              </div>

              <div className="mt-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
