import type { Metadata } from "next";
import { Section, Eyebrow } from "@/components/Section";
import { LinkButton } from "@/components/Button";
import { CtaBand } from "@/components/CtaBand";
import { pricing } from "@/lib/services";

export const metadata: Metadata = {
  title: "Web Design, Software & Digital Services",
  description:
    "Professional websites, custom software, mobile apps and Google Business Profile setup for small businesses and SMEs across the North West and nationwide. From £99. Free quote available.",
  alternates: { canonical: "/services" },
};

type ServiceItem = {
  id: string;
  n: number;
  title: string;
  price: string;
  intro: string;
  included: string[];
  note?: string;
  cta: { label: string; href: string };
};

const websiteServices: ServiceItem[] = [
  {
    id: "website-design",
    n: 1,
    title: "Website Design",
    price: "£499 — one-off payment",
    intro:
      "Your website is your hardest working employee. It never clocks off and is always there when a potential customer searches for what you offer at 10pm on a Sunday. We build clean, fast, mobile-friendly websites that turn visitors into customers.",
    included: [
      "5-page professional website — Home, Services/Products, About, Gallery, Contact",
      "Mobile optimised — most customers will find you on their phone",
      "Contact form & click-to-call button",
      "Local SEO setup so Google knows what you do and where",
      "Google Maps integration",
      "Photo gallery to showcase your products, work or premises",
      "Fast loading — built with performance in mind from day one",
      "Live within 2 weeks",
      "1 month free aftercare included",
      "Full handover — the site is 100% yours",
    ],
    note: "One new customer you wouldn't have otherwise found pays for it outright.",
    cta: { label: "Get Your Free Quote", href: "/contact" },
  },
  {
    id: "website-redesign",
    n: 2,
    title: "Website Redesign",
    price: "From £250 — one-off payment",
    intro:
      "Already have a website but it looks dated, isn't showing up on Google, or just doesn't reflect the quality of your business? A redesign is the smart, cost-effective fix.",
    included: [
      "Modernised design and layout using current best practices",
      "Mobile optimisation",
      "Updated content and photos",
      "Local SEO improvements",
      "Refreshed contact form and calls to action",
      "Speed improvements",
    ],
    note: "Free assessment first — price confirmed before any work begins.",
    cta: { label: "Book a Free Assessment", href: "/contact" },
  },
  {
    id: "hosting-domain",
    n: 3,
    title: "Website Hosting & Domain Registration",
    price: "£25 per month",
    intro:
      "Getting a domain and setting up hosting is where most business owners hit a wall. We take care of all of it — so you never have to worry about the technical side of keeping your website live and secure.",
    included: [
      "Domain name registration — registered in your name, always",
      "Reliable business hosting — fast, secure, and always on",
      "Full DNS setup and technical configuration",
      "Annual domain and hosting renewal — managed by us",
      "Security monitoring",
      "Technical support — if anything goes wrong, we fix it",
    ],
    note: "You own your domain. We just manage the technical side so you don't have to.",
    cta: { label: "Add Hosting & Domain", href: "/contact" },
  },
  {
    id: "business-email",
    n: 4,
    title: "Business Email",
    price: "Get a Quote",
    intro:
      "A Gmail or Hotmail address doesn't do a serious business any favours. We set up professional business email on your own domain — properly configured, secure, and easy to use on any device.",
    included: [
      "Business email accounts on your own domain (e.g. you@yourbusiness.co.uk)",
      "Setup across desktop and mobile",
      "Spam and security configuration",
      "Ongoing support if anything goes wrong",
    ],
    note: "Priced around how many mailboxes you need.",
    cta: { label: "Get a Quote", href: "/contact" },
  },
  {
    id: "maintenance",
    n: 5,
    title: "Website Maintenance (Care Plan)",
    price: "£29 per month — cancel any time",
    intro:
      "Your website needs occasional updates, security checks, and tweaks to keep performing at its best. Our care plan takes that completely off your plate.",
    included: [
      "Monthly content updates (photos, products, seasonal changes)",
      "Security monitoring and updates",
      "Speed and performance checks",
      "Priority support — issues resolved within 48 hours",
      "Monthly visitor summary showing how your site is performing",
    ],
    note: "No long-term contract, cancel any time.",
    cta: { label: "Add a Care Plan", href: "/contact" },
  },
];

const marketingServices: ServiceItem[] = [
  {
    id: "google-business-profile",
    n: 6,
    title: "Google Business Profile Setup",
    price: "£99 — one-off payment",
    intro:
      "When someone searches \"print shop near me\" or \"accountant in Salford\", Google Maps results appear before any websites. If your business isn't showing up there, you're losing customers before they've even seen your website.",
    included: [
      "Full Google Business Profile setup or overhaul",
      "Business category and service area optimisation",
      "Photo uploads — your premises, your products, your team",
      "Opening hours, contact details, and service descriptions",
      "Guidance on collecting and responding to Google reviews",
      "Linked to your website for maximum local visibility",
    ],
    note: "A complete Google profile with strong reviews can put you ahead of competitors who've been trading for years.",
    cta: { label: "Get Set Up on Google", href: "/contact" },
  },
  {
    id: "seo",
    n: 7,
    title: "SEO",
    price: "Get a Quote",
    intro:
      "Every business is chasing different keywords, customers and competitors — so SEO isn't something we price off a shelf. We build a plan around what will actually move the needle for you.",
    included: [
      "Keyword research specific to your business and area",
      "On-page SEO improvements",
      "Technical SEO health checks",
      "Ongoing monthly optimisation and reporting",
    ],
    note: "Scoped around your goals and competition.",
    cta: { label: "Get a Quote", href: "/contact" },
  },
  {
    id: "branding",
    n: 8,
    title: "Branding",
    price: "Get a Quote",
    intro:
      "If your logo, colours or messaging don't match the quality of what you actually do, we'll help fix that. From a simple refresh to a full identity, branding is scoped to what your business needs.",
    included: [
      "Logo design or refinement",
      "Colour palette and typography system",
      "Brand guidelines document",
      "Applied across website, social and stationery",
    ],
    note: "Scoped around the scale of the project.",
    cta: { label: "Get a Quote", href: "/contact" },
  },
];

const softwareServices: ServiceItem[] = [
  {
    id: "mobile-development",
    n: 9,
    title: "Mobile Development",
    price: "Get a Quote",
    intro:
      "Off-the-shelf apps rarely fit a real business perfectly. We design and build mobile apps tailored to exactly what you and your customers need — iOS, Android, or both.",
    included: [
      "Discovery and scoping session",
      "UX/UI design",
      "Native or cross-platform development",
      "Testing and app store submission",
      "Post-launch support",
    ],
    note: "Every app is scoped individually.",
    cta: { label: "Get a Quote", href: "/contact" },
  },
  {
    id: "software-development",
    n: 10,
    title: "Software Development",
    price: "Get a Quote",
    intro:
      "Spreadsheets and generic software can only take a growing business so far. We build bespoke software — from internal tools to customer-facing systems — designed around how you actually work.",
    included: [
      "Discovery and requirements mapping",
      "Custom-built software or systems",
      "Integration with your existing tools",
      "Testing, deployment and support",
    ],
    note: "Every project is scoped individually.",
    cta: { label: "Get a Quote", href: "/contact" },
  },
];

const process = [
  {
    n: "1",
    title: "Free Quote (15 mins)",
    body: "A quick, no-obligation call to understand your business and what you need. No jargon, no hard sell.",
  },
  {
    n: "2",
    title: "Technical Foundations Sorted",
    body: "Where relevant, we register your domain and set up hosting and email — fully managed by us from day one.",
  },
  {
    n: "3",
    title: "We Get to Work",
    body: "We handle all the design, content and technical build. You just send some details and answer a few simple questions.",
  },
  {
    n: "4",
    title: "You Review It",
    body: "Before anything goes live, you see the finished result and request any changes. We want you to love it.",
  },
  {
    n: "5",
    title: "Go Live",
    body: "Your project launches. We walk you through everything and answer any questions.",
  },
  {
    n: "6",
    title: "Start Getting Results",
    body: "Your website, software or app is now working for you around the clock.",
  },
];

const faqs = [
  {
    q: "How long does a new website take?",
    a: "Most sites are live within 2 weeks of receiving your details and a brief description of your business.",
  },
  {
    q: "Do I need to sort my own domain, hosting and email?",
    a: "No — we handle domain registration, hosting and business email, fully managed by us. Your domain is always registered in your name so you own it outright.",
  },
  {
    q: "Do I need to write the content myself?",
    a: "No. Send us some details and a few bullet points about your business — we turn that into professional copy for you.",
  },
  {
    q: "Will my website show up on Google?",
    a: "We include local SEO basics with every site. Adding our Google Business Profile service (£99) significantly boosts your local visibility — it's the fastest win available to most small businesses.",
  },
  {
    q: "What happens after the free aftercare month ends?",
    a: "You can sign up to our Care Plan at £29/month or request one-off updates at £40/hour.",
  },
  {
    q: "Do I own my website, software or app?",
    a: "Yes — 100%. Once built and paid for, it's yours outright. Your domain is registered in your name from day one.",
  },
  {
    q: "How is pricing worked out for branding, SEO, mobile and software projects?",
    a: "These vary too much business to business for a flat price. We'll scope your project properly and give you a clear, honest quote before anything starts.",
  },
  {
    q: "What kinds of businesses do you work with?",
    a: "Retailers, e-commerce brands, tradespeople, local service providers, and growing SMEs across the North West and nationwide.",
  },
  {
    q: "I'm not technical — is that a problem?",
    a: "Not at all. We handle every technical aspect from start to finish.",
  },
];

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article
      id={item.id}
      className="scroll-mt-24 rounded-[--radius-brand] border border-slate/15 bg-white p-7 shadow-sm sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-2xl font-semibold text-navy">
          <span className="mr-2 font-heading text-amber-600">{item.n}.</span>
          {item.title}
        </h3>
        <p className="font-heading font-semibold text-navy">{item.price}</p>
      </div>
      <p className="mt-4 leading-relaxed text-slate">{item.intro}</p>
      <ul className="mt-5 grid gap-2 sm:grid-cols-2">
        {item.included.map((inc) => (
          <li key={inc} className="flex gap-2 text-[0.95rem] text-navy">
            <span aria-hidden className="mt-0.5 shrink-0 text-amber-600">
              ✓
            </span>
            <span>{inc}</span>
          </li>
        ))}
      </ul>
      {item.note ? (
        <p className="mt-5 border-l-4 border-amber bg-mist px-4 py-3 text-sm italic text-slate">
          {item.note}
        </p>
      ) : null}
      <div className="mt-6">
        <LinkButton href={item.cta.href}>{item.cta.label}</LinkButton>
      </div>
    </article>
  );
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow tone="white">{"Smarter digital solutions for serious businesses"}</Eyebrow>
          <h1 className="text-4xl sm:text-5xl">Our Services</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            Simple, honest digital services built for small businesses and
            established SMEs across the North West and nationwide. No monthly
            contracts on builds. No tech headaches. Just more customers, and
            better systems.
          </p>
        </div>
      </section>

      <Section tone="white">
        <div className="max-w-3xl">
          <h2 className="text-2xl sm:text-3xl">
            Everything You Need to Get Found, Get Online, and Grow
          </h2>
          <p className="mt-4 text-lg text-slate">
            We work with small businesses and SMEs of all kinds — retailers,
            tradespeople, local service providers, and growing companies that
            need proper software behind them. No confusing packages. No things
            you don&apos;t need. Just practical digital services that make a real
            difference.
          </p>
        </div>
      </Section>

      <Section tone="mist" id="websites">
        <Eyebrow>Websites &amp; hosting</Eyebrow>
        <h2 className="text-3xl sm:text-4xl">Get Online, Properly</h2>
        <div className="mt-10 space-y-6">
          {websiteServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      <Section tone="white" id="marketing">
        <Eyebrow>Marketing &amp; visibility</Eyebrow>
        <h2 className="text-3xl sm:text-4xl">Get Found &amp; Get Noticed</h2>
        <div className="mt-10 space-y-6">
          {marketingServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      <Section tone="mist" id="software">
        <Eyebrow>Software &amp; apps</Eyebrow>
        <h2 className="text-3xl sm:text-4xl">Build Something Bespoke</h2>
        <div className="mt-10 space-y-6">
          {softwareServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </Section>

      {/* Bundle */}
      <Section tone="navy" id="bundle">
        <div className="grid items-center gap-8 rounded-[--radius-brand] border border-white/10 bg-navy-800 p-8 sm:p-10 lg:grid-cols-[2fr,1fr]">
          <div>
            <Eyebrow tone="white">Best value</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">The Small Business Bundle</h2>
            <p className="mt-4 text-lg text-white/80">
              Get your new website and Google Business Profile set up together and
              save £50. Your website gives customers the full picture; your Google
              profile makes sure they can find you in the first place.
            </p>
            <ul className="mt-5 space-y-2 text-white/85">
              {[
                "Everything in Website Design (£499 value)",
                "Everything in Google Business Profile Setup (£99 value)",
                "Both delivered together within 2 weeks",
                "Priority turnaround",
              ].map((b) => (
                <li key={b} className="flex gap-2">
                  <span aria-hidden className="text-amber-300">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center lg:text-right">
            <p className="font-heading text-5xl font-bold text-amber-300">£548</p>
            <p className="mt-1 text-sm text-white/70">saving £50 vs separately</p>
            <div className="mt-6">
              <LinkButton href="/contact" size="lg">
                Get the Bundle
              </LinkButton>
            </div>
          </div>
        </div>
        <p className="mt-6 text-center text-white/70">
          Need something small outside a Care Plan? We&apos;re happy to help
          ad-hoc at <span className="font-semibold text-white">£40/hour</span>.
        </p>
      </Section>

      {/* Pricing table */}
      <Section tone="white" id="pricing">
        <div className="max-w-3xl">
          <Eyebrow>Pricing summary</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">All Our Services at a Glance</h2>
        </div>
        <div className="mt-8 overflow-hidden rounded-[--radius-brand] border border-slate/15">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">Full pricing summary</caption>
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
              {[
                ...pricing,
                { service: "Ad-hoc updates", price: "£40/hour" },
              ].map((row, i) => (
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
      </Section>

      {/* Process */}
      <Section tone="mist" id="process">
        <div className="max-w-3xl">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">A Simple, Transparent Process</h2>
        </div>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step) => (
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

      {/* FAQ */}
      <Section tone="white" id="faq">
        <div className="max-w-3xl">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Good to Know</h2>
        </div>
        <div className="mt-8 divide-y divide-slate/15 rounded-[--radius-brand] border border-slate/15">
          {faqs.map((faq) => (
            <details key={faq.q} className="group px-5 py-4">
              <summary className="flex cursor-pointer items-center justify-between gap-4 font-heading text-lg font-semibold text-navy marker:content-['']">
                {faq.q}
                <span
                  aria-hidden
                  className="shrink-0 text-amber-600 transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand
        heading="Not Sure Where to Start?"
        body="Get in touch and we'll give you an honest recommendation — no jargon, no pressure."
        primaryLabel="Get in Touch"
      />
    </>
  );
}
