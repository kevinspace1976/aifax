import { PageHero } from "@/components/page-hero";

const specialties = [
  "Customized AI Solutions",
  "Artificial Intelligence",
  "Document Reader",
  "Automation + API Integration",
  "Data Analytics Optimization"
];

export default function SpecialityPage() {
  return (
    <main>
      <PageHero
        title="Speciality"
        description="Customizable AI dashboards and integrations built to scale from quick wins to enterprise transformation."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-4 md:grid-cols-2">
          {specialties.map((item) => (
            <article key={item} className="rounded-2xl border border-white/10 bg-slate-900 p-5 text-lg">
              {item}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
