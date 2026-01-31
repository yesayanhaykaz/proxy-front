export type Plan = {
  id: string;
  name: string;
  price: number;
  period: "day" | "week" | "month" | "year";
  highlights: { k: string; v: string }[];
  bulletsLeft: string[];
  bulletsRight: string[];
  trial?: string;
};

export const MOCK_PLANS: Plan[] = [
  {
    id: "mobile-1",
    name: "Mobile 1",
    price: 7.5,
    period: "month",
    highlights: [
      { k: "1GB", v: "Traffic" },
      { k: "200", v: "Ports" },
      { k: "3+ IP", v: "Pool" },
      { k: "$7.50", v: "per GB" },
    ],
    bulletsLeft: ["10M+ IP addresses", "99.99% Uptime", "24/7 Support", "ISP-level targeting"],
    bulletsRight: ["All locations", "Rotation & sticky sessions", "Automatic IP rotation", "Low block rate"],
    trial: "Trial: $1.99 · 3 days · 100MB",
  },
  {
    id: "residential-5",
    name: "Residential 5GB",
    price: 29.99,
    period: "month",
    highlights: [
      { k: "5GB", v: "Traffic" },
      { k: "Unlimited", v: "Ports" },
      { k: "Rotating", v: "IPs" },
      { k: "$5.99", v: "per GB" },
    ],
    bulletsLeft: ["Real residential IPs", "Country & city targeting", "High trust score", "24/7 Support"],
    bulletsRight: ["Sticky sessions", "API access", "Automatic rotation", "Low block rate"],
    trial: "Trial: $2.99 · 3 days · 200MB",
  },
];

export async function getPlanById(planId: string) {
  return MOCK_PLANS.find((p) => p.id === String(planId)) ?? null;
}
