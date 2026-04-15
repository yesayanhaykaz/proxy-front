import type { Metadata } from "next";
import { PricingGrid } from "@/components/PricingGrid";
import { getSiteOrigin } from "@/lib/env";
import { getPricingContent } from "@/lib/marketing-content";
import { buildLocalizedMetadata } from "@/lib/seo";
import { localizeHref, type Locale } from "@/lib/i18n";
import Link from "next/link";

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  const titles = {
    en: "Proxy Pricing for SEO, TikTok & Scraping | Proxiesseller",
    es: "Precios de proxies para SEO, TikTok y Scraping | Proxiesseller",
    fr: "Tarifs proxy pour SEO, TikTok et scraping | Proxiesseller",
    de: "Proxy-Preise für SEO, TikTok und Scraping | Proxiesseller",
  } as const;

  const descriptions = {
    en: "Compare residential, mobile, datacenter, and fast proxy plans for scraping, social media automation, SERP tracking, and TikTok operations.",
    es: "Compara planes de proxies residenciales, móviles, datacenter y rápidos para scraping, social media, SERP tracking y TikTok.",
    fr: "Comparez les offres résidentielles, mobiles, datacenter et rapides pour le scraping, les réseaux sociaux, le suivi SERP et TikTok.",
    de: "Vergleiche Residential-, Mobile-, Datacenter- und Fast-Proxies für Scraping, Social Media, SERP-Tracking und TikTok-Workflows.",
  } as const;

  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/pricing",
    title: titles[params.locale],
    description: descriptions[params.locale],
    keywords: ["proxy pricing", "scraping proxies", "tiktok proxies", "seo proxies"],
  });
}

export default async function LocalizedPricingPage({
  params,
}: {
  params: { locale: Locale };
}) {
  const site = getSiteOrigin();
  const pricing = getPricingContent(params.locale);
  const response = await fetch(`${site}/api/plans`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];

  return (
    <main className="bg-[radial-gradient(circle_at_top,#fff4df_0%,#fff_55%)]">
      <section className="border-b border-slate-200 bg-white">
        <div className="container-page py-16">
          <div className="max-w-3xl">
            <div className="inline-flex rounded-full bg-amber-100 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-800">
              Proxiesseller
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950">
              {pricing.title}
            </h1>
            <p className="mt-4 text-lg font-semibold leading-relaxed text-slate-600">
              {pricing.body}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={localizeHref(params.locale, "/proxies-for-scraping")} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50">
                Scraping
              </Link>
              <Link href={localizeHref(params.locale, "/proxies-for-tiktok")} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50">
                TikTok
              </Link>
              <Link href={localizeHref(params.locale, "/residential-proxies")} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-50">
                Residential
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <PricingGrid plans={plans} labels={pricing.labels} />
      </section>
    </main>
  );
}
