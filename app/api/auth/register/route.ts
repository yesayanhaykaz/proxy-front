import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

function safeNext(n: string) {
  const t = (n || "").trim();
  return t.startsWith("/") ? t : "/dashboard";
}

function errRedirect(origin: string, next: string, code: string) {
  const u = new URL("/auth/register", origin);
  u.searchParams.set("error", code);
  u.searchParams.set("next", next);
  return NextResponse.redirect(u, 303);
}

export async function POST(req: Request) {
  try {

    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const form = await req.formData();

    const email = String(form.get("email") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm_password") || "");
    const next = safeNext(String(form.get("next") || "/dashboard"));

    if (!email || !password)
      return errRedirect(origin, next, "missing_fields");

    if (password.length < 8)
      return errRedirect(origin, next, "weak_password");

    if (confirm && confirm !== password)
      return errRedirect(origin, next, "password_mismatch");

    const base = (process.env.API_BASE || "http://127.0.0.1:8085/api").replace(/\/$/, "");

    // 1️⃣ Register
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
        return errRedirect(origin, next, "email_exists");
      }

      return errRedirect(origin, next, `backend_${regRes.status}`);
    }

    // 2️⃣ Auto login
    const loginRes = await fetch(`${base}/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      cache: "no-store",
      body: JSON.stringify({ email, password }),
    });

    if (!loginRes.ok) {
      const u = new URL("/auth/login", origin);
      u.searchParams.set("next", next);
      u.searchParams.set("error", "please_login");
      return NextResponse.redirect(u, 303);
    }

    const loginJson: any = await loginRes.json().catch(() => ({}));

    const userId =
      String(loginJson.user_id || "") ||
      String(loginJson.id || "") ||
      String(loginJson.user?.id || "");

    if (!userId) {
      const u = new URL("/auth/login", origin);
      u.searchParams.set("next", next);
      u.searchParams.set("error", "please_login");
      return NextResponse.redirect(u, 303);
    }

    // 🔐 session cookie
    setSession({ id: userId, email });

    const res = NextResponse.redirect(new URL(next, origin), 303);

    // ✅ dashboard cookies
    res.cookies.set("ps_uid", userId, {
      path: "/",
      sameSite: "lax",
    });

    res.cookies.set("ps_email", encodeURIComponent(email), {
      path: "/",
      sameSite: "lax",
    });

    return res;

  } catch {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    return errRedirect(origin, "/dashboard", "server_error");
  }
}