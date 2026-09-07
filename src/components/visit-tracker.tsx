"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mounted once in the root layout. Beacons a pageview to /api/track on
 * first load and on every client-side navigation, so single-page
 * transitions between e.g. /pricing and /contact both get logged, not
 * just the very first full page load.
 *
 * Reads window.location directly rather than next/navigation's
 * useSearchParams() so this can live in the root layout without forcing
 * every statically-generated page into dynamic rendering just to read a
 * query string that's only needed inside an effect, not for the render.
 *
 * Never touches rendering (returns null) and every failure is swallowed:
 * analytics breaking is not a reason to break the marketing site.
 */
export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: window.location.href }),
        keepalive: true
      }).catch(() => {});
    } catch {
      // never let a tracking failure surface to the visitor
    }
  }, [pathname]);

  return null;
}
