import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proxies for Web Scraping — Rotating IPs, Never Get Blocked | Proxiesseller",
  description:
    "Buy rotating proxies for web scraping. Unlimited bandwidth, residential & datacenter IPs that bypass Cloudflare, Akamai, and all anti-bot systems. Only $29.95/month.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=scraping`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "Unlimited bandwidth",
      p.rotation === "static" ? "Static IP" : "Per-request & timed rotation",
      "HTTP/SOCKS5",
      "Anti-bot bypass",
      "Unlimited concurrency",
    ],
    bestFor: ["Data scraping pipelines", "E-commerce monitoring", "SEO tracking"],
    href: `/pricing?type=scraping#plans`,
  }));

  const displayPlans =
    previewPlans.length > 0
      ? previewPlans
      : [
          {
    id: "custom",
              custom: 1,
            title: "Unlimited Scraping Proxy",
            price: "$29.95 /mo",
            popular: true,
            bullets: [
              "Unlimited bandwidth",
              "Per-request & timed rotation",
              "HTTP/SOCKS5",
              "Anti-bot bypass",
              "Unlimited concurrency",
            ],
            bestFor: ["Data scraping pipelines", "E-commerce monitoring", "SEO tracking"],
          },
        ];

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2400&q=80"
      typeSlug="scraping"
      typeName="Scraping Proxies"
      headline="Rotating proxies for web scraping — never get blocked again"
      subheadline="Extract data from any website at scale. Rotating residential and datacenter IPs that bypass Cloudflare, Akamai, Imperva, and every major anti-bot system. Unlimited requests, zero downtime."
      ctaHref="/pricing?type=scraping"
      secondaryCtaHref="/pricing?type=scraping#plans"
      previewPlans={displayPlans}
      rows={[
        { feature: "Anti-bot bypass", left: "Cloudflare, Akamai, Imperva", right: "Basic only" },
        { feature: "Rotation control", left: "Per-request or timed", right: "Timed only" },
        { feature: "Concurrency", left: "Unlimited threads", right: "Limited" },
        { feature: "Best For", left: "Production data pipelines", right: "Lightweight scraping" },
      ]}
      useCases={[
        { title: "E-commerce price monitoring", desc: "Track competitor pricing, product availability, and catalog changes in real time across major retail sites." },
        { title: "SEO & SERP tracking", desc: "Monitor keyword rankings, SERP features, and competitor positions across Google, Bing, and other search engines." },
        { title: "News & content aggregation", desc: "Aggregate articles and media from thousands of sources continuously without IP blocks." },
        { title: "Real estate data collection", desc: "Scrape property listings, pricing trends, and market data from Zillow, Realtor, and similar platforms." },
        { title: "Lead generation", desc: "Collect business contact data from directories and professional networks to build targeted prospect lists." },
        { title: "Market research", desc: "Gather large datasets for business intelligence, academic research, and competitive industry analysis." },
      ]}
      benefits={[
        { title: "Automatic IP rotation", desc: "Get a fresh IP on every request or set timed intervals — fully configurable to match any site's rate-limiting policy." },
        { title: "Unlimited concurrency", desc: "Run thousands of parallel scraping threads simultaneously with no bandwidth caps or connection limits." },
        { title: "Universal tool compatibility", desc: "Works with Python Requests, Scrapy, Playwright, Puppeteer, Selenium, Node.js, and any HTTP client via standard proxy auth." },
      ]}
      testimonials={[
        {
          name: "James L.",
          role: "Data Engineer",
          quote:
            "We scrape 50M+ pages a month across e-commerce sites. ProxiesSeller is the only provider where we consistently bypass Cloudflare at this scale without extra tooling.",
          rating: 5,
        },
        {
          name: "Sofia V.",
          role: "SEO Platform Developer",
          quote:
            "Unlimited bandwidth with per-request rotation is exactly what our SERP tracker needed. No more surprise overage bills and the uptime has been rock solid.",
          rating: 5,
        },
      ]}
      faqs={[
        {
          q: "Can your proxies bypass Cloudflare?",
          a: "Yes. Our residential proxies are highly effective against Cloudflare JS challenges and browser fingerprinting. For maximum bypass rates, combine our proxies with headless browser tools like Playwright or Puppeteer.",
        },
        {
          q: "Do you support per-request IP rotation?",
          a: "Yes. You can configure rotation per request so every HTTP call gets a new IP, or use timed rotation intervals. Both modes are available and fully configurable.",
        },
        {
          q: "Is there a limit on concurrent scraping threads?",
          a: "No. Our plan supports unlimited concurrent connections so you can run as many parallel threads as your infrastructure allows.",
        },
        {
          q: "Which scraping frameworks are compatible?",
          a: "All of them. Our proxies support standard HTTP(S) and SOCKS5 auth, making them compatible with Scrapy, Playwright, Puppeteer, Selenium, Python Requests, Axios, curl, and any other HTTP client.",
        },
        {
          q: "Residential or datacenter — which is better for scraping?",
          a: "Residential proxies are best for sites with strong anti-bot protection like Amazon, Google, or LinkedIn. Datacenter proxies offer faster speeds for targets with lighter protection. Our plan gives you access to both.",
        },
      ]}
      schema={{
        pageName: "Proxies for Web Scraping",
        description:
          "Rotating residential and datacenter proxies for web scraping. Unlimited bandwidth, bypasses Cloudflare and anti-bot systems. $29.95/month.",
        urlPath: "/proxies-for-scraping",
      }}
    />
  );
}
