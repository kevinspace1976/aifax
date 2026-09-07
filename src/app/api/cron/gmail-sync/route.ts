import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, rows, sql } from "@/lib/db";
import { gmailConfigured, searchMessages } from "@/lib/gmail";

export const runtime = "nodejs";

type LeadRow = { id: number; email: string; created_at: string };

function gmailDateFormat(iso: string) {
  const d = new Date(iso);
  return `${d.getUTCFullYear()}/${String(d.getUTCMonth() + 1).padStart(2, "0")}/${String(d.getUTCDate()).padStart(
    2,
    "0"
  )}`;
}

/**
 * Runs on Vercel Cron (see vercel.json), same auth pattern as
 * /api/cron/nurture. For every lead, searches info@aifax.net's mailbox
 * for messages to/from that lead's address and logs any not already
 * seen into lead_activities, keyed by gmail_message_id so re-running
 * never duplicates. Bounded to messages after the lead's signup date,
 * since nothing earlier could possibly be about them.
 */
export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "CRON_SECRET is not configured." }, { status: 500 });
  }
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false, error: "Not authorized." }, { status: 401 });
  }

  if (!gmailConfigured()) {
    return NextResponse.json({ ok: true, skipped: "gmail-not-configured" });
  }

  await ensureSchema();
  const db = sql();

  const leads = await rows<LeadRow>(db`SELECT id, email, created_at FROM leads`);

  let logged = 0;
  for (const lead of leads) {
    const query = `(from:${lead.email} OR to:${lead.email}) after:${gmailDateFormat(lead.created_at)}`;
    const messages = await searchMessages(query);

    for (const msg of messages) {
      const type = msg.from.toLowerCase().includes("info@aifax.net") ? "email_outbound" : "email_inbound";
      const occurredAt = new Date(Number(msg.internalDate)).toISOString();

      await db`
        INSERT INTO lead_activities (lead_id, type, subject, body, gmail_message_id, occurred_at)
        VALUES (${lead.id}, ${type}, ${msg.subject}, ${msg.snippet}, ${msg.id}, ${occurredAt})
        ON CONFLICT (gmail_message_id) DO NOTHING
      `;
      logged++;
    }
  }

  return NextResponse.json({ ok: true, leadsChecked: leads.length, messagesSeen: logged });
}
