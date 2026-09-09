import type { Metadata } from "next";
import { PricingPlansGrid } from "@/components/pricing-plans-grid";
import { ADDITIONAL_PAGE_RATE, plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Pricing | AiFax",
  description: "Pay for pages, not seats. Every plan includes AI summaries, HIPAA-compliant delivery, a BAA at signup, and your number ported or new."
};

const notes = [
  {
    title: "Additional pages",
    body: `${ADDITIONAL_PAGE_RATE} each, on every plan. No overage surprises: you see usage on your dashboard.`
  },
  {
    title: "EHR integration",
    body: "A separate project, quoted after a written discovery with your EHR vendor. Founding-customer rates available."
  },
  {
    title: "Not sure which plan?",
    body: "Count last month's inbound and outbound pages together. A typical two-provider practice lands in Practice or Group."
  }
];

export default function PricingPage() {
  return (
    <main>
      <section className="section-shell pt-14 pb-6 sm:pt-16">
        <p className="kicker">Pricing</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-slate-900 sm:text-5xl">Pay for pages, not seats.</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
          Every plan includes AI summaries, HIPAA-compliant delivery, a BAA at signup, and your number ported or new.
          Month to month.
        </p>
      </section>

      <section className="section-shell py-8">
        <PricingPlansGrid plans={plans} />
      </section>

      <section className="section-shell pb-20">
        <div className="section-alt grid gap-6 rounded-2xl border border-slate-200 p-7 md:grid-cols-3">
          {notes.map((note) => (
            <div key={note.title}>
              <h2 className="text-lg text-slate-900">{note.title}</h2>
              <p className="mt-1.5 text-slate-700">{note.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
