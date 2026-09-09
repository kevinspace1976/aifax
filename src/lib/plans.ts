/**
 * The public plan ladder, shared by the pricing page and the Home teaser.
 * Priced by pages a month, sending and receiving combined. Checkout links
 * come from env so the Stripe/WHMCS products can change without a deploy.
 *
 * Group has no checkout link yet: until GROUP_STRIPE_CHECKOUT_LINK is set
 * it sends the visitor to the contact page instead of a dead "#".
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

const groupLink = process.env.GROUP_STRIPE_CHECKOUT_LINK;

export const plans: Plan[] = [
  {
    name: "Lite",
    price: "$9.99",
    annualPrice: "$8.29",
    pages: "250 pages a month, send and receive",
    cta: "Subscribe",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Keep or port your number",
      "AI summary of every fax",
      "Email delivery of fax and summary",
      "HIPAA-compliant, BAA signed at signup",
      "24/7 support"
    ],
    teaser: ["Keep or port your number", "AI summary of every fax", "HIPAA, BAA at signup"]
  },
  {
    name: "Practice",
    price: "$44.99",
    annualPrice: "$37.34",
    pages: "1,000 pages a month",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#",
    featured: true,
    features: [
      "Everything in Lite",
      "Patient matching against your patient list",
      "Summaries to up to 3 addresses",
      "Custom AI prompt per practice",
      "Chat with any fax, up to 50 documents"
    ],
    teaser: ["Everything in Lite", "Patient matching", "Summaries to 3 addresses"]
  },
  {
    name: "Group",
    price: "$119.99",
    annualPrice: "$99.59",
    pages: "3,000 pages a month",
    cta: groupLink ? "Subscribe" : "Talk to us",
    href: groupLink ?? "/contact",
    features: [
      "Everything in Practice",
      "Multiple providers and sites, one platform",
      "Priority onboarding and porting",
      "Chat with any fax, up to 100 documents",
      "Operational analytics"
    ],
    teaser: ["Everything in Practice", "Multi-provider, multi-site", "Priority onboarding"]
  },
  {
    name: "Corporate",
    price: "Custom",
    pages: "Custom page volumes",
    cta: "Contact us",
    href: "/contact",
    features: [
      "Everything in Group",
      "API integration and advanced automation",
      "Dedicated onboarding",
      "Custom extraction logic per workflow"
    ],
    teaser: []
  }
];

export const ADDITIONAL_PAGE_RATE = "$0.05";
