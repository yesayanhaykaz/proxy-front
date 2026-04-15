import type { Metadata } from "next";
import FaqAccordion from "@/app/(marketing)/faqs/FaqAccordion";
import { type Locale } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  en: {
    title: "Proxy FAQs for scraping, TikTok and SEO | Proxiesseller",
    description: "Answers to common questions about residential, mobile, datacenter and rotating proxies for scraping, social media and SEO.",
    headline: "Frequently asked questions",
    intro: "Quick answers about proxy types, targeting, rotation, account safety, and workflow fit.",
    faqs: [
      { q: "What proxy types does Proxiesseller offer?", a: "Residential, mobile, datacenter, and fast proxies for scraping, social workflows, and SEO monitoring." },
      { q: "Which proxy type is best for TikTok or Instagram accounts?", a: "Mobile and strong residential pools are typically preferred when account trust and session quality matter most." },
      { q: "What are the best proxies for scraping?", a: "Residential proxies are usually the safest fit for scraping because they blend in better with real-user traffic." },
      { q: "Can I target specific countries?", a: "Yes. Geo-targeting is commonly available for country-level campaigns and research workflows." },
      { q: "Do proxies help with SEO tracking?", a: "Yes. They are widely used for SERP monitoring, localized search checks, and competitor analysis." },
      { q: "What is a sticky session?", a: "A sticky session keeps the same IP for a period of time, which is useful when account continuity matters." },
      { q: "Do your proxies support authentication?", a: "Yes. Plans generally support username/password auth and IP whitelisting." },
      { q: "How quickly are proxies activated?", a: "Access is typically available shortly after payment, with details visible in the dashboard." },
    ],
  },
  es: {
    title: "Preguntas frecuentes sobre proxies para scraping, TikTok y SEO | Proxiesseller",
    description: "Respuestas a preguntas comunes sobre proxies residenciales, móviles, datacenter y rotativos para scraping, social media y SEO.",
    headline: "Preguntas frecuentes",
    intro: "Respuestas rápidas sobre tipos de proxy, geolocalización, rotación, seguridad de cuentas y encaje por caso de uso.",
    faqs: [
      { q: "¿Qué tipos de proxies ofrece Proxiesseller?", a: "Proxies residenciales, móviles, datacenter y fast para scraping, social media y monitorización SEO." },
      { q: "¿Qué proxy es mejor para cuentas de TikTok o Instagram?", a: "Los móviles y los residenciales de alta calidad suelen ser la mejor opción cuando la confianza de la cuenta y la calidad de sesión son críticas." },
      { q: "¿Cuál es el mejor proxy para scraping?", a: "Los proxies residenciales suelen ser la opción más segura para scraping porque se parecen más al tráfico de usuarios reales." },
      { q: "¿Puedo elegir países concretos?", a: "Sí. La geolocalización suele estar disponible para campañas y análisis por país." },
      { q: "¿Los proxies ayudan con el seguimiento SEO?", a: "Sí. Se usan para monitorización SERP, comprobaciones locales y análisis de competidores." },
      { q: "¿Qué es una sesión sticky?", a: "Una sesión sticky mantiene la misma IP durante un tiempo y es útil cuando importa la continuidad de la cuenta." },
      { q: "¿Se admite autenticación?", a: "Sí. Normalmente se ofrece usuario/contraseña e IP whitelisting." },
      { q: "¿Cuánto tardan en activarse?", a: "El acceso suele estar disponible poco después del pago y los datos aparecen en el dashboard." },
    ],
  },
  fr: {
    title: "FAQ proxies pour scraping, TikTok et SEO | Proxiesseller",
    description: "Réponses aux questions fréquentes sur les proxies résidentiels, mobiles, datacenter et rotatifs pour le scraping, le social media et le SEO.",
    headline: "Questions fréquentes",
    intro: "Réponses rapides sur les types de proxies, le ciblage géographique, la rotation, la sécurité des comptes et les cas d'usage.",
    faqs: [
      { q: "Quels types de proxies propose Proxiesseller ?", a: "Des proxies résidentiels, mobiles, datacenter et fast pour le scraping, les workflows social media et le suivi SEO." },
      { q: "Quel type de proxy choisir pour TikTok ou Instagram ?", a: "Les proxies mobiles et les bons pools résidentiels sont souvent privilégiés lorsque la confiance du compte et la qualité de session sont essentielles." },
      { q: "Quel proxy est le plus adapté au scraping ?", a: "Les proxies résidentiels sont généralement le choix le plus sûr pour le scraping car ils ressemblent davantage à un trafic réel." },
      { q: "Puis-je cibler des pays précis ?", a: "Oui. Le ciblage géographique est généralement disponible pour les campagnes et analyses par pays." },
      { q: "Les proxies aident-ils pour le suivi SEO ?", a: "Oui. Ils sont souvent utilisés pour le suivi SERP, les vérifications locales et l'analyse concurrentielle." },
      { q: "Qu'est-ce qu'une sticky session ?", a: "Une sticky session conserve la même IP pendant un certain temps, ce qui est utile pour la continuité des comptes." },
      { q: "L'authentification est-elle prise en charge ?", a: "Oui. Les offres prennent généralement en charge identifiant/mot de passe et l'IP whitelisting." },
      { q: "L'activation est-elle rapide ?", a: "L'accès est généralement disponible peu après le paiement et les informations apparaissent dans le dashboard." },
    ],
  },
  de: {
    title: "Proxy-FAQ für Scraping, TikTok und SEO | Proxiesseller",
    description: "Antworten auf häufige Fragen zu Residential-, Mobile-, Datacenter- und rotierenden Proxies für Scraping, Social Media und SEO.",
    headline: "Häufige Fragen",
    intro: "Schnelle Antworten zu Proxy-Typen, Geo-Targeting, Rotation, Account-Sicherheit und typischen Workflows.",
    faqs: [
      { q: "Welche Proxy-Typen bietet Proxiesseller an?", a: "Residential-, Mobile-, Datacenter- und Fast-Proxies für Scraping, Social-Media-Workflows und SEO-Monitoring." },
      { q: "Welche Proxies sind besser für TikTok- oder Instagram-Accounts?", a: "Mobile Proxies und hochwertige Residential-Pools sind meist die bessere Wahl, wenn Vertrauen und Session-Qualität entscheidend sind." },
      { q: "Welche Proxies eignen sich am besten für Scraping?", a: "Residential-Proxies sind oft die sicherste Wahl, weil sie echtem Nutzerverkehr ähnlicher sind." },
      { q: "Kann ich bestimmte Länder auswählen?", a: "Ja. Geo-Targeting ist häufig für länderspezifische Kampagnen und Research-Workflows verfügbar." },
      { q: "Helfen Proxies beim SEO-Tracking?", a: "Ja. Sie werden häufig für SERP-Monitoring, lokale Suchprüfungen und Wettbewerbsanalysen eingesetzt." },
      { q: "Was ist eine Sticky Session?", a: "Eine Sticky Session hält dieselbe IP für einen bestimmten Zeitraum und ist hilfreich für stabile Account-Workflows." },
      { q: "Wird Authentifizierung unterstützt?", a: "Ja. Tarife unterstützen typischerweise Benutzername/Passwort und IP-Whitelisting." },
      { q: "Wie schnell werden Proxies aktiviert?", a: "Der Zugriff ist meist kurz nach der Zahlung verfügbar, und die Daten erscheinen im Dashboard." },
    ],
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/faqs",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["proxy faq", "scraping proxy faq", "social media proxies", "seo proxies"],
  });
}

export default function LocalizedFaqPage({ params }: { params: { locale: Locale } }) {
  const content = copy[params.locale];

  return (
    <main className="bg-[linear-gradient(180deg,#f8fbff_0%,#ffffff_45%,#fff7ef_100%)]">
      <section className="container-page py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black tracking-tight text-slate-950">{content.headline}</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{content.intro}</p>
        </div>
        <div className="mt-10 max-w-4xl rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_26px_70px_rgba(15,23,42,0.08)]">
          <FaqAccordion items={[...content.faqs]} />
        </div>
      </section>
    </main>
  );
}
