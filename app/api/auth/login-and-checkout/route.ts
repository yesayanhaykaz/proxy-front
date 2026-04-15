import { NextResponse } from "next/server";
import { applyAuthCookies } from "@/lib/setAuthCookies";
import { getBackendBase, getSiteOrigin } from "@/lib/env";

function safeNext(next?: string) {
  const value = (next || "").trim();
  return value.startsWith("/") ? value : "";
}

function redirectBack(planId: string, error: string, email?: string) {
  const u = new URL("/checkout", getSiteOrigin());
  u.searchParams.set("plan", planId);
  u.searchParams.set("mode", "login");
  u.searchParams.set("error", encodeURIComponent(error));
  if (email) u.searchParams.set("email", email);
  return NextResponse.redirect(u, 303);
}

export async function POST(req: Request) {

  const url = new URL(req.url);
  const planId = url.searchParams.get("plan") || "";
  const next = safeNext(url.searchParams.get("next") || "");

  const form = await req.formData();

  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  if (!planId) return redirectBack(planId, "Missing plan id.");
  if (!email) return redirectBack(planId, "Email required.");
  if (!password) return redirectBack(planId, "Password required.", email);

  const base = getBackendBase();

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

  const destination = new URL(
    next || `/checkout?plan=${encodeURIComponent(planId)}`,
    getSiteOrigin()
  );

  const res = NextResponse.redirect(destination, 303);

  return applyAuthCookies(res, userId, email);
}
