import type { Metadata } from "next";
import {
  LegalHero,
  LegalBody,
  LegalSection,
  LegalList,
  LegalContact,
} from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "How Mivida Digital uses cookies and similar technologies on mividadigital.co.uk.",
  alternates: { canonical: "/legal/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <>
      <LegalHero title="Cookie Policy" lastUpdated="23rd September 2026" />
      <LegalBody>
        <p className="text-lg leading-relaxed text-slate">
          This Cookie Policy explains how Mivida Digital (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;, &ldquo;our&rdquo;) uses cookies and similar
          technologies on mividadigital.co.uk.
        </p>

        <LegalSection heading="1. What Are Cookies?">
          <p>
            Cookies are small text files placed on your device when you visit a
            website. They&apos;re widely used to make websites work, work more
            efficiently, and to provide information to the site owner.
          </p>
        </LegalSection>

        <LegalSection heading="2. Cookies We Use">
          <p>
            <strong>Essential cookies.</strong> We use cookies that are strictly
            necessary for the site to function correctly (for example,
            remembering basic settings as you browse). These essential cookies
            don&apos;t require your consent under UK law, as the site can&apos;t
            work properly without them.
          </p>
          <p>
            <strong>Analytics cookies (optional).</strong> We use{" "}
            <strong>Google Analytics</strong> to understand how visitors use the
            site so we can improve it. Google Analytics sets cookies that help
            us measure things like which pages are visited and how people move
            through the site.
          </p>
          <p>
            These analytics cookies are{" "}
            <strong>optional and only set if you accept them</strong>. When you
            first visit the site, we show a cookie banner asking whether
            you&apos;re happy for us to use analytics. Nothing non-essential is
            loaded until you choose <strong>Accept</strong> — if you choose{" "}
            <strong>Reject</strong>, no Google Analytics cookies are set and no
            analytics scripts are loaded at all.
          </p>
          <p>
            We link out to our social media channels (Facebook, Instagram, X,
            and WhatsApp). We don&apos;t set cookies through these links
            ourselves — but if you click through to one of those platforms, that
            platform&apos;s own cookie and privacy policy will apply.
          </p>
        </LegalSection>

        <LegalSection heading="3. Changing or Withdrawing Your Consent">
          <p>You&apos;re in control of your analytics choice at any time:</p>
          <LegalList
            items={[
              "Your choice is remembered so you're not asked on every visit",
              <>
                You can change it or withdraw consent whenever you like using
                the <strong>Cookie settings</strong> link in the website footer,
                which reopens the banner
              </>,
              <>
                Choosing <strong>Reject</strong> stops Google Analytics from
                loading on the site
              </>,
            ]}
          />
        </LegalSection>

        <LegalSection heading="4. Managing Cookies">
          <p>
            Even where a cookie doesn&apos;t require consent, you can control or
            delete cookies through your browser settings at any time. Most
            browsers let you:
          </p>
          <LegalList
            items={[
              "See what cookies you have and delete them individually",
              "Block third-party cookies",
              "Block cookies from particular sites",
              "Block all cookies",
              "Delete all cookies when you close your browser",
            ]}
          />
          <p>
            Bear in mind that blocking essential cookies may affect how parts of
            our website work.
          </p>
        </LegalSection>

        <LegalSection heading="5. Changes to This Policy">
          <p>
            We&apos;ll update this policy whenever the cookies we use on the site
            change. Please check back periodically.
          </p>
        </LegalSection>

        <LegalContact intro="If you have any questions about our use of cookies, contact us at:" />
      </LegalBody>
    </>
  );
}
