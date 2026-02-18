export type PackageRow = {
  id: string;
  name: string;
  category: "residential" | "mobile" | "datacenter" | "fast" | string;
  price_cents: number;
  created_at?: string;
};

export type UiPlan = {
  id: string;
  name: string;
  type: string;
  price: number;
  priceUnit: "/mo" | "/GB";
  protocol: "socks5" | "http" | "http/socks5";
  rotation: "rotating" | "static";
  country: string;
  features: string[];
  popular?: boolean;
};

export function mapPackageToPlan(p: PackageRow): UiPlan {
  const type = p.category;

  // basic defaults (tweak later)
  const isDc = type === "datacenter";
  const price = Number(p.price_cents || 0) / 100;

  return {
    id: p.id,
    name: p.name,
    type,
    country: "US",
    rotation: isDc ? "static" : "rotating",
    protocol: "http/socks5",
    price,
    priceUnit: "/mo", // if you want /GB from name later, we can parse it
    features: [
      "Instant activation",
      "Dedicated credentials",
      "24/7 Support",
      isDc ? "Static IPs" : "Rotation options",
    ],
    popular: type === "residential",
  };
}
