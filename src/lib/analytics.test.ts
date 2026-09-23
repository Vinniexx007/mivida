import { describe, it, expect, afterEach, beforeEach, vi } from "vitest";
import {
  isConsentState,
  CONSENT_STORAGE_KEY,
  DEFAULT_CONSENT,
  consentSignalsFor,
  updateConsent,
  gtag,
} from "./analytics";

describe("isConsentState", () => {
  it("accepts the three valid states", () => {
    expect(isConsentState("unknown")).toBe(true);
    expect(isConsentState("granted")).toBe(true);
    expect(isConsentState("denied")).toBe(true);
  });

  it("rejects anything else", () => {
    expect(isConsentState("nope")).toBe(false);
    expect(isConsentState("")).toBe(false);
    expect(isConsentState(null)).toBe(false);
    expect(isConsentState(undefined)).toBe(false);
    expect(isConsentState(1)).toBe(false);
  });
});

describe("consent storage key", () => {
  it("is a stable, namespaced key", () => {
    expect(CONSENT_STORAGE_KEY).toBe("mivida-cookie-consent");
  });
});

describe("Consent Mode v2 signals", () => {
  it("defaults every signal to denied", () => {
    expect(DEFAULT_CONSENT).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
    });
  });

  it("grants only analytics_storage when consent is given (ads stay denied)", () => {
    expect(consentSignalsFor(true)).toEqual({
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "granted",
    });
  });

  it("keeps analytics_storage denied when consent is refused", () => {
    expect(consentSignalsFor(false).analytics_storage).toBe("denied");
  });
});

describe("gtag / updateConsent dataLayer pushes", () => {
  beforeEach(() => {
    window.dataLayer = [];
  });

  it("pushes the raw argument list onto the dataLayer", () => {
    gtag("event", "test_event", { foo: "bar" });
    expect(window.dataLayer.at(-1)).toEqual([
      "event",
      "test_event",
      { foo: "bar" },
    ]);
  });

  it("updateConsent(true) pushes a consent update granting analytics", () => {
    updateConsent(true);
    const last = window.dataLayer.at(-1) as unknown[];
    expect(last[0]).toBe("consent");
    expect(last[1]).toBe("update");
    expect((last[2] as Record<string, string>).analytics_storage).toBe(
      "granted",
    );
  });

  it("updateConsent(false) pushes a consent update denying analytics", () => {
    updateConsent(false);
    const last = window.dataLayer.at(-1) as unknown[];
    expect((last[2] as Record<string, string>).analytics_storage).toBe(
      "denied",
    );
  });
});

describe("analytics enablement from env", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("is enabled with a Measurement ID present", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "G-009MTHBS83");
    vi.resetModules();
    const mod = await import("./analytics");
    expect(mod.analyticsEnabled).toBe(true);
    expect(mod.GA_MEASUREMENT_ID).toBe("G-009MTHBS83");
  });

  it("is disabled when the ID is blank or missing", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "");
    vi.resetModules();
    const mod = await import("./analytics");
    expect(mod.analyticsEnabled).toBe(false);
    expect(mod.GA_MEASUREMENT_ID).toBeUndefined();
  });

  it("trims whitespace-only IDs to disabled", async () => {
    vi.stubEnv("NEXT_PUBLIC_GA_ID", "   ");
    vi.resetModules();
    const mod = await import("./analytics");
    expect(mod.analyticsEnabled).toBe(false);
  });
});
