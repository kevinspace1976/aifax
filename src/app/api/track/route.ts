import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, EXCLUDE_DEVICE_COOKIE, isExcludedDevice, isValidAdminSession } from "@/lib/admin-auth";
import {
  ATTRIBUTION_COOKIE,
  SESSION_COOKIE,
  clientGeo,
  clientIp,
  hasAttributionSignal,
  hashIp,
  isExcludedIp,
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

  // A device the owner marked "exclude me" from the Traffic page. Outlives
  // the admin login, so the owner's phone and laptop stay out of the
  // numbers even when signed out.
  if (isExcludedDevice(req.cookies.get(EXCLUDE_DEVICE_COOKIE)?.value)) {
    return NextResponse.json({ ok: true, skipped: "excluded-device" });
  }

  // Configured owner IPs (EXCLUDED_VISITOR_IPS) never count either, so
  // browsing the public site logged out still doesn't inflate the numbers.
  const requestIp = clientIp(req.headers);
  if (isExcludedIp(requestIp)) {
    return NextResponse.json({ ok: true, skipped: "excluded-ip" });
  }

  let body: { url?: string; engage?: number } = {};
  try {
    body = await req.json();
  } catch {
    // malformed body - nothing to log, fail quiet, this must never break the page
  }

  // Second beacon from the same browser 10 seconds into the page: mark the
  // view engaged. Scoped to the session cookie so nobody can flip rows that
  // are not their own.
  if (body.engage !== undefined) {
    const sid = req.cookies.get(SESSION_COOKIE)?.value;
    const id = Number(body.engage);
    if (sid && Number.isInteger(id) && id > 0) {
      try {
        await ensureSchema();
        await sql()`UPDATE visits SET engaged = TRUE WHERE id = ${id} AND session_id = ${sid}`;
      } catch (err) {
        console.error("[track] failed to mark engaged", err);
      }
    }
    return NextResponse.json({ ok: true });
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

  const geo = clientGeo(req.headers);

  let visitId: number | null = null;
  try {
    await ensureSchema();
    const db = sql();
    const inserted = await db`
      INSERT INTO visits (
        session_id, path, referrer, utm_source, utm_medium, utm_campaign,
        utm_content, utm_term, fbclid, gclid, user_agent, ip_hash, ip, city, region, country
      ) VALUES (
        ${sessionId}, ${attribution.sourcePath}, ${attribution.referrer},
        ${attribution.utmSource}, ${attribution.utmMedium}, ${attribution.utmCampaign},
        ${attribution.utmContent}, ${attribution.utmTerm}, ${attribution.fbclid}, ${attribution.gclid},
        ${req.headers.get("user-agent")}, ${hashIp(requestIp)}, ${requestIp}, ${geo.city}, ${geo.region}, ${geo.country}
      )
      RETURNING id
    `;
    visitId = Number((inserted as { id: number }[])[0]?.id) || null;
  } catch (err) {
    // Analytics must never take the site down. Log and move on.
    console.error("[track] failed to record visit", err);
  }

  const res = NextResponse.json({ ok: true, id: visitId });
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
