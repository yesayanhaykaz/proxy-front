import { NextResponse } from "next/server";
import { clearSessionCookies } from "@/lib/auth";
import { getSiteOrigin } from "@/lib/env";

export async function POST(req: Request) {
  const origin = getSiteOrigin();

  const res = NextResponse.redirect(new URL("/auth/login", origin), 303);
  clearSessionCookies(res.cookies);

  return res;
}
