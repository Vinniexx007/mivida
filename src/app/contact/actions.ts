"use server";

import {
  readContactForm,
  validateContactForm,
  type ContactFieldErrors,
} from "@/lib/contact-form";
import { sendContactEnquiry } from "@/lib/email";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: ContactFieldErrors;
  /**
   * Distinguishes a send/transport failure from a validation failure so the UI
   * can offer alternative contact channels (WhatsApp / email) as links.
   */
  reason?: "send-failed";
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  // Honeypot: bots fill hidden fields, humans don't. Silently "succeed".
  if ((formData.get("company_url") as string)?.length) {
    return { status: "success", message: "Thanks — we'll be in touch soon." };
  }

  const data = readContactForm(formData);
  const errors = validateContactForm(data);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Please check the highlighted fields and try again.",
      errors,
    };
  }

  const result = await sendContactEnquiry(data);

  if (!result.ok) {
    return {
      status: "error",
      reason: "send-failed",
      message:
        "Sorry — we couldn't send that just now. Please try again, or reach us on WhatsApp or email.",
    };
  }

  return {
    status: "success",
    message:
      "Thanks for getting in touch! We'll get back to you within 24 hours — usually much sooner.",
  };
}
