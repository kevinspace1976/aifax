import { PageHero } from "@/components/page-hero";

export default function AboutPage() {
  return (
    <main>
      <PageHero
        title="About AiFax"
        description="We blend SaaS engineering, AI innovation, and compliance-first thinking to modernize business operations."
      />
      <section className="mx-auto max-w-7xl px-6 py-16 md:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-orange-400">Committed</h2>
            <p className="mt-3 text-slate-300">Our team has real-world depth in healthcare, SaaS, retail, real estate, legal, and more.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-orange-400">Innovative</h2>
            <p className="mt-3 text-slate-300">We unify disconnected systems into efficient, error-free workflows.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h2 className="text-xl font-semibold text-orange-400">Creative</h2>
            <p className="mt-3 text-slate-300">If you can imagine it, we can design and build it with automation and AI.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
