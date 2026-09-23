import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { site } from "@/lib/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentProvider } from "@/components/consent/ConsentProvider";
import { Analytics } from "@/components/consent/Analytics";
import { CookieBanner } from "@/components/consent/CookieBanner";
import { PageviewTracker } from "@/components/consent/PageviewTracker";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Websites, Software & Digital Services for Serious Businesses`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "web design North West",
    "small business websites",
    "SME software development",
    "Google Business Profile setup",
    "custom software",
    "mobile app development",
  ],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
  },
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    areaServed: "GB",
    slogan: site.tagline,
    address: {
      "@type": "PostalAddress",
      addressRegion: "North West",
      addressCountry: "GB",
    },
  };

  return (
    <html lang="en-GB" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-white text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ConsentProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <Analytics />
          <Suspense fallback={null}>
            <PageviewTracker />
          </Suspense>
        </ConsentProvider>
      </body>
    </html>
  );
}
