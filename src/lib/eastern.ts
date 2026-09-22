/**
 * Admin screens show times on Miami's clock, because that is the clock the
 * business runs on.
 *
 * These pages are server components, so the formatting runs on Vercel rather
 * than in the browser, and Vercel runs in UTC. Leaving the time zone to the
 * runtime therefore did not just omit the time, it moved evening rows onto
 * the following day: a lead that arrived at 9:30 PM on the 21st rendered as
 * the 22nd, which is exactly when someone is trying to work out how quickly
 * they replied.
 */
const TZ = "America/New_York";

/** Date and time in Eastern, e.g. "Sep 21, 2026, 9:30 PM". */
export function easternDateTime(iso: string | null | undefined) {
  if (!iso) return "-";
  return new Date(iso).toLocaleString("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

/** Date only in Eastern, e.g. "Sep 21, 2026". */
export function easternDate(iso: string | null | undefined) {
  if (!iso) return "-";
  return new Date(iso).toLocaleDateString("en-US", {
    timeZone: TZ,
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
