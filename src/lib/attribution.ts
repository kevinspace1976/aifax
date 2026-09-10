import { createHash, randomUUID } from "crypto";
import { BlockList, isIP } from "net";
import { cookies, headers } from "next/headers";

/**
 * Everything needed to trace a lead back to the ad/search result/link that
 * actually brought them to the site, so the admin page and the Facebook
 * Custom Audience are both meaningful instead of a wall of anonymous rows.
 */
export type Attribution = {
  sourcePath: string;
  referrer: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  utmContent: string | null;
  utmTerm: string | null;
  fbclid: string | null;
  gclid: string | null;
};

export const SESSION_COOKIE = "aifax_sid";
export const ATTRIBUTION_COOKIE = "aifax_attr";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export function parseAttributionFromUrl(url: string, referrer: string | null): Attribution {
  const parsed = (() => {
    try {
      return new URL(url);
    } catch {
      return null;
    }
  })();
  const params = parsed?.searchParams;

  return {
    sourcePath: parsed ? parsed.pathname : "/",
    referrer: referrer || null,
    utmSource: params?.get("utm_source") ?? null,
    utmMedium: params?.get("utm_medium") ?? null,
    utmCampaign: params?.get("utm_campaign") ?? null,
    utmContent: params?.get("utm_content") ?? null,
    utmTerm: params?.get("utm_term") ?? null,
    // fbclid: the id Facebook appends to every ad click. Its presence alone
    // is proof-positive the visit came from a Facebook/Instagram ad, even
    // if UTM params were left off the ad's destination URL.
    fbclid: params?.get("fbclid") ?? null,
    gclid: params?.get("gclid") ?? null
  };
}

/** True once any UTM param is present, so a plain internal link doesn't overwrite it. */
export function hasAttributionSignal(a: Attribution) {
  return Boolean(a.utmSource || a.utmMedium || a.utmCampaign || a.fbclid || a.gclid);
}

/**
 * Never store a raw IP. This is a one-way hash (IP + a server-only salt,
 * per UTC day so the hash itself rotates daily) - enough to dedupe repeat
 * visits or flag obvious form-spam bursts from one address, without
 * keeping anything that identifies a real person or device long-term.
 */
export function hashIp(ip: string | null) {
  if (!ip) return null;
  const salt = process.env.IP_HASH_SALT || "aifax-dev-salt-change-me";
  const day = new Date().toISOString().slice(0, 10);
  return createHash("sha256").update(`${salt}:${day}:${ip}`).digest("hex");
}

/**
 * Visitor location as resolved by Vercel's edge from the request IP. The
 * city header is URL-encoded (e.g. "Fort%20Lauderdale"). Absent on local
 * dev, so every field is nullable. This is what the Traffic page shows
 * instead of a raw address, in line with the privacy policy (IPs are only
 * ever stored hashed).
 */
export function clientGeo(h: Headers) {
  const decode = (v: string | null) => {
    if (!v) return null;
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };
  return {
    city: decode(h.get("x-vercel-ip-city")),
    region: decode(h.get("x-vercel-ip-country-region")),
    country: decode(h.get("x-vercel-ip-country"))
  };
}

export function clientIp(h: Headers) {
  // Vercel sets x-forwarded-for; take the first (client) hop.
  const fwd = h.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return h.get("x-real-ip");
}

/**
 * IPs that should never be logged as a visit, e.g. the site owner's own
 * connection. Comma-separated in EXCLUDED_VISITOR_IPS. Each entry is a
 * single address or a CIDR block (e.g. 2600:1700:6070:1ac0::/64), because
 * a home connection usually has an IPv4 address plus an IPv6 prefix whose
 * last 64 bits change per device. A residential IP can change over time,
 * so this may need updating later, it's config, not a permanent fix,
 * which is why it lives in an env var rather than hardcoded.
 */
export function isExcludedIp(ip: string | null) {
  if (!ip) return false;
  const raw = process.env.EXCLUDED_VISITOR_IPS;
  if (!raw) return false;
  const ipFamily = isIP(ip);
  if (!ipFamily) return false;
  const list = new BlockList();
  for (const entry of raw.split(",").map((s) => s.trim()).filter(Boolean)) {
    const [addr, bits] = entry.split("/");
    const family = isIP(addr ?? "");
    if (!family || !addr) continue;
    const type = family === 6 ? "ipv6" : "ipv4";
    try {
      if (bits) list.addSubnet(addr, Number(bits), type);
      else list.addAddress(addr, type);
    } catch {
      // a malformed entry must never break visit logging
    }
  }
  return list.check(ip, ipFamily === 6 ? "ipv6" : "ipv4");
}

export async function currentSessionId() {
  const jar = await cookies();
  return jar.get(SESSION_COOKIE)?.value ?? randomUUID();
}

/** Reads the first-touch attribution captured on this visitor's first page load, if any. */
export async function readStoredAttribution(): Promise<Attribution | null> {
  const jar = await cookies();
  const raw = jar.get(ATTRIBUTION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as Attribution;
  } catch {
    return null;
  }
}

export async function requestIp() {
  const h = await headers();
  return clientIp(h);
}
