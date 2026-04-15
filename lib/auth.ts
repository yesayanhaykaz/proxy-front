import crypto from "crypto";
import { cookies } from "next/headers";

export type SessionUser = { id: string; email: string };

export const SESSION_COOKIE_NAME = "ps_session";
export const USER_ID_COOKIE_NAME = "ps_uid";
export const USER_EMAIL_COOKIE_NAME = "ps_email";

type MutableCookieStore = {
  set: (
    name: string,
    value: string,
    options?: {
      httpOnly?: boolean;
      sameSite?: "lax" | "strict" | "none";
      secure?: boolean;
      path?: string;
      maxAge?: number;
    }
  ) => void;
};

function sign(payload: string) {
  const secret = process.env.SESSION_SECRET || "dev_secret_change_me";
  return crypto.createHmac("sha256", secret).update(payload).digest("hex");
}

function buildSessionToken(user: SessionUser) {
  const payload = `${user.id}:${user.email}`;
  return `${payload}:${sign(payload)}`;
}

export function applySessionCookies(
  cookieStore: MutableCookieStore,
  user: SessionUser
) {
  cookieStore.set(SESSION_COOKIE_NAME, buildSessionToken(user), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  cookieStore.set(USER_ID_COOKIE_NAME, user.id, {
    path: "/",
    sameSite: "lax",
  });

  cookieStore.set(USER_EMAIL_COOKIE_NAME, encodeURIComponent(user.email), {
    path: "/",
    sameSite: "lax",
  });
}

export function clearSessionCookies(cookieStore: MutableCookieStore) {
  for (const name of [
    SESSION_COOKIE_NAME,
    USER_ID_COOKIE_NAME,
    USER_EMAIL_COOKIE_NAME,
  ]) {
    cookieStore.set(name, "", {
      path: "/",
      maxAge: 0,
    });
  }
}

export function getSession(): SessionUser | null {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
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
  return Boolean(cookies().get(SESSION_COOKIE_NAME)?.value);
}
