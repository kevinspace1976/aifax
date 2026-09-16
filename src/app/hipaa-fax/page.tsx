import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { newNumberUrl, portNumberUrl, supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "HIPAA Compliant Fax Service with BAA | AiFax",
  description:
    "HIPAA-compliant cloud fax for medical practices. BAA signed electronically at signup, encryption in transit, restricted access and a full audit trail. Plans from $9.99 a month, no contract.",
  alternates: { canonical: "/hipaa-fax" }
};

const controls = [
  {
    t: "A BAA signed at signup",
    b: "Not requested later, not an upgrade, not a phone call with sales. The Business Associate Agreement is signed electronically as part of creating the account, so your compliance file is complete on day one."
  },
  {
    t: "Encryption in transit",
    b: "Every connection to the portal, the app and the API is TLS encrypted. Faxes move between our systems over encrypted channels."
  },
  {
    t: "Access limited to your own users",
    b: "Each practice is its own tenant. Your staff see your faxes. AiFax support reaches your data only for troubleshooting, under the same BAA."
  },
  {
    t: "A full audit trail",
    b: "Every fax carries its own record: when it arrived, what number it came from, how many pages, who it was delivered to, and every send attempt with its result."
  },
  {
    t: "Retention you control",
    b: "Set how long faxes are kept. Request deletion of your practice's data at any time and we act on it."
  },
  {
    t: "US-based infrastructure",
    b: "Your fax data is stored on servers in the United States. Nothing leaves the country."
  }
];

const questions = [
  {
    q: "Is a regular online fax service HIPAA compliant?",
    a: "Not automatically. Faxing PHI through a vendor makes that vendor a business associate, which means you need a signed BAA with them. A consumer fax app with no BAA leaves the practice exposed, no matter how the fax itself travels."
  },
  {
    q: "Is a fax machine on an analog line safer than cloud fax?",
    a: "Usually the opposite. A machine in a hallway prints PHI onto paper that anyone walking past can read, and it keeps no record of who collected it. Cloud fax with named logins and an audit trail is easier to defend."
  },
  {
    q: "What about the AI reading our faxes?",
    a: "The AI reads the fax to write the summary and match the patient. That processing is disclosed, it happens under the same agreement, and the summary lives in your account alongside the original document."
  },
  {
    q: "Do you sign a BAA for every plan?",
    a: "Yes, including the $9.99 plan. Compliance is not an upsell."
  }
];

export default function HipaaFaxPage() {
  return (
    <main>
      <section className="border-b border-slate-200">
        <div className="section-shell py-14 sm:py-16">
          <p className="kicker">HIPAA and security</p>
          <h1 className="mt-4 max-w-4xl text-4xl text-slate-900 sm:text-5xl">
            HIPAA-compliant fax, with the BAA signed before your first page.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
            Faxing patient information makes your fax vendor a business associate. AiFax signs the BAA
            electronically at signup, encrypts in transit, keeps every fax inside your own tenant, and records an
            audit trail you can produce if anyone asks.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={newNumberUrl} className="btn-primary">
              Get a New Number
            </a>
            <a href={portNumberUrl} className="btn-secondary">
              Port My Number
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">Plans from $9.99 a month. No contract, no setup fee.</p>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">What you actually get</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {controls.map((c) => (
              <article key={c.t} className="card-surface p-7">
                <ShieldCheck className="h-6 w-6 text-emerald-600" aria-hidden="true" />
                <h3 className="mt-3 text-lg text-slate-900">{c.t}</h3>
                <p className="mt-2 text-slate-700">{c.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Common questions</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {questions.map((item) => (
              <article key={item.q} className="card-surface p-7">
                <h3 className="text-lg text-slate-900">{item.q}</h3>
                <p className="mt-2 text-slate-700">{item.a}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-500">
            This page describes how AiFax is built. It is not legal advice, and your practice remains responsible for
            its own HIPAA program.
          </p>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Switching from a provider with no BAA?</h2>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {[
              "We port your existing number with no downtime",
              "Your line stays live on the old provider until the port completes",
              "BAA signed electronically as part of signup",
              "Month to month, cancel any time"
            ].map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/switch" className="btn-primary">
              See how switching works
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
              Ask us a compliance question
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
          <p className="mt-4 text-slate-700">
            Or email{" "}
            <a className="font-semibold text-orange-600 underline" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
