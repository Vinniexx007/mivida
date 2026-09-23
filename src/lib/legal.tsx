import type { ReactNode } from "react";
import Link from "next/link";
import { site } from "@/lib/site";

/**
 * Shared building blocks for the legal pages (Cookie Policy, Privacy Policy,
 * Terms & Conditions). These pages are hand-authored React rather than rendered
 * from markdown, matching the rest of the site (no markdown/MDX dependency).
 * Content mirrors the source docs in /Terms.
 */

export const legalPages = {
  cookiePolicy: {
    slug: "cookie-policy",
    title: "Cookie Policy",
    href: "/legal/cookie-policy",
  },
  privacyPolicy: {
    slug: "privacy-policy",
    title: "Privacy Policy",
    href: "/legal/privacy-policy",
  },
  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    href: "/legal/terms",
  },
} as const;

/** Ordered list used by the footer and sitemap so links stay in sync. */
export const legalNav: ReadonlyArray<{ label: string; href: string }> = [
  { label: legalPages.privacyPolicy.title, href: legalPages.privacyPolicy.href },
  { label: legalPages.cookiePolicy.title, href: legalPages.cookiePolicy.href },
  { label: legalPages.terms.title, href: legalPages.terms.href },
];

/** Full-width navy hero used at the top of every legal page. */
export function LegalHero({
  title,
  lastUpdated,
}: {
  title: string;
  lastUpdated: string;
}) {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 sm:px-8 sm:py-20">
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-white/70">Last updated: {lastUpdated}</p>
      </div>
    </section>
  );
}

/**
 * Constrained prose container for legal copy. Uses explicit typographic classes
 * (rather than a prose plugin, which isn't installed) so styling stays on-brand.
 */
export function LegalBody({ children }: { children: ReactNode }) {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-3xl space-y-8 px-5 py-16 sm:px-8 sm:py-20 [&_a]:font-semibold [&_a]:text-amber-600 [&_a:hover]:underline">
        {children}
      </div>
    </div>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl text-navy sm:text-3xl">{heading}</h2>
      <div className="space-y-4 text-lg leading-relaxed text-slate">
        {children}
      </div>
    </section>
  );
}

/** Bulleted list styled for legal copy. */
export function LegalList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed text-slate">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

/**
 * Standard "Contact Us" block. Every legal doc ends with the same email/phone,
 * so we centralise it and pull the values from the site config.
 */
export function LegalContact({ intro }: { intro: string }) {
  return (
    <LegalSection heading="Contact Us">
      <p>{intro}</p>
      <p>
        Email:{" "}
        <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
        <br />
        Phone: <a href={site.contact.phoneHref}>{site.contact.phone}</a>
      </p>
    </LegalSection>
  );
}

/** Internal cross-link between legal pages (e.g. privacy → cookie policy). */
export function LegalCrossLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return <Link href={href}>{children}</Link>;
}
