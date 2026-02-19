import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const sectors = [
  {
    title: "Healthcare",
    text: "Summarize referrals, lab results, and clinical communications to accelerate care coordination."
  },
  {
    title: "Legal",
    text: "Classify correspondence and route documents by matter, urgency, or client profile."
  },
  {
    title: "Insurance",
    text: "Automate claims intake and extraction while reducing processing delay and manual errors."
  },
  {
    title: "Enterprise Operations",
    text: "Unify data handoff across CRM, support, and back-office systems for end-to-end speed."
  }
];

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        title="Solutions"
        description="Industry-ready, API-first solutions for secure document intake, routing, and AI summarization."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {sectors.map((sector) => (
            <article key={sector.title} className="card-surface interactive p-6">
              <h2 className="text-xl font-semibold text-white">{sector.title}</h2>
              <p className="mt-2 text-slate-300">{sector.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 card-surface p-6">
          <h3 className="text-xl font-semibold text-white">Need a custom workflow?</h3>
          <p className="mt-2 text-slate-300">We design and deploy tailored AI + automation for specialized document and routing requirements.</p>
          <div className="mt-4">
            <Link href="/contact" className="btn-primary">
              Book a Solution Workshop
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
