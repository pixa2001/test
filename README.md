# Taberna Flamenca · Partyraum

Responsive React/TypeScript/Vite website for the party room at Salzgasse 8, 50667 Köln. The original issue-reporting page has been replaced as requested. No deployment, DNS modification, or email has been performed by development tests.

## Local development

Node.js 22.18+ (24 recommended), npm and no database required.

```sh
npm install
npm run dev
npm run build
npm run preview
npm test
```

Use `npm ci` for repeatable installs. `npm run build` performs strict TypeScript checks and produces `dist/`. `npm test` tests server validation and email-provider behavior with mocked requests, without sending real email. The static development server does not run Cloudflare Functions.

## Content and photos

`src/data/partyraum.json` is the venue knowledge base: facts, FAQ answers, assistant keywords and gallery. `src/data/i18n.ts` contains initial German UI/chat copy and the extension point for English/Spanish. Additional UI labels currently live in components; a complete language switch requires translating those too. `src/components` separates form, accessible dialog gallery and chat.

The bundled SVGs are **atmospheric illustrations, not original photos of the room**. Replace files under `public/images` with licensed real photographs and edit `gallery` entries and `galleryNotice`. Keep descriptive alt text; optimize AVIF/WebP/JPEG dimensions and size. The first image loads eagerly, gallery images lazily. Lightbox supports touch swipes, arrow keys, Escape and native dialog focus containment.

## GitHub Pages

Commit and push the project to `main`. In repository Settings → Pages select GitHub Actions. `.github/workflows/deploy.yml` builds and deploys the static site. Repository variables:

- `BASE_PATH`: `/test/` for `pixa2001/test` project Pages; `/` for a custom domain or user Pages.
- `VITE_API_URL`: HTTPS origin of the separately deployed API, without a trailing path.
- `VITE_TURNSTILE_SITE_KEY`: public Cloudflare Turnstile site key, scoped to the website hostname.

These VITE values are intentionally public. Never use VITE variables for secrets. For a subdomain, configure the custom domain in Pages and the appropriate DNS record at the DNS provider; add the domain to Turnstile and change backend `ALLOWED_ORIGIN`. Do not invent a CNAME before the domain is chosen. Configure an absolute `og:image` and canonical/og:url after the final hostname and real social image are known. All assets support Vite's base path.

## Secure mail backend

GitHub Pages cannot send mail. Deploy this same repository to **Cloudflare Pages**, build command `npm run build`, output `dist`, with root `functions/` detected as Pages Functions. GitHub Pages may still serve the public website; Cloudflare hosts `/api/inquiry` and `/api/chat` separately. For an all-Cloudflare deployment, set `VITE_API_URL` to that deployment origin. A full-stack local test is available through Cloudflare Wrangler (`npx wrangler pages dev dist`) after building and configuring a local ignored `.dev.vars` file.

Set only in Cloudflare's secure environment settings:

- `RESEND_API_KEY`: Resend API key with appropriate sending scope.
- `MAIL_FROM`: a sender address on a Resend-verified domain, e.g. `Taberna <anfragen@your-verified-domain>`; no sender is assumed here.
- `ALLOWED_ORIGIN`: exact public website origin, no trailing slash or path, e.g. `https://pixa2001.github.io`.
- `TURNSTILE_SECRET_KEY`: server-only secret for the public Turnstile site key.
- `OPENAI_API_KEY`: optional server-only AI key; not needed for local knowledge chat.

Use `.env.example` as a names-only template. Never commit `.env`, `.dev.vars` or secret values. Backend rejects unconfigured mail, foreign origins, invalid fields, over-capacity requests and failed Turnstile verification. Turnstile tokens are verified by Cloudflare and not trusted from the browser. Configure edge rate limits for both `/api/*` routes before public launch; origin checking alone is not authentication. Apply provider spend limits before enabling optional AI. Review provider data-processing terms and retention. Form values are sent as plain text with a fixed recipient and validated reply-to, without HTML injection. No request body or secret is logged by application code.

All form fields appear in the email to **info@taberna-flamenca.com**, subject `Partyraum-Anfrage – [Anlass] – [DD.MM.YYYY]`. Success appears only after the mail provider accepted the request. This is not proof of inbox delivery or a confirmed booking. If API is missing or fails, the UI explains the issue and links to direct email; it never pretends to submit successfully. A real end-to-end email must be checked after secrets, sender verification and deployment are configured.

## Assistant / AI interface

The local assistant uses `src/data/assistant.ts` and the central FAQ, without external calls or a model key. Unknown information leads to direct inquiry. Availability questions always say the team must check; no availability calendar is connected. Dates in `DD.MM.YYYY` or ISO form transfer to the inquiry form; the form validates future dates.

When `VITE_API_URL` is set the chat calls `POST /api/chat` with `{ "message": "..." }` and expects `{ "answer": "..." }`. Without `OPENAI_API_KEY`, this endpoint uses the same deterministic knowledge match. With a key, unknown queries can be classified by an AI model into a closed set of FAQ IDs; **the model cannot generate venue facts**. Invalid IDs become the unknown answer. The displayed reply is always an exact central knowledge answer. Chat falls back locally if the API is unavailable. A real generative model is deliberately not required for ordinary venue questions. Protect the optional paid endpoint with edge limits before enabling it.

## Publication checklist / honest limitations

- Supply real venue photos; illustrative visuals are explicitly labelled in the UI.
- Complete the legal operator name, representation, phone, registry/VAT details where applicable and privacy details. The included legal sections flag missing information; they are not a final legal review.
- Complete hosting/mail/Turnstile processor agreements, retention and any transfer disclosures. No external font service is loaded; system fonts provide a network-independent fallback.
- Configure mail/Turnstile and verify real delivery, error behavior and the mobile site on the final domain.
- Review room price/contract details with the operator; no unprovided fees, deposit, availability or accessibility claims are made.

The app is a working first implementation, but public launch depends on those business/legal and service settings.
