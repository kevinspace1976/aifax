import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const offerings = [
  "Customized AI solutions and rule-based process automation",
  "Document intelligence with OCR + NLP and conversational reading",
  "API-first integration architecture across EHR/EMR/CRM ecosystems",
  "Operational analytics for throughput, quality, and cost reduction",
  "Scalable implementation from quick wins to enterprise transformation"
];

export default function SpecialityPage() {
  return (
    <main>
      <PageHero
        title="Speciality"
        description="From strategy to implementation, AiFax delivers practical AI capabilities that create immediate value."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-3">
          {offerings.map((offering) => (
            <article key={offering} className="card-surface interactive p-5 text-slate-200">
              {offering}
            </article>
          ))}
        </div>
        <div className="mt-8 card-surface p-6">
          <h2 className="text-xl font-semibold text-white">Build your roadmap with us</h2>
          <p className="mt-2 text-slate-300">Start small or launch enterprise-wide — we can prioritize high-ROI phases for rapid wins.</p>
          <div className="mt-4">
            <Link href="/contact" className="btn-primary">
              Plan My Rollout
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
