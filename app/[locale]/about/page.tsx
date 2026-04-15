import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizeHref } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  en: {
    title: "About Proxiesseller | Proxy infrastructure for scraping, SEO and social growth",
    description:
      "Learn how Proxiesseller helps teams run scraping, SEO intelligence, and social-media operations with cleaner IP pools and stable routing.",
    eyebrow: "About Proxiesseller",
    headline: "Built for teams that need proxies to perform under pressure.",
    intro:
      "Proxiesseller focuses on stable proxy infrastructure for scraping pipelines, SERP tracking, social-media workflows, and regional testing. The goal is simple: cleaner traffic, clearer plans, and less time fighting bans or setup friction.",
    cards: [
      {
        title: "Operational reliability",
        text: "Routing, session quality, and usable inventory matter more than inflated proxy counts.",
      },
      {
        title: "Commercial use cases",
        text: "We design pages and plans around scraping, SEO monitoring, TikTok workflows, and agency account management.",
      },
      {
        title: "Straightforward buying",
        text: "Clear positioning, fast onboarding, and less guesswork from landing page to checkout.",
      },
    ],
    ctaTitle: "Need a proxy stack matched to your workflow?",
    ctaText:
      "Compare plans for social media, scraping, and geo-targeted research, or contact us for a tailored recommendation.",
    pricing: "See pricing",
    contact: "Talk to sales",
  },
  es: {
    title: "Sobre Proxiesseller | Infraestructura proxy para scraping, SEO y social media",
    description:
      "Conoce cómo Proxiesseller ayuda a equipos de scraping, inteligencia SEO y operaciones social media con pools de IP más limpios y routing estable.",
    eyebrow: "Sobre Proxiesseller",
    headline: "Pensado para equipos que necesitan proxies que rindan bajo presión.",
    intro:
      "Proxiesseller se centra en infraestructura proxy estable para scraping, seguimiento SERP, flujos social media y pruebas geolocalizadas. El objetivo es simple: tráfico más limpio, planes claros y menos tiempo peleando con bloqueos o configuraciones.",
    cards: [
      {
        title: "Fiabilidad operativa",
        text: "El routing, la calidad de sesión y el inventario utilizable importan más que cifras infladas de proxies.",
      },
      {
        title: "Casos de uso comerciales",
        text: "Diseñamos páginas y planes para scraping, monitorización SEO, flujos TikTok y gestión de cuentas para agencias.",
      },
      {
        title: "Compra sin fricción",
        text: "Posicionamiento claro, onboarding rápido y menos dudas desde la landing hasta el checkout.",
      },
    ],
    ctaTitle: "¿Necesitas una stack proxy ajustada a tu flujo?",
    ctaText:
      "Compara planes para social media, scraping e investigación geolocalizada o contacta para una recomendación a medida.",
    pricing: "Ver precios",
    contact: "Hablar con ventas",
  },
  fr: {
    title: "À propos de Proxiesseller | Infrastructure proxy pour scraping, SEO et social media",
    description:
      "Découvrez comment Proxiesseller aide les équipes de scraping, de veille SEO et de social media grâce à des pools d'IP plus propres et un routage stable.",
    eyebrow: "À propos de Proxiesseller",
    headline: "Conçu pour les équipes qui ont besoin de proxies fiables sous pression.",
    intro:
      "Proxiesseller se concentre sur une infrastructure proxy stable pour le scraping, le suivi SERP, les workflows social media et les tests géolocalisés. L'objectif est simple: un trafic plus propre, des offres plus claires et moins de friction technique.",
    cards: [
      {
        title: "Fiabilité opérationnelle",
        text: "Le routage, la qualité de session et un inventaire réellement exploitable comptent plus que des volumes gonflés.",
      },
      {
        title: "Cas d'usage business",
        text: "Nous structurons les pages et les offres pour le scraping, le SEO, TikTok et la gestion multi-comptes en agence.",
      },
      {
        title: "Achat plus simple",
        text: "Un positionnement clair, un onboarding rapide et moins d'incertitude entre la landing page et le checkout.",
      },
    ],
    ctaTitle: "Besoin d'une pile proxy adaptée à votre workflow ?",
    ctaText:
      "Comparez les offres pour les réseaux sociaux, le scraping et la recherche géolocalisée, ou contactez-nous pour une recommandation personnalisée.",
    pricing: "Voir les tarifs",
    contact: "Contacter les ventes",
  },
  de: {
    title: "Über Proxiesseller | Proxy-Infrastruktur für Scraping, SEO und Social Growth",
    description:
      "Erfahre, wie Proxiesseller Teams bei Scraping, SEO-Intelligence und Social-Media-Workflows mit saubereren IP-Pools und stabilem Routing unterstützt.",
    eyebrow: "Über Proxiesseller",
    headline: "Für Teams gebaut, die unter realem Druck leistungsfähige Proxies brauchen.",
    intro:
      "Proxiesseller fokussiert sich auf stabile Proxy-Infrastruktur für Scraping-Pipelines, SERP-Tracking, Social-Media-Workflows und regionale Tests. Das Ziel ist einfach: saubererer Traffic, klarere Tarife und weniger Reibung bei Setup und Betrieb.",
    cards: [
      {
        title: "Operative Zuverlässigkeit",
        text: "Routing, Session-Qualität und nutzbares Inventar sind wichtiger als künstlich aufgeblähte Proxy-Zahlen.",
      },
      {
        title: "Kommerzielle Use Cases",
        text: "Wir strukturieren Seiten und Tarife für Scraping, SEO-Monitoring, TikTok-Workflows und Agentur-Accounts.",
      },
      {
        title: "Einfacher Kaufprozess",
        text: "Klare Positionierung, schneller Einstieg und weniger Unsicherheit von der Landingpage bis zum Checkout.",
      },
    ],
    ctaTitle: "Du brauchst einen Proxy-Stack für deinen konkreten Workflow?",
    ctaText:
      "Vergleiche Tarife für Social Media, Scraping und Geo-Research oder kontaktiere uns für eine passende Empfehlung.",
    pricing: "Preise ansehen",
    contact: "Sales kontaktieren",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/about",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["about proxy provider", "proxy infrastructure", "scraping proxies", "social media proxies"],
  });
}

export default function LocalizedAboutPage({ params }: { params: { locale: Locale } }) {
  const content = copy[params.locale];

  return (
    <main className="bg-[linear-gradient(180deg,#fff8ea_0%,#ffffff_38%,#eef6ff_100%)]">
      <section className="container-page py-20">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-amber-200 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-amber-800 backdrop-blur">
            {content.eyebrow}
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            {content.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-slate-600">
            {content.intro}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.cards.map((card) => (
            <div key={card.title} className="rounded-[2rem] border border-white/70 bg-white/80 p-7 shadow-[0_28px_70px_rgba(15,23,42,0.08)] backdrop-blur">
              <div className="text-lg font-black text-slate-950">{card.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-[2rem] bg-slate-950 px-8 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.28)]">
          <h2 className="text-2xl font-black">{content.ctaTitle}</h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">{content.ctaText}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={localizeHref(params.locale, "/pricing")} className="rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300">
              {content.pricing}
            </Link>
            <Link href={localizeHref(params.locale, "/contact")} className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">
              {content.contact}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
