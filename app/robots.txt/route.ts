import { NextResponse } from 'next/server'

export async function GET() {
  return new NextResponse(
    `User-agent: *\nAllow: /\nDisallow: /auth/\n\nSitemap: https://proxiesseller.cc/sitemap.xml`,
    { headers: { 'Content-Type': 'text/plain' } }
  )
}