import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const form = await req.formData();

  const plan = String(form.get("plan") || "");
  const network = String(form.get("network") || "");
  const session = String(form.get("session") || "");
  const protocol = String(form.get("protocol") || "");
  const country = String(form.get("country") || "");
  const traffic = String(form.get("traffic") || "");

  const jar = cookies();
  const userId = jar.get("ps_uid")?.value || "";

  if (!userId) {
    return NextResponse.json(
      { error: "not_logged_in" },
      { status: 401 }
    );
  }

  try {

    // 🔹 call your PHP backend
    const res = await fetch(`${process.env.API_BASE}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        package_id: plan,
        network,
        session,
        protocol,
        country,
        traffic
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error("Order failed:", txt);

      return NextResponse.json(
        { error: "order_failed" },
        { status: 500 }
      );
    }

    const data = await res.json();

    console.log("Purchase created:", data);

  } catch (err) {
    console.error("Checkout error:", err);

    return NextResponse.json(
      { error: "checkout_error" },
      { status: 500 }
    );
  }

  // 🔹 redirect to dashboard
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";

  return NextResponse.redirect(`${proto}://${host}/dashboard`, 303);
}