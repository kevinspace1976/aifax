import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { ADDITIONAL_PAGE_RATE, keepPlans } from "@/lib/plans";
import { keepPlanUrl, supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Keep Your Fax Provider, Add AI | AiFax",
  description:
    "Keep your current fax company and fax number. Forward your incoming faxes to AiFax and get an AI summary of every one, plus search and chat. HIPAA-compliant, plans from $29.99 a month, no contract.",
  alternates: { canonical: "/keep-your-provider" }
};

const steps = [
  {
    n: "1",
    t: "Pick a plan",
    b: "Order in a few minutes. Your forwarding address is emailed to you as soon as your account is ready."
  },
  {
    n: "2",
    t: "Forward your faxes",
    b: "In your current fax company's settings, add your AiFax forwarding address to the emails your faxes already go to. Nothing else changes."
  },
  {
    n: "3",
    t: "Read the summary",
    b: "Every fax that arrives is read by AI, summarized, and ready to search and chat with in your AiFax dashboard."
  }
];

const faqs = [
  {
    q: "Do we change fax companies or fax numbers?",
    a: "No. Your fax company, your fax number, and your bill with them all stay the same. AiFax only receives a copy of each fax by email."
  },
  {
    q: "Can we send faxes from AiFax on this plan?",
    a: "No. This plan is for incoming faxes. Keep sending the way you do now. If you later want AiFax to be your fax company too, our full plans send and receive."
  },
  {
    q: "What counts as a page?",
    a: `Every page of every fax you forward. If you go over your plan in a month, extra pages are ${ADDITIONAL_PAGE_RATE} each on your next bill.`
  },
  {
    q: "Is it HIPAA compliant?",
    a: "Yes. Encrypted in transit, access restricted to your own users, and covered by a Business Associate Agreement."
  },
  {
    q: "Is there a contract?",
    a: "No. Month to month, no setup fee, cancel any time."
  }
];

export default function KeepYourProviderPage() {
  return (
    <main>
      <section className="border-b border-slate-200">
        <div className="section-shell py-14 sm:py-16">
          <p className="kicker">Keep your fax provider</p>
          <h1 className="mt-4 max-w-4xl text-4xl text-slate-900 sm:text-5xl">
            Keep your fax company. Add the AI.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
            Happy with your fax number and your fax company? Keep both. Forward your incoming faxes to AiFax and every
            one arrives read, summarized, and ready to search and chat with. Plans from $29.99 a month, no contract.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#plans" className="btn-primary">
              See plans
            </a>
            <Link href="/switch" className="btn-secondary">
              Replace my fax company instead
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Receive and summarize only. You keep sending faxes the way you do today.
          </p>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">How it works, in three steps</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <article key={s.n} className="card-surface p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-base font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl text-slate-900">{s.t}</h3>
                <p className="mt-2 text-slate-700">{s.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="scroll-mt-24 py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Plans by pages received a month</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Count the incoming fax pages you got last month. Extra pages are {ADDITIONAL_PAGE_RATE} each.
          </p>
          <div className="mt-8 grid items-stretch gap-5 md:grid-cols-3">
            {keepPlans.map((plan) => (
              <article
                key={plan.name}
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 ${
                  plan.featured ? "border-2 border-orange-500" : "border-slate-200"
                }`}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                    Most practices
                  </span>
                ) : null}
                <h3 className="text-xl text-slate-900">{plan.name}</h3>
                <p className="mt-1 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">{plan.price}</span>
                  <span className="text-slate-500">/month</span>
                </p>
                <p className="text-sm text-slate-500">{plan.pages}</p>
                <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <CtaLink
                  href={keepPlanUrl(plan.pid)}
                  cta="keep_plan_order"
                  plan={`Keep ${plan.name}`}
                  className={`${plan.featured ? "btn-primary" : "btn-secondary"} mt-6`}
                >
                  Order {plan.name}
                </CtaLink>
              </article>
            ))}
          </div>
          <p className="mt-5 text-sm text-slate-500">All plans month to month. No setup fee.</p>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          <div>
            <h2 className="text-3xl text-slate-900 sm:text-4xl">Questions practices ask first</h2>
            <p className="mt-5 text-lg text-slate-700">
              Not sure your fax company can forward by email? Write to{" "}
              <a className="font-semibold text-orange-600 underline" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>{" "}
              with its name and we will reply with the exact setting.
            </p>
            <p className="mt-6">
              <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                Compare with our full fax plans
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
          <div>
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-t border-slate-200 py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-bold text-slate-900">
                  {faq.q}
                  <span className="text-slate-400 transition group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="mt-2 text-slate-700">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
