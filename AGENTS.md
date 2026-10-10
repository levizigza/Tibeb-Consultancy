<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# TIBEB Consultancy agent standards

These standards apply to every change in this repository.

## Accessibility-first

- Use semantic landmarks, one `h1` per page, and visible text for every control.
- Keep a skip link to `#main`, and leave a visible focus style in place.
- Target WCAG 2.2 AA contrast. Support keyboard use and `prefers-reduced-motion`.
- Set `lang` on the document and on text that is in another language.
- Do not convey status by color alone.

## Mobile-first

- Write layout for a narrow viewport first, then add `sm` and larger adjustments.
- Keep line length readable. Do not require hover for essential information.
- Check the changed flow at a phone width and a desktop width.

## Reusable architecture

- Put shared interface pieces in `src/components` only when a page uses them.
- Keep business copy in `src/content`. Keep locale metadata in `src/i18n`.
- Keep validation in `src/lib/validation`.
- Do not add a service-page component, a contact form, or a backend client until that feature is actually being built.
- Prefer the current Next.js App Router conventions in `node_modules/next/dist/docs/` over older patterns.

## Type safety

- TypeScript `strict` stays on.
- Validate external input with Zod and export the inferred type from the schema.
- Do not silence type errors with `any` or `@ts-ignore`.

## Consistent design tokens

- Colors, type, and surfaces come from the variables in `src/app/globals.css`.
- Colour, type, and spacing tokens follow Direction A in `docs/BRAND_STRATEGY.md` and `docs/DESIGN_SYSTEM.md`. The page is eggshell white and seal brown. Gold is an ornament on seal brown, including the diamond-chain band. It is not text, a link, or a focus colour. The owner asked on 10 October 2026 for a Latin wordmark, and the same day for a gold pattern. Do not add a Ge'ez lockup, a crest, or a founder block until those checklist rows are approved.
- Do not introduce one-off hex colors in components.

## Multilingual readiness

- Public routes are `/en/`, `/am/`, `/ti/`, and `/om/`.
- English is the only language with development copy. Do not invent Amharic, Tigrinya, or Oromo sentences.
- Locale links must show the translation status. An untranslated route shows the English development copy and says that an approved translation is not available.
- Do not treat English fallback text as a completed translation.

## No fabricated business information

- Publish only facts supplied or confirmed by the business.
- The positioning sentence already on the preview was provided for this project. Treat any extension of it, including history, address, fees, hours, or the meaning of the name, as unconfirmed.
- Use `docs/BUSINESS_INFORMATION_REQUIRED.md` before writing public claims.

## No invented professional qualifications

- Do not name a person, credential, license, membership, or year of experience unless the business provides it.
- Do not imply that a service is performed by a regulated professional.

## No unsupported government affiliation

- Do not suggest that TIBEB Consultancy is part of, endorsed by, or an official channel for the CRA, Service Canada, IRCC, or any other government body.

## No publication of unapproved regulated services

- Proposed services stay in the internal checklist until the business confirms the exact offer and who is authorized to provide it.
- Immigration advice, citizenship applications, tax preparation, payroll, and representation before a government agency may be regulated in Canada. Leave them off the public site until that confirmation exists.
- The development homepage must keep stating that client services are unavailable.
- Follow `docs/CONTENT_APPROVAL_WORKFLOW.md` before changing publication status, verification, or authorization.
- A paid service also has to clear `docs/SERVICE_COMPLIANCE_MATRIX.md` before it can be booked. That matrix is a source review, not legal approval.

## Data minimization and security

- A future general inquiry may collect name, email, and message only. The honeypot field `companyWebsite` must stay empty.
- Do not collect government identifiers, immigration history, or tax data through a general contact form.
- Validate on the server. Do not log inquiry contents.
- Do not commit secrets. `.env.example` lists variable names only, and only after a service is actually being configured.
- The preview sends `noindex` and `Disallow: /`. Remove those only for an approved launch.
