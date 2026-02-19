import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Heart, Scale, ShieldCheck, Building2, ArrowRight, Check } from "lucide-react";

const sectors = [
  {
    icon: Heart,
    title: "Healthcare",
    text: "Summarize referrals, lab results, and clinical communications to accelerate care coordination.",
    benefits: [
      "HIPAA-compliant document handling",
      "EHR/EMR integration (Epic, Cerner)",
      "Automated referral processing",
      "Clinical summary generation",
    ],
    stat: "60%",
    statLabel: "faster referral processing",
  },
  {
    icon: Scale,
    title: "Legal",
    text: "Classify correspondence and route documents by matter, urgency, or client profile.",
    benefits: [
      "Matter-based document routing",
      "Priority classification by urgency",
      "Client profile matching",
      "Automated intake summaries",
    ],
    stat: "4x",
    statLabel: "faster document intake",
  },
  {
    icon: ShieldCheck,
    title: "Insurance",
    text: "Automate claims intake and extraction while reducing processing delay and manual errors.",
    benefits: [
      "Claims data extraction",
      "Automated policy matching",
      "Compliance audit trails",
      "Fraud detection signals",
    ],
    stat: "75%",
    statLabel: "reduction in manual entry",
  },
  {
    icon: Building2,
    title: "Enterprise Operations",
    text: "Unify data handoff across CRM, support, and back-office systems for end-to-end speed.",
    benefits: [
      "CRM and helpdesk integration",
      "Cross-department routing",
      "Real-time analytics dashboards",
      "Custom workflow automation",
    ],
    stat: "50+",
    statLabel: "platform integrations",
  },
];

const useCases = [
  "Patient referral intake and routing",
  "Claims document processing and extraction",
  "Legal correspondence classification",
  "Multi-location fax consolidation",
  "Vendor and supplier communication",
  "Regulatory document archival",
];

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        title="Industry Solutions"
        description="Industry-ready, API-first solutions for secure document intake, routing, and AI summarization."
        kicker="Built for Your Industry"
      />

      {/* Industry cards */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Industries</p>
          <h2
            className="heading-display mt-3 text-2xl sm:text-3xl"
            style={{ color: "var(--warm-white)" }}
          >
            Purpose-Built for Regulated Industries
          </h2>
          <p
            className="mx-auto mt-3 max-w-2xl"
            style={{ color: "var(--warm-gray)" }}
          >
            Every solution is designed around the compliance, speed, and
            integration requirements of your sector.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {sectors.map((sector) => (
            <article
              key={sector.title}
              className="card card-hover card-accent-left p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div className="icon-circle">
                  <sector.icon
                    className="h-6 w-6"
                    style={{ color: "var(--gold-300)" }}
                  />
                </div>
                <div className="text-right">
                  <p
                    className="stat-value text-2xl font-bold"
                  >
                    {sector.stat}
                  </p>
                  <p className="stat-label text-xs">
                    {sector.statLabel}
                  </p>
                </div>
              </div>
              <h3
                className="heading-sans mt-4 text-xl font-semibold"
                style={{ color: "var(--warm-white)" }}
              >
                {sector.title}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--warm-gray)" }}
              >
                {sector.text}
              </p>
              <ul className="mt-4 space-y-2">
                {sector.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-sm"
                    style={{ color: "var(--warm-muted)" }}
                  >
                    <Check
                      className="mt-0.5 h-3.5 w-3.5 shrink-0"
                      style={{ color: "var(--gold-400)" }}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* Use cases */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Use Cases</p>
          <h2
            className="heading-display mt-3 text-2xl sm:text-3xl"
            style={{ color: "var(--warm-white)" }}
          >
            Common Workflows We Automate
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
          {useCases.map((item) => (
            <div key={item} className="card flex items-center gap-3 p-4">
              <Check
                className="h-4 w-4 shrink-0"
                style={{ color: "var(--gold-300)" }}
              />
              <span className="text-sm" style={{ color: "var(--warm-white)" }}>
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider" />

      {/* Custom workflow CTA */}
      <section className="section-shell py-16 sm:py-20">
        <div className="card-raised p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
          <div>
            <h3
              className="heading-sans text-xl font-semibold"
              style={{ color: "var(--warm-white)" }}
            >
              Need a custom workflow?
            </h3>
            <p className="mt-2" style={{ color: "var(--warm-gray)" }}>
              We design and deploy tailored AI + automation for specialized
              document and routing requirements.
            </p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
            <Link href="/contact" className="btn-primary">
              Book a Solution Workshop
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
