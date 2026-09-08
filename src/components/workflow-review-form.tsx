"use client";

import { useState } from "react";
import { CheckCircle2, Send, X } from "lucide-react";
import { suggestEmailCorrection } from "@/lib/email-validation";

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

const GOAL_OPTIONS = [
  "Routing faxes automatically into our EHR",
  "Lowering our monthly fax costs",
  "Cutting manual data entry / filing time",
  "HIPAA compliance and security",
  "Connecting multiple platforms/apps together",
  "Scaling to handle higher fax volume",
  "Custom development / API integration",
  "Not sure yet, just exploring",
  "Other (describe below)"
];

const FIELD =
  "mt-1 w-full rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-sm text-white " +
  "placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-300";
const LABEL = "block text-sm font-medium text-slate-200";

function makeChallenge() {
  return { a: 2 + Math.floor(Math.random() * 8), b: 1 + Math.floor(Math.random() * 8) };
}

/** Digits only, auto-hyphenated as XXX-XXX-XXXX (US 10-digit number). */
function formatPhone(raw: string) {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function WorkflowReviewForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [challenge, setChallenge] = useState(() => makeChallenge());
  const [challengeError, setChallengeError] = useState(false);
  const [phone, setPhone] = useState("");
  const [faxNumber, setFaxNumber] = useState("");
  const [emailSuggestion, setEmailSuggestion] = useState<{ typed: string; suggested: string } | null>(null);
  const [pendingForm, setPendingForm] = useState<HTMLFormElement | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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

    const correction = suggestEmailCorrection(value("email"));
    if (correction) {
      // Ask rather than block outright: hold the form and let the visitor
      // confirm the fix or insist their address is correct as typed.
      setEmailSuggestion({ typed: value("email"), suggested: correction });
      setPendingForm(form);
      return;
    }

    void submitForm(form);
  }

  function acceptEmailSuggestion() {
    if (!pendingForm || !emailSuggestion) return;
    // Keep the visible field in sync too, so the corrected address is what
    // the visitor sees if they look back at the form (e.g. after a submit
    // error), but the request below carries the corrected email explicitly
    // rather than depending on this DOM write being read back correctly.
    const emailInput = pendingForm.elements.namedItem("email") as HTMLInputElement;
    emailInput.value = emailSuggestion.suggested;
    const form = pendingForm;
    setEmailSuggestion(null);
    setPendingForm(null);
    void submitForm(form, { email: emailSuggestion.suggested, emailConfirmed: true });
  }

  function keepTypedEmail() {
    if (!pendingForm) return;
    const form = pendingForm;
    setEmailSuggestion(null);
    setPendingForm(null);
    void submitForm(form, { emailConfirmed: true });
  }

  async function submitForm(form: HTMLFormElement, overrides?: { email?: string; emailConfirmed?: boolean }) {
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    const email = overrides?.email ?? value("email");

    setSubmitError(null);
    setSubmitting(true);

    // Shared with the server so the two Lead events (this one, fired from
    // the browser, and the Conversions API one /api/contact tries server
    // side) carry the same event ID. Meta de-duplicates on that id, so if
    // the server-side send is ever working too, this won't double count.
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());

    const goal = value("goal");
    const notes = value("notes");
    const combinedNotes = [goal, notes].filter(Boolean).join(" - ");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: value("name"),
          practice: value("practice"),
          email,
          phone: value("phone"),
          ehr: value("ehr"),
          faxProvider: value("faxProvider"),
          faxNumber: value("faxNumber"),
          volume: value("volume"),
          callWindow: value("callWindow"),
          notes: combinedNotes,
          // honeypot - real visitors never see this field, see the hidden
          // input below. A bot filling every field trips it.
          companyWebsite: value("companyWebsite"),
          eventId,
          emailConfirmed: overrides?.emailConfirmed ?? false
        })
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong sending your request.");
      }
      setSent(true);
      form.reset();
      setPhone("");
      setFaxNumber("");

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
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={12}
            value={phone}
            onChange={(e) => setPhone(formatPhone(e.target.value))}
            className={FIELD}
            placeholder="305-999-8765"
          />
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
          <input
            id="faxNumber"
            name="faxNumber"
            type="tel"
            inputMode="numeric"
            maxLength={12}
            value={faxNumber}
            onChange={(e) => setFaxNumber(formatPhone(e.target.value))}
            className={FIELD}
            placeholder="Optional"
          />
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
          <label className={LABEL} htmlFor="goal">What would you like to solve first?</label>
          <select id="goal" name="goal" className={FIELD} defaultValue="">
            <option value="" disabled>Select the closest fit</option>
            {GOAL_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="notes">Anything else to add? (optional)</label>
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

      {emailSuggestion ? (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4">
          <div className="relative w-full max-w-sm rounded-2xl border border-orange-400/40 bg-slate-900 p-6 text-center shadow-2xl">
            <h3 className="text-lg font-semibold text-white">Check your email</h3>
            <p className="mt-2 text-sm text-slate-300">
              You typed <span className="text-white">{emailSuggestion.typed}</span>. Did you mean{" "}
              <span className="text-cyan-300">{emailSuggestion.suggested}</span>?
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button type="button" onClick={acceptEmailSuggestion} className="btn-primary">
                Yes, use this
              </button>
              <button
                type="button"
                onClick={keepTypedEmail}
                className="rounded-full border border-white/20 px-4 py-2 text-sm text-slate-200 hover:border-white/40"
              >
                No, keep as typed
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {sent ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setSent(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl border border-cyan-300/40 bg-slate-900 p-6 text-center shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSent(false)}
              aria-label="Close"
              className="absolute right-3 top-3 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            <CheckCircle2 className="mx-auto h-12 w-12 text-cyan-300" />
            <h3 className="mt-3 text-lg font-semibold text-white">Request sent</h3>
            <p className="mt-2 text-sm text-slate-300">We'll follow up shortly. Check your email for confirmation.</p>
          </div>
        </div>
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
