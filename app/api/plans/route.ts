export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const base = process.env.API_BASE || "http://localhost:8081/api";
    const { searchParams } = new URL(req.url);
    const category = (searchParams.get("category") || "").toLowerCase();

    const r = await fetch(`${base}/packages`, { cache: "no-store" });
    if (!r.ok) return Response.json([], { status: 200 });

    const pkgs = await r.json();
    if (!Array.isArray(pkgs)) return Response.json([], { status: 200 });

    const filtered = category
      ? pkgs.filter((p: any) => String(p.category || "").toLowerCase() === category)
      : pkgs;

    const plans = filtered.map((p: any) => ({
      id: p.id,
      name: p.name,
      type: p.category,
      country: "US",
      rotation: p.category === "datacenter" ? "static" : "rotating",
      duration: "30 days",
      protocol: "socks5",
      price: Number(p.price_cents) / 100,
      priceUnit: "/mo",
      bandwidthGb: null,
      features: ["Instant setup", "Dedicated credentials", "24/7 Support", "High uptime"],
      popular: p.category === "residential",
    }));

    return Response.json(plans, { status: 200 });
  } catch {
    return Response.json([], { status: 200 });
  }
}
