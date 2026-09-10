/**
 * Contact form schema + validation. Pure functions with no framework or IO
 * dependencies so they can run on the client, on the server action, and in
 * unit/property tests identically.
 */

export const enquiryOptions = [
  "A new website",
  "A redesign of my existing website",
  "Hosting, domain or business email",
  "Google Business Profile setup",
  "SEO",
  "Branding",
  "Mobile app development",
  "Custom software development",
  "The Small Business Bundle (website + Google profile)",
  "Monthly Care Plan",
  "Not sure yet — just want some advice",
] as const;

export type EnquiryOption = (typeof enquiryOptions)[number];

export const businessTypeOptions = [
  "Retail",
  "Trade / Local Service",
  "Growing SME",
  "Other",
] as const;

export type BusinessType = (typeof businessTypeOptions)[number];

export type ContactFormData = {
  name: string;
  businessName: string;
  businessType: string;
  phone: string;
  email: string;
  website: string;
  enquiryType: string;
  message: string;
};

export type ContactFieldErrors = Partial<
  Record<keyof ContactFormData, string>
>;

export const emptyContactForm: ContactFormData = {
  name: "",
  businessName: "",
  businessType: "",
  phone: "",
  email: "",
  website: "",
  enquiryType: "",
  message: "",
};

// Deliberately permissive: catch obvious mistakes without rejecting valid,
// unusual real-world addresses.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** True when the string has at least one visible digit and 7+ digits total. */
export function looksLikePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

/** Reads a raw FormData/object into a normalised ContactFormData (trimmed). */
export function readContactForm(
  input: Record<string, unknown> | FormData,
): ContactFormData {
  const get = (key: string): string => {
    const raw =
      input instanceof FormData ? input.get(key) : (input[key] as unknown);
    return typeof raw === "string" ? raw.trim() : "";
  };
  return {
    name: get("name"),
    businessName: get("businessName"),
    businessType: get("businessType"),
    phone: get("phone"),
    email: get("email"),
    website: get("website"),
    enquiryType: get("enquiryType"),
    message: get("message"),
  };
}

/**
 * Validates the form. Returns a map of field -> error message; an empty object
 * means the form is valid.
 */
export function validateContactForm(
  data: ContactFormData,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (!data.name) errors.name = "Please tell us your name.";
  if (!data.businessName)
    errors.businessName = "Please enter your business name.";
  if (!data.businessType)
    errors.businessType = "Please choose your business type.";

  if (!data.phone) {
    errors.phone = "Please enter a phone number.";
  } else if (!looksLikePhone(data.phone)) {
    errors.phone = "That doesn't look like a valid phone number.";
  }

  if (!data.email) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_RE.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!data.enquiryType)
    errors.enquiryType = "Please choose what you're looking for.";

  // website and message are optional — no validation required.
  return errors;
}

export function isContactFormValid(data: ContactFormData): boolean {
  return Object.keys(validateContactForm(data)).length === 0;
}
