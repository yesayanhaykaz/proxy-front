import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export async function POST(req: Request) {

  const orig = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const form = await req.formData();
  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const next = (String(form.get("next") || "/dashboard")).startsWith("/")
    ? String(form.get("next"))
    : "/dashboard";

  if (!email || !password) {
    return NextResponse.redirect(`${orig}/auth/login?error=missing_fields`, 303);
  }

  const base = (process.env.API_BASE || "http://localhost:8081/api").replace(/\/$/, "");

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

  // SESSION (existing system)
  setSession({ id: userId, email });

  // REQUIRED FOR DASHBOARD
  response.cookies.set("ps_uid", userId, {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  response.cookies.set("ps_email", encodeURIComponent(email), {
    path: "/",
    httpOnly: false,
    sameSite: "lax",
  });

  return response;
}