import { createHmac, timingSafeEqual } from "crypto";

/**
 * Practice outreach emails are sent from Gmail by an Apps Script, not by
 * this site. The script and this site share OUTREACH_SECRET (Vercel env
 * var and an Apps Script property). The script signs each email's
 * unsubscribe link with it, and uses it as a bearer token to read and
 * add to the opt-out list. Unset means every outreach endpoint refuses.
 */
function secret() {
  const value = process.env.OUTREACH_SECRET;
  return value && value.length >= 16 ? value : null;
}

const EMAIL_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;

/** Lowercase, trim, drop invalid, dedupe and sort, joined with commas. */
export function normalizeEmails(raw: string) {
  const list = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter((e) => EMAIL_RE.test(e) && e.length <= 254);
  return Array.from(new Set(list)).sort();
}

function sign(value: string) {
  const key = secret();
  if (!key) return null;
  return createHmac("sha256", key).update(value, "utf8").digest("hex").slice(0, 32);
}

/** The signed value is "<emails joined by commas>|<practice name>". */
export function verifyOutreachToken(emails: string[], practice: string, token: string) {
  const expected = sign(`${emails.join(",")}|${practice}`);
  if (!expected || !token) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(token);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function isOutreachBearer(authHeader: string | null) {
  const key = secret();
  if (!key || !authHeader?.startsWith("Bearer ")) return false;
  const a = Buffer.from(authHeader.slice(7));
  const b = Buffer.from(key);
  return a.length === b.length && timingSafeEqual(a, b);
}
