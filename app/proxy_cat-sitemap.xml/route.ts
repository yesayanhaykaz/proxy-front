import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/env";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

export async function GET() {
  const base = getSiteOrigin();
  const today = new Date().toISOString();

  const categories = [
    "/residential-proxies",
    "/mobile-proxies",
    "/datacenter-proxies",
    "/fast-proxies",
    "/proxies-for-instagram",
    "/proxies-for-scraping",
    "/proxies-for-tiktok",
  ];

  const localized = SUPPORTED_LOCALES.flatMap((locale) =>
    categories.map((url) => (locale === "en" ? `/en${url}` : `/${locale}${url}`))
  );

  const urls = localized.map(url => `
  <url>
    <loc>${base}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' }
  })
}
