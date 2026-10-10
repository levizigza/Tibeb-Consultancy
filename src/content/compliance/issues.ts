import { reviewIssueSchema, type ReviewIssue } from "@/content/compliance/schema";

/**
 * Open questions from the 2026-10-09 source review.
 * None of these items is a legal opinion, and none is resolved.
 */
export const reviewIssues: readonly ReviewIssue[] = [
  {
    id: "not-legal-advice",
    status: "open",
    audience: "business-owner",
    summary:
      "This framework is a source review for the website. It is not legal, tax, immigration, or accounting advice, and legal approval has not been obtained.",
  },
  {
    id: "province-unknown",
    status: "open",
    audience: "business-owner",
    summary:
      "The province or territory of operation is not on file. Alberta PIPA, the Alberta CPA Act, and the Alberta employment-agency rules apply only if the business operates there. Other provinces were not fully reviewed.",
  },
  {
    id: "no-named-owner",
    status: "open",
    audience: "business-owner",
    summary:
      "No owner name is on file, so no compliance record can be marked owner-approved.",
  },
  {
    id: "no-verified-credential",
    status: "open",
    audience: "professional-review",
    summary:
      "No RCIC, RISIA, law-society, Quebec notary, CPA, EFILE, CRA representative, or employment-agency credential is on file.",
  },
  {
    id: "paralegal-scope",
    status: "open",
    audience: "professional-review",
    summary:
      "IRPA section 91 names paralegals who are members of a provincial law society. IRCC's authorization page says paralegals are Ontario only. A lawyer should confirm which scope applies before anyone relies on a paralegal licence.",
  },
  {
    id: "travel-document-boundary",
    status: "open",
    audience: "professional-review",
    summary:
      "Permanent resident travel documents use the representative form. Canadian passports and some travel documents for non-Canadians tell applicants not to use that form. Paid advice on those documents still needs a qualified review before it is offered.",
  },
  {
    id: "ei-consent-form",
    status: "open",
    audience: "professional-review",
    summary:
      "CPP and OAS consent is described on the Service Canada pensions page and ISP1603. The current official Employment Insurance third-party consent form was not confirmed on canada.ca during this review.",
  },
  {
    id: "efile-date",
    status: "open",
    audience: "professional-review",
    summary:
      "The CRA tax-preparer page says electronic filing is mandatory above five returns as of 1 January 2024. Finance explanatory notes discussed 1 January 2022. Confirm the in-force threshold before counting returns.",
  },
  {
    id: "cpa-status-unknown",
    status: "open",
    audience: "professional-review",
    summary:
      "Alberta audit and review work is restricted to a professional accounting firm. CPA Alberta registrants have further firm-registration duties for tax advice and accounting services. Whether anyone connected to this business is a registrant is unknown.",
  },
  {
    id: "employment-agency-scope",
    status: "open",
    audience: "professional-review",
    summary:
      "If the business secures employment for people in Alberta, an employment-agency licence is required and the individual cannot be charged for that placement. Resume writing can be a separate voluntary fee only in the circumstances the Alberta standards describe. Equivalent rules in other provinces were not reviewed.",
  },
  {
    id: "privacy-notice-missing",
    status: "open",
    audience: "business-owner",
    summary:
      "There is no approved privacy notice, retention schedule, or breach process. Identity numbers, tax data, and immigration history must stay off the general inquiry form.",
  },
  {
    id: "risia-class",
    status: "open",
    audience: "professional-review",
    summary:
      "A RISIA licence is a restricted class. The College's public explanation says it does not authorize representation on permanent residence or citizenship applications. Re-check the current College by-law and public register before relying on any licence.",
  },
  {
    id: "quebec-overlay",
    status: "open",
    audience: "professional-review",
    summary:
      "IRPA section 91 notes that Quebec's immigration statute also applies to College members who represent or advise in Quebec. That overlay was not reviewed.",
  },
];

export function reviewIssuesParse(): boolean {
  return reviewIssues.every((issue) => reviewIssueSchema.safeParse(issue).success);
}
