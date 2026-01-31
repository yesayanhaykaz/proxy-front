import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });

  // Clear cookies everywhere
  res.cookies.set("ps_session", "", { path: "/", maxAge: 0 });
  res.cookies.set("ps_email", "", { path: "/", maxAge: 0 });

  // Prevent caching
  res.headers.set("Cache-Control", "no-store");

  return res;
}

// optional: keep GET for manual testing
export async function GET() {
  return POST();
}
