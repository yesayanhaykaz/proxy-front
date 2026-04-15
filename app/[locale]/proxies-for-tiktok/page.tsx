import type { Metadata } from "next";
import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";
import { getSiteOrigin } from "@/lib/env";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

const copy = {
  en: {
    title: "TikTok proxies for safer account management and growth | Proxiesseller",
    description: "Localized TikTok proxy page for social media teams, agencies, multi-account management, and TikTok automation.",
    headline: "TikTok proxies built for safer social growth",
    subheadline: "Use stronger IP trust and sticky sessions for TikTok account operations, creator workflows, moderation, and agency scaling.",
  },
  es: {
    title: "Proxies para TikTok y gestión segura de cuentas | Proxiesseller",
    description: "Página localizada para proxies TikTok orientada a equipos social media, agencias, multi-cuenta y automatización.",
    headline: "Proxies para TikTok pensados para crecer con más seguridad",
    subheadline: "Usa sesiones sticky e IPs de mayor confianza para operaciones TikTok, moderación, agencias y gestión multi-cuenta.",
  },
  fr: {
    title: "Proxies TikTok pour une gestion de comptes plus sûre | Proxiesseller",
    description: "Page localisée de proxies TikTok pour agences, équipes social media, multi-comptes et automatisation.",
    headline: "Des proxies TikTok pour une croissance sociale plus sûre",
    subheadline: "Utilisez des IP plus fiables et des sticky sessions pour TikTok, la modération, les agences et les workflows multi-comptes.",
  },
  de: {
    title: "TikTok-Proxies für sichere Account- und Growth-Workflows | Proxiesseller",
    description: "Lokalisierte TikTok-Proxy-Seite für Social-Media-Teams, Agenturen, Multi-Account-Management und Automatisierung.",
    headline: "TikTok-Proxies für sichereres Social Growth",
    subheadline: "Nutze vertrauensstärkere IPs und Sticky Sessions für TikTok-Accounts, Moderation, Agentur-Workflows und Skalierung.",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/proxies-for-tiktok",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["tiktok proxies", "social media proxies", "mobile proxies", "account management proxies"],
  });
}

export default async function Page({ params }: { params: { locale: Locale } }) {
  const site = getSiteOrigin();
  const response = await fetch(`${site}/api/plans?category=tiktok`, { cache: "no-store" });
  const plans = response.ok ? await response.json() : [];
  const previewPlans =
    (Array.isArray(plans) ? plans : []).slice(0, 3).map((plan: any, index: number) => ({
      id: plan.id,
      title: plan.name,
      price: `$${Number(plan.price || 0).toFixed(2)} ${plan.priceUnit || "/mo"}`,
      popular: Boolean(plan.popular) || index === 1,
      bullets: ["Sticky sessions", "Social-safe IP pool", "HTTP/SOCKS5", "Instant activation"],
      bestFor: ["TikTok accounts", "Agencies", "Moderation"],
      href: "/pricing",
    })) || [];

  return (
    <ProxyTypeLanding
      locale={params.locale}
      typeSlug="tiktok"
      typeName="TikTok Proxies"
      headline={copy[params.locale].headline}
      subheadline={copy[params.locale].subheadline}
      ctaHref="/pricing"
      secondaryCtaHref="/pricing"
      previewPlans={previewPlans}
      rows={[
        { feature: "Account safety", left: "High", right: "Mixed" },
        { feature: "Sticky session support", left: "Yes", right: "Limited" },
        { feature: "Social workflow fit", left: "Strong", right: "Basic" },
        { feature: "Best For", left: "TikTok ops", right: "Generic requests" },
      ]}
      useCases={[
        { title: "Agency account stacks", desc: "Manage multiple creator or brand accounts with more stable session behavior." },
        { title: "Moderation and publishing", desc: "Support workflows around posting, checks, and team operations." },
        { title: "Growth and research", desc: "Use cleaner IPs for regional research and account-level task separation." },
      ]}
      benefits={[
        { title: "Stronger trust profile", desc: "Useful for platforms where low-trust traffic increases friction or risk." },
        { title: "Sticky session control", desc: "Maintain a more consistent identity when account continuity matters." },
        { title: "Built for social workflows", desc: "Designed around real social media use cases rather than generic scraping only." },
      ]}
      testimonials={[
        { name: "Marcus T.", role: "Agency Owner", quote: "This is the first proxy stack that felt purpose-built for our TikTok account workflows.", rating: 5 },
        { name: "Lena K.", role: "Growth Marketer", quote: "Sticky sessions and cleaner trust signals made account operations feel much safer.", rating: 5 },
      ]}
      faqs={[
        { q: "Are these proxies suitable for TikTok accounts?", a: "They are designed for social-media-oriented workflows where trust profile and session quality matter." },
        { q: "Do sticky sessions help with TikTok?", a: "Sticky sessions are often used when a more stable account identity is preferred." },
        { q: "Can agencies use these for multiple accounts?", a: "Yes, they are commonly positioned for agency and multi-account social operations." },
      ]}
      schema={{
        pageName: "TikTok Proxies",
        description: copy[params.locale].description,
        urlPath: `/${params.locale}/proxies-for-tiktok`,
      }}
    />
  );
}
