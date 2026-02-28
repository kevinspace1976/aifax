import Link from "next/link";
import { PageHero } from "@/components/page-hero";

const values = [
  {
    title: "Committed",
    text: "Our leadership and engineering teams bring expertise across healthcare, SaaS, education, retail, legal, and real estate."
  },
  {
    title: "Innovative",
    text: "We connect isolated systems into cohesive workflows that reduce errors and unlock operational speed."
  },
  {
    title: "Creative",
    text: "We architect custom AI and automation around your goals, constraints, and growth trajectory."
  }
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About AiFax"
        description="We are an AI consulting and development partner focused on secure automation with measurable business impact."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-4 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="card-surface interactive p-6">
              <h2 className="text-xl font-semibold text-orange-300">{value.title}</h2>
              <p className="mt-3 text-slate-300">{value.text}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/speciality" className="btn-secondary">
            Explore Expertise
          </Link>
          <Link href="/contact" className="btn-primary">
            Talk With Our Team
          </Link>
        </div>
      </section>
    </main>
  );
}
