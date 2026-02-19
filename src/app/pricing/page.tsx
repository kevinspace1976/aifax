import Link from "next/link";
import { PageHero } from "@/components/page-hero";

type Plan = {
  name: string;
  oldPrice?: string;
  price: string;
  volume: string;
  summary: string;
  featured?: boolean;
  cta: string;
  href: string;
};

const plans: Plan[] = [
  {
    name: "Lite",
    oldPrice: "$36.99",
    price: "$18.99/mo",
    volume: "Send 170 pages/month",
    summary: "Receive 170 AI summarized pages/month",
    cta: "Subscribe",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#"
  },
  {
    name: "Plus",
    oldPrice: "$44.99",
    price: "$24.99/mo",
    volume: "Send 275 pages/month",
    summary: "Receive 275 AI summarized pages/month",
    featured: true,
    cta: "Subscribe",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#"
  },
  {
    name: "Pro",
    oldPrice: "$69.99",
    price: "$49.99/mo",
    volume: "Send 500 pages/month",
    summary: "Receive 500 AI summarized pages/month",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#"
  },
  {
    name: "Corporate",
    price: "Contact Sales",
    volume: "Customized monthly page volumes",
    summary: "Customized AI summarization and extraction",
    cta: "Contact Us",
    href: process.env.CORPORATE_STRIPE_CHECKOUT_LINK ?? "#"
  }
];

const features = [
  "HIPAA, GLBA, SOX & PCI-DSS aligned workflows",
  "Instant summary notifications via email or text",
  "Customizable extraction and prompt logic",
  "Free API setup ($500 value)",
  "OCR and NLP document intelligence",
  "24/7 support"
];

export default function PricingPage() {
  return (
    <main>
      <PageHero
        title="AI Plans & Pricing"
        description="Choose the plan that fits your document volume and scale confidently with enterprise-grade AI fax operations."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl border p-6 ${
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

              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                <li>• {plan.volume}</li>
                <li>• {plan.summary}</li>
                {features.map((feature) => (
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
