# Business information required

Public pages must wait for these answers. The retrieval helpers in `src/content/retrieve.ts` already return an empty public catalog. `listOwnerInformationGaps()` names each slot that is still unpublished.

The preview shows this sentence because it was supplied for the project. It is still a draft, and `getPublicIdentityClaims()` does not treat it as an established claim:

> TIBEB Consultancy is a Black-owned, Ethiopian-led professional-services business in Canada.

Confirm the exact public wording before launch. The approval steps are in `docs/CONTENT_APPROVAL_WORKFLOW.md`.

## 1. Business identity and legal operating details

Recorded as unpublished or null in `src/content/business/identity.ts`:

- Public name, supplied as "TIBEB Consultancy", still unverified
- Legal name
- Province or territory of registration
- Business number, only if it should be public
- Approved explanation of the name TIBEB, if one should be published
- Approved positioning sentence
- Production domain, logo, colors, and type are still open. The proposed kit and approval checklist are in `docs/BRAND_STRATEGY.md`. Do not treat that proposal as an approved brand.

## 2. Founder and team profiles

No person is on file. Do not add a name, role, or biography until the business supplies it.

## 3. Contact information and business hours

Email, phone, address, and service area are null. Weekly hours have no timezone and no days. Say where general inquiries should go when that channel exists.

## 4. Service categories

The four internal categories exist as taxonomy only. Their labels are not approved public claims:

- Immigration & Citizenship
- Government & Forms
- Career & Employment
- Tax & Business Administration

## 5. Individual services and descriptions

These internal records are blocked or draft. They are not public offerings:

- Immigration and citizenship assistance
- Government and forms assistance
- Career document assistance
- Tax and business administration assistance

The business has also mentioned, without confirming, PR application assistance, travel documents, form completion, resume writing, job applications, CRA-related services, Service Canada-related services, citizenship applications, bookkeeping, payroll, and personal tax. None of those names are approved services. The source review and booking hold are in `docs/SERVICE_COMPLIANCE_MATRIX.md`. That document does not record legal approval.

For each service that should appear, supply the service id's category, display title, description, audience, scope of work, restrictions, exclusions, whether regulatory review is required, and the locale text to publish. A missing translation stays hidden in that locale.

## 6. Pricing and service inclusions

No amount and no inclusion list is on file. Do not publish a fee without the inclusions that belong to it.

## 7. Professional qualifications and credentials

No credential, licence, designation, issuer, or holder is on file. A service that cites a credential stays unpublished until that credential itself passes the publication gate.

## 8. Languages available for consultations

None are confirmed. The website routes `/en`, `/am`, `/ti`, and `/om` do not mean consultations are offered in those languages. English is the only website locale with development copy.

## 9. Testimonials and client evidence

No quote, attribution, consent record, or result statistic is on file. A testimonial also needs `consented: true`.

## 10. FAQs and helpful resources

No question, answer, title, or link is on file.

## 11. Government-related disclosures

The government-affiliation record is blocked and its statement is null. Do not describe the business as affiliated with the CRA, Service Canada, IRCC, or any other government body unless the owner writes that statement and authorizes it.

Immigration advice, citizenship applications, tax preparation, payroll, and acting before a government agency may be regulated in Canada. Confirm the authorized scope before any of that copy is written.

## 12. Privacy and consent

Controller name, privacy contact, purposes, and consent wording are all missing. The notice cannot publish until the owner authorizes it.

## Launch

- Whether search engines may index the site
- Analytics tool, if any
- Hosting account
- The system that will receive form submissions
- Who will write or approve Amharic, Tigrinya, and Oromo
