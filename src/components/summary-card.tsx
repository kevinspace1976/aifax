import { CheckCircle2 } from "lucide-react";

/**
 * What a practice receives for every fax, shown with the synthetic test
 * patient used during onboarding (Vega, Elena Marisol). Never a real record.
 */
export function SummaryCard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between border-b border-slate-200 bg-[var(--ground-alt)] px-5 py-3 text-sm">
        <span className="font-bold text-slate-900">Fax received 09:38</span>
        <span className="text-slate-500">4 pages from 208-555-0142</span>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <div className="flex items-start gap-2.5">
          <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
          <div>
            <p className="font-bold text-slate-900">Patient: Vega, Elena Marisol</p>
            <p className="text-sm text-slate-500">DOB 03/14/1968 &middot; Strong match &middot; DOB and surname printed on page 1</p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500">AI summary</p>
          <p className="mt-1.5 text-[15px] text-slate-700">
            ER discharge summary, chest pain evaluation. Troponin negative, EKG unremarkable. Discharged with instructions
            to follow up with primary care within 1 week. New Rx: none.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 text-sm">
          {["Hospital records", "Follow-up needed", "Emailed to your office"].map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 px-2.5 py-1 text-slate-700">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-slate-200 px-5 py-2.5 text-sm text-slate-500">
        Synthetic test patient. What your office receives for every fax.
      </div>
    </div>
  );
}
