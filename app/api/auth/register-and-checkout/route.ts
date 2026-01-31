import { NextResponse } from "next/server";
import { cookies } from "next/headers";

function redirectBack(planId: string, mode: "register" | "login", error: string, email?: string) {
  const u = new URL("/checkout", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
  u.searchParams.set("plan", planId);
  u.searchParams.set("mode", mode);
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
    const agree = String(form.get("agree") || "");

    if (!planId) return redirectBack(planId, "register", "Missing plan id.");
    if (!email) return redirectBack(planId, "register", "Email is required.");
    if (password.length < 8) return redirectBack(planId, "register", "Password must be at least 8 characters.", email);
    if (agree !== "1") return redirectBack(planId, "register", "Please accept Terms and Privacy Policy.", email);

    // TODO: real register (DB). For now: mock success.
    // Create session cookie (mock)
    cookies().set("ps_session", `mock.${Buffer.from(email).toString("base64")}`, {
      httpOnly: true,
      secure: false, // set true in production behind https
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    const next = new URL("/dashboard", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000");
    next.searchParams.set("activated", planId);

    return NextResponse.redirect(next);
  } catch (e: any) {
    return redirectBack(planId, "register", "Server error. Please try again.");
  }
}
