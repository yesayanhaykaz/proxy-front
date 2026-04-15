import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Residential proxies with real ISP reputation",
    description:
      "Localized residential proxy landing page for scraping, SERP tracking, social media account safety, and marketplace intelligence.",
    headline: "Residential proxies with real-user trust signals",
    subheadline:
      "Use clean residential IPs for SERP tracking, market research, account safety, and scraping targets that punish low-trust proxy pools.",
  },
  es: {
    title: "Proxies residenciales con reputación real de ISP",
    description:
      "Página localizada para proxies residenciales orientada a scraping, SEO, cuentas sociales y monitorización de marketplaces.",
    headline: "Proxies residenciales con señales de confianza reales",
    subheadline:
      "Utiliza IPs residenciales limpias para seguimiento de SERP, investigación de mercado, seguridad de cuentas y scraping en objetivos exigentes.",
  },
  fr: {
    title: "Proxies résidentiels avec réputation ISP réelle",
    description:
      "Page localisée pour proxies résidentiels destinée au scraping, au suivi SERP, à la sécurité des comptes et à l’intelligence marketplace.",
    headline: "Des proxies résidentiels avec une vraie confiance utilisateur",
    subheadline:
      "Utilisez des IP résidentielles propres pour le suivi SERP, la recherche marché, la sécurité des comptes et le scraping de sites stricts.",
  },
  de: {
    title: "Residential Proxies mit echter ISP-Reputation",
    description:
      "Lokalisierte Residential-Proxy-Seite für Scraping, SERP-Tracking, sichere Social-Accounts und Marketplace-Intelligence.",
    headline: "Residential Proxies mit echten Vertrauenssignalen",
    subheadline:
      "Nutze saubere Residential-IPs für SERP-Tracking, Marktforschung, Account-Sicherheit und Scraping auf besonders strengen Websites.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/residential-proxies",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["residential proxies", "seo proxies", "scraping proxies", "social media proxies"],
  });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=residential`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
    id: plan.id,
    title: plan.name,
    price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
    popular: Boolean(plan.popular) || index === 1,
    bullets: [
      plan.rotation === "static" ? "Static" : "Rotating",
      "HTTP/SOCKS5",
      "Instant setup",
      "Dedicated credentials",
      "24/7 support",
    ],
    bestFor: ["SERP tracking", "Scraping", "Account management"],
    href: "/pricing",
  }));

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="residential"
      typeName="Residential Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "IP Reputation", left: "Real ISP", right: "Mixed" },
        { feature: "SERP Success", left: "High", right: "Medium" },
        { feature: "Geo Coverage", left: "Broad", right: "Limited" },
        { feature: "Best For", left: "Strict sites", right: "Basic targets" },
      ]}
      useCases={[
        { title: "SERP tracking", desc: "Track rankings by country and region with fewer blocks." },
        { title: "Marketplace scraping", desc: "Collect product data with sticky sessions where needed." },
        { title: "Social workflows", desc: "Use higher-trust IPs for moderation, publishing, and account management." },
      ]}
      benefits={[
        { title: "Better trust score", desc: "Residential IPs look closer to real user traffic and reduce friction on sensitive targets." },
        { title: "Sticky sessions", desc: "Keep the same IP when consistency matters for accounts or data collection." },
        { title: "Broader targeting", desc: "Support geo-targeted SEO and social workflows across multiple countries." },
      ]}
      testimonials={[
        { name: "Alex J.", role: "SEO Lead", quote: "Residential pools helped us stabilize our SERP collection on stricter markets.", rating: 5 },
        { name: "Mia T.", role: "Growth Operator", quote: "Much better for social account safety than generic datacenter pools.", rating: 5 },
      ]}
      faqs={[
        { q: "Are residential proxies rotating or sticky?", a: "You can use rotating sessions or sticky sessions depending on the workflow." },
        { q: "Are residential proxies best for SEO?", a: "They are especially useful for SERP collection and market research on stricter targets." },
        { q: "Can I use them for social media operations?", a: "Yes, residential IPs are commonly used for safer social account workflows." },
      ]}
      schema={{
        pageName: "Residential Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/residential-proxies`,
      }}
    />
  );
}
