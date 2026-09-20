import { CLICK_ID_PARAM, isPortalUrl } from "@/lib/cta";

/**
 * A per-click id. It is sent with the click and, for the links that leave
 * for the billing portal, appended to the outgoing URL, so when the portal
 * reports back that the same person pressed Order Now or placed an order,
 * that step joins to the click that sent them there. Without it the portal
 * is a separate island: it has no access to this site's session cookie,
 * which is host-only for www.aifax.net.
 */
function newClickId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {
    // randomUUID needs a secure context; fall through
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
}

/**
 * Records a click on a buy-path button (the header CTAs, the in-page
 * "Get a New Number"/"Port My Number" buttons, and the plan buttons on
 * /pricing) so the Traffic page can show how far a visitor gets before
 * they drop out. Returns the click id.
 *
 * Every one of these buttons navigates away, most of them to the WHMCS
 * portal on another domain, so the request has to outlive the page.
 * sendBeacon is queued by the browser and delivered after unload, which a
 * plain fetch is not guaranteed to be. Same-origin, so the visit session
 * cookie rides along and the click ties back to the rest of the session.
 *
 * Never throws and never blocks the navigation: a tracking failure is not
 * a reason to stop someone reaching checkout.
 */
export function trackCta(cta: string, plan?: string) {
  const clickId = newClickId();
  try {
    const body = JSON.stringify({
      cta,
      plan: plan ?? null,
      path: window.location.pathname,
      cid: clickId
    });
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      if (navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))) {
        return clickId;
      }
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    }).catch(() => {});
  } catch {
    // never let click tracking surface to the visitor
  }
  return clickId;
}

/**
 * The href to actually navigate to: portal links carry the click id so the
 * portal can report the rest of the journey back. Anything else is
 * unchanged. Returns the original href if the URL cannot be parsed, so a
 * bad value can never stop the navigation.
 */
export function hrefWithClickId(href: string, clickId: string) {
  if (!isPortalUrl(href)) return href;
  try {
    const url = new URL(href);
    url.searchParams.set(CLICK_ID_PARAM, clickId);
    return url.toString();
  } catch {
    return href;
  }
}
