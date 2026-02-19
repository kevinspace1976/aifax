import Link from "next/link";
import { ArrowRight, Check, Cpu, FileText, ShieldCheck, Star, Workflow, Zap, BarChart3, Globe, Lock } from "lucide-react";
import { stats, complianceBadges } from "@/lib/site";

const trustPoints = [
  "HIPAA-compliant architecture and secure transmission",
  "AI summaries distributed to email, SMS, EHR/EMR/CRM",
  "Free API setup and guided onboarding support",
  "Custom AI prompts and extraction logic per workflow"
];

const pillars = [
  { icon: ShieldCheck, title: "Compliance-First", text: "Privacy, auditing, and data security as first-class requirements for regulated teams." },
  { icon: Workflow, title: "Automation + Integration", text: "Connect intake, routing, and communication for fewer handoffs and faster outcomes." },
  { icon: FileText, title: "Document Intelligence", text: "Convert faxes into concise summaries and structured data using OCR + NLP workflows." },
  { icon: Cpu, title: "Enterprise-Scale AI", text: "Custom prompt logic by department, case type, or workflow stage — no rigid templates." }
];

const testimonials = [
  { quote: "AiFax helped our operations team cut intake turnaround time dramatically while improving consistency across all locations.", author: "Director of Operations", company: "Multi-site Healthcare Group" },
  { quote: "We finally have a fax workflow that feels modern, measurable, and integrated with our CRM stack.", author: "COO", company: "Regional Legal Services Firm" },
  { quote: "The AI summarization alone saved our team hours each day. Claims processing went from days to minutes.", author: "VP of Claims", company: "National Insurance Provider" }
];

const integrations = ["Epic", "Cerner", "Salesforce", "HubSpot", "Slack", "Microsoft Teams", "Google Workspace", "Zapier"];

const advantages = [
  { icon: Zap, title: "Instant Processing", text: "Documents summarized and routed in under 3 seconds." },
  { icon: Lock, title: "Enterprise Security", text: "End-to-end encryption with HIPAA, SOX, and PCI-DSS." },
  { icon: Globe, title: "50+ Integrations", text: "Connect to EHR, CRM, and messaging tools seamlessly." },
  { icon: BarChart3, title: "Real-Time Analytics", text: "Dashboards for throughput, quality, and cost tracking." }
];

function toEmbedUrl(link?: string): string | null {
  if (!link) return null;
  try {
    const url = new URL(link);
    if (url.hostname.includes("youtu.be")) { const id = url.pathname.replace("/", ""); return id ? `https://www.youtube.com/embed/${id}` : null; }
    if (url.hostname.includes("youtube.com")) { const id = url.searchParams.get("v"); return id ? `https://www.youtube.com/embed/${id}` : null; }
    return null;
  } catch { return null; }
}

export default function Home() {
  const youtubeEmbedUrl = toEmbedUrl(process.env.YOUTUBE_VIDEO_LINK);

  return (
    <main>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="glow-orb" style={{ width: 700, height: 500, top: -200, left: "40%", background: "rgba(212,165,60,0.06)" }} aria-hidden="true" />
        <div className="glow-orb" style={{ width: 400, height: 400, top: 100, right: -100, background: "rgba(212,165,60,0.04)" }} aria-hidden="true" />

        <div className="section-shell relative grid gap-10 py-20 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-32">
          <div>
            <p className="kicker">Proud Partner of eFax &middot; Enterprise Ready</p>
            <h1 className="heading-display mt-6 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.75rem]">
              AI Fax Automation Built for <span className="brand-gradient">Modern Enterprise</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--warm-gray)" }}>
              Transform legacy fax operations into secure, intelligent workflows — instant summaries, smart extraction, and direct integration into your business stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Get Started <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/pricing" className="btn-secondary">See Plans</Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {complianceBadges.map((b) => <span key={b} className="badge-compliance"><ShieldCheck className="h-3 w-3" />{b}</span>)}
            </div>
          </div>

          <aside className="card card-hover p-7 sm:p-8" aria-label="Trust points">
            <div className="gold-line" />
            <h2 className="heading-display mt-5 text-2xl sm:text-[1.75rem]">Why enterprises choose AiFax</h2>
            <ul className="mt-6 space-y-4">
              {trustPoints.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm sm:text-base" style={{ color: "var(--warm-white)" }}>
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(52,211,153,0.1)", border: "1px solid rgba(52,211,153,0.2)" }}>
                    <Check className="h-3 w-3" style={{ color: "#6ee7b7" }} />
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6" style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}>
              <p className="mt-5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--warm-muted)" }}>
                Trusted by healthcare, legal, and insurance teams
              </p>
            </div>
          </aside>
        </div>
        <div className="gold-divider" />
      </section>

      {/* ═══ STATS ═══ */}
      <section style={{ background: "rgba(18,22,42,0.5)" }}>
        <div className="section-shell grid grid-cols-2 gap-8 py-12 sm:py-14 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="stat-value">{s.value}</p>
              <p className="stat-label">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="gold-divider" />
      </section>

      {/* ═══ VIDEO ═══ */}
      {youtubeEmbedUrl && (
        <section className="section-shell py-20 sm:py-24">
          <div className="text-center">
            <p className="section-label">Product Demo</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">See AiFax in Action</h2>
            <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--warm-gray)" }}>Watch how our platform summarizes documents and automates delivery in real time.</p>
          </div>
          <div className="card mt-10 overflow-hidden !p-0">
            <div className="aspect-video w-full">
              <iframe className="h-full w-full" src={youtubeEmbedUrl} title="AiFax Product Demo" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
            </div>
          </div>
        </section>
      )}

      {/* ═══ CAPABILITIES — cards with left accent ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="text-center">
          <p className="section-label">Platform</p>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Core Capabilities</h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--warm-gray)" }}>Everything you need to modernize fax operations, from intake to analytics.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <article key={title} className="card card-hover card-accent-left p-6 sm:p-7">
              <div className="icon-circle"><Icon className="h-5 w-5" style={{ color: "var(--gold-300)" }} /></div>
              <h3 className="heading-sans mt-4 text-lg">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--warm-gray)" }}>{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ ADVANTAGES — centered grid, different style ═══ */}
      <section className="relative overflow-hidden" style={{ background: "rgba(18,22,42,0.4)" }}>
        <div className="gold-divider" />
        <div className="section-shell py-20 sm:py-24">
          <div className="text-center">
            <p className="section-label">Advantages</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Why Leading Teams Choose AiFax</h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map(({ icon: Icon, title, text }) => (
              <div key={title} className="text-center">
                <div className="icon-circle mx-auto"><Icon className="h-5 w-5" style={{ color: "var(--gold-300)" }} /></div>
                <h3 className="heading-sans mt-4 text-base">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--warm-muted)" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* ═══ INTEGRATIONS ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="text-center">
          <p className="section-label">Integrations</p>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Connects With Your Stack</h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--warm-gray)" }}>No rip and replace — AiFax works with the tools your team already uses.</p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {integrations.map((n) => (
            <span key={n} className="inline-flex min-h-[44px] items-center rounded-full px-5 text-sm font-medium transition-colors" style={{ border: "1px solid rgba(245,240,232,0.08)", color: "var(--warm-gray)", background: "rgba(18,22,42,0.5)" }}>
              {n}
            </span>
          ))}
        </div>
        <p className="mt-5 text-center text-sm" style={{ color: "var(--warm-muted)" }}>
          Plus 40+ more via API and Zapier. <Link href="/solutions" style={{ color: "var(--gold-400)" }} className="hover:underline">See all integrations</Link>
        </p>
      </section>

      {/* ═══ TESTIMONIALS — pull-quote style ═══ */}
      <section className="relative overflow-hidden" style={{ background: "rgba(18,22,42,0.5)" }}>
        <div className="gold-divider" />
        <div className="section-shell py-20 sm:py-24">
          <div className="text-center">
            <p className="section-label">Testimonials</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">Trusted by Enterprise Teams</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <article key={t.author} className="card flex flex-col p-6 sm:p-7">
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((i) => <Star key={i} className="h-4 w-4" style={{ fill: "var(--gold-400)", color: "var(--gold-400)" }} />)}
                </div>
                <blockquote className="pull-quote mt-2 flex-1 text-sm leading-relaxed sm:text-base" style={{ color: "var(--warm-white)" }}>
                  {t.quote}
                </blockquote>
                <div className="mt-5" style={{ borderTop: "1px solid rgba(245,240,232,0.06)" }}>
                  <p className="mt-4 text-sm font-medium" style={{ color: "var(--warm-white)" }}>{t.author}</p>
                  <p className="text-xs" style={{ color: "var(--warm-muted)" }}>{t.company}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link href="/solutions" className="btn-light">Explore Solutions <ArrowRight className="h-4 w-4" /></Link>
            <Link href="/how-it-works" className="btn-secondary">See How It Works</Link>
          </div>
        </div>
        <div className="gold-divider" />
      </section>
    </main>
  );
}
