import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { LinkButton } from "@/components/Button";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Section tone="white" containerClassName="text-center">
      <p className="font-heading text-6xl font-bold text-amber">404</p>
      <h1 className="mt-4 text-3xl sm:text-4xl">We couldn&apos;t find that page</h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate">
        The page you&apos;re after might have moved. Let&apos;s get you back on
        track.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <LinkButton href="/">Back to home</LinkButton>
        <LinkButton href="/contact" variant="ghost">
          Get in touch →
        </LinkButton>
      </div>
    </Section>
  );
}
