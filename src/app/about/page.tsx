import type { Metadata } from "next";
import Image from "next/image";
import { Section, Eyebrow } from "@/components/Section";
import { Card } from "@/components/Card";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "About | Websites & Software for Serious Businesses in the North West",
  description:
    "Mivida Digital is a North West digital consultancy building websites, software and digital services for small businesses and SMEs — retail, trades, and growing companies nationwide. Honest, affordable, results-focused.",
  alternates: { canonical: "/about" },
};

const audiences = [
  {
    title: "Retail & E-commerce",
    body: "Your products deserve to be found and sold properly. We build websites and stores that showcase what you offer and make it easy for customers to buy — on any device.",
  },
  {
    title: "Trades & Local Services",
    body: "Your work speaks for itself — your online presence should too. We build sites and Google profiles that make it easy for local customers to find you and trust you.",
  },
  {
    title: "Growing SMEs",
    body: "Whether you need custom software, a mobile app, or a digital overhaul as you scale — if you're a serious business outgrowing off-the-shelf tools, we'll help you build what's next.",
  },
];

const beliefs = [
  {
    title: "Professional",
    body: "Every project is handled properly, from the first conversation to long after launch. No shortcuts, no fluff.",
  },
  {
    title: "Trustworthy",
    body: "We do what we say we'll do, when we say we'll do it. You'll always know exactly where things stand.",
  },
  {
    title: "Innovative",
    body: "We use modern tools and techniques to make sure your website, software or app performs — fast, well built, and ahead of the curve.",
  },
  {
    title: "Results-driven",
    body: "We're not interested in work that just looks nice. Everything we build is measured by whether it actually moves your business forward.",
  },
  {
    title: "Approachable",
    body: "Real conversations, straight answers. We'll tell you what you actually need — not what earns us the most money.",
  },
  {
    title: "You own everything",
    body: "Your domain is registered in your name. Your website, software and code are yours outright once built and paid for. Control always stays with you.",
  },
];

const stats = [
  { value: "2 weeks", label: "average brief-to-live turnaround" },
  { value: "£499", label: "flat rate for a new website — no hidden costs" },
  { value: "North West", label: "based — always available, always straightforward" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy text-white">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <Eyebrow tone="white">
            Smarter digital solutions for serious businesses
          </Eyebrow>
          <h1 className="text-4xl sm:text-5xl">About Mivida Digital</h1>
          <p className="mt-5 max-w-3xl text-lg text-white/80">
            A North West digital consultancy built for the small businesses and
            SMEs that make our economy work.
          </p>
        </div>
      </section>

      {/* Main story */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl">
            We&apos;re Digital People Who Love Seeing Serious Businesses Win Online
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate">
            <p>Here&apos;s something that&apos;s always frustrated us.</p>
            <p>
              There are brilliant small businesses and SMEs everywhere —
              retailers with genuinely great products, tradespeople doing
              outstanding work, growing companies with real ambition. And yet
              when you search for them online, either nothing comes up, what does
              come up looks nothing like the quality of the business behind it, or
              the software they&apos;re relying on is held together with
              spreadsheets and hope.
            </p>
            <p>
              Meanwhile a bigger, better-resourced competitor with a decent
              website and proper systems is picking up business that should
              rightfully be theirs.
            </p>
            <p className="font-semibold text-navy">
              That&apos;s the gap Mivida Digital was built to close.
            </p>
          </div>
        </div>
      </Section>

      {/* Who we are */}
      <Section tone="mist">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="text-3xl sm:text-4xl">
              A Consultancy Built for the Businesses Agencies Overlook
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate">
              <p>
                Mivida Digital is a North West based digital consultancy with one
                focus — helping small businesses and established SMEs get the
                online presence and the software they deserve, at a price that
                actually makes sense.
              </p>
              <p>
                We&apos;re digital people at heart. We got into this because we
                genuinely love building things — clean, fast, well-crafted
                websites and software that do exactly what they&apos;re supposed
                to do. Over time we realised that skill was most valuable helping
                serious, ambitious businesses that had been ignored or overcharged
                by agencies that didn&apos;t really understand them.
              </p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[--radius-brand] shadow-md">
            <Image
              src="/images/software-development.jpg"
              alt="Building custom software for a growing business"
              width={1200}
              height={900}
              className="h-full w-full object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      {/* Who we work with */}
      <Section tone="white">
        <div className="max-w-3xl">
          <Eyebrow>Who we work with</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            Small Businesses &amp; SMEs Across the North West and Nationwide
          </h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {audiences.map((a) => (
            <Card key={a.title} title={a.title}>
              {a.body}
            </Card>
          ))}
        </div>
      </Section>

      {/* What we believe */}
      <Section tone="mist">
        <div className="max-w-3xl">
          <Eyebrow>What we believe</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">How We Do Things</h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {beliefs.map((b) => (
            <Card key={b.title} title={b.title}>
              {b.body}
            </Card>
          ))}
        </div>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate">
          <span className="font-semibold text-navy">
            Local roots, national reach.
          </span>{" "}
          We&apos;re based in the North West and proud of it — but we work with
          serious businesses across the whole country. Wherever you&apos;re based,
          you get the same standard.
        </p>
      </Section>

      {/* Stats */}
      <Section tone="navy">
        <div className="max-w-3xl">
          <Eyebrow tone="white">By the numbers</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">Straightforward, Every Time</h2>
        </div>
        <dl className="mt-10 grid gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-[--radius-brand] border border-white/10 bg-navy-800 p-6"
            >
              <dt className="font-heading text-4xl font-bold text-amber-300">
                {s.value}
              </dt>
              <dd className="mt-2 text-white/75">{s.label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Straight-talking promise */}
      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>A straight-talking promise</Eyebrow>
          <h2 className="text-3xl sm:text-4xl">
            We Know Business Owners Have Been Burned Before
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate">
            <p>
              By agencies that overpromise, disappear after payment, or deliver
              something that looks nothing like what was discussed. We do things
              differently.
            </p>
            <p>
              Before any money changes hands, you get a clear quote, a clear scope
              of what&apos;s included, and a clear timeline. During the build we
              keep you updated. After launch we&apos;re still here.
            </p>
            <p className="font-semibold text-navy">
              If something isn&apos;t right, we fix it. Simple as that.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand
        heading="Fancy a Chat?"
        body="Find out what Mivida Digital could do for your business. Free, no-obligation — just an honest conversation."
        primaryLabel="Get in Touch"
      />
    </>
  );
}
