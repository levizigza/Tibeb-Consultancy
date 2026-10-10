# ADR 0001: Content, locale, and publication architecture

Date: 2026-10-09

Status: Accepted

## Context

TIBEB Consultancy needs a multilingual public website for an Ethiopian-led professional-services practice in Canada. The languages are English, Amharic, Tigrinya, and Oromo. Several proposed services touch immigration, government forms, and tax administration. Those must not appear as approved public offers until the business confirms the exact service and who is authorized to provide it.

The site is still a development preview. Founder details, licences, fees, testimonials, and achievements have not been supplied and must not be invented. A client portal and external systems may be needed later. They are not needed to publish the first approved pages.

## Decision

Keep content in typed files in the repository. Separate business facts, service records, translations, presentation, validation, and future integrations. Publish a service only when every publication check passes.

### Boundaries

| Concern | Location | Responsibility |
| --- | --- | --- |
| Business information | `src/content/business/` | Identity, people, contact, hours, credentials, evidence, disclosures, and privacy. Unknown facts stay null. |
| Service taxonomy and records | `src/content/services/` | Categories, internal services, pricing, and the service publication gate. |
| Translations | `src/content/translations/` | Copy for a locale, with its own publication state. |
| UI components | `src/components/ui/` | Controls reused by pages. |
| Layouts | `src/components/layout/` and `src/app/` | Page chrome, locale shell, skip link. |
| Form validation | `src/lib/validation/` | Input schemas such as the future inquiry. |
| Publication permission | `src/content/model/` and `src/content/retrieve.ts` | Verification, authorization, and the public catalog. |
| External integrations | `src/lib/integrations/registry.ts` | Named systems, added only when chosen. |
| Client portal | `src/lib/portal/availability.ts` | Future `/[locale]/portal` seam. Disabled. |

### Locales

Public URLs are always prefixed:

- `/en/`
- `/am/`
- `/ti/`
- `/om/`

`src/proxy.ts` uses `next-intl` to redirect an unprefixed path to the default locale, which is English. `next-intl` message catalogs are empty. Rendered sentences live in the translation modules so a missing translation cannot silently look finished.

English is the only locale with development copy. The other three routes render that English copy and a notice that an approved translation is not available. The document language stays `en` until a locale's translation status is `development-copy` or `approved`. Amharic and Tigrinya endonyms use Noto Sans Ethiopic. Latin text uses Noto Sans. The Ethiopic font is applied on those strings directly, because the Latin fallback face covers every code point and would otherwise hide Ethiopic letters.

### Publication states

Every service record and each of its translations uses one of:

- `draft` — being written
- `verified` — checked internally, still not cleared for the public site
- `approved` — cleared for publication
- `blocked` — must not be published
- `retired` — withdrawn

`getPublicOfferings` returns a record for a locale only when all of the following are true:

1. Factual `verification` is `verified`. Editorial status `verified` does not publish.
2. `publicationStatus` is `approved` on the service and on that locale's text.
3. `lastReviewed` is set.
4. If the service or its category requires regulatory review, `authorizationStatus` is `granted`.
5. The locale text includes a title, description, audience, scope, restrictions, and exclusions.
6. Cited credentials and any cited price are themselves public.
7. The record matches the Zod content schema. Invalid records fail closed.

`docs/CONTENT_APPROVAL_WORKFLOW.md` is the operating procedure. The live catalog has no publicly approved offerings.

The development preview may show draft interface copy because the page is labeled as a preview. That exception does not apply to service records.

### Design tokens

Colour, type, spacing, layout width, motion, and breakpoints are CSS variables in `src/app/globals.css`, mapped into Tailwind 4 through `@theme`. Components use those utilities. The palette remains provisional until a brand kit is approved. Motion durations collapse to zero under `prefers-reduced-motion`.

### Portal and integrations

The portal is a status flag and a path segment, not a route and not an authentication library. When it is built, it should live at `/[locale]/portal` and stay outside the public publication helper. Integrations stay an empty registry. A provider is added to `.env.example` only when that provider is actually configured.

## Alternatives considered

**A CMS or database now.** Rejected. Editorial volume does not justify one, and a dashboard would make the publication rules easier to bypass than a reviewed file. A CMS can sit behind the same gate later if non-developers need to edit approved copy.

**Hand-rolled locale redirects without `next-intl`.** Rejected for the long term. Prefix negotiation, static locale params, and future message loading are already solved by `next-intl` 4, which supports Next.js 16. The cost is one dependency. UI strings stay in typed modules until real translations exist, so the library is not asked to pretend English fallback copy is a translation.

**Showing category names on the public homepage.** Rejected for this phase. The four categories exist in the catalog. Listing them on the preview would read as a service menu. The public page states that no services are approved.

**Building the portal shell now.** Rejected. An empty login route would look operational. The boundary module is the extension point.

**Style Dictionary or a separate token package.** Rejected. Tailwind's theme is already the runtime token layer. A second generator would duplicate it before a brand kit exists.

## Consequences

- New public service copy is a content change plus a status change, reviewed like code.
- Amharic, Tigrinya, and Oromo pages exist and are honest about missing translations.
- Adding a portal does not require moving public content, provided it uses the reserved path and does not call `getPublicOfferings` for private case data.
- `html lang` remains English while every full page is English. When a translation is approved, `documentLanguage` follows that locale. Moving `lang` onto the root `<html>` element is follow-up work, because the root layout does not receive the locale param and reading request headers would opt the preview out of static rendering under Cache Components.
