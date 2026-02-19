import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Phone, Settings, Send, BarChart3, ArrowRight, CheckCircle2 } from "lucide-react";

const workflow = [
  {
    step: "1",
    icon: Phone,
    title: "Onboard your fax channel",
    description: "Select a new number, keep your eFax line, or port your current number with guided activation.",
    details: [
      "Port existing numbers with zero downtime",
      "Assign dedicated lines per department or location",
      "Activate in under 24 hours"
    ]
  },
  {
    step: "2",
    icon: Settings,
    title: "Configure AI instructions",
    description: "Set custom prompts and extraction fields aligned to medical, legal, or operational requirements.",
    details: [
      "Define extraction fields for your document types",
      "Create custom summarization prompts",
      "Set routing rules by content or sender"
    ]
  },
  {
    step: "3",
    icon: Send,
    title: "Automate delivery",
    description: "Route summaries and extracted values to email, SMS, EHR/EMR/CRM, or internal systems instantly.",
    details: [
      "Deliver summaries via email, SMS, or webhook",
      "Push structured data to your CRM or EHR",
      "Trigger downstream workflows automatically"
    ]
  },
  {
    step: "4",
    icon: BarChart3,
    title: "Scale with analytics",
    description: "Track throughput, quality, and turnaround while refining prompts and rules over time.",
    details: [
      "Monitor processing volume and accuracy",
      "Identify bottlenecks and optimization opportunities",
      "Continuously improve AI models with feedback"
    ]
  }
];

const faqs = [
  {
    q: "How long does initial setup take?",
    a: "Most teams are fully operational within 1-2 business days. Our onboarding team handles the heavy lifting — from number porting to AI configuration."
  },
  {
    q: "Do I need to change my current fax number?",
    a: "No. You can port your existing number, use your eFax line, or set up a new dedicated number. We support all three approaches."
  },
  {
    q: "What systems can AiFax integrate with?",
    a: "AiFax connects with 50+ platforms including Epic, Cerner, Salesforce, HubSpot, Slack, Microsoft Teams, and more via direct API or Zapier."
  },
  {
    q: "Is my data secure and compliant?",
    a: "AiFax is built on a HIPAA-compliant architecture with end-to-end encryption. We also support SOX, GLBA, and PCI-DSS aligned workflows."
  },
  {
    q: "Can I customize the AI summarization?",
    a: "Yes. You define the extraction fields, summary format, and routing rules. Each workflow can have its own AI prompt tailored to your document types."
  }
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        title="How It Works"
        description="A practical deployment model that modernizes fax operations without disrupting your current teams or tools."
        kicker="4-Step Process"
      />

      {/* Workflow steps */}
      <section className="section-shell py-16 sm:py-20">
        <div className="text-center">
          <p className="section-label">Process</p>
          <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            From Legacy Fax to Intelligent Workflows
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-300">
            Get up and running with AI-powered fax processing in four straightforward steps.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {workflow.map((item) => (
            <article key={item.step} className="card-surface interactive p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <span className="step-number">{item.step}</span>
                <div className="icon-box">
                  <item.icon className="h-5 w-5 text-cyan-300" />
                </div>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.description}</p>
              <ul className="mt-4 space-y-2">
                {item.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400/60" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/contact" className="btn-primary">
            Start Implementation
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Compare Plans
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-white/[0.06] bg-slate-900/30">
        <div className="section-shell py-16 sm:py-20">
          <div className="text-center">
            <p className="section-label">FAQ</p>
            <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mx-auto mt-10 max-w-3xl space-y-3">
            {faqs.map((faq) => (
              <details key={faq.q} className="faq-item">
                <summary>{faq.q}</summary>
                <div className="faq-body">{faq.a}</div>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-slate-400">Still have questions?</p>
            <Link href="/contact" className="btn-primary mt-4">
              Contact Our Team
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
