import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Scraping proxies for SERP, product data, and anti-bot targets | Proxiesseller",
    description: "Localized scraping proxy page for SERP tracking, e-commerce extraction, anti-bot resistant collection, and data pipelines.",
    headline: "Scraping proxies built for production-grade data collection",
    subheadline: "Use rotating and sticky proxy workflows for SERP monitoring, competitor intelligence, e-commerce scraping, and anti-bot resistant extraction.",
  },
  es: {
    title: "Proxies para scraping, SERP y extracción de datos | Proxiesseller",
    description: "Página localizada para proxies de scraping orientada a SERP, e-commerce, extracción resistente a bloqueos y pipelines de datos.",
    headline: "Proxies de scraping pensados para captación de datos en producción",
    subheadline: "Usa rotación y sesiones sticky para SERP, inteligencia competitiva, scraping e-commerce y extracción resistente a anti-bots.",
  },
  fr: {
    title: "Proxies pour le scraping, les SERP et l’extraction de données | Proxiesseller",
    description: "Page localisée de proxies de scraping pour le suivi SERP, l’e-commerce, la collecte résistante aux anti-bots et les pipelines data.",
    headline: "Des proxies de scraping pour la collecte de données en production",
    subheadline: "Utilisez rotation et sticky sessions pour le SERP monitoring, l’intelligence concurrentielle, l’e-commerce et les cibles anti-bot.",
  },
  de: {
    title: "Scraping-Proxies für SERP, Produktdaten und Anti-Bot-Ziele | Proxiesseller",
    description: "Lokalisierte Scraping-Proxy-Seite für SERP-Tracking, E-Commerce-Extraktion, Anti-Bot-resistente Datenerfassung und Datenpipelines.",
    headline: "Scraping-Proxies für produktionsreife Datenerfassung",
    subheadline: "Nutze rotierende und sticky Proxy-Workflows für SERP-Monitoring, Competitive Intelligence, E-Commerce-Scraping und Anti-Bot-Ziele.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/proxies-for-scraping",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["scraping proxies", "serp proxies", "web scraping proxies", "seo proxies"],
  });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=scraping`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];
  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
    id: plan.id,
    title: plan.name,
    price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
    popular: Boolean(plan.popular) || index === 1,
    bullets: ["Unlimited bandwidth", "Timed rotation", "HTTP/SOCKS5", "Anti-bot ready"],
    bestFor: ["SERP tracking", "E-commerce data", "Pipelines"],
    href: "/pricing",
  }));

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="scraping"
      typeName="Scraping Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "Anti-bot resilience", left: "High", right: "Basic only" },
        { feature: "Rotation control", left: "Sticky + rotating", right: "Limited" },
        { feature: "Concurrency", left: "High", right: "Mixed" },
        { feature: "Best For", left: "Production pipelines", right: "Light tasks" },
      ]}
      useCases={[
        { title: "SERP tracking", desc: "Track rankings, SERP features, and visibility across multiple markets." },
        { title: "Product intelligence", desc: "Monitor prices, stock, and catalog changes across e-commerce sites." },
        { title: "Market research", desc: "Collect web data at scale for competitive and research workflows." },
      ]}
      benefits={[
        { title: "Flexible rotation", desc: "Choose rotation strategies that fit search, product, or large crawling jobs." },
        { title: "Tool compatibility", desc: "Works with browser automation, scraping frameworks, and custom clients." },
        { title: "Built for scaling", desc: "Useful for pipelines that need steady proxy supply over time." },
      ]}
      testimonials={[
        { name: "James L.", role: "Data Engineer", quote: "This setup gave us more stable SERP and catalog collection on production jobs.", rating: 5 },
        { name: "Sofia V.", role: "SEO Platform Developer", quote: "A strong fit for SEO-grade data collection and country-level rank tracking.", rating: 5 },
      ]}
      faqs={[
        { q: "Are these proxies good for SERP tracking?", a: "Yes, scraping-focused proxies are well suited to SEO and SERP data workflows." },
        { q: "Do they work with browser automation?", a: "They can be used with common scraping and browser automation tooling." },
        { q: "Can I use rotating sessions?", a: "Yes, rotation and sticky behavior can be matched to your target and workload." },
      ]}
      schema={{
        pageName: "Scraping Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/proxies-for-scraping`,
      }}
    />
  );
}
