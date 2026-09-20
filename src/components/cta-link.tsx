"use client";

import type { ReactNode } from "react";
import { hrefWithClickId, trackCta } from "@/lib/track-cta";

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
 *
 * Links that leave for the billing portal get the click id appended here,
 * in the handler, rather than being rendered into the markup: the id has
 * to be unique per click, and the browser reads the href when it performs
 * the default action, which is after this runs.
 */
export function CtaLink({ href, cta, plan, className, onClick, children }: CtaLinkProps) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        const clickId = trackCta(cta, plan);
        const target = hrefWithClickId(href, clickId);
        if (target !== href) event.currentTarget.href = target;
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
