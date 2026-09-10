/** Pricing table rows — shared between Home (snapshot) and Services pages. */
export type PricingRow = {
  service: string;
  price: string;
};

export const pricing: ReadonlyArray<PricingRow> = [
  { service: "Website Design", price: "£499 one-off" },
  { service: "Website Redesign", price: "From £250 one-off" },
  { service: "Website Hosting & Domain (managed)", price: "£25/month" },
  { service: "Google Business Profile Setup", price: "£99 one-off" },
  { service: "Website + Google Bundle", price: "£548 (save £50)" },
  { service: "Website Maintenance (Care Plan)", price: "£29/month" },
  { service: "Business Email", price: "Get a Quote" },
  { service: "SEO", price: "Get a Quote" },
  { service: "Branding", price: "Get a Quote" },
  { service: "Mobile Development", price: "Get a Quote" },
  { service: "Software Development", price: "Get a Quote" },
];

export type Audience = {
  title: string;
  body: string;
};

export const audiences: ReadonlyArray<Audience> = [
  {
    title: "Retail & E-commerce",
    body: "A website that looks the part and sells properly — clean product pages, a smooth checkout, and a store that works as hard on mobile as it does on desktop.",
  },
  {
    title: "Trades & Local Services",
    body: "Get found by customers searching nearby. A professional site and a strong Google Business Profile build trust before the phone even rings.",
  },
  {
    title: "Growing SMEs Needing Custom Software",
    body: "Outgrown spreadsheets and off-the-shelf tools? We build bespoke software and mobile apps around exactly how your business runs.",
  },
];
