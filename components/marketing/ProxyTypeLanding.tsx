import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  Check,
  ChevronUp,
  Gauge,
  Headphones,
  MessageCircle,
  Quote,
  Server,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  Zap,
} from "lucide-react";
import { localizeHref, type Locale } from "@/lib/i18n";
import { PlanCard } from "@/components/marketing/PlanCard";

type PreviewPlan = {
  id: string;
  title: string;
  price: string;
  bullets: string[];
  badges?: string[];
  subtitle?: string;
  bestFor?: string[];
  href?: string;
  popular?: boolean;
};

type Row = { feature: string; left: string; right: string };
type FAQ = { q: string; a?: string };

type Testimonial = {
  name: string;
  role?: string;
  quote: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  avatarUrl?: string;
};

type Labels = {
  buyNow?: string;
  viewAllPlans?: string;
  secureCheckout?: string;
  instantActivation?: string;
  liveSupport?: string;
  supportOnline?: string;
  askUs?: string;
  popularPlans?: string;
  planIntro?: string;
  allPlansCta?: string;
  performanceComparison?: string;
  feature?: string;
  regularProxies?: string;
  useCases?: string;
  useCasesTitle?: string;
  useCasesSubtitle?: string;
  benefits?: string;
  benefitsTitle?: string;
  benefitsSubtitle?: string;
  trustedBy?: string;
  trustedByBody?: string;
  talkToSales?: string;
  faq?: string;
  faqAnswerSoon?: string;
  finalTitle?: string;
  finalBody?: string;
  finalButton?: string;
  explore?: string;
  pricing?: string;
  blog?: string;
  contact?: string;
  mostPopular?: string;
  bestValue?: string;
  bestFor?: string;
};

export function ProxyTypeLanding(props: {
  heroBg?: string;
  typeSlug:
    | "residential"
    | "mobile"
    | "datacenter"
    | "fast"
    | "instagram"
    | "betting"
    | "scraping"
    | "sneakers"
    | "tiktok";
  typeName: string;
  headline: string;
  subheadline: string;
  ctaHref: string;
  secondaryCtaHref?: string;
  secondaryCtaText?: string;
  previewPlans: PreviewPlan[];
  rows: Row[];
  faqs: FAQ[];
  useCases?: { title: string; desc: string }[];
  benefits?: { title: string; desc: string }[];
  testimonials?: Testimonial[];
  lastCtaTitle?: string;
  lastCtaDesc?: string;
  lastCtaHref?: string;
  schema?: {
    pageName: string;
    description: string;
    urlPath: string;
  };
  locale?: Locale;
  labels?: Labels;
}) {
  const {
    heroBg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",
    typeSlug,
    typeName,
    headline,
    subheadline,
    ctaHref,
    secondaryCtaHref = "/pricing",
    secondaryCtaText,
    previewPlans,
    rows,
    faqs,
    useCases = [],
    benefits = [],
    testimonials = [],
    lastCtaTitle = "Ready to scale safely?",
    lastCtaDesc = "Instant setup, clean routing, and stable performance.",
    lastCtaHref = ctaHref,
    schema,
    locale = "en",
    labels,
  } = props;

  const copy = {
    buyNow: labels?.buyNow || "Buy now",
    viewAllPlans: labels?.viewAllPlans || "View all plans",
    secureCheckout: labels?.secureCheckout || "Secure checkout",
    instantActivation: labels?.instantActivation || "Instant activation",
    liveSupport: labels?.liveSupport || "Live support",
    supportOnline: labels?.supportOnline || "Support is online",
    askUs:
      labels?.askUs ||
      "Ask us about targeting, rotation, and the best plan for your workflow.",
    popularPlans: labels?.popularPlans || "Popular plans",
    planIntro: labels?.planIntro || "Start small or scale fast — upgrade anytime.",
    allPlansCta: labels?.allPlansCta || `See all ${typeName} plans`,
    performanceComparison:
      labels?.performanceComparison || "Performance comparison",
    feature: labels?.feature || "Feature",
    regularProxies: labels?.regularProxies || "Regular proxies",
    useCases: labels?.useCases || "Use cases",
    useCasesTitle:
      labels?.useCasesTitle || `What ${typeName.toLowerCase()} are best for`,
    useCasesSubtitle:
      labels?.useCasesSubtitle ||
      "Designed for reliable automation, scraping, and geo workflows.",
    benefits: labels?.benefits || "Why teams choose this setup",
    benefitsTitle: labels?.benefitsTitle || "Built for stable performance",
    benefitsSubtitle:
      labels?.benefitsSubtitle ||
      "Clean provisioning, consistent routing, and support that helps you move faster.",
    trustedBy: labels?.trustedBy || "Trusted by thousands",
    trustedByBody:
      labels?.trustedByBody ||
      `Here’s what customers say about our ${typeName.toLowerCase()}.`,
    talkToSales: labels?.talkToSales || "Talk to sales",
    faq: labels?.faq || "Frequently asked questions",
    faqAnswerSoon:
      labels?.faqAnswerSoon || "Answer coming soon. Contact support for details.",
    finalTitle: labels?.finalTitle || lastCtaTitle,
    finalBody: labels?.finalBody || lastCtaDesc,
    finalButton: labels?.finalButton || "Buy now",
    explore: labels?.explore || "Explore",
    pricing: labels?.pricing || "Pricing",
    blog: labels?.blog || "Blog",
    contact: labels?.contact || "Contact",
    mostPopular: labels?.mostPopular || "Most popular",
    bestValue: labels?.bestValue || "Best value",
    bestFor: labels?.bestFor || "Best for",
  };

  const jsonLd =
    schema &&
    JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: schema.pageName,
      description: schema.description,
      url: `https://proxiesseller.cc${schema.urlPath}`,
      isPartOf: {
        "@type": "WebSite",
        name: "Proxiesseller",
        url: "https://proxiesseller.cc",
      },
      inLanguage: locale,
      about: {
        "@type": "Service",
        name: typeName,
        areaServed: "Worldwide",
      },
    });

  const liveSignals = [
    {
      icon: ShieldCheck,
      title: copy.secureCheckout,
      desc: "TLS protected payments and account security.",
    },
    {
      icon: Zap,
      title: copy.instantActivation,
      desc: "Plans provisioned immediately after purchase.",
    },
    {
      icon: Headphones,
      title: copy.liveSupport,
      desc: "Chat with support when you need help.",
    },
  ];

  return (
    <main className="bg-white">
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}

      <section className="relative overflow-hidden bg-slate-950">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-35"
          style={{ backgroundImage: `url('${heroBg}')` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-slate-950/55 to-slate-950/85" />
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute -bottom-40 right-[-120px] h-[520px] w-[520px] rounded-full bg-sky-500/15 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-extrabold text-slate-100">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              {typeName}
            </div>

            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              {headline}
            </h1>

            <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-200 sm:text-base">
              {subheadline}
            </p>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={localizeHref(locale, ctaHref)}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                {copy.buyNow} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href={localizeHref(locale, secondaryCtaHref)}
                className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-6 py-3 text-sm font-extrabold text-white/90 shadow-sm transition hover:bg-white/10"
              >
                {secondaryCtaText || copy.viewAllPlans}
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {liveSignals.map((signal) => (
                <div
                  key={signal.title}
                  className="rounded-2xl border border-white/12 bg-white/6 p-4 text-left backdrop-blur-sm transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <signal.icon className="h-4 w-4 text-slate-200" />
                    <div className="text-xs font-extrabold text-white">{signal.title}</div>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-300">{signal.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1">
                <MessageCircle className="h-4 w-4 text-slate-200" />
                {copy.supportOnline}
              </span>
              <span className="text-slate-500">•</span>
              <span>{copy.askUs}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">{copy.popularPlans}</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">{copy.planIntro}</p>
          </div>
          <Link
            href={localizeHref(locale, `${ctaHref}#plans`)}
            className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500"
          >
            {copy.allPlansCta} →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {previewPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              typeSlug={typeSlug}
              {...plan}
              href={plan.href ?? `/checkout?plan=${encodeURIComponent(plan.id)}&mode=register`}
              labels={{
                mostPopular: copy.mostPopular,
                bestValue: copy.bestValue,
                bestFor: copy.bestFor,
                buyNow: copy.buyNow,
              }}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-center text-2xl font-extrabold text-slate-900">
          {copy.performanceComparison}
        </h2>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid grid-cols-3 bg-slate-50 px-6 py-4 text-xs font-extrabold text-slate-600">
            <div>{copy.feature}</div>
            <div className="text-indigo-600">{typeName}</div>
            <div>{copy.regularProxies}</div>
          </div>

          <div className="divide-y divide-slate-200">
            {rows.map((row) => (
              <div key={row.feature} className="grid grid-cols-3 px-6 py-4 text-sm">
                <div className="font-bold text-slate-700">{row.feature}</div>
                <div className="font-extrabold text-slate-900">{row.left}</div>
                <div className="font-semibold text-slate-600">{row.right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {useCases.length ? (
        <ModernGridSection
          locale={locale}
          kicker={copy.useCases}
          title={copy.useCasesTitle}
          subtitle={copy.useCasesSubtitle}
          items={useCases.map((item, index) => ({
            title: item.title,
            desc: item.desc,
            icon:
              typeSlug === "datacenter"
                ? [Gauge, Bot, Server, Activity, Shield, Wrench][index % 6]
                : typeSlug === "mobile"
                ? [Bot, Shield, Activity, Gauge, Server, Wrench][index % 6]
                : typeSlug === "residential"
                ? [Shield, Activity, Bot, Gauge, Server, Wrench][index % 6]
                : [Gauge, Activity, Bot, Server, Shield, Wrench][index % 6],
            tone: index % 3 === 0 ? "indigo" : index % 3 === 1 ? "sky" : "emerald",
          }))}
          ctaLabel={copy.pricing}
        />
      ) : null}

      {benefits.length ? (
        <ModernGridSection
          locale={locale}
          kicker={copy.benefits}
          title={copy.benefitsTitle}
          subtitle={copy.benefitsSubtitle}
          items={benefits.map((item, index) => ({
            title: item.title,
            desc: item.desc,
            icon: [ShieldCheck, Zap, Headphones][index % 3],
            tone: index % 3 === 0 ? "indigo" : index % 3 === 1 ? "sky" : "emerald",
          }))}
          ctaLabel={copy.pricing}
        />
      ) : null}

      {testimonials.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">{copy.trustedBy}</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">{copy.trustedByBody}</p>
            </div>

            <Link
              href={localizeHref(locale, "/contact")}
              className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:text-indigo-500"
            >
              {copy.talkToSales} <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: testimonial.rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-slate-300" />
                </div>

                <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
                  “{testimonial.quote}”
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-700">
                    {testimonial.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{testimonial.name}</div>
                    {testimonial.role ? (
                      <div className="text-xs font-semibold text-slate-500">{testimonial.role}</div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-center text-2xl font-extrabold text-slate-900">{copy.faq}</h2>

        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-extrabold text-slate-900">{faq.q}</span>
                <ChevronUp className="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm font-semibold text-slate-600">
                {faq.a ?? copy.faqAnswerSoon}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">{copy.finalTitle}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{copy.finalBody}</p>

          <div className="mt-6">
            <Link
              href={localizeHref(locale, lastCtaHref)}
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500"
            >
              {copy.finalButton} →
            </Link>
          </div>

          <p className="mt-5 text-xs font-semibold text-slate-500">
            {copy.explore}:{" "}
            <Link className="underline hover:text-slate-900" href={localizeHref(locale, "/pricing")}>
              {copy.pricing}
            </Link>{" "}
            ·{" "}
            <Link className="underline hover:text-slate-900" href={localizeHref(locale, "/blog")}>
              {copy.blog}
            </Link>{" "}
            ·{" "}
            <Link className="underline hover:text-slate-900" href={localizeHref(locale, "/contact")}>
              {copy.contact}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

type ModernCard = {
  title: string;
  desc: string;
  icon: any;
  tone?: "indigo" | "sky" | "emerald" | "slate";
};

function toneClasses(tone: ModernCard["tone"]) {
  switch (tone) {
    case "indigo":
      return {
        border: "border-indigo-200/60",
        icon: "text-indigo-600 bg-indigo-600/10",
        shadow: "hover:shadow-[0_24px_70px_rgba(79,70,229,0.18)]",
        top: "from-indigo-500/10",
      };
    case "sky":
      return {
        border: "border-sky-200/60",
        icon: "text-sky-600 bg-sky-600/10",
        shadow: "hover:shadow-[0_24px_70px_rgba(2,132,199,0.16)]",
        top: "from-sky-500/10",
      };
    case "emerald":
      return {
        border: "border-emerald-200/60",
        icon: "text-emerald-600 bg-emerald-600/10",
        shadow: "hover:shadow-[0_24px_70px_rgba(5,150,105,0.16)]",
        top: "from-emerald-500/10",
      };
    default:
      return {
        border: "border-slate-200/70",
        icon: "text-slate-700 bg-slate-900/5",
        shadow: "hover:shadow-[0_24px_70px_rgba(15,23,42,0.10)]",
        top: "from-slate-500/8",
      };
  }
}

function ModernGridSection(props: {
  locale: Locale;
  kicker: string;
  title: string;
  subtitle: string;
  items: ModernCard[];
  ctaLabel: string;
}) {
  const { locale, kicker, title, subtitle, items, ctaLabel } = props;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-700">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            {kicker}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">{title}</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-600">{subtitle}</p>
        </div>

        <Link
          href={localizeHref(locale, "/pricing")}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          {ctaLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const tone = toneClasses(item.tone);
          return (
            <div
              key={item.title}
              className={[
                "group relative overflow-hidden rounded-3xl border bg-white p-6 transition",
                "shadow-[0_10px_40px_rgba(15,23,42,0.06)] hover:-translate-y-0.5",
                tone.border,
                tone.shadow,
              ].join(" ")}
            >
              <div
                className={["absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent", tone.top].join(" ")}
                aria-hidden="true"
              />
              <div className="relative">
                <div className={["inline-flex h-12 w-12 items-center justify-center rounded-2xl", tone.icon].join(" ")}>
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-600">{item.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  <Check className="h-4 w-4" />
                  Proxy-ready
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
