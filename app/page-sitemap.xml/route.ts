import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/env";
import { LOCALIZED_MARKETING_PATHS, SUPPORTED_LOCALES } from "@/lib/i18n";

export async function GET() {
  const base = getSiteOrigin();
  const today = new Date().toISOString();

  const pages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/pricing", priority: "0.95", changefreq: "daily" },
    { url: "/residential-proxies", priority: "0.9", changefreq: "weekly" },
    { url: "/mobile-proxies", priority: "0.9", changefreq: "weekly" },
    { url: "/datacenter-proxies", priority: "0.9", changefreq: "weekly" },
    { url: "/fast-proxies", priority: "0.9", changefreq: "weekly" },
    { url: "/proxies-for-instagram", priority: "0.9", changefreq: "weekly" },
    { url: "/proxies-for-scraping", priority: "0.9", changefreq: "weekly" },
    { url: "/proxies-for-tiktok", priority: "0.9", changefreq: "weekly" },
    { url: "/blog", priority: "0.8", changefreq: "daily" },
    { url: "/documentation", priority: "0.7", changefreq: "weekly" },
    { url: "/about", priority: "0.6", changefreq: "monthly" },
    { url: "/contact", priority: "0.6", changefreq: "monthly" },
    { url: "/faqs", priority: "0.65", changefreq: "weekly" },
    { url: "/affiliate", priority: "0.7", changefreq: "monthly" },
    { url: "/terms", priority: "0.3", changefreq: "yearly" },
    { url: "/privacy", priority: "0.3", changefreq: "yearly" },
    { url: "/refunds", priority: "0.3", changefreq: "yearly" },
  ];

  const localizedPages = pages.flatMap((page) => {
    if (!LOCALIZED_MARKETING_PATHS.has(page.url)) return [page];

    return SUPPORTED_LOCALES.map((locale) => ({
      ...page,
      url:
        locale === "en"
          ? `/en${page.url === "/" ? "" : page.url}`
          : `/${locale}${page.url === "/" ? "" : page.url}`,
    }));
  });

  const urls = localizedPages
    .map(
      (p) => `
  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
