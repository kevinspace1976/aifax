"use client";

import type { ReactNode } from "react";
import { trackCta } from "@/lib/track-cta";

type CtaLinkProps = {
  href: string;
  /** Which button this is, e.g. header_new_number. Must be in CTA_NAMES. */
  cta: string;
  /** Plan name, for the buttons on /pricing. */
  plan?: string;
  className?: string;
  /** Anything the call site already did on click, e.g. closing the menu. */
  onClick?: () => void;
  children: ReactNode;
};

/**
 * A normal link that also records the click before navigating. Used for
 * every button that sends someone toward checkout, so /admin/traffic can
 * show how deep into the buy path people get.
 */
export function CtaLink({ href, cta, plan, className, onClick, children }: CtaLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => {
        trackCta(cta, plan);
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
