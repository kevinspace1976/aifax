import type { ReactNode } from "react";
import { sharedCtas } from "@/lib/site";

type PageHeroProps = {
  title: string;
  description: string;
  kicker?: string;
  /** Replaces the default call-to-action row when provided. */
  actions?: ReactNode;
  /** Optional note under the actions (price, compliance, timing). */
  note?: string;
};

export function PageHero({ title, description, kicker = "AI fax for medical practices", actions, note }: PageHeroProps) {
  return (
    <section className="border-b border-slate-200">
      <div className="section-shell py-14 sm:py-16">
        <p className="kicker">{kicker}</p>
        <h1 className="mt-4 max-w-3xl text-4xl text-slate-900 sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-700 sm:text-xl">{description}</p>
        <div className="mt-7">
          {actions ?? (
            <div className="flex flex-wrap gap-3">
              <a href={sharedCtas.primary.href} className="btn-primary">
                {sharedCtas.primary.label}
              </a>
              <a href={sharedCtas.secondary.href} className="btn-secondary">
                {sharedCtas.secondary.label}
              </a>
            </div>
          )}
        </div>
        {note ? <p className="mt-4 text-sm text-slate-500">{note}</p> : null}
      </div>
    </section>
  );
}
