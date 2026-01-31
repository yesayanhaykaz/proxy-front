import { NextResponse } from "next/server";

function safeNext(next?: string) {
  const n = String(next || "/dashboard");
  if (!n.startsWith("/")) return "/dashboard";
  if (n.startsWith("//")) return "/dashboard";
  return n;
}

export async function POST(req: Request) {
  const form = await req.formData();

  const email = String(form.get("email") || "").trim().toLowerCase();
  const password = String(form.get("password") || "");
  const password2 = String(form.get("password2") || "");
  const next = safeNext(form.get("next")?.toString());

  if (!email || !password || !password2) {
    const url = new URL("/auth/register", req.url);
    url.searchParams.set("error", "missing_fields");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  if (password !== password2) {
    const url = new URL("/auth/register", req.url);
    url.searchParams.set("error", "password_mismatch");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  // TEMP REGISTER: accept any user, create session
  const token = `ps_${Date.now()}_${Math.random().toString(16).slice(2)}`;

  const res = NextResponse.redirect(new URL(next, req.url), 303);

  const isProd = process.env.NODE_ENV === "production";
  res.cookies.set("ps_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  res.cookies.set("ps_email", email, {
    httpOnly: false,
    sameSite: "lax",
    secure: isProd,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return res;
}
