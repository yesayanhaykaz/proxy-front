import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizeHref } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  en: {
    title: "Affiliate program for proxy publishers and marketers | Proxiesseller",
    description: "Promote Proxiesseller and earn commissions by referring proxy buyers, scraping teams, agencies, and SEO operators.",
    headline: "Affiliate program built for publishers, communities, and B2B marketers.",
    body: "Promote Proxiesseller to scraping teams, SEO specialists, agencies, creators, and automation buyers. Use your audience, content, or community to generate recurring proxy revenue.",
    cards: [
      { title: "Share", text: "Promote your referral link in articles, YouTube content, Telegram groups, newsletters, or niche communities." },
      { title: "Earn", text: "Generate commissions from qualified customers looking for residential, mobile, datacenter, and social-media proxy plans." },
      { title: "Scale", text: "Build a repeatable acquisition channel around high-intent proxy keywords and commercial use cases." },
    ],
    cta: "Join affiliate program",
  },
  es: {
    title: "Programa de afiliados para publishers y marketers proxy | Proxiesseller",
    description: "Promociona Proxiesseller y gana comisiones recomendando compradores de proxies, equipos de scraping, agencias y especialistas SEO.",
    headline: "Un programa de afiliados pensado para publishers, comunidades y marketers B2B.",
    body: "Promociona Proxiesseller a equipos de scraping, especialistas SEO, agencias, creadores y compradores de automatización. Convierte tu audiencia, contenido o comunidad en ingresos recurrentes.",
    cards: [
      { title: "Comparte", text: "Promociona tu enlace en artículos, YouTube, grupos de Telegram, newsletters o comunidades de nicho." },
      { title: "Gana", text: "Obtén comisiones de clientes cualificados que buscan proxies residenciales, móviles, datacenter y social media." },
      { title: "Escala", text: "Construye un canal de adquisición repetible alrededor de keywords proxy con intención de compra." },
    ],
    cta: "Unirme al programa",
  },
  fr: {
    title: "Programme d'affiliation pour publishers et marketeurs proxy | Proxiesseller",
    description: "Faites la promotion de Proxiesseller et gagnez des commissions en recommandant des acheteurs de proxies, équipes scraping, agences et spécialistes SEO.",
    headline: "Un programme d'affiliation conçu pour les publishers, communautés et marketeurs B2B.",
    body: "Promouvez Proxiesseller auprès des équipes scraping, experts SEO, agences, créateurs et acheteurs d'automatisation. Monétisez votre audience, votre contenu ou votre communauté avec des revenus récurrents.",
    cards: [
      { title: "Partagez", text: "Diffusez votre lien d'affiliation dans des articles, vidéos YouTube, groupes Telegram, newsletters ou communautés spécialisées." },
      { title: "Gagnez", text: "Recevez des commissions sur des clients qualifiés recherchant des proxies résidentiels, mobiles, datacenter ou social media." },
      { title: "Développez", text: "Créez un canal d'acquisition durable autour de mots-clés proxy à forte intention commerciale." },
    ],
    cta: "Rejoindre le programme",
  },
  de: {
    title: "Affiliate-Programm für Publisher und Proxy-Marketer | Proxiesseller",
    description: "Empfiehl Proxiesseller weiter und verdiene Provisionen mit Proxy-Käufern, Scraping-Teams, Agenturen und SEO-Profis.",
    headline: "Ein Affiliate-Programm für Publisher, Communities und B2B-Marketer.",
    body: "Empfiehl Proxiesseller an Scraping-Teams, SEO-Spezialisten, Agenturen, Creator und Automatisierungs-Käufer. Verwandle Reichweite, Content oder Community in wiederkehrenden Proxy-Umsatz.",
    cards: [
      { title: "Teilen", text: "Platziere deinen Link in Artikeln, YouTube-Inhalten, Telegram-Gruppen, Newslettern oder Nischen-Communities." },
      { title: "Verdienen", text: "Erhalte Provisionen von qualifizierten Kunden, die Residential-, Mobile-, Datacenter- und Social-Media-Proxies suchen." },
      { title: "Skalieren", text: "Baue einen wiederholbaren Akquisekanal rund um Proxy-Keywords mit hoher Kaufabsicht auf." },
    ],
    cta: "Affiliate-Programm beitreten",
  },
} as const;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/affiliate",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["proxy affiliate program", "proxy referral program", "affiliate proxies", "proxy commissions"],
  });
}

export default function LocalizedAffiliatePage({ params }: { params: { locale: Locale } }) {
  const content = copy[params.locale];

  return (
    <main className="bg-[linear-gradient(180deg,#f5f8ff_0%,#ffffff_40%,#fff8ef_100%)]">
      <section className="container-page py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">{content.headline}</h1>
          <p className="mt-6 text-lg leading-8 text-slate-600">{content.body}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.cards.map((card) => (
            <div key={card.title} className="rounded-[2rem] border border-white/80 bg-white/90 p-7 shadow-[0_28px_70px_rgba(15,23,42,0.08)]">
              <div className="text-lg font-black text-slate-950">{card.title}</div>
              <p className="mt-3 text-sm leading-7 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link
            href={localizeHref(params.locale, "/contact")}
            className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800"
          >
            {content.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
