export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Providers that exclusively send from a .com domain. Deliberately narrow
// (just the handful of major free providers) rather than a general TLD
// typo-checker, so this never misfires on a real business domain using a
// legitimate non-.com TLD (.co, .io, .health, a country code, etc).
const KNOWN_PROVIDER_TLDS: Record<string, string> = {
  gmail: "com",
  yahoo: "com",
  hotmail: "com",
  outlook: "com",
  aol: "com",
  icloud: "com",
  live: "com",
  msn: "com",
  protonmail: "com"
};

/**
 * If the email's domain looks like a well-known free provider typed with
 * the wrong TLD (e.g. "gmail.cmo" instead of "gmail.com"), returns the
 * corrected email. Otherwise null. Catches the case a generic email-format
 * regex can't: "gmail.cmo" is syntactically a valid email, just wrong.
 */
export function suggestEmailCorrection(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at === -1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  const parts = domain.split(".");
  if (parts.length !== 2) return null;
  const [name, tld] = parts;
  const expected = KNOWN_PROVIDER_TLDS[name];
  if (expected && tld !== expected) {
    return `${email.slice(0, at + 1)}${name}.${expected}`;
  }
  return null;
}
