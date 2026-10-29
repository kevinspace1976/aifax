import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { CtaLink } from "@/components/cta-link";
import { loginCta, newNumberUrl, portNumberUrl, supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "AiFax Print | Fax From Any Windows Program | AiFax",
  description:
    "AiFax Print adds an AiFax printer to Windows 11. Print from your EHR, Adobe, Word, email or browser, choose AiFax, and the fax goes out from your own AiFax number. Included with AiFax fax plans.",
  alternates: { canonical: "/print" }
};

const benefits = [
  "Fax from any program that prints: your EHR in the browser, Adobe, Word, Outlook, web pages and photos",
  "No scanning, no fax machine, no paper",
  "Sends from your own AiFax account and fax number, with your cover page",
  "Checks the fax number before sending and shows a preview of page 1",
  "Remembers your recent recipients and your AiFax contacts",
  "Shows when the fax is delivered, plus the usual confirmation email",
  "Updates itself in the background, nothing to maintain",
  "Documents are deleted from the PC after each fax"
];

const steps = [
  {
    n: "1",
    t: "Download",
    b: "Sign in at app.aifax.net and select Download AiFax Print in the menu. Open the file and select Install."
  },
  {
    n: "2",
    t: "Sign in once",
    b: "AiFax Print opens and asks for your app.aifax.net email and password. It then shows AiFax printer: ready."
  },
  {
    n: "3",
    t: "Print to AiFax",
    b: "In any program, select Print, choose the AiFax printer, enter the fax number or a contact name, and select Send."
  }
];

const faqs = [
  {
    q: "What do I need?",
    a: "A Windows 11 PC on version 24H2 or newer (Settings, System, About), Intel, AMD or Arm. No driver and no administrator rights."
  },
  {
    q: "Which AiFax plans include it?",
    a: "Every AiFax fax plan, from $9.99 a month. Keep-your-provider plans are for incoming faxes only, so AiFax Print is not part of them."
  },
  {
    q: "How long can a fax be?",
    a: "Up to 100 pages per fax, Letter or A4. Color pages are sent in black and white, as every fax is."
  },
  {
    q: "Do we have to install updates?",
    a: "No. Windows checks for a new version in the background and installs it quietly. A fax being sent is never interrupted."
  }
];

export default function PrintPage() {
  return (
    <main>
      <section className="border-b border-slate-200">
        <div className="section-shell py-14 sm:py-16">
          <p className="kicker">AiFax Print</p>
          <h1 className="mt-4 max-w-4xl text-4xl text-slate-900 sm:text-5xl">
            Fax from any Windows program. Print, choose AiFax, send.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">
            AiFax Print adds an AiFax printer to Windows 11. Referrals, records requests, prior authorizations and
            letters go straight from the screen to the recipient, from your own AiFax fax number.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={loginCta.href} className="btn-primary">
              Sign in to download
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            For AiFax customers on a fax plan. Windows 11 version 24H2 or newer.
          </p>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">What your staff gets</h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {benefits.map((line) => (
              <li key={line} className="card-surface flex items-start gap-2.5 p-5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Set up in about two minutes</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {steps.map((s) => (
              <article key={s.n} className="card-surface p-7">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-base font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-4 text-xl text-slate-900">{s.t}</h3>
                <p className="mt-2 text-slate-700">{s.b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-alt py-16 sm:py-20">
        <div className="section-shell">
          <h2 className="text-3xl text-slate-900 sm:text-4xl">Questions</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {faqs.map((f) => (
              <article key={f.q} className="card-surface p-7">
                <h3 className="text-lg text-slate-900">{f.q}</h3>
                <p className="mt-2 text-slate-700">{f.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="section-shell">
          <p className="kicker">Not an AiFax customer yet</p>
          <h2 className="mt-4 text-3xl text-slate-900 sm:text-4xl">Two ways to start, with the same service either way</h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-700">
            Switch to AiFax and keep your fax number: we port it, and AiFax Print comes with every fax plan. Or keep
            your current provider and forward your faxes to AiFax for the AI summaries; that plan receives only, so it
            does not include AiFax Print.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <CtaLink href={portNumberUrl} cta="page_port_number" className="btn-primary">
              Port My Number
            </CtaLink>
            <CtaLink href={newNumberUrl} cta="page_new_number" className="btn-secondary">
              Get a New Number Today
            </CtaLink>
          </div>
          <p className="mt-6">
            <Link href="/keep-your-provider" className="inline-flex items-center gap-1.5 font-semibold text-slate-900">
              Keep your provider instead
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
          <p className="mt-4 text-slate-700">
            Questions about AiFax Print? Email{" "}
            <a className="font-semibold text-orange-600 underline" href={`mailto:${supportEmail}`}>
              {supportEmail}
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
