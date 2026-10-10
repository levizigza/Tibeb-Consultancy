# TIBEB Consultancy

Development foundation for the TIBEB Consultancy website. The site is a preview. It is not open for client services.

TIBEB Consultancy is a Black-owned, Ethiopian-led professional-services business in Canada. Public service descriptions, contact details, and translations are waiting on confirmed business information.

## Requirements

- Node.js 22.13 or newer is recommended. This project was created with Node.js 22.12, which prints an ESLint engine warning.
- npm 10 or newer.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Preview site

GitHub Actions publishes a static copy of this closed preview from the `master` branch:

[https://levizigza.github.io/Tibeb-Consultancy/en/](https://levizigza.github.io/Tibeb-Consultancy/en/)

Search engines are asked not to index it. Client services stay unavailable.

## Quality checks

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## Documentation

- [AGENTS.md](AGENTS.md) — permanent engineering and publication standards
- [docs/PROJECT_ARCHITECTURE.md](docs/PROJECT_ARCHITECTURE.md) — how the code is organized
- [docs/IMPLEMENTATION_ROADMAP.md](docs/IMPLEMENTATION_ROADMAP.md) — what to build next
- [docs/BUSINESS_INFORMATION_REQUIRED.md](docs/BUSINESS_INFORMATION_REQUIRED.md) — facts to confirm before public copy
- [docs/CONTENT_APPROVAL_WORKFLOW.md](docs/CONTENT_APPROVAL_WORKFLOW.md) — how a stored fact becomes an established public claim
- [docs/SERVICE_COMPLIANCE_MATRIX.md](docs/SERVICE_COMPLIANCE_MATRIX.md) — source review before any proposed paid work can be booked
- [docs/BRAND_STRATEGY.md](docs/BRAND_STRATEGY.md) — Clear ground direction. Logo, name meaning, and founder facts are still open
- [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) — tokens, type, spacing, and component rules
- [docs/VISUAL_RHYTHM.md](docs/VISUAL_RHYTHM.md) — section spacing, navigation, and page rhythm
- [docs/HOMEPAGE_CONTENT_GAPS.md](docs/HOMEPAGE_CONTENT_GAPS.md) — facts the homepage still needs from the owner
- [docs/INFORMATION_ARCHITECTURE.md](docs/INFORMATION_ARCHITECTURE.md) — sitemap, journeys, and route names
- [docs/TRANSLATION_REVIEW.md](docs/TRANSLATION_REVIEW.md) — how a locale translation is reviewed before it can replace English
- [docs/TRANSLATION_COVERAGE.md](docs/TRANSLATION_COVERAGE.md) — which pages and shell strings still need a translation review
- [docs/INQUIRY_SECURITY.md](docs/INQUIRY_SECURITY.md) — how a general inquiry is checked and when it is not delivered
- [docs/SERVICE_FINDER.md](docs/SERVICE_FINDER.md) — how the service finder matches a question to a published page
- [docs/RESOURCE_CENTRE.md](docs/RESOURCE_CENTRE.md) — how a resource guide is held until a named reviewer approves it
- [docs/SEO.md](docs/SEO.md) — how search metadata, the sitemap, and robots rules stay closed until launch
- [docs/QUALITY_AUDIT.md](docs/QUALITY_AUDIT.md) — accessibility and performance review of this preview
- [docs/USABILITY_REVIEW.md](docs/USABILITY_REVIEW.md) — task paths, visual consistency, and a protocol for a later session with real visitors
- [docs/MEASUREMENT.md](docs/MEASUREMENT.md) — how page visits are counted only after a privacy notice and consent exist
- [docs/LAUNCH_READINESS.md](docs/LAUNCH_READINESS.md) — what the owner must confirm before the public site can open

The same list is linked from the local site at `/en/development`. Architecture decisions are in [docs/adr/0001-content-locale-and-publication.md](docs/adr/0001-content-locale-and-publication.md).

## Environment

No services are configured. `.env.example` is a placeholder. Copy it to `.env.local` only when a later task introduces a real variable. Do not add secrets to either file.

## Stack

- Next.js 16.4 with the App Router
- React 19
- TypeScript
- Tailwind CSS 4
- ESLint
- Vitest
- Zod
- next-intl, for `/en/`, `/am/`, `/ti/`, and `/om/`

Only English has development copy. No service is approved for publication.
