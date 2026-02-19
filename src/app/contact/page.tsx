import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  ShieldCheck,
  Clock,
  Headphones,
  Check,
  ArrowRight,
  Mail,
} from "lucide-react";

const services = [
  "Discovery + integration planning",
  "Secure onboarding and migration support",
  "Customized AI extraction and summarization",
  "KPI tracking for operational gains",
];

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    text: "All communications and data handled under strict compliance.",
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Our team responds to new inquiries within one business day.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Every account gets a named onboarding specialist.",
  },
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        description="Tell us your goals and we'll map a practical plan for AI fax automation, integration, and measurable ROI."
        kicker="Let's Connect"
      />

      {/* ═══ MAIN 2-COLUMN ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left column: service info + trust signals */}
          <div className="flex flex-col gap-6">
            <article className="card card-hover card-accent-left p-6 sm:p-8">
              <div className="gold-line" />
              <h2 className="heading-display mt-4 text-2xl sm:text-[1.75rem]">
                Let&apos;s architect your workflow
              </h2>
              <p
                className="mt-3 leading-relaxed"
                style={{ color: "var(--warm-gray)" }}
              >
                Share your current process, systems, and bottlenecks. We&apos;ll
                propose a rollout approach designed for rapid value.
              </p>
              <ul className="mt-6 space-y-3">
                {services.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(52,211,153,0.1)",
                        border: "1px solid rgba(52,211,153,0.2)",
                      }}
                    >
                      <Check
                        className="h-3 w-3"
                        style={{ color: "#6ee7b7" }}
                      />
                    </span>
                    <span style={{ color: "var(--warm-white)" }}>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/pricing" className="btn-secondary">
                  Review Pricing First
                </Link>
              </div>
            </article>

            {/* Trust signals */}
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {trustSignals.map((item) => (
                <div
                  key={item.title}
                  className="card card-hover flex items-start gap-4 p-5"
                >
                  <div className="icon-circle shrink-0">
                    <item.icon
                      className="h-5 w-5"
                      style={{ color: "var(--gold-300)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--warm-white)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--warm-muted)" }}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: form */}
          <form
            className="card card-raised space-y-5 p-6 sm:p-8"
            aria-label="Contact form"
          >
            <div>
              <div className="flex items-center gap-3">
                <div className="icon-circle">
                  <Mail
                    className="h-5 w-5"
                    style={{ color: "var(--gold-300)" }}
                  />
                </div>
                <h2 className="heading-sans text-xl">Send us a message</h2>
              </div>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--warm-muted)" }}
              >
                We&apos;ll respond within one business day.
              </p>
            </div>

            <div
              style={{
                borderTop: "1px solid rgba(245,240,232,0.06)",
                paddingTop: "1.25rem",
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--warm-white)" }}
                >
                  First Name
                  <input
                    className="form-input"
                    placeholder="Jane"
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label
                  className="block text-sm font-medium"
                  style={{ color: "var(--warm-white)" }}
                >
                  Last Name
                  <input
                    className="form-input"
                    placeholder="Smith"
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>
            </div>

            <label
              className="block text-sm font-medium"
              style={{ color: "var(--warm-white)" }}
            >
              Business Email
              <input
                type="email"
                className="form-input"
                placeholder="jane@company.com"
                autoComplete="email"
                required
              />
            </label>

            <label
              className="block text-sm font-medium"
              style={{ color: "var(--warm-white)" }}
            >
              Company
              <input
                className="form-input"
                placeholder="Acme Health Systems"
                autoComplete="organization"
              />
            </label>

            <label
              className="block text-sm font-medium"
              style={{ color: "var(--warm-white)" }}
            >
              Message
              <textarea
                className="form-textarea h-32"
                placeholder="Tell us about your current workflow, systems, and goals..."
                required
              />
            </label>

            <button type="button" className="btn-primary w-full justify-center">
              Send Message <ArrowRight className="h-4 w-4" />
            </button>

            <p
              className="text-center text-xs"
              style={{ color: "var(--warm-muted)" }}
            >
              By submitting, you agree to our privacy policy. We&apos;ll never
              share your information.
            </p>
          </form>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ═══ BOTTOM CTA ═══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "rgba(18,22,42,0.4)" }}
      >
        <div
          className="glow-orb"
          style={{
            width: 400,
            height: 300,
            top: -100,
            right: "10%",
            background: "rgba(212,165,60,0.04)",
          }}
          aria-hidden="true"
        />
        <div className="section-shell relative py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">Prefer to explore first?</p>
            <h2 className="heading-display mt-3 text-2xl sm:text-3xl">
              See how AiFax fits your workflow
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl"
              style={{ color: "var(--warm-gray)" }}
            >
              Browse our solutions, review pricing, or learn how our 4-step
              process works before reaching out.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link href="/how-it-works" className="btn-light">
                How It Works <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/solutions" className="btn-secondary">
                View Solutions
              </Link>
              <Link href="/pricing" className="btn-secondary">
                See Plans
              </Link>
            </div>
          </div>
        </div>
        <div className="gold-divider" />
      </section>
    </main>
  );
}
