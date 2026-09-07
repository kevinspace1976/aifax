import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, rows, sql } from "@/lib/db";
import { adminNotificationAddress, sendEmail } from "@/lib/resend";
import { DELAYS_DAYS, NURTURE_SEQUENCE } from "@/lib/email-templates/nurture";
import { mailingAddress, unsubscribeUrl } from "@/lib/unsubscribe";

export const runtime = "nodejs";

type DueLead = {
  id: number;
  name: string;
  email: string;
  practice_name: string | null;
  notes: string | null;
  sequence_step: number;
  created_at: string;
};

/**
 * Runs on Vercel Cron (see vercel.json), once a day. Sends whichever
 * nurture-sequence email is due for each lead, then advances that lead to
 * the next step and schedules the following one. Batched (LIMIT 100 per
 * run) so one invocation can't try to send an unbounded number of emails.
 *
 * Step 0 (the immediate confirmation) is sent synchronously at signup by
 * /api/contact, not here - by the time a lead reaches this route its
 * sequence_step is already 1, meaning NURTURE_SEQUENCE[1] (the day-2
 * email) is what's due first.
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

  await ensureSchema();
  const db = sql();

  const due = await rows<DueLead>(db`
    SELECT id, name, email, practice_name, notes, sequence_step, created_at
    FROM leads
    WHERE unsubscribed = FALSE
      AND nurture_paused = FALSE
      AND next_email_due_at IS NOT NULL
      AND next_email_due_at <= now()
      AND sequence_step < ${NURTURE_SEQUENCE.length}
    ORDER BY next_email_due_at ASC
    LIMIT 100
  `);

  let sent = 0;
  let failed = 0;

  for (const lead of due) {
    const template = NURTURE_SEQUENCE[lead.sequence_step];
    if (!template) continue; // sequence exhausted, nothing to send

    const ctx = {
      name: lead.name,
      practiceName: lead.practice_name,
      notes: lead.notes,
      unsubscribeUrl: unsubscribeUrl(lead.id),
      mailingAddress: mailingAddress()
    };

    const result = await sendEmail({
      to: lead.email,
      subject: template.subject,
      html: template.html(ctx),
      text: template.text(ctx),
      replyTo: adminNotificationAddress(),
      tags: [
        { name: "lead_id", value: String(lead.id) },
        { name: "step", value: String(lead.sequence_step) }
      ]
    });

    if (!result.sent) {
      failed++;
      // Leave next_email_due_at untouched so tomorrow's run retries it.
      continue;
    }

    sent++;
    const nextStep = lead.sequence_step + 1;
    const nextDelay = DELAYS_DAYS[nextStep];
    const createdAt = new Date(lead.created_at);
    const nextDue = nextDelay != null ? new Date(createdAt.getTime() + nextDelay * 24 * 60 * 60 * 1000) : null;

    await db`
      UPDATE leads
      SET sequence_step = ${nextStep},
          last_email_sent_at = now(),
          next_email_due_at = ${nextDue ? nextDue.toISOString() : null}
      WHERE id = ${lead.id}
    `;
  }

  return NextResponse.json({ ok: true, checked: due.length, sent, failed });
}
