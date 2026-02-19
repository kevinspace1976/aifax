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
        description="From strategy to implementation, AiFax delivers practical AI capability that creates immediate business value."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-3">
          {offerings.map((offering) => (
            <article key={offering} className="card-surface p-5 text-slate-200">
              {offering}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
