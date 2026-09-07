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

function makeChallenge() {
  return { a: 2 + Math.floor(Math.random() * 8), b: 1 + Math.floor(Math.random() * 8) };
}

export function WorkflowReviewForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState(() => makeChallenge());
  const [challengeError, setChallengeError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    if (Number(String(data.get("humanCheck") ?? "").trim()) !== challenge.a + challenge.b) {
      setChallengeError(true);
      setSent(false);
      setChallenge(makeChallenge());
      return;
    }
    setChallengeError(false);
    setSubmitError(null);
    setSubmitting(true);

    // Shared with the server so the two Lead events (this one, fired from
    // the browser, and the Conversions API one /api/contact tries server
    // side) carry the same event ID. Meta de-duplicates on that id, so if
    // the server-side send is ever working too, this won't double count.
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          practice: value("practice"),
          email: value("email"),
          phone: value("phone"),
          ehr: value("ehr"),
          faxProvider: value("faxProvider"),
          faxNumber: value("faxNumber"),
          volume: value("volume"),
          callWindow: value("callWindow"),
          notes: value("notes"),
          // honeypot - real visitors never see this field, see the hidden
          // input below. A bot filling every field trips it.
          companyWebsite: value("companyWebsite"),
          eventId
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong sending your request.");
      }
      setSent(true);
      form.reset();

      // Browser-side fallback for the "Lead" conversion signal. This is
      // the one that actually reaches Meta today: the server-side
      // Conversions API copy in /api/contact needs META_CAPI_ACCESS_TOKEN,
      // which isn't set up yet, so without this, Meta would never learn
      // that a visit turned into a lead at all, only that the page was
      // viewed. Guarded because fbq only exists once NEXT_PUBLIC_META_PIXEL_ID
      // is configured and the script has loaded (never present in dev, and
      // absent entirely if an ad blocker stripped it).
      try {
        const fbq = (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;
        if (typeof fbq === "function") {
          fbq("track", "Lead", {}, { eventID: eventId });
        }
      } catch {
        // never let pixel reporting break the success state the visitor sees
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong sending your request.");
    } finally {
      setSubmitting(false);
    }
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

      <div className="mt-5 max-w-xs">
        <label className={LABEL} htmlFor="humanCheck">
          Quick check: what is {challenge.a} + {challenge.b}?
        </label>
        <input
          id="humanCheck"
          name="humanCheck"
          inputMode="numeric"
          required
          className={FIELD}
          placeholder="Type the answer"
          aria-describedby={challengeError ? "humanCheckError" : undefined}
        />
        {challengeError ? (
          <p id="humanCheckError" className="mt-1 text-sm text-orange-300">
            That answer was not right. Here is a new one - please try again.
          </p>
        ) : null}
      </div>

      {/* Honeypot: hidden from real visitors (off-screen, not display:none
          so basic bots that skip hidden fields still fill it), checked
          server-side in /api/contact. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor="companyWebsite">Website</label>
        <input id="companyWebsite" name="companyWebsite" tabIndex={-1} autoComplete="off" />
      </div>

      <p className="mt-4 text-xs text-slate-400">
        Please do not include patient health information in this form.
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting ? "Sending..." : "Send My Request"} <Send className="ml-2 h-4 w-4" />
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
          Thanks, that's in. We will follow up shortly, and a confirmation just went to your email.
        </p>
      ) : null}
      {submitError ? (
        <p className="mt-4 rounded-lg border border-orange-400/40 bg-orange-400/10 p-3 text-sm text-orange-100">
          {submitError} You can also email us directly at{" "}
          <a href="mailto:info@aifax.net" className="underline underline-offset-4">
            info@aifax.net
          </a>
          .
        </p>
      ) : null}
    </form>
  );
}
