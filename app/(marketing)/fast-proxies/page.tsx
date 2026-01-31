import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const metadata = {
  title: "Fast Proxies — Low Latency, High Throughput | Proxiesseller",
  description:
    "Fast proxies optimized for low latency and stable performance. Best for scraping, monitoring, automation and time-sensitive API workflows.",
};

export default function Page() {
  return (
    <ProxyTypeLanding
        heroBg="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=2400&q=80"
      typeSlug="fast"
      typeName="Fast Proxies"
      headline="Low-latency proxies optimized for speed"
      subheadline="Built for time-sensitive workflows: fast scraping, monitoring, automation, and APIs that need reliable throughput."
      ctaHref="/pricing?type=fast"
      secondaryCtaHref="/pricing?type=fast#plans"
      previewPlans={[
        {
          id: "fast-1",
          title: "Starter",
          price: "$4.99 / month",
          bullets: ["Optimized routing", "Low latency", "Stable sessions", "HTTP/SOCKS5", "Fast activation"],
          bestFor: ["Monitoring", "Fast scraping", "APIs"],
        },
        {
          id: "fast-2",
          title: "Professional",
          price: "$14.99 / month",
          popular: true,
          bullets: ["Higher throughput", "Better stability", "More endpoints", "HTTP/SOCKS5", "Priority support"],
          bestFor: ["Automation", "Data pipelines", "Time-sensitive tasks"],
        },
        {
          id: "fast-3",
          title: "Enterprise",
          price: "Custom",
          bullets: ["Dedicated routes", "SLA", "Custom performance", "Team access", "Onboarding"],
          bestFor: ["High volume", "Enterprise automation", "Custom pipelines"],
          href: "/contact",
        },
      ]}
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
