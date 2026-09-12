/**
 * The public plan ladder, shared by the pricing page and the Home teaser.
 * Names, prices, and page allowances mirror the products configured in
 * WHMCS and Stripe: do not change them here without changing them there.
 * WHMCS bills monthly only, so only monthly prices are shown. Paid plans
 * have no href: their Subscribe button opens a port-or-new-number choice
 * (see SubscribeButton) that leads into the portal store.
 */
export type Plan = {
  name: string;
  price: string;
  pages: string;
  cta: string;
  href?: string;
  featured?: boolean;
  features: string[];
  teaser: string[];
};

export const plans: Plan[] = [
  {
    name: "Lite",
    price: "$9.99",
    pages: "250 pages a month, send and receive",
    cta: "Subscribe",
    features: [
      "Secure, HIPAA-compliant fax with a BAA at signup",
      "Port your existing fax number or get a new one",
      "Setup, fax routing, user access, and configuration included",
      "Instant access after signup",
      "No contract, cancel anytime",
      "24/7 support",
      "Additional pages $0.05 each"
    ],
    teaser: ["HIPAA-compliant fax, BAA at signup", "Port your number or get a new one", "Instant access, no contract"]
  },
  {
    name: "Plus",
    price: "$29.99",
    pages: "500 pages a month, send and receive",
    cta: "Subscribe",
    features: [
      "Everything in Lite",
      "AI summary and smart extraction on every fax (customizable)",
      "Chat with every fax you receive, unlimited",
      "OCR and NLP document intelligence",
      "Dashboard access plus email summaries",
      "Practice-specific automation and prompt logic",
      "Reference library: 10 documents, 10 MB per file, 250 questions a month",
      "Complete onboarding: routing, user access, automation rules, porting, and delivery"
    ],
    teaser: ["Everything in Lite", "AI summary on every fax", "Chat with your faxes"]
  },
  {
    name: "Pro",
    price: "$44.99",
    pages: "1,000 pages a month, send and receive",
    cta: "Subscribe",
    featured: true,
    features: [
      "Everything in Plus",
      "Double the page allowance for busier practices",
      "Reference library: 50 documents, 50 MB per file, 500 questions a month"
    ],
    teaser: ["Everything in Plus", "1,000 pages a month", "Larger reference library"]
  },
  {
    name: "Enterprise",
    price: "$69.99",
    pages: "1,500 pages a month, send and receive",
    cta: "Subscribe",
    features: [
      "Everything in Pro",
      "Highest page allowance for multi-provider groups",
      "Reference library: 100 documents, 100 MB per file, 1,000 questions a month"
    ],
    teaser: []
  },
  {
    name: "Corporate",
    price: "Custom",
    pages: "Custom page volumes",
    cta: "Contact sales",
    href: "/contact",
    features: [
      "Everything in Enterprise",
      "Enterprise scaling and custom volumes",
      "Fax chat and reference library tailored to your workflows",
      "API integration and advanced automation support",
      "Dedicated onboarding and priority support"
    ],
    teaser: []
  }
];

export const ADDITIONAL_PAGE_RATE = "$0.05";
