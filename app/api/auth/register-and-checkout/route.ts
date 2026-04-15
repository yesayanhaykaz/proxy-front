import { NextResponse } from "next/server";
import { applyAuthCookies } from "@/lib/setAuthCookies";
import { getBackendBase, getSiteOrigin } from "@/lib/env";

function safeNext(next?: string) {
  const value = (next || "").trim();
  return value.startsWith("/") ? value : "";
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const planId = url.searchParams.get("plan") || "";
  const next = safeNext(url.searchParams.get("next") || "");

  const form = await req.formData();

  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");

  if (!planId) throw new Error("Missing plan");

  const base = getBackendBase();

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

  const destination = new URL(
    next || `/checkout?plan=${encodeURIComponent(planId)}`,
    getSiteOrigin()
  );

  const res = NextResponse.redirect(destination, 303);

  return applyAuthCookies(res, userId, email);
}
