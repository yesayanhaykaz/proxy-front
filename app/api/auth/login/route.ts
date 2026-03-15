import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

function safeNext(n: string) {
    const t = (n || "").trim();
    return t.startsWith("/") ? t : "/dashboard";
}

function errRedirect(req: Request, next: string, code: string) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const u = new URL("/auth/login", origin);

    u.searchParams.set("error", code);
    u.searchParams.set("next", next);

    return NextResponse.redirect(u, 303);
}

export async function POST(req: Request) {
    const orig = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const form = await req.formData();

    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const next = safeNext(String(form.get("next") || "/dashboard"));

    if (!email || !password) return errRedirect(req, next, "missing_fields");

    const base = (process.env.API_BASE || "http://localhost:8081/api").replace(/\/$/, "");

    let apiRes: Response;
    try {
        apiRes = await fetch(`${base}/login`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            cache: "no-store",
            body: JSON.stringify({ email, password }),
        });
    } catch (e) {
        // если бекенд недоступен — тоже редирект с нормальным origin
        return errRedirect(req, next, "api_unreachable");
    }

    if (!apiRes.ok) {
        return errRedirect(req, next, "invalid");
    }

    const json: any = await apiRes.json().catch(() => ({}));

    const userId =
        String(json.user_id || "") ||
        String(json.id || "") ||
        String(json.user?.id || "") ||
        String(json.data?.user_id || "") ||
        "";

    if (!userId) return errRedirect(req, next, "invalid");

    setSession({ id: userId, email });

    return NextResponse.redirect(new URL(next, orig), 303);
}