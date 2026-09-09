"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import type { Plan } from "@/lib/plans";

type PricingPlansGridProps = {
  plans: Plan[];
};

export function PricingPlansGrid({ plans }: PricingPlansGridProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  const toggle = (period: "monthly" | "annually", label: string) => (
    <button
      type="button"
      className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
        billingPeriod === period ? "bg-slate-900 text-white" : "text-slate-700 hover:text-slate-900"
      }`}
      onClick={() => setBillingPeriod(period)}
      aria-pressed={billingPeriod === period}
    >
      {label}
    </button>
  );

  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-semibold text-slate-900">Billing</span>
        <div className="inline-flex rounded-full border border-slate-200 bg-white p-1">
          {toggle("monthly", "Monthly")}
          {toggle("annually", "Annually, save 17%")}
        </div>
      </div>

      <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((plan) => {
          const isAnnual = billingPeriod === "annually" && Boolean(plan.annualPrice);
          const price = isAnnual ? plan.annualPrice : plan.price;
          const isCustom = !plan.annualPrice && plan.price === "Custom";

          return (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl border bg-white p-7 ${
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
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 tabular-nums">{price}</span>
                {isCustom ? null : <span className="text-slate-500">/month</span>}
              </p>
              <p className="text-sm text-slate-500">
                {plan.pages}
                {isAnnual ? ", billed annually" : ""}
              </p>

              <ul className="mt-5 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-emerald-600" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href={plan.href} className={`${plan.featured ? "btn-primary" : "btn-secondary"} mt-6`}>
                {plan.cta}
              </a>
            </article>
          );
        })}
      </div>
    </>
  );
}
