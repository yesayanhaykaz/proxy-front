import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function redirectBack(planId: string, error: string, email?: string) {
  const u = new URL("/checkout", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  u.searchParams.set("plan", planId);
  u.searchParams.set("mode", "login");
  u.searchParams.set("error", encodeURIComponent(error));
  if (email) u.searchParams.set("email", email);
  return NextResponse.redirect(u);
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const planId = url.searchParams.get("plan") || "";

  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    if (!planId) return redirectBack(planId, "Missing plan id.");
    if (!email) return redirectBack(planId, "Email is required.");
    if (!password) return redirectBack(planId, "Password is required.", email);

    // TODO: validate in DB. For now: mock success.
    cookies().set("ps_session", `mock.${Buffer.from(email).toString("base64")}`, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const next = new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
    next.searchParams.set("activated", planId);

    return NextResponse.redirect(next);
  } catch {
    return redirectBack(planId, "Server error. Please try again.");
  }
}
