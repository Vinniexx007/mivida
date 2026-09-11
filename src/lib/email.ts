import "server-only";
import { Resend } from "resend";
import type { ContactFormData } from "./contact-form";
import { site } from "./site";

export type SendResult =
  | { ok: true; mocked: boolean }
  | { ok: false; error: string };

const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "hello@contact.mividadigital.co.uk";
const TO = process.env.CONTACT_TO_EMAIL ?? site.contact.email;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderText(data: ContactFormData): string {
  return [
    `New enquiry from the ${site.name} website`,
    "",
    `Name:          ${data.name}`,
    `Business:      ${data.businessName}`,
    `Business type: ${data.businessType}`,
    `Phone:         ${data.phone}`,
    `Email:         ${data.email}`,
    `Website:       ${data.website || "—"}`,
    `Looking for:   ${data.enquiryType}`,
    "",
    "Message:",
    data.message || "—",
  ].join("\n");
}

function renderHtml(data: ContactFormData): string {
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Business", data.businessName],
    ["Business type", data.businessType],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Website", data.website || "—"],
    ["Looking for", data.enquiryType],
  ];
  const table = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#526174">${label}</td><td style="padding:4px 0;color:#051a3e"><strong>${escapeHtml(
          value,
        )}</strong></td></tr>`,
    )
    .join("");
  return `<div style="font-family:Inter,Arial,sans-serif;color:#051a3e">
    <h2 style="color:#051a3e">New enquiry from the ${site.name} website</h2>
    <table style="border-collapse:collapse">${table}</table>
    <h3 style="color:#051a3e;margin-top:20px">Message</h3>
    <p style="white-space:pre-wrap;color:#526174">${
      escapeHtml(data.message) || "—"
    }</p>
  </div>`;
}

/**
 * Sends a contact enquiry via Resend.
 *
 * Mock path (offline, no network): used only outside production so local dev
 * and CI stay offline. It triggers when the key is the literal "test", or when
 * the key is unset in a non-production environment.
 *
 * In production, a missing/blank key is a real misconfiguration — we return a
 * graceful error instead of a false success so the enquiry is never silently
 * dropped and the UI can point the visitor to WhatsApp/email.
 */
export async function sendContactEnquiry(
  data: ContactFormData,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  if (apiKey === "test" || (!apiKey && !isProduction)) {
    return { ok: true, mocked: true };
  }

  if (!apiKey) {
    // Production with no configured key: fail gracefully, don't fake success.
    return { ok: false, error: "Email service is not configured." };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `${site.name} <${FROM}>`,
      to: [TO],
      replyTo: data.email,
      subject: `New enquiry — ${data.businessName} (${data.enquiryType})`,
      text: renderText(data),
      html: renderHtml(data),
    });

    if (error) {
      return { ok: false, error: "Email provider rejected the message." };
    }
    return { ok: true, mocked: false };
  } catch {
    // Never surface provider internals/secrets to the caller.
    return { ok: false, error: "Something went wrong sending your enquiry." };
  }
}
