import type { Metadata } from "next";
import {
  LegalHero,
  LegalBody,
  LegalSection,
  LegalList,
  LegalContact,
  LegalCrossLink,
  legalPages,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Mivida Digital collects, uses and protects your personal data under UK GDPR and the Data Protection Act 2018.",
  alternates: { canonical: "/legal/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <LegalHero title="Privacy Policy" lastUpdated="23rd September 2026" />
      <LegalBody>
        <LegalSection heading="1. Who We Are">
          <p>
            Mivida Digital (&ldquo;<strong>we</strong>&rdquo;, &ldquo;
            <strong>us</strong>&rdquo;, &ldquo;<strong>our</strong>&rdquo;) is a
            sole trader business based in Manchester, United Kingdom, providing
            website design, software development and related digital services to
            small businesses and SMEs.
          </p>
          <p>
            For the purposes of UK data protection law (the UK GDPR and the Data
            Protection Act 2018), Mivida Digital is the{" "}
            <strong>data controller</strong> for the personal data described in
            this policy.
          </p>
          <p>
            <strong>Contact details:</strong>
            <br />
            Email:{" "}
            <a href="mailto:hello@mividadigital.co.uk">
              hello@mividadigital.co.uk
            </a>
            <br />
            Phone: <a href="tel:+447424158513">+44 7424 158513</a>
            <br />
            Location: Manchester, UK
          </p>
        </LegalSection>

        <LegalSection heading="2. What Personal Data We Collect">
          <p>
            We only collect the personal data you give us directly. Currently
            this is limited to the information submitted through our contact
            form, or given to us by phone, WhatsApp or email, which may include:
          </p>
          <LegalList
            items={[
              "Your name",
              "Your business name",
              "Your business type",
              "Your phone number",
              "Your email address",
              "Your website address (if you have one)",
              "Details of your enquiry, and anything else you choose to tell us",
            ]}
          />
          <p>
            We do not currently collect any other personal information about you
            (for example, we do not take payment details through our website).
          </p>
        </LegalSection>

        <LegalSection heading="3. How We Use Your Personal Data">
          <p>We use the information you provide to:</p>
          <LegalList
            items={[
              "Respond to your enquiry and discuss your requirements",
              "Prepare and send you a quote",
              "Communicate with you about a project you've asked us to work on",
              "Keep basic records of our business dealings with you",
            ]}
          />
          <p>
            <strong>Legal basis:</strong> we process this data on the basis of
            our <strong>legitimate interests</strong> in running our business
            and responding to enquiries from potential and existing clients.
            Where we send marketing communications by email, we will rely on
            your <strong>consent</strong>, which you can withdraw at any time
            (see Section 8).
          </p>
        </LegalSection>

        <LegalSection heading="4. How Long We Keep Your Data">
          <p>
            We keep personal data submitted through our contact form only for as
            long as we need it for the purpose of discussing and following up on
            your enquiry. Once an enquiry is closed and no longer relevant (for
            example, you&apos;ve decided not to proceed, or a project has
            concluded and there&apos;s no ongoing need to hold your details), we
            will delete it within a reasonable period.
          </p>
          <p>
            Where we go on to provide services to you as a client, we may need
            to retain some records for longer to meet our own legal, accounting
            or contractual obligations — this will be handled separately as part
            of any service agreement.
          </p>
        </LegalSection>

        <LegalSection heading="5. Sharing Your Data &amp; Third Parties">
          <p>
            We don&apos;t sell your personal data. We may share it with the
            following categories of third party, only where necessary:
          </p>
          <LegalList
            items={[
              <>
                <strong>Google Analytics</strong> — we use Google Analytics to
                understand how visitors use our website. Data collected through
                Google Analytics is processed in accordance with Google&apos;s
                own data processing and security terms. Some of this data may be
                processed or stored outside the UK; where it is, Google provides
                appropriate safeguards (such as the UK/EU Standard Contractual
                Clauses) for the transfer.
              </>,
              <>
                <strong>Google Business Profile</strong> — we use Google&apos;s
                tools to help set up and manage Google Business Profiles,
                including for clients, in line with Google&apos;s own terms.
              </>,
              <>
                <strong>Email marketing platform</strong> — we may use a
                third-party email marketing platform to send updates or
                marketing communications, where you&apos;ve agreed to receive
                them.
              </>,
              <>
                <strong>Professional advisers and authorities</strong> — where
                we&apos;re required to by law, or to protect our legal rights.
              </>,
            ]}
          />
          <p>
            We do not currently use advertising or tracking pixels (e.g.
            Meta/Facebook Pixel).
          </p>
          <h3 className="text-xl font-semibold text-navy">
            Acting as a data processor for clients
          </h3>
          <p>
            If we build or manage a website, contact form, hosting or email
            service for you as a client, we may in some cases process personal
            data on your behalf (for example, data submitted through a contact
            form on your website). Where this applies, the specific terms —
            including our responsibilities as a data processor — will be agreed
            separately as part of your service contract with us, rather than
            under this policy.
          </p>
        </LegalSection>

        <LegalSection heading="6. Cookies">
          <p>
            Our website&apos;s use of cookies and similar technologies is
            explained in our separate{" "}
            <LegalCrossLink href={legalPages.cookiePolicy.href}>
              Cookie Policy
            </LegalCrossLink>
            .
          </p>
        </LegalSection>

        <LegalSection heading="7. Data Security">
          <p>
            We take reasonable technical and organisational steps to protect the
            personal data we hold from loss, misuse or unauthorised access.
            However, no method of transmission over the internet is completely
            secure, and we can&apos;t guarantee absolute security.
          </p>
        </LegalSection>

        <LegalSection heading="8. Your Rights">
          <p>Under UK data protection law, you have the right to:</p>
          <LegalList
            items={[
              <>
                <strong>Access</strong> the personal data we hold about you
              </>,
              <>
                <strong>Correct</strong> inaccurate or incomplete data
              </>,
              <>
                <strong>Erase</strong> your data, in certain circumstances
              </>,
              <>
                <strong>Restrict</strong> how we use your data
              </>,
              <>
                <strong>Object</strong> to our use of your data, including for
                marketing
              </>,
              <>
                <strong>Data portability</strong>, where applicable
              </>,
              <>
                <strong>Withdraw consent</strong> at any time, where we&apos;re
                relying on consent (e.g. for marketing emails)
              </>,
            ]}
          />
          <p>
            To exercise any of these rights, contact us at{" "}
            <a href="mailto:hello@mividadigital.co.uk">
              hello@mividadigital.co.uk
            </a>
            .
          </p>
          <p>
            You also have the right to lodge a complaint with the{" "}
            <strong>Information Commissioner&apos;s Office (ICO)</strong>, the
            UK&apos;s data protection regulator, at{" "}
            <a
              href="https://ico.org.uk"
              target="_blank"
              rel="noopener noreferrer"
            >
              ico.org.uk
            </a>{" "}
            or by calling 0303 123 1113 — although we&apos;d really appreciate
            the chance to sort out any concerns directly first.
          </p>
        </LegalSection>

        <LegalSection heading="9. Changes to This Policy">
          <p>
            We may update this policy from time to time, for example as our
            services or the tools we use change. We&apos;ll update the &ldquo;last
            updated&rdquo; date at the top of this page when we do.
          </p>
        </LegalSection>

        <LegalContact intro="If you have any questions about this policy or how we handle your data, please get in touch:" />
      </LegalBody>
    </>
  );
}
