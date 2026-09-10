import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  validateContactForm,
  isContactFormValid,
  looksLikePhone,
  readContactForm,
  emptyContactForm,
  enquiryOptions,
  businessTypeOptions,
  type ContactFormData,
} from "./contact-form";

const validData: ContactFormData = {
  name: "Jordan Smith",
  businessName: "Smith Joinery",
  businessType: "Trade / Local Service",
  phone: "07424 158513",
  email: "jordan@smithjoinery.co.uk",
  website: "",
  enquiryType: "A new website",
  message: "",
};

describe("validateContactForm", () => {
  it("passes a fully valid enquiry", () => {
    expect(validateContactForm(validData)).toEqual({});
    expect(isContactFormValid(validData)).toBe(true);
  });

  it("flags every required field when empty", () => {
    const errors = validateContactForm(emptyContactForm);
    expect(errors.name).toBeDefined();
    expect(errors.businessName).toBeDefined();
    expect(errors.businessType).toBeDefined();
    expect(errors.phone).toBeDefined();
    expect(errors.email).toBeDefined();
    expect(errors.enquiryType).toBeDefined();
  });

  it("treats website and message as optional", () => {
    const errors = validateContactForm(emptyContactForm);
    expect(errors.website).toBeUndefined();
    expect(errors.message).toBeUndefined();
  });

  it("rejects malformed email addresses", () => {
    for (const bad of ["nope", "a@b", "a@b.", "@nowhere.com", "spaces @x.com"]) {
      expect(validateContactForm({ ...validData, email: bad }).email).toBeDefined();
    }
  });

  it("accepts reasonable email addresses", () => {
    for (const good of [
      "a@b.co",
      "first.last@sub.domain.co.uk",
      "user+tag@example.io",
    ]) {
      expect(
        validateContactForm({ ...validData, email: good }).email,
      ).toBeUndefined();
    }
  });

  it("rejects phone numbers that are too short or non-numeric", () => {
    for (const bad of ["", "123", "abcdef", "12-34"]) {
      expect(
        validateContactForm({ ...validData, phone: bad }).phone,
      ).toBeDefined();
    }
  });
});

describe("looksLikePhone", () => {
  it("accepts 7–15 digit numbers with common separators", () => {
    expect(looksLikePhone("07424 158513")).toBe(true);
    expect(looksLikePhone("+44 7424 158513")).toBe(true);
    expect(looksLikePhone("(0161) 123 4567")).toBe(true);
  });

  it("rejects too few or too many digits", () => {
    expect(looksLikePhone("123456")).toBe(false); // 6 digits
    expect(looksLikePhone("1".repeat(16))).toBe(false);
  });
});

describe("readContactForm", () => {
  it("reads and trims from a FormData", () => {
    const fd = new FormData();
    fd.set("name", "  Jordan  ");
    fd.set("email", " jordan@x.co ");
    const data = readContactForm(fd);
    expect(data.name).toBe("Jordan");
    expect(data.email).toBe("jordan@x.co");
  });

  it("defaults missing keys to empty strings", () => {
    expect(readContactForm({})).toEqual(emptyContactForm);
  });
});

describe("option lists", () => {
  it("exposes the enquiry and business-type options from the brief", () => {
    expect(enquiryOptions).toContain("A new website");
    expect(enquiryOptions).toContain("Not sure yet — just want some advice");
    expect(enquiryOptions.length).toBe(11);
    expect(businessTypeOptions.length).toBe(4);
  });
});

describe("property-based validation", () => {
  it("never throws and always returns a boolean-consistent result", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string(),
          businessName: fc.string(),
          businessType: fc.string(),
          phone: fc.string(),
          email: fc.string(),
          website: fc.string(),
          enquiryType: fc.string(),
          message: fc.string(),
        }),
        (raw) => {
          const data = readContactForm(raw);
          const errors = validateContactForm(data);
          const valid = isContactFormValid(data);
          // valid iff there are no error keys
          expect(valid).toBe(Object.keys(errors).length === 0);
        },
      ),
    );
  });

  it("any enquiry with all required fields present and a plausible email/phone is valid", () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 1 }).filter((s) => s.trim().length > 0),
          businessName: fc
            .string({ minLength: 1 })
            .filter((s) => s.trim().length > 0),
          local: fc
            .stringMatching(/^[a-z]{1,10}$/)
            .filter((s) => s.length > 0),
          domain: fc.stringMatching(/^[a-z]{1,10}$/).filter((s) => s.length > 0),
        }),
        ({ name, businessName, local, domain }) => {
          const data: ContactFormData = {
            name,
            businessName,
            businessType: businessTypeOptions[0],
            phone: "07424158513",
            email: `${local}@${domain}.co`,
            website: "",
            enquiryType: enquiryOptions[0],
            message: "",
          };
          expect(isContactFormValid(data)).toBe(true);
        },
      ),
    );
  });
});
