import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { ShieldCheck, Clock, Headphones, CheckCircle2 } from "lucide-react";

const services = [
  "Discovery + integration planning",
  "Secure onboarding and migration support",
  "Customized AI extraction and summarization",
  "KPI tracking for operational gains"
];

const trustSignals = [
  {
    icon: ShieldCheck,
    title: "HIPAA Compliant",
    text: "All communications and data handled under strict compliance."
  },
  {
    icon: Clock,
    title: "Fast Response",
    text: "Our team responds to new inquiries within one business day."
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    text: "Every account gets a named onboarding specialist."
  }
];

export default function ContactPage() {
  return (
    <main>
      <PageHero
        title="Contact Us"
        description="Tell us your goals and we'll map a practical plan for AI fax automation, integration, and measurable ROI."
        kicker="Let's Connect"
      />

      <section className="section-shell py-16 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column: info */}
          <div>
            <article className="card-surface p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-white">Let&apos;s architect your workflow</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                Share your current process, systems, and bottlenecks. We&apos;ll propose a rollout approach
                designed for rapid value.
              </p>
              <ul className="mt-5 space-y-3">
                {services.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Link href="/pricing" className="btn-secondary">
                  Review Pricing First
                </Link>
              </div>
            </article>

            {/* Trust signals */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {trustSignals.map((item) => (
                <div key={item.title} className="card-surface flex items-start gap-4 p-5">
                  <div className="icon-box shrink-0">
                    <item.icon className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: form */}
          <form className="card-surface-raised space-y-5 p-6 sm:p-8" aria-label="Contact form">
            <div>
              <h2 className="text-xl font-semibold text-white">Send us a message</h2>
              <p className="mt-1 text-sm text-slate-400">We&apos;ll respond within one business day.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-medium text-slate-200">
                First Name
                <input
                  className="form-input"
                  placeholder="Jane"
                  autoComplete="given-name"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-slate-200">
                Last Name
                <input
                  className="form-input"
                  placeholder="Smith"
                  autoComplete="family-name"
                  required
                />
              </label>
            </div>
            <label className="block text-sm font-medium text-slate-200">
              Business Email
              <input
                type="email"
                className="form-input"
                placeholder="jane@company.com"
                autoComplete="email"
                required
              />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Company
              <input
                className="form-input"
                placeholder="Acme Health Systems"
                autoComplete="organization"
              />
            </label>
            <label className="block text-sm font-medium text-slate-200">
              Message
              <textarea
                className="form-textarea h-32"
                placeholder="Tell us about your current workflow, systems, and goals..."
                required
              />
            </label>
            <button type="button" className="btn-primary w-full justify-center">
              Send Message
            </button>
            <p className="text-center text-xs text-slate-500">
              By submitting, you agree to our privacy policy. We&apos;ll never share your information.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
