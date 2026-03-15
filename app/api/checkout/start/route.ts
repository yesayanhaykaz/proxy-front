import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request) {

  // use the same auth check used by dashboard
  const session = await getSession();
console.log("ALL COOKIES:", cookies().getAll());
  const userId =
    (session as any)?.id ||
    (session as any)?.user?.id ||
    (session as any)?.user_id;

  if (!userId) {
    return NextResponse.json({ error: "not_logged_in" }, { status: 401 });
  }

  const form = await req.formData();

  const plan = form.get("plan");
  const network = form.get("network");
  const sessionType = form.get("session");
  const protocol = form.get("protocol");
  const country = form.get("country");
  const traffic = form.get("traffic");

  console.log("Checkout request:", {
    userId,
    plan,
    network,
    sessionType,
    protocol,
    country,
    traffic
  });

  // call your PHP backend
  await fetch(`${process.env.API_BASE}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      user_id: userId,
      package_id: plan,
      network,
      session: sessionType,
      protocol,
      country,
      traffic
    })
  });

  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "https";

  return NextResponse.redirect(`${proto}://${host}/dashboard`, 303);
}