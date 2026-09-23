"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { GA_MEASUREMENT_ID, trackPageview } from "@/lib/analytics";
import { useConsent } from "./ConsentProvider";

/**
 * Sends a GA `page_view` on client-side route changes.
 *
 * Next.js App Router navigations don't reload the page, so GA's automatic
 * page_view (which we disabled via send_page_view: false) would only ever fire
 * once. This component fires one explicitly whenever the path or query string
 * changes — but only when the visitor has granted consent, so no measurement
 * hits are sent otherwise.
 *
 * Note: this relies on useSearchParams, so it must be rendered inside a
 * <Suspense> boundary (see layout).
 */
export function PageviewTracker() {
  const { consent } = useConsent();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || consent !== "granted") return;
    const query = searchParams?.toString();
    trackPageview(query ? `${pathname}?${query}` : pathname);
  }, [consent, pathname, searchParams]);

  return null;
}
