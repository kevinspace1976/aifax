import Link from "next/link";
import { PageHero } from "@/components/page-hero";

type Plan = {
  name: string;
  oldPrice?: string;
  price: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

const plans: Plan[] = [
  {
    name: "Lite",
    oldPrice: "$36.99",
    price: "$18.99/mo",
    cta: "Subscribe",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Send & Receive 1000 pages/month",
      "Customized AI summarization and extraction",
      "Instant dashboard summary and email summary notifications (dashboard option)",
      "HIPAA aligned workflows",
      "Chat bot - Compare up to 10 uploaded documents. Feature included at no additional charge",
      "Customizable extraction and prompt logic to fit your specialty",
      "Free API setup ($500 value)",
      "Instant fax, ai and dashboard access after signup",
      "Port your current fax number",
      "OCR and NLP document intelligence",
      "24/7 ticket support"
    ]
  },
  {
    name: "Plus",
    oldPrice: "$44.99",
    price: "$24.99/mo",
    featured: true,
    cta: "Subscribe",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Send & Receive 2000 pages/month",
      "Customized AI summarization and extraction",
      "Instant dashboard summary and email summary notifications (dashboard option)",
      "HIPAA aligned workflows",
      "Chat bot - Compare up to 20 uploaded documents. Feature included at no additional charge",
      "Customizable extraction and prompt logic to fit your specialty",
      "Free API setup ($500 value)",
      "Instant fax, ai and dashboard access after signup",
      "Port your current fax number",
      "OCR and NLP document intelligence",
      "24/7 ticket support"
    ]
  },
  {
    name: "Pro",
    oldPrice: "$69.99",
    price: "$49.99/mo",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Send & Receive 4000 pages/month",
      "Customized AI summarization and extraction",
      "Instant dashboard summary and email summary notifications (dashboard option)",
      "HIPAA aligned workflows",
      "Chat bot - Compare up to 40 uploaded documents. Feature included at no additional charge",
      "Customizable extraction and prompt logic to fit your specialty",
      "Free API setup ($500 value)",
      "Instant fax, ai and dashboard access after signup",
      "Port your current fax number",
      "OCR and NLP document intelligence",
      "24/7 ticket support"
    ]
  },
  {
    name: "Enterprise",
    price: "$99.00/mo",
    cta: "Subscribe",
    href: process.env.ENTERPRISE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Send & Receive 4000 pages/month",
      "Customized AI summarization and extraction",
      "Instant dashboard summary and email summary notifications (dashboard option)",
      "HIPAA aligned workflows",
      "Chat bot - Compare up to 50 uploaded documents. Feature included at no additional charge",
      "Customizable extraction and prompt logic to fit your specialty",
      "Free API setup ($500 value)",
      "Instant fax, ai and dashboard access after signup",
      "Port your current fax number",
      "OCR and NLP document intelligence",
      "24/7 ticket support"
    ]
  },
  {
    name: "Corporate",
    price: "Contact Sales",
    cta: "Contact Us",
    href: process.env.CORPORATE_STRIPE_CHECKOUT_LINK ?? "#",
    features: [
      "Customized monthly page volumes",
      "Customized AI summarization and extraction",
      "Instant dashboard summary and email summary notifications (dashboard option)",
      "Customized monthly page volumes",
      "Chat bot - Customized need for uploaded documents. Feature included at no additional charge",
      "HIPAA aligned workflows",
      "Instant summary notifications via email or text",
      "Customizable extraction and prompt logic",
      "Free API setup ($500 value)",
      "OCR and NLP document intelligence",
      "24/7 ticket support"
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
                {plan.oldPrice ? <span className="mr-2 line-through">{plan.oldPrice}</span> : null}
                <span className="text-3xl font-semibold text-emerald-300">{plan.price}</span>
              </p>

              <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <a href={plan.href} target="_blank" rel="noreferrer" className="btn-primary mt-6">
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
