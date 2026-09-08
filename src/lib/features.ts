/**
 * The single source of truth for AiFax's feature/benefit list, shown at
 * the bottom of every nurture email (src/lib/email-templates/nurture.ts)
 * and appended to every auto-drafted Gmail reply (src/lib/ai-draft.ts via
 * /api/contact), so the two never drift out of sync with each other.
 * Content is pulled directly from claims already made on the marketing
 * site (solutions/EHR-integration/pricing pages), nothing invented.
 */
export const FEATURE_SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "EHR & software integration",
    items: [
      "Fax-to-EHR integration with the platforms your practice already uses",
      "API-first architecture for custom integrations",
      "Routes into whichever workflow fits: API, interface, secure inbox, email, or assisted charting",
      "Forward fax summaries directly to your team"
    ]
  },
  {
    title: "Reading & routing",
    items: [
      "Real-time AI fax reading - identifies patient, sender, and document type the moment it arrives",
      "Automatic patient/chart matching (never guesses, flags unmatched faxes for staff review)",
      "AI-generated summary of every fax (results, referrals, follow-ups)",
      "Full original fax filed into the chart, not just a summary",
      "OCR + NLP that handles tables, embedded images, and handwriting",
      "24/7 zero-touch automation, nights and weekends included",
      "Real-time delivery to email and SMS",
      "Chat with your incoming faxes (ask questions across documents, available on paid tiers)",
      "Custom AI prompts/extraction logic per workflow or specialty"
    ]
  },
  {
    title: "Scale & cost",
    items: [
      "Scales from a solo practice to multi-site/enterprise with no new headcount",
      "Plans start at $9.99/month, a fraction of a typical fax line plus EHR integration cost",
      "Operational analytics: throughput, quality, turnaround tracking"
    ]
  },
  {
    title: "Compliance & security",
    items: ["HIPAA-compliant architecture, BAA signed electronically at signup", "Encryption in transit and at rest"]
  },
  {
    title: "Setup & flexibility",
    items: [
      "Keep your current fax number, get a new one, or port an existing number",
      "Guided onboarding, no hardware to install",
      "24/7 customer support"
    ]
  }
];

/**
 * boxed (default true): the bordered/shaded card used in the automated
 * nurture emails. Pass { boxed: false } for a plain, unboxed rendering
 * (still bold section titles and real bullet points) that reads like an
 * ordinary paragraph in a normal reply email, e.g. the auto-drafted Gmail
 * reply in /api/contact.
 */
export function featuresHtml(opts: { boxed?: boolean } = {}) {
  const boxed = opts.boxed ?? true;
  const sections = FEATURE_SECTIONS.map(
    (section) => `
      <p style="margin:16px 0 4px;font-size:14px;font-weight:bold;color:#1a1a2e">${section.title}</p>
      <ul style="margin:0;padding-left:20px;font-size:14px;color:#374151;line-height:1.6">
        ${section.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>`
  ).join("");
  const heading = `<p style="margin:0 0 4px;font-size:15px;font-weight:bold;color:#1a1a2e">Everything included with your AiFax plan</p>`;
  if (!boxed) {
    return `<div style="margin-top:20px">${heading}${sections}</div>`;
  }
  return `
    <div style="margin-top:28px;padding:16px 18px;border:1px solid #e5e7eb;border-radius:8px;background:#f9fafb">
      ${heading}
      ${sections}
    </div>`;
}

export function featuresText() {
  return FEATURE_SECTIONS.map(
    (section) => `${section.title}:\n${section.items.map((item) => `- ${item}`).join("\n")}`
  ).join("\n\n");
}
