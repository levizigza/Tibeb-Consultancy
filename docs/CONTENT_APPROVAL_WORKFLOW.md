# Content approval workflow

Public pages read `getPublicContent` in `src/content/retrieve.ts`. They do not read the raw catalog. A fact can be stored, checked, and still stay off the site. Three decisions are separate:

| Decision | Field | Meaning |
| --- | --- | --- |
| Factual verification | `verification` | `unverified` or `verified`. `verified` means the owner confirmed the fact is true. |
| Publication | `publicationStatus` | `draft`, `verified`, `approved`, `blocked`, or `retired`. Only `approved` may be shown. Editorial `verified` means fact-checked and still unpublished. |
| Authorization | `authorizationStatus` | `not-required`, `pending`, `granted`, or `denied`. This is permission to publish, not proof that the words are true. |

`requiresRegulatoryReview` is a gate, not a legal opinion. When it is true, or when the service category is marked regulated, authorization must be `granted`. `pending`, `denied`, and `not-required` stay unpublished. A non-regulated record may use `not-required` or `granted`.

Every established public claim also needs a `lastReviewed` date in `YYYY-MM-DD` form and a real value. Empty strings and nulls are not facts. Invalid records fail closed: if Zod rejects the shape, the retrieval helper omits it.

## What may appear in public

`isEstablishedPublicClaim` allows a record only when all of these are true:

1. A value is present.
2. `verification` is `verified`.
3. `publicationStatus` is `approved`.
4. `lastReviewed` is set.
5. Authorization is ready: `granted` when regulatory review is required, otherwise `granted` or `not-required`.

Services add further rules in `isPubliclyApprovedOffering`:

- The category exists.
- The requested locale has its own `approved` and `verified` title, description, audience, scope, restrictions, and exclusions.
- Every `credentialIds` entry resolves to a credential that is itself public.
- A null `pricingId` publishes no fee. A set `pricingId` publishes only when that price is public, positive, in CAD, tied to the same service, and has at least one inclusion.
- Website locales (`en`, `am`, `ti`, `om`) are not evidence that consultations are offered in those languages.

Testimonials also require `consented: true`. A privacy notice requires a controller name, privacy contact, at least one purpose, and consent wording. Government disclosures require a written statement. None of those fields are filled in today.

Paid service offers also pass through `src/content/compliance/safeguards.ts`. A catalog service stays unpublished while any linked compliance record is closed. `getBookableServices()` is the only booking list, and it is empty until the owner approves a record that already has verified authorization where regulatory review is required. The source review in `docs/SERVICE_COMPLIANCE_MATRIX.md` is not legal approval.

## How to approve a record

1. Put the owner-supplied value in the matching file under `src/content/business/` or `src/content/services/`. Leave unknown fields null. Do not draft a stand-in fact.
2. Set `verification` to `verified` only after the owner confirms the fact.
3. If the record is regulated, or is a government-affiliation disclosure, leave `authorizationStatus` at `pending` until the owner confirms the business may publish that offer or statement. Then set it to `granted`. Use `denied` when the answer is no.
4. Set `lastReviewed` to the review date.
5. Set `publicationStatus` to `approved` only as the separate decision to publish. For a service, do this on both the service and the locale text that should appear.
6. Run `npm run test`. `getPublicOfferings` and `getPublicContent` should return the new record only for locales whose copy passed the gate. Other locales stay empty.
7. To withdraw a record, set `publicationStatus` to `retired` or `blocked`. The helper drops it on the next read. Do not delete the only copy of a decision the business may need to audit later.

## Development preview

The homepage may show the supplied positioning sentence because `identity.positioning.showInDevelopmentPreview` is true and the page is labeled as a preview. `getPublicIdentityClaims` does not return that sentence while it remains a draft. The same exception does not apply to services, prices, people, credentials, testimonials, or disclosures.

## Files

| Area | File |
| --- | --- |
| Identity | `src/content/business/identity.ts` |
| People | `src/content/business/people.ts` |
| Contact | `src/content/business/contact.ts` |
| Hours | `src/content/business/hours.ts` |
| Consultation languages | `src/content/business/consultation-languages.ts` |
| Credentials | `src/content/business/credentials.ts` |
| Testimonials | `src/content/business/testimonials.ts` |
| FAQs and resources | `src/content/business/faqs.ts` |
| Government disclosures | `src/content/business/disclosures.ts` |
| Privacy and consent | `src/content/business/privacy.ts` |
| Categories and services | `src/content/services/` |
| Pricing | `src/content/services/pricing.ts` |
| Retrieval | `src/content/retrieve.ts` |
