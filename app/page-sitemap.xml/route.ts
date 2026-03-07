import { NextResponse } from 'next/server'

export async function GET() {
  const base = 'https://proxiesseller.cc'
  const today = new Date().toISOString().split('T')[0]

  const pages = [
    { url: '/',             priority: '1.0', changefreq: 'daily'   },
    { url: '/pricing',      priority: '0.9', changefreq: 'weekly'  },
    { url: '/about',        priority: '0.7', changefreq: 'monthly' },
    { url: '/contact',      priority: '0.7', changefreq: 'monthly' },
    { url: '/affiliate',    priority: '0.7', changefreq: 'monthly' },
    { url: '/blog',         priority: '0.8', changefreq: 'weekly'  },
    { url: '/documentation',priority: '0.8', changefreq: 'weekly'  },
    { url: '/terms',        priority: '0.4', changefreq: 'yearly'  },
    { url: '/privacy',      priority: '0.4', changefreq: 'yearly'  },
    { url: '/refunds',      priority: '0.4', changefreq: 'yearly'  },
  ]

  const urls = pages.map(p => `
  <url>
    <loc>${base}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}