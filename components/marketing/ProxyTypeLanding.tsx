import Link from "next/link";
import {
  Check,
  ShieldCheck,
  Zap,
  Headphones,
  ChevronUp,
  Star,
  Quote,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Activity,
  Bot,
  Gauge,
  Server,
  Wrench,
  Shield,
} from "lucide-react";

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
  avatarUrl?: string; // optional
};

export function ProxyTypeLanding(props: {
  heroBg?: string;

  typeSlug: "residential" | "mobile" | "datacenter" | "fast";
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

  // New: testimonials section (replaces locations)
  testimonials?: Testimonial[];

  lastCtaTitle?: string;
  lastCtaDesc?: string;
  lastCtaHref?: string;

  schema?: {
    pageName: string;
    description: string;
    urlPath: string;
  };
}) {
  const {
    heroBg = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80",

    typeSlug,
    typeName,
    headline,
    subheadline,
    ctaHref,
    secondaryCtaHref = "/pricing",
    secondaryCtaText = "View all plans",
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
  } = props;

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
        name: "ProxiesSeller",
        url: "https://proxiesseller.cc",
      },
      about: {
        "@type": "Service",
        name: typeName,
        areaServed: "Worldwide",
      },
    });

  // tasteful “live” micro UX blocks (no fake numbers)
  const liveSignals = [
    { icon: ShieldCheck, title: "Secure checkout", desc: "TLS protected payments and account security." },
    { icon: Zap, title: "Instant activation", desc: "Plans provisioned immediately after purchase." },
    { icon: Headphones, title: "Live support", desc: "Chat with support when you need help." },
  ];

  return (
    <main className="bg-white">
      {jsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      ) : null}

      {/* HERO */}
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
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-6 py-3 text-sm font-extrabold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                Buy Now <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href={secondaryCtaHref}
                className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-6 py-3 text-sm font-extrabold text-white/90 shadow-sm transition hover:bg-white/10"
              >
                {secondaryCtaText}
              </Link>
            </div>

            {/* Trust row (icons only) */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {liveSignals.map((s) => (
                <div
                  key={s.title}
                  className="rounded-2xl border border-white/12 bg-white/6 p-4 text-left backdrop-blur-sm transition hover:bg-white/10"
                >
                  <div className="flex items-center gap-2">
                    <s.icon className="h-4 w-4 text-slate-200" />
                    <div className="text-xs font-extrabold text-white">{s.title}</div>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-300">{s.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold text-slate-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-1">
                <MessageCircle className="h-4 w-4 text-slate-200" />
                Support is online
              </span>
              <span className="text-slate-500">•</span>
              <span>Ask us about targeting, rotation, and best plan for your case</span>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR PLANS */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-6">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900">Popular plans</h2>
            <p className="mt-2 text-sm font-semibold text-slate-600">
              Start small or scale fast — upgrade anytime.
            </p>
          </div>
          <Link
            href={`${ctaHref}#plans`}
            className="text-sm font-extrabold text-indigo-600 hover:text-indigo-500"
          >
            See all {typeName} plans →
          </Link>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {previewPlans.map((p) => (
            <PlanCard
              key={p.id}
              typeSlug={typeSlug}
              {...p}
              href={p.href ?? `/checkout?plan=${encodeURIComponent(p.id)}&mode=register`}
            />
          ))}
        </div>
      </section>

      {/* PERFORMANCE COMPARISON */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center">
          Performance comparison
        </h2>

        <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white">
          <div className="grid grid-cols-3 bg-slate-50 px-6 py-4 text-xs font-extrabold text-slate-600">
            <div>Feature</div>
            <div className="text-indigo-600">{typeName}</div>
            <div>Regular proxies</div>
          </div>

          <div className="divide-y divide-slate-200">
            {rows.map((r) => (
              <div key={r.feature} className="grid grid-cols-3 px-6 py-4 text-sm">
                <div className="font-bold text-slate-700">{r.feature}</div>
                <div className="font-extrabold text-slate-900">{r.left}</div>
                <div className="font-semibold text-slate-600">{r.right}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* USE CASES (modern) */}
{useCases.length ? (
  <ModernGridSection
    kicker="Use cases"
    title={`What ${typeName.toLowerCase()} are best for`}
    subtitle="Designed for reliable automation, scraping, and geo workflows — with predictable performance."
    items={useCases.map((c, i) => ({
      title: c.title,
      desc: c.desc,
      icon:
        typeSlug === "datacenter"
          ? [Gauge, Bot, Server, Activity, Shield, Wrench][i % 6]
          : typeSlug === "mobile"
          ? [Bot, Shield, Activity, Gauge, Server, Wrench][i % 6]
          : typeSlug === "residential"
          ? [Shield, Activity, Bot, Gauge, Server, Wrench][i % 6]
          : [Gauge, Activity, Bot, Server, Shield, Wrench][i % 6],
      tone:
        i % 3 === 0 ? "indigo" : i % 3 === 1 ? "sky" : "emerald",
      featured: i === 1 && typeSlug === "datacenter",
    }))}
  />
) : null}

{/* BENEFITS (modern) */}
{benefits.length ? (
  <ModernGridSection
    kicker="Why ProxiesSeller"
    title="Built for stable performance"
    subtitle="Clean provisioning, consistent routing, and support that helps you ship faster."
    items={benefits.map((b, i) => ({
      title: b.title,
      desc: b.desc,
      icon: [ShieldCheck, Zap, Headphones][i % 3],
      tone: i % 3 === 0 ? "indigo" : i % 3 === 1 ? "sky" : "emerald",
    }))}
  />
) : null}





      {/* TESTIMONIALS (replaces Global coverage) */}
      {testimonials.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-12">
          <div className="flex items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">Trusted by thousands</h2>
              <p className="mt-2 text-sm font-semibold text-slate-600">
                Here’s what customers say about our {typeName.toLowerCase()}.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-indigo-600 hover:text-indigo-500"
            >
              Talk to sales <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 4).map((t, idx) => (
              <div
                key={`${t.name}-${idx}`}
                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-slate-300" />
                </div>

                <p className="mt-4 text-base font-semibold leading-relaxed text-slate-700">
                  “{t.quote}”
                </p>

                <div className="mt-6 flex items-center gap-3">
                  {t.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatarUrl}
                      alt={t.name}
                      className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-extrabold text-slate-700">
                      {t.name.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                    </div>
                  )}

                  <div>
                    <div className="text-sm font-extrabold text-slate-900">{t.name}</div>
                    {t.role ? <div className="text-xs font-semibold text-slate-500">{t.role}</div> : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <h2 className="text-2xl font-extrabold text-slate-900 text-center">
          Frequently asked questions
        </h2>

        <div className="mx-auto mt-6 max-w-3xl space-y-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-sm font-extrabold text-slate-900">{f.q}</span>
                <ChevronUp className="h-5 w-5 text-slate-400 transition group-open:rotate-180" />
              </summary>
              <p className="mt-3 text-sm font-semibold text-slate-600">
                {f.a ?? "Answer coming soon. Contact support for details."}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
          <h2 className="text-2xl font-extrabold text-slate-900">{lastCtaTitle}</h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">{lastCtaDesc}</p>

          <div className="mt-6">
            <Link
              href={lastCtaHref}
              className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-7 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500"
            >
              Buy Now →
            </Link>
          </div>

          <p className="mt-5 text-xs font-semibold text-slate-500">
            Explore:{" "}
            <Link className="underline hover:text-slate-900" href="/pricing">
              Pricing
            </Link>{" "}
            ·{" "}
            <Link className="underline hover:text-slate-900" href="/blog">
              Blog
            </Link>{" "}
            ·{" "}
            <Link className="underline hover:text-slate-900" href="/contact">
              Contact
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
  featured?: boolean;
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
  kicker: string;
  title: string;
  subtitle: string;
  items: ModernCard[];
}) {
  const { kicker, title, subtitle, items } = props;

  return (
    <section className="mx-auto max-w-6xl px-4 pb-12">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-extrabold text-slate-700">
            <Sparkles className="h-4 w-4 text-indigo-600" />
            {kicker}
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold text-slate-600">
            {subtitle}
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-extrabold text-slate-900 shadow-sm transition hover:bg-slate-50"
        >
          View pricing <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const t = toneClasses(it.tone);

          return (
            <div
              key={it.title}
              className={[
                "group relative overflow-hidden rounded-3xl border bg-white p-6 transition",
                "shadow-[0_10px_40px_rgba(15,23,42,0.06)] hover:-translate-y-0.5",
                t.border,
                t.shadow,
                it.featured ? "ring-1 ring-indigo-100" : "",
              ].join(" ")}
            >
              {/* top gradient */}
              <div
                className={[
                  "absolute inset-x-0 top-0 h-24 bg-gradient-to-b to-transparent",
                  t.top,
                ].join(" ")}
                aria-hidden="true"
              />

              <div className="relative flex items-start gap-4">
                <div className={["flex h-11 w-11 items-center justify-center rounded-2xl", t.icon].join(" ")}>
                  <it.icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <div className="text-base font-extrabold text-slate-900">
                    {it.title}
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-slate-600">
                    {it.desc}
                  </p>
                </div>
              </div>

              {it.featured ? (
                <div className="relative mt-5 rounded-2xl border border-indigo-200/60 bg-indigo-50/60 px-4 py-3 text-xs font-extrabold text-indigo-700">
                  Recommended for high-concurrency automation and fast throughput.
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PlanCard({
  typeSlug,
  title,
  price,
  bullets,
  badges,
  subtitle,
  bestFor,
  href,
  popular,
}: PreviewPlan & { typeSlug: string }) {
  const defaultBadges =
    badges?.length
      ? badges
      : typeSlug === "residential"
      ? ["Rotating", "HTTP/SOCKS5", "Sticky"]
      : typeSlug === "mobile"
      ? ["4G/5G", "Rotating", "High trust"]
      : typeSlug === "datacenter"
      ? ["Static", "Blazing fast", "Affordable"]
      : ["Optimized", "Low latency", "Stable"];

  return (
    <div
      className={`relative rounded-3xl border bg-white p-6 shadow-sm transition hover:shadow-md ${
        popular ? "border-indigo-200 ring-1 ring-indigo-100" : "border-slate-200"
      }`}
    >
      {popular && (
        <div className="absolute -top-3 left-6 rounded-full bg-indigo-600 px-3 py-1 text-xs font-extrabold text-white shadow-sm">
          Most popular
        </div>
      )}

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-lg font-extrabold text-slate-900">{title}</div>
          <div className="mt-1 text-sm font-semibold text-slate-500">
            {subtitle ?? "Instant activation · Upgrade anytime"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-extrabold text-indigo-600">{price}</div>
          <div className="mt-1 text-xs font-semibold text-slate-500">Best value</div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {defaultBadges.map((b) => (
          <span
            key={b}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-700"
          >
            {b}
          </span>
        ))}
      </div>

      <ul className="mt-5 space-y-2">
        {bullets.slice(0, 6).map((t) => (
          <li key={t} className="flex items-start gap-2 text-sm font-semibold text-slate-700">
            <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-4 w-4" />
            </span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      {bestFor?.length ? (
        <div className="mt-4">
          <div className="text-xs font-extrabold text-slate-900">Best for</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {bestFor.map((t) => (
              <span key={t} className="rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-bold text-indigo-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs font-semibold text-slate-600">
        Secure checkout · Instant activation · 24/7 support
      </div>

      <Link
        href={href ?? "/pricing"}
        className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-extrabold text-white shadow-sm transition hover:bg-indigo-500"
      >
        Buy Now →
      </Link>
    </div>
  );
}
