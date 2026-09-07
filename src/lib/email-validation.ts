export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The handful of major free providers, always at their real domain. Kept
// deliberately short and well-known so fuzzy matching against this list
// never misfires on a real business domain.
const KNOWN_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "live.com",
  "msn.com",
  "protonmail.com"
];

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 0; j <= b.length; j++) dp[0]![j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i]![j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1]![j - 1]!
          : 1 + Math.min(dp[i - 1]![j]!, dp[i]![j - 1]!, dp[i - 1]![j - 1]!);
    }
  }
  return dp[a.length]![b.length]!;
}

/**
 * If the email's domain is a near-miss of a well-known free provider
 * (wrong TLD like "gmail.cmo", or a misspelled name like "gmial.com"),
 * returns the corrected email. Otherwise null. Requires the closest known
 * domain to be within edit distance 2, similar in length, and a strictly
 * closer match than any other known domain, so it never second-guesses a
 * legitimate business domain.
 */
export function suggestEmailCorrection(email: string): string | null {
  const at = email.lastIndexOf("@");
  if (at === -1) return null;
  const domain = email.slice(at + 1).toLowerCase();
  if (KNOWN_DOMAINS.includes(domain)) return null;

  let best: { domain: string; distance: number } | null = null;
  let tie = false;
  for (const known of KNOWN_DOMAINS) {
    if (Math.abs(domain.length - known.length) > 2) continue;
    const distance = levenshtein(domain, known);
    if (!best || distance < best.distance) {
      best = { domain: known, distance };
      tie = false;
    } else if (best && distance === best.distance) {
      tie = true;
    }
  }

  if (best && !tie && best.distance > 0 && best.distance <= 2) {
    return `${email.slice(0, at + 1)}${best.domain}`;
  }
  return null;
}
