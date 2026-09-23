import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// Control analytics config for the component tests: pretend GA is configured.
// The real gtag/consent helpers run for real so we can assert on dataLayer.
vi.mock("@/lib/analytics", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/analytics")>("@/lib/analytics");
  return {
    ...actual,
    GA_MEASUREMENT_ID: "G-TEST123",
    analyticsEnabled: true,
  };
});

// next/script renders its children/attrs into the DOM in the test env; we key
// "GA library requested" assertions off the presence of the loader script id.
vi.mock("next/script", () => ({
  default: (props: Record<string, unknown>) => {
    const { id, src, children } = props as {
      id?: string;
      src?: string;
      children?: React.ReactNode;
    };
    return (
      <script data-testid={id} data-src={src}>
        {children}
      </script>
    );
  },
}));

import { CONSENT_STORAGE_KEY } from "@/lib/analytics";
import { ConsentProvider, useConsent } from "./ConsentProvider";
import { CookieBanner } from "./CookieBanner";
import { Analytics } from "./Analytics";
import { CookieSettingsButton } from "./CookieSettingsButton";

function Harness() {
  return (
    <ConsentProvider>
      <CookieBanner />
      <Analytics />
      <CookieSettingsButton />
    </ConsentProvider>
  );
}

/** All gtag('consent', 'update', {...}) payloads pushed to the dataLayer. */
function consentUpdates(): Array<Record<string, string>> {
  const layer = (window.dataLayer ?? []) as unknown[];
  return layer
    .filter(
      (entry): entry is unknown[] =>
        Array.isArray(entry) &&
        entry[0] === "consent" &&
        entry[1] === "update",
    )
    .map((entry) => entry[2] as Record<string, string>);
}

/** The analytics_storage value from the most recent consent update, if any. */
function latestAnalyticsStorage(): string | undefined {
  const updates = consentUpdates();
  return updates.length ? updates[updates.length - 1].analytics_storage : undefined;
}

const gaRequested = () =>
  document.querySelector('[data-testid="ga-loader"]') !== null;

beforeEach(() => {
  window.localStorage.clear();
  // Reset the dataLayer between tests.
  window.dataLayer = [];
});

describe("cookie consent flow", () => {
  it("shows the banner for an undecided visitor", async () => {
    render(<Harness />);
    expect(
      await screen.findByRole("dialog", { name: /cookies on/i }),
    ).toBeInTheDocument();
  });

  it("keeps analytics_storage denied before any choice (Consent Mode default)", async () => {
    render(<Harness />);
    await screen.findByRole("dialog");
    // Consent Mode loads gtag early, but analytics stays denied until granted.
    expect(latestAnalyticsStorage()).toBe("denied");
  });

  it("grants analytics_storage after Accept, hides banner, persists choice", async () => {
    render(<Harness />);
    fireEvent.click(await screen.findByRole("button", { name: /^accept$/i }));

    expect(latestAnalyticsStorage()).toBe("granted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("granted");
  });

  it("keeps analytics_storage denied after Reject, hides banner, persists choice", async () => {
    render(<Harness />);
    fireEvent.click(await screen.findByRole("button", { name: /^reject$/i }));

    expect(latestAnalyticsStorage()).toBe("denied");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("denied");
  });

  it("never grants ad signals (no advertising), even after Accept", async () => {
    render(<Harness />);
    fireEvent.click(await screen.findByRole("button", { name: /^accept$/i }));
    const update = consentUpdates().at(-1)!;
    expect(update.ad_storage).toBe("denied");
    expect(update.ad_user_data).toBe("denied");
    expect(update.ad_personalization).toBe("denied");
  });

  it("respects a previously stored 'granted' choice: granted, no banner", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(<Harness />);

    await screen.findByRole("button", { name: /cookie settings/i });
    expect(latestAnalyticsStorage()).toBe("granted");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("respects a previously stored 'denied' choice: denied, no banner", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    render(<Harness />);

    await screen.findByRole("button", { name: /cookie settings/i });
    expect(latestAnalyticsStorage()).toBe("denied");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("requests the GA library when a Measurement ID is configured", async () => {
    render(<Harness />);
    // Consent Mode v2 loads gtag regardless of choice (cookieless until grant).
    expect(gaRequested()).toBe(true);
  });

  it("lets a visitor reopen the banner via Cookie settings and change their mind", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    render(<Harness />);

    await screen.findByRole("button", { name: /cookie settings/i });
    expect(latestAnalyticsStorage()).toBe("granted");

    fireEvent.click(screen.getByRole("button", { name: /cookie settings/i }));
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: /^reject$/i }));
    expect(latestAnalyticsStorage()).toBe("denied");
    expect(window.localStorage.getItem(CONSENT_STORAGE_KEY)).toBe("denied");
  });

  it("links to the cookie policy from the banner", async () => {
    render(<Harness />);
    const dialog = await screen.findByRole("dialog");
    const link = screen.getByRole("link", { name: /cookie policy/i });
    expect(dialog).toContainElement(link);
    expect(link).toHaveAttribute("href", "/legal/cookie-policy");
  });
});

describe("useConsent guard", () => {
  it("throws when used outside a ConsentProvider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    function Bad() {
      useConsent();
      return null;
    }
    expect(() => render(<Bad />)).toThrow(/within a ConsentProvider/i);
    spy.mockRestore();
  });
});

describe("consent persistence corruption handling", () => {
  it("treats an invalid stored value as no choice (shows banner)", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "not-a-real-state");
    render(<Harness />);
    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });
});
