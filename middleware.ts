import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  const session = req.cookies.get("ps_session")?.value;

  // protect dashboard
  if (pathname === "/dashboard" || pathname.startsWith("/dashboard/")) {
    if (!session) {
      const url = req.nextUrl.clone();
      url.pathname = "/auth/login";
      url.search = "";
      url.searchParams.set("next", pathname + search);
      return NextResponse.redirect(url);
    }
  }

  // protect checkout register/login mode pages optionally (keep checkout open)
  // if you want checkout open even without session, remove this section.

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
