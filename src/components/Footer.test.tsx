import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { Footer } from "./Footer";
import { ConsentProvider } from "./consent/ConsentProvider";
import { legalNav } from "@/lib/legal";

// The Footer's "Cookie settings" control reads the consent context, so the
// Footer must be rendered inside a provider.
function renderFooter() {
  return render(
    <ConsentProvider>
      <Footer />
    </ConsentProvider>,
  );
}

describe("<Footer />", () => {
  it("renders a Legal navigation region", () => {
    renderFooter();
    expect(
      screen.getByRole("navigation", { name: /legal/i }),
    ).toBeInTheDocument();
  });

  it("links to every legal page with the correct href", () => {
    renderFooter();
    const legalRegion = screen.getByRole("navigation", { name: /legal/i });
    for (const { label, href } of legalNav) {
      const link = within(legalRegion).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
    }
  });

  it("keeps the primary site nav alongside the legal nav", () => {
    renderFooter();
    expect(
      screen.getByRole("navigation", { name: /footer/i }),
    ).toBeInTheDocument();
  });
});
