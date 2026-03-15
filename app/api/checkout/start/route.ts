import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {

    const jar = cookies();

    // cookie format: user_id:email:hash
    const raw = jar.get("ps_session")?.value || "";
    const userId = raw.split(":")[0];

    if (!userId) {
      return NextResponse.json(
        { error: "not_logged_in" },
        { status: 401 }
      );
    }

    const form = await req.formData();

    const plan = String(form.get("plan") || "");
    const network = String(form.get("network") || "");
    const session = String(form.get("session") || "");
    const protocol = String(form.get("protocol") || "");
    const country = String(form.get("country") || "");
    const traffic = String(form.get("traffic") || "");

    let payload: any = {
      user_id: userId
    };

    // CUSTOM PROXY BUILDER
    if (plan === "custom") {

      if (!network || !protocol) {
        return NextResponse.json(
          { error: "missing_config", message: "Network or protocol missing" },
          { status: 400 }
        );
      }

      payload = {
        user_id: userId,
        package_id: "custom", // REQUIRED by backend
        network,
        session,
        protocol,
        country,
        traffic
      };

    } else {

      // NORMAL PACKAGE PURCHASE
      if (!plan) {
        return NextResponse.json(
          { error: "missing_plan" },
          { status: 400 }
        );
      }

      payload = {
        user_id: userId,
        package_id: plan
      };

    }

    console.log("Creating order payload:", payload);

    const r = await fetch(`${process.env.API_BASE}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const text = await r.text();

    console.log("Backend response:", text);

    if (!r.ok) {
      return NextResponse.json(
        {
          error: "backend_error",
          detail: text
        },
        { status: 500 }
      );
    }

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