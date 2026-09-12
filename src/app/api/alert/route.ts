import { NextRequest, NextResponse } from "next/server";
import { notifyAdmin } from "@/lib/notify";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Server alert intake.
 *
 * The fax and AI servers run an hourly health check over the customer flow.
 * Neither box has a mail path we control: ICTFax has no working local MTA,
 * and its only SMTP account is the one the provider blocked on 2026-09-11,
 * which would have meant the alert about a mail outage travelling over the
 * mail path that was out. This endpoint reuses the notification route that
 * already works for lead alerts, so alerting never shares a failure mode
 * with the thing it is watching.
 *
 * POST JSON: { secret, server, subject?, body }
 * Authorised by ALERT_WEBHOOK_SECRET, compared in constant time.
 */
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function POST(req: NextRequest) {
  const expected = process.env.ALERT_WEBHOOK_SECRET || "";
  if (!expected) {
    return NextResponse.json({ ok: false, error: "alerting not configured" }, { status: 503 });
  }

  let payload: { secret?: string; server?: string; subject?: string; body?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad json" }, { status: 400 });
  }

  if (!payload.secret || !safeEqual(payload.secret, expected)) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const server = (payload.server || "unknown server").slice(0, 80);
  const body = (payload.body || "").slice(0, 20000);
  if (!body.trim()) {
    return NextResponse.json({ ok: false, error: "empty body" }, { status: 400 });
  }

  const subject = (payload.subject || `AiFax ALERT: ${server} health check failed`).slice(0, 200);
  const escaped = body.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  const result = await notifyAdmin({
    subject,
    text: `${server}\n\n${body}`,
    html: `<p><b>${server}</b></p><pre style="font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;line-height:1.5;white-space:pre-wrap">${escaped}</pre>`,
  });

  return NextResponse.json({ ok: result.sent, via: result.via });
}
