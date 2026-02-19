import { PageHero } from "@/components/page-hero";

const plans = [
  {
    name: "Lite",
    oldPrice: "$36.99",
    price: "$18.99",
    pages: "Send 170 pages/month",
    summary: "Receive 170 summarized pages/month",
    href: process.env.LITE_STRIPE_CHECKOUT_LINK ?? "#"
  },
  {
    name: "Plus",
    oldPrice: "$44.99",
    price: "$24.99",
    pages: "Send 275 pages/month",
    summary: "Receive 275 summarized pages/month",
    href: process.env.PLUS_STRIPE_CHECKOUT_LINK ?? "#"
  },
  {
    name: "Pro",
    oldPrice: "$69.99",
    price: "$49.99",
    pages: "Send 500 pages/month",
    summary: "Receive 500 summarized pages/month",
    href: process.env.PRO_STRIPE_CHECKOUT_LINK ?? "#"
  },
  {
    name: "Corporate",
    oldPrice: "",
    price: "Contact Sales",
    pages: "Customized page volumes/month",
    summary: "Customized summarized page volumes/month",
    href: process.env.CORPORATE_STRIPE_CHECKOUT_LINK ?? "#"
  }
];

const sharedFeatures = [
  "HIPAA, GLBA, SOX & PCI-DSS compliant",
  "Instant AI summary notifications via email or text",
  "Customizable extraction",
  "Free API setup ($500 value)",
  "Free document reader",
  "OCR + NLP extraction technology",
  "24/7 support"
];

export default function PricingPage() {
  return (
    <main>
      <PageHero
        title="AI Plans & Pricing"
        description="Select your AI summary plan and launch faster with secure fax automation."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article key={plan.name} className="rounded-2xl border border-white/10 bg-slate-900 p-6">
              <h2 className="text-3xl font-semibold">{plan.name}</h2>
              <p className="mt-4 text-slate-300">
                {plan.oldPrice ? <span className="mr-2 line-through">{plan.oldPrice}</span> : null}
                <span className="text-3xl font-semibold text-emerald-300">{plan.price}</span>
                <span className="ml-1 text-sm text-slate-400">per month</span>
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-300">
                <li>{plan.pages}</li>
                <li>{plan.summary}</li>
                {sharedFeatures.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>
              <a
                href={plan.href}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block rounded-full bg-orange-500 px-5 py-2 font-semibold text-white hover:bg-orange-400"
              >
                Subscribe
              </a>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
