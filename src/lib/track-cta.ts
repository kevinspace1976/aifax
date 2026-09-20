/**
 * Records a click on a buy-path button (the header CTAs, the in-page
 * "Get a New Number"/"Port My Number" buttons, and the plan buttons on
 * /pricing) so the Traffic page can show how far a visitor gets before
 * they drop out.
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
  try {
    const body = JSON.stringify({
      cta,
      plan: plan ?? null,
      path: window.location.pathname
    });
    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      if (navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))) return;
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
}
