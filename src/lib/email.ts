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
 * When RESEND_API_KEY is unset or "test", we short-circuit to a mock path and
 * never hit the network — used in local dev and CI so tests/builds stay offline.
 */
export async function sendContactEnquiry(
  data: ContactFormData,
): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "test") {
    return { ok: true, mocked: true };
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
