import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proxies for Betting — Access Any Bookmaker & Scrape Odds | Proxiesseller",
  description:
    "Buy betting proxies for sports betting, odds scraping, and bookmaker access. Bypass geo-restrictions with residential IPs. Unlimited bandwidth. Only $29.95/month.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=betting`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "Unlimited bandwidth",
      p.rotation === "static" ? "Static residential IP" : "Rotating & sticky sessions",
      "HTTP/SOCKS5",
      "100+ country coverage",
      "Bookmaker-safe IPs",
    ],
    bestFor: ["Odds scraping", "Geo-restricted bookmakers", "Arbitrage software"],
    href: `/pricing?type=betting#plans`,
  }));

  const displayPlans =
    previewPlans.length > 0
      ? previewPlans
      : [
          {
    id: "custom",
            title: "Unlimited Betting Proxy",
            price: "$29.95 /mo",
            popular: true,
            bullets: [
              "Unlimited bandwidth",
              "Rotating & sticky sessions",
              "HTTP/SOCKS5",
              "100+ country coverage",
              "Bookmaker-safe IPs",
            ],
            bestFor: ["Odds scraping", "Geo-restricted bookmakers", "Arbitrage software"],
          },
        ];

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=2400&q=80"
      typeSlug="betting"
      typeName="Betting Proxies"
      headline="Residential proxies for betting — access any bookmaker, anywhere"
      subheadline="Bypass geo-restrictions, protect your accounts, and scrape live odds from any bookmaker worldwide. Anonymous residential IPs that bookmakers cannot detect as proxy traffic."
      ctaHref="/pricing?type=betting"
      secondaryCtaHref="/pricing?type=betting#plans"
      previewPlans={displayPlans}
      rows={[
        { feature: "Bookmaker detection", left: "Undetectable (residential)", right: "Often flagged (datacenter)" },
        { feature: "Geo-restriction bypass", left: "100+ countries", right: "Limited regions" },
        { feature: "Odds scraping speed", left: "Low latency, unlimited", right: "Throttled" },
        { feature: "Best For", left: "Arbitrage & account safety", right: "Basic access" },
      ]}
      useCases={[
        { title: "Geo-restricted bookmaker access", desc: "Access Bet365, William Hill, Pinnacle, and other bookmakers blocked in your country using IPs from 100+ regions." },
        { title: "Arbitrage betting", desc: "Scrape live odds from dozens of bookmakers simultaneously to identify and act on arbitrage opportunities in real time." },
        { title: "Odds & line monitoring", desc: "Track line movements, opening odds, and closing lines across multiple sportsbooks for sharper betting decisions." },
        { title: "Multi-account management", desc: "Manage multiple bookmaker accounts from separate IPs to maximize bonus opportunities and limit gubbing risk." },
        { title: "Betting bot automation", desc: "Run automated betting bots that place wagers based on live data without triggering bookmaker bot detection systems." },
        { title: "Market & margin research", desc: "Collect historical odds data and bookmaker margin information for professional betting model development." },
      ]}
      benefits={[
        { title: "Undetectable residential IPs", desc: "Our IPs are sourced from real ISPs — bookmaker detection systems cannot distinguish them from genuine user traffic." },
        { title: "100+ country coverage", desc: "Select IPs from any country to access locally available bookmakers and collect region-specific odds data." },
        { title: "Real-time odds speed", desc: "Low-latency connections ensure you capture live in-play odds and line movements before the market shifts." },
      ]}
      testimonials={[
        {
          name: "Chris E.",
          role: "Professional Arbitrage Bettor",
          quote:
            "I run RebelBetting across 30+ bookmakers simultaneously. ProxiesSeller is the only proxy service where every connection stays clean and the latency is fast enough for in-play arbs.",
          rating: 5,
        },
        {
          name: "Nadia S.",
          role: "Sports Betting Analyst",
          quote:
            "Being able to access geo-blocked bookmakers from a single dashboard changed everything for our odds comparison model. Unlimited bandwidth means our scrapers run 24/7 without a hitch.",
          rating: 5,
        },
      ]}
      faqs={[
        {
          q: "Can I access geo-blocked bookmakers with your proxies?",
          a: "Yes. With IPs from 100+ countries, you can access any bookmaker regardless of your physical location. Select a proxy from a country where the bookmaker operates and connect normally.",
        },
        {
          q: "Will bookmakers detect that I am using a proxy?",
          a: "Our residential proxies are sourced from legitimate ISPs and are virtually undetectable as proxy traffic. Standard bookmaker detection targets datacenter IPs — which our residential pool completely bypasses.",
        },
        {
          q: "Are your proxies compatible with arbitrage betting software?",
          a: "Yes. Our proxies work with RebelBetting, OddsMonkey, BetBurger, and all other arbitrage platforms. Unlimited bandwidth means your software can monitor odds 24/7 without data restrictions.",
        },
        {
          q: "How many bookmaker accounts can I manage?",
          a: "As many as you need. Our plan includes a large residential IP pool allowing you to assign a unique IP to each bookmaker account for full separation and maximum account safety.",
        },
        {
          q: "Are your proxies fast enough for live in-play betting?",
          a: "Yes. Our network delivers low-latency connections to major bookmaker servers, making our proxies suitable for in-play betting where capturing odds before they move is critical.",
        },
      ]}
      schema={{
        pageName: "Proxies for Betting",
        description:
          "Residential proxies for sports betting, bookmaker access, odds scraping, and arbitrage. 100+ countries, unlimited bandwidth. $29.95/month.",
        urlPath: "/proxies-for-betting",
      }}
    />
  );
}
