import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const jar = cookies();

    // Cookie format: user_id:email:hash
    const raw    = jar.get("ps_session")?.value || "";
    const userId = raw.split(":")[0];

    if (!userId) {
      return NextResponse.json({ error: "not_logged_in" }, { status: 401 });
    }

    const form     = await req.formData();
    const plan     = String(form.get("plan")     || "");
    const network  = String(form.get("network")  || "");
    const session  = String(form.get("session")  || "");
    const protocol = String(form.get("protocol") || "");
    const country  = String(form.get("country")  || "");
    const traffic  = String(form.get("traffic")  || "");

    let payload: Record<string, string>;

    if (plan === "custom") {
      // Custom proxy builder order
      if (!network || !protocol) {
        return NextResponse.json(
          { error: "missing_config", message: "Network or protocol missing" },
          { status: 400 }
        );
      }
      payload = { user_id: userId, package_id: "custom", network, session, protocol, country, traffic };
    } else {
      // Fixed package order
      if (!plan) {
        return NextResponse.json({ error: "missing_plan" }, { status: 400 });
      }
      payload = { user_id: userId, package_id: plan };
    }

    const apiBase = process.env.API_BASE;
    if (!apiBase) {
      console.error("API_BASE env var is not set");
      return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
    }

    const r = await fetch(`${apiBase}/order`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    });

    const text = await r.text();

    if (!r.ok) {
      console.error("Backend order error:", text);
      return NextResponse.json({ error: "backend_error", detail: text }, { status: 502 });
    }

    // Redirect to dashboard after successful order
    return NextResponse.redirect(new URL("/dashboard", req.url));

  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "checkout_failed", detail: String(err) },
      { status: 500 }
    );
  }
}
