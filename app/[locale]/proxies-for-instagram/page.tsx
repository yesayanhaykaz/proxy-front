import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  en: {
    title: "Instagram proxies for agencies, account farms and outreach | Proxiesseller",
    description: "Localized Instagram proxy page for agencies, multi-account operations, outreach teams and safer social-media automation.",
    headline: "Instagram proxies built for safer multi-account operations",
    subheadline: "Use cleaner residential IP trust and sticky sessions for account farms, growth teams, DMs, moderation, and agency delivery.",
  },
  es: {
    title: "Proxies para Instagram para agencias y gestión multi-cuenta | Proxiesseller",
    description: "Página localizada de proxies para Instagram orientada a agencias, outreach, multi-cuenta y automatización social más segura.",
    headline: "Proxies para Instagram pensados para operar múltiples cuentas con más seguridad",
    subheadline: "Usa IPs residenciales más limpias y sesiones sticky para granjas de cuentas, growth, DMs, moderación y agencias.",
  },
  fr: {
    title: "Proxies Instagram pour agences et gestion multi-comptes | Proxiesseller",
    description: "Page localisée de proxies Instagram pour agences, équipes outreach, multi-comptes et automatisation social media plus sûre.",
    headline: "Des proxies Instagram conçus pour des opérations multi-comptes plus sûres",
    subheadline: "Utilisez des IP résidentielles plus propres et des sticky sessions pour les comptes, l'outreach, les DMs, la modération et les agences.",
  },
  de: {
    title: "Instagram-Proxies für Agenturen und Multi-Account-Workflows | Proxiesseller",
    description: "Lokalisierte Instagram-Proxy-Seite für Agenturen, Outreach-Teams, Multi-Account-Management und sicherere Social-Automation.",
    headline: "Instagram-Proxies für sicherere Multi-Account-Workflows",
    subheadline: "Nutze sauberere Residential-IPs und Sticky Sessions für Account-Farmen, Growth, DMs, Moderation und Agentur-Setups.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/proxies-for-instagram",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["instagram proxies", "social media proxies", "multi account proxies", "agency proxies"],
  });
}

export default async function LocalizedInstagramPage({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=instagram`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];
  const previewPlans =
    (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
      id: plan.id,
      title: plan.name,
      price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
      popular: Boolean(plan.popular) || index === 1,
      bullets: ["Sticky sessions", "Residential trust", "HTTP/SOCKS5", "Instant activation"],
      bestFor: ["Instagram ops", "Agencies", "DM workflows"],
      href: "/pricing",
    })) || [];

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="instagram"
      typeName="Instagram Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "Account trust profile", left: "High", right: "Mixed" },
        { feature: "Sticky session support", left: "Yes", right: "Limited" },
        { feature: "Multi-account fit", left: "Strong", right: "Basic" },
        { feature: "Best For", left: "Instagram ops", right: "Generic requests" },
      ]}
      useCases={[
        { title: "Agency account delivery", desc: "Separate client accounts with cleaner session behavior and stronger IP trust." },
        { title: "Outreach and DM operations", desc: "Support outreach, response workflows, and account separation for social teams." },
        { title: "Research and moderation", desc: "Run checks across regions, accounts, and moderation workflows with less crossover risk." },
      ]}
      benefits={[
        { title: "Cleaner social footprint", desc: "Better suited to account-based workflows than generic proxy inventory built only for speed." },
        { title: "Session continuity", desc: "Sticky sessions help when continuity, login reputation, and account stability matter." },
        { title: "Built for agencies", desc: "Useful for teams managing multiple brands, creators, or local market accounts at once." },
      ]}
      testimonials={[
        { name: "Daria N.", role: "Social Lead", quote: "This setup feels much more stable for account-level Instagram work than generic proxy pools.", rating: 5 },
        { name: "Owen J.", role: "Agency Founder", quote: "We finally have a cleaner stack for outreach and client account separation.", rating: 5 },
      ]}
      faqs={[
        { q: "Are these proxies suitable for Instagram workflows?", a: "Yes, they are positioned for social-media account operations where session quality and trust profile are important." },
        { q: "Do sticky sessions matter for Instagram?", a: "They often help when you want a more stable identity per account or per operator workflow." },
        { q: "Are they useful for agencies?", a: "Yes. Agency, multi-brand, and multi-account use cases are a strong fit for this type of setup." },
      ]}
      schema={{
        pageName: "Instagram Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/proxies-for-instagram`,
      }}
    />
  );
}
