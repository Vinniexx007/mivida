"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  GA_MEASUREMENT_ID,
  DEFAULT_CONSENT,
  updateConsent,
} from "@/lib/analytics";
import { useConsent } from "./ConsentProvider";

/**
 * Google Analytics with Consent Mode v2.
 *
 * Unlike a naive "don't load until accept" approach, Consent Mode loads gtag
 * early with all storage signals defaulted to **denied**. With
 * analytics_storage denied, GA runs in cookieless mode — it sets no analytics
 * cookies and stores no identifiers until the visitor grants consent — which
 * keeps us compliant with UK PECR/GDPR and our Cookie Policy.
 *
 * When the visitor's choice changes, we send a Consent Mode `update`:
 * granted → analytics_storage granted (cookies + full measurement),
 * denied/unknown → analytics_storage denied (cookieless).
 *
 * Ad signals stay denied permanently — we run no advertising.
 */
export function Analytics() {
  const { consent, hydrated } = useConsent();

  // Reflect the visitor's live choice into Consent Mode after the initial
  // gtag bootstrap has run. "unknown" is treated as not-granted (denied).
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !hydrated) return;
    updateConsent(consent === "granted");
  }, [consent, hydrated]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  // The bootstrap script sets consent defaults BEFORE loading the GA library,
  // as Consent Mode v2 requires. send_page_view is disabled so page views are
  // sent explicitly by PageviewTracker (correct for a client-routed SPA).
  const bootstrap = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = window.gtag || gtag;
    gtag('consent', 'default', ${JSON.stringify({ ...DEFAULT_CONSENT, wait_for_update: 500 })});
    gtag('js', new Date());
    gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
  `;

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {bootstrap}
      </Script>
      <Script
        id="ga-loader"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
