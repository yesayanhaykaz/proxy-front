import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth";

export async function POST(req: Request) {

  const origin = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const res = NextResponse.redirect(new URL("/auth/login", origin), 303);

  // clear JWT session
  clearSession();

  // clear dashboard cookies
  res.cookies.set("ps_uid", "", {
    path: "/",
    expires: new Date(0),
  });

  res.cookies.set("ps_email", "", {
    path: "/",
    expires: new Date(0),
  });

  return res;
}