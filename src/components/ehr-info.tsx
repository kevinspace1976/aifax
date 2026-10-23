"use client";

import { Info } from "lucide-react";
import { useEffect, useRef, useState } from "react";

/**
 * The (i) at the end of the home page intro: lists the EHR systems we work
 * with, so the names stay off the page itself. Opens on hover and keyboard
 * focus, and on tap for phones, where there is no hover. The parent element
 * must be `relative`: the box spans its width, so it never runs off a narrow
 * screen.
 */
export function EhrInfo() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!ref.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <span ref={ref} className="group ml-1 inline-flex align-middle">
      <button
        type="button"
        aria-label="EHR systems we work with"
        aria-expanded={open}
        aria-describedby="ehr-info-list"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full text-slate-500 hover:text-emerald-700 focus-visible:text-emerald-700 focus-visible:outline-2 focus-visible:outline-emerald-600"
      >
        <Info className="h-4 w-4" aria-hidden="true" />
      </button>
      <span
        id="ehr-info-list"
        role="tooltip"
        className={`absolute top-full left-0 right-0 z-20 mt-2 max-w-sm rounded-lg border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-lg group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <span className="block font-semibold text-slate-900">EHR systems we work with</span>
        <span className="mt-2 block">
          <span className="font-medium text-slate-900">Built and tested:</span> NextGen Enterprise, DrChrono,
          eClinicalWorks
        </span>
        <span className="mt-1 block">
          <span className="font-medium text-slate-900">Built or in progress:</span> Elation Health, Tebra, ModMed,
          Office Ally
        </span>
        <span className="mt-2 block">Don&apos;t see yours? We Build It.</span>
        <span className="mt-2 block text-xs text-slate-500">
          What each connection does depends on what the EHR vendor allows. Names belong to their owners and do not
          mean they endorse AiFax.
        </span>
      </span>
    </span>
  );
}
