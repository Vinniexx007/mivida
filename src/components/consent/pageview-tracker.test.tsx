import { describe, it, expect, beforeEach, vi } from "vitest";
import { render } from "@testing-library/react";

vi.mock("@/lib/analytics", async () => {
  const actual =
    await vi.importActual<typeof import("@/lib/analytics")>("@/lib/analytics");
  return { ...actual, GA_MEASUREMENT_ID: "G-TEST123", analyticsEnabled: true };
});

// Controllable next/navigation mocks.
const nav = vi.hoisted(() => ({
  pathname: "/",
  search: "",
}));

vi.mock("next/navigation", () => ({
  usePathname: () => nav.pathname,
  useSearchParams: () => new URLSearchParams(nav.search),
}));

import { PageviewTracker } from "./PageviewTracker";
import { ConsentProvider } from "./ConsentProvider";
import { CONSENT_STORAGE_KEY } from "@/lib/analytics";

/** page_view events pushed to the dataLayer. */
function pageviews(): Array<Record<string, string>> {
  const layer = (window.dataLayer ?? []) as unknown[];
  return layer
    .filter(
      (e): e is unknown[] =>
        Array.isArray(e) && e[0] === "event" && e[1] === "page_view",
    )
    .map((e) => e[2] as Record<string, string>);
}

function renderTracker() {
  return render(
    <ConsentProvider>
      <PageviewTracker />
    </ConsentProvider>,
  );
}

beforeEach(() => {
  window.localStorage.clear();
  window.dataLayer = [];
  nav.pathname = "/";
  nav.search = "";
});

describe("<PageviewTracker />", () => {
  it("does not send a page_view without consent", () => {
    // No stored choice → consent "unknown".
    renderTracker();
    expect(pageviews()).toHaveLength(0);
  });

  it("sends a page_view for the initial path once consent is granted", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    nav.pathname = "/about";
    renderTracker();
    // Wait a tick for the provider to hydrate the stored choice + effect run.
    await vi.waitFor(() => {
      expect(pageviews()).toHaveLength(1);
    });
    expect(pageviews()[0].page_path).toBe("/about");
  });

  it("includes the query string in the page_path", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    nav.pathname = "/services";
    nav.search = "tab=software";
    renderTracker();
    await vi.waitFor(() => {
      expect(pageviews()).toHaveLength(1);
    });
    expect(pageviews()[0].page_path).toBe("/services?tab=software");
  });

  it("fires again when the path changes", async () => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    nav.pathname = "/";
    const { rerender } = renderTracker();
    await vi.waitFor(() => expect(pageviews()).toHaveLength(1));

    nav.pathname = "/contact";
    rerender(
      <ConsentProvider>
        <PageviewTracker />
      </ConsentProvider>,
    );
    await vi.waitFor(() => {
      const views = pageviews();
      expect(views.at(-1)?.page_path).toBe("/contact");
    });
  });
});
