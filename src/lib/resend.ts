import { Resend } from "resend";

const FROM = process.env.RESEND_FROM || "AiFax <info@aifax.net>";
const ADMIN_EMAIL = process.env.ADMIN_NOTIFICATION_EMAIL || "info@aifax.net";

function client() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

/**
 * Every send goes through here, and every send is best-effort: a lead's
 * form submission must still succeed and save to the database even if
 * Resend is down, misconfigured, or (in local dev) has no API key at all.
 */
export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
}) {
  const resend = client();
  if (!resend) {
    console.warn(`[email] RESEND_API_KEY not set, skipped: "${opts.subject}" to ${opts.to}`);
    return { sent: false as const };
  }
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
      tags: opts.tags
    });
    if (error) {
      console.error("[email] Resend rejected the send", error);
      return { sent: false as const };
    }
    return { sent: true as const };
  } catch (err) {
    console.error("[email] send failed", err);
    return { sent: false as const };
  }
}

export function adminNotificationAddress() {
  return ADMIN_EMAIL;
}
