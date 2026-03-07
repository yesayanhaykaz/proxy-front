import {NextResponse} from "next/server";
import {setSession} from "@/lib/auth";

function safeNext(n: string) {
    const t = (n || "").trim();
    return t.startsWith("/") ? t : "/dashboard";
}

function errRedirect(reqUrl: string, next: string, code: string) {
    const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
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

        if (!email || !password) return errRedirect(origin, next, "missing_fields");
        if (password.length < 8) return errRedirect(origin, next, "weak_password");
        if (confirm && confirm !== password) return errRedirect(origin, next, "password_mismatch");

        // ✅ IMPORTANT: use the real backend base
        // On VPS set API_BASE=http://127.0.0.1:8085/api  (or https://api.proxiesseller.cc/api)
        const base = (process.env.API_BASE || "http://127.0.0.1:8085/api").replace(/\/$/, "");

        // 1) Register
        const regRes = await fetch(`${base}/register`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            cache: "no-store",
            body: JSON.stringify({email, password}),
        });

        if (!regRes.ok) {
            const text = await regRes.text().catch(() => "");
            const low = text.toLowerCase();
            if (regRes.status === 409 || low.includes("exists") || low.includes("already")) {
                return errRedirect(origin, next, "email_exists");
            }
            return errRedirect(origin, next, `backend_${regRes.status}`);
        }

        // 2) Auto-login
        const loginRes = await fetch(`${base}/login`, {
            method: "POST",
            headers: {"content-type": "application/json"},
            cache: "no-store",
            body: JSON.stringify({email, password}),
        });

        if (!loginRes.ok) {
            const u = new URL("/auth/login", origin);
            u.searchParams.set("next", next);
            u.searchParams.set("error", "please_login");
            return NextResponse.redirect(u, 303);
        }

        const loginJson: any = await loginRes.json().catch(() => ({}));
        const userId = String(loginJson.user_id || loginJson.id || loginJson.user?.id || "");

        if (!userId) {
            const u = new URL("/auth/login", origin);
            u.searchParams.set("next", next);
            u.searchParams.set("error", "please_login");
            return NextResponse.redirect(u, 303);
        }

        setSession({id: userId, email});

        return NextResponse.redirect(new URL(next, origin), 303);
    } catch (e) {
        const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
        // never hard-500 without message to UI
        return errRedirect(origin, "/dashboard", "server_error");
    }
}
