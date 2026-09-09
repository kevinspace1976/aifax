"use client";

import { CheckCircle2 } from "lucide-react";
import { SubscribeButton } from "@/components/subscribe-button";
import type { Plan } from "@/lib/plans";

type PricingPlansGridProps = {
  plans: Plan[];
};

export function PricingPlansGrid({ plans }: PricingPlansGridProps) {
  return (
    <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {plans.map((plan) => {
        const isCustom = plan.price === "Custom";
        const buttonClass = `${plan.featured ? "btn-primary" : "btn-secondary"} mt-6`;

        return (
          <article
            key={plan.name}
            className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 ${
              plan.featured ? "border-2 border-orange-500" : "border-slate-200"
            }`}
          >
            {plan.featured ? (
              <span className="absolute -top-3 left-6 rounded-full bg-orange-500 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                Most practices
              </span>
            ) : null}

            <h2 className="text-xl text-slate-900">{plan.name}</h2>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-3xl font-extrabold tracking-tight text-slate-900 tabular-nums">{plan.price}</span>
              {isCustom ? null : <span className="text-slate-500">/month</span>}
            </p>
            <p className="text-sm text-slate-500">{plan.pages}</p>

            <ul className="mt-5 flex flex-1 flex-col gap-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-slate-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-emerald-600" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {plan.href ? (
              <a href={plan.href} className={buttonClass}>
                {plan.cta}
              </a>
            ) : (
              <SubscribeButton planName={plan.name} className={buttonClass}>
                {plan.cta}
              </SubscribeButton>
            )}
          </article>
        );
      })}
    </div>
  );
}
