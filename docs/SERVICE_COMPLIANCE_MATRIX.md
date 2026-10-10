# Service scope review and approval framework

This document does not replace professional legal or regulatory advice. Legal approval has not been obtained. Nothing here authorizes TIBEB Consultancy to give immigration, citizenship, tax, accounting, or employment advice, or to represent a client before a government body.

The source review date is 2026-10-09. That date means public sources were read for this website framework. It is not an owner approval date and it is not a legal opinion. Statutes and regulator pages can change. A qualified reviewer should confirm them again before any service is offered.

The structured records live in `src/content/compliance/`. `getBookableServices()` is the only booking list. It is empty. A catalog service also stays out of `getPublicOfferings` while any linked compliance record is closed. Internal information notes exist so a later page can be drafted without saying the business provides a regulated service. Those notes are not published.

`requiresRegulatoryReview: true` on these records is a publishing hold. It is not a finding that every listed task is a regulated profession.

## How a paid offer becomes bookable

All of the following have to be true, and none of them is true today:

1. The business owner is named and sets `reviewStatus` to `owner-approved-to-publish`.
2. `paidOfferingStatus` is `open` and `bookingAvailability` is `available`.
3. Approved public wording is stored, and it does not claim legal approval, a government affiliation, or an unverified licence.
4. Where the hold requires regulatory review, `credentialVerification` is `verified` and `authorizationStatus` is `granted`.
5. The linked catalog service also passes the publication gate in `src/content/services/publication.ts`.

An information page can be approved later only with the same owner decision, and only if the page does not say TIBEB advises, represents, or files. Pointing readers to official instructions is the intended shape of that page.

## Technical help and regulated work

IRCC describes representatives as people who explain options, help choose a program, fill out and submit an application, communicate with the department, represent someone in an application or hearing, or advertise that they can give immigration or citizenship advice. Paid work of that kind requires an authorized representative. Typing a client's own words, or translating a document the client already understands, is not listed there as representation. The boundary is fact-specific. Do not sell a form-completion package until a qualified reviewer splits the forms.

IRPA section 91 and Citizenship Act section 21.1 prohibit knowing advice or representation for consideration, or an offer to do so, unless the person is in one of the listed classes. IRCC says consideration includes a fee or any other compensation. The department may return or refuse an application that uses an unauthorized paid representative.

The classes named in IRPA section 91 are a lawyer in good standing of a provincial or territorial law society, a Quebec notary in good standing of the Chambre des notaires du Québec, any other member in good standing of a law society including a paralegal, and a member in good standing of the College of Immigration and Citizenship Consultants. Students-at-law are covered only while supervised as the section describes. An entity may also act under a written agreement with the Government of Canada. TIBEB has no such agreement on file.

IRCC's public authorization page says paralegals are Ontario only. The statute's wording is broader. That difference is an open professional-review item. Do not rely on a paralegal licence until a lawyer confirms the scope.

The College licenses Regulated Canadian Immigration Consultants and Regulated International Student Immigration Advisors. The College's public explanation says a RISIA gives advice only about study authorization and is not authorized to represent a person on an IRPA or Citizenship Act application. A RISIA licence is not a basis for permanent residence or citizenship work. Re-check the current class by-law and the public register before relying on any licence. Lawyers and Quebec notaries are outside the College when they act under their own regulator.

## Privacy and documents

The province of operation is not on file. If the business collects personal information in a commercial activity in Alberta, Alberta's Personal Information Protection Act applies. The Office of the Privacy Commissioner of Canada treats Alberta's Act as substantially similar to PIPEDA for collection, use, and disclosure inside Alberta. PIPEDA can still apply to a federal work, undertaking, or business, and to personal information that crosses a provincial or international boundary. Which statute applies is an open question until the owner confirms where the business operates.

Alberta PIPA requires consent for collection, use, and disclosure except where the Act allows otherwise. Consent must not be demanded for more information than the service needs. Notice is required at collection. Individuals can withdraw consent. Section 34 requires protection of personal information. Section 34.1 requires notice of a loss or unauthorized access or disclosure. Section 35 covers retention and destruction. Section 13.1 covers notice when a service provider outside Canada is used.

Do not collect a social insurance number, immigration history, or tax data through the general inquiry form. EFILE registration asks the filer for identity information. That belongs in the CRA registration channel, not on the public site. Keep client documents only as long as the purpose and any legal duty require, then destroy them. Do not log inquiry contents.

Government account access is program-specific. A CRA authorization is not Service Canada consent. IMM 5476 is not a passport form and is not a tax authorization.

## Official source register

Accessed 2026-10-09. These pages were read for this framework. They are not an endorsement of TIBEB, and TIBEB is not an official channel for any of these publishers.

| Id | Publisher | Source |
| --- | --- | --- |
| irpa-91 | Justice Laws | https://laws-lois.justice.gc.ca/eng/acts/i-2.5/section-91.html |
| citizenship-21-1 | Justice Laws | https://laws-lois.justice.gc.ca/eng/acts/C-29/section-21.1.html |
| ircc-representatives | IRCC | https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative/learn-about-representatives.html |
| ircc-authorized | IRCC | https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative/choose/authorized.html |
| imm-5476 | IRCC | https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/imm5476.html |
| cicc-act | Justice Laws | https://laws-lois.justice.gc.ca/eng/acts/c-33.6/FullText.html |
| cicc-about | College of Immigration and Citizenship Consultants | https://college-ic.ca/ICCRC/Assets/Documents/College%20of%20Immigration%20and%20Citizenship%20Consultants-EN.pdf |
| cicc-regulations-2026 | Canada Gazette, Part II | https://gazette.gc.ca/rp-pr/p2/2026/2026-05-06/html/sor-dors68-eng.html |
| cra-authorize | Canada Revenue Agency | https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services/help-cra-sign-in-services/representatives-request-authorization.html |
| cra-aut-01 | Canada Revenue Agency | https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/aut-01.html |
| cra-efile | Canada Revenue Agency | https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/efile-electronic-filers/eligibility.html |
| ita-150-1 | Justice Laws | https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-150.1.html |
| cra-mef | Canada Revenue Agency | https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-tax-preparers/mandatory-electronic-filing-tax-preparers.html |
| sc-pensions-consent | Service Canada | https://www.canada.ca/en/services/life-events/retirement/apply-manage-your-pensions.html |
| isp-1603 | Service Canada | https://catalogue.servicecanada.gc.ca/apps/EForms/pdf/en/ISP-1603_OAS.pdf |
| passport-third-party | IRCC | https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/help-centre/apply.html |
| prtd-apply | IRCC | https://www.canada.ca/en/immigration-refugees-citizenship/services/permanent-residents/travel-document/apply.html |
| travel-doc-non-canadian | IRCC | https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/travel-documents-non-canadians/apply-how.html |
| pipa-act | Alberta King's Printer | https://kings-printer.alberta.ca/serve_pdf.cfm?file=P06P5.pdf&type=Acts |
| oipc-pipa | Office of the Information and Privacy Commissioner of Alberta | https://oipc.ab.ca/legislation/pipa/ |
| pipeda-provincial | Office of the Privacy Commissioner of Canada | https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/r_o_p/prov-pipeda/ |
| cpa-act | CanLII, reproducing the Alberta statute | https://www.canlii.org/en/ab/laws/stat/sa-2014-c-c-10.2/latest/sa-2014-c-c-10.2.html |
| cpa-public-practice | CPA Alberta | https://www.cpaalberta.ca/Public-Practice |
| alberta-employment-agency | Government of Alberta | https://www.alberta.ca/employment-agency-licence |
| alberta-eablr-standards | Government of Alberta | https://open.alberta.ca/dataset/ab4c0437-4c19-4db1-ae5f-e697375dfbcc/resource/ef7cc714-6a05-4e20-8379-ce4b2c683e20/download/sartr-employment-agency-compliance-standards-2023.pdf |
| roe-web | Employment and Social Development Canada | https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/ei-roe.html |
| cra-employer-accounts | Canada Revenue Agency | https://www.canada.ca/en/revenue-agency/services/about-canada-revenue-agency-cra/protecting-your-privacy/privacy-impact-assessment/employer-accounts-program-pia-v3-ic-129717.html |

## Matrix

The business owner is responsible for every approval. No owner name is on file. Review status for every row is `needs-professional-review`. Booking status for every row is unavailable. Approved public wording is null. Wording in the "after approval" column is a limit on future copy. It is not approved and it is not on the website.

Shared disclaimer, once a service is actually approved: say that the page is not legal, tax, immigration, or accounting advice; do not say that legal or regulatory approval has been obtained; do not imply a government affiliation.

Shared consent: name the purpose, collect only what that purpose needs, record consent, and explain withdrawal. Keep identity numbers and case histories off the public inquiry form.

### permanent-residence

| Field | Review |
| --- | --- |
| Activities contemplated | Explain permanent residence programs, choose a program, complete or submit an application, or communicate with IRCC or the Immigration and Refugee Board for a fee. |
| Activities requiring authorization or specialist review | Paid advice, representation, form completion, or advertising of those services. IRPA section 91. |
| Official sources | irpa-91, ircc-representatives, ircc-authorized, imm-5476, cicc-act, cicc-about |
| Credentials or permissions to verify | RCIC in good standing, or a lawyer, Quebec notary, or other law-society member whose scope covers the work. A RISIA licence is not sufficient. |
| Public wording permitted after approval | Only a description of the exact authorized task, naming the verified licence class and regulator. No outcome promise. Not approved now. |
| Disclaimer and consent | Shared disclaimer. IMM 5476 only after a real appointment, and only for that application. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### travel-documents

| Field | Review |
| --- | --- |
| Activities contemplated | Help with a Canadian passport, a permanent resident travel document, or a travel document for a non-Canadian. |
| Activities requiring authorization or specialist review | Paid advice or representation on a permanent resident travel document. Any paid passport or other travel-document task that a qualified reviewer decides is advice or representation. |
| Official sources | irpa-91, imm-5476, passport-third-party, prtd-apply, travel-doc-non-canadian |
| Credentials or permissions to verify | Immigration authorization if the task is an IRPA application. Passport rules limit who may submit an application, and urgent or express applications generally require the applicant. IMM 5476 is not the passport form. |
| Public wording permitted after approval | Separate passport help from immigration travel documents. Do not say the business submits passports for clients unless the official limits have been reviewed and the task is allowed. Not approved now. |
| Disclaimer and consent | Shared disclaimer and shared consent. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### form-completion

| Field | Review |
| --- | --- |
| Activities contemplated | Type or assemble a form from the client's own answers, or complete a government form for a fee. |
| Activities requiring authorization or specialist review | Immigration or citizenship applications for a fee. Dealing with the CRA about a client's account. Using a Service Canada consent that does not authorize an application or a payment change. |
| Official sources | irpa-91, citizenship-21-1, ircc-representatives, cra-authorize, sc-pensions-consent |
| Credentials or permissions to verify | Split forms before any sale. Immigration and citizenship forms need representative authorization. Tax forms may need EFILE and a CRA authorization. Service Canada forms need that program's consent. |
| Public wording permitted after approval | Name the form family and say the client remains responsible for the contents. Do not offer a general "we complete government forms" service. Not approved now. |
| Disclaimer and consent | Shared disclaimer, plus the client's responsibility for the form. Shared consent. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. This record also blocks the immigration, government-forms, and tax catalog entries. |

### resume-writing

| Field | Review |
| --- | --- |
| Activities contemplated | Prepare or edit a resume or cover letter from information the client provides. |
| Activities requiring authorization or specialist review | Charging an individual in Alberta for help that secures employment, or making resume help a condition of placement. |
| Official sources | alberta-employment-agency, alberta-eablr-standards |
| Credentials or permissions to verify | Whether the business is an employment agency in its province. Alberta's standards allow a separate voluntary resume fee only in the circumstances they describe. Other provinces were not reviewed. |
| Public wording permitted after approval | Describe document preparation only. Do not promise a job, an interview, or an employment outcome. Not approved now. |
| Disclaimer and consent | Shared disclaimer, plus no employment outcome. Shared consent. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### job-applications

| Field | Review |
| --- | --- |
| Activities contemplated | Find openings, submit applications, or contact employers for a client. |
| Activities requiring authorization or specialist review | Operating as an employment agency and charging a job seeker for securing employment or for employer information. |
| Official sources | alberta-employment-agency, alberta-eablr-standards |
| Credentials or permissions to verify | An employment-agency licence if the province requires one, and confirmation that any fee is permitted. Alberta prohibits charging the individual for securing employment. |
| Public wording permitted after approval | Say who is charged and that no job is promised. Not approved now. |
| Disclaimer and consent | Shared disclaimer. Written instruction before an application is submitted or an employer is contacted in the client's name. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### cra-services

| Field | Review |
| --- | --- |
| Activities contemplated | Ask the CRA about a client's account, receive correspondence, or update an account. |
| Activities requiring authorization or specialist review | Any access to a client's CRA information. Online access uses Represent a Client. Form AUT-01 is offline access only. |
| Official sources | cra-authorize, cra-aut-01, cra-employer-accounts |
| Credentials or permissions to verify | A RepID, GroupID, or business number registered for Represent a Client, plus the client's confirmation of the authorization. |
| Public wording permitted after approval | Name the accounts the client has authorized. Do not say the business is the CRA or an official CRA channel. Not approved now. |
| Disclaimer and consent | Shared disclaimer. Record the access level and how the client cancels it. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### service-canada

| Field | Review |
| --- | --- |
| Activities contemplated | Communicate with Service Canada about EI, CPP, OAS, a record of employment, or a related client file. |
| Activities requiring authorization or specialist review | CPP or OAS communication under ISP1603 or My Service Canada Account. That consent does not authorize an application, a payment-address change, or a tax-withholding change. ROE Web access comes from the employer's primary officer. |
| Official sources | sc-pensions-consent, isp-1603, roe-web |
| Credentials or permissions to verify | The current consent for the specific program. The EI consent form still needs confirmation on canada.ca. ROE Web rights are granted by the employer. |
| Public wording permitted after approval | Name the program and the limit of the consent. Do not say the business is Service Canada. Not approved now. |
| Disclaimer and consent | Shared disclaimer. Do not reuse a CRA authorization as Service Canada consent. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### citizenship

| Field | Review |
| --- | --- |
| Activities contemplated | Advise on a citizenship grant or proof, complete or submit the application, or communicate with IRCC for a fee. |
| Activities requiring authorization or specialist review | Paid advice or representation under Citizenship Act section 21.1. |
| Official sources | citizenship-21-1, ircc-representatives, ircc-authorized, imm-5476, cicc-act, cicc-about |
| Credentials or permissions to verify | College licensee, lawyer, Quebec notary, or other law-society member in good standing. Confirm paralegal scope first. A RISIA licence is not sufficient. |
| Public wording permitted after approval | Describe only the authorized citizenship task and name the verified licence. Do not promise a grant of citizenship. Not approved now. |
| Disclaimer and consent | Shared disclaimer. IMM 5476 only for the citizenship application it covers. Do not file that form with a passport application. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### bookkeeping

| Field | Review |
| --- | --- |
| Activities contemplated | Record day-to-day transactions. This record does not include audit, review, compilation, or accounting advice. |
| Activities requiring authorization or specialist review | Alberta audit and review engagements, which section 3 of the Chartered Professional Accountants Act limits to a professional accounting firm. Accounting services or compilations by a CPA Alberta registrant, which follow that regulator's firm rules. |
| Official sources | cpa-act, cpa-public-practice, pipa-act, pipeda-provincial |
| Credentials or permissions to verify | Whether the person doing the work is a CPA Alberta registrant. Do not use a CPA title unless it is verified. Bookkeeping by a non-registrant is not described here as a reserved audit or review activity. |
| Public wording permitted after approval | Call the work bookkeeping. Do not call it an audit, review, compilation, or CPA engagement. Not approved now. |
| Disclaimer and consent | Shared disclaimer and shared consent. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### payroll

| Field | Review |
| --- | --- |
| Activities contemplated | Calculate pay, remit source deductions, or file records of employment for an employer. |
| Activities requiring authorization or specialist review | CRA payroll-account access through an authorized representative. ROE Web access invited by the employer's primary officer. Provincial employment-standards duties, which were not reviewed outside the Alberta question above. |
| Official sources | cra-employer-accounts, cra-authorize, roe-web |
| Credentials or permissions to verify | A CRA representative identifier authorized on the payroll account, and ROE Web access from the employer. |
| Public wording permitted after approval | Say the employer remains responsible for deductions and records. Do not imply a government payroll appointment. Not approved now. |
| Disclaimer and consent | Shared disclaimer. Written employer authority before payroll or employee information is accessed. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

### personal-tax

| Field | Review |
| --- | --- |
| Activities contemplated | Prepare or file a personal income tax return for a fee, or discuss what a client may claim. |
| Activities requiring authorization or specialist review | Electronic filing once the business is a tax preparer under Income Tax Act section 150.1. The CRA page says the duty applies when more than five returns of a type are prepared for consideration in a calendar year, with a paper-filing exception of five returns in each category, subject to the statutory exceptions. Discussing a client's account with the CRA needs a separate representative authorization. Tax advice by a CPA Alberta registrant needs that regulator's firm registration. |
| Official sources | ita-150-1, cra-mef, cra-efile, cra-authorize, cpa-public-practice |
| Credentials or permissions to verify | EFILE registration and yearly renewal if returns will be filed electronically. CRA RepID authorization before account access. CPA Alberta firm registration if the person is a registrant and the work goes beyond the simple returns that regulator describes. |
| Public wording permitted after approval | Describe preparation of a return. Do not promise a refund or say the business is the CRA. Not approved now. |
| Disclaimer and consent | Shared disclaimer. The client remains responsible for the return. EFILE identity information stays off the public website. |
| Owner and status | Business owner, name not on file. Source review 2026-10-09. Status needs-professional-review. Booking unavailable. |

## Issues requiring owner or professional review

Every item is open.

| Id | For | Issue |
| --- | --- | --- |
| not-legal-advice | Business owner | This framework is a source review. Legal approval has not been obtained. |
| province-unknown | Business owner | The province or territory of operation is unknown, so Alberta privacy, accounting, and employment-agency rules are conditional. Other provinces were not fully reviewed. |
| no-named-owner | Business owner | No owner name is on file, so nothing can be marked owner-approved. |
| no-verified-credential | Professional review | No RCIC, RISIA, law-society, Quebec notary, CPA, EFILE, CRA representative, or employment-agency credential is on file. |
| paralegal-scope | Professional review | IRPA section 91 and IRCC's authorization page do not describe paralegal scope the same way. |
| travel-document-boundary | Professional review | Permanent resident travel documents, passports, and travel documents for non-Canadians follow different representative instructions. |
| ei-consent-form | Professional review | The current official EI third-party consent form was not confirmed on canada.ca. CPP and OAS consent was. |
| efile-date | Professional review | Confirm the in-force electronic-filing threshold. The CRA page uses 1 January 2024. Finance explanatory notes discussed 1 January 2022. |
| cpa-status-unknown | Professional review | Whether anyone connected to the business is a CPA Alberta registrant changes the firm-registration duties. |
| employment-agency-scope | Professional review | Confirm whether job-application help is an employment agency. Alberta prohibits charging the job seeker for securing employment. |
| privacy-notice-missing | Business owner | No privacy notice, retention schedule, or breach process is approved. |
| risia-class | Professional review | Re-read the current College by-law and public register before treating any RISIA licence as authority. |
| quebec-overlay | Professional review | IRPA section 91 notes Quebec's immigration statute for College members who represent or advise in Quebec. That overlay was not reviewed. |
