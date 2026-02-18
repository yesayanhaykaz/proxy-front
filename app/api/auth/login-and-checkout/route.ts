import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

function redirectBack(planId: string, error: string, email?: string) {
  const u = new URL("/checkout", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  u.searchParams.set("plan", planId);
  u.searchParams.set("mode", "login");
  u.searchParams.set("error", encodeURIComponent(error));
  if (email) u.searchParams.set("email", email);
  return NextResponse.redirect(u, 303);
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

    const base = process.env.API_BASE || "http://localhost:8081/api";

    const loginRes = await fetch(`${base}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!loginRes.ok) {
      return redirectBack(planId, "Invalid email or password.", email);
    }

    const json = await loginRes.json(); // { status:"ok", user_id:"..." }
    const userId = String(json.user_id || "");

    if (!userId) {
      return redirectBack(planId, "Bad backend response. Please try again.", email);
    }

    // ✅ sets ps_session in the format getSession() expects
    setSession({ id: userId, email });

    // ✅ back to the same checkout plan => right side becomes Payment panel
    const next = new URL("/checkout", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
    next.searchParams.set("plan", planId);
    return NextResponse.redirect(next, 303);
  } catch {
    return redirectBack(planId, "Server error. Please try again.");
  }
}
