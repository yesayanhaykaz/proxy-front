import { NextResponse } from "next/server";
import { getSiteOrigin } from "@/lib/env";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

async function getBlogPosts() {
  return [
    { slug: "tiktok-botting-proxies", lastmod: "2025-08-03" },
    { slug: "rotating-vs-static-proxies", lastmod: "2025-08-03" },
    { slug: "best-proxies-for-scraping", lastmod: "2025-08-03" },
    { slug: "avoid-ip-bans-scraping", lastmod: "2025-08-03" },
    { slug: "seo-rank-tracking-proxies", lastmod: "2025-08-03" },
  ];
}

export async function GET() {
  const base = getSiteOrigin();
  const posts = await getBlogPosts();
  const today = new Date().toISOString();

  const indexUrls = SUPPORTED_LOCALES.map((locale) => `
  <url>
    <loc>${base}${locale === "en" ? "/en/blog" : `/${locale}/blog`}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

  const postUrls = posts.map((post) => `
  <url>
    <loc>${base}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.lastmod).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexUrls}
${postUrls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
