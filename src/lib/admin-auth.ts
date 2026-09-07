import { createHmac, timingSafeEqual } from "crypto";

export const ADMIN_SESSION_COOKIE = "aifax_admin_session";

/**
 * The cookie never holds the password itself, it holds an HMAC over a
 * fixed label using the password as the key. Anyone who already knows
 * ADMIN_PASSWORD can compute it (that's the login check), but the cookie
 * value alone can't be reversed back into the password if it ever leaks
 * in a log.
 */
function expectedSessionValue() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHmac("sha256", password).update("aifax-admin-session").digest("hex");
}

export function checkAdminPassword(candidate: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(password);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function adminSessionCookieValue() {
  const value = expectedSessionValue();
  if (!value) throw new Error("ADMIN_PASSWORD is not set");
  return value;
}

export function isValidAdminSession(cookieValue: string | undefined) {
  const expected = expectedSessionValue();
  if (!expected || !cookieValue) return false;
  const a = Buffer.from(expected);
  const b = Buffer.from(cookieValue);
  return a.length === b.length && timingSafeEqual(a, b);
}
