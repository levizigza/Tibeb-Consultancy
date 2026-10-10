# Project architecture

TIBEB Consultancy is a development preview. It does not accept clients. The decisions and the rejected options are in [ADR 0001](adr/0001-content-locale-and-publication.md).

The workspace directory is `Tibeb Consultancy`. The npm package name is `tibeb-consultancy`.

## Stack

| Piece | Choice |
| --- | --- |
| Framework | Next.js 16.4, App Router, React Server Components |
| Language | TypeScript, strict mode |
| Locales | `next-intl` 4, always-prefixed routes |
| Styling | Tailwind CSS 4, tokens in `src/app/globals.css` |
| Lint | ESLint with `eslint-config-next` |
| Tests | Vitest |
| Validation | Zod 4 for forms and for service records |
| Package manager | npm |
| Content store | Typed files in git. No database and no CMS. |

`next.config.ts` keeps `cacheComponents` and `partialPrefetching` from the current Create Next App template.

## How requests are organized

```text
src/proxy.ts                         Locale prefix and redirects
src/app/layout.tsx                   Document shell, fonts, skip link
src/app/[locale]/layout.tsx          Header, translation notice, main, footer
src/app/[locale]/page.tsx            Homepage composed from approved records only
src/app/[locale]/services/           Service finder, service map, and closed scaffolds
src/app/[locale]/how-it-works/page.tsx  Client process outline
src/app/[locale]/pricing/page.tsx      Fee information, empty until approved
src/app/[locale]/resources/           Resource centre and guide pages
src/app/[locale]/about/page.tsx
src/app/[locale]/contact/page.tsx
src/app/[locale]/development/page.tsx  Repository documentation
src/app/[locale]/development/design-system/page.tsx  Component preview
src/content/site/                    Route table and scaffold copy
src/content/model/                  Publication, verification, and authorization rules
src/content/business/                Identity, people, contact, hours, credentials, evidence
src/content/services/                Categories, internal services, pricing, publication gate
src/content/resources/               Guide catalogue, sources, and publication gate
src/content/retrieve.ts              Public catalog. Empty until records are approved.
src/content/translations/            Preview copy and homepage sentences. English only.
src/components/layout/               Header, footer, navigation, breadcrumbs
src/components/pricing/             Price cards and the empty fee list
src/components/sections/             Page section rhythm
src/components/ui/                   Shared controls
src/lib/validation/                  Form schemas
src/lib/inquiry/                     Inquiry validation, rate limit, and delivery
src/lib/seo/                         Index gate, sitemap rules, and structured data
src/lib/service-finder/              Intent mapping for the Services page finder
src/lib/portal/                      Future portal seam, disabled
src/lib/integrations/                Empty integration registry
src/lib/measurement/                Event contract. Collection is off.
src/i18n/                            Locale list, routing, review records, coverage
```

`ServicePageView` renders a service page from its record. A closed record stays an explanation with related links. There is no portal route.

## Locales

| URL | Role today |
| --- | --- |
| `/` | Redirects to `/en` |
| `/en/` | English development preview |
| `/am/` | Amharic address, English copy, translation notice |
| `/ti/` | Tigrinya address, English copy, translation notice |
| `/om/` | Oromo address, English copy, translation notice |
| `/[locale]/development` | Links to repository docs |

Noto Sans carries Latin text, including English and Afaan Oromoo. Noto Sans Ethiopic is applied to Amharic and Tigrinya endonyms, and to a locale region only after that locale's translation is approved. Until then the region `lang` stays `en`. Chrome strings live in `src/i18n/messages`. Unapproved locales fall back to English and are omitted from hreflang. The canonical path for those URLs is the English page. In-page links use `replaceLocaleInPath`. `next-intl`'s own link component needs a request context that these cached pages do not establish, so the proxy owns locale negotiation and the pages own their hrefs. Review records in `src/i18n/review` track source version, reviewer, review date, and status for every page and for navigation, buttons, headings, forms, and errors. A locale stays on the English fallback until every record for it can be published. The review steps are in [TRANSLATION_REVIEW.md](TRANSLATION_REVIEW.md), and the current gaps are in [TRANSLATION_COVERAGE.md](TRANSLATION_COVERAGE.md).

## Publication

Service categories:

- Immigration & Citizenship, regulated gate on
- Government & Forms, regulated gate on
- Career & Employment, regulated gate off, still unpublished
- Tax & Business Administration, regulated gate on

States are `draft`, `verified`, `approved`, `blocked`, and `retired`. Factual `verification` and `authorizationStatus` are separate from that editorial state. A visitor can see a service only through `getPublicOfferings`. The live catalog returns an empty list in every locale. The homepage says that no services are approved for publication.

The rules live in `docs/CONTENT_APPROVAL_WORKFLOW.md`. Editorial `verified` does not publish. Regulated categories require authorization `granted`. A locale needs its own approved text, including restrictions and exclusions. Credentials and prices publish only when those records pass the same gate. Proposed paid work also stays unbookable until its compliance record in `docs/SERVICE_COMPLIANCE_MATRIX.md` is owner-approved. That matrix does not record legal approval.

## Design tokens

`src/app/globals.css` is the token source.

| Group | Tokens | Utilities |
| --- | --- | --- |
| Colour | `--background`, `--foreground`, `--surface`, `--muted`, `--accent`, `--line`, `--notice-surface` | `bg-background`, `text-foreground`, `text-accent`, `border-line`, `bg-notice-surface` |
| Typography | Noto Sans, Noto Sans Ethiopic, meta / body / title sizes | `font-sans`, `text-meta`, `text-body`, `text-title`, `text-title-lg` |
| Spacing | gutter `1rem`, large gutter `1.5rem`, plus the numeric Tailwind scale | `px-gutter`, `px-gutter-lg` |
| Layout | content width `48rem` | `max-w-content` |
| Motion | fast `150ms`, moderate `250ms`, standard ease | `duration-fast`, `ease-standard` |
| Breakpoints | `40rem`, `48rem`, `64rem`, `80rem`, `96rem` | `sm`, `md`, `lg`, `xl`, `2xl` |

Colour values are provisional. Motion durations become `0ms` when the user prefers reduced motion.

## Portal and integrations

`isPortalEnabled()` is false. Do not add `/portal` until there is an authentication design. `integrations` is empty. Form handling remains the unused `contactInquirySchema`: name, email, message, and an empty honeypot. It is not connected to a page.

## Measurement

`src/lib/measurement` names the events that could later describe homepage visits, service pages, Contact clicks, inquiry start and confirmed delivery, language changes, the service finder, and resource use. `acceptMeasurement` checks the payload and discards it. No script, cookie, or vendor is configured. The plan, the dashboard formulas, and the parked experiments are in [MEASUREMENT.md](MEASUREMENT.md).

## Search

Pages send `noindex`. `src/app/robots.ts` disallows all crawlers, and `src/app/sitemap.ts` is empty. A public https origin and an approved launch are both required before a page can be indexed. Unpublished services, guides, prices, and unfinished translations stay out even after that. The audit is in [SEO.md](SEO.md).

## Tests

- `tests/publication.test.ts` — category list, empty public catalog, and the rejection rules
- `tests/locale-routing.test.ts` — prefixes and document language
- `tests/site-content.test.ts` — preview wording and crawl rules
- `tests/seo.test.ts` — titles, sitemap, robots, and structured data
- `tests/quality-audit.test.ts` — loading shell, motion, focus, and form announcements
- `tests/visual-review.test.ts` — section spacing, title size, and the paths for the seven review tasks
- `tests/measurement.test.ts` — event names, rejected personal fields, and the disabled collector
- `tests/homepage.test.ts` — homepage copy stays closed and omits the unused outcome headline
- `tests/contact-inquiry.test.ts` — future inquiry schema
- `tests/measurement.test.ts` — event names, rejected personal fields, and the disabled collector
