# Mivida Digital

Marketing site for Mivida Digital — _smarter digital solutions for serious businesses_.

A statically-generated Next.js 16 (App Router) site with a Resend-backed contact
form. No database, no CMS.

## Stack

- **Next.js 16** (App Router, statically generated) + **React 19** + **TypeScript** (strict)
- **Tailwind CSS 4** via `@tailwindcss/postcss`
- **Resend** for the contact form (with an offline mock path for dev/CI)
- **Vitest** + `@testing-library/react` + **fast-check** (unit / property tests)
- **Playwright** (end-to-end)
- **Lighthouse CI** (90+ performance budget)

## Getting started

```bash
npm install
cp .env.example .env.local   # already created for local dev
npm run dev                  # http://localhost:3000
```

## Environment variables

| Variable               | Required | Description                                               |
| ---------------------- | -------- | --------------------------------------------------------- |
| `RESEND_API_KEY`       | Yes      | Resend API key. `test` (or unset) uses the offline mock.  |
| `NEXT_PUBLIC_SITE_URL` | Yes      | Public site URL, e.g. `https://www.mividadigital.co.uk`.  |
| `CONTACT_FROM_EMAIL`   | Optional | Sender address — must be verified in Resend.              |
| `CONTACT_TO_EMAIL`     | Optional | Where enquiries are delivered (defaults to the hello@ inbox). |

The contact form **never** hits the network while `RESEND_API_KEY` is `test`, so
local dev and CI stay offline. Set a real key in production only.

## Scripts

| Script                  | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `npm run dev`           | Dev server                                     |
| `npm run build`         | Production build                               |
| `npm run start`         | Serve the production build                     |
| `npm run lint`          | ESLint                                         |
| `npm run test`          | Unit / property tests (Vitest)                 |
| `npm run test:coverage` | Unit tests with coverage                       |
| `npm run test:e2e`      | End-to-end tests (Playwright)                  |
| `npm run lighthouse`    | Build + Lighthouse CI performance budget       |

### Running e2e tests locally

Playwright reuses a running dev/prod server on port 3000. Fastest loop:

```bash
npm run build && npm run start   # in one terminal
npm run test:e2e                 # in another
```

## Project structure

```
src/
  app/          # routes: / (home), /services, /about, /contact, not-found
  components/   # Header, Footer, Button, Section, Card, CtaBand, SocialIcons, ContactForm, Logo
  lib/          # site config, services data, contact-form validation, email send
  types/        # ambient type declarations
tests/          # Playwright e2e
public/         # brand assets (logo, favicon) and service images
```

## Brand

- **Colours:** Deep Navy `#051A3E`, Amber Gold `#F4A025`, White `#FFFFFF`,
  Mist `#F3F6FA`, Slate `#526174`
- **Type:** Montserrat (headings), Inter (body)

Tokens live in `src/app/globals.css` (`@theme`). Colour combinations used in the
UI are asserted against WCAG AA in `src/lib/brand.test.ts`.

## Deployment

Deploy to **Vercel** (zero-config — Next.js is auto-detected). Set the environment
variables in project settings and connect a custom domain.
