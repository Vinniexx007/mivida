import { site } from "@/lib/site";
import { LinkButton } from "./Button";
import { Section } from "./Section";

/** Reusable closing call-to-action band shown at the foot of most pages. */
export function CtaBand({
  heading = "Ready to Get Found Online?",
  body = "Let's build something that works as hard as you do.",
  primaryLabel = "Get Your Free Quote",
}: {
  heading?: string;
  body?: string;
  primaryLabel?: string;
}) {
  return (
    <Section tone="navy" containerClassName="text-center">
      <h2 className="text-3xl sm:text-4xl">{heading}</h2>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{body}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <LinkButton href="/contact" size="lg">
          {primaryLabel}
        </LinkButton>
        <LinkButton href={site.contact.whatsapp} variant="secondary" size="lg">
          Message us on WhatsApp
        </LinkButton>
      </div>
      <p className="mt-5 text-sm text-white/60">
        Free, no-obligation quote. Response within 24 hours.
      </p>
    </Section>
  );
}
