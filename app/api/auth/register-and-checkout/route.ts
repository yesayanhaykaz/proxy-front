import { NextResponse } from "next/server";
import { applyAuthCookies } from "@/lib/setAuthCookies";

export async function POST(req: Request) {

  const url = new URL(req.url);
  const planId = url.searchParams.get("plan") || "";

  const form = await req.formData();

  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  if (!planId) throw new Error("Missing plan");

  const base = process.env.API_BASE || "http://127.0.0.1:8085/api";

  const regRes = await fetch(`${base}/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!regRes.ok) {
    return NextResponse.redirect(`/checkout?plan=${planId}&mode=login`, 303);
  }

  const loginRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    return NextResponse.redirect(`/checkout?plan=${planId}&mode=login`, 303);
  }

  const json = await loginRes.json();

  const userId = String(json.user_id || "");

  const next = new URL("/checkout", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000");
  next.searchParams.set("plan", planId);

  const res = NextResponse.redirect(next, 303);

  return applyAuthCookies(res, userId, email);
}