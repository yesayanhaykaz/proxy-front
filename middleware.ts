import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  LOCALIZED_MARKETING_PATHS,
  LOCALE_COOKIE,
  detectLocale,
  getLocaleFromPathname,
  stripLocaleFromPathname,
} from "@/lib/i18n";

export function middleware(req: NextRequest) {
  const localeInPath = getLocaleFromPathname(req.nextUrl.pathname);
  const pathname = stripLocaleFromPathname(req.nextUrl.pathname);
  const preferredLocale =
    localeInPath ||
    detectLocale(
      req.cookies.get(LOCALE_COOKIE)?.value ||
        req.headers.get("accept-language")
    );

  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    const session = req.cookies.get("ps_session")?.value;

    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.search = "";
      url.searchParams.set("next", pathname + req.nextUrl.search);
      return NextResponse.redirect(url);
    }
  }

  if (!localeInPath && LOCALIZED_MARKETING_PATHS.has(pathname)) {
    const url = req.nextUrl.clone();
    url.pathname =
      preferredLocale === "en"
        ? `/en${pathname === "/" ? "" : pathname}`
        : `/${preferredLocale}${pathname === "/" ? "" : pathname}`;

    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, preferredLocale, {
      path: "/",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
    });
    return response;
  }

  const response = NextResponse.next();
  response.cookies.set(LOCALE_COOKIE, preferredLocale, {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 365,
  });
  return response;
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/affiliate",
    "/blog",
    "/contact",
    "/documentation",
    "/faqs",
    "/pricing",
    "/residential-proxies",
    "/mobile-proxies",
    "/datacenter-proxies",
    "/fast-proxies",
    "/proxies-for-instagram",
    "/proxies-for-scraping",
    "/proxies-for-tiktok",
    "/dashboard",
    "/dashboard/:path*",
    "/:locale(en|es|fr|de)",
    "/:locale(en|es|fr|de)/about",
    "/:locale(en|es|fr|de)/affiliate",
    "/:locale(en|es|fr|de)/blog",
    "/:locale(en|es|fr|de)/contact",
    "/:locale(en|es|fr|de)/documentation",
    "/:locale(en|es|fr|de)/faqs",
    "/:locale(en|es|fr|de)/pricing",
    "/:locale(en|es|fr|de)/residential-proxies",
    "/:locale(en|es|fr|de)/mobile-proxies",
    "/:locale(en|es|fr|de)/datacenter-proxies",
    "/:locale(en|es|fr|de)/fast-proxies",
    "/:locale(en|es|fr|de)/proxies-for-instagram",
    "/:locale(en|es|fr|de)/proxies-for-scraping",
    "/:locale(en|es|fr|de)/proxies-for-tiktok",
  ],
};
