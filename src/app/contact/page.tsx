import Link from "next/link";
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
              <li>• KPI tracking for operational gains</li>
            </ul>
            <div className="mt-5">
              <Link href="/pricing" className="btn-secondary">
                Review Pricing First
              </Link>
            </div>
          </article>

          <form className="card-surface space-y-4 p-6" aria-label="Contact form">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm text-slate-200">
                First Name
                <input className="mt-1 min-h-11 w-full rounded-lg border border-white/15 bg-slate-950 px-4" placeholder="First Name" />
              </label>
              <label className="text-sm text-slate-200">
                Last Name
                <input className="mt-1 min-h-11 w-full rounded-lg border border-white/15 bg-slate-950 px-4" placeholder="Last Name" />
              </label>
            </div>
            <label className="text-sm text-slate-200">
              Business Email
              <input className="mt-1 min-h-11 w-full rounded-lg border border-white/15 bg-slate-950 px-4" placeholder="name@company.com" />
            </label>
            <label className="text-sm text-slate-200">
              Message
              <textarea
                className="mt-1 h-36 w-full rounded-lg border border-white/15 bg-slate-950 px-4 py-3"
                placeholder="Tell us about your current workflow, systems, and goals"
              />
            </label>
            <button type="button" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
