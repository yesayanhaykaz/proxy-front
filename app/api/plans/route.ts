export async function GET() {
  // Local dev mock data (replace later with real PHP API)
  return Response.json([
    { id: 1, type: "fast", name: "Fast Starter", price: 12, unit: "/mo", traffic: "Unlimited", country: "US" },
    { id: 2, type: "mobile", name: "Mobile Starter", price: 19, unit: "/GB", traffic: "1GB", country: "GB" },
    { id: 3, type: "datacenter", name: "DC Professional", price: 29, unit: "/mo", traffic: "Unlimited", country: "DE" },
    { id: 4, type: "residential", name: "Resi Starter", price: 7, unit: "/GB", traffic: "1GB", country: "FR" },
  ]);
}

