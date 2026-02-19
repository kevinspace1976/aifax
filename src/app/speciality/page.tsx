import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Cpu, FileSearch, Plug, BarChart3, Rocket, ArrowRight, CheckCircle2 } from "lucide-react";

const offerings = [
  {
    icon: Cpu,
    title: "AI Solutions & Automation",
    description: "Customized AI solutions and rule-based process automation tailored to your document workflows.",
    color: "text-cyan-300",
    capabilities: [
      "Custom prompt engineering per workflow",
      "Rule-based routing and classification",
      "Multi-model AI orchestration",
      "Continuous model improvement"
    ]
  },
  {
    icon: FileSearch,
    title: "Document Intelligence",
    description: "Document intelligence with OCR + NLP and conversational reading for structured data extraction.",
    color: "text-blue-300",
    capabilities: [
      "High-accuracy OCR for handwritten and printed text",
      "NLP-powered entity extraction",
      "Document classification and tagging",
      "Structured data output in any format"
    ]
  },
  {
    icon: Plug,
    title: "API-First Integration",
    description: "API-first integration architecture across EHR/EMR/CRM ecosystems for seamless data flow.",
    color: "text-emerald-300",
    capabilities: [
      "RESTful API with webhook support",
      "Pre-built connectors for 50+ platforms",
      "Custom integration development",
      "Real-time bi-directional sync"
    ]
  },
  {
    icon: BarChart3,
    title: "Operational Analytics",
    description: "Operational analytics for throughput, quality, and cost reduction across your fax operations.",
    color: "text-orange-300",
    capabilities: [
      "Real-time processing dashboards",
      "Quality and accuracy metrics",
      "Cost per document tracking",
      "SLA compliance monitoring"
    ]
  },
  {
    icon: Rocket,
    title: "Enterprise Implementation",
    description: "Scalable implementation from quick wins to enterprise transformation with dedicated support.",
    color: "text-rose-300",
    capabilities: [
      "Phased rollout planning",
      "Change management support",
      "Training and documentation",
      "Dedicated customer success manager"
    ]
  }
];

const differentiators = [
  { label: "Domain Expertise", value: "Healthcare, Legal, Insurance, Enterprise" },
  { label: "Deployment Speed", value: "Production-ready in 1-2 business days" },
  { label: "Compliance Coverage", value: "HIPAA, SOX, GLBA, PCI-DSS" },
  { label: "Support Model", value: "24/7 dedicated team with named contacts" }
];

export default function SpecialityPage() {
  return (
    <main>
      <PageHero
        title="Our Specialities"
        description="From strategy to implementation, AiFax delivers practical AI capabilities that create immediate value."
        kicker="What We Do Best"
      />

      {/* Offerings grid */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Capabilities</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            End-to-End AI Fax Capabilities
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Each speciality is designed to deliver measurable ROI from day one.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <article
              key={item.title}
              className={`card-surface interactive p-6 sm:p-7 ${
                offerings.indexOf(item) >= 3 ? "lg:col-span-1" : ""
              }`}
            >
              <div className="icon-box">
                <item.icon className={`h-6 w-6 ${item.color}`} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.capabilities.map((cap) => (
                  <li key={cap} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/60" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Differentiators */}
      <section className="border-y border-white/[0.06] bg-slate-900/30">
        <div className="section-shell py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">Why AiFax</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              What Sets Us Apart
            </h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-2">
            {differentiators.map((item) => (
              <div key={item.label} className="card-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  {item.label}
                </p>
                <p className="mt-2 text-sm font-medium text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-shell py-16 sm:py-20">
        <div className="card-surface-raised p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h2 className="text-xl font-semibold text-white">Build your roadmap with us</h2>
            <p className="mt-2 text-slate-300">
              Start small or launch enterprise-wide — we&apos;ll prioritize high-ROI phases for rapid wins.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Link href="/contact" className="btn-primary">
              Plan My Rollout
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/pricing" className="btn-secondary">
              See Plans
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
