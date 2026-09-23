import type { Metadata } from "next";
import {
  LegalHero,
  LegalBody,
  LegalSection,
  LegalList,
  LegalContact,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions that apply when you engage Mivida Digital for websites, software and digital services.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <>
      <LegalHero title="Terms & Conditions" lastUpdated="23rd September 2026" />
      <LegalBody>
        <p className="text-lg leading-relaxed text-slate">
          Please read these Terms &amp; Conditions (&ldquo;
          <strong>Terms</strong>&rdquo;) carefully before engaging Mivida
          Digital for any services. By instructing us to carry out work,
          requesting a quote that you go on to accept, or otherwise engaging our
          services, you agree to be bound by these Terms.
        </p>

        <LegalSection heading="1. About Us">
          <p>
            Mivida Digital is a sole trader business based in Manchester, United
            Kingdom.
          </p>
          <p>
            Email:{" "}
            <a href="mailto:hello@mividadigital.co.uk">
              hello@mividadigital.co.uk
            </a>
            <br />
            Phone: <a href="tel:+447424158513">+44 7424 158513</a>
            <br />
            Website:{" "}
            <a
              href="https://mividadigital.co.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://mividadigital.co.uk
            </a>
          </p>
        </LegalSection>

        <LegalSection heading="2. Our Services">
          <p>
            We provide digital services to small businesses and SMEs, including
            (but not limited to):
          </p>
          <LegalList
            items={[
              "Website design and redesign",
              "Website hosting, domain registration and business email management",
              "Google Business Profile setup",
              "Search engine optimisation (SEO)",
              "Branding",
              "Mobile app development",
              "Bespoke software development",
              "Ongoing website maintenance (Care Plan)",
            ]}
          />
          <p>
            The specific scope, deliverables, timescales and price for any piece
            of work will be confirmed in writing (by email or equivalent) before
            work begins, following a free, no-obligation quote.
          </p>
        </LegalSection>

        <LegalSection heading="3. Quotes &amp; Agreeing to Work">
          <LegalList
            items={[
              "All quotes are free and non-binding until accepted by you.",
              "A quote will set out what's included, what it costs, and roughly how long the work will take.",
              "Work only begins once a quote has been accepted and any required terms (such as project details or payment arrangements) have been confirmed between us.",
              "We reserve the right to decline any enquiry or project at our discretion.",
            ]}
          />
        </LegalSection>

        <LegalSection heading="4. Payment">
          <LegalList
            items={[
              "Payment is not taken through our website. Payment terms (including any deposit, payment schedule, and method) will be agreed with you individually as part of each project or service arrangement.",
              "For ongoing monthly services (such as hosting, domain and email management, or our Care Plan), fees are billed on a recurring basis as agreed with you at the outset.",
              "If payment is not received in accordance with the agreed terms, we reserve the right to pause or suspend work, hosting or other services until payment is made.",
            ]}
          />
        </LegalSection>

        <LegalSection heading="5. Cancellations">
          <LegalList
            items={[
              <>
                For ongoing/recurring services (including hosting, domain and
                email management, and the Care Plan), either party may cancel by
                giving <strong>30 days&apos; written notice</strong>.
              </>,
              "For one-off project work (such as a new website build), cancellation terms — including any fees for work already carried out — will be agreed as part of the individual project quote or contract.",
            ]}
          />
        </LegalSection>

        <LegalSection heading="6. Intellectual Property">
          <p>
            Once a project is delivered to you, you will own the intellectual
            property rights in the final website, design and/or software created
            specifically for you as part of that project, except for:
          </p>
          <LegalList
            items={[
              "Any third-party tools, plugins, frameworks, stock imagery or licensed assets used within the project, which remain subject to their own licence terms;",
              "Any of our own general tools, templates, frameworks or pre-existing code libraries used to help build your project, which we retain the right to reuse for other clients.",
            ]}
          />
          <p>
            We may request permission to showcase completed work in our own
            portfolio or marketing materials, but will not do so without your
            agreement.
          </p>
        </LegalSection>

        <LegalSection heading="7. Third-Party Services">
          <p>
            Some of our services rely on third-party platforms (for example,
            Google, hosting providers, domain registrars, or email marketing
            tools). We aren&apos;t responsible for outages, changes, or issues
            arising from these third-party platforms that are outside our
            control, though we&apos;ll do our best to help resolve any issues
            that affect your project or service.
          </p>
        </LegalSection>

        <LegalSection heading="8. Liability">
          <p>
            Nothing in these Terms limits or excludes our liability for death or
            personal injury caused by our negligence, fraud, or anything else
            that can&apos;t legally be limited or excluded.
          </p>
          <p>
            Subject to that, to the fullest extent permitted by law, our total
            liability to you arising out of or in connection with any services
            we provide will be limited to the total fees paid by you for the
            relevant service, and we won&apos;t be liable for any indirect or
            consequential loss.
          </p>
        </LegalSection>

        <LegalSection heading="9. Changes to These Terms">
          <p>
            We may update these Terms from time to time. The version in force at
            the time you engage our services will apply, and any material
            changes affecting an ongoing project or service will be discussed
            with you directly.
          </p>
        </LegalSection>

        <LegalSection heading="10. Governing Law">
          <p>
            These Terms are governed by the laws of England and Wales, and any
            disputes will be subject to the exclusive jurisdiction of the courts
            of England and Wales.
          </p>
        </LegalSection>

        <LegalContact intro="If you have any questions about these Terms, please get in touch:" />
      </LegalBody>
    </>
  );
}
