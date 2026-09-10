import { NextRequest, NextResponse } from "next/server";
import { EXCLUDE_DEVICE_COOKIE, excludeDeviceCookieValue } from "@/lib/admin-auth";

export const runtime = "nodejs";

/**
 * Plants (or removes) the "exclude this device" cookie. Only reachable
 * while signed in to /admin (the proxy gates /api/admin). Plain form
 * posts so it works without JavaScript; redirects back to the Traffic
 * page either way.
 */
export async function POST(req: NextRequest) {
  const form = await req.formData().catch(() => null);
  const action = form?.get("action");
  const res = NextResponse.redirect(new URL("/admin/traffic", req.url), 303);
  if (action === "remove") {
    res.cookies.set(EXCLUDE_DEVICE_COOKIE, "", { maxAge: 0, path: "/" });
    return res;
  }
  res.cookies.set(EXCLUDE_DEVICE_COOKIE, excludeDeviceCookieValue(), {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/"
  });
  return res;
}
