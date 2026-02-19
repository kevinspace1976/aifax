import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const highlights = [
  "HIPAA compliant faxing for any sized business",
  "AI summaries sent to email, text, EHR/EMR/CRM",
  "Free API setup ($500 value)",
  "AI summary free for the first month"
];

export default function Home() {
  return (
    <main>
      <section className="border-b border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 md:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="inline-flex rounded-full border border-orange-300/30 bg-orange-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
              Proud partner of eFax
            </p>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Business Automation & AI Integration for Global Fax Operations.
            </h1>
            <p className="mt-5 max-w-2xl text-slate-300">
              Our patent-pending platform modernizes fax workflows with secure delivery, AI extraction, and custom summaries
              built around your business logic.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-400"
              >
                Schedule a Demo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/pricing" className="rounded-full border border-white/25 px-6 py-3 font-semibold hover:border-white">
                View Pricing
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 className="text-2xl font-semibold">Why choose AiFax</h2>
            <ul className="mt-6 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 md:px-10">
        <h2 className="text-3xl font-semibold md:text-4xl">Integrated AI Faxing Solutions For Any Sized Business</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <article className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">01 New Fax Customers</h3>
            <p className="mt-3 text-slate-300">Choose a new fax number by state, zip code, toll-free, or area code and start immediately.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">02 Current eFax Users</h3>
            <p className="mt-3 text-slate-300">Complete onboarding in 24–72 hours and continue using your existing number and eFax platform.</p>
          </article>
          <article className="rounded-2xl border border-white/10 bg-slate-900 p-6">
            <h3 className="text-xl font-semibold">03 Port Existing Numbers</h3>
            <p className="mt-3 text-slate-300">Port your number in as little as 5 days with guided support and uninterrupted operations.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
