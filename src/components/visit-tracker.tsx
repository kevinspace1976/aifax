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
 *
 * Skips the admin dashboard itself entirely: viewing/refreshing /admin is
 * not a marketing site visit, and counting it made the visitor numbers
 * climb every time the owner reloaded their own dashboard. The API route
 * also refuses to log a visit from a browser that's authenticated as
 * admin (see /api/track), which additionally excludes the owner's own
 * browsing of the public pages once they're signed into /admin there.
 */
export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/admin")) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: window.location.href }),
        keepalive: true
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data: { id?: number } | null) => {
          if (!data?.id) return;
          // Still here 10 seconds later, with the tab in front, means a
          // person is reading. Bounced taps and crawlers never get this far.
          timer = setTimeout(() => {
            if (document.visibilityState !== "visible") return;
            fetch("/api/track", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ engage: data.id }),
              keepalive: true
            }).catch(() => {});
          }, 10_000);
        })
        .catch(() => {});
    } catch {
      // never let a tracking failure surface to the visitor
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
