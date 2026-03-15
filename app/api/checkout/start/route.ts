import { NextResponse } from "next/server";

export async function POST(req: Request) {

  const form = await req.formData();

  const plan = form.get("plan");
  const network = form.get("network");
  const session = form.get("session");
  const protocol = form.get("protocol");
  const country = form.get("country");
  const traffic = form.get("traffic");

  console.log("Checkout request:", {
    plan,
    network,
    session,
    protocol,
    country,
    traffic
  });

  const host = req.headers.get("host");
  const protocolHeader = req.headers.get("x-forwarded-proto") || "https";

  const url = `${protocolHeader}://${host}/dashboard`;

  return NextResponse.redirect(url, 303);
}
