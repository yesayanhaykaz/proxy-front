import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {

  try {

    console.log("checkout start");

    const session = await getSession();
    console.log("session:", session);

    const userId =
      (session as any)?.id ||
      (session as any)?.user?.id ||
      (session as any)?.user_id;

    console.log("userId:", userId);

    const form = await req.formData();

    const plan = form.get("plan");

    console.log("plan:", plan);

    const response = await fetch(`${process.env.API_BASE}/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, package_id: plan }),
    });

    console.log("backend status:", response.status);

    const host = req.headers.get("host");
    const proto = req.headers.get("x-forwarded-proto") || "https";

    return NextResponse.redirect(`${proto}://${host}/dashboard`, 303);

  } catch (err) {

    console.error("CHECKOUT ERROR:", err);

    return NextResponse.json(
      { error: "checkout_failed", detail: String(err) },
      { status: 500 }
    );
  }
}