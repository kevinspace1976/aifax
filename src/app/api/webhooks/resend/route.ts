import { createHmac, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";

export const runtime = "nodejs";

/**
 * Resend signs webhook deliveries the same way Svix does: verify with
 * RESEND_WEBHOOK_SECRET (Resend -> Webhooks -> the endpoint's signing
 * secret, starts with "whsec_") before trusting the body, since this URL
 * is publicly reachable.
 */
function verifySignature(payload: string, headers: Headers) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signature = headers.get("svix-signature");
  if (!secret || !id || !timestamp || !signature) return false;

  const secretBytes = Buffer.from(secret.split("_")[1] || "", "base64");
  const signedContent = `${id}.${timestamp}.${payload}`;
  const expected = createHmac("sha256", secretBytes).update(signedContent).digest("base64");
  const expectedBuf = Buffer.from(expected);

  // svix-signature can carry multiple space-separated "v1,<sig>" values
  // (e.g. during secret rotation) - a match on any of them is valid.
  return signature.split(" ").some((part) => {
    const sig = part.split(",")[1];
    if (!sig) return false;
    const sigBuf = Buffer.from(sig);
    return sigBuf.length === expectedBuf.length && timingSafeEqual(sigBuf, expectedBuf);
  });
}

type ResendEvent = {
  type: string;
  created_at: string;
  data: {
    tags?: Record<string, string>;
    click?: { link: string };
  };
};

// Only the events the admin dashboard's lead-level tracking cares about;
// resend can send several other types (domain/contact changes, etc).
const TRACKED_TYPES = new Set([
  "email.delivered",
  "email.opened",
  "email.clicked",
  "email.bounced",
  "email.complained"
]);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  if (!verifySignature(payload, req.headers)) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 401 });
  }

  let event: ResendEvent;
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  if (!TRACKED_TYPES.has(event.type)) {
    return NextResponse.json({ ok: true, skipped: "untracked-type" });
  }

  // Every nurture send is tagged with the lead id it belongs to (see
  // /api/contact and /api/cron/nurture); no tag means it isn't one of our
  // nurture emails.
  const leadId = event.data.tags?.lead_id ? Number(event.data.tags.lead_id) : null;
  if (!leadId) {
    return NextResponse.json({ ok: true, skipped: "no-lead-tag" });
  }
  const step = event.data.tags?.step != null ? Number(event.data.tags.step) : null;

  try {
    await ensureSchema();
    const db = sql();
    await db`
      INSERT INTO email_events (lead_id, step, event_type, link_url, occurred_at)
      VALUES (${leadId}, ${step}, ${event.type}, ${event.data.click?.link || null}, ${event.created_at})
    `;
  } catch (err) {
    // A bad/stale lead id (e.g. a deleted lead) must not make Resend retry
    // forever - log and acknowledge instead of erroring the delivery.
    console.error("[resend-webhook] failed to record event", err);
  }

  return NextResponse.json({ ok: true });
}
