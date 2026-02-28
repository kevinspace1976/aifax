import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { PricingPlansGrid } from "@/components/pricing-plans-grid";

type Plan = {
  name: string;
  price: string;
  annualPrice?: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};



const plans: Plan[] = [
  {
    name: "Lite",
    price: "$9.99",
    annualPrice: "$8.29",
    cta: "Subscribe",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "250 pages/month (send & receive)",
      "Secure HIPAA-aligned workflows",
      "No contract, cancel anytime",
      "Instant access after signup",
      "Port your existing fax number",
      "Setup, fax routing, user access, number porting, and configuration",
      "24/7 support",
      "Additional pages: $0.05 each"
    ]
  },
  {
    name: "Plus",
    price: "$29.99",
    annualPrice: "$24.89",
    featured: true,
    cta: "Subscribe",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "500 pages/month (send & receive)",
      "AI document summaries & smart extraction (customizable)",
      "Secure HIPAA-aligned workflows",
      "No contract, cancel anytime",
      "AI chatbot compares up to 10 documents, 10MB, 250 questions.",
      "Instant access after signup",
      "Dashboard access + email summaries",
      "Practice-specific automation & prompt logic",
      "Port your existing fax number",
      "OCR & NLP document intelligence",
      "Complete setup & onboarding including fax routing, user access, automation rules, number porting, and delivery configuration",
      "24/7 support",
      "Additional pages: $0.05 each"
    ]
  },
  {
    name: "Pro",
    price: "$59.99",
    annualPrice: "$49.79",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "1000 pages/month (send & receive)",
      "AI document summaries & smart extraction (customizable)",
      "Secure HIPAA-aligned workflows",
      "No contract, cancel anytime",
      "AI chatbot compares up to 50 documents, 50MB, 500 questions.",
      "Instant access after signup",
      "Dashboard access + email summaries",
      "Practice-specific automation & prompt logic",
      "Port your existing fax number",
      "OCR & NLP document intelligence",
      "Complete setup & onboarding including fax routing, user access, automation rules, number porting, and delivery configuration",
      "24/7 support",
      "Additional pages: $0.05 each"
    ]
  },
  {
    name: "Enterprise",
    price: "$89.99",
    annualPrice: "$74.69",
    cta: "Subscribe",
    href: process.env.ENTERPRISE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "1500 pages/month (send & receive)",
      "AI document summaries & smart extraction (customizable)",
      "Secure HIPAA-aligned workflows",
      "No contract, cancel anytime",
      "AI chatbot compares up to 100 documents, 100MB, 1000 questions.",
      "Instant access after signup",
      "Dashboard access + email summaries",
      "Practice-specific automation & prompt logic",
      "Port your existing fax number",
      "OCR & NLP document intelligence",
      "Complete setup & onboarding including fax routing, user access, automation rules, number porting, and delivery configuration",
      "24/7 support",
      "Additional pages: $0.05 each"
    ]
  },
  {
    name: "Corporate",
    price: "Contact Sales",
    cta: "Contact Us",
    href: "/contact",
    features: [
      "Custom enterprise page volumes",
      "Enterprise scaling",
      "AI summaries, extraction & smart workflow automation",
      "Secure HIPAA-aligned workflows & dashboard access",
      "Chat assistant tailored to your needs",
      "API integration & advanced automation support",
      "OCR/NLP document intelligence",
      "Dedicated onboarding & priority support"
    ]
  }
];

export default function PricingPage() {
  return (
    <main>
      <PageHero
        title="AI Plans & Pricing"
        description="Choose the plan that fits your document volume and scale confidently with enterprise-grade AI fax operations."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="-mt-8 mb-3 flex justify-center">
          <p className="kicker">MODERNIZE YOUR FAX WORKFLOW WITH AI AUTOMATION. SAVE TIME, REDUCE COSTS, AND STAY COMPLIANT.</p>
        </div>
        <PricingPlansGrid plans={plans} />

        <div className="mt-8 card-surface p-6">
          <h3 className="text-xl font-semibold text-white">Need implementation support?</h3>
          <p className="mt-2 text-slate-300">Our team can help with migration, setup, integration mapping, and custom prompt strategy.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              Talk to Sales
            </Link>
            <Link href="/how-it-works" className="btn-secondary">
              View Onboarding Flow
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
