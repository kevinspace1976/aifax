import { createHash } from "crypto";

/**
 * Meta's server-side twin to the browser Pixel. Sending the same event
 * from both places (same event_id on both, so Meta de-duplicates them) is
 * Meta's current recommended setup: the browser Pixel alone increasingly
 * misses events to ad blockers, Safari's tracking prevention, and iOS -
 * the server-side copy is what keeps the "Leads" Custom Audience actually
 * complete enough to retarget or build a Lookalike from.
 *
 * Every call is best-effort and never throws: a lead must still be saved
 * and the visitor must still see a success message even if Meta's API is
 * unreachable or the Pixel isn't configured yet.
 */
export async function fireMetaLeadEvent(opts: {
  email: string;
  eventId: string;
  ip: string | null;
  userAgent: string | null;
  fbclid: string | null;
  sourceUrl: string;
}) {
  const pixelId = process.env.META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !accessToken) {
    console.warn("[meta-capi] META_PIXEL_ID / META_CAPI_ACCESS_TOKEN not set, skipped Lead event");
    return { sent: false as const };
  }

  const hashedEmail = createHash("sha256").update(opts.email.trim().toLowerCase()).digest("hex");

  const payload = {
    data: [
      {
        event_name: "Lead",
        event_time: Math.floor(Date.now() / 1000),
        event_id: opts.eventId,
        event_source_url: opts.sourceUrl,
        action_source: "website",
        user_data: {
          em: [hashedEmail],
          client_ip_address: opts.ip || undefined,
          client_user_agent: opts.userAgent || undefined,
          // Meta's click-id parameter, built from the fbclid query param
          // plus the time it was captured - this is what actually links
          // the lead back to the specific ad/ad-set that was clicked.
          fbc: opts.fbclid ? `fb.1.${Date.now()}.${opts.fbclid}` : undefined
        }
      }
    ]
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      }
    );
    if (!res.ok) {
      console.error("[meta-capi] Facebook rejected the event", await res.text());
      return { sent: false as const };
    }
    return { sent: true as const };
  } catch (err) {
    console.error("[meta-capi] request failed", err);
    return { sent: false as const };
  }
}
