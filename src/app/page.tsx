import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronDown, Cpu, FileText, ShieldCheck, Star, Workflow } from "lucide-react";
import { VideoCard } from "@/components/video-card";

const trustPoints = [
  "EHR integration available - AI summaries delivered into email, SMS, EHR/EMR, or CRM, scoped to your workflow",
  "Scales with you - one provider or fifty, same platform, no new staff to hire",
  "HIPAA-compliant architecture, secure transmission, BAA executed at signup",
  "Custom AI prompts and extraction logic per workflow - your practice, your rules"
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

const manualSteps = [
  "Open and read every fax",
  "Identify the patient and document type",
  "Download and rename the file",
  "Create or locate the patient chart",
  "Upload or route the document",
  "Notify the appropriate provider",
  "Remember which items still require follow-up"
];

const automationSteps = [
  {
    step: "1",
    title: "Receive",
    text: "Your incoming fax arrives through your existing or new fax number."
  },
  {
    step: "2",
    title: "Read",
    text: "AI reads the document and extracts patient identifiers, sender information, document type, and relevant clinical details."
  },
  {
    step: "3",
    title: "Summarize",
    text: "A custom summary is created using instructions designed around your practice and specialty."
  },
  {
    step: "4",
    title: "Route",
    text: "The fax and summary are delivered through the best workflow supported by your EHR - such as an available API, interface, secure inbox, email, or assisted charting process."
  },
  {
    step: "5",
    title: "Verify",
    text: "Documents that cannot be confidently identified can be flagged for review instead of being silently misfiled."
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
    a: "Yes. AiFax supports new numbers, number porting, and integrations with existing tools including EHR, EMR, and CRM environments. We also support integration with major fax providers for smooth implementation."
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
        <div className="section-shell grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="kicker">Fax-to-EHR Automation for Independent Practices</p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Stop Manually Moving Faxes Into Your EHR.{" "}
              <span className="block text-sky-400">Every Fax, Read by AI.</span>
              <span className="block text-orange-400">Every Document Routed With Purpose.</span>
            </h1>
            <ul className="mt-6 max-w-2xl space-y-3 text-base text-slate-300 sm:text-lg">
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-orange-400">&#10007;</span>
                <span>Hours of payroll burned every day opening, reading, and filing faxes</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-orange-400">&#10007;</span>
                <span>Results and referrals slipping through the cracks - quality gaps your quality scores remember</span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-emerald-300">&#10003;</span>
                <span>
                  <strong className="text-white">AiFax reads every inbound fax the moment it lands</strong> - summarized,
                  patient name and DOB labeled
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-emerald-300">&#10003;</span>
                <span>
                  Routed into the workflow you already run - <strong className="text-white">EHR integration available</strong>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-emerald-300">&#10003;</span>
                <span>
                  Solo practice or multi-site group - same platform, same speed,{" "}
                  <strong className="text-white">no new headcount</strong>
                </span>
              </li>
            </ul>
            <div className="mt-11 flex flex-wrap gap-3">
              <Link href="/ehr-integration" className="btn-primary">
                See My EHR Integration Options <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/contact" className="btn-accent">
                Schedule a Workflow Review
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See Plans
              </Link>
            </div>
            <p className="mt-5 text-sm text-slate-400">
              Keep your current fax number &middot; Practice-specific AI summaries &middot; HIPAA-compliant architecture
            </p>
          </div>

          <div className="space-y-6">
            {youtubeEmbedUrl ? <VideoCard embedUrl={youtubeEmbedUrl} /> : null}
          </div>
        </div>

        <div className="section-shell pb-16 sm:pb-20">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Your Fax Inbox Should Not Be a <span className="text-orange-400">Second Medical-Record System.</span>
          </h2>
          <p className="mt-3 text-slate-300">
            Every incoming result, referral, medical record, authorization, and clinical document must eventually reach
            the correct patient workflow. Without automation, your staff must:
          </p>
          <ul className="mt-5 grid gap-2 text-slate-300 sm:grid-cols-2 lg:grid-cols-4">
            {manualSteps.map((step) => (
              <li key={step} className="flex items-start gap-3">
                <span aria-hidden="true" className="mt-0.5 font-bold text-orange-400">&#10007;</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-slate-300">
            Every manual handoff adds time, delay, and the possibility of an overlooked result, incorrect patient match,
            or filing error.
          </p>
          <p className="mt-3 text-lg font-semibold text-white">
            AiFax turns incoming faxes into organized, summarized, EHR-ready documents - before they become another task
            for your staff.
          </p>
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

      <section className="section-shell py-14 sm:py-16">
        <p className="max-w-4xl text-lg leading-relaxed text-slate-200 sm:text-xl">
          AiFax identifies the patient, recognizes the document type, creates your practice-specific summary, and routes
          the fax through the best available EHR workflow -{" "}
          <strong className="text-white">reducing manual review, filing delays, and avoidable errors.</strong>
        </p>
        <aside className="card-surface interactive mt-8 p-6 sm:p-8" aria-label="Trust points">
          <h2 className="text-xl font-semibold text-white sm:text-2xl">Why practices switch to AiFax</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm text-slate-200 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="border-y border-white/10 bg-slate-900/50">
        <div className="section-shell py-14 sm:py-16">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">What AiFax Automates</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {automationSteps.map(({ step, title, text }) => (
              <article key={title} className="card-surface interactive p-5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-white">
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
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">Built Around the EHR You Already Use</h2>
        <p className="mt-3 max-w-3xl text-slate-300">
          AiFax works with independent practices using Practice Fusion, Office Ally, and other EHR platforms.
        </p>
        <p className="mt-3 max-w-3xl text-slate-300">
          Because every EHR provides different integration capabilities, we evaluate the interfaces and workflow options
          available to your practice, then automate the most effective path for receiving, identifying, summarizing, and
          routing faxed documents.
        </p>
        <p className="mt-4 max-w-3xl font-semibold text-white">
          You do not have to replace your EHR - or abandon your existing fax number - to improve the workflow.
        </p>
        <div className="mt-6">
          <Link href="/ehr-integration" className="btn-primary">
            See My EHR Integration Options <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
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
