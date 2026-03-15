import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {

  try {

    const jar = cookies();
    const email = jar.get("ps_session")?.value || "";

    if (!email) {
      return NextResponse.json({ error: "not_logged_in" }, { status: 401 });
    }

    const form = await req.formData();

    const plan = form.get("plan");
    const network = form.get("network");
    const session = form.get("session");
    const protocol = form.get("protocol");
    const country = form.get("country");
    const traffic = form.get("traffic");

    const backendUrl = `${process.env.API_BASE}/order`;

    console.log("Creating order:", {
      email,
      plan,
      network,
      session,
      protocol,
      country,
      traffic
    });

    const r = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
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

    return NextResponse.redirect(`${proto}://${host}/dashboard`, 303);

  } catch (e) {

    return NextResponse.json({
      error: "checkout_failed",
      detail: String(e)
    }, { status: 500 });

  }

}