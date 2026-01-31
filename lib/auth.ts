import { cookies } from "next/headers";
import crypto from "crypto";

export type SessionUser = { id: string; email: string };

const COOKIE_NAME = "ps_session";

/**
 * For now: simple signed token "userId:email:signature".
 * Later replace with real sessions in DB/Redis + JWT.
 */
function sign(payload: string) {
  const secret = process.env.SESSION_SECRET || "dev_secret_change_me";
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

export function setSession(user: SessionUser) {
  const payload = `${user.id}:${user.email}`;
  const token = `${payload}:${sign(payload)}`;

  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearSession() {
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}

export function getSession(): SessionUser | null {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;

  const parts = token.split(":");
  if (parts.length < 3) return null;

  const userId = parts[0];
  const email = parts[1];
  const sig = parts.slice(2).join(":");

  const payload = `${userId}:${email}`;
  if (sign(payload) !== sig) return null;

  return { id: userId, email };
}



export function isAuthenticated() {
  const cookieStore = cookies();
  const token = cookieStore.get("auth_token");
  return !!token;
}
