"use client";

import { analyticsEnabled } from "@/lib/analytics";
import { useConsent } from "./ConsentProvider";

/**
 * Footer control that lets visitors change or withdraw their cookie choice at
 * any time, as promised in the Cookie Policy. Reopening sets consent back to
 * "unknown", which re-shows the banner and (if GA was loaded) stops it on the
 * next navigation. Hidden entirely when analytics isn't configured.
 */
export function CookieSettingsButton({
  className = "",
}: {
  className?: string;
}) {
  const { reopen } = useConsent();

  if (!analyticsEnabled) return null;

  return (
    <button
      type="button"
      onClick={reopen}
      className={`text-left transition-colors hover:text-amber-300 ${className}`}
    >
      Cookie settings
    </button>
  );
}
