import Link from "next/link";
import { ArrowRight, CheckCircle2, Cpu, FileText, ShieldCheck, Star, Workflow } from "lucide-react";

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
    text: "Built for regulated teams with privacy, auditing, and data security as first-class requirements."
  },
  {
    icon: Workflow,
    title: "Automation + Integration",
    text: "Connect tools across intake, routing, and communication for fewer handoffs and faster outcomes."
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    text: "Convert incoming faxes into concise summaries and structured data using OCR + NLP workflows."
  },
  {
    icon: Cpu,
    title: "Enterprise-Scale AI",
    text: "Deploy custom prompt logic by department, case type, or workflow stage without rigid templates."
  }
];

const testimonials = [
  {
    quote: "AiFax helped our operations team cut intake turnaround time dramatically while improving consistency.",
    author: "Director of Operations, Multi-site Healthcare Group"
  },
  {
    quote: "We finally have a fax workflow that feels modern, measurable, and integrated with our CRM stack.",
    author: "COO, Regional Legal Services Firm"
  }
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-white/10">
        <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="kicker">Proud Partner of eFax · Enterprise Ready</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              AI Fax Automation Built for <span className="brand-gradient">Modern Enterprise Teams</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
              AiFax transforms legacy fax operations into secure, intelligent workflows with instant summaries, extraction,
              and direct integration into your business stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See Plans
              </Link>
            </div>
          </div>

          <aside className="card-surface interactive p-6 sm:p-8" aria-label="Trust points">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">Why enterprises choose AiFax</h2>
            <ul className="mt-5 space-y-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-200 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Core Platform Capabilities</h2>
        <div className="mt-6 grid gap-4 sm:gap-5 md:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card-surface interactive p-6">
              <Icon className="h-7 w-7 text-cyan-300" />
              <h3 className="mt-3 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-slate-300 sm:text-base">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50">
        <div className="section-shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Customer confidence</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {testimonials.map((item) => (
              <article key={item.author} className="card-surface p-6">
                <Star className="h-5 w-5 text-orange-300" />
                <p className="mt-3 text-slate-200">“{item.quote}”</p>
                <p className="mt-3 text-sm text-slate-400">{item.author}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/solutions" className="btn-light">
              Explore Industry Solutions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link href="/how-it-works" className="btn-secondary">
              See How It Works
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
