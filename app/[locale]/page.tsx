import type { Metadata } from "next";
import { Hero } from "@/components/marketing/Hero";
import { FeatureCards } from "@/components/marketing/FeatureCards";
import { Locations } from "@/components/marketing/Locations";
import { PopularPackages } from "@/components/marketing/PopularPackages";
import { TrustBar } from "@/components/marketing/TrustBar";
import { FinalCTA } from "@/components/marketing/FinalCTA";
import { ChooseAndBuy } from "@/components/marketing/ChooseAndBuy";
import { WhyChooseGrid } from "@/components/marketing/WhyChooseGrid";
import { buildLocalizedMetadata } from "@/lib/seo";
import { type Locale } from "@/lib/i18n";

export function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}): Metadata {
  const titles = {
    en: "Proxies for SEO, TikTok, Social Media & Scraping | Proxiesseller",
    es: "Proxies para SEO, TikTok, Social Media y Scraping | Proxiesseller",
    fr: "Proxies pour SEO, TikTok, réseaux sociaux et scraping | Proxiesseller",
    de: "Proxies für SEO, TikTok, Social Media und Scraping | Proxiesseller",
  } as const;

  const descriptions = {
    en: "Localized proxy infrastructure for SEO teams, TikTok growth, social media automation, and web scraping. Residential, mobile, datacenter, and fast proxy plans.",
    es: "Infraestructura proxy localizada para equipos SEO, crecimiento en TikTok, automatización social media y scraping web. Planes residenciales, móviles, datacenter y rápidos.",
    fr: "Infrastructure proxy localisée pour le SEO, la croissance TikTok, l’automatisation social media et le scraping web. Offres résidentielles, mobiles, datacenter et rapides.",
    de: "Lokalisierte Proxy-Infrastruktur für SEO, TikTok-Wachstum, Social-Media-Automatisierung und Web-Scraping. Residential-, Mobile-, Datacenter- und Fast-Proxies.",
  } as const;

  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/",
    title: titles[params.locale],
    description: descriptions[params.locale],
    keywords: [
      "tiktok proxies",
      "social media proxies",
      "scraping proxies",
      "seo proxies",
      "residential proxies",
    ],
  });
}

export default function LocaleHome({ params }: { params: { locale: Locale } }) {
  return (
    <main>
      <Hero />
      <TrustBar />
      <FeatureCards />
      <ChooseAndBuy />
      <Locations />
      <PopularPackages />
      <WhyChooseGrid />
      <FinalCTA />
    </main>
  );
}
