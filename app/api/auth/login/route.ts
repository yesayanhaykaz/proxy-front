import { NextResponse } from "next/server";
import { applySessionCookies } from "@/lib/auth";
import { getBackendBase, getSiteOrigin } from "@/lib/env";

export async function POST(req: Request) {
  const orig = getSiteOrigin();

  const form = await req.formData();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const next = (String(form.get("next") || "/dashboard")).startsWith("/")
    ? String(form.get("next"))
    : "/dashboard";

  if (!email || !password) {
    return NextResponse.redirect(`${orig}/auth/login?error=missing_fields`, 303);
  }

  const base = getBackendBase();

  const apiRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email, password }),
  });

  if (!apiRes.ok) {
    return NextResponse.redirect(`${orig}/auth/login?error=invalid`, 303);
  }

  const json: any = await apiRes.json().catch(() => ({}));

  const userId =
    String(json.user_id || "") ||
    String(json.id || "") ||
    String(json.user?.id || "") ||
    String(json.data?.user_id || "");

  if (!userId) {
    return NextResponse.redirect(`${orig}/auth/login?error=invalid`, 303);
  }

  const response = NextResponse.redirect(new URL(next, orig), 303);

  applySessionCookies(response.cookies, { id: userId, email });

  return response;
}
