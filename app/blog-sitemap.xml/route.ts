import { NextResponse } from 'next/server'

// Replace with your actual DB/CMS fetch
async function getBlogPosts() {
  return [
    { slug: 'tiktok-botting-proxies',      lastmod: '2025-08-03' },
    { slug: 'rotating-vs-static-proxies',  lastmod: '2025-08-03' },
    { slug: 'best-proxies-for-scraping',   lastmod: '2025-08-03' },
    { slug: 'avoid-ip-bans-scraping',      lastmod: '2025-08-03' },
    { slug: 'seo-rank-tracking-proxies',   lastmod: '2025-08-03' },
  ]
}

export async function GET() {
  const base = 'https://proxiesseller.cc'
  const posts = await getBlogPosts()

  const urls = posts.map(post => `
  <url>
    <loc>${base}/blog/${post.slug}</loc>
    <lastmod>${post.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}