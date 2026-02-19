import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  Heart,
  Lightbulb,
  Palette,
  Users,
  Target,
  TrendingUp,
  ArrowRight,
  Code2,
  Box,
  Headphones,
  Check,
} from "lucide-react";
import { stats, complianceBadges } from "@/lib/site";

const values = [
  {
    icon: Heart,
    title: "Committed",
    accent: "var(--gold-400)",
    text: "Our leadership and engineering teams bring expertise across healthcare, SaaS, education, retail, legal, and real estate. We invest in understanding your domain before writing a single line of code.",
  },
  {
    icon: Lightbulb,
    title: "Innovative",
    accent: "#6ee7b7",
    text: "We connect isolated systems into cohesive workflows that reduce errors and unlock operational speed. Our R&D team continuously pushes the boundaries of document AI.",
  },
  {
    icon: Palette,
    title: "Creative",
    accent: "#93c5fd",
    text: "We architect custom AI and automation around your goals, constraints, and growth trajectory. No cookie-cutter solutions -- every deployment is tailored to your stack.",
  },
];

const leadership = [
  {
    icon: Code2,
    role: "Engineering",
    description:
      "Full-stack AI engineers with deep expertise in NLP, OCR, and enterprise integration architecture.",
  },
  {
    icon: Box,
    role: "Product",
    description:
      "Product leaders from healthcare IT and legal tech who understand regulated environments firsthand.",
  },
  {
    icon: Headphones,
    role: "Customer Success",
    description:
      "Dedicated onboarding specialists who guide every deployment from pilot to production.",
  },
];

const milestones = [
  {
    year: "2023",
    event: "Founded with a mission to modernize fax for enterprise",
  },
  {
    year: "2024",
    event: "Launched AI summarization engine and eFax partnership",
  },
  {
    year: "2025",
    event: "Crossed 500K+ pages processed monthly across 50+ integrations",
  },
  {
    year: "2026",
    event: "Expanding into international markets and multi-language AI",
  },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About AiFax"
        description="We are an AI consulting and development partner focused on secure automation with measurable business impact."
      />

      {/* ═══ VALUES ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="text-center">
          <p className="section-label">Our Values</p>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
            What Drives Us
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl"
            style={{ color: "var(--warm-gray)" }}
          >
            Three principles guide every engagement, every deployment, and every
            line of code we ship.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <article
              key={v.title}
              className="card card-hover card-accent-top p-6 sm:p-7"
              style={
                {
                  "--card-accent": v.accent,
                } as React.CSSProperties
              }
            >
              <div className="icon-circle">
                <v.icon className="h-5 w-5" style={{ color: v.accent }} />
              </div>
              <h3 className="heading-sans mt-4 text-lg">{v.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--warm-gray)" }}
              >
                {v.text}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* ═══ STATS BAR ═══ */}
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

      {/* ═══ MISSION — 2-column ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="section-label">Our Mission</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
              Modernizing Document Operations for Regulated Industries
            </h2>
            <p
              className="mt-5 leading-relaxed"
              style={{ color: "var(--warm-gray)" }}
            >
              Fax remains a critical communication channel for healthcare, legal,
              and insurance teams -- but the technology around it hasn&apos;t
              kept pace. AiFax was founded to bridge that gap: bringing
              AI-powered intelligence, automation, and integration to an
              essential but outdated workflow.
            </p>
            <p
              className="mt-4 leading-relaxed"
              style={{ color: "var(--warm-gray)" }}
            >
              We believe every organization deserves enterprise-grade document
              operations -- without the enterprise-grade complexity. Our platform
              is built for teams who need compliance, speed, and measurable ROI
              from day one.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {complianceBadges.map((b) => (
                <span key={b} className="badge-compliance">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {[
              {
                icon: Target,
                label: "Mission",
                value: "Eliminate manual fax processing globally",
              },
              {
                icon: Users,
                label: "Customers",
                value: "Healthcare, legal, insurance, and enterprise",
              },
              {
                icon: TrendingUp,
                label: "Growth",
                value: "2x customer base year over year",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="card card-hover card-accent-left flex items-start gap-4 p-5"
              >
                <div className="icon-circle shrink-0">
                  <item.icon
                    className="h-5 w-5"
                    style={{ color: "var(--gold-300)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--warm-muted)" }}
                  >
                    {item.label}
                  </p>
                  <p
                    className="mt-1 text-sm font-medium"
                    style={{ color: "var(--warm-white)" }}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ═══ TEAM ═══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "rgba(18,22,42,0.4)" }}
      >
        <div className="section-shell py-20 sm:py-24">
          <div className="text-center">
            <p className="section-label">Our Team</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
              Built by Industry Veterans
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl"
              style={{ color: "var(--warm-gray)" }}
            >
              Our team combines deep domain expertise with cutting-edge AI
              engineering.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {leadership.map((item) => (
              <article
                key={item.role}
                className="card card-hover card-gold p-6 sm:p-7 text-center"
              >
                <div className="icon-circle mx-auto">
                  <item.icon
                    className="h-5 w-5"
                    style={{ color: "var(--gold-300)" }}
                  />
                </div>
                <h3
                  className="heading-sans mt-4 text-lg"
                  style={{ color: "var(--gold-400)" }}
                >
                  {item.role}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "var(--warm-gray)" }}
                >
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="text-center">
          <p className="section-label">Journey</p>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
            Our Story So Far
          </h2>
          <p
            className="mx-auto mt-4 max-w-xl"
            style={{ color: "var(--warm-gray)" }}
          >
            From an idea to an enterprise platform processing hundreds of
            thousands of pages every month.
          </p>
        </div>
        <div className="mx-auto mt-12 grid max-w-2xl gap-5">
          {milestones.map((item) => (
            <div
              key={item.year}
              className="card card-hover flex items-start gap-5 p-5"
            >
              <span className="step-badge shrink-0">{item.year}</span>
              <div>
                <p
                  className="text-sm leading-relaxed sm:text-base"
                  style={{ color: "var(--warm-white)" }}
                >
                  {item.event}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* ═══ CTA ═══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "rgba(18,22,42,0.5)" }}
      >
        <div
          className="glow-orb"
          style={{
            width: 500,
            height: 350,
            bottom: -120,
            left: "50%",
            marginLeft: -250,
            background: "rgba(212,165,60,0.05)",
          }}
          aria-hidden="true"
        />
        <div className="section-shell relative py-20 sm:py-24">
          <div className="card card-raised p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
            <div>
              <div className="gold-line" />
              <h2 className="heading-display mt-4 text-2xl sm:text-3xl">
                Ready to modernize your fax operations?
              </h2>
              <p
                className="mt-3 max-w-xl"
                style={{ color: "var(--warm-gray)" }}
              >
                Start small or launch enterprise-wide -- our team will
                prioritize high-ROI phases for rapid wins.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Link href="/contact" className="btn-primary">
                Talk With Our Team <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/speciality" className="btn-secondary">
                Explore Expertise
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
