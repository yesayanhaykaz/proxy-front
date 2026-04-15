import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizeHref } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  en: {
    title: "Proxy documentation and setup guides | Proxiesseller",
    description: "Localized documentation landing page for proxy setup, scraping integrations, social-media workflows, and SEO monitoring.",
    eyebrow: "Documentation",
    headline: "Guides for scraping stacks, social tools, and SEO monitoring workflows.",
    body: "Use this section as the entry point for implementation guides, auth setup, rotation strategy, and geo-targeted proxy operations.",
    sections: [
      { title: "Quick starts", text: "Get connected fast with Python, Node.js, cURL, Scrapy, Selenium, and browser automation stacks." },
      { title: "Workflow docs", text: "See setup guidance for scraping, social-media account operations, ad verification, and SERP monitoring." },
      { title: "Operational patterns", text: "Learn how to choose between sticky sessions, rotating pools, protocol options, and country targeting." },
    ],
    links: { pricing: "Browse plans", contact: "Ask for setup help" },
  },
  es: {
    title: "Documentación y guías de configuración de proxies | Proxiesseller",
    description: "Landing localizada de documentación para configuración de proxies, scraping, social media y monitorización SEO.",
    eyebrow: "Documentación",
    headline: "Guías para stacks de scraping, herramientas sociales y flujos de seguimiento SEO.",
    body: "Usa esta sección como punto de entrada para guías de implementación, autenticación, estrategias de rotación y operaciones proxy geolocalizadas.",
    sections: [
      { title: "Quick starts", text: "Conecta rápido con Python, Node.js, cURL, Scrapy, Selenium y automatización de navegador." },
      { title: "Documentación por flujo", text: "Consulta guías para scraping, gestión de cuentas social media, verificación de anuncios y seguimiento SERP." },
      { title: "Patrones operativos", text: "Aprende a elegir entre sesiones sticky, pools rotativos, protocolos y targeting por país." },
    ],
    links: { pricing: "Ver planes", contact: "Pedir ayuda de setup" },
  },
  fr: {
    title: "Documentation proxy et guides d'intégration | Proxiesseller",
    description: "Page localisée de documentation pour la configuration proxy, le scraping, les workflows social media et le suivi SEO.",
    eyebrow: "Documentation",
    headline: "Des guides pour les stacks de scraping, les outils social media et le monitoring SEO.",
    body: "Utilisez cette page comme point d'entrée vers les guides d'implémentation, l'authentification, les stratégies de rotation et les opérations proxy géolocalisées.",
    sections: [
      { title: "Démarrages rapides", text: "Connectez-vous vite avec Python, Node.js, cURL, Scrapy, Selenium et l'automatisation navigateur." },
      { title: "Guides par workflow", text: "Retrouvez des guides pour le scraping, la gestion de comptes social media, l'ad verification et le suivi SERP." },
      { title: "Patterns opérationnels", text: "Apprenez à choisir entre sticky sessions, pools rotatifs, protocoles et ciblage pays." },
    ],
    links: { pricing: "Voir les offres", contact: "Demander de l'aide" },
  },
  de: {
    title: "Proxy-Dokumentation und Setup-Guides | Proxiesseller",
    description: "Lokalisierte Dokumentationsseite für Proxy-Setup, Scraping-Integrationen, Social-Media-Workflows und SEO-Monitoring.",
    eyebrow: "Dokumentation",
    headline: "Guides für Scraping-Stacks, Social Tools und SEO-Monitoring-Workflows.",
    body: "Nutze diese Seite als Einstieg für Implementierungs-Guides, Auth-Setup, Rotationsstrategien und geo-basierte Proxy-Workflows.",
    sections: [
      { title: "Schnellstarts", text: "Schneller Einstieg mit Python, Node.js, cURL, Scrapy, Selenium und Browser-Automation." },
      { title: "Workflow-Dokumentation", text: "Setup-Hilfen für Scraping, Social-Media-Accounts, Ad Verification und SERP-Monitoring." },
      { title: "Operative Muster", text: "Lerne, wann Sticky Sessions, rotierende Pools, Protokolle und Länder-Targeting sinnvoll sind." },
    ],
    links: { pricing: "Tarife ansehen", contact: "Setup-Hilfe anfragen" },
  },
} as const;

const blocks = [
  "Python requests",
  "Node.js + Axios",
  "Scrapy rotation",
  "Selenium auth",
  "TikTok account workflows",
  "Localized SERP checks",
];

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/documentation",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["proxy documentation", "proxy setup guide", "scraping setup", "seo proxy guide"],
  });
}

export default function LocalizedDocumentationPage({ params }: { params: { locale: Locale } }) {
  const content = copy[params.locale];

  return (
    <main className="bg-slate-950 text-white">
      <section className="container-page py-20">
        <div className="max-w-4xl">
          <div className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-200">
            {content.eyebrow}
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight md:text-6xl">{content.headline}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">{content.body}</p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {blocks.map((item) => (
            <span key={item} className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200">
              {item}
            </span>
          ))}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.sections.map((section) => (
            <div key={section.title} className="rounded-[2rem] border border-white/10 bg-white/5 p-7 backdrop-blur">
              <div className="text-xl font-black">{section.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-300">{section.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link href={localizeHref(params.locale, "/pricing")} className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-200">
            {content.links.pricing}
          </Link>
          <Link href={localizeHref(params.locale, "/contact")} className="rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white transition hover:bg-white/10">
            {content.links.contact}
          </Link>
        </div>
      </section>
    </main>
  );
}
