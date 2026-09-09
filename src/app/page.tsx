import Link from "next/link";
import { ArrowRight, CheckCircle2, X } from "lucide-react";
import { DemoVideo } from "@/components/demo-video";
import { SummaryCard } from "@/components/summary-card";
import { plans } from "@/lib/plans";
import { phone, sharedCtas } from "@/lib/site";

const stops = [
  {
    was: "Open and read every fax",
    title: "Read on arrival",
    body: "Every page is read by AI the moment it lands, 24/7. Staff review a summary instead of a stack."
  },
  {
    was: "Figure out who it belongs to",
    title: "Matched to the patient",
    body: "Name and date of birth are pulled from the document and matched against your patient list. Never guessed: anything uncertain is flagged for a person."
  },
  {
    was: "Download, rename, upload to the chart",
    title: "Ready for the chart",
    body: "The fax, its summary, and the patient label arrive in your email and dashboard. With EHR integration, it goes into the chart as directly as your EHR allows."
  }
];

const steps = [
  {
    title: "A fax arrives",
    body: "On your existing number, ported to us, or on a new one. Your line never goes down during the port."
  },
  {
    title: "AI reads and matches",
    body: "OCR and language models read every page, identify the patient and document type, and write a summary to your prompt."
  },
  {
    title: "It is in your workflow",
    body: "Fax PDF and summary emailed to up to three addresses, in your dashboard, and routed into your EHR where the EHR allows."
  }
];

const ehrChecks = [
  "Patient matched by name and date of birth against your patient list",
  "Uncertain matches go to a review queue, never into a chart",
  "Discovery with your EHR vendor handled by us, documented in writing",
  "No printing, no scanning, no second patient list to maintain"
];

const firstWeek = [
  { when: "Day 0", title: "Sign up and sign the BAA", body: "Pick a new number and fax today, or start your port. Your current line stays live." },
  { when: "Day 1", title: "First AI summary in your inbox", body: "Every fax arrives as a PDF with its summary, patient name, and date of birth. Tune the prompt to your practice." },
  { when: "Week 1 to 2", title: "Port completes, no downtime", body: "Carriers set the timeline. We file, track, and confirm the moment it lands." },
  { when: "Ongoing", title: "Patient matching and EHR discovery", body: "Load your patient list and faxes arrive matched. If you want chart filing, discovery with your EHR vendor starts in writing." }
];

const faqs = [
  {
    q: "Can I keep my fax number?",
    a: "Yes. We file the port with your current provider; your line stays live until the switch completes. Or take a new number and be faxing today."
  },
  {
    q: "Is it HIPAA compliant?",
    a: "Yes. Encryption in transit and at rest, and a Business Associate Agreement you sign electronically at signup, before any patient document flows."
  },
  {
    q: "Does it work with my EHR?",
    a: "We integrate with what your EHR exposes. Discovery happens in writing first, so you know the exact filing workflow before we build."
  },
  {
    q: "What if a fax has no patient name or date of birth?",
    a: "It is still delivered and summarized, and flagged for your staff to route. Nothing is ever guessed into a chart."
  },
  {
    q: "Is there a contract?",
    a: "No. Plans are month to month. EHR integration is a separate, quoted project."
  }
];

function Check({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-slate-700">
      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
      <span>{children}</span>
    </li>
  );
}

export default function Home() {
  const teaserPlans = plans.filter((plan) => plan.teaser.length > 0);

  return (
    <main>
      {/* Hero */}
      <section className="section-shell grid gap-10 py-12 sm:py-14 lg:grid-cols-[minmax(0,1fr)_520px] lg:items-start lg:gap-16">
        <div className="min-w-0">
          <div className="mb-9 max-w-xl border-b border-slate-200 pb-7">
            <p className="text-2xl text-slate-900 sm:text-[26px]" style={{ fontFamily: "var(--font-display)", fontWeight: 700, letterSpacing: "-0.02em" }}>
              Fax to EHR. EHR to fax. AI in the middle.
            </p>
            <p className="mt-2 text-slate-600">
              Inbound faxes read, matched to the patient, and filed toward the chart. Outbound faxes sent from your
              inbox. Built for physician practices and businesses that depend on fax for critical workflows: legal,
              insurance, and back-office operations.
            </p>
          </div>
          <p className="kicker text-base">AI fax for medical practices</p>
          <h1 className="mt-5 text-4xl text-slate-900 sm:text-5xl lg:text-[54px] lg:font-extrabold">
            Every fax read, matched to the patient, and ready for the chart.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-700 sm:text-xl">
            AiFax reads each incoming fax the moment it arrives, pulls the patient name and date of birth, summarizes
            what is inside, and routes it into your EHR workflow. Keep your fax number.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={sharedCtas.primary.href} className="btn-primary">
              {sharedCtas.primary.label}
            </a>
            <a href={sharedCtas.secondary.href} className="btn-secondary">
              {sharedCtas.secondary.label}
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            From $9.99/month &middot; HIPAA-compliant, BAA signed at signup &middot; No contract &middot; Live within a day
            while your number ports
          </p>
        </div>
        <div className="flex min-w-0 flex-col gap-4">
          <SummaryCard />
          <DemoVideo />
        </div>
      </section>

      {/* What staff stop doing */}
      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-slate-900 sm:text-4xl">Your fax inbox should not be a second medical-record system.</h2>
            <p className="mt-4 text-lg text-slate-700">
              Every incoming result, referral, and ER record goes through the same manual chain before a provider can use
              it. AiFax removes the chain.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {stops.map((item) => (
              <article key={item.title} className="card-surface p-7">
                <p className="flex items-center gap-2 text-sm text-slate-500">
                  <X className="h-4 w-4 flex-none" aria-hidden="true" />
                  <span className="line-through">{item.was}</span>
                </p>
                <h3 className="mt-3 text-xl text-slate-900">{item.title}</h3>
                <p className="mt-2 text-slate-700">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Three steps */}
      <section className="section-shell py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="max-w-lg text-3xl text-slate-900 sm:text-4xl">Three steps. None of them yours.</h2>
          <Link href="/how-it-works" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-orange-500">
            See how it works <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-9 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step.title}>
              <p className="kicker">Step {index + 1}</p>
              <h3 className="mt-2 text-xl text-slate-900">{step.title}</h3>
              <p className="mt-2 text-slate-700">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EHR */}
      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <h2 className="text-3xl text-slate-900 sm:text-4xl">Works with the EHR you already use.</h2>
            <p className="mt-4 text-lg text-slate-700">
              Every EHR exposes different interfaces. We map the most direct path yours allows, in writing, before we
              build anything.
            </p>
            <p className="mt-3 text-slate-700">
              Where your EHR lets us, the whole fax files into the patient&apos;s chart automatically. Where it does not,
              your staff file it in two clicks from a document we have already matched, named, and prepared. Either way
              you keep your EHR and your fax number.
            </p>
            <Link href="/ehr-integration" className="btn-secondary mt-6">
              See EHR integration
            </Link>
          </div>
          <ul className="card-surface flex flex-col gap-3.5 p-7">
            {ehrChecks.map((line) => (
              <Check key={line}>{line}</Check>
            ))}
          </ul>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="section-shell py-16 sm:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Simple pricing by pages a month.</h2>
          <Link href="/pricing" className="inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-orange-500">
            See all plans <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {teaserPlans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-2xl border bg-white p-7 ${plan.featured ? "border-2 border-orange-500" : "border-slate-200"}`}
            >
              {plan.featured ? (
                <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                  Most practices
                </span>
              ) : null}
              <h3 className="text-xl text-slate-900">{plan.name}</h3>
              <p className="mt-1 flex items-baseline gap-1.5">
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">
                  {plan.annualPrice ?? plan.price}
                </span>
                <span className="text-slate-500">/month</span>
              </p>
              <p className="text-sm text-slate-500">
                {plan.pages}
                {plan.annualPrice ? ", billed annually" : ""}
              </p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {plan.teaser.map((line) => (
                  <Check key={line}>{line}</Check>
                ))}
              </ul>
              <a href={plan.href} className={`${plan.featured ? "btn-primary" : "btn-secondary"} mt-6`}>
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-500">
          Prices shown billed annually, monthly billing available. Additional pages $0.05 each. EHR integration is scoped after a written discovery with
          your EHR vendor.
        </p>
      </section>

      {/* First week + FAQ */}
      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[5fr_6fr] lg:gap-16">
          <div>
            <h2 className="text-3xl text-slate-900 sm:text-4xl">Your first week with AiFax.</h2>
            <ol className="card-surface mt-6 px-7 py-2">
              {firstWeek.map((row, index) => (
                <li
                  key={row.when}
                  className={`flex gap-5 py-4 ${index < firstWeek.length - 1 ? "border-b border-slate-200" : ""}`}
                >
                  <span className="w-24 flex-none pt-0.5 text-sm font-bold uppercase tracking-[0.06em] text-orange-500">
                    {row.when}
                  </span>
                  <span>
                    <span className="block font-bold text-slate-900">{row.title}</span>
                    <span className="block text-[15px] text-slate-700">{row.body}</span>
                  </span>
                </li>
              ))}
            </ol>
            <ul className="mt-6 flex flex-col gap-3">
              <Check>Live within a day. Your number ports in the background, usually 1 to 2 weeks, with no downtime.</Check>
              <Check>
                A person answers.{" "}
                <a href={phone.href} className="font-semibold text-slate-900 hover:text-orange-500">
                  {phone.display}
                </a>
                , or reply to any email we send you.
              </Check>
              <Check>Also used outside medicine: legal, insurance, and back-office teams run the same platform.</Check>
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-slate-900">Questions practices ask first</h3>
            <div className="mt-3">
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
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-shell py-14 sm:py-18">
        <div className="flex flex-col gap-6 rounded-3xl bg-slate-900 px-8 py-10 text-white sm:px-12 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-3xl text-white">Keep your number. Lose the pile.</h2>
            <p className="mt-2 text-slate-300">Port in a few clicks, or get a new number and be live today.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href={sharedCtas.primary.href} className="btn-primary">
              {sharedCtas.primary.label}
            </a>
            <a href={sharedCtas.secondary.href} className="btn-light">
              {sharedCtas.secondary.label}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
