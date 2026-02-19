import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  FileText,
  ShieldCheck,
  Star,
  Workflow,
  Zap,
  BarChart3,
  Globe,
  Lock
} from "lucide-react";
import { stats, complianceBadges } from "@/lib/site";

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
    text: "Built for regulated teams with privacy, auditing, and data security as first-class requirements.",
    color: "text-emerald-300"
  },
  {
    icon: Workflow,
    title: "Automation + Integration",
    text: "Connect tools across intake, routing, and communication for fewer handoffs and faster outcomes.",
    color: "text-cyan-300"
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    text: "Convert incoming faxes into concise summaries and structured data using OCR + NLP workflows.",
    color: "text-blue-300"
  },
  {
    icon: Cpu,
    title: "Enterprise-Scale AI",
    text: "Deploy custom prompt logic by department, case type, or workflow stage without rigid templates.",
    color: "text-orange-300"
  }
];

const testimonials = [
  {
    quote:
      "AiFax helped our operations team cut intake turnaround time dramatically while improving consistency across all locations.",
    author: "Director of Operations",
    company: "Multi-site Healthcare Group",
    rating: 5
  },
  {
    quote:
      "We finally have a fax workflow that feels modern, measurable, and integrated with our CRM stack. It transformed our intake process.",
    author: "COO",
    company: "Regional Legal Services Firm",
    rating: 5
  },
  {
    quote:
      "The AI summarization alone saved our team hours each day. Claims processing went from days to minutes.",
    author: "VP of Claims",
    company: "National Insurance Provider",
    rating: 5
  }
];

const integrations = [
  "Epic", "Cerner", "Salesforce", "HubSpot", "Slack", "Microsoft Teams",
  "Google Workspace", "Zapier"
];

const whyChoose = [
  {
    icon: Zap,
    title: "Instant AI Processing",
    text: "Documents are summarized and routed in under 3 seconds."
  },
  {
    icon: Lock,
    title: "Enterprise Security",
    text: "End-to-end encryption with HIPAA, SOX, and PCI-DSS compliance."
  },
  {
    icon: Globe,
    title: "Universal Integrations",
    text: "Connect to 50+ platforms including EHR, CRM, and messaging tools."
  },
  {
    icon: BarChart3,
    title: "Actionable Analytics",
    text: "Real-time dashboards for throughput, quality, and cost tracking."
  }
];

function toEmbedUrl(link?: string): string | null {
  if (!link) return null;
  try {
    const url = new URL(link);
    if (url.hostname.includes("youtu.be")) {
      const id = url.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.hostname.includes("youtube.com")) {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    return null;
  } catch {
    return null;
  }
}

export default function Home() {
  const youtubeEmbedUrl = toEmbedUrl(process.env.YOUTUBE_VIDEO_LINK);

  return (
    <main>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-white/[0.06]">
        {/* Background accents */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[32rem] w-[60rem] -translate-x-1/2 opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(103 232 249 / 0.1) 0%, transparent 60%)"
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-40 top-20 h-80 w-80 opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(249 115 22 / 0.15) 0%, transparent 70%)"
          }}
          aria-hidden="true"
        />

        <div className="section-shell relative grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-14 lg:py-24">
          <div>
            <p className="kicker">Proud Partner of eFax &middot; Enterprise Ready</p>
            <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
              AI Fax Automation Built for{" "}
              <span className="brand-gradient">Modern Enterprise Teams</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
              AiFax transforms legacy fax operations into secure, intelligent workflows with instant
              summaries, extraction, and direct integration into your business stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See Plans
              </Link>
            </div>

            {/* Compliance badges inline */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {complianceBadges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-300"
                >
                  <ShieldCheck className="h-3 w-3" />
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <aside className="card-surface interactive p-6 sm:p-8" aria-label="Trust points">
            <h2 className="text-xl font-semibold text-white sm:text-2xl">
              Why enterprises choose AiFax
            </h2>
            <ul className="mt-5 space-y-4">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-slate-200 sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Trusted by healthcare, legal, and insurance teams
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="border-b border-white/[0.06] bg-slate-900/40">
        <div className="section-shell grid grid-cols-2 gap-6 py-10 sm:py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="stat-number">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Video Demo ── */}
      {youtubeEmbedUrl ? (
        <section className="section-shell py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">Product Demo</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              See AiFax in Action
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Watch how our AI fax platform summarizes documents and automates delivery workflows in
              real time.
            </p>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-[var(--shadow-card)]">
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full"
                src={youtubeEmbedUrl}
                title="AiFax Product Demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Core Capabilities ── */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Platform</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Core Platform Capabilities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Everything you need to modernize fax operations, from intake to analytics.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text, color }) => (
            <article key={title} className="card-surface interactive p-6 sm:p-7">
              <div className="icon-box">
                <Icon className={`h-6 w-6 ${color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300 sm:text-base">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Why Choose AiFax ── */}
      <section className="border-y border-white/[0.06] bg-slate-900/30">
        <div className="section-shell py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">Advantages</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Why Leading Teams Choose AiFax
            </h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {whyChoose.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="icon-box-orange mx-auto">
                  <Icon className="h-6 w-6 text-orange-300" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Integrations ── */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Integrations</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Connects With Your Existing Stack
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            AiFax integrates with the tools your team already uses — no rip and replace required.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {integrations.map((name) => (
            <span
              key={name}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/10 bg-slate-900/50 px-5 text-sm font-medium text-slate-200 transition-colors hover:border-cyan-300/20 hover:text-white"
            >
              {name}
            </span>
          ))}
        </div>
        <p className="mt-5 text-center text-sm text-slate-400">
          Plus 40+ more via API and Zapier.{" "}
          <Link href="/solutions" className="text-cyan-300 hover:underline">
            See all integrations
          </Link>
        </p>
      </section>

      {/* ── Testimonials ── */}
      <section className="border-y border-white/[0.06] bg-slate-900/40">
        <div className="section-shell py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">Social Proof</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Trusted by Enterprise Teams
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.author} className="card-surface flex flex-col p-6">
                <div className="flex gap-0.5">
                  {Array.from({ length: item.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-200 sm:text-base">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <div className="mt-5 border-t border-white/10 pt-4">
                  <p className="text-sm font-medium text-white">{item.author}</p>
                  <p className="text-xs text-slate-400">{item.company}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/solutions" className="btn-light">
              Explore Industry Solutions
              <ArrowRight className="h-4 w-4" />
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
