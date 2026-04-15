import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/env";

export async function GET() {
  const site = getSiteOrigin();
  const robots = `
User-agent: *
Allow: /

Disallow: /auth/
Disallow: /api/
Disallow: /admin/

Sitemap: ${site}/sitemap.xml
`

  return new NextResponse(robots.trim(), {
    headers: { "Content-Type": "text/plain" },
  });
}
