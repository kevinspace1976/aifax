import { PageHero } from "@/components/page-hero";

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact"
        description="Tell us your goals and we’ll map a practical plan for AI fax automation, integration, and measurable ROI."
      />

      <section className="section-shell py-14 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="card-surface p-6">
            <h2 className="text-xl font-semibold text-white">Let’s architect your workflow</h2>
            <p className="mt-3 text-slate-300">
              Share your current process, systems, and bottlenecks. We’ll propose a rollout approach designed for rapid value.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>• Discovery + integration planning</li>
              <li>• Secure onboarding and migration support</li>
              <li>• Customized AI extraction and summarization</li>
            </ul>
          </article>

          <form className="card-surface space-y-4 p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <input className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="First Name" />
              <input className="rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="Last Name" />
            </div>
            <input className="w-full rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="Business Email" />
            <textarea className="h-36 w-full rounded-lg border border-white/15 bg-slate-950 px-4 py-3" placeholder="Tell us about your current workflow and goals" />
            <button type="button" className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white hover:bg-orange-400">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
