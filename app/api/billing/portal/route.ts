import { NextResponse } from "next/server";

export async function GET() {
  const portalUrl = process.env.BILLING_PORTAL_URL;
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  if (portalUrl) return NextResponse.redirect(portalUrl, { status: 302 });

  return NextResponse.redirect(new URL("/dashboard/billing?portal=missing", base), { status: 302 });
}
