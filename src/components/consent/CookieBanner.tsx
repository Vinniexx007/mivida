"use client";

import Link from "next/link";
import { analyticsEnabled } from "@/lib/analytics";
import { legalPages } from "@/lib/legal";
import { useConsent } from "./ConsentProvider";

/**
 * Cookie consent banner. Appears only when the visitor hasn't yet made a
 * choice (consent === "unknown") and only when analytics is actually
 * configured — there's no point asking for consent we won't act on.
 *
 * Accept loads Google Analytics; Reject keeps it off. The choice is persisted
 * by ConsentProvider and can be changed later via the footer "Cookie settings"
 * control, which reopens this banner.
 */
export function CookieBanner() {
  const { consent, hydrated, accept, reject } = useConsent();

  // Don't render until we've read the stored choice (avoids a flash) and only
  // when there's an undecided visitor and GA is configured.
  if (!hydrated || !analyticsEnabled || consent !== "unknown") {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-desc"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-navy text-white shadow-[0_-8px_30px_rgba(0,0,0,0.25)]"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-3xl">
          <h2
            id="cookie-banner-title"
            className="font-heading text-base font-semibold"
          >
            Cookies on mividadigital.co.uk
          </h2>
          <p id="cookie-banner-desc" className="mt-1 text-sm text-white/80">
            We&apos;d like to use Google Analytics to understand how visitors
            use our site so we can improve it. These are optional — we&apos;ll
            only set analytics cookies if you accept. See our{" "}
            <Link
              href={legalPages.cookiePolicy.href}
              className="font-semibold text-amber-300 underline underline-offset-2 hover:text-amber-200"
            >
              Cookie Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={reject}
            className="inline-flex items-center justify-center rounded-[--radius-brand] border-2 border-white/40 px-5 py-2.5 text-sm font-heading font-semibold text-white transition-colors hover:border-white hover:bg-white/10"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center justify-center rounded-[--radius-brand] bg-amber px-5 py-2.5 text-sm font-heading font-semibold text-navy transition-colors hover:bg-amber-600 hover:text-white"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
