import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {

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

    // TODO
    // create order
    // create proxy credentials

    return NextResponse.redirect(
      new URL("/dashboard", req.url),
      303
    );

  } catch (err) {

    console.error("Checkout error:", err);

    return NextResponse.redirect(
      new URL("/checkout?error=1", req.url),
      303
    );
  }
}
