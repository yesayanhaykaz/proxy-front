import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proxies for TikTok — Residential & Rotating IPs | Proxiesseller",
  description:
    "Buy TikTok proxies with unlimited bandwidth for account management, automation, and scraping. Residential & datacenter IPs with sticky sessions. Only $29.95/month.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=tiktok`, { cache: "no-store" });
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
      "TikTok-safe IP pool",
      "Instant activation",
    ],
    bestFor: ["TikTok automation", "Multi-account management", "Content scraping"],
    href: `/pricing?type=tiktok#plans`,
  }));

  // Fallback preview plan when no plans are returned from the API
  const displayPlans =
    previewPlans.length > 0
      ? previewPlans
      : [
          {
            id: "tiktok-unlimited",
            title: "Unlimited TikTok Proxy",
            price: "$29.95 /mo",
            popular: true,
            bullets: [
              "Unlimited bandwidth",
              "Rotating & sticky sessions",
              "HTTP/SOCKS5",
              "TikTok-safe IP pool",
              "Instant activation",
            ],
            bestFor: ["TikTok automation", "Multi-account management", "Content scraping"],
            href: `/pricing?type=tiktok#plans`,
          },
        ];

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=2400&q=80"
      typeSlug="tiktok"
      typeName="TikTok Proxies"
      headline="Unlimited TikTok proxies — stay fast, stay safe"
      subheadline="Run multiple TikTok accounts, power automation tools, and scrape trending content without bans. Residential IPs with sticky sessions built for TikTok's detection systems."
      ctaHref="/pricing?type=tiktok"
      secondaryCtaHref="/pricing?type=tiktok#plans"
      previewPlans={displayPlans}
      rows={[
        { feature: "Ban Protection", left: "Residential IP pool", right: "Datacenter only" },
        { feature: "TikTok Detection Bypass", left: "Very high", right: "Medium" },
        { feature: "Session control", left: "Sticky & rotating", right: "Rotating only" },
        { feature: "Best For", left: "Accounts & automation", right: "Basic requests" },
      ]}
      useCases={[
        { title: "Multi-account management", desc: "Assign a unique residential IP to each TikTok account to avoid IP-based bans and shadowbans." },
        { title: "TikTok automation", desc: "Power follow, like, comment, and DM bots safely with IPs that pass TikTok's AI detection." },
        { title: "Content & hashtag scraping", desc: "Extract trending hashtags, viral videos, and engagement metrics at scale without blocks." },
        { title: "Geo-targeting", desc: "Access TikTok content from 100+ countries for regional trend analysis and localized account management." },
        { title: "Agency management", desc: "Manage hundreds of client TikTok profiles safely from a single location with dedicated IPs." },
        { title: "Ad verification", desc: "Verify how TikTok ads appear across different regions and check competitor campaigns globally." },
      ]}
      benefits={[
        { title: "TikTok-safe IP pool", desc: "Our IPs are continuously tested against TikTok's detection — flagged IPs are replaced automatically." },
        { title: "Unlimited bandwidth", desc: "No data caps. Automate, scrape, and manage accounts 24/7 without worrying about overages." },
        { title: "Sticky & rotating sessions", desc: "Use sticky sessions for consistent account identity or rotating IPs for scraping — fully configurable." },
      ]}
      testimonials={[
        {
          name: "Marcus T.",
          role: "Social Media Agency Owner",
          quote:
            "We manage 300+ TikTok accounts for clients. ProxiesSeller proxies are the only ones that consistently pass TikTok's detection. Zero bans in 3 months.",
          rating: 5,
        },
        {
          name: "Lena K.",
          role: "Growth Marketer",
          quote:
            "The sticky session feature is a game-changer for account safety. Support was super responsive when I needed help configuring rotation settings.",
          rating: 5,
        },
      ]}
      faqs={[
        {
          q: "Are your proxies safe to use with TikTok?",
          a: "Yes. We use clean residential IPs sourced from real ISPs. Our IP pool is continuously refreshed and tested against TikTok's detection systems to ensure maximum account safety.",
        },
        {
          q: "How many TikTok accounts can I manage with one plan?",
          a: "Unlimited. Our plan supports unlimited concurrent connections. We recommend one dedicated sticky IP per account for maximum safety.",
        },
        {
          q: "Do your proxies work with TikTok bots and automation tools?",
          a: "Yes. Our proxies support HTTP, HTTPS, and SOCKS5 protocols and are compatible with all major TikTok automation tools and browsers.",
        },
        {
          q: "Can I target specific countries with TikTok proxies?",
          a: "Yes. You can select IPs from 100+ countries, perfect for managing geo-specific TikTok accounts or researching regional content trends.",
        },
        {
          q: "What happens if a proxy gets flagged by TikTok?",
          a: "Flagged IPs are automatically replaced from our pool. Our team monitors IP health 24/7 so you always have access to clean, working proxies.",
        },
      ]}
      schema={{
        pageName: "Proxies for TikTok",
        description:
          "Residential and datacenter proxies for TikTok automation, multi-account management, and content scraping. Unlimited bandwidth, $29.95/month.",
        urlPath: "/proxies-for-tiktok",
      }}
    />
  );
}
