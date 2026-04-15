import { NextResponse } from "next/server";
import { applySessionCookies } from "@/lib/auth";

export function applyAuthCookies(
  res: NextResponse,
  userId: string,
  email: string
) {
  applySessionCookies(res.cookies, { id: userId, email });
  return res;
}
