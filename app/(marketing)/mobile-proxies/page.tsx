import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const metadata = {
  title: "Mobile Proxies — 4G/5G Rotating IPs & High Trust | Proxiesseller",
  description:
    "Buy mobile proxies with 4G/5G rotating IPs for socials, strict sites, app automation and account management. High trust score with rotation and sticky sessions.",
};

export default function Page() {
  return (
    <ProxyTypeLanding
        heroBg="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=2400&q=80"
      typeSlug="mobile"
      typeName="Mobile Proxies"
      headline="4G/5G mobile IPs with top trust score"
      subheadline="Perfect for strict platforms, social automation, app workflows, and accounts that need the highest IP reputation."
      ctaHref="/pricing?type=mobile"
      secondaryCtaHref="/pricing?type=mobile#plans"
      previewPlans={[
        {
          id: "mob-1",
          title: "Starter",
          price: "$7.99 / GB",
          bullets: ["4G/5G pool", "Rotating & sticky sessions", "HTTP/SOCKS5", "High trust score", "Fast activation"],
          bestFor: ["Social automation", "App testing", "Account safety"],
        },
        {
          id: "mob-2",
          title: "Professional",
          price: "$29.99 / GB",
          popular: true,
          bullets: ["Higher success", "Better stability", "More GEO options", "Sticky sessions", "Priority support"],
          bestFor: ["Scaling socials", "Marketplaces", "Strict targets"],
        },
        {
          id: "mob-3",
          title: "Enterprise",
          price: "Custom",
          bullets: ["Dedicated allocation", "SLA", "Custom targeting", "Team access", "Onboarding"],
          bestFor: ["High volume", "Ad accounts", "Long-running ops"],
          href: "/contact",
        },
      ]}
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
