/**
 * The public plan ladder, shared by the pricing page and the Home teaser.
 * Names, prices, and page allowances mirror the products configured in
 * WHMCS and Stripe: do not change them here without changing them there.
 * Checkout links come from env so the Stripe/WHMCS products can change
 * without a deploy.
 */
export type Plan = {
  name: string;
  price: string;
  annualPrice?: string;
  pages: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
  teaser: string[];
};

export const plans: Plan[] = [
  {
    name: "Lite",
    price: "$9.99",
    annualPrice: "$8.29",
    pages: "250 pages a month, send and receive",
    cta: "Subscribe",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#",
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
    annualPrice: "$24.89",
    pages: "500 pages a month, send and receive",
    cta: "Subscribe",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Everything in Lite",
      "AI summary and smart extraction on every fax (customizable)",
      "OCR and NLP document intelligence",
      "Dashboard access plus email summaries",
      "Practice-specific automation and prompt logic",
      "AI chatbot: up to 10 documents, 10 MB, 250 questions",
      "Complete onboarding: routing, user access, automation rules, porting, and delivery"
    ],
    teaser: ["Everything in Lite", "AI summary on every fax", "Chat with your faxes"]
  },
  {
    name: "Pro",
    price: "$44.99",
    annualPrice: "$37.34",
    pages: "1,000 pages a month, send and receive",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#",
    featured: true,
    features: [
      "Everything in Plus",
      "Double the page allowance for busier practices",
      "AI chatbot: up to 50 documents, 50 MB, 500 questions"
    ],
    teaser: ["Everything in Plus", "1,000 pages a month", "Larger AI chatbot"]
  },
  {
    name: "Enterprise",
    price: "$69.99",
    annualPrice: "$58.09",
    pages: "1,500 pages a month, send and receive",
    cta: "Subscribe",
    href: process.env.ENTERPRISE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Everything in Pro",
      "Highest page allowance for multi-provider groups",
      "AI chatbot: up to 100 documents, 100 MB, 1,000 questions"
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
