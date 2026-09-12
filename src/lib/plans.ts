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
      "OCR and NLP document intelligence",
      "Dashboard access plus email summaries",
      "Practice-specific automation and prompt logic",
      "AI chatbot: 250 questions a month, up to 10 stored documents, 10 MB max per file",
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
      "AI chatbot: 500 questions a month, up to 50 stored documents, 50 MB max per file"
    ],
    teaser: ["Everything in Plus", "1,000 pages a month", "Larger AI chatbot"]
  },
  {
    name: "Enterprise",
    price: "$69.99",
    pages: "1,500 pages a month, send and receive",
    cta: "Subscribe",
    features: [
      "Everything in Pro",
      "Highest page allowance for multi-provider groups",
      "AI chatbot: 1,000 questions a month, up to 100 stored documents, 100 MB max per file"
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
      "Chat assistant tailored to your workflows",
      "API integration and advanced automation support",
      "Dedicated onboarding and priority support"
    ],
    teaser: []
  }
];

export const ADDITIONAL_PAGE_RATE = "$0.05";
