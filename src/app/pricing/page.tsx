import Link from "next/link";
import { PageHero } from "@/components/page-hero";

type Plan = {
  name: string;
  price: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};



const plans: Plan[] = [
  {
    name: "Plus",
    price: "$29.99",
    featured: true,
    cta: "Subscribe",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "500 pages/month (send & receive)",
      "Secure HIPAA-aligned workflows",
      "Instant setup & access after signup",
      "Dashboard access + email summaries",
      "Port your existing fax number",
      "AI document summaries & smart extraction (customizable)",
      "OCR & NLP document intelligence",
      "Specialty-specific automation & prompt logic",
      "AI chatbot to compare up to 10 documents",
      "Free API setup ($500 value)",
      "24/7 support",
      "Additional pages: $0.05 each"
    ]
  },
  {
    name: "Pro",
    price: "$59.99",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "1000 pages/month (send & receive)",
      "Secure HIPAA-aligned workflows",
      "Instant setup & access after signup",
      "Dashboard access + email summaries",
      "Port your existing fax number",
      "AI document summaries & smart extraction (customizable)",
      "OCR & NLP document intelligence",
      "Specialty-specific automation & prompt logic",
      "AI chatbot to compare up to 10 documents",
      "Free API setup ($500 value)",
      "24/7 support",
      "Additional pages: $0.05 each"
    ]
  },
  {
    name: "Enterprise",
    price: "$89.99",
    cta: "Subscribe",
    href: process.env.ENTERPRISE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "1500 pages/month (send & receive)",
      "Secure HIPAA-aligned workflows",
      "Instant setup & access after signup",
      "Dashboard access + email summaries",
      "Port your existing fax number",
      "AI document summaries & smart extraction (customizable)",
      "OCR & NLP document intelligence",
      "Specialty-specific automation & prompt logic",
      "AI chatbot to compare up to 10 documents",
      "Free API setup ($500 value)",
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
        <div className="mb-3 flex justify-center">
          <p className="kicker">MODERNIZE YOUR FAX WORKFLOW WITH AI AUTOMATION. SAVE TIME, REDUCE COSTS, AND STAY COMPLIANT.</p>
        </div>
        <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                plan.featured ? "border-orange-400 bg-slate-900" : "border-white/10 bg-slate-900/70"
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              ) : null}

              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-3 text-slate-300">
                                <span className="text-3xl font-semibold text-emerald-300">{plan.price}</span>
              </p>

              <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <a href={plan.href} target={plan.name === "Corporate" ? undefined : "_blank"} rel={plan.name === "Corporate" ? undefined : "noreferrer"} className="btn-primary mt-6">
                {plan.cta}
              </a>
            </article>
          ))}
        </div>

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
