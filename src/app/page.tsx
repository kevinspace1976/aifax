import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, FileText, ShieldCheck, Workflow } from "lucide-react";

const trustPoints = [
  "HIPAA-compliant architecture and secure transmission",
  "AI summaries distributed to email, SMS, EHR/EMR/CRM",
  "Free API setup and guided onboarding support",
  "Custom AI prompts and extraction logic per workflow"
];

const pillars = [
  {
    icon: ShieldCheck,
    title: "Compliance-First Operations",
    text: "Designed for regulated industries with privacy, security, and auditability at the core."
  },
  {
    icon: Workflow,
    title: "Automation + Integration",
    text: "Connect existing platforms and remove repetitive work across intake, routing, and follow-up."
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    text: "Extract key details from incoming faxes and documents with OCR and NLP workflows."
  },
  {
    icon: Cpu,
    title: "Enterprise-Scale AI",
    text: "Deploy custom AI prompts and logic that adapt to your team’s operating model."
  }
];

const ctaTiles = [
  "For healthcare teams: triage referrals and lab docs faster",
  "For legal teams: classify and route case files instantly",
  "For operations: reduce manual processing and staffing friction"
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-white/10">
        <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-200">
              Proud Partner of eFax · Enterprise Ready
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              AI Fax Automation Built for <span className="brand-gradient">Modern Enterprise Teams</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
              AiFax transforms legacy fax operations into secure, intelligent workflows with instant summaries, structured
              extraction, and direct integration into your business stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400"
              >
                Schedule a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-slate-100">
                View Pricing Plans
              </Link>
            </div>
          </div>

          <div className="card-surface p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Why enterprises choose AiFax</h2>
            <ul className="mt-5 space-y-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-200 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Core Platform Capabilities</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card-surface p-6">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50">
        <div className="section-shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Launch outcomes, not just software</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ctaTiles.map((tile) => (
              <article key={tile} className="card-surface p-5 text-sm text-slate-200 sm:text-base">
                {tile}
              </article>
            ))}
          </div>
          <div className="mt-8">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Explore Industry Solutions <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
