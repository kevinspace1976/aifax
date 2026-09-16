import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WorkflowReviewForm } from "@/components/workflow-review-form";
import { newNumberUrl, portNumberUrl, supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Switch Your Fax Provider | Keep Your Number | AiFax",
  description:
    "Switching fax providers? Keep your number, no downtime, and every incoming fax read and summarized by AI. HIPAA-compliant with a BAA at signup. Plans from $9.99 a month, no contract.",
  alternates: { canonical: "/switch" }
};

const objections = [
  {
    q: "Will we lose our fax number?",
    a: "No. We port it. Your line stays live on your current provider the whole time, and it switches over only when the port completes. Typical filing time is 1 to 2 weeks, with no gap in service."
  },
  {
    q: "Do we have to change how we work?",
    a: "No. Send from the web or straight from your inbox by emailing the document to the fax number followed by @app.aifax.net. Incoming faxes arrive by email exactly like they do now, with a summary attached."
  },
  {
    q: "Is there a contract?",
    a: "No contract and no setup fee. Month to month, cancel any time. If we are not better than what you have, leave."
  },
  {
    q: "Is it actually HIPAA compliant?",
    a: "Yes. Encrypted in transit, access restricted to your own users, full audit trail, and a BAA signed electronically at signup rather than requested later."
  },
  {
    q: "What happens to our old faxes?",
    a: "They stay with your old provider. Everything received on AiFax from day one is stored, searchable, and you can ask questions across it."
  }
];

const gains = [
  "Every incoming fax read and summarized in under 60 seconds",
  "Patient name and date of birth matched to your list, uncertain cases flagged instead of guessed",
  "Chat with any fax and ask it questions",
  "Search every fax you have ever received on AiFax",
  "Summaries delivered to up to three inboxes",
  "Email to fax and web sending included on every plan",
  "HIPAA compliant, BAA signed at signup",
  "Optional EHR integration, quoted separately, when your EHR allows it"
];

const steps = [
  {
    n: "1",
    t: "Tell us your number",
    b: "Start the port from the portal, or send us the number and your current provider and we will tell you what the port needs."
  },
  {
    n: "2",
    t: "We file the port",
    b: "Your existing line keeps running on your current provider the entire time. Nothing is cut off while the port is pending."
  },
  {
    n: "3",
    t: "The number moves",
    b: "On the completion date your fax number starts arriving at AiFax, already read, summarized and matched. Then you cancel the old account."
  }
];

export default function SwitchPage() {
  return (
    <main>
      <section className="border-b border-slate-200">
        <div className="section-shell py-14 sm:py-16">
          <p className="kicker">Switching providers</p>
          <h1 className="mt-4 max-w-4xl text-4xl text-slate-900 sm:text-5xl">
            Change fax providers. Keep your number. Lose nothing.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
            We port your existing fax number with no downtime, and from the first day every incoming fax arrives
            already read, summarized, and matched to the patient. Plans from $9.99 a month, no contract.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={portNumberUrl} className="btn-primary">
              Port My Number
            </a>
            <a href={newNumberUrl} className="btn-secondary">
              Get a New Number Today
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Your fax line stays live on your current provider until the port completes.
          </p>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">What you gain by moving</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Most fax providers deliver a page. We deliver a page your staff does not have to read first.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {gains.map((line) => (
              <li key={line} className="card-surface flex items-start gap-2.5 p-5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Porting, in three steps</h2>
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

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">The questions everyone asks before switching</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {objections.map((o) => (
              <article key={o.q} className="card-surface p-7">
                <h3 className="text-lg text-slate-900">{o.q}</h3>
                <p className="mt-2 text-slate-700">{o.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          <div>
            <p className="kicker">Not ready to sign up</p>
            <h2 className="mt-4 text-3xl text-slate-900 sm:text-4xl">Send us what you pay now</h2>
            <p className="mt-5 text-lg text-slate-700">
              Tell us your current provider, roughly how many pages a month you send and receive, and what you pay.
              We reply by email with a written comparison and what porting would involve. No calls unless you ask
              for one.
            </p>
            <p className="mt-4 text-slate-700">
              Prefer email? Write to{" "}
              <a className="font-semibold text-orange-600 underline" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
              .
            </p>
            <p className="mt-6">
              <Link href="/pricing" className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                See all plans and page allowances
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Please do not include patient health information in this form.
            </p>
          </div>
          <WorkflowReviewForm />
        </div>
      </section>
    </main>
  );
}
