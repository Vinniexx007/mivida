import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, Eyebrow } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { Card } from "@/components/Card";
import { CtaBand } from "@/components/CtaBand";
import { audiences, pricing } from "@/lib/services";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Websites, Software & Digital Services for Serious Businesses",
  description:
    "Mivida Digital builds professional websites, custom software and digital services for small businesses and SMEs across the North West and nationwide. From £99. Free quote available.",
  alternates: { canonical: "/" },
};

const trustBar = [
  "Built for serious businesses",
  "North West based, nationwide reach",
  "Website live in 2 weeks",
  "From just £99",
];

const whatYouGet = [
  {
    title: "A Website That Gets You Found",
    body: "Clean, fast, mobile-friendly websites built around your business and optimised for search — so customers find you when they need you most.",
  },
  {
    title: "Google Business Profile Setup",
    body: "Get your business showing up on Google Maps and local search results — one of the highest-impact things any small business can do online.",
  },
  {
    title: "Hosting, Domains & Business Email — Managed",
    body: "We handle domain registration, hosting and business email so you don't have to. One less thing to worry about, fully managed by us.",
  },
  {
    title: "Bespoke Software & Mobile Apps",
    body: "When off-the-shelf tools won't cut it, we design and build custom software and mobile applications tailored to your business.",
  },
];

const steps = [
  {
    n: "1",
    title: "Chat",
    body: "Tell us about your business and what you need. No tech knowledge required — just a quick, honest conversation.",
  },
  {
    n: "2",
    title: "We Sort the Tech",
    body: "We handle domain registration, hosting, business email and all the technical setup. You don't need to lift a finger.",
  },
  {
    n: "3",
    title: "We Build",
    body: "We design and build your website, software or app — handling everything from layout to copy to functionality.",
  },
  {
    n: "4",
    title: "Go Live & Get Found",
    body: "Your project goes live and starts working for you immediately. We walk you through everything before handover.",
  },
];

const testimonials = [
  {
    quote:
      "We'd been putting off a proper website for years. Mivida Digital made the whole thing painless — within a month we were getting enquiries directly through the site.",
    name: "Retail Business Owner, Manchester",
  },
  {
    quote:
      "Fast, professional, and they actually listened to what we needed. Our new site finally reflects the quality of our work.",
    name: "Trade Business Owner, Liverpool",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-amber/20 blur-3xl"
        />
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 sm:py-28 lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow tone="white">{site.tagline}</Eyebrow>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">
              Smarter Digital Solutions for Serious Businesses
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              Websites, software and digital services built for small businesses
              and established SMEs. North West based. Trusted nationwide. No
              jargon, no faff.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/contact" size="lg">
                Get Your Free Quote
              </LinkButton>
              <LinkButton href="/services" variant="secondary" size="lg">
                See Our Services ↓
              </LinkButton>
            </div>
          </div>
        </div>
        <ul className="border-t border-white/10 bg-navy-800">
          <div className="mx-auto flex w-full max-w-6xl flex-wrap gap-x-8 gap-y-2 px-5 py-4 text-sm text-white/75 sm:px-8">
            {trustBar.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span aria-hidden className="text-amber-300">
                  ✓
                </span>
                {item}
              </li>
            ))}
          </div>
        </ul>
      </section>

      {/* The problem */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>The opportunity</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            Your Customers Are Searching Online — Can They Find You?
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate">
            <p>
              Whether someone&apos;s looking for a product to buy, a tradesperson
              they can trust, or a supplier to run their business with — the first
              thing they do is search for it.
            </p>
            <p>
              If your business doesn&apos;t show up looking as sharp and capable
              as you actually are, that customer goes straight to a competitor
              with a better website and a stronger Google presence.
            </p>
            <p>
              A well-built website, the right software, and proper visibility
              online mean you&apos;re working for new business 24 hours a day —
              even when you&apos;re not.
            </p>
          </div>
        </div>
      </Section>

      {/* Who we help */}
      <Section tone="mist">
        <div className="max-w-3xl">
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            Built for Businesses That Are Serious About Growing
          </h2>
          <p className="mt-4 text-lg text-slate">
            We work with small businesses and established SMEs of all kinds — from
            retailers selling online to trades and local services, right through
            to growing companies that need custom software to keep up with demand.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title} title={a.title}>
              {a.body}
            </Card>
          ))}
        </div>
      </Section>

      {/* What we do */}
      <Section tone="white">
        <div className="max-w-3xl">
          <Eyebrow>What you get</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">What You Get With Mivida Digital</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {whatYouGet.map((s) => (
            <Card key={s.title} title={s.title}>
              {s.body}
            </Card>
          ))}
        </div>
        <div className="mt-10">
          <LinkButton href="/services" variant="ghost">
            See all services →
          </LinkButton>
        </div>
      </Section>

      {/* How it works */}
      <Section tone="navy">
        <div className="max-w-3xl">
          <Eyebrow tone="white">How it works</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            Getting Online Has Never Been Simpler
          </h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <li
              key={step.n}
              className="rounded-[--radius-brand] border border-white/10 bg-navy-800 p-6"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-amber font-heading text-lg font-bold text-navy">
                {step.n}
              </span>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/75">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Social proof */}
      <Section tone="mist">
        <div className="max-w-3xl">
          <Eyebrow>What our clients say</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Backed by Businesses Like Yours</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-[--radius-brand] border border-slate/15 bg-white p-8 shadow-sm"
            >
              <blockquote className="text-lg leading-relaxed text-navy">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-slate">
                — {t.name}
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* Pricing snapshot */}
      <Section tone="white">
        <div className="max-w-3xl">
          <Eyebrow>Pricing</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Simple, Honest Pricing</h2>
          <p className="mt-4 text-lg text-slate">
            No hidden fees on our fixed-price services. Anything bespoke gets a
            clear, honest quote before any work begins.
          </p>
        </div>
        <div className="mt-8 overflow-hidden rounded-[--radius-brand] border border-slate/15">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Mivida Digital pricing snapshot</caption>
            <thead className="bg-mist">
              <tr>
                <th scope="col" className="px-5 py-3 font-heading text-navy">
                  Service
                </th>
                <th scope="col" className="px-5 py-3 font-heading text-navy">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {pricing.map((row, i) => (
                <tr
                  key={row.service}
                  className={i % 2 ? "bg-mist/40" : "bg-white"}
                >
                  <td className="px-5 py-3 text-navy">{row.service}</td>
                  <td className="px-5 py-3 font-medium text-slate">
                    {row.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8">
          <LinkButton href="/services">See Full Pricing &amp; Services</LinkButton>
        </div>
      </Section>

      {/* About closer */}
      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>North West based. Serious business focused.</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">
              A Consultancy Built Around Your Growth
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              Mivida Digital is a North West digital consultancy built for small
              businesses and established SMEs who want a professional online
              presence and the software to match — without the agency price tag.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate">
              We handle everything — design, hosting, software, visibility — so
              you can focus on running your business.
            </p>
            <div className="mt-8">
              <LinkButton href="/about">Find Out More About Us</LinkButton>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[--radius-brand] shadow-md">
            <Image
              src="/images/web-development.jpg"
              alt="A developer building a website for a client"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <CtaBand />

      <p className="sr-only">
        <Link href="/services">Explore our services</Link>
      </p>
    </>
  );
}
