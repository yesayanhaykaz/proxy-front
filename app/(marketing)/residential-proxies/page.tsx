import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Residential Proxies — Real ISP IPs & High Success Rate | Proxiesseller",
  description:
    "Buy residential proxies with real ISP IP reputation for web scraping, SERP tracking, sneaker bots, marketplaces and account management. Rotating pool with sticky sessions.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=residential`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  // minimal mapping to your existing UI shape
  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name, // or "Starter/Pro/Enterprise" if you want
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      p.rotation === "static" ? "Static" : "Rotating",
      "HTTP/SOCKS5",
      "Instant setup",
      "Dedicated credentials",
      "24/7 Support",
    ],
    bestFor:
      p.type === "datacenter"
        ? ["API access", "Automation", "Stable sessions"]
        : ["Scraping", "SERP tracking", "Account management"],
    href: `/pricing?type=residential#plans`,
  }));

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80"
      typeSlug="residential"
      typeName="Residential Proxies"
      headline="Real residential IPs that blend in naturally"
      subheadline="Best for high-trust targets: SERP tracking, scraping, socials, marketplaces, and automation that needs clean IP reputation."
      ctaHref="/pricing?type=residential"
      secondaryCtaHref="/pricing?type=residential#plans"
      secondaryCtaText="View all plans"
      previewPlans={previewPlans}
      rows={[
        { feature: "Success Rate", left: "99%+", right: "92%" },
        { feature: "IP Reputation", left: "Real ISP", right: "Mixed" },
        { feature: "Geo Coverage", left: "Broad", right: "Limited" },
        { feature: "Best For", left: "Strict sites", right: "Basic targets" },
      ]}
      useCases={[
        { title: "SERP tracking", desc: "Track rankings by country or city with fewer blocks." },
        { title: "Price monitoring", desc: "Monitor competitors reliably using rotating residential IPs." },
        { title: "Marketplace scraping", desc: "Collect product data with sticky sessions when needed." },
        { title: "Social automation", desc: "Run automation with higher trust scores and stability." },
        { title: "Ad verification", desc: "Verify ads and placements from real user networks." },
        { title: "Account management", desc: "Reduce risk with consistent sessions and controlled rotation." },
      ]}
      benefits={[
        { title: "Clean reputation", desc: "Residential IPs look like real users and help avoid bans." },
        { title: "Sticky sessions", desc: "Keep the same IP for a configurable session window." },
        { title: "Targeting", desc: "Choose countries (and more targeting options as you scale)." },
      ]}
      testimonials={[
        {
          name: "Alex Johnson",
          role: "E-commerce Analyst",
          quote:
            "These residential proxies improved our monitoring accuracy. IPs are clean, speed is consistent, and we saw fewer blocks after switching.",
          rating: 5,
        },
        {
          name: "Sarah Chen",
          role: "Market Researcher",
          quote:
            "City-level targeting works great for research. Support responds quickly and helps with specific location requests.",
          rating: 5,
        },
      ]}
      faqs={[
        { q: "Are residential proxies rotating or static?", a: "Residential plans support rotation and sticky sessions depending on your configuration and plan." },
        { q: "Can I keep the same IP (sticky sessions)?", a: "Yes. Use sticky sessions to keep a stable IP for a session window." },
        { q: "Do you support country, region, or city targeting?", a: "Country targeting is available, and more granular targeting can be provided for larger allocations." },
      ]}
      schema={{
        pageName: "Residential Proxies",
        description: "Residential proxies with real ISP IPs for scraping, SERP tracking, and automation.",
        urlPath: "/residential-proxies",
      }}
    />
  );
}
