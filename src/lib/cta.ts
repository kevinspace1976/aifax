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
  plan_contact_sales: "Pricing: Contact sales"
};

export const CTA_NAMES = Object.keys(CTA_LABELS);

/**
 * The clicks that hand someone off to the WHMCS portal, which is as far as
 * this site can see them. Everything else is still browsing.
 */
export const CHECKOUT_CTAS = [
  "header_new_number",
  "header_port_number",
  "page_new_number",
  "page_port_number",
  "plan_checkout_new",
  "plan_checkout_port"
];
