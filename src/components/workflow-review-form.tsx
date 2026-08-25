"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const EHR_OPTIONS = [
  "Epic",
  "eClinicalWorks",
  "athenahealth",
  "Oracle Health / Cerner",
  "NextGen Healthcare",
  "ModMed / Modernizing Medicine",
  "Veradigm / Allscripts",
  "Practice Fusion",
  "Nextech Systems",
  "Greenway Health",
  "MEDITECH",
  "Tebra / Kareo",
  "Office Ally",
  "AdvancedMD",
  "CareCloud",
  "Elation Health",
  "CureMD",
  "RXNT",
  "DrChrono",
  "Amazing Charts",
  "Other / not sure"
];

const VOLUME_OPTIONS = [
  "Under 100 pages a month",
  "100 - 500 pages a month",
  "500 - 1,500 pages a month",
  "1,500 - 3,000 pages a month",
  "Over 3,000 pages a month"
];

const CONTACT_WINDOWS = ["Morning", "Midday", "Afternoon", "Evening"];

const FIELD =
  "mt-1 w-full rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-sm text-white " +
  "placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-300";
const LABEL = "block text-sm font-medium text-slate-200";

export function WorkflowReviewForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim() || "Not provided";

    const body = [
      `Name: ${value("name")}`,
      `Practice: ${value("practice")}`,
      `Email: ${value("email")}`,
      `Phone: ${value("phone")}`,
      `EHR platform: ${value("ehr")}`,
      `Current fax provider: ${value("faxProvider")}`,
      `Current fax number: ${value("faxNumber")}`,
      `Monthly fax volume: ${value("volume")}`,
      `Best time to call: ${value("callWindow")}`,
      "",
      "What they want to solve:",
      value("notes")
    ].join("\n");

    const subject = `Workflow review request - ${value("practice")}`;
    window.location.href =
      `mailto:info@aifax.net?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-white sm:text-2xl">Schedule a Workflow Review</h2>
      <p className="mt-2 text-sm text-slate-300">
        Tell us how faxes reach your practice today. We will map the best route into your EHR and follow up with
        practical options. No obligation.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="name">Your name</label>
          <input id="name" name="name" required className={FIELD} placeholder="First and last name" />
        </div>
        <div>
          <label className={LABEL} htmlFor="practice">Practice name</label>
          <input id="practice" name="practice" required className={FIELD} placeholder="Practice or organization" />
        </div>
        <div>
          <label className={LABEL} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className={FIELD} placeholder="you@practice.com" />
        </div>
        <div>
          <label className={LABEL} htmlFor="phone">Phone</label>
          <input id="phone" name="phone" className={FIELD} placeholder="Best number to reach you" />
        </div>
        <div>
          <label className={LABEL} htmlFor="ehr">EHR platform</label>
          <select id="ehr" name="ehr" className={FIELD} defaultValue="">
            <option value="" disabled>Select your EHR</option>
            {EHR_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="faxProvider">Current fax provider</label>
          <input id="faxProvider" name="faxProvider" className={FIELD} placeholder="eFax, RingCentral, analog line..." />
        </div>
        <div>
          <label className={LABEL} htmlFor="faxNumber">Current fax number</label>
          <input id="faxNumber" name="faxNumber" className={FIELD} placeholder="Optional" />
        </div>
        <div>
          <label className={LABEL} htmlFor="volume">Monthly fax volume</label>
          <select id="volume" name="volume" className={FIELD} defaultValue="">
            <option value="" disabled>Select a range</option>
            {VOLUME_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL} htmlFor="callWindow">Best time to call</label>
          <select id="callWindow" name="callWindow" className={FIELD} defaultValue="">
            <option value="" disabled>Select a window</option>
            {CONTACT_WINDOWS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="notes">What would you like to solve first?</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className={FIELD}
            placeholder="For example: faxed results have to be downloaded and filed into the chart by hand every day."
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Please do not include patient health information in this form.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" className="btn-primary">
          Send My Request <Send className="ml-2 h-4 w-4" />
        </button>
        <span className="text-sm text-slate-400">
          Prefer email?{" "}
          <a href="mailto:info@aifax.net" className="text-cyan-300 underline-offset-4 hover:underline">
            info@aifax.net
          </a>
        </span>
      </div>

      {sent ? (
        <p className="mt-4 rounded-lg border border-cyan-300/40 bg-cyan-400/10 p-3 text-sm text-cyan-100">
          Your email app should now be open with your request ready to send. If nothing opened, email the details to
          info@aifax.net and we will take it from there.
        </p>
      ) : null}
    </form>
  );
}
