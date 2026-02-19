import { PageHero } from "@/components/page-hero";

const sectors = [
  {
    title: "Healthcare",
    text: "Summarize referrals, lab results, and clinical communications to accelerate care coordination."
  },
  {
    title: "Legal",
    text: "Classify legal correspondence and route documents by matter, urgency, or client profile."
  },
  {
    title: "Insurance",
    text: "Automate claims intake and data extraction while reducing delay and manual keying errors."
  },
  {
    title: "Enterprise Operations",
    text: "Unify data handoff across CRM, support, and back-office systems for end-to-end process speed."
  }
];

export default function SolutionsPage() {
  return (
    <main>
      <PageHero
        title="Solutions"
        description="Built for organizations that need secure, scalable fax intelligence integrated directly into core business processes."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-4 md:grid-cols-2">
          {sectors.map((sector) => (
            <article key={sector.title} className="card-surface p-6">
              <h2 className="text-xl font-semibold text-white">{sector.title}</h2>
              <p className="mt-2 text-slate-300">{sector.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
