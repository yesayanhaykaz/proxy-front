import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

function redirectBack(planId: string, mode: "register" | "login", error: string, email?: string) {
  const u = new URL("/checkout", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  u.searchParams.set("plan", planId);
  u.searchParams.set("mode", mode);
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
    const agree = String(form.get("agree") || "");

    if (!planId) return redirectBack(planId, "register", "Missing plan id.");
    if (!email) return redirectBack(planId, "register", "Email is required.");
    if (password.length < 8) return redirectBack(planId, "register", "Password must be at least 8 characters.", email);
    if (agree !== "1") return redirectBack(planId, "register", "Please accept Terms and Privacy Policy.", email);

    const base = process.env.API_BASE || "http://localhost:8081/api";

    // 1) Register (if already exists, backend may return 500 today — we’ll handle gracefully)
    const regRes = await fetch(`${base}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    // If register fails, show error (or if email exists, tell them to login)
    if (!regRes.ok) {
      // Your current PHP might return HTML fatal error on duplicate.
      // We can still tell user "try login" to keep flow clean.
      return redirectBack(planId, "login", "Account may already exist. Please login.", email);
    }

    // 2) Login to get user_id
    const loginRes = await fetch(`${base}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    });

    if (!loginRes.ok) {
      return redirectBack(planId, "login", "Registered, but login failed. Please login.", email);
    }

    const json = await loginRes.json(); // { status:"ok", user_id:"..." }
    const userId = String(json.user_id || "");

    if (!userId) {
      return redirectBack(planId, "login", "Bad backend response. Please login.", email);
    }

    // ✅ THE IMPORTANT PART: set session in the format getSession() expects
    setSession({ id: userId, email });

    // 3) Redirect back to checkout (same plan) so right side becomes payment panel
    const next = new URL("/checkout", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
    next.searchParams.set("plan", planId);
    return NextResponse.redirect(next, 303);
  } catch {
    return redirectBack(planId, "register", "Server error. Please try again.");
  }
}
