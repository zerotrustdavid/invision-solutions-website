# Invision Solutions — Website

Marketing site for Invision Solutions Ltd, a founder-led cybersecurity, DevSecOps, and cloud consultancy. Built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in the Web3Forms access key:

```bash
cp .env.example .env.local
```

Generate a key at [web3forms.com](https://web3forms.com) (free, no account — an access key is emailed after entering the destination address, `info@invisionsolutions.co.uk`). Without a key set, the contact form will submit but fail silently server-side (Web3Forms rejects the request).

## Deployment (Vercel)

```bash
npm i -g vercel   # if not already installed
vercel login
vercel link       # link this repo to a Vercel project
vercel --prod
```

In the Vercel dashboard:

1. Project Settings → Environment Variables → add `NEXT_PUBLIC_WEB3FORMS_KEY` (Production + Preview).
2. Project Settings → Domains → add `invisionsolutions.co.uk` and `www.invisionsolutions.co.uk`.
3. Copy the DNS records Vercel shows (A record for the apex, CNAME for `www`) into GoDaddy's DNS management for the domain — copy them live from the dashboard rather than reusing IPs from documentation, since Vercel's anycast addresses have changed before.
4. Wait for propagation and confirm Vercel shows "Valid Configuration" for both domains.

## Project structure

- `src/app/*` — one folder per route (`/`, `/services`, `/approach`, `/case-studies`, `/contact`).
- `src/components/*` — shared UI (header, footer, logo, glass-panel primitives, verification-ledger motif, scroll-reveal wrapper, contact form).
- `src/lib/content.ts` — services and case study copy, shared between the Home teaser sections and the full pages.
- `src/app/globals.css` — design tokens (colour, font, focus states) as CSS custom properties, mapped into Tailwind's `@theme`.

## Known open items

- **Case Studies page** ships with `[METRIC]` placeholders — needs real, anonymised figures and David's sign-off before this page goes live.
- **Contact form** needs a real Web3Forms access key (see above) before a live submission will actually deliver to `info@invisionsolutions.co.uk`.
