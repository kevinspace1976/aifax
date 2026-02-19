import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import {
  Phone,
  Settings,
  Send,
  BarChart3,
  ArrowRight,
  Check,
  MessageCircleQuestion,
} from "lucide-react";

const workflow = [
  {
    step: "1",
    icon: Phone,
    title: "Onboard your fax channel",
    description:
      "Select a new number, keep your eFax line, or port your current number with guided activation.",
    details: [
      "Port existing numbers with zero downtime",
      "Assign dedicated lines per department or location",
      "Activate in under 24 hours",
    ],
  },
  {
    step: "2",
    icon: Settings,
    title: "Configure AI instructions",
    description:
      "Set custom prompts and extraction fields aligned to medical, legal, or operational requirements.",
    details: [
      "Define extraction fields for your document types",
      "Create custom summarization prompts",
      "Set routing rules by content or sender",
    ],
  },
  {
    step: "3",
    icon: Send,
    title: "Automate delivery",
    description:
      "Route summaries and extracted values to email, SMS, EHR/EMR/CRM, or internal systems instantly.",
    details: [
      "Deliver summaries via email, SMS, or webhook",
      "Push structured data to your CRM or EHR",
      "Trigger downstream workflows automatically",
    ],
  },
  {
    step: "4",
    icon: BarChart3,
    title: "Scale with analytics",
    description:
      "Track throughput, quality, and turnaround while refining prompts and rules over time.",
    details: [
      "Monitor processing volume and accuracy",
      "Identify bottlenecks and optimization opportunities",
      "Continuously improve AI models with feedback",
    ],
  },
];

const faqs = [
  {
    q: "How long does initial setup take?",
    a: "Most teams are fully operational within 1-2 business days. Our onboarding team handles the heavy lifting -- from number porting to AI configuration.",
  },
  {
    q: "Do I need to change my current fax number?",
    a: "No. You can port your existing number, use your eFax line, or set up a new dedicated number. We support all three approaches.",
  },
  {
    q: "What systems can AiFax integrate with?",
    a: "AiFax connects with 50+ platforms including Epic, Cerner, Salesforce, HubSpot, Slack, Microsoft Teams, and more via direct API or Zapier.",
  },
  {
    q: "Is my data secure and compliant?",
    a: "AiFax is built on a HIPAA-compliant architecture with end-to-end encryption. We also support SOX, GLBA, and PCI-DSS aligned workflows.",
  },
  {
    q: "Can I customize the AI summarization?",
    a: "Yes. You define the extraction fields, summary format, and routing rules. Each workflow can have its own AI prompt tailored to your document types.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        title="How It Works"
        description="A practical deployment model that modernizes fax operations without disrupting your current teams or tools."
        kicker="4-Step Process"
      />

      {/* ═══ WORKFLOW STEPS ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="text-center">
          <p className="section-label">Process</p>
          <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
            From Legacy Fax to Intelligent Workflows
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl"
            style={{ color: "var(--warm-gray)" }}
          >
            Get up and running with AI-powered fax processing in four
            straightforward steps.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {workflow.map((item) => (
            <article
              key={item.step}
              className="card card-hover p-6 sm:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="step-badge">{item.step}</span>
                <div className="icon-circle">
                  <item.icon
                    className="h-5 w-5"
                    style={{ color: "var(--gold-300)" }}
                  />
                </div>
              </div>
              <h3 className="heading-sans mt-5 text-lg">{item.title}</h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{ color: "var(--warm-gray)" }}
              >
                {item.description}
              </p>
              <ul className="mt-5 space-y-2.5">
                {item.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <span
                      className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full"
                      style={{
                        background: "rgba(52,211,153,0.1)",
                        border: "1px solid rgba(52,211,153,0.2)",
                      }}
                    >
                      <Check
                        className="h-2.5 w-2.5"
                        style={{ color: "#6ee7b7" }}
                      />
                    </span>
                    <span style={{ color: "var(--warm-muted)" }}>
                      {detail}
                    </span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            Start Implementation <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Compare Plans
          </Link>
        </div>
      </section>

      <div className="gold-divider" />

      {/* ═══ FAQ ═══ */}
      <section
        className="relative overflow-hidden"
        style={{ background: "rgba(18,22,42,0.4)" }}
      >
        <div
          className="glow-orb"
          style={{
            width: 600,
            height: 400,
            top: -150,
            left: "60%",
            background: "rgba(212,165,60,0.04)",
          }}
          aria-hidden="true"
        />
        <div className="section-shell relative py-20 sm:py-24">
          <div className="text-center">
            <p className="section-label">FAQ</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p
              className="mx-auto mt-4 max-w-xl"
              style={{ color: "var(--warm-gray)" }}
            >
              Answers to the questions we hear most from new teams evaluating
              AiFax.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <div className="faq-body">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
        <div className="gold-divider" />
      </section>

      {/* ═══ STILL HAVE QUESTIONS CTA ═══ */}
      <section className="section-shell py-20 sm:py-24">
        <div className="card card-raised p-8 sm:p-10 text-center">
          <div className="icon-circle mx-auto">
            <MessageCircleQuestion
              className="h-5 w-5"
              style={{ color: "var(--gold-300)" }}
            />
          </div>
          <h2 className="heading-display mt-5 text-2xl sm:text-3xl">
            Still have questions?
          </h2>
          <p
            className="mx-auto mt-3 max-w-lg"
            style={{ color: "var(--warm-gray)" }}
          >
            Our team is ready to walk you through a tailored demo and answer any
            questions about implementation, compliance, or integrations.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="btn-primary">
              Contact Our Team <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/solutions" className="btn-light">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
