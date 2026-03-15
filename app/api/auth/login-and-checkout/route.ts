import { NextResponse } from "next/server";
import { applyAuthCookies } from "@/lib/setAuthCookies";

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

  const form = await req.formData();

  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  if (!planId) return redirectBack(planId, "Missing plan id.");
  if (!email) return redirectBack(planId, "Email required.");
  if (!password) return redirectBack(planId, "Password required.", email);

  const base = process.env.API_BASE || "http://127.0.0.1:8085/api";

  const loginRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    return redirectBack(planId, "Invalid email or password.", email);
  }

  const json = await loginRes.json();
  const userId = String(json.user_id || "");

  if (!userId) {
    return redirectBack(planId, "Bad backend response.", email);
  }

  const next = new URL("/checkout", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  next.searchParams.set("plan", planId);

  const res = NextResponse.redirect(next, 303);

  return applyAuthCookies(res, userId, email);
}