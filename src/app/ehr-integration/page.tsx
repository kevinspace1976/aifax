import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { EhrRoutes } from "@/components/diagrams/ehr-routes";
import { PageHero } from "@/components/page-hero";
import { supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "EHR Integration | AiFax",
  description: "The whole fax into the patient's chart, as directly as your EHR allows. Scoped in writing before anything is built."
};

const routes = [
  {
    kicker: "Automatic",
    title: "Filed by the system",
    body: "Where the EHR exposes document intake to a registered application, the matched fax is written to the chart with no one in the middle."
  },
  {
    kicker: "Direct messaging",
    title: "Filed from the inbox",
    body: "Where the EHR accepts Direct secure messages (the national standard most certified EHRs support), the prepared fax lands in the EHR's Direct inbox and staff file it: open, select patient, file. How many clicks that takes depends on the EHR."
  },
  {
    kicker: "Guided",
    title: "Filed by staff, prepared by us",
    body: "Patient already matched, document already named and categorized, checklist on screen. Staff upload it and confirm. Every step logged."
  }
];

const straight = [
  "Every EHR is different. What an integration can do depends on the interfaces your EHR exposes. Discovery tells us which applies to you.",
  "We scope first and promise after. We will not claim a live integration with your EHR until discovery and the build prove it.",
  "EHR integration is a separate, quoted project. Fax plans are month to month and work fully on their own.",
  "Where your EHR vendor's cooperation or credentials are required, that step is outside our direct control. We manage it and keep you updated in writing."
];

const process = [
  { title: "Discovery, in writing", body: "Email us the EHR you use and what you want your faxes to do. We contact the vendor on your behalf with your authorization." },
  { title: "Workflow design", body: "We map where documents land, what the AI extracts, and who gets notified. You see the exact day-to-day workflow before any build." },
  { title: "Build and validate", body: "We build for your environment and validate against your real workflow before anything goes live." },
  { title: "Go live, we own it", body: "Once live, monitoring, maintenance, and fixes are ours. If your vendor changes something, that is our problem to solve." }
];

export default function EhrIntegrationPage() {
  return (
    <main>
      <PageHero
        kicker="EHR integration"
        title="The whole fax into the chart, as directly as your EHR allows."
        description="Not just a summary: the complete original fax, every page, delivered into the patient's chart the moment it arrives, using every interface your EHR exposes."
        actions={
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${supportEmail}?subject=EHR%20integration%20discovery`} className="btn-primary">
              Start with a discovery email
            </a>
            <Link href="/pricing" className="btn-secondary">
              See fax plans
            </Link>
          </div>
        }
        note="Discovery is done in writing with your EHR vendor before anything is built."
        aside={<EhrRoutes />}
      />

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <div className="max-w-2xl">
            <h2 className="text-3xl text-slate-900 sm:text-4xl">Three ways a fax reaches the chart.</h2>
            <p className="mt-4 text-lg text-slate-700">Which one applies depends on what your EHR supports. We tell you which before you commit.</p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {routes.map((route) => (
              <article key={route.title} className="card-surface p-7">
                <p className="kicker">{route.kicker}</p>
                <h3 className="mt-2 text-xl text-slate-900">{route.title}</h3>
                <p className="mt-2 text-slate-700">{route.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-3xl text-slate-900">Matched to the right patient. Never guessed.</h2>
          <p className="mt-4 text-slate-700">
            When a fax arrives with the patient&apos;s name and date of birth, the AI reads them and matches against your
            patient list. A date of birth is required for any automatic match. When two patients could fit, or the fax
            arrives without the identifiers, it is flagged for your staff to review, so the wrong chart never gets someone
            else&apos;s document.
          </p>
        </div>
        <div>
          <h2 className="text-3xl text-slate-900">Straight answers about what to expect</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {straight.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900">How it works</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => (
              <article key={step.title} className="card-surface p-6">
                <p className="kicker">{index + 1}</p>
                <h3 className="mt-2 text-lg text-slate-900">{step.title}</h3>
                <p className="mt-2 text-[15px] text-slate-700">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-16">
        <div className="card-surface flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <h2 className="text-2xl text-slate-900">Start with a discovery email</h2>
            <p className="mt-2 text-slate-700">Tell us the EHR you use and what you want your faxes to do. Everything is scoped in writing.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={`mailto:${supportEmail}?subject=EHR%20integration%20discovery`} className="btn-primary">
              Email {supportEmail}
            </a>
            <Link href="/pricing" className="btn-secondary">
              See fax plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
