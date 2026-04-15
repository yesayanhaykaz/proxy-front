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

    const apiBase = process.env.API_BASE;
    if (!apiBase) {
      console.error("API_BASE env var is not set");
      return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
    }

    const form     = await req.formData();
    const plan     = String(form.get("plan")     || "");
    const network  = String(form.get("network")  || "");
    const session  = String(form.get("session")  || "");
    const protocol = String(form.get("protocol") || "");
    const country  = String(form.get("country")  || "");
    const traffic  = String(form.get("traffic")  || "");

    let packageId: string;

    if (plan === "custom") {
      // ── Custom proxy builder order ──────────────────────────────────────────
      // The PHP backend expects a real UUID package_id.
      // We resolve it by fetching the packages list and matching by category.
      if (!network || !protocol) {
        return NextResponse.json(
          { error: "missing_config", message: "Network or protocol missing" },
          { status: 400 }
        );
      }

      // Fetch packages and find one matching the selected network/category
      const pkgRes = await fetch(`${apiBase}/packages`, { cache: "no-store" });
      if (!pkgRes.ok) {
        console.error("Failed to fetch packages:", await pkgRes.text());
        return NextResponse.json({ error: "packages_fetch_failed" }, { status: 502 });
      }

      const packages: Array<{ id: string; category?: string; name?: string }> = await pkgRes.json();

      // Match by category field (case-insensitive), fall back to first package
      const matched =
        packages.find((p) => (p.category || "").toLowerCase() === network.toLowerCase()) ??
        packages.find((p) => (p.name || "").toLowerCase().includes(network.toLowerCase())) ??
        packages[0];

      if (!matched) {
        return NextResponse.json(
          { error: "no_matching_package", message: `No package found for network: ${network}` },
          { status: 400 }
        );
      }

      packageId = matched.id;

      console.log(`Custom order: network=${network} → resolved package_id=${packageId}`);

    } else {
      // ── Fixed package order ─────────────────────────────────────────────────
      if (!plan) {
        return NextResponse.json({ error: "missing_plan" }, { status: 400 });
      }
      packageId = plan;
    }

    // Place the order with the real package UUID
    const payload: Record<string, string> = {
      user_id:    userId,
      package_id: packageId,
    };

    // Pass extra custom params through so the PHP can use them if needed
    if (plan === "custom") {
      payload.network  = network;
      payload.session  = session;
      payload.protocol = protocol;
      payload.country  = country;
      payload.traffic  = traffic;
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

    // Success — redirect to dashboard
    const host  = req.headers.get("host") || "localhost:3000";
    const proto = "https";
    return NextResponse.redirect(`${proto}://${host}/dashboard`);

  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "checkout_failed", detail: String(err) },
      { status: 500 }
    );
  }
}