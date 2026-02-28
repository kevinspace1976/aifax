import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, Cpu, FileText, ShieldCheck, Star, Workflow } from "lucide-react";

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
    text: "Connect tools across intake, routing, communication, and care coordination for fewer handoffs and faster outcomes."
  },
  {
    icon: FileText,
    title: "Document Intelligence",
    text: "Convert incoming faxes into concise summaries and structured data using OCR + NLP workflows."
  },
  {
    icon: Cpu,
    title: "Hospital + EMR Data Integration",
    text: "Integrate faxing with hospital data and AI workflows for admission screening, provider practice support, and prior authorization."
  }
];

const partners = [
  { name: "OpenAI", src: "/logos/partners/openai.svg" },
  { name: "Telnyx", src: "/logos/partners/telnyx.svg" },
  { name: "Stripe", src: "/logos/partners/stripe.svg" },
  { name: "AWS", src: "/logos/partners/aws.svg" },
  { name: "DigitalOcean", src: "/logos/partners/digitalocean.svg" },
  { name: "GitHub", src: "/logos/partners/github.svg" },
  { name: "Google", src: "/logos/partners/google.svg" },
  { name: "Zoho", src: "/logos/partners/zoho.svg" },
  { name: "Microsoft", src: "/logos/partners/microsoft.svg" }
];
const skills = [
  { name: "AI Fax Solutions", score: 99 },
  { name: "Software Development", score: 96 },
  { name: "Artificial Intelligence", score: 97 },
  { name: "Document Reader", score: 95 },
  { name: "Web Development", score: 95 },
  { name: "App Development", score: 95 }
];

const faqs = [
  {
    q: "What is AiFax and how does it benefit my business?",
    a: "AiFax is a HIPAA-compliant AI-powered faxing solution for businesses of all sizes. It summarizes incoming faxes instantly and sends synopsis content to email, text, and optionally EHR/EMR/CRM systems. With AI, NLP, OCR, and API integrations, AiFax saves time, reduces errors, and minimizes patient or client delays."
  },
  {
    q: "How does AiFax ensure the security and compliance of my data?",
    a: "AiFax is compliance-first with HIPAA, GLBA, SOX, and GDPR-aligned workflows. We apply end-to-end encryption for data in transit and storage so sensitive information remains protected for healthcare, legal, and enterprise use cases."
  },
  {
    q: "Can AiFax integrate with my existing fax service or business software?",
    a: "Yes. AiFax supports new numbers, number porting, and integrations with existing tools including EHR, EMR, and CRM environments. We also support integration with major fax providers such as eFax for smooth implementation."
  },
  {
    q: "What types of businesses can benefit from AiFax?",
    a: "AiFax supports small businesses through large enterprises, especially healthcare, legal, finance, real estate, education, and operations teams handling high document volume."
  },
  {
    q: "How customizable is AiFax for my specific business needs?",
    a: "AiFax includes customizable dashboards and prompt logic so each team can define exactly how summaries, extraction rules, and comparisons should run for their specialty workflows."
  },
  {
    q: "How does AiFax handle the summarization of complex documents?",
    a: "Using advanced NLP + OCR, AiFax interprets complex files including tables, embedded images, and clear handwriting to produce concise, high-value summaries."
  },
  {
    q: "Can AiFax help my business scale as it grows?",
    a: "Yes. AiFax is built to scale from lower-volume teams to enterprise-level document operations while maintaining speed, consistency, and compliance."
  },
  {
    q: "How does AiFax contribute to improving operational efficiency?",
    a: "AiFax automates repetitive intake and review steps, provides instant summaries, and accelerates turnaround time for patient care and client requests while reducing avoidable delays."
  },
  {
    q: "What kind of customer support does AiFax offer?",
    a: "AiFax provides 24/7 customer support and guided onboarding so your team can keep operations smooth and uninterrupted."
  },
  {
    q: "Is AiFax suitable for small businesses as well as large enterprises?",
    a: "Absolutely. AiFax is flexible and scalable, designed to fit startups, clinics, practices, and enterprise organizations alike."
  },
  {
    q: "How does AiFax interact with my business documents in real-time?",
    a: "AiFax uses your configured prompts to process each incoming fax in real-time, answer specific extraction needs, and route actionable summaries instantly."
  },
  {
    q: "What makes AiFax different from other fax solutions?",
    a: "AiFax combines compliance-first architecture with advanced AI automation and integrations. Unlike legacy faxing, AiFax automates processing, summarizes instantly, and connects into operational systems."
  },
  {
    q: "Can AiFax generate and deliver summaries to multiple platforms simultaneously?",
    a: "Yes. Summaries can be delivered to email and SMS in real-time, and we support integration pathways for EHR/EMR and CRM channels."
  },
  {
    q: "How does AiFax ensure accuracy in document interpretation?",
    a: "AiFax applies NLP and OCR models designed to understand context and extract relevant details with high accuracy in seconds."
  },
  {
    q: "How quickly can AiFax be implemented into my business?",
    a: "New numbers can be provisioned quickly with immediate service access. Number porting can take up to 5 days depending on carrier workflows, with AiFax summaries available once porting is complete."
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
  const marqueeItems = [...partners, ...partners];

  return (
    <main>
      <section className="border-b border-white/10">
        <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              AI Fax Automation Built for <span className="brand-gradient">Modern Enterprise Teams</span>
            </h1>
            <p className="kicker mt-5">Proud Partner of eFax · Enterprise Ready</p>
            <p className="mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
              AiFax transforms legacy fax operations into secure, intelligent workflows with instant summaries, extraction,
              and direct integration into your business stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/pricing" className="btn-primary">
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
            <div className="mt-6 inline-block rounded-xl border border-white/10 bg-white/5 p-4">
              <p className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Global Partner</p>
              <Image src="/logos/efax.svg" alt="eFax logo" width={180} height={56} className="h-10 w-auto" priority />
            </div>
          </aside>
        </div>
      </section>

      <section className="section-shell py-12 sm:py-14">
        <p className="text-sm uppercase tracking-[0.15em] text-slate-400">Trusted Technology Providers</p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
          <div className="logo-marquee-track flex w-[200%] gap-6 p-6">
            {marqueeItems.map((item, index) => (
              <div
                key={`${item.name}-${index}`}
                className="inline-flex min-h-[88px] shrink-0 items-center rounded-lg border border-white/15 bg-slate-900/80 px-8"
              >
                <Image
                  src={item.src}
                  alt={item.name === "OpenAI" ? "OpenAI" : `${item.name} logo`}
                  width={160}
                  height={44}
                  className={item.name === "OpenAI" ? "mx-auto w-auto" : "h-16 w-auto"}
                  style={
                    item.name === "OpenAI"
                      ? { height: "48px", width: "auto", objectFit: "contain", imageRendering: "auto" }
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {youtubeEmbedUrl ? (
        <section className="section-shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">See AiFax in Action</h2>
          <p className="mt-2 max-w-3xl text-slate-300">Watch how our AI fax platform summarizes documents and automates delivery workflows in real time.</p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-lg shadow-slate-950/40">
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
          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Business <span className="text-orange-400">Success</span> With Technology</h2>
          <p className="mt-2 text-slate-300">Our skills</p>
          <div className="mt-6 space-y-4">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="mb-1 flex items-center justify-between text-sm text-slate-200">
                  <span>{skill.name}</span>
                  <span>{skill.score}%</span>
                </div>
                <div className="h-3 rounded-full bg-slate-700">
                  <div className="h-3 rounded-full bg-orange-500" style={{ width: `${skill.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-slate-300">
            We are a robust technology partner that integrates faxing with EMRs and hospital data pipelines while applying artificial intelligence for admission screening, provider practice support, prior authorization workflows, and high-volume document operations.
          </p>
        </div>
      </section>

      <section className="section-shell py-14 sm:py-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-3">
          {faqs.map((item) => (
            <details key={item.q} className="card-surface p-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-sm font-semibold text-white sm:text-base">
                {item.q}
                <ChevronDown className="h-4 w-4 shrink-0 text-slate-300" />
              </summary>
              <p className="pt-3 text-sm text-slate-300 sm:text-base">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50">
        <div className="section-shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Customer confidence</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {["AiFax helped our operations team cut intake turnaround time dramatically while improving consistency.", "We finally have a fax workflow that feels modern, measurable, and integrated with our CRM stack."].map((quote, i) => (
              <article key={quote} className="card-surface p-6">
                <Star className="h-5 w-5 text-orange-300" />
                <p className="mt-3 text-slate-200">“{quote}”</p>
                <p className="mt-3 text-sm text-slate-400">{i === 0 ? "Director of Operations, Multi-site Healthcare Group" : "COO, Regional Legal Services Firm"}</p>
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
