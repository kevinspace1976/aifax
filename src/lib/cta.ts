/**
 * The buy-path buttons worth counting, in the order a visitor meets them.
 * Shared by the click recorder (/api/track rejects anything not listed, so
 * a scripted client cannot fill the table with junk) and by the Traffic
 * page, which uses the labels.
 */
export const CTA_LABELS: Record<string, string> = {
  header_new_number: "Header: Get New Number",
  header_port_number: "Header: Port My Number",
  page_new_number: "On page: Get a New Number",
  page_port_number: "On page: Port My Number",
  plan_subscribe: "Pricing: plan Subscribe",
  plan_checkout_new: "Plan chose: new number",
  plan_checkout_port: "Plan chose: port number",
  plan_contact_sales: "Pricing: Contact sales",
  keep_plan_order: "Keep your provider: plan Order",
  // Recorded by the portal, not by this site: a hook on portal.aifax.net
  // beacons these back carrying the click id we handed it in the URL.
  portal_order_now: "Portal: Order Now",
  portal_checkout: "Portal: reached checkout",
  portal_order_complete: "Portal: order placed"
};

export const CTA_NAMES = Object.keys(CTA_LABELS);

/**
 * The clicks that hand someone off to the WHMCS portal. Every one of these
 * links gets a click id appended so the portal can report back what the
 * same person did next.
 */
export const CHECKOUT_CTAS = [
  "header_new_number",
  "header_port_number",
  "page_new_number",
  "page_port_number",
  "plan_checkout_new",
  "plan_checkout_port",
  "keep_plan_order"
];

/** Steps the portal reports back, in the order a buyer meets them. */
export const PORTAL_CTAS = ["portal_order_now", "portal_checkout", "portal_order_complete"];

/**
 * The query parameter carrying the click id from this site to the portal.
 * The portal keeps it in sessionStorage for the rest of the visit, the same
 * way it already keeps the new-vs-port choice.
 */
export const CLICK_ID_PARAM = "aifax_cid";

/** True for the links that leave this site for the billing portal. */
export function isPortalUrl(href: string) {
  return href.startsWith("https://portal.aifax.net");
}
