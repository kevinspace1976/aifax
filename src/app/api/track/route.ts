import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, isValidAdminSession } from "@/lib/admin-auth";
import {
  ATTRIBUTION_COOKIE,
  SESSION_COOKIE,
  clientIp,
  hasAttributionSignal,
  hashIp,
  parseAttributionFromUrl
} from "@/lib/attribution";

export const runtime = "nodejs";

/**
 * Fired once per page view by <VisitTracker> in the root layout. Logs the
 * visit and, on a visitor's first page load, plants a first-party cookie
 * recording whatever UTM/fbclid params brought them in - so if they fill
 * the contact form five pages and ten minutes later, that submission still
 * carries the ad that actually drove it instead of "direct".
 */
export async function POST(req: NextRequest) {
  // A browser signed into /admin is the site owner, not a visitor. Skip
  // logging entirely rather than polluting the numbers with the owner's
  // own browsing (this also covers /admin itself, belt-and-suspenders
  // alongside the client-side skip in <VisitTracker>).
  if (isValidAdminSession(req.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ ok: true, skipped: "admin" });
  }

  let body: { url?: string } = {};
  try {
    body = await req.json();
  } catch {
    // malformed body - nothing to log, fail quiet, this must never break the page
  }
  if (!body.url) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const referrer = req.headers.get("referer");
  const attribution = parseAttributionFromUrl(body.url, referrer);

  const existingSid = req.cookies.get(SESSION_COOKIE)?.value;
  const sessionId = existingSid || randomUUID();

  const existingAttrCookie = req.cookies.get(ATTRIBUTION_COOKIE)?.value;
  const shouldStoreAttribution = !existingAttrCookie && hasAttributionSignal(attribution);

  try {
    await ensureSchema();
    const db = sql();
    const ip = clientIp(req.headers);
    await db`
      INSERT INTO visits (
        session_id, path, referrer, utm_source, utm_medium, utm_campaign,
        utm_content, utm_term, fbclid, gclid, user_agent, ip_hash
      ) VALUES (
        ${sessionId}, ${attribution.sourcePath}, ${attribution.referrer},
        ${attribution.utmSource}, ${attribution.utmMedium}, ${attribution.utmCampaign},
        ${attribution.utmContent}, ${attribution.utmTerm}, ${attribution.fbclid}, ${attribution.gclid},
        ${req.headers.get("user-agent")}, ${hashIp(ip)}
      )
    `;
  } catch (err) {
    // Analytics must never take the site down. Log and move on.
    console.error("[track] failed to record visit", err);
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 365,
    path: "/"
  });
  if (shouldStoreAttribution) {
    res.cookies.set(ATTRIBUTION_COOKIE, encodeURIComponent(JSON.stringify(attribution)), {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      // 90 days: long enough to cover a slow B2B decision (research the
      // product, ask a colleague, come back and fill the form later)
      // without holding first-touch data indefinitely.
      maxAge: 60 * 60 * 24 * 90,
      path: "/"
    });
  }
  return res;
}
