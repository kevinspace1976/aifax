import { PageHero } from "@/components/page-hero";

const values = [
  {
    title: "Committed",
    text: "Our leadership and engineering teams bring deep expertise across healthcare, SaaS, education, retail, legal, and real estate."
  },
  {
    title: "Innovative",
    text: "We connect isolated systems into cohesive workflows that reduce errors and unlock operational speed."
  },
  {
    title: "Creative",
    text: "We design custom AI and automation solutions around your goals, constraints, and growth trajectory."
  }
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About AiFax"
        description="We’re a consulting and development company helping organizations scale with secure automation and applied AI."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="card-surface p-6">
              <h2 className="text-xl font-semibold text-orange-300">{value.title}</h2>
              <p className="mt-3 text-slate-300">{value.text}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
