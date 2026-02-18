import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Mobile Proxies — 4G/5G Rotating IPs & High Trust | Proxiesseller",
  description:
    "Buy mobile proxies with 4G/5G rotating IPs for socials, strict sites, app automation and account management. High trust score with rotation and sticky sessions.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=mobile`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "4G/5G pool",
      p.rotation === "static" ? "Static" : "Rotating & sticky sessions",
      "HTTP/SOCKS5",
      "High trust score",
      "Fast activation",
    ],
    bestFor: ["Social automation", "App testing", "Account safety"],
    href: `/pricing?type=mobile#plans`,
  }));

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
      typeSlug="mobile"
      typeName="Mobile Proxies"
      headline="4G/5G mobile IPs with top trust score"
      subheadline="Perfect for strict platforms, social automation, app workflows, and accounts that need the highest IP reputation."
      ctaHref="/pricing?type=mobile"
      secondaryCtaHref="/pricing?type=mobile#plans"
      previewPlans={previewPlans}
      rows={[
        { feature: "Trust Score", left: "Highest (Mobile)", right: "Medium" },
        { feature: "Success on strict sites", left: "Very high", right: "Medium" },
        { feature: "Rotation control", left: "Full control", right: "Limited" },
        { feature: "Best For", left: "Accounts & socials", right: "Basic scraping" },
      ]}
      useCases={[
        { title: "Social automation", desc: "Reduce blocks for social platforms with mobile reputation." },
        { title: "App workflows", desc: "Run mobile app automation and API workflows reliably." },
        { title: "Account management", desc: "Highest trust score helps keep accounts safe." },
        { title: "Geo testing", desc: "Test mobile experiences across regions." },
        { title: "Ad operations", desc: "Improve consistency for ad verification and accounts." },
        { title: "Strict targets", desc: "Best option for strict anti-bot platforms." },
      ]}
      benefits={[
        { title: "4G/5G reputation", desc: "Mobile IPs have the strongest trust profile for strict sites." },
        { title: "Sticky sessions", desc: "Keep a stable session when you need consistency." },
        { title: "Rotation control", desc: "Switch IPs as needed with configurable rotation." },
      ]}
      testimonials={[
        {
          name: "Alex Johnson",
          role: "E-commerce Analyst",
          quote:
            "These mobile proxies improved our success on strict platforms. Rotation is smooth and sessions stay stable when needed.",
          rating: 5,
        },
        {
          name: "Sarah Chen",
          role: "Growth Marketer",
          quote:
            "Great for account workflows. Support helped us pick rotation settings and the stability is noticeably better.",
          rating: 5,
        },
      ]}
      faqs={[
        { q: "How often do mobile proxies rotate?", a: "Rotation can be configured depending on plan and your preferred workflow." },
        { q: "Do mobile proxies support sticky sessions?", a: "Yes — you can keep the same IP for a session window." },
        { q: "Which protocol is supported?", a: "HTTP and SOCKS5 are supported depending on plan." },
      ]}
      schema={{
        pageName: "Mobile Proxies",
        description: "4G/5G mobile proxies for strict sites, social automation and account workflows.",
        urlPath: "/mobile-proxies",
      }}
    />
  );
}
