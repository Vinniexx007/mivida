import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import { legalNav } from "@/lib/legal";
import { SocialIcons } from "./SocialIcons";
import { CookieSettingsButton } from "./consent/CookieSettingsButton";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white/80">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Link href="/" aria-label={`${site.name} — home`}>
            <Image
              src="/brand/logo-transparent.png"
              alt={site.name}
              width={2010}
              height={782}
              className="h-14 w-auto"
            />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Websites, software and digital services for small businesses and
            SMEs — {site.contact.location.toLowerCase()} based, trusted
            nationwide.
          </p>
          <SocialIcons className="mt-5 -ml-3" />
        </div>

        <nav aria-label="Footer">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Explore
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-amber-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Get in touch
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-amber-300"
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                href={site.contact.phoneHref}
                className="transition-colors hover:text-amber-300"
              >
                {site.contact.phone}
              </a>
            </li>
            <li className="pt-2 text-white/60">Free quote — reply within 24 hours.</li>
          </ul>
        </div>

        <nav aria-label="Legal">
          <h2 className="font-heading text-sm font-semibold uppercase tracking-widest text-white">
            Legal
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {legalNav.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="transition-colors hover:text-amber-300"
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>{site.contact.location} · Serving nationwide</p>
        </div>
      </div>
    </footer>
  );
}
