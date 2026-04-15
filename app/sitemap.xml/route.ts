import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/env";

export async function GET() {
  const base = getSiteOrigin();
  const now = new Date().toISOString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

<sitemap>
<loc>${base}/page-sitemap.xml</loc>
<lastmod>${now}</lastmod>
</sitemap>

<sitemap>
<loc>${base}/proxy_cat-sitemap.xml</loc>
<lastmod>${now}</lastmod>
</sitemap>

<sitemap>
<loc>${base}/blog-sitemap.xml</loc>
<lastmod>${now}</lastmod>
</sitemap>

</sitemapindex>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
