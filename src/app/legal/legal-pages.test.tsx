import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import CookiePolicyPage from "./cookie-policy/page";
import PrivacyPolicyPage from "./privacy-policy/page";
import TermsPage from "./terms/page";
import { legalPages } from "@/lib/legal";

describe("Cookie Policy page", () => {
  it("renders the main heading", () => {
    render(<CookiePolicyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /cookie policy/i }),
    ).toBeInTheDocument();
  });

  it("explains that analytics cookies are optional and consent-gated", () => {
    render(<CookiePolicyPage />);
    expect(
      screen.getByText(/optional and only set if you accept them/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /changing or withdrawing your consent/i,
      }),
    ).toBeInTheDocument();
  });

  it("provides the contact email as a mailto link", () => {
    render(<CookiePolicyPage />);
    expect(
      screen.getByRole("link", { name: /hello@mividadigital\.co\.uk/i }),
    ).toHaveAttribute("href", "mailto:hello@mividadigital.co.uk");
  });
});

describe("Privacy Policy page", () => {
  it("renders the main heading", () => {
    render(<PrivacyPolicyPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /privacy policy/i }),
    ).toBeInTheDocument();
  });

  it("identifies Mivida Digital as the data controller", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByText(/data controller/i)).toBeInTheDocument();
  });

  it("cross-links to the Cookie Policy page", () => {
    render(<PrivacyPolicyPage />);
    const cookieLink = screen.getByRole("link", { name: /cookie policy/i });
    expect(cookieLink).toHaveAttribute("href", legalPages.cookiePolicy.href);
  });

  it("links to the ICO", () => {
    render(<PrivacyPolicyPage />);
    expect(screen.getByRole("link", { name: /ico\.org\.uk/i })).toHaveAttribute(
      "href",
      "https://ico.org.uk",
    );
  });
});

describe("Terms & Conditions page", () => {
  it("renders the main heading", () => {
    render(<TermsPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /terms & conditions/i }),
    ).toBeInTheDocument();
  });

  it("states the governing law is England and Wales", () => {
    render(<TermsPage />);
    const governing = screen.getByRole("heading", {
      level: 2,
      name: /governing law/i,
    });
    expect(governing).toBeInTheDocument();
    expect(
      screen.getByText(/laws of England and Wales/i),
    ).toBeInTheDocument();
  });

  it("lists the services offered", () => {
    render(<TermsPage />);
    const servicesHeading = screen.getByRole("heading", {
      level: 2,
      name: /our services/i,
    });
    expect(servicesHeading).toBeInTheDocument();
    expect(
      screen.getByText(/bespoke software development/i),
    ).toBeInTheDocument();
  });
});

describe("legal pages metadata", () => {
  it("exposes canonical, on-brand slugs", () => {
    expect(legalPages.cookiePolicy.href).toBe("/legal/cookie-policy");
    expect(legalPages.privacyPolicy.href).toBe("/legal/privacy-policy");
    expect(legalPages.terms.href).toBe("/legal/terms");
  });
});

describe("legal hero last-updated date", () => {
  it("shows a last-updated date on each page", () => {
    for (const Page of [CookiePolicyPage, PrivacyPolicyPage, TermsPage]) {
      const { container, unmount } = render(<Page />);
      expect(
        within(container).getByText(/last updated:/i),
      ).toBeInTheDocument();
      unmount();
    }
  });
});
