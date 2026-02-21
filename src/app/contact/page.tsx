import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact"
        description="Tell us your goals and we’ll map a practical plan for AI fax automation, integration, and measurable ROI."
      />

      <section className="section-shell py-14 sm:py-16">
        <article className="card-surface p-6">
          <h2 className="text-xl font-semibold text-white">Let’s architect your workflow.</h2>
          <p className="mt-3 text-slate-300">
            <a href="mailto:info@aifax.net" className="text-cyan-300 underline-offset-4 hover:underline">
              info@aifax.net
            </a>
          </p>
        </article>
      </section>
    </main>
  );
}
