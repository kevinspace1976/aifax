import { gmailConfigured, sendMessage } from "@/lib/gmail";
import { adminNotificationAddress, sendEmail } from "@/lib/resend";

/**
 * Mail to the site owner (new-lead alerts, lead digests). Goes out through
 * the connected info@aifax.net Gmail account first, because that path is
 * already proven by the draft flow and lands in the owner's inbox. Falls
 * back to Resend only if Gmail is not configured or the send fails.
 */
export async function notifyAdmin(opts: { subject: string; html: string; text: string; replyTo?: string }) {
  const to = adminNotificationAddress();
  if (gmailConfigured()) {
    const ok = await sendMessage({ to, subject: opts.subject, html: opts.html, text: opts.text, replyTo: opts.replyTo });
    if (ok) return { sent: true as const, via: "gmail" as const };
  }
  const result = await sendEmail({ to, subject: opts.subject, html: opts.html, text: opts.text, replyTo: opts.replyTo });
  return { sent: result.sent, via: "resend" as const };
}
