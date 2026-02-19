import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Heart, Lightbulb, Palette, Users, Target, TrendingUp, ArrowRight } from "lucide-react";
import { stats } from "@/lib/site";

const values = [
  {
    icon: Heart,
    title: "Committed",
    text: "Our leadership and engineering teams bring expertise across healthcare, SaaS, education, retail, legal, and real estate. We invest in understanding your domain before writing a single line of code.",
    color: "text-rose-300"
  },
  {
    icon: Lightbulb,
    title: "Innovative",
    text: "We connect isolated systems into cohesive workflows that reduce errors and unlock operational speed. Our R&D team continuously pushes the boundaries of document AI.",
    color: "text-cyan-300"
  },
  {
    icon: Palette,
    title: "Creative",
    text: "We architect custom AI and automation around your goals, constraints, and growth trajectory. No cookie-cutter solutions — every deployment is tailored.",
    color: "text-orange-300"
  }
];

const leadership = [
  {
    role: "Engineering",
    description: "Full-stack AI engineers with deep expertise in NLP, OCR, and enterprise integration architecture."
  },
  {
    role: "Product",
    description: "Product leaders from healthcare IT and legal tech who understand regulated environments firsthand."
  },
  {
    role: "Customer Success",
    description: "Dedicated onboarding specialists who guide every deployment from pilot to production."
  }
];

const milestones = [
  { year: "2023", event: "Founded with a mission to modernize fax for enterprise" },
  { year: "2024", event: "Launched AI summarization engine and eFax partnership" },
  { year: "2025", event: "Crossed 500K+ pages processed monthly across 50+ integrations" },
  { year: "2026", event: "Expanding into international markets and multi-language AI" }
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About AiFax"
        description="We are an AI consulting and development partner focused on secure automation with measurable business impact."
      />

      {/* Values */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Our Values</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            What Drives Us
          </h2>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="card-surface interactive p-6 sm:p-7">
              <div className="icon-box">
                <value.icon className={`h-6 w-6 ${value.color}`} />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] bg-slate-900/40">
        <div className="section-shell grid grid-cols-2 gap-6 py-10 sm:py-12 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="stat-number">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label">Our Mission</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Modernizing Document Operations for Regulated Industries
            </h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              Fax remains a critical communication channel for healthcare, legal, and insurance teams — but the technology
              around it hasn&apos;t kept pace. AiFax was founded to bridge that gap: bringing AI-powered intelligence,
              automation, and integration to an essential but outdated workflow.
            </p>
            <p className="mt-3 leading-relaxed text-slate-300">
              We believe every organization deserves enterprise-grade document operations — without the enterprise-grade
              complexity. Our platform is built for teams who need compliance, speed, and measurable ROI from day one.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { icon: Target, label: "Mission", value: "Eliminate manual fax processing globally" },
              { icon: Users, label: "Customers", value: "Healthcare, legal, insurance, and enterprise" },
              { icon: TrendingUp, label: "Growth", value: "2x customer base year over year" }
            ].map((item) => (
              <div key={item.label} className="card-surface flex items-start gap-4 p-5">
                <div className="icon-box-orange shrink-0">
                  <item.icon className="h-5 w-5 text-orange-300" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{item.label}</p>
                  <p className="mt-1 text-sm font-medium text-white">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-y border-white/[0.06] bg-slate-900/30">
        <div className="section-shell py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">Our Team</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Built by Industry Veterans
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Our team combines deep domain expertise with cutting-edge AI engineering.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {leadership.map((item) => (
              <article key={item.role} className="card-surface p-6">
                <h3 className="text-lg font-semibold text-orange-300">{item.role}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Journey</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Our Story So Far
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl gap-4">
          {milestones.map((item) => (
            <div key={item.year} className="card-surface flex items-start gap-4 p-5">
              <span className="step-number shrink-0 text-xs">{item.year}</span>
              <p className="text-sm text-slate-200 sm:text-base">{item.event}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/speciality" className="btn-secondary">
            Explore Expertise
          </Link>
          <Link href="/contact" className="btn-primary">
            Talk With Our Team
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
