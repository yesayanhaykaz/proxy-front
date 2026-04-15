import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Datacenter proxies for speed, SEO tooling, and automation | Proxiesseller",
    description: "Localized datacenter proxy page for fast monitoring, APIs, SEO software, and scalable automation.",
    headline: "Datacenter proxies built for speed and scale",
    subheadline: "Ideal when low latency, stable sessions, and operational efficiency matter more than residential reputation.",
  },
  es: {
    title: "Proxies datacenter para velocidad, SEO y automatización | Proxiesseller",
    description: "Página localizada para proxies datacenter orientados a monitorización rápida, APIs, software SEO y automatización.",
    headline: "Proxies datacenter creados para velocidad y escala",
    subheadline: "Ideales cuando la baja latencia y la eficiencia operativa importan más que la reputación residencial.",
  },
  fr: {
    title: "Proxies datacenter pour la vitesse, le SEO et l’automatisation | Proxiesseller",
    description: "Page localisée de proxies datacenter pour le monitoring rapide, les API, les outils SEO et l’automatisation.",
    headline: "Des proxies datacenter pensés pour la vitesse et l’échelle",
    subheadline: "Parfaits quand la faible latence et l’efficacité opérationnelle comptent plus que la réputation résidentielle.",
  },
  de: {
    title: "Datacenter Proxies für Geschwindigkeit, SEO und Automatisierung | Proxiesseller",
    description: "Lokalisierte Datacenter-Proxy-Seite für Monitoring, APIs, SEO-Tools und skalierbare Automatisierung.",
    headline: "Datacenter Proxies für Tempo und Skalierung",
    subheadline: "Ideal, wenn geringe Latenz, stabile Sessions und Effizienz wichtiger sind als Residential-Reputation.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/datacenter-proxies",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["datacenter proxies", "seo proxies", "monitoring proxies", "automation proxies"],
  });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=datacenter`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];
  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
    id: plan.id,
    title: plan.name,
    price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
    popular: Boolean(plan.popular) || index === 1,
    bullets: ["Static IPs", "Low latency", "HTTP/SOCKS5", "Fast setup"],
    bestFor: ["SEO tools", "APIs", "Monitoring"],
    href: "/pricing",
  }));

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="datacenter"
      typeName="Datacenter Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "Latency", left: "Low", right: "Medium" },
        { feature: "Cost efficiency", left: "High", right: "Lower" },
        { feature: "Static sessions", left: "Strong", right: "Mixed" },
        { feature: "Best For", left: "Automation", right: "Strict sites" },
      ]}
      useCases={[
        { title: "SEO software", desc: "Run rank tracking and monitoring tools with predictable throughput." },
        { title: "API workflows", desc: "Support fast programmatic jobs where stable IP behavior matters." },
        { title: "Operational monitoring", desc: "Perform fast price checks and status checks at scale." },
      ]}
      benefits={[
        { title: "Lower latency", desc: "Datacenter routes are tuned for speed-sensitive tasks." },
        { title: "Scales well", desc: "Useful for larger automation workloads with cost control." },
        { title: "Reliable sessions", desc: "Static behavior works well for monitoring and API automation." },
      ]}
      faqs={[
        { q: "Are datacenter proxies best for SEO tools?", a: "They are often used where speed and cost efficiency matter most." },
        { q: "Do datacenter proxies support static IP workflows?", a: "Yes, they are well suited to stable session use cases." },
        { q: "When should I choose datacenter over residential?", a: "Choose datacenter when speed and scale matter more than trust profile." },
      ]}
      schema={{
        pageName: "Datacenter Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/datacenter-proxies`,
      }}
    />
  );
}
