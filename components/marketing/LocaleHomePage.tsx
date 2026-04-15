"use client";

import Link from "next/link";
import { Globe2, Layers3, Radar, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { localizeHref, type Locale } from "@/lib/i18n";

type HomeCopy = {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  stats: readonly { value: string; label: string }[];
  audienceTitle: string;
  audienceBody: string;
  cards: readonly { title: string; body: string }[];
  seoTitle: string;
  seoBody: string;
  socialTitle: string;
  socialBody: string;
  scrapingTitle: string;
  scrapingBody: string;
  finalTitle: string;
  finalBody: string;
};

export function LocaleHomePage({
  locale,
  copy,
}: {
  locale: Locale;
  copy: HomeCopy;
}) {
  const cards = [
    { icon: Radar, ...copy.cards[0] },
    { icon: ShieldCheck, ...copy.cards[1] },
    { icon: Globe2, ...copy.cards[2] },
  ];

  return (
    <main className="overflow-hidden bg-[radial-gradient(circle_at_top,#fff6d8_0%,#fff7eb_35%,#fff_70%)]">
      <section className="relative overflow-hidden border-b border-amber-100">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(30,41,59,0.92)_45%,rgba(15,118,110,0.88))]" />
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-amber-300/20 blur-3xl" />
        <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full bg-cyan-300/15 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:py-28">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-100">
              <Sparkles className="h-4 w-4" />
              {copy.badge}
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-7xl">
              {copy.title}{" "}
              <span className="bg-gradient-to-r from-amber-200 via-orange-300 to-cyan-200 bg-clip-text text-transparent">
                {copy.highlight}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-slate-200">
              {copy.subtitle}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localizeHref(locale, "/pricing")}
                className="inline-flex items-center justify-center rounded-2xl bg-[#ff8a3d] px-7 py-3.5 text-sm font-black text-white shadow-[0_18px_45px_rgba(255,138,61,0.35)] transition hover:-translate-y-0.5 hover:bg-[#ff7b26]"
              >
                {copy.primaryCta}
              </Link>
              <Link
                href={localizeHref(locale, "/proxy-builder")}
                className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/10 px-7 py-3.5 text-sm font-black text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                {copy.secondaryCta}
              </Link>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {copy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-[26px] border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                >
                  <div className="text-3xl font-black text-white">{stat.value}</div>
                  <div className="mt-1 text-sm font-semibold text-slate-200">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          {cards.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 via-orange-50 to-cyan-50 text-slate-900">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="mt-5 text-xl font-black text-slate-950">{title}</h2>
              <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[34px] border border-slate-200 bg-[#fff7ea] p-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ffd9bd] px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#7a2d00]">
              <Zap className="h-4 w-4" />
              {copy.audienceTitle}
            </div>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-relaxed text-slate-700">
              {copy.audienceBody}
            </p>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Layers3 className="h-4 w-4 text-[#ff8a3d]" />
                  {copy.seoTitle}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600">{copy.seoBody}</p>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Sparkles className="h-4 w-4 text-[#ff8a3d]" />
                  {copy.socialTitle}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600">{copy.socialBody}</p>
              </div>
              <div className="rounded-2xl bg-white p-5">
                <div className="flex items-center gap-2 text-sm font-black text-slate-900">
                  <Radar className="h-4 w-4 text-[#ff8a3d]" />
                  {copy.scrapingTitle}
                </div>
                <p className="mt-2 text-sm font-semibold text-slate-600">{copy.scrapingBody}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] bg-[linear-gradient(135deg,#0f172a,#111827_50%,#0f766e)] p-8 text-white shadow-[0_22px_70px_rgba(15,23,42,0.24)]">
            <div className="inline-flex rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-100">
              Proxiesseller
            </div>
            <h2 className="mt-6 text-3xl font-black leading-tight">{copy.finalTitle}</h2>
            <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-200">
              {copy.finalBody}
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={localizeHref(locale, "/residential-proxies")}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
              >
                Residential Proxies
              </Link>
              <Link
                href={localizeHref(locale, "/proxies-for-scraping")}
                className="rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-sm font-black text-white transition hover:bg-white/12"
              >
                Scraping Proxies
              </Link>
              <Link
                href={localizeHref(locale, "/proxies-for-tiktok")}
                className="rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-sm font-black text-white transition hover:bg-white/12"
              >
                TikTok Proxies
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
