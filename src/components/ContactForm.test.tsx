import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";

// The form binds a Next.js server action; stub it so the component renders in
// jsdom without a server runtime. We're asserting structure/accessibility here.
vi.mock("@/app/contact/actions", () => ({
  submitContact: vi.fn(async () => ({ status: "idle" })),
}));

describe("<ContactForm />", () => {
  it("renders all required fields from the brief", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your business name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your business type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/what are you looking for/i)).toBeInTheDocument();
  });

  it("marks optional fields as optional", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText(/your website/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/anything else we should know/i),
    ).toBeInTheDocument();
  });

  it("exposes a submit button", () => {
    render(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /send my enquiry/i }),
    ).toBeInTheDocument();
  });

  it("renders the business-type and enquiry dropdowns as selects", () => {
    render(<ContactForm />);
    const businessType = screen.getByLabelText(
      /your business type/i,
    ) as HTMLSelectElement;
    const enquiry = screen.getByLabelText(
      /what are you looking for/i,
    ) as HTMLSelectElement;
    expect(businessType.tagName).toBe("SELECT");
    expect(enquiry.tagName).toBe("SELECT");
    expect(enquiry.querySelectorAll("option").length).toBeGreaterThan(5);
  });
});
