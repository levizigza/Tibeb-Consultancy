# Launch readiness

Audit date: 2026-10-10. This is a release review of the development preview. It is not a legal opinion, and it is not a deployment.

**Recommendation: no-go for a public launch.**

The site correctly refuses to present unverified identity, closed services, missing translations, and a missing privacy notice as finished public facts. Those gates are doing their job. A public launch still needs the owner approvals listed below. Nothing in this audit was deployed.

## Recommendation in one page

| Decision | Reason |
| --- | --- |
| Public launch | No-go |
| Search indexing | Stay closed. `searchLaunchApproved` is false. The root layout sends `noindex, nofollow`. `robots.txt` is `Disallow: /`. The sitemap is an empty urlset until an https origin and an approved launch both exist. |
| Inquiry email | Stay in development mode. Resend stays unset until a privacy notice, a retention period, and a recipient are approved. |
| Analytics | Stay off. No script, cookie, or vendor is configured. |
| What can happen now | Keep the preview for the people building it. Do not point a public domain at it and tell clients the business is open. |

## Checklist

| Area | Result | Evidence |
| --- | --- | --- |
| Business name on the preview | Pass as a draft label | `identity.publicName` is `TIBEB Consultancy`. Verification is `unverified`, publication is `draft`. |
| Legal name, registration, business number | Fail, P0 | `legalName`, `registrationJurisdiction`, and `businessNumber` are null. |
| Founder | Fail, P0 | No owner name is on file. About says no founder name, photograph, credential, or history is approved. `reviewIssues` includes `no-named-owner`, status open. |
| Ethiopian-led and Black-owned sentence | Held as a draft, P0 to publish as fact | The sentence is in `identity.positioning` with `showInDevelopmentPreview: true`. The homepage says it is a development draft and not an approved public claim. |
| Public contact details | Fail, P0 | Email, phone, address, and service area values are null. |
| Eleven service topics | Pass as an internal map | The compliance ids are permanent residence, travel documents, form completion, resume writing, job applications, CRA-related support, Service Canada-related support, citizenship, bookkeeping, payroll, and personal tax. |
| Category mapping | Pass | Immigration and citizenship: permanent residence, citizenship, travel documents. Government and forms: form completion, CRA-related support, Service Canada-related support. Career and employment: resume writing, job applications. Tax and business administration: bookkeeping, payroll, personal tax. |
| Public offerings | Pass as an empty catalog | `getPublicOfferings` reads the publication gate. Every internal service fails that gate. The homepage says no services are approved for publication. |
| Immigration and citizenship authorization | Fail, P0 | Those records use `legalApprovalObtained: false`, `authorizationStatus: "pending"`, and `reviewStatus: "needs-professional-review"`. |
| CRA-related permissions | Fail, P0 | `cra-services` is on the same hold. No EFILE or representative credential is on file. |
| Service Canada access | Fail, P0 | `service-canada` is on the same hold. `ei-consent-form` is an open review issue. |
| Tax obligations | Fail, P0 | Bookkeeping, payroll, and personal tax are unpublished. `cpa-status-unknown` and `efile-date` are open. |
| Government independence | Pass as a refusal to invent a claim | The disclosure statement is null and publication is `blocked`. The homepage says no government-relationship statement is approved. |
| Homepage, navigation, service pages, pricing, contact, mobile | Pass for a closed preview | Primary navigation is Home, Services, How it works, About, Resources, Contact. Pricing is linked from How it works and says no price is approved. The inquiry form validates and does not deliver. Viewport checks from the usability review found no sideways scroll at 320, 390, and 768, or at the measured desktop widths. |
| English | Pass as development copy only | English is the only locale with sentences. `localeCopyIsPublishable("en")` is false. |
| Amharic, Tigrinya, Afaan Oromoo | Fail, P0 for a multilingual launch | Translation status is `not-started`. Those routes show English and a notice. |
| Typography for those languages | Pass for names only | Noto Sans Ethiopic is applied to Amharic and Tigrinya endonyms. It is not preloaded. |
| Form validation and data minimization | Pass | Zod on the server, length limits, honeypot `companyWebsite`, sensitive-pattern rejection, and no inquiry logging. |
| Environment variables | Pass | `.env*` is gitignored except `.env.example`. The example file has commented names and no secrets. |
| Production dependency vulnerabilities | Pass | `npm audit --omit=dev` reported 0 vulnerabilities. |
| Development-tool vulnerabilities | Open, P2 | `npm audit` reported 5 high findings, all through `eslint-config-next` and `braces`. The offered fix downgrades `eslint-config-next` to 14.2.35, which would leave Next.js 16. That downgrade was not applied. |
| Analytics and consent | Pass as disabled | `measurementCollectionEnabled()` is false. The privacy notice has no controller, contact, purpose, or consent sentence. |
| Retention | Fail, P0 before any personal information is stored or emailed | No approved retention period. The inquiry app stores nothing. A future mailbox retention choice is not set. |
| TypeScript, lint, tests | Pass in this audit | Commands and counts are in the quality log below. |
| Production build | See the quality log | Recorded only after `npm run build` finishes in this audit. |
| Broken links inside the app | Pass for registered routes | Service, family, pricing, and resource paths used by the pages are routes in the information architecture. Official resource URLs were checked in the earlier resource review and were not requested again from the network in this audit. |
| Accessibility certification | Not claimed | Automated contrast tests and the quality audit exist. Keyboard focus, 200% text, and a screen reader were not completed in this audit. |
| Field performance | Not measured here | The earlier local lab run in `docs/QUALITY_AUDIT.md` reported largest contentful paint at 3.7 seconds. This audit did not repeat Lighthouse. |
| SEO launch metadata | Pass as closed | Relative canonicals and hreflang stay limited to English until a locale is publishable and an https origin exists. |
| Invented reviews or credentials | Pass | `credentials` is empty. `getPublicTestimonials()` is empty. |
| Unapproved regulated claims and outcome promises | Pass | Prohibited-claim checks cover the preview copy. No fee amount or processing time is published. |
| Policies and translations reviewed by a person | Fail, P0 | No privacy notice. No human-reviewed translation. No named reviewer on the guides. |

## Failed checks

These are P0 for a public client launch.

| Id | Gap |
| --- | --- |
| P0-1 | No verified legal name, registration, business number, founder, or credential. |
| P0-2 | The Black-owned, Ethiopian-led sentence is still a draft. |
| P0-3 | No public email, phone, address, or service area. |
| P0-4 | All eleven service topics are closed. `legalApprovalObtained` is false on every compliance record. |
| P0-5 | Province or territory of operation is unknown, so the regulatory review cannot be finished. |
| P0-6 | No privacy notice, consent wording, or retention period. |
| P0-7 | Amharic, Tigrinya, and Afaan Oromoo have no approved translation. |
| P0-8 | No public https origin, and search launch is not approved. |
| P0-9 | Manual keyboard, 200% text, and screen-reader passes are still open. |

P1, important before a later launch window:

| Id | Gap |
| --- | --- |
| P1-1 | Field performance is unknown. The only lab paint time on file is above the 2.5 second goal, and it was not repeated today. |
| P1-2 | `html lang` stays `en`, which matches today's English copy. A published translation will need the document language to follow that locale. |

P2, after launch planning:

| Id | Gap |
| --- | --- |
| P2-1 | ESLint's dependency tree reports a high advisory in `braces`. It is a development tool, not a library shipped to visitors. Wait for a fix that keeps Next.js 16. |
| P2-2 | Pricing stays out of the primary menu by the current information architecture. |
| P2-3 | The three measurement experiments stay parked. |

## Required owner approvals

Do not fill these in the repository until the owner supplies them.

- Legal name, registration jurisdiction, and whether a business number may be shown
- A verified founder name, and any photograph or history that may be published
- Confirmation or correction of the Black-owned, Ethiopian-led sentence
- A public email, phone, address, or service area, each with permission to publish
- The province or territory where the business operates
- Which of the eleven topics may be offered, by whom, and under which licence or authorization
- A privacy notice: controller, contact, purposes, consent, withdrawal, and retention
- The inbox that may receive inquiries, only after that notice
- Fee rows, only with real amounts and the payer of any government or third-party fee
- Human translations for Amharic, Tigrinya, and Afaan Oromoo, with a named reviewer
- A public https origin and a separate decision to allow indexing

## Remaining risks

- A visitor can still read draft positioning and closed service names. The pages say those items are not approved. A public domain would make that draft easier to mistake for an open practice.
- Hosting logs are outside this app. They are not the analytics system, and they were not inspected here.
- The inquiry form accepts a name and a reply method when delivery is configured. Configuring Resend before the privacy notice would start a collection the notice does not cover.
- Open compliance questions, including the Employment Insurance consent form, the EFILE threshold date, CPA status, and Quebec's immigration overlay, are unresolved. Publishing around them would overstate what was reviewed.

## Deployment prerequisites

1. Clear every P0 item with a recorded owner decision.
2. Set `NEXT_PUBLIC_SITE_URL` to the https origin only when that host is real.
3. Turn on `searchLaunchApproved` only in the same change that removes preview wording the owner has replaced.
4. Leave `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_TO_EMAIL` unset until the privacy notice and recipient are approved.
5. Leave `measurementOwnerSwitch` false until that same notice names measurement.
6. Run `npm run lint`, `npm run typecheck`, `npm test`, and `npm run build` on the release commit.
7. Re-check the changed screens at a phone width and a desktop width.
8. Do not add a city, a street address, a rating, or a review that is not in the approved records.

## Rollback

This audit did not deploy. There is no database migration and no production inbox to unwind.

If a later release is published and must be pulled back:

- Redeploy the previous commit.
- Set `searchLaunchApproved` back to false and remove `NEXT_PUBLIC_SITE_URL` if the bad release opened indexing.
- Unset the Resend variables if the bad release started sending mail.
- Leave analytics off.
- The public pages are generated from git. Reverting the commit restores the previous copy.

## Quality log

Commands run in this audit from the project root:

| Command | Result |
| --- | --- |
| `npm run lint` | Passed after the visual-review test stopped passing children as a prop. |
| `npm run typecheck` | Passed. |
| `npm test` | Passed. 21 files, 109 tests. |
| `npm audit --omit=dev` | Passed. 0 production vulnerabilities. |
| `npm audit` | Completed. 5 high findings in the ESLint toolchain. No safe fix that keeps Next.js 16. |
| `npm run build` | Passed. Exit code 0. The route table includes the locale pages, `robots.txt`, and an empty sitemap. |

Lighthouse, a screen reader, and a keyboard-only pass were not run in this audit. They are not marked as passed.
