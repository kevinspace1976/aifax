import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, FileStack, Mail, Search, Settings2, ShieldCheck, Sparkles, UserCheck, Zap } from "lucide-react";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "AiFax | EHR Integration",
  description:
    "The entire fax filed into the patient's chart automatically, with an AI summary on top. Zero-touch fax-to-EHR automation, scoped to your practice via a written discovery by email."
};

const capabilities = [
  {
    icon: FileStack,
    title: "The entire fax, filed into the chart - automatically",
    text: "Not just a summary: the complete original fax, every page, is delivered into the patient's chart the moment it arrives. The source document the doctor needs is already where it belongs."
  },
  {
    icon: Zap,
    title: "Zero-touch, 24/7 automation",
    text: "No one opens the fax, figures out who it's for, or uploads it by hand. The fax-to-chart step runs automatically around the clock - weekends, nights, and Monday-morning pileups included."
  },
  {
    icon: UserCheck,
    title: "Matched to the right patient",
    text: "Every fax is auto-labeled with the patient's name and date of birth so it files to the correct chart - not a shared inbox, not the wrong record."
  },
  {
    icon: Sparkles,
    title: "AI summary rides along",
    text: "On top of the original document, the doctor gets an instant AI summary of what's inside - results, referrals, follow-ups - so nothing waits to be read. The full fax is always attached."
  },
  {
    icon: Settings2,
    title: "Custom prompts and extraction per workflow",
    text: "You define what matters - diagnoses, meds, labs, follow-ups, referral details - and the AI extracts and structures it for your intake, routing, or prior-auth process."
  },
  {
    icon: ShieldCheck,
    title: "Compliance-first from day one",
    text: "HIPAA-compliant architecture, secure transmission, and a BAA executed electronically at signup. PHI is handled with encryption in transit and at rest."
  }
];

const steps = [
  {
    step: "1",
    title: "Discovery - in writing",
    text: "Email us at info@aifax.net with the EHR you use and what you want your faxes to do. We scope everything over email so the plan is documented and kept on record."
  },
  {
    step: "2",
    title: "Workflow design",
    text: "We map where summaries and documents should land, what the AI should extract, and who gets notified - matched to how your practice actually works."
  },
  {
    step: "3",
    title: "Build and validate",
    text: "We build the integration for your environment and validate it against your real workflow before anything goes live."
  },
  {
    step: "4",
    title: "Go live, at your scale",
    text: "One provider or a multi-site group - the same platform handles your volume, with 24/7 support behind it."
  }
];

const expectations = [
  "Every EHR is different. What an integration can do depends on the interfaces your EHR exposes - some systems support direct document or API intake, others need alternative routing into a document queue or intake inbox. Discovery tells us which applies to you.",
  "We scope first and promise after. We will not claim a live, working integration with your specific EHR until discovery and the build prove it for your system - you get honest answers, not integration logos.",
  "EHR integration is a dedicated service line, scoped and quoted to your workflow. Fax plans are month to month; the integration itself is priced after discovery.",
  "Timelines depend partly on your EHR vendor. Where a vendor's cooperation or credentials are required, that step is outside our direct control - we manage it, and we keep you updated in writing."
];

export default function EhrIntegrationPage() {
  return (
    <main>
      <PageHero
        title="EHR Integration"
        description="The entire fax - every page - filed into the patient's chart automatically, the moment it arrives. No printing, no scanning, no one uploading PDFs. The doctor sees the result sooner, the patient gets safer care, and the practice carries less liability."
      />

      <section className="section-shell py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Fax in. Chart updated. Automatically.</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          The point of the integration is simple: get the whole fax into the patient&apos;s chart with no human in the
          middle - and put an AI summary on top so the doctor knows what arrived.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {capabilities.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card-surface interactive p-6">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-14 sm:pb-16">
        <div className="card-surface p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white">Why less human involvement is the whole point</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-semibold text-orange-400">Fewer errors</h3>
              <p className="mt-1 text-sm text-slate-300">Every manual touch is a chance to misfile, mistype, or miss a page. Automation removes the touches.</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400">Less liability</h3>
              <p className="mt-1 text-sm text-slate-300">A fax that files itself cannot sit unread in a pile. The compliance and malpractice exposure of a missed result shrinks with it.</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400">Faster results</h3>
              <p className="mt-1 text-sm text-slate-300">The document and its summary are in front of the physician the moment they open the chart - not after someone processes a queue.</p>
            </div>
            <div>
              <h3 className="font-semibold text-orange-400">Better care</h3>
              <p className="mt-1 text-sm text-slate-300">When findings reach the doctor sooner and nothing slips, the patient gets safer, faster follow-up. That is the outcome that matters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50">
        <div className="section-shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">How it works</h2>
          <p className="mt-2 max-w-3xl text-slate-300">
            Integration starts with a short discovery over email - everything is scoped in writing and kept on record.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ step, title, text }) => (
              <article key={step} className="card-surface p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                  {step}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Straight answers about what to expect</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          Integrations earn trust by being honest about their limits. Here is how we work:
        </p>
        <ul className="mt-6 max-w-3xl space-y-4">
          {expectations.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-slate-200 sm:text-base">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-white/10 bg-slate-900/50">
        <div className="section-shell py-14 sm:py-16">
          <div className="card-surface p-6 sm:p-8">
            <h2 className="text-2xl font-semibold text-white">Start with a discovery email</h2>
            <p className="mt-2 max-w-3xl text-slate-300">
              Tell us the EHR you use and what you want your faxes to do. Our team maps it out with you - in writing, so
              every decision stays on record.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="mailto:info@aifax.net?subject=EHR%20integration%20discovery" className="btn-primary">
                <Mail className="mr-2 h-4 w-4" /> Email info@aifax.net
              </a>
              <Link href="/pricing" className="btn-secondary">
                <Search className="mr-2 h-4 w-4" /> See Fax Plans
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
