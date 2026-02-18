import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Datacenter Proxies — Fast, Stable & Affordable | Proxiesseller",
  description:
    "Buy datacenter proxies for speed, stability and automation. Great for SEO tools, scraping, monitoring and APIs. Static IPs with low latency.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=datacenter`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "Static IPs",
      "Low latency",
      "HTTP/SOCKS5",
      "Fast setup",
      "Affordable pricing",
    ],
    bestFor: ["SEO tools", "Monitoring", "APIs"],
    href: `/pricing?type=datacenter#plans`,
  }));

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=2400&q=80"
      typeSlug="datacenter"
      typeName="Datacenter Proxies"
      headline="High-speed datacenter IPs for automation"
      subheadline="Best for speed and scale: scraping, monitoring, SEO tools, and API workflows that need low latency and stable performance."
      ctaHref="/pricing?type=datacenter"
      secondaryCtaHref="/pricing?type=datacenter#plans"
      previewPlans={previewPlans}
      rows={[
        { feature: "Speed", left: "Very high", right: "Medium" },
        { feature: "Cost", left: "Low", right: "Higher" },
        { feature: "Stability", left: "Static sessions", right: "Mixed" },
        { feature: "Best For", left: "Scale & automation", right: "Strict sites" },
      ]}
      useCases={[
        { title: "SEO tools", desc: "Run crawlers and SEO monitoring with stable throughput." },
        { title: "Scraping at scale", desc: "Best when speed matters more than reputation." },
        { title: "APIs", desc: "Stable, low latency IPs for API workflows." },
        { title: "Monitoring", desc: "Price checks and uptime monitoring with fast requests." },
        { title: "Automation", desc: "High concurrency automation tasks with static sessions." },
        { title: "Dev & testing", desc: "Reliable proxies for development environments." },
      ]}
      benefits={[
        { title: "Low latency", desc: "Datacenter IPs provide fast response times." },
        { title: "Great pricing", desc: "Affordable IPs for bulk automation and testing." },
        { title: "Stable sessions", desc: "Static IP behavior is perfect for stable tasks." },
      ]}
      testimonials={[
        {
          name: "Alex Johnson",
          role: "E-commerce Analyst",
          quote:
            "Datacenter proxies are fast and stable for our automation. Great value and easy to integrate with our tooling.",
          rating: 5,
        },
        {
          name: "Sarah Chen",
          role: "Market Researcher",
          quote:
            "Perfect for monitoring and API workflows. Low latency, stable sessions, and good pricing for volume.",
          rating: 5,
        },
      ]}
      faqs={[
        { q: "Are datacenter proxies rotating?", a: "Most datacenter plans are static. Rotation may be offered via pool options." },
        { q: "Are SOCKS5 proxies available?", a: "Yes — SOCKS5 support depends on plan." },
        { q: "What is best use for datacenter proxies?", a: "SEO tools, monitoring, APIs, and scraping where speed matters." },
      ]}
      schema={{
        pageName: "Datacenter Proxies",
        description: "Fast and affordable datacenter proxies for automation, SEO tools and scraping.",
        urlPath: "/datacenter-proxies",
      }}
    />
  );
}
