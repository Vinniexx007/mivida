import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { SocialIcons } from "@/components/SocialIcons";
import { LinkButton } from "@/components/Button";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact | Free Web Design & Software Quote",
  description:
    "Get in touch with Mivida Digital for a free, no-obligation quote on web design, software and digital services for small businesses and SMEs. WhatsApp, email, or contact form — we respond within 24 hours.",
  alternates: { canonical: "/contact" },
};

const nextSteps = [
  {
    n: "1",
    title: "We get back to you within 24 hours",
    body: "Usually much sooner. We'll confirm receipt and suggest a time for a quick call if useful.",
  },
  {
    n: "2",
    title: "A free 15-minute chat",
    body: "We'll ask a few simple questions about your business and what you're hoping to achieve. No jargon, no pressure.",
  },
  {
    n: "3",
    title: "You get a clear quote",
    body: "A straightforward quote with exactly what's included, what it costs, and how long it'll take — all confirmed before anything is agreed.",
  },
  {
    n: "4",
    title: "You decide",
    body: "No chasing, no pressure. If you're happy, we get started. If you need more time, that's absolutely fine.",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow tone="white">
            Smarter digital solutions for serious businesses
          </Eyebrow>
          <h1 className="text-4xl sm:text-5xl">Get in Touch</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            Ready to get your business found online? We&apos;d love to hear from
            you. We&apos;re based in the North West and respond to all enquiries
            within 24 hours. No hard sell. No obligation. Just a straight-talking
            conversation about what your business needs.
          </p>
        </div>
      </section>

      <Section tone="white">
        <div className="grid gap-12 lg:grid-cols-[1.4fr,1fr]">
          {/* Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl">Send Us a Message</h2>
            <p className="mt-2 text-slate">
              Fill in a few details and we&apos;ll be in touch. Fields marked
              with <span className="text-red-600">*</span> are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          {/* Alternative contact */}
          <aside className="lg:pl-4">
            <div className="rounded-[--radius-brand] border border-slate/15 bg-mist p-7">
              <h2 className="text-xl sm:text-2xl">Prefer to Talk Directly?</h2>
              <p className="mt-2 text-slate">
                Sometimes it&apos;s just easier to pick up the phone or drop a
                WhatsApp. Reach out on any channel below.
              </p>

              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="font-heading font-semibold text-navy">
                    Phone / WhatsApp
                  </dt>
                  <dd className="mt-1">
                    <a
                      href={site.contact.phoneHref}
                      className="text-slate transition-colors hover:text-amber-600"
                    >
                      {site.contact.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-heading font-semibold text-navy">Email</dt>
                  <dd className="mt-1">
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="text-slate transition-colors hover:text-amber-600"
                    >
                      {site.contact.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-heading font-semibold text-navy">Hours</dt>
                  <dd className="mt-1 space-y-0.5 text-slate">
                    {site.hours.map((h) => (
                      <p key={h.day}>
                        {h.day}: {h.time}
                      </p>
                    ))}
                    <p className="pt-1 italic text-slate-300">
                      We know business owners keep long hours — so do we.
                    </p>
                  </dd>
                </div>
              </dl>

              <div className="mt-6">
                <LinkButton
                  href={site.contact.whatsapp}
                  variant="primary"
                  className="w-full"
                >
                  Message us on WhatsApp
                </LinkButton>
              </div>

              <div className="mt-6 border-t border-slate/15 pt-5">
                <p className="font-heading text-sm font-semibold text-navy">
                  Follow us
                </p>
                <div className="mt-2 rounded-[--radius-brand] bg-navy p-2">
                  <SocialIcons className="justify-center" />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {/* What happens next */}
      <Section tone="mist">
        <div className="max-w-3xl">
          <Eyebrow>What happens next</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            What Happens After You Get in Touch?
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nextSteps.map((step) => (
            <li
              key={step.n}
              className="rounded-[--radius-brand] border border-slate/15 bg-white p-6 shadow-sm"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber font-heading text-lg font-bold text-navy">
                {step.n}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-navy">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-slate">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Reassurance */}
      <Section tone="white" containerClassName="text-center">
        <h2 className="text-3xl sm:text-4xl">Not Ready Yet? That&apos;s Fine Too.</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate">
          Have a browse of our services or read more about how we work. When
          you&apos;re ready, we&apos;ll be here.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <LinkButton href="/services">View Our Services →</LinkButton>
          <LinkButton href="/about" variant="ghost">
            More about us →
          </LinkButton>
        </div>
      </Section>
    </>
  );
}
