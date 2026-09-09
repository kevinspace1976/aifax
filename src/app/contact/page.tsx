import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { WorkflowReviewForm } from "@/components/workflow-review-form";
import { newNumberUrl, phone, portNumberUrl, supportEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | AiFax",
  description: "Sign up now, or send us how faxes reach your practice and get a written workflow review by email."
};

const points = [
  `${supportEmail}, answered by a person`,
  `${phone.display} if you would rather talk`,
  "Please do not include patient health information in this form"
];

export default function ContactPage() {
  return (
    <main>
      <section className="section-shell grid gap-12 py-14 sm:py-16 lg:grid-cols-[5fr_7fr] lg:items-start lg:gap-16">
        <div>
          <p className="kicker">Contact</p>
          <h1 className="mt-4 text-4xl text-slate-900 sm:text-[46px]">Ready now, or want it mapped first?</h1>
          <p className="mt-5 text-lg text-slate-700">
            Most practices sign up and are live the same day. If you want us to look at how faxes reach your practice
            first, send the form and we reply by email with a written plan. No calls unless you ask for one.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={portNumberUrl} className="btn-accent">
              Port My Number
            </a>
            <a href={newNumberUrl} className="btn-primary">
              Get a New Number
            </a>
          </div>
          <ul className="mt-8 flex flex-col gap-3">
            {points.map((line) => (
              <li key={line} className="flex items-start gap-2.5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
        <WorkflowReviewForm />
      </section>
    </main>
  );
}
