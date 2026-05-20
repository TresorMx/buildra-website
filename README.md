# BUILDRA — Landing

Production landing built on Next.js 14 (App Router) + TypeScript + Tailwind +
Framer Motion + Lenis. Bilingual (ES/EN), conversion-focused, with a six-step
multi-step form wired to a Go High Level webhook on the server.

## Quick start

```bash
npm install
cp .env.example .env.local
# edit .env.local — at minimum set GHL_WEBHOOK_URL
npm run dev          # http://localhost:3000
```

Drop your hero and portfolio photos into `public/`:

```
public/
├── herosectionlaksmi.jpg
├── tzalam.jpg
├── laksmi.jpg
└── lluviadeoro11.jpg
```

The page references them by exact filename. Missing files fall back to a
gradient placeholder, so you can ship and add photos incrementally.

## Go High Level integration

The form does not call GHL directly. It POSTs to `/api/lead` (a Next.js Route
Handler), which validates the payload with Zod, enriches it with UTMs and
client metadata, and forwards the result to your GHL workflow webhook.

To set it up:

1. In GHL: Automation → Workflows → Create Workflow → add a trigger of type
   **Inbound Webhook**. Copy the URL it generates.
2. Paste that URL into `GHL_WEBHOOK_URL` in `.env.local`.
3. (Optional) Set `GHL_WEBHOOK_SECRET` to a random string. The API sends it in
   an `x-buildra-secret` header so the receiving workflow (or a Cloud Function
   you put in front) can verify the request.
4. Inside the GHL workflow: map the incoming JSON fields into Contact create,
   trigger your welcome SMS / email, route to the right pipeline.

Payload sent to GHL:

```jsonc
{
  "name": "María García",
  "email": "maria@example.com",
  "phone": "+5219985551234",        // E.164
  "projectType": "casa-nueva",
  "location": "cancun",
  "budget": "5-10M",
  "timing": "1-3",
  "message": "...",
  "lang": "es",
  "source": "buildra-landing",
  "submittedAt": "2026-05-17T12:34:56.000Z",
  "utm": { "utm_source": "...", "utm_medium": "...", ... },
  "page": "https://buildra.mx/",
  "userAgent": "Mozilla/5.0 ..."
}
```

If you prefer to talk directly to the GHL Contacts API instead of a webhook,
swap the `fetch` call inside `app/api/lead/route.ts` for an authenticated call
to `https://services.leadconnectorhq.com/contacts/`.

## Stack notes

- **Animations** — Framer Motion + Lenis smooth scroll. Word-by-word reveal on
  hero headlines, magnetic CTAs, sticky scroll sequence on the process section,
  number counters, crossfade breathing on the BUILDRA logo (no CSS blur on the
  vector — uses the two pre-rendered SVGs, sharp edges always).
- **i18n** — Simple React context (`lib/i18n.tsx`). All copy lives in
  `lib/content.ts`. The HTML root `lang` attribute updates live for SEO/a11y.
- **Form** — React Hook Form + Zod, six steps with slide+fade, progress bar,
  local-storage persistence, WhatsApp deeplink prefilled in the success state.
- **Fonts** — Geist Sans + Geist Mono via `next/font/google`. Self-hosted at
  build time, no external font request at runtime.

## Deploy

Push to a repo and import on Vercel. Set the env vars from `.env.example` in
the project settings. That's it.

## Scripts

- `npm run dev` — local dev
- `npm run build` — production build
- `npm start` — run the production build
- `npm run lint` — Next lint
- `npm run typecheck` — strict TypeScript check
