import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, sql } from "@/lib/db";
import { hashIp, readStoredAttribution, requestIp } from "@/lib/attribution";
import { adminNotificationAddress, sendEmail } from "@/lib/resend";
import { fireMetaLeadEvent } from "@/lib/meta-capi";
import { DELAYS_DAYS, NURTURE_SEQUENCE } from "@/lib/email-templates/nurture";
import { mailingAddress, unsubscribeUrl } from "@/lib/unsubscribe";
import { EMAIL_RE, suggestEmailCorrection } from "@/lib/email-validation";
import { generateLeadReply } from "@/lib/ai-draft";
import { createDraft, gmailConfigured } from "@/lib/gmail";

export const runtime = "nodejs";

type ContactBody = {
  name?: string;
  email?: string;
  phone?: string;
  practice?: string;
  ehr?: string;
  faxProvider?: string;
  faxNumber?: string;
  volume?: string;
  callWindow?: string;
  notes?: string;
  // honeypot: real visitors never see or fill this field (hidden via CSS).
  // A filled-in value means it was a bot filling every input it found.
  companyWebsite?: string;
  // Generated client-side and also used for the browser-side fbq('track',
  // 'Lead') call, so if this server-side Conversions API send is ever
  // working too, Meta de-duplicates the two instead of double-counting.
  eventId?: string;
};

/**
 * Best-effort: generates a personalized reply with Claude and creates it
 * as a Gmail draft for the admin to review and send. Never sends anything
 * itself, and any failure here (no API key, Gmail not connected, model
 * error) must never affect the visitor's success response.
 */
async function attemptAutoDraft(lead: {
  name: string;
  practiceName: string | null;
  email: string;
  phone: string | null;
  ehrPlatform: string | null;
  faxProvider: string | null;
  faxNumber: string | null;
  monthlyVolume: string | null;
  callWindow: string | null;
  notes: string | null;
}) {
  if (!gmailConfigured()) return;
  try {
    const replyBody = await generateLeadReply(lead);
    if (!replyBody) return;
    await createDraft({
      to: lead.email,
      subject: `Re: Workflow review request - ${lead.practiceName || lead.name}`,
      body: replyBody
    });
  } catch (err) {
    console.error("[contact] auto-draft failed", err);
  }
}

export async function POST(req: NextRequest) {
  let body: ContactBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  if (body.companyWebsite) {
    // Silently accept-and-drop for the bot, rather than a 4xx that tells
    // it what to fix, but do NOT save it as a real lead.
    return NextResponse.json({ ok: true });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "A valid name and email are required." }, { status: 400 });
  }
  const emailCorrection = suggestEmailCorrection(email);
  if (emailCorrection) {
    return NextResponse.json(
      { ok: false, error: `That email looks like a typo, did you mean ${emailCorrection}?` },
      { status: 400 }
    );
  }

  const attribution = await readStoredAttribution();
  const ip = await requestIp();
  const userAgent = req.headers.get("user-agent");

  await ensureSchema();
  const db = sql();

  const firstDelayDays = DELAYS_DAYS[1] ?? 2;
  const nextEmailDueAt = new Date(Date.now() + firstDelayDays * 24 * 60 * 60 * 1000);

  const rows = await db`
    INSERT INTO leads (
      name, email, phone, practice_name, ehr_platform, fax_provider, fax_number,
      monthly_volume, call_window, notes,
      source_path, referrer, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
      fbclid, gclid, ip_hash, sequence_step, next_email_due_at
    ) VALUES (
      ${name}, ${email}, ${body.phone || null}, ${body.practice || null}, ${body.ehr || null},
      ${body.faxProvider || null}, ${body.faxNumber || null}, ${body.volume || null}, ${body.callWindow || null},
      ${body.notes || null},
      ${attribution?.sourcePath || null}, ${attribution?.referrer || null}, ${attribution?.utmSource || null},
      ${attribution?.utmMedium || null}, ${attribution?.utmCampaign || null}, ${attribution?.utmContent || null},
      ${attribution?.utmTerm || null}, ${attribution?.fbclid || null}, ${attribution?.gclid || null},
      ${hashIp(ip)}, 1, ${nextEmailDueAt.toISOString()}
    )
    RETURNING id
  `;
  const leadId = rows[0]!.id as number;

  const adminHtml = `
    <h2>New workflow review request</h2>
    <p><strong>${name}</strong> (${email})${body.practice ? ` &mdash; ${body.practice}` : ""}</p>
    <table cellpadding="4">
      <tr><td>Phone</td><td>${body.phone || "-"}</td></tr>
      <tr><td>EHR platform</td><td>${body.ehr || "-"}</td></tr>
      <tr><td>Current fax provider</td><td>${body.faxProvider || "-"}</td></tr>
      <tr><td>Current fax number</td><td>${body.faxNumber || "-"}</td></tr>
      <tr><td>Monthly volume</td><td>${body.volume || "-"}</td></tr>
      <tr><td>Best time to call</td><td>${body.callWindow || "-"}</td></tr>
      <tr><td>Source</td><td>${attribution?.utmSource || attribution?.referrer || "direct"}${
        attribution?.utmCampaign ? ` / campaign: ${attribution.utmCampaign}` : ""
      }${attribution?.fbclid ? " / from a Facebook ad click" : ""}</td></tr>
    </table>
    <p><strong>What they want to solve:</strong><br />${(body.notes || "-").replace(/\n/g, "<br />")}</p>
    <p><a href="https://www.aifax.net/admin">View in admin</a></p>
  `;
  const adminText = `New workflow review request\n\n${name} (${email})${
    body.practice ? ` - ${body.practice}` : ""
  }\nPhone: ${body.phone || "-"}\nEHR: ${body.ehr || "-"}\nCurrent fax provider: ${
    body.faxProvider || "-"
  }\nMonthly volume: ${body.volume || "-"}\nBest time to call: ${body.callWindow || "-"}\nSource: ${
    attribution?.utmSource || attribution?.referrer || "direct"
  }${attribution?.utmCampaign ? ` / campaign: ${attribution.utmCampaign}` : ""}${
    attribution?.fbclid ? " / from a Facebook ad click" : ""
  }\n\nWhat they want to solve:\n${body.notes || "-"}`;

  const day0 = NURTURE_SEQUENCE[0]!;
  const nurtureCtx = {
    name,
    practiceName: body.practice || null,
    notes: body.notes || null,
    unsubscribeUrl: unsubscribeUrl(leadId),
    mailingAddress: mailingAddress()
  };

  // Prefer the client's id so it dedupes against the browser-side fbq
  // call in workflow-review-form.tsx; fall back to a fresh one if it's
  // missing (e.g. a direct API call with no client involved).
  const eventId = body.eventId || randomUUID();

  const [adminSend, leadSend] = await Promise.all([
    sendEmail({
      to: adminNotificationAddress(),
      subject: `Workflow review request - ${body.practice || name}`,
      html: adminHtml,
      text: adminText,
      replyTo: email
    }),
    sendEmail({
      to: email,
      subject: day0.subject,
      html: day0.html(nurtureCtx),
      text: day0.text(nurtureCtx),
      tags: [
        { name: "lead_id", value: String(leadId) },
        { name: "step", value: "0" }
      ]
    }),
    fireMetaLeadEvent({
      email,
      eventId,
      ip: ip || null,
      userAgent,
      fbclid: attribution?.fbclid || null,
      sourceUrl: `https://www.aifax.net${attribution?.sourcePath || "/contact"}`
    }),
    attemptAutoDraft({
      name,
      practiceName: body.practice || null,
      email,
      phone: body.phone || null,
      ehrPlatform: body.ehr || null,
      faxProvider: body.faxProvider || null,
      faxNumber: body.faxNumber || null,
      monthlyVolume: body.volume || null,
      callWindow: body.callWindow || null,
      notes: body.notes || null
    })
  ]);

  if (leadSend.sent) {
    await db`UPDATE leads SET last_email_sent_at = now() WHERE id = ${leadId}`;
  }
  void adminSend; // notification delivery failure doesn't change the response to the visitor

  return NextResponse.json({ ok: true });
}
