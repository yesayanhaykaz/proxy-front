import { NextResponse } from 'next/server'

export async function GET() {
  const base = 'https://proxiesseller.cc'
  const today = new Date().toISOString().split('T')[0]

  const categories = [
    { url: '/residential-proxies', label: 'Residential' },
    { url: '/mobile-proxies',      label: 'Mobile'      },
    { url: '/datacenter-proxies',  label: 'Datacenter'  },
    { url: '/fast-proxies',        label: 'Fast'        },
  ]

  const urls = categories.map(c => `
  <url>
    <loc>${base}${c.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}