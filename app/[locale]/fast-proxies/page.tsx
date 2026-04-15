import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Fast proxies for low-latency scraping and monitoring | Proxiesseller",
    description: "Localized fast proxy page for time-sensitive scraping, uptime monitoring, and automation workflows.",
    headline: "Fast proxies optimized for low-latency jobs",
    subheadline: "Use speed-focused routes for monitoring, time-sensitive scraping, and automations where response time matters.",
  },
  es: {
    title: "Proxies rápidos para scraping y monitorización de baja latencia | Proxiesseller",
    description: "Página localizada de proxies rápidos para scraping sensible al tiempo, monitorización y automatización.",
    headline: "Proxies rápidos optimizados para trabajos de baja latencia",
    subheadline: "Usa rutas enfocadas en velocidad para monitorización, scraping sensible al tiempo y automatizaciones exigentes.",
  },
  fr: {
    title: "Proxies rapides pour scraping et monitoring à faible latence | Proxiesseller",
    description: "Page localisée de proxies rapides pour le scraping sensible au temps, le monitoring et l’automatisation.",
    headline: "Des proxies rapides optimisés pour la faible latence",
    subheadline: "Utilisez des routes orientées vitesse pour le monitoring, le scraping sensible au temps et les automatisations critiques.",
  },
  de: {
    title: "Schnelle Proxies für Low-Latency-Scraping und Monitoring | Proxiesseller",
    description: "Lokalisierte Fast-Proxy-Seite für zeitkritisches Scraping, Monitoring und Automatisierung.",
    headline: "Schnelle Proxies für latenzkritische Workloads",
    subheadline: "Nutze geschwindigkeitsoptimierte Routen für Monitoring, zeitkritisches Scraping und Performance-Automation.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/fast-proxies",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["fast proxies", "monitoring proxies", "low latency proxies"],
  });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=fast`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];
  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
    id: plan.id,
    title: plan.name,
    price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
    popular: Boolean(plan.popular) || index === 1,
    bullets: ["Optimized routing", "Low latency", "Stable sessions", "Fast setup"],
    bestFor: ["Monitoring", "Fast scraping", "APIs"],
    href: "/pricing",
  }));

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="fast"
      typeName="Fast Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "Latency", left: "Low", right: "Medium" },
        { feature: "Throughput", left: "High", right: "Standard" },
        { feature: "Stability", left: "Optimized", right: "Mixed" },
        { feature: "Best For", left: "Time-sensitive tasks", right: "Basic workflows" },
      ]}
      useCases={[
        { title: "Monitoring", desc: "Run faster status checks and price checks with lower latency." },
        { title: "Fast scraping", desc: "Use responsive routes for performance-sensitive collection jobs." },
        { title: "Automation", desc: "Keep long-running workflows stable with optimized proxy routing." },
      ]}
      benefits={[
        { title: "Better response times", desc: "Useful when every request delay matters to reporting or automation." },
        { title: "Stable performance", desc: "Designed to reduce volatility on fast collection tasks." },
        { title: "Simple provisioning", desc: "Activate quickly and move from test to production without friction." },
      ]}
      faqs={[
        { q: "When should I use fast proxies?", a: "Use them for time-sensitive monitoring, scraping, and automation workflows." },
        { q: "Are fast proxies better than datacenter?", a: "They are ideal when low latency is the key priority." },
        { q: "Can I use them for APIs?", a: "Yes, they are suitable for API-heavy workflows that need stable speed." },
      ]}
      schema={{
        pageName: "Fast Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/fast-proxies`,
      }}
    />
  );
}
