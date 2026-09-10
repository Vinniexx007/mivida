"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import {
  businessTypeOptions,
  enquiryOptions,
} from "@/lib/contact-form";
import { submitContact, type ContactState } from "@/app/contact/actions";
import { Button } from "./Button";

const initialState: ContactState = { status: "idle" };

const fieldBase =
  "mt-1.5 w-full rounded-[--radius-brand] border bg-white px-4 py-2.5 text-navy placeholder:text-slate-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber";

function fieldClasses(hasError: boolean) {
  return `${fieldBase} ${
    hasError ? "border-red-500" : "border-slate/25"
  }`;
}

function Label({
  htmlFor,
  children,
  optional = false,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block font-heading text-sm font-semibold text-navy"
    >
      {children}
      {optional ? (
        <span className="ml-1 font-body font-normal text-slate">
          (optional)
        </span>
      ) : (
        <span className="ml-1 text-red-600" aria-hidden>
          *
        </span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-red-600">
      {message}
    </p>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} aria-disabled={pending}>
      {pending ? "Sending…" : "Send My Enquiry →"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const errors = state.errors ?? {};

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="rounded-[--radius-brand] border border-amber/40 bg-mist p-8 text-center"
      >
        <div
          aria-hidden
          className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber text-2xl font-bold text-navy"
        >
          ✓
        </div>
        <h3 className="mt-4 text-2xl text-navy">Message sent</h3>
        <p className="mx-auto mt-2 max-w-md text-slate">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && state.message ? (
        <p
          role="alert"
          className="rounded-[--radius-brand] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your Name</Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={fieldClasses(!!errors.name)}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div>
          <Label htmlFor="businessName">Your Business Name</Label>
          <input
            id="businessName"
            name="businessName"
            type="text"
            autoComplete="organization"
            required
            aria-invalid={!!errors.businessName}
            aria-describedby={
              errors.businessName ? "businessName-error" : undefined
            }
            className={fieldClasses(!!errors.businessName)}
          />
          <FieldError
            id="businessName-error"
            message={errors.businessName}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="businessType">Your Business Type</Label>
        <select
          id="businessType"
          name="businessType"
          required
          defaultValue=""
          aria-invalid={!!errors.businessType}
          aria-describedby={
            errors.businessType ? "businessType-error" : undefined
          }
          className={fieldClasses(!!errors.businessType)}
        >
          <option value="" disabled>
            Please choose…
          </option>
          {businessTypeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <FieldError id="businessType-error" message={errors.businessType} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Your Phone Number</Label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={fieldClasses(!!errors.phone)}
          />
          <FieldError id="phone-error" message={errors.phone} />
        </div>

        <div>
          <Label htmlFor="email">Your Email Address</Label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={fieldClasses(!!errors.email)}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div>
        <Label htmlFor="website" optional>
          Your Website
        </Label>
        <input
          id="website"
          name="website"
          type="url"
          inputMode="url"
          placeholder="https://"
          autoComplete="url"
          className={fieldClasses(false)}
        />
      </div>

      <div>
        <Label htmlFor="enquiryType">What are you looking for?</Label>
        <select
          id="enquiryType"
          name="enquiryType"
          required
          defaultValue=""
          aria-invalid={!!errors.enquiryType}
          aria-describedby={
            errors.enquiryType ? "enquiryType-error" : undefined
          }
          className={fieldClasses(!!errors.enquiryType)}
        >
          <option value="" disabled>
            Please choose…
          </option>
          {enquiryOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <FieldError id="enquiryType-error" message={errors.enquiryType} />
      </div>

      <div>
        <Label htmlFor="message" optional>
          Anything else we should know?
        </Label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us a bit about your business and what you're hoping to achieve online — the more detail the better."
          className={fieldClasses(false)}
        />
      </div>

      {/* Honeypot — hidden from users, visible to bots. */}
      <div aria-hidden className="hidden">
        <label htmlFor="company_url">Leave this field blank</label>
        <input
          id="company_url"
          name="company_url"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="pt-2">
        <SubmitButton />
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate">
          <span>✓ Free consultation</span>
          <span>✓ No obligation</span>
          <span>✓ Response within 24 hours</span>
        </p>
      </div>
    </form>
  );
}
