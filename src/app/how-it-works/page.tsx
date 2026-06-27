import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const workflow = [
  {
    step: "1",
    title: "Onboard your fax channel",
    description: "Select a new number, keep your existing line, or port your current number with guided activation."
  },
  {
    step: "2",
    title: "Configure AI instructions",
    description: "Set custom prompts and extraction fields aligned to medical, legal, or operational requirements."
  },
  {
    step: "3",
    title: "Automate delivery",
    description: "Route summaries and extracted values to email, SMS, EHR/EMR/CRM, or internal systems instantly."
  },
  {
    step: "4",
    title: "Scale with analytics",
    description: "Track throughput, quality, and turnaround while refining prompts and rules over time."
  }
];

export default function HowItWorksPage() {
  return (
    <main>
      <PageHero
        title="How It Works"
        description="A practical deployment model that modernizes fax operations without disrupting your current teams or tools."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {workflow.map((item) => (
            <article key={item.step} className="card-surface interactive p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-orange-300">Step {item.step}</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{item.title}</h2>
              <p className="mt-2 text-slate-300">{item.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/pricing" className="btn-primary">
            Start Implementation
          </Link>
          <Link href="/pricing" className="btn-secondary">
            Compare Plans
          </Link>
        </div>
      </section>
    </main>
  );
}
