import { NextResponse } from "next/server";
import { setSession } from "@/lib/auth";

export function applyAuthCookies(
  res: NextResponse,
  userId: string,
  email: string
) {
  // existing session (JWT)
  setSession({ id: userId, email });

  // dashboard cookies
  res.cookies.set("ps_uid", userId, {
    path: "/",
    sameSite: "lax",
  });

  res.cookies.set("ps_email", encodeURIComponent(email), {
    path: "/",
    sameSite: "lax",
  });

  return res;
}