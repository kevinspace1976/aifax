import { PageHero } from "@/components/page-hero";

const solutions = [
  "Healthcare: fax triage, chart-ready summaries, and secure distribution.",
  "Legal: classify incoming documents and route by case type.",
  "Insurance: automate intake, extraction, and policy workflows.",
  "SMBs & Enterprise: connect CRM, EHR, EMR, and internal APIs."
];

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        title="Solutions"
        description="Unify platforms for seamless workflows with integration-first AI fax automation."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-4">
          {solutions.map((solution) => (
            <article key={solution} className="rounded-xl border border-white/10 bg-slate-900 p-5 text-lg text-slate-200">
              {solution}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
