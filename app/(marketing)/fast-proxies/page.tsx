import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Fast Proxies — Low Latency, High Throughput | Proxiesseller",
  description:
    "Fast proxies optimized for low latency and stable performance. Best for scraping, monitoring, automation and time-sensitive API workflows.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=fast`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "Optimized routing",
      "Low latency",
      "Stable sessions",
      "HTTP/SOCKS5",
      "Fast activation",
    ],
    bestFor: ["Monitoring", "Fast scraping", "APIs"],
    href: `/pricing?type=fast#plans`,
  }));

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=80"
      typeSlug="fast"
      typeName="Fast Proxies"
      headline="Low-latency proxies optimized for speed"
      subheadline="Built for time-sensitive workflows: fast scraping, monitoring, automation, and APIs that need reliable throughput."
      ctaHref="/pricing?type=fast"
      secondaryCtaHref="/pricing?type=fast#plans"
      previewPlans={previewPlans}
      rows={[
        { feature: "Latency", left: "Low", right: "Medium" },
        { feature: "Throughput", left: "High", right: "Medium" },
        { feature: "Stability", left: "Stable routes", right: "Mixed" },
        { feature: "Best For", left: "Time-sensitive tasks", right: "Basic workflows" },
      ]}
      useCases={[
        { title: "Monitoring", desc: "Fast checks and price monitoring with stable response times." },
        { title: "Fast scraping", desc: "Optimized throughput for time-sensitive collections." },
        { title: "APIs", desc: "Stable proxy endpoints for API workflows." },
        { title: "Automation", desc: "Better stability for long-running automation." },
        { title: "Data pipelines", desc: "Consistent routing and reliability." },
        { title: "Dev & QA", desc: "Useful for performance testing and staging." },
      ]}
      benefits={[
        { title: "Optimized routing", desc: "Routes tuned for consistent low latency." },
        { title: "Stable performance", desc: "Built to reduce spikes and downtime." },
        { title: "Instant activation", desc: "Buy and start using within minutes." },
      ]}
      testimonials={[
        {
          name: "Alex Johnson",
          role: "E-commerce Analyst",
          quote:
            "Fast endpoints made our monitoring more consistent. Latency is lower and throughput is stable during peak hours.",
          rating: 5,
        },
        {
          name: "Sarah Chen",
          role: "Market Researcher",
          quote:
            "Great for time-sensitive scraping jobs. Performance stays predictable and support helped optimize our setup.",
          rating: 5,
        },
      ]}
      faqs={[
        { q: "Are fast proxies residential or datacenter?", a: "Fast proxies are optimized endpoints designed for performance and stability." },
        { q: "Do you support SOCKS5?", a: "Yes — SOCKS5 support depends on the plan." },
        { q: "What is fast proxies best for?", a: "Monitoring, time-sensitive scraping, automation, and API workflows." },
      ]}
      schema={{
        pageName: "Fast Proxies",
        description: "Low-latency fast proxies optimized for scraping, monitoring and automation.",
        urlPath: "/fast-proxies",
      }}
    />
  );
}
