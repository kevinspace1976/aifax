import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Check, ArrowRight, ShieldCheck, Zap, Headphones } from "lucide-react";

type Plan = {
  name: string;
  oldPrice?: string;
  price: string;
  period?: string;
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
    price: "$18.99",
    period: "/mo",
    volume: "Send 170 pages/month",
    summary: "Receive 170 AI summarized pages/month",
    cta: "Subscribe",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#",
  },
  {
    name: "Plus",
    oldPrice: "$44.99",
    price: "$24.99",
    period: "/mo",
    volume: "Send 275 pages/month",
    summary: "Receive 275 AI summarized pages/month",
    featured: true,
    cta: "Subscribe",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#",
  },
  {
    name: "Pro",
    oldPrice: "$69.99",
    price: "$49.99",
    period: "/mo",
    volume: "Send 500 pages/month",
    summary: "Receive 500 AI summarized pages/month",
    cta: "Subscribe",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#",
  },
  {
    name: "Corporate",
    price: "Custom",
    volume: "Customized monthly page volumes",
    summary: "Customized AI summarization and extraction",
    cta: "Contact Sales",
    href: process.env.CORPORATE_STRIPE_CHECKOUT_LINK ?? "#",
  },
];

const allFeatures = [
  "HIPAA, GLBA, SOX & PCI-DSS aligned workflows",
  "Instant summary notifications via email or text",
  "Customizable extraction and prompt logic",
  "Free API setup ($500 value)",
  "OCR and NLP document intelligence",
  "24/7 support",
];

const guarantees = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
    text: "End-to-end encryption with full compliance coverage.",
  },
  {
    icon: Zap,
    title: "Free API Setup",
    text: "$500 value included with every plan — no extra charge.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    text: "Dedicated support team available around the clock.",
  },
];

const faqs = [
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Yes. You can change your plan at any time. Upgrades take effect immediately, and downgrades apply at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial?",
    a: "We offer a guided demo and pilot program for enterprise teams. Contact our sales team to discuss a trial tailored to your use case.",
  },
  {
    q: "What happens if I exceed my page limit?",
    a: "We'll notify you before you hit your limit. Overage pages are billed at a per-page rate, or you can upgrade to the next tier for better value.",
  },
  {
    q: "Are there annual pricing discounts?",
    a: "Yes. Annual plans offer additional savings. Contact sales for custom annual pricing on Plus, Pro, and Corporate plans.",
  },
];

export default function PricingPage() {
  return (
    <main>
      <PageHero
        title="AI Plans & Pricing"
        description="Choose the plan that fits your document volume and scale confidently with enterprise-grade AI fax operations."
        kicker="Simple, Transparent Pricing"
      />

      {/* Plans Grid */}
      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col p-6 sm:p-7 ${
                plan.featured ? "card-gold" : "card"
              }`}
            >
              {plan.featured && (
                <span
                  className="badge-compliance absolute -top-3 left-1/2 -translate-x-1/2"
                >
                  Most Popular
                </span>
              )}

              <h2
                className="heading-sans text-2xl font-bold"
                style={{ color: "var(--warm-white)" }}
              >
                {plan.name}
              </h2>

              <div className="mt-4">
                {plan.oldPrice && (
                  <span
                    className="mr-2 text-sm line-through"
                    style={{ color: "var(--warm-muted)" }}
                  >
                    {plan.oldPrice}
                  </span>
                )}
                <span
                  className="heading-display text-3xl font-bold"
                  style={{ color: "var(--gold-300)" }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className="text-sm"
                    style={{ color: "var(--warm-muted)" }}
                  >
                    {plan.period}
                  </span>
                )}
              </div>

              <ul className="mt-6 flex-1 space-y-2.5">
                <li className="flex items-start gap-2 text-sm" style={{ color: "var(--warm-white)" }}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold-400)" }} />
                  <span>{plan.volume}</span>
                </li>
                <li className="flex items-start gap-2 text-sm" style={{ color: "var(--warm-white)" }}>
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold-400)" }} />
                  <span>{plan.summary}</span>
                </li>
                {allFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--warm-muted)" }}
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold-500)" }} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                target="_blank"
                rel="noreferrer"
                className={`mt-6 w-full justify-center ${
                  plan.featured ? "btn-primary" : "btn-secondary"
                }`}
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* Guarantees */}
      <section className="section-shell py-12">
        <div className="grid gap-5 sm:grid-cols-3">
          {guarantees.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 text-center sm:flex-col sm:items-center"
            >
              <div className="icon-circle shrink-0 sm:mx-auto">
                <item.icon className="h-5 w-5" style={{ color: "var(--gold-300)" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--warm-white)" }}
                >
                  {item.title}
                </p>
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--warm-muted)" }}
                >
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* Implementation support */}
      <section className="section-shell py-16 sm:py-20">
        <div className="card-raised p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h3
              className="heading-sans text-xl font-semibold"
              style={{ color: "var(--warm-white)" }}
            >
              Need implementation support?
            </h3>
            <p className="mt-2" style={{ color: "var(--warm-gray)" }}>
              Our team helps with migration, setup, integration mapping, and
              custom prompt strategy.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Link href="/contact" className="btn-primary">
              Talk to Sales
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/how-it-works" className="btn-secondary">
              View Onboarding Flow
            </Link>
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* FAQ */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">FAQ</p>
          <h2
            className="heading-display mt-3 text-2xl sm:text-3xl"
            style={{ color: "var(--warm-white)" }}
          >
            Pricing Questions
          </h2>
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="faq-item">
              <summary>{faq.q}</summary>
              <div className="faq-body">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
