import type { ComplianceRecord } from "@/content/compliance/schema";
import { complianceRecordSchema } from "@/content/compliance/schema";

const hold = {
  requiresRegulatoryReview: true,
  legalApprovalObtained: false,
  paidOfferingStatus: "closed",
  bookingAvailability: "unavailable",
  informationPublicationStatus: "internal-draft",
  reviewStatus: "needs-professional-review",
  credentialVerification: "unverified",
  authorizationStatus: "pending",
  ownerResponsible: { role: "business-owner", name: null },
  sourceReviewedOn: "2026-10-09",
  ownerReviewedOn: null,
  approvedPublicWording: null,
} as const;

const sharedDisclaimer = [
  "State that this source review is not legal, tax, immigration, or accounting advice.",
  "Do not say that legal or regulatory approval has been obtained.",
  "Do not say or imply that the business is part of, endorsed by, or an official channel for a government body.",
];

const sharedConsent = [
  "Get consent for the specific task before collecting personal information.",
  "Do not collect a social insurance number, immigration history, or tax data through the general inquiry form.",
  "Tell the client what will be collected, who will see it, and how to withdraw consent.",
];

function outline(topic: string): string {
  return `Unpublished internal note for a future ${topic} page: point readers to the official instructions, say that hiring help is optional, and say that this business has no confirmed permission to advise or file.`;
}

export const complianceRecords: readonly ComplianceRecord[] = [
  {
    ...hold,
    id: "permanent-residence",
    categoryId: "immigration-citizenship",
    relatedServiceIds: ["immigration-citizenship-assistance"],
    sourceIds: ["irpa-91", "ircc-representatives", "ircc-authorized", "imm-5476", "cicc-act", "cicc-about"],
    activitiesContemplated: [
      "Explain permanent residence programs, choose a program, complete or submit an application, or communicate with IRCC or the Immigration and Refugee Board for a fee.",
    ],
    activitiesRequiringAuthorization: [
      "Paid advice, representation, form completion, or advertising of permanent residence services under IRPA section 91.",
    ],
    credentialsToVerify: [
      "RCIC in good standing on the College public register, or a lawyer, Quebec notary, or other law-society member whose scope covers the work. A RISIA licence is not sufficient for this work.",
    ],
    disclaimerRequirements: sharedDisclaimer,
    consentRequirements: [
      ...sharedConsent,
      "Use IMM 5476 only after an authorized representative is actually appointed, and only for the application it covers.",
    ],
    informationOutline: outline("permanent residence"),
  },
  {
    ...hold,
    id: "travel-documents",
    categoryId: "immigration-citizenship",
    relatedServiceIds: ["immigration-citizenship-assistance", "government-forms-assistance"],
    sourceIds: ["irpa-91", "imm-5476", "passport-third-party", "prtd-apply", "travel-doc-non-canadian"],
    activitiesContemplated: [
      "Help with a Canadian passport, a permanent resident travel document, or a travel document for a non-Canadian.",
    ],
    activitiesRequiringAuthorization: [
      "Paid advice or representation on a permanent resident travel document.",
      "Any paid passport or other travel-document task that a qualified reviewer decides is advice or representation.",
    ],
    credentialsToVerify: [
      "The same immigration authorization as permanent residence work, if the task is an IRPA application.",
      "Passport submission limits: many third parties cannot submit urgent or express applications, and IMM 5476 is not the passport form.",
    ],
    disclaimerRequirements: sharedDisclaimer,
    consentRequirements: sharedConsent,
    informationOutline: outline("travel document"),
  },
  {
    ...hold,
    id: "form-completion",
    categoryId: "government-forms",
    relatedServiceIds: [
      "immigration-citizenship-assistance",
      "government-forms-assistance",
      "tax-business-administration-assistance",
    ],
    sourceIds: ["irpa-91", "citizenship-21-1", "ircc-representatives", "cra-authorize", "sc-pensions-consent"],
    activitiesContemplated: [
      "Type or assemble a form from answers the client supplies, or complete a government form for a fee.",
    ],
    activitiesRequiringAuthorization: [
      "Completing or submitting an immigration or citizenship application for a fee.",
      "Dealing with the CRA about a client's account.",
      "Using a Service Canada program consent that does not authorize an application or a change to payments.",
    ],
    credentialsToVerify: [
      "Split each form family before sale. Immigration and citizenship forms need the representative authorization. Tax forms may need EFILE registration and a CRA authorization. Service Canada forms need the program's own consent.",
    ],
    disclaimerRequirements: [
      ...sharedDisclaimer,
      "The client remains responsible for the contents of a form, including a form someone else types.",
    ],
    consentRequirements: sharedConsent,
    informationOutline: outline("form completion"),
  },
  {
    ...hold,
    id: "resume-writing",
    categoryId: "career-employment",
    relatedServiceIds: ["career-document-assistance"],
    sourceIds: ["alberta-employment-agency", "alberta-eablr-standards"],
    activitiesContemplated: [
      "Prepare or edit a resume or cover letter from information the client provides.",
    ],
    activitiesRequiringAuthorization: [
      "Charging an individual in Alberta for help that secures or attempts to secure employment, or conditioning resume help on a placement.",
    ],
    credentialsToVerify: [
      "Whether the business is an employment agency in its province of operation. Alberta allows a separate voluntary resume fee only in the circumstances its standards describe.",
    ],
    disclaimerRequirements: [
      ...sharedDisclaimer,
      "Do not promise a job, an interview, or an employment outcome.",
    ],
    consentRequirements: sharedConsent,
    informationOutline: outline("resume writing"),
  },
  {
    ...hold,
    id: "job-applications",
    categoryId: "career-employment",
    relatedServiceIds: ["career-document-assistance"],
    sourceIds: ["alberta-employment-agency", "alberta-eablr-standards"],
    activitiesContemplated: [
      "Find openings, submit applications, or contact employers for a client.",
    ],
    activitiesRequiringAuthorization: [
      "Operating as an employment agency and charging a job seeker for securing employment or for employer information.",
    ],
    credentialsToVerify: [
      "An employment-agency licence if the province requires one, and confirmation that any fee is charged only to an employer or is otherwise permitted.",
    ],
    disclaimerRequirements: [
      ...sharedDisclaimer,
      "Do not promise a job, an interview, or an employment outcome.",
    ],
    consentRequirements: [
      ...sharedConsent,
      "Get a written instruction before submitting an application or contacting an employer in the client's name.",
    ],
    informationOutline: outline("job applications"),
  },
  {
    ...hold,
    id: "cra-services",
    categoryId: "tax-business-administration",
    relatedServiceIds: ["tax-business-administration-assistance"],
    sourceIds: ["cra-authorize", "cra-aut-01", "cra-employer-accounts"],
    activitiesContemplated: [
      "Ask the CRA about a client's account, receive the client's correspondence, or update an account.",
    ],
    activitiesRequiringAuthorization: [
      "Any access to a client's CRA account. Online access needs Represent a Client. AUT-01 is offline access only and does not authorize online access.",
    ],
    credentialsToVerify: [
      "A RepID, GroupID, or business number registered for Represent a Client, plus the client's own confirmation of the authorization.",
    ],
    disclaimerRequirements: sharedDisclaimer,
    consentRequirements: [
      ...sharedConsent,
      "The client must authorize the specific CRA accounts. Keep a record of the level of access and how to cancel it.",
    ],
    informationOutline: outline("CRA account help"),
  },
  {
    ...hold,
    id: "service-canada",
    categoryId: "government-forms",
    relatedServiceIds: ["government-forms-assistance"],
    sourceIds: ["sc-pensions-consent", "isp-1603", "roe-web"],
    activitiesContemplated: [
      "Communicate with Service Canada about EI, CPP, OAS, a record of employment, or a related client file.",
    ],
    activitiesRequiringAuthorization: [
      "CPP or OAS communication under the client's consent. That consent does not authorize an application, a payment-address change, or a tax-withholding change.",
      "ROE Web access granted by the employer's primary officer.",
    ],
    credentialsToVerify: [
      "The current consent for the specific program. The EI form still needs confirmation.",
      "ROE Web user access from the employer, not a general Service Canada login.",
    ],
    disclaimerRequirements: sharedDisclaimer,
    consentRequirements: [
      ...sharedConsent,
      "Use the program form or My Service Canada Account process. Do not reuse a CRA authorization as Service Canada consent.",
    ],
    informationOutline: outline("Service Canada program help"),
  },
  {
    ...hold,
    id: "citizenship",
    categoryId: "immigration-citizenship",
    relatedServiceIds: ["immigration-citizenship-assistance"],
    sourceIds: ["citizenship-21-1", "ircc-representatives", "ircc-authorized", "imm-5476", "cicc-act", "cicc-about"],
    activitiesContemplated: [
      "Advise on a citizenship grant or proof, complete or submit the application, or communicate with IRCC for a fee.",
    ],
    activitiesRequiringAuthorization: [
      "Paid advice or representation in connection with a proceeding or application under the Citizenship Act.",
    ],
    credentialsToVerify: [
      "The same classes as IRPA section 91: College licensee, lawyer, Quebec notary, or other law-society member in good standing. Confirm paralegal scope before relying on it. A RISIA licence is not sufficient.",
    ],
    disclaimerRequirements: sharedDisclaimer,
    consentRequirements: [
      ...sharedConsent,
      "Use IMM 5476 only for the citizenship application it covers. Do not file it with a passport application.",
    ],
    informationOutline: outline("citizenship"),
  },
  {
    ...hold,
    id: "bookkeeping",
    categoryId: "tax-business-administration",
    relatedServiceIds: ["tax-business-administration-assistance"],
    sourceIds: ["cpa-act", "cpa-public-practice", "pipa-act", "pipeda-provincial"],
    activitiesContemplated: [
      "Record day-to-day transactions for a client. Do not offer audit, review, compilation, or accounting advice as part of this record.",
    ],
    activitiesRequiringAuthorization: [
      "An audit or review engagement, which Alberta restricts to a professional accounting firm.",
      "Accounting services or a compilation by a CPA Alberta registrant, which must follow that regulator's firm rules.",
    ],
    credentialsToVerify: [
      "Whether the person doing the work is a CPA Alberta registrant. Do not use a CPA title unless it is verified.",
    ],
    disclaimerRequirements: [
      ...sharedDisclaimer,
      "Describe the work as bookkeeping only. Do not call it an audit, review, or compilation.",
    ],
    consentRequirements: sharedConsent,
    informationOutline: outline("bookkeeping"),
  },
  {
    ...hold,
    id: "payroll",
    categoryId: "tax-business-administration",
    relatedServiceIds: ["tax-business-administration-assistance"],
    sourceIds: ["cra-employer-accounts", "cra-authorize", "roe-web"],
    activitiesContemplated: [
      "Calculate pay, remit source deductions, or file records of employment for an employer client.",
    ],
    activitiesRequiringAuthorization: [
      "CRA payroll-account access through an authorized representative.",
      "ROE Web access invited by the employer's primary officer.",
    ],
    credentialsToVerify: [
      "A CRA representative identifier authorized on the payroll account.",
      "Provincial employment-standards duties for the employer's province, which were not reviewed beyond Alberta.",
    ],
    disclaimerRequirements: [
      ...sharedDisclaimer,
      "The employer remains responsible for source deductions and employment records.",
    ],
    consentRequirements: [
      ...sharedConsent,
      "Get the employer's written authority before accessing payroll or employee information.",
    ],
    informationOutline: outline("payroll"),
  },
  {
    ...hold,
    id: "personal-tax",
    categoryId: "tax-business-administration",
    relatedServiceIds: ["tax-business-administration-assistance"],
    sourceIds: ["ita-150-1", "cra-mef", "cra-efile", "cra-authorize", "cpa-public-practice"],
    activitiesContemplated: [
      "Prepare or file a personal income tax return for a fee, or discuss what a client may claim.",
    ],
    activitiesRequiringAuthorization: [
      "Electronic filing once the business is a tax preparer under the Income Tax Act.",
      "Discussing a client's account with the CRA, which needs a separate representative authorization.",
      "Tax advice by a CPA Alberta registrant, which needs that regulator's firm registration.",
    ],
    credentialsToVerify: [
      "EFILE registration and yearly renewal if returns will be filed electronically.",
      "CRA RepID authorization before any account access.",
      "CPA Alberta firm registration if the person is a registrant and the work goes beyond the simple returns that regulator describes.",
    ],
    disclaimerRequirements: [
      ...sharedDisclaimer,
      "The client remains responsible for the return. Do not promise a refund.",
    ],
    consentRequirements: [
      ...sharedConsent,
      "EFILE screening asks the filer for identity information. Collect that only in the registration channel, not on the public website.",
    ],
    informationOutline: outline("personal tax"),
  },
];

export function complianceRecordsParse(): boolean {
  return complianceRecords.every((record) => complianceRecordSchema.safeParse(record).success);
}
