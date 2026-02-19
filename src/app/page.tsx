import {
  ArrowRight,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Clock3,
  FileSearch,
  Globe,
  Lock,
  Sparkles,
  Workflow
} from "lucide-react";

const stats = [
  { label: "HIPAA-ready architecture", value: "100%" },
  { label: "Average setup support", value: "24–72 hrs" },
  { label: "Free AI summary trial", value: "30 days" },
  { label: "Automation coverage", value: "A–Z" }
];

const features = [
  {
    icon: Lock,
    title: "Secure, compliant fax workflows",
    description:
      "Built for regulated industries with enterprise-grade controls, encrypted delivery, and compliance-first operations."
  },
  {
    icon: BrainCircuit,
    title: "AI summaries in real time",
    description:
      "Turn lengthy incoming faxes into concise summaries delivered instantly to email, SMS, and your business systems."
  },
  {
    icon: Workflow,
    title: "Deep integration + automation",
    description:
      "Connect EHR, EMR, CRM, and internal tools to remove manual handoffs and eliminate repetitive admin tasks."
  },
  {
    icon: FileSearch,
    title: "Document intelligence",
    description:
      "Chat with PDFs, images, and office docs to extract answers fast and accelerate your operations."
  }
];

const process = [
  {
    icon: Building2,
    title: "New customers",
    text: "Choose local, toll-free, or area-code numbers and start faxing immediately."
  },
  {
    icon: Clock3,
    title: "Current eFax users",
    text: "Onboard in 24–72 hours while keeping your current number and existing platform flow."
  },
  {
    icon: Globe,
    title: "Port existing numbers",
    text: "Move your number with guided support and maintain uninterrupted business continuity."
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="mx-auto max-w-7xl px-6 pb-20 pt-10 md:px-10 md:pt-16">
          <header className="mb-16 flex items-center justify-between rounded-full border border-white/15 bg-white/5 px-5 py-3 backdrop-blur">
            <p className="text-sm font-semibold tracking-[0.2em] text-cyan-300">AIFAX</p>
            <a href="#contact" className="text-sm text-slate-200 hover:text-white">
              Contact
            </a>
          </header>

          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-300/10 px-4 py-2 text-xs font-medium text-emerald-200">
                <Sparkles className="h-4 w-4" /> Patent-pending AI fax platform
              </p>
              <h1 className="text-balance text-4xl font-semibold leading-tight md:text-6xl">
                The modern AI fax platform for healthcare, legal, and enterprise teams.
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-300">
                Replace manual fax handling with secure automation, custom summaries, and integrations that work with your
                existing systems.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
                >
                  Schedule a Demo <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="#features"
                  className="rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition hover:border-white"
                >
                  Explore Platform
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((item) => (
                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <p className="text-3xl font-semibold text-cyan-300">{item.value}</p>
                  <p className="mt-2 text-sm text-slate-300">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">Everything you need to scale secure fax operations</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-slate-900 p-7">
              <Icon className="h-8 w-8 text-cyan-300" />
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/70">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <h2 className="text-3xl font-semibold md:text-4xl">Get started your way</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {process.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-slate-950 p-6">
                <Icon className="h-7 w-7 text-fuchsia-300" />
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-slate-300">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <div className="rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-500/15 via-slate-900 to-fuchsia-500/15 p-8 md:p-12">
          <h2 className="max-w-2xl text-3xl font-semibold md:text-4xl">Ready to modernize your fax workflow?</h2>
          <p className="mt-4 max-w-2xl text-slate-300">
            Join teams using AiFax to automate intake, accelerate decisions, and reduce operational overhead.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Free API setup", "Custom AI prompts", "Secure multi-channel delivery", "Priority onboarding support"].map(
              (item) => (
                <li key={item} className="inline-flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" /> {item}
                </li>
              )
            )}
          </ul>
          <a
            href="mailto:hello@aifax.net"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-slate-950 transition hover:bg-slate-100"
          >
            Talk to Sales <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
}
