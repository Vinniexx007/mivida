/**
 * Central site configuration — contact details, navigation and social links.
 * Keeping these in one place means copy/URLs only ever change here.
 */

const DEFAULT_SITE_URL = "https://www.mividadigital.co.uk";

/**
 * Resolve the public site URL. Vercel (and other hosts) can inject an empty
 * string for an unset env var, which would break `new URL(...)` at build time.
 * We trim, validate, and fall back to the canonical URL if anything is off.
 */
function resolveSiteUrl(): string {
  const candidate = process.env.SITE_URL?.trim();
  if (!candidate) return DEFAULT_SITE_URL;
  try {
    return new URL(candidate).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const site = {
  name: "Mivida Digital",
  tagline: "Smarter digital solutions for serious businesses",
  description:
    "Mivida Digital builds professional websites, custom software and digital services for small businesses and SMEs across the North West and nationwide.",
  url: resolveSiteUrl(),
  locale: "en_GB",
  contact: {
    email: "hello@mividadigital.co.uk",
    phone: "+44 7424 158513",
    phoneHref: "tel:+447424158513",
    whatsapp: "https://wa.me/447424158513",
    location: "North West, UK",
  },
  hours: [
    { day: "Monday – Friday", time: "8am – 7pm" },
    { day: "Saturday", time: "9am – 1pm" },
  ],
} as const;

export const nav: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type SocialPlatform = "facebook" | "instagram" | "x" | "whatsapp";

export const socials: ReadonlyArray<{
  platform: SocialPlatform;
  label: string;
  href: string;
}> = [
  {
    platform: "facebook",
    label: "Mivida Digital on Facebook",
    href: "https://www.facebook.com/mividadigitalUK",
  },
  {
    platform: "instagram",
    label: "Mivida Digital on Instagram",
    href: "https://www.instagram.com/mividadigitaluk/",
  },
  {
    platform: "x",
    label: "Mivida Digital on X",
    href: "https://x.com/mividadigitaluk",
  },
  {
    platform: "whatsapp",
    label: "Message Mivida Digital on WhatsApp",
    href: "https://wa.me/447424158513",
  },
];
