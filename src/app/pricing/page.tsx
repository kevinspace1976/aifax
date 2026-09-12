import type { Metadata } from "next";
import { PricingPlansGrid } from "@/components/pricing-plans-grid";
import { ADDITIONAL_PAGE_RATE, plans } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Pricing | AiFax",
  description: "Enterprise-grade fax automation priced for a private practice. Every fax read, summarized, and matched to the patient. HIPAA-compliant, plans from $9.99 a month, no contract."
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
    body: "Count last month's inbound and outbound pages together. A typical two-provider practice lands in Plus or Pro."
  }
];

// Illustrative exchange with an inbound referral. Not a real patient or fax.
const faxChatExamples = [
  {
    ask: "Who referred this patient and what is the callback number?",
    answer: "Referred by Dr. Anita Raghavan, Broward Cardiology Associates. Callback (954) 555-0173, fax (954) 555-0180."
  },
  {
    ask: "Is there a prior authorization number, and what insurance is listed?",
    answer: "Prior auth PA-4471902, approved through Nov 30. Insurance: Aetna Choice POS II, member ID W2249****, group 812446."
  },
  {
    ask: "What is the reason for referral and how urgent is it?",
    answer: "Evaluation of exertional chest pain with an abnormal stress echo. Marked urgent, see within 7 days. Notes request a prior ECG be sent back."
  }
];

export default function PricingPage() {
  return (
    <main>
      <section className="section-shell pt-8 pb-6 sm:pt-10">
        <p className="inline-flex text-xs font-bold uppercase tracking-[0.14em] text-orange-500 lg:text-sm">Pricing</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-slate-900 sm:text-5xl">
          Enterprise-grade fax automation, priced for a private practice.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
          Every fax read, summarized, and matched to the patient the moment it arrives. Fewer errors, fewer staff
          hours, HIPAA-compliant from day one. Plans start at $9.99 a month, no contract.
        </p>
      </section>

      <section className="section-shell pt-2 pb-4">
        <div className="rounded-2xl border border-orange-200 bg-orange-50 p-7">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-700">Included with Plus and above</p>
          <h2 className="mt-2 max-w-2xl text-2xl text-slate-900 sm:text-3xl">
            Chat with every fax you receive. Unlimited.
          </h2>
          <p className="mt-2 max-w-2xl text-slate-700">
            Nobody on your staff opens the fax. They ask it a question in plain English and get the answer in
            seconds. Every fax that arrives is ready to talk to the moment it lands.
          </p>

          <div className="mt-6 grid items-start gap-6 md:grid-cols-[1.35fr_1fr]">
            <ul className="flex flex-col gap-4">
              {faxChatExamples.map((turn) => (
                <li key={turn.ask} className="flex flex-col gap-1.5">
                  <p className="max-w-xl rounded-xl border border-orange-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-orange-900">
                    {turn.ask}
                  </p>
                  <p className="max-w-xl rounded-xl border border-stone-200 bg-white px-3.5 py-2.5 text-sm text-slate-700">
                    {turn.answer}
                  </p>
                </li>
              ))}
            </ul>

            <aside className="rounded-xl border border-stone-200 bg-white p-4">
              <h3 className="text-base text-slate-900">Also included: a reference library</h3>
              <p className="mt-1.5 text-sm text-slate-700">
                Separate from fax chat. Upload payer policies, a specialty guideline, a coding reference, or a
                journal article, and ask it questions weeks later. Question counts reset on the first of every
                calendar month.
              </p>
              <p className="mt-3 text-xs text-slate-500 tabular-nums">Plus 10 documents &middot; Pro 50 &middot; Enterprise 100</p>
            </aside>
          </div>
        </div>
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
