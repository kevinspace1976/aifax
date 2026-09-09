import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { newNumberUrl, portNumberUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "How It Works | AiFax",
  description: "Port or pick a number, tell the AI what to look for, and every fax arrives read, matched, and summarized."
};

const steps = [
  {
    title: "Onboard your number",
    body: "Port your existing number (we file it, typical 1 to 2 weeks, no downtime) or get a new one and start today. Your practice gets a login, a fax address, and a Fax Summaries dashboard."
  },
  {
    title: "Tell the AI what matters",
    body: "A default prompt pulls patient, date of birth, urgency, sender, and what the document is about. Edit it to your practice: referring provider, insurance, follow-up dates, anything you want at a glance."
  },
  {
    title: "Receive",
    body: "Each fax arrives as a PDF plus its summary, emailed to up to three addresses and shown in your dashboard, usually within seconds. Patient name and date of birth are on the label."
  },
  {
    title: "Send",
    body: "From the website with an attachment, or from your inbox: email the document to the fax number followed by @app.aifax.net and it goes out. Delivery confirmations come back by email."
  }
];

const automatic = [
  "Reading every page, day and night",
  "Patient name and date of birth on every fax",
  "Matching against your patient list, with uncertain cases flagged",
  "A summary written to your prompt, emailed and on the dashboard",
  "Delivery confirmations for everything you send"
];

const clicks = [
  "Confirming a flagged patient match",
  "Filing into the chart where your EHR has no direct intake (two clicks from a prepared document)",
  "Editing your summary prompt whenever your needs change"
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        kicker="How it works"
        title="Live in a day. Nothing to install."
        description="Pick a number or port yours, tell the AI what to look for, and every fax from then on arrives read, matched, and summarized."
        actions={
          <div className="flex flex-wrap gap-3">
            <a href={newNumberUrl} className="btn-primary">
              Get a New Number
            </a>
            <a href={portNumberUrl} className="btn-secondary">
              Port My Number
            </a>
          </div>
        }
        note="Your fax line stays live on your current provider until the port completes."
      />

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <article key={step.title} className="card-surface p-7">
              <p className="kicker">Step {index + 1}</p>
              <h2 className="mt-2 text-2xl text-slate-900">{step.title}</h2>
              <p className="mt-2 text-slate-700">{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl text-slate-900">What is automatic</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {automatic.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-3xl text-slate-900">What is a click</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {clicks.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-slate-700">
                <span className="mt-0.5 inline-block h-5 w-5 flex-none rounded-md border-2 border-slate-400" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-500">With EHR integration, filing itself becomes automatic wherever your EHR allows it.</p>
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="flex flex-wrap gap-3">
          <a href={newNumberUrl} className="btn-primary">
            Get a New Number
          </a>
          <Link href="/pricing" className="btn-secondary">
            See plans
          </Link>
        </div>
      </section>
    </main>
  );
}
