import { NextResponse } from 'next/server'

export async function GET() {

  const robots = `
User-agent: *
Allow: /

Disallow: /auth/
Disallow: /api/
Disallow: /admin/

Sitemap: https://www.proxiesseller.cc/sitemap.xml
`

  return new NextResponse(robots.trim(), {
    headers: { 'Content-Type': 'text/plain' }
  })
}