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

Without a key set, the form will submit but Web3Forms rejects the request server-side.

### Getting the access key

Web3Forms is account-based. Sign up at [web3forms.com](https://web3forms.com); a form and an access key are created for you immediately, shown in the dashboard under **Form Setup**. The key is public by design — it is safe in client-side code, which is why it uses the `NEXT_PUBLIC_` prefix.

### Pointing submissions at the right inbox

The account's signup address is set as the default recipient, so this needs changing explicitly:

1. Sidebar → **Linked Emails** → add the destination address
2. Verify it via the email Web3Forms sends **to that address**
3. Form → **Settings → Email Configuration → Recipient Emails** → add the verified address, remove the signup default
4. **Save Settings**

An address must be verified under Linked Emails before it can be selected as a recipient.

### Plan and key handling

The account is on Web3Forms Pro (10,000 submissions/month).

Access keys are public by design and ship in the client bundle — they can only
ever deliver to the verified recipients on the account, so exposure is not the
risk. Unrestricted reuse of a key on another site is, which Pro's **Settings →
Security Settings → Restrict to Domains** prevents. Keep it set to
`invisionsolutions.co.uk, www.invisionsolutions.co.uk` on every form.

Domain restriction also blocks Vercel preview deployments (`*.vercel.app`); add
that host temporarily if a preview needs to submit.

If a key is ever abused, rotate it in the dashboard and update the matching
Vercel environment variable.

### Routing enquiries to different mailboxes

`/enquiries` sends each department's form to its own mailbox. Web3Forms binds
one access key to one form, and recipients are configured per form in the
dashboard — there is no client-side recipient override. So each mailbox needs
its own Web3Forms form:

1. Create a form in Web3Forms per mailbox (Sales, Support, Billing, Invoices,
   Contracts, Partnerships, General).
2. Set that form's recipient to the matching verified address.
3. Copy its access key into the matching `NEXT_PUBLIC_WEB3FORMS_KEY_*` variable
   in Vercel — see `.env.example` for the full list.
4. Redeploy, because `NEXT_PUBLIC_` values are inlined at build time.

Any variable left unset falls back to `NEXT_PUBLIC_WEB3FORMS_KEY`, which
delivers to `info@`. The page therefore works before those forms exist and gets
more precise as each key is added — nothing is silently dropped. Each
submission carries a distinct subject line, so mail rules can separate them even
while everything shares one key.

### Testing submissions

The forms submit client-side from the browser, which is the path the site
actually uses — test them on the deployed site.

Server-side calls to the API (curl, scripts, CI) are rejected with *"This method
is not allowed... Pro plan is required"* unless the calling IP is whitelisted by
Web3Forms support. That restriction applies only to non-browser callers and
never affects the website forms.

## Brand assets

The downloadable logo files in `public/brand/` are generated:

```bash
npm run build   # must run first — the generator reads Next's webfont files
npm run brand
```

`scripts/generate-brand-assets.mjs` converts the wordmark type to outlines so
the SVGs render correctly without Space Grotesk installed. Mark geometry lives
in `src/lib/brand.ts` and is mirrored in the generator — change both together.

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
