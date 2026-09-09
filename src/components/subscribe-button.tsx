"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Phone, PhoneForwarded, X } from "lucide-react";
import { newNumberUrl, portNumberUrl } from "@/lib/site";

type SubscribeButtonProps = {
  planName: string;
  className: string;
  children: React.ReactNode;
};

/**
 * Subscribe CTA for a paid plan. WHMCS only bills monthly and needs to know
 * whether the customer is bringing a number or taking a new one, so instead
 * of linking straight to a checkout, clicking opens a modal that makes the
 * visitor pick one path. Each path lands on the matching portal store link.
 */
export function SubscribeButton({ planName, className, children }: SubscribeButtonProps) {
  const [open, setOpen] = useState(false);
  const firstChoice = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;
    firstChoice.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscribe-choice-title"
            className="relative w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <p className="kicker">{planName} plan</p>
            <h2 id="subscribe-choice-title" className="mt-2 text-2xl text-slate-900">
              Which fax number will you use?
            </h2>
            <p className="mt-2 text-slate-600">
              Choose one to continue to checkout. You will confirm the {planName} plan on the next page.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                ref={firstChoice}
                href={portNumberUrl}
                className="group flex items-center gap-4 rounded-xl border-2 border-orange-500 bg-orange-50 p-4 text-left transition hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <PhoneForwarded className="h-6 w-6 flex-none text-orange-500" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block font-semibold text-slate-900">Port my number</span>
                  <span className="block text-sm text-slate-600">Keep your current fax number. Your line stays live during the port.</span>
                </span>
                <ArrowRight className="h-5 w-5 flex-none text-slate-400 transition group-hover:text-slate-900" aria-hidden="true" />
              </a>
              <a
                href={newNumberUrl}
                className="group flex items-center gap-4 rounded-xl border border-slate-200 p-4 text-left transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400"
              >
                <Phone className="h-6 w-6 flex-none text-sky-500" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block font-semibold text-slate-900">Get a new number</span>
                  <span className="block text-sm text-slate-600">Pick a new fax number and start faxing today.</span>
                </span>
                <ArrowRight className="h-5 w-5 flex-none text-slate-400 transition group-hover:text-slate-900" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
