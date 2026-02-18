import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

function safeNext(n: string) {
  const t = (n || "").trim();
  return t.startsWith("/") ? t : "/dashboard";
}

function errRedirect(reqUrl: string, next: string, code: string) {
  const u = new URL("/auth/register", reqUrl);
  u.searchParams.set("error", code);
  u.searchParams.set("next", next);
  return NextResponse.redirect(u, 303);
}

export async function POST(req: Request) {
  const form = await req.formData();

  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const confirm = String(form.get("confirm_password") || "");
  const next = safeNext(String(form.get("next") || "/dashboard"));

  if (!email || !password) return errRedirect(req.url, next, "missing_fields");
  if (password.length < 8) return errRedirect(req.url, next, "weak_password");
  if (confirm && confirm !== password) return errRedirect(req.url, next, "password_mismatch");

  const base = (process.env.API_BASE || "http://localhost:8081/api").replace(/\/$/, "");

  // 1) Register
  const regRes = await fetch(`${base}/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email, password }),
  });

  if (!regRes.ok) {
    const text = await regRes.text().catch(() => "");
    const low = text.toLowerCase();
    if (regRes.status === 409 || low.includes("exists") || low.includes("already")) {
      return errRedirect(req.url, next, "email_exists");
    }
    return errRedirect(req.url, next, `backend_${regRes.status}`);
  }

  // 2) Auto-login (because register returns only {"status":"ok"})
  const loginRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) {
    // Registration succeeded, but login failed -> send to login page
    const u = new URL("/auth/login", req.url);
    u.searchParams.set("next", next);
    u.searchParams.set("error", "please_login");
    return NextResponse.redirect(u, 303);
  }

  const loginJson: any = await loginRes.json().catch(() => ({}));
  const userId = String(loginJson.user_id || loginJson.id || loginJson.user?.id || "");

  if (!userId) {
    const u = new URL("/auth/login", req.url);
    u.searchParams.set("next", next);
    u.searchParams.set("error", "please_login");
    return NextResponse.redirect(u, 303);
  }

  // 3) Create signed session cookie matching lib/auth.ts
  setSession({ id: userId, email });

  return NextResponse.redirect(new URL(next, req.url), 303);
}
