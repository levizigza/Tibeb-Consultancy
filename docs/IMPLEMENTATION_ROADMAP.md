# Implementation roadmap

The foundation now includes locale routes, a service publication gate, and the architecture record in `docs/adr/0001-content-locale-and-publication.md`. Do not build the full marketing site in the next change. Confirm the business facts first.

## 1. Confirm the business record

Complete `docs/BUSINESS_INFORMATION_REQUIRED.md` with the business. Public pages stay in preview language until the answers exist.

## 2. Approve the brand

Replace the provisional tokens in `src/app/globals.css` and `src/app/icon.svg` only with approved colors, type, and a logo. Keep contrast at WCAG 2.2 AA.

## 3. Add approved English copy

Introduce real pages only for confirmed facts. Service records stay out of `getPublicOfferings` until verification, publication approval, authorization, the last-reviewed date, and the locale text all pass `docs/CONTENT_APPROVAL_WORKFLOW.md`.

## 4. Add translations in the translation modules

Write approved Amharic, Tigrinya, or Oromo copy in `src/content/translations/` and set that locale's translation status. Do not machine-translate. The locale routes already exist.

## 5. Build a real inquiry path

When the business wants to receive messages:

- Add a server-validated form that uses `contactInquirySchema`.
- Keep the honeypot, add rate limiting, and send mail or store inquiries through a configured provider.
- Put that provider’s variable in `.env.example` at the moment it is configured.
- Do not collect SINs, immigration file numbers, or tax data on that form.

## 6. Approve launch SEO

The sitemap, robots rules, canonical URLs, and hreflang links are in place. They stay closed while `searchLaunchApproved` is false. After the domain and launch copy are approved, set `NEXT_PUBLIC_SITE_URL` to the https origin and set `searchLaunchApproved` to true. Remove the development-only wording from the homepage at the same time. Do not index a service, guide, or price page until its own publication gate is open.

## 7. Add backend integrations only when a workflow needs them

Bookkeeping, payroll, tax, or application tracking need a confirmed system of record. Add a client for that system in a focused module, with server-only credentials. Do not add a backend, database, or authentication package before that decision.

## 8. Keep measurement off until a privacy notice exists

The event names and the rejection rules are in `docs/MEASUREMENT.md`. Do not add an analytics script, a cookie, or a vendor. Leave the three experiments parked until there is traffic and someone to run them.

## Quality gate for every phase

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

Check the changed screens in a browser at a phone width and a desktop width.
