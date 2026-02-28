"use client";

import { useState } from "react";

type Plan = {
  name: string;
  price: string;
  annualPrice?: string;
  cta: string;
  href: string;
  featured?: boolean;
  features: string[];
};

type PricingPlansGridProps = {
  plans: Plan[];
};

export function PricingPlansGrid({ plans }: PricingPlansGridProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annually">("monthly");

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-center gap-3">
        <p className="text-base font-semibold text-white">Billing Period</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="inline-flex rounded-lg border border-white/10 bg-slate-900/70 p-1">
            <button
              type="button"
              className={`rounded-md px-4 py-1.5 text-sm font-semibold ${
                billingPeriod === "monthly" ? "bg-slate-200 text-slate-900" : "text-slate-200"
              }`}
              onClick={() => setBillingPeriod("monthly")}
            >
              Monthly
            </button>
            <button
              type="button"
              className={`rounded-md px-4 py-1.5 text-sm font-semibold ${
                billingPeriod === "annually" ? "bg-slate-200 text-slate-900" : "text-slate-200"
              }`}
              onClick={() => setBillingPeriod("annually")}
            >
              Annually
            </button>
          </div>
          <div className="flex items-center gap-1 text-base font-semibold uppercase tracking-[0.08em] text-orange-300">
            <span aria-hidden>↗</span>
            <span>Save 17%</span>
          </div>
        </div>
      </div>

      <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
        {plans.map((plan) => {
          const isAnnual = billingPeriod === "annually" && Boolean(plan.annualPrice);
          const displayedPrice = isAnnual ? `${plan.annualPrice}/mo` : plan.price;

          return (
            <article
              key={plan.name}
              className={`relative flex h-full flex-col rounded-2xl border p-6 ${
                plan.featured ? "border-orange-400 bg-slate-900" : "border-white/10 bg-slate-900/70"
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-4 top-4 rounded-full bg-orange-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Featured
                </span>
              ) : null}

              <h2 className="text-2xl font-semibold text-white">{plan.name}</h2>
              <p className="mt-3 text-slate-300">
                <span className="text-3xl font-semibold text-emerald-300">{displayedPrice}</span>
              </p>
              {isAnnual ? <p className="mt-1 text-xs text-slate-400">Billed Annually</p> : null}

              <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-300">
                {plan.features.map((feature) => (
                  <li key={feature}>• {feature}</li>
                ))}
              </ul>

              <a href={plan.href} target={plan.name === "Corporate" ? undefined : "_blank"} rel={plan.name === "Corporate" ? undefined : "noreferrer"} className="btn-primary mt-6">
                {plan.cta}
              </a>
            </article>
          );
        })}
      </div>
    </>
  );
}
