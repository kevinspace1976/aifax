import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";

/**
 * Gates everything under /admin (the analytics + leads dashboard) behind
 * a single shared password, checked via a signed cookie. This is a
 * single-operator business's internal tool, not a multi-user product, so
 * a full auth provider would be more infrastructure than the problem
 * needs - this is the same "one password, one signed cookie" shape as
 * WHMCS's own admin area.
 */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (pathname === "/admin/login" || pathname.startsWith("/api/admin/login")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const session = req.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!isValidAdminSession(session)) {
      if (pathname.startsWith("/api/admin")) {
        return NextResponse.json({ ok: false, error: "Not authenticated." }, { status: 401 });
      }
      const loginUrl = new URL("/admin/login", req.url);
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"]
};
