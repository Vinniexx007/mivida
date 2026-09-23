/**
 * Analytics configuration. The GA4 Measurement ID is read from a public env
 * var so it can be swapped per environment (and left blank to disable GA
 * entirely, e.g. on preview/staging). Analytics is only ever loaded after the
 * visitor grants consent — see ConsentProvider / Analytics component.
 */

/** Raw GA4 Measurement ID (e.g. "G-009MTHBS83"), or undefined if unset. */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() || undefined;

/** Whether analytics is configured for this environment. */
export const analyticsEnabled = Boolean(GA_MEASUREMENT_ID);

/** localStorage key holding the visitor's cookie-consent choice. */
export const CONSENT_STORAGE_KEY = "mivida-cookie-consent";

/** Possible consent states. `unknown` = no choice made yet (banner shows). */
export type ConsentState = "unknown" | "granted" | "denied";

/** Type guard for values read back out of storage. */
export function isConsentState(value: unknown): value is ConsentState {
  return value === "unknown" || value === "granted" || value === "denied";
}

/* -------------------------------------------------------------------------- */
/* Google Consent Mode v2 + gtag helpers                                       */
/* -------------------------------------------------------------------------- */

type GtagConsentValue = "granted" | "denied";

/**
 * The Consent Mode v2 signals we manage. We only ever use analytics on this
 * site, but Google expects the ad_* signals to be declared too — we keep them
 * denied permanently since we run no advertising.
 */
type ConsentSignals = {
  ad_storage: GtagConsentValue;
  ad_user_data: GtagConsentValue;
  ad_personalization: GtagConsentValue;
  analytics_storage: GtagConsentValue;
};

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

/** Push a raw gtag command onto the dataLayer (no-op during SSR). */
export function gtag(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(args);
}

/**
 * Consent Mode v2 defaults, applied before the visitor makes a choice.
 * Everything is denied: with analytics_storage denied, GA loads but sets no
 * analytics cookies (cookieless pings only), satisfying UK PECR/GDPR.
 */
export const DEFAULT_CONSENT: ConsentSignals = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

/**
 * Map a visitor choice to the analytics_storage signal. Ad signals stay denied
 * regardless — we don't run advertising.
 */
export function consentSignalsFor(granted: boolean): ConsentSignals {
  return {
    ...DEFAULT_CONSENT,
    analytics_storage: granted ? "granted" : "denied",
  };
}

/** Send a Consent Mode v2 `update` reflecting the visitor's current choice. */
export function updateConsent(granted: boolean): void {
  gtag("consent", "update", consentSignalsFor(granted));
}

/**
 * Send a manual SPA page_view for the given path (used on route changes).
 * Callers are responsible for gating on consent and analytics being enabled.
 */
export function trackPageview(path: string): void {
  gtag("event", "page_view", { page_path: path });
}
