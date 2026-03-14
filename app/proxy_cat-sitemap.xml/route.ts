import { NextResponse } from 'next/server'

export async function GET() {

  const base = 'https://www.proxiesseller.cc'
  const today = new Date().toISOString()

  const categories = [
    '/residential-proxies',
    '/mobile-proxies',
    '/datacenter-proxies',
    '/fast-proxies'
  ]

  const urls = categories.map(url => `
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