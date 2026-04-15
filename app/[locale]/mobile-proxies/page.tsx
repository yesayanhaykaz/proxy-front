import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "Mobile proxies for social media and high-trust sessions | Proxiesseller",
    description: "Localized mobile proxy page for TikTok, social media automation, app workflows, and account safety.",
    headline: "4G/5G mobile proxies for higher-trust sessions",
    subheadline: "Best for social automation, strict app targets, and account operations that need the strongest trust profile.",
  },
  es: {
    title: "Proxies móviles para social media y sesiones de alta confianza | Proxiesseller",
    description: "Página localizada de proxies móviles para TikTok, social media, automatización y seguridad de cuentas.",
    headline: "Proxies móviles 4G/5G para sesiones con más confianza",
    subheadline: "Ideales para automatización social, apps exigentes y operaciones de cuentas con mayor nivel de confianza.",
  },
  fr: {
    title: "Proxies mobiles pour social media et sessions à forte confiance | Proxiesseller",
    description: "Page localisée de proxies mobiles pour TikTok, automatisation social media, apps et sécurité des comptes.",
    headline: "Proxies mobiles 4G/5G pour des sessions à forte confiance",
    subheadline: "Parfaits pour l’automatisation sociale, les apps strictes et les opérations de comptes sensibles.",
  },
  de: {
    title: "Mobile Proxies für Social Media und High-Trust-Sessions | Proxiesseller",
    description: "Lokalisierte Mobile-Proxy-Seite für TikTok, Social Media, App-Workflows und sichere Account-Operationen.",
    headline: "4G/5G Mobile Proxies für vertrauensstarke Sessions",
    subheadline: "Ideal für Social Automation, strenge App-Ziele und Account-Workflows mit maximalem Vertrauensprofil.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/mobile-proxies",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["mobile proxies", "social media proxies", "tiktok proxies", "4g proxies"],
  });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=mobile`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
    id: plan.id,
    title: plan.name,
    price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
    popular: Boolean(plan.popular) || index === 1,
    bullets: ["4G/5G", "Sticky sessions", "HTTP/SOCKS5", "Fast setup"],
    bestFor: ["TikTok", "App testing", "Account safety"],
    href: "/pricing",
  }));

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="mobile"
      typeName="Mobile Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "Trust score", left: "Highest", right: "Medium" },
        { feature: "Strict app targets", left: "Very high", right: "Mixed" },
        { feature: "Session stability", left: "Sticky + rotating", right: "Limited" },
        { feature: "Best For", left: "Accounts", right: "Basic scraping" },
      ]}
      useCases={[
        { title: "TikTok operations", desc: "Run social workflows with stronger IP trust signals." },
        { title: "App automation", desc: "Handle mobile app flows with more natural network behavior." },
        { title: "Agency account stacks", desc: "Support multiple social accounts more safely." },
      ]}
      benefits={[
        { title: "Highest-trust profile", desc: "Mobile IPs are ideal for sensitive platforms that punish low-trust networks." },
        { title: "Rotation control", desc: "Use sticky sessions when identity consistency matters." },
        { title: "Works for social growth", desc: "Useful for moderation, publishing, and account management workflows." },
      ]}
      faqs={[
        { q: "Are mobile proxies better for TikTok and social apps?", a: "They are often preferred when account trust and session quality matter most." },
        { q: "Can I keep the same IP?", a: "Yes, sticky sessions can be used for more consistent account behavior." },
        { q: "Do mobile proxies rotate?", a: "Yes, rotation options are available depending on the workflow and plan." },
      ]}
      schema={{
        pageName: "Mobile Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/mobile-proxies`,
      }}
    />
  );
}
