import type { Metadata } from "next";
import Link from "next/link";
import { type Locale, localizeHref } from "@/lib/i18n";
import { buildLocalizedMetadata } from "@/lib/seo";

const copy = {
  en: {
    title: "Contact Proxiesseller | Talk to sales or support",
    description: "Contact Proxiesseller for custom proxy plans, sales guidance, or setup help for scraping, TikTok and SEO workflows.",
    eyebrow: "Contact",
    headline: "Talk to a team that understands proxy buying decisions.",
    body: "Reach out for custom proxy plans, region-specific inventory, onboarding help, or recommendations for scraping, social media, and SEO operations.",
    detailsTitle: "Direct contact",
    messageTitle: "Send a message",
    labels: { name: "Your name", email: "Your email", subject: "Subject", message: "Message", button: "Send message" },
    note: "This form is currently visual only and can be wired to your backend next.",
    pricing: "See pricing first",
  },
  es: {
    title: "Contacto Proxiesseller | Ventas y soporte",
    description: "Contacta con Proxiesseller para planes proxy a medida, orientación comercial o ayuda de configuración para scraping, TikTok y SEO.",
    eyebrow: "Contacto",
    headline: "Habla con un equipo que entiende cómo se compran proxies.",
    body: "Escríbenos si necesitas planes proxy personalizados, inventario por región, ayuda de onboarding o recomendaciones para scraping, social media y SEO.",
    detailsTitle: "Contacto directo",
    messageTitle: "Enviar mensaje",
    labels: { name: "Tu nombre", email: "Tu email", subject: "Asunto", message: "Mensaje", button: "Enviar mensaje" },
    note: "Este formulario es visual por ahora y podemos conectarlo al backend después.",
    pricing: "Ver precios primero",
  },
  fr: {
    title: "Contacter Proxiesseller | Ventes et support",
    description: "Contactez Proxiesseller pour des offres proxy sur mesure, des conseils avant-vente ou une aide à l'intégration pour le scraping, TikTok et le SEO.",
    eyebrow: "Contact",
    headline: "Parlez à une équipe qui comprend vraiment l'achat de proxies.",
    body: "Contactez-nous pour des offres personnalisées, un inventaire par zone géographique, de l'aide au démarrage ou des recommandations pour vos workflows scraping, social media et SEO.",
    detailsTitle: "Contact direct",
    messageTitle: "Envoyer un message",
    labels: { name: "Votre nom", email: "Votre email", subject: "Sujet", message: "Message", button: "Envoyer le message" },
    note: "Ce formulaire est pour l'instant visuel uniquement et peut être branché à votre backend ensuite.",
    pricing: "Voir les tarifs d'abord",
  },
  de: {
    title: "Kontakt zu Proxiesseller | Sales und Support",
    description: "Kontaktiere Proxiesseller für individuelle Proxy-Tarife, Sales-Beratung oder Setup-Hilfe für Scraping-, TikTok- und SEO-Workflows.",
    eyebrow: "Kontakt",
    headline: "Sprich mit einem Team, das Proxy-Kaufentscheidungen wirklich versteht.",
    body: "Melde dich für individuelle Proxy-Tarife, regionsspezifisches Inventar, Onboarding-Hilfe oder Empfehlungen für Scraping-, Social-Media- und SEO-Workflows.",
    detailsTitle: "Direkter Kontakt",
    messageTitle: "Nachricht senden",
    labels: { name: "Dein Name", email: "Deine E-Mail", subject: "Betreff", message: "Nachricht", button: "Nachricht senden" },
    note: "Dieses Formular ist aktuell nur visuell und kann als Nächstes ans Backend angeschlossen werden.",
    pricing: "Erst Preise ansehen",
  },
} as const;

const contactDetails = [
  { icon: "fas fa-envelope", title: "Email", text: "support@proxiesseller.com" },
  { icon: "fas fa-phone", title: "Phone", text: "+1 (800) 230-2493" },
  { icon: "fas fa-location-dot", title: "Address", text: "11708 San Vicente Blvd. Los Angeles, CA 90049" },
];

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return buildLocalizedMetadata({
    locale: params.locale,
    pathname: "/contact",
    title: copy[params.locale].title,
    description: copy[params.locale].description,
    keywords: ["contact proxy provider", "proxy sales", "proxy support", "scraping proxy help"],
  });
}

export default function LocalizedContactPage({ params }: { params: { locale: Locale } }) {
  const content = copy[params.locale];

  return (
    <main className="bg-[radial-gradient(circle_at_top,#e6fff5_0%,#ffffff_55%,#fff5e8_100%)]">
      <section className="container-page py-20">
        <div className="max-w-3xl">
          <div className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-emerald-800">
            {content.eyebrow}
          </div>
          <h1 className="mt-6 text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            {content.headline}
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">{content.body}</p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/70 bg-white/85 p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] backdrop-blur">
            <div className="text-sm font-black uppercase tracking-[0.22em] text-slate-500">
              {content.detailsTitle}
            </div>
            <div className="mt-6 grid gap-4">
              {contactDetails.map((item) => (
                <div key={item.title} className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4">
                  <div className="text-xl text-emerald-600"><i className={item.icon} /></div>
                  <div className="mt-3 text-sm font-black text-slate-900">{item.title}</div>
                  <div className="mt-1 text-sm text-slate-600">{item.text}</div>
                </div>
              ))}
            </div>
            <Link href={localizeHref(params.locale, "/pricing")} className="mt-6 inline-flex rounded-full bg-slate-950 px-6 py-3 text-sm font-black text-white transition hover:bg-slate-800">
              {content.pricing}
            </Link>
          </div>

          <div className="rounded-[2rem] bg-slate-950 p-8 text-white shadow-[0_34px_90px_rgba(15,23,42,0.28)]">
            <div className="text-2xl font-black">{content.messageTitle}</div>
            <form className="mt-6 grid gap-4 sm:grid-cols-2">
              <input className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400" placeholder={content.labels.name} />
              <input className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400" placeholder={content.labels.email} />
              <input className="sm:col-span-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400" placeholder={content.labels.subject} />
              <textarea className="sm:col-span-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-400" placeholder={content.labels.message} rows={6} />
              <button type="button" className="sm:col-span-2 rounded-full bg-amber-400 px-6 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300">
                {content.labels.button}
              </button>
            </form>
            <p className="mt-4 text-xs leading-6 text-slate-400">{content.note}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
