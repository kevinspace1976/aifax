import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { WorkflowReviewForm } from "@/components/workflow-review-form";
import { CtaLink } from "@/components/cta-link";
import { newNumberUrl, portNumberUrl, supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fax to eClinicalWorks Integration | AiFax",
  description:
    "AiFax is a cloud fax provider for practices running eClinicalWorks. Every incoming fax is read, summarized and matched to the patient by name and date of birth. Chart filing through the eClinicalWorks FHIR APIs, scoped and quoted separately.",
  alternates: { canonical: "/ehr/eclinicalworks" }
};

const today = [
  "Your fax number, ported with no downtime, or a new one today",
  "Every incoming fax read and summarized in under 60 seconds",
  "Patient name and date of birth pulled off the fax automatically",
  "Matched against the practice's patient list, uncertain cases flagged rather than guessed",
  "Summaries delivered to your staff inboxes and dashboard",
  "Search and question every fax you have received"
];

const filing = [
  {
    t: "Read and match",
    b: "AiFax queries the practice's patient records through the eClinicalWorks FHIR R4 APIs and matches the fax to one patient by family name, given name and date of birth. We have completed this end to end against the eClinicalWorks sandbox environment.",
    state: "Working today"
  },
  {
    t: "Duplicate check",
    b: "Before anything is filed, AiFax checks whether the document is already on the chart, so a resent fax does not land twice.",
    state: "Working today"
  },
  {
    t: "File into the chart",
    b: "Writing the fax into the patient chart uses the eClinicalWorks create APIs, which require a separate written agreement with eClinicalWorks and a participating practice. eClinicalWorks lists this API as version 12.0.2 and above, so an older build needs an upgrade request on their side first. We will tell you exactly where that stands before you commit to anything.",
    state: "Requires agreement"
  }
];

export default function EclinicalWorksPage() {
  return (
    <main>
      <section className="border-b border-slate-200">
        <div className="section-shell py-14 sm:py-16">
          <p className="kicker">For practices running eClinicalWorks</p>
          <h1 className="mt-4 max-w-4xl text-4xl text-slate-900 sm:text-5xl">
            Fax for an eClinicalWorks practice, with the patient already identified.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
            AiFax is a HIPAA-compliant fax provider first. Every fax that arrives is read, summarized, and matched to
            the right patient by name and date of birth before a staff member ever opens it. Filing into the chart is
            a separate project, scoped in writing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaLink href={portNumberUrl} cta="page_port_number" className="btn-primary">
              Port My Number
            </CtaLink>
            <CtaLink href={newNumberUrl} cta="page_new_number" className="btn-secondary">
              Get a New Number
            </CtaLink>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Plans from $9.99 a month, no contract. Integration quoted separately.
          </p>
        </div>
      </section>

      <section id="live-today" className="section-alt scroll-mt-24 py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">What works the day you sign up</h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            None of this waits on your EHR. It is the fax service itself.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {today.map((line) => (
              <li key={line} className="card-surface flex items-start gap-2.5 p-5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="chart-filing" className="scroll-mt-24 py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Where the chart integration actually stands</h2>
          <p className="mt-4 max-w-3xl text-lg text-slate-700">
            We would rather tell you this plainly than let you find out after signing. Here is each piece and its real
            status.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {filing.map((f) => (
              <article key={f.t} className="card-surface p-7">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    f.state === "Working today"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {f.state}
                </span>
                <h3 className="mt-4 text-xl text-slate-900">{f.t}</h3>
                <p className="mt-2 text-slate-700">{f.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="pilot" className="section-alt scroll-mt-24 py-16 sm:py-20">
        <div className="section-shell grid gap-12 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
          <div>
            <p className="kicker">Pilot practices</p>
            <h2 className="mt-4 text-3xl text-slate-900 sm:text-4xl">We are looking for a first eClinicalWorks practice</h2>
            <p className="mt-5 text-lg text-slate-700">
              Chart filing requires a participating practice before the agreement can be completed. If you run
              eClinicalWorks and want faxes landing in the chart, tell us and we will walk the process with you, in
              writing, at every step.
            </p>
            <p className="mt-4 text-slate-700">
              You can start on the fax service today regardless. The integration is added later and quoted
              separately.
            </p>
            <p className="mt-4 text-slate-700">
              One thing worth checking early: chart filing needs eClinicalWorks version 12.0.2 or newer. In
              eClinicalWorks it is under Help, then About. An older build is a free upgrade request on their
              side, so it is better to know now than later.
            </p>
            <p className="mt-4 text-slate-700">
              Or email{" "}
              <a className="font-semibold text-orange-600 underline" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>{" "}
              and tell us your EHR.
            </p>
            <p className="mt-6">
              <Link href="/ehr-integration" className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
                How integration works with other EHRs
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

      <section className="py-10">
        <div className="section-shell">
          <p className="text-sm text-slate-500">
            eClinicalWorks is a trademark of eClinicalWorks, LLC. AiFax is an independent fax service and is not
            affiliated with, endorsed by, or certified by eClinicalWorks.
          </p>
        </div>
      </section>
    </main>
  );
}
