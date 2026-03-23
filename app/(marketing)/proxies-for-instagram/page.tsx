import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proxies for Instagram — Residential IPs for Automation & Accounts | Proxiesseller",
  description:
    "Buy Instagram proxies with unlimited bandwidth for multi-account management, automation bots, and DM campaigns. Residential IPs with sticky sessions. Only $29.95/month.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=instagram`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "Unlimited bandwidth",
      p.rotation === "static" ? "Static IP" : "Rotating & sticky sessions",
      "HTTP/SOCKS5",
      "Instagram-safe IP pool",
      "Instant activation",
    ],
    bestFor: ["Instagram automation", "Multi-account management", "DM campaigns"],
  href: `/checkout?plan=custom&network=residential&protocol=http&session=sticky&traffic=15`,
  }));

  const displayPlans =
    previewPlans.length > 0
      ? previewPlans
      : [
          {
    id: "custom",
            title: "Unlimited Instagram Proxy",
              custom: 1,
            price: "$29.95 /mo",
            popular: true,
                      network: "residential",
              protocol: "http",
    bullets: [
              "Unlimited bandwidth",
              "Rotating & sticky sessions",
              "HTTP/SOCKS5",
              "Instagram-safe IP pool",
              "Instant activation",
            ],
           href: `/checkout?plan=custom&network=residential&protocol=http&session=sticky&traffic=15`,
   bestFor: ["Instagram automation", "Multi-account management", "DM campaigns"],
          },
        ];

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=2400&q=80"
      typeSlug="instagram"
      typeName="Instagram Proxies"
      headline="Residential Instagram proxies — scale without action blocks"
      subheadline="Manage hundreds of Instagram accounts, run automation bots, and execute DM campaigns safely. Clean residential IPs with dedicated sticky sessions per account."
      ctaHref="/pricing?type=instagram"
      secondaryCtaHref="/pricing?type=instagram#plans"
      previewPlans={displayPlans}
      rows={[
        { feature: "Action Block Risk", left: "Very low (residential)", right: "High (datacenter)" },
        { feature: "Instagram detection bypass", left: "Very high", right: "Medium" },
        { feature: "Session control", left: "Dedicated sticky IP/account", right: "Shared rotating" },
        { feature: "Best For", left: "Accounts & bot safety", right: "Basic requests" },
      ]}
      useCases={[
        { title: "Multi-account management", desc: "Run dozens or hundreds of Instagram profiles from one place with a dedicated IP per account." },
        { title: "Instagram automation", desc: "Power follow/unfollow, auto-like, auto-comment, and story-view bots without triggering action blocks." },
        { title: "DM outreach campaigns", desc: "Scale direct message campaigns across multiple accounts without blocks or spam flags." },
        { title: "Competitor research", desc: "Scrape follower lists, engagement data, and hashtag insights from competitor profiles at scale." },
        { title: "Agency account management", desc: "Handle all client Instagram accounts from one location with dedicated IPs preventing cross-contamination." },
        { title: "Ad verification", desc: "Check how Instagram ads render in different countries and audit competitor advertising strategies." },
      ]}
      benefits={[
        { title: "Action block prevention", desc: "Residential IPs rotate intelligently and mimic genuine user behavior, preventing Instagram's action block even under heavy automation." },
        { title: "Dedicated sticky sessions", desc: "Each account gets its own consistent IP address, creating a natural login history that Instagram trusts as a real user." },
        { title: "Bot-compatible infrastructure", desc: "Works out of the box with Jarvee, FollowAdder, MassPlanner, Instabot, and all other popular Instagram automation tools." },
      ]}
      testimonials={[
        {
          name: "Daniel R.",
          role: "Instagram Marketing Agency",
          quote:
            "We run 500+ client accounts through ProxiesSeller proxies. The sticky session feature is essential — no cross-account bans since we switched.",
          rating: 5,
        },
        {
          name: "Priya M.",
          role: "E-commerce Growth Manager",
          quote:
            "Finally proxies that actually work with Jarvee without constant action blocks. Setup was instant and support helped us dial in the rotation settings.",
          rating: 5,
        },
      ]}
      faqs={[
        {
          q: "Will Instagram ban my accounts if I use proxies?",
          a: "Not with our proxies. We use clean residential IPs that appear as genuine users to Instagram. The key is one dedicated IP per account — which our sticky session feature handles automatically.",
        },
        {
          q: "How many Instagram accounts can I run per plan?",
          a: "Unlimited. Our plan supports unlimited concurrent connections. We recommend one sticky residential IP per account for the highest level of safety.",
        },
        {
          q: "Are your proxies compatible with Jarvee and other automation tools?",
          a: "Yes. Our proxies support HTTP, HTTPS, and SOCKS5 and work seamlessly with Jarvee, FollowAdder, MassPlanner, Instazood, and all other major Instagram automation platforms.",
        },
        {
          q: "What if an IP gets flagged by Instagram?",
          a: "Our system automatically replaces flagged IPs. Support monitors IP health around the clock so you always have access to clean, high-trust residential IPs.",
        },
        {
          q: "Can I choose proxies from specific countries?",
          a: "Yes. Select IPs from 100+ countries for geo-specific account management or to research local Instagram markets and audiences.",
        },
      ]}
      schema={{
        pageName: "Proxies for Instagram",
        description:
          "Residential proxies for Instagram automation, multi-account management, and DM campaigns. Unlimited bandwidth, $29.95/month.",
        urlPath: "/proxies-for-instagram",
      }}
    />
  );
}
