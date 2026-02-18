import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

function safeNext(n: string) {
  const t = (n || "").trim();
  return t.startsWith("/") ? t : "/dashboard";
}

function errRedirect(reqUrl: string, next: string, code: string) {
  const u = new URL("/auth/login", reqUrl);
  u.searchParams.set("error", code);
  u.searchParams.set("next", next);
  return NextResponse.redirect(u, 303);
}

export async function POST(req: Request) {
  const form = await req.formData();

  const email = String(form.get("email") || "").trim();
  const password = String(form.get("password") || "");
  const next = safeNext(String(form.get("next") || "/dashboard"));

  if (!email || !password) return errRedirect(req.url, next, "missing_fields");

  const base = (process.env.API_BASE || "http://localhost:8081/api").replace(/\/$/, "");

  const apiRes = await fetch(`${base}/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    cache: "no-store",
    body: JSON.stringify({ email, password }),
  });

  if (!apiRes.ok) {
    // helpful debug: forward status (optional)
    return errRedirect(req.url, next, "invalid");
  }

  const json: any = await apiRes.json().catch(() => ({}));

  // accept common response shapes
  const userId =
    String(json.user_id || "") ||
    String(json.id || "") ||
    String(json.user?.id || "") ||
    String(json.data?.user_id || "") ||
    "";

  if (!userId) {
    return errRedirect(req.url, next, "invalid");
  }

  // ✅ sets signed ps_session cookie that getSession() expects
  setSession({ id: userId, email });

  return NextResponse.redirect(new URL(next, req.url), 303);
}
