import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {

  try {

    const jar = cookies();

    // cookie format: user_id:email:hash
    const raw = jar.get("ps_email")?.value || "";
    const userId = raw.split(":")[0];

    if (!userId) {
      return NextResponse.json(
        { error: "not_logged_in" },
        { status: 401 }
      );
    }

    const form = await req.formData();

    const plan = form.get("plan");
    const network = form.get("network");
    const session = form.get("session");
    const protocol = form.get("protocol");
    const country = form.get("country");
    const traffic = form.get("traffic");

    console.log("Creating order:", {
      user_id: userId,
      plan,
      network,
      session,
      protocol,
      country,
      traffic
    });

    const r = await fetch(`${process.env.API_BASE}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: userId,
        package_id: plan,
        network,
        session,
        protocol,
        country,
        traffic
      })
    });

    const data = await r.text();

    console.log("Backend response:", data);

    const host = req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";

    return NextResponse.redirect(
      `${proto}://${host}/dashboard`,
      303
    );

  } catch (e) {

    console.error("Checkout error:", e);

    return NextResponse.json(
      {
        error: "checkout_failed",
        detail: String(e)
      },
      { status: 500 }
    );

  }

}