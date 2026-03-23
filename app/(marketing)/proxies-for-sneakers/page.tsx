import { ProxyTypeLanding } from "@/components/marketing/ProxyTypeLanding";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Proxies for Sneakers — Cop Nike, Adidas & Supreme Drops | Proxiesseller",
  description:
    "Buy sneaker proxies for Nike SNKRS, Adidas, Supreme, and Footsites. Unlimited bandwidth, sub-50ms latency, residential ISP IPs. Compatible with all major sneaker bots. Only $29.95/month.",
};

export default async function Page() {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const r = await fetch(`${site}/api/plans?category=sneakers`, { cache: "no-store" });
  const plans = r.ok ? await r.json() : [];

  const previewPlans = (Array.isArray(plans) ? plans : []).slice(0, 3).map((p: any, idx: number) => ({
    id: p.id,
    title: p.name,
    price: `$${Number(p.price || 0).toFixed(2)} ${p.priceUnit || "/mo"}`,
    popular: Boolean(p.popular) || idx === 1,
    bullets: [
      "Unlimited bandwidth",
      p.rotation === "static" ? "Static ISP IP" : "Residential & ISP IPs",
      "HTTP/SOCKS5",
      "Sub-50ms latency",
      "All bots supported",
    ],
    bestFor: ["Nike SNKRS", "Adidas drops", "Supreme & Footsites"],
    href: `/pricing?type=sneakers#plans`,
  }));

  const displayPlans =
    previewPlans.length > 0
      ? previewPlans
      : [
          {
            id: "sneakers-unlimited",
            title: "Unlimited Sneaker Proxy",
            price: "$29.95 /mo",
            popular: true,
            bullets: [
              "Unlimited bandwidth",
              "Residential & ISP IPs",
              "HTTP/SOCKS5",
              "Sub-50ms latency",
              "All bots supported",
            ],
            bestFor: ["Nike SNKRS", "Adidas drops", "Supreme & Footsites"],
            href: `/pricing?type=sneakers#plans`,
          },
        ];

  return (
    <ProxyTypeLanding
      heroBg="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=2400&q=80"
      typeSlug="sneakers"
      typeName="Sneaker Proxies"
      headline="Win every drop — residential proxies built for sneaker bots"
      subheadline="Sub-50ms latency, ISP-grade residential IPs, and unlimited tasks. Everything your sneaker bot needs to cop Nike, Adidas, Supreme, and Footsites before they sell out."
      ctaHref="/pricing?type=sneakers"
      secondaryCtaHref="/pricing?type=sneakers#plans"
      previewPlans={displayPlans}
      rows={[
        { feature: "Nike detection bypass", left: "ISP residential IPs", right: "Datacenter (flagged)" },
        { feature: "Latency", left: "Sub-50ms (US & EU pools)", right: "Varies" },
        { feature: "Concurrent tasks", left: "Unlimited", right: "Limited" },
        { feature: "Best For", left: "SNKRS, Adidas, Supreme", right: "Basic monitoring" },
      ]}
      useCases={[
        { title: "Nike SNKRS drops", desc: "ISP residential IPs pass Nike's advanced bot detection and Queue-It system consistently." },
        { title: "Adidas releases", desc: "Bypass Adidas's anti-bot protection with clean residential IPs for every concurrent checkout task." },
        { title: "Supreme Monday drops", desc: "Sub-50ms latency and unlimited tasks give you maximum chances on every weekly Supreme drop." },
        { title: "Footsites copping", desc: "Run unlimited tasks on Foot Locker, Finish Line, JD Sports, and other Footsites simultaneously." },
        { title: "Sneaker bot management", desc: "Works natively with Cyber AIO, Kodai, NSB, Wrath, Balko, and all major bots — no custom config needed." },
        { title: "Drop monitoring", desc: "Monitor restock and raffle pages continuously with unlimited bandwidth and no rate-limit concerns." },
      ]}
      benefits={[
        { title: "ISP & residential IPs", desc: "ISP proxies combine the legitimacy of residential IPs with datacenter speeds — the gold standard for Nike SNKRS and Adidas." },
        { title: "Sub-50ms latency", desc: "Our US and EU proxy pools are positioned near major sneaker retailer servers for the fastest possible response times." },
        { title: "Unlimited tasks", desc: "No cap on concurrent bot tasks or connections — more tasks means more chances to cop on every release." },
      ]}
      testimonials={[
        {
          name: "Tyler B.",
          role: "Sneaker Reseller",
          quote:
            "I've tried every proxy service out there. ProxiesSeller ISP proxies are the only ones that consistently cook on SNKRS. Unlimited tasks for $29.95 is unbeatable value.",
          rating: 5,
        },
        {
          name: "Marco A.",
          role: "Botting Group Owner",
          quote:
            "Our whole group runs on ProxiesSeller proxies now. The latency is noticeably lower than our old provider and we haven't had a Nike ban wave issue since we switched.",
          rating: 5,
        },
      ]}
      faqs={[
        {
          q: "Why do I need proxies for sneaker bots?",
          a: "Sneaker sites detect and block multiple checkout attempts from the same IP. Proxies give each bot task a unique IP, letting you run hundreds of simultaneous checkouts without triggering bans.",
        },
        {
          q: "Which proxy type is best for Nike SNKRS?",
          a: "ISP (static residential) proxies offer the best combination of residential legitimacy and datacenter speed — ideal for Nike SNKRS and Adidas. Pure residential proxies work best for Supreme and other heavily protected sites.",
        },
        {
          q: "Are your proxies compatible with my sneaker bot?",
          a: "Yes. Our proxies work with Cyber AIO, Kodai, NSB, Wrath, Balko Bot, Ganesh Bot, Prism, Velox, and all other major bots that support HTTP/HTTPS or SOCKS5 proxy authentication.",
        },
        {
          q: "How many tasks can I run with one plan?",
          a: "Unlimited. There is no cap on concurrent bot tasks or connections. Run as many tasks as your bot and hardware support.",
        },
        {
          q: "How fast are your sneaker proxies?",
          a: "Our US and EU sneaker-optimized pools deliver sub-50ms latency to major sneaker retailer servers. For latency-critical drops, select proxies geographically closest to the retailer's infrastructure.",
        },
      ]}
      schema={{
        pageName: "Proxies for Sneakers",
        description:
          "ISP and residential proxies for sneaker bots. Win Nike, Adidas, Supreme, and Footsite drops. Unlimited bandwidth, sub-50ms latency. $29.95/month.",
        urlPath: "/proxies-for-sneakers",
      }}
    />
  );
}
