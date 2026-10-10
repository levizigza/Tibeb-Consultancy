import { officialSourceSchema, type OfficialSource } from "@/content/compliance/schema";

const accessedOn = "2026-10-09";

/**
 * Official sources read for this framework. Inclusion is not legal approval.
 */
export const officialSources: readonly OfficialSource[] = [
  {
    id: "irpa-91",
    title: "Immigration and Refugee Protection Act, section 91",
    publisher: "Justice Laws",
    url: "https://laws-lois.justice.gc.ca/eng/acts/i-2.5/section-91.html",
    accessedOn,
  },
  {
    id: "citizenship-21-1",
    title: "Citizenship Act, section 21.1",
    publisher: "Justice Laws",
    url: "https://laws-lois.justice.gc.ca/eng/acts/C-29/section-21.1.html",
    accessedOn,
  },
  {
    id: "ircc-representatives",
    title: "Learn about representatives",
    publisher: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative/learn-about-representatives.html",
    accessedOn,
  },
  {
    id: "ircc-authorized",
    title: "Find out if your representative is authorized",
    publisher: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigration-citizenship-representative/choose/authorized.html",
    accessedOn,
  },
  {
    id: "imm-5476",
    title: "Use of a Representative (IMM 5476)",
    publisher: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/imm5476.html",
    accessedOn,
  },
  {
    id: "cicc-act",
    title: "College of Immigration and Citizenship Consultants Act",
    publisher: "Justice Laws",
    url: "https://laws-lois.justice.gc.ca/eng/acts/c-33.6/FullText.html",
    accessedOn,
  },
  {
    id: "cicc-about",
    title: "About the College of Immigration and Citizenship Consultants",
    publisher: "College of Immigration and Citizenship Consultants",
    url: "https://college-ic.ca/ICCRC/Assets/Documents/College%20of%20Immigration%20and%20Citizenship%20Consultants-EN.pdf",
    accessedOn,
  },
  {
    id: "cicc-regulations-2026",
    title: "College of Immigration and Citizenship Consultants Regulations, SOR/2026-68",
    publisher: "Canada Gazette, Part II",
    url: "https://gazette.gc.ca/rp-pr/p2/2026/2026-05-06/html/sor-dors68-eng.html",
    accessedOn,
  },
  {
    id: "cra-authorize",
    title: "Representatives: Request authorization",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/e-services/cra-login-services/help-cra-sign-in-services/representatives-request-authorization.html",
    accessedOn,
  },
  {
    id: "cra-aut-01",
    title: "AUT-01 Authorize a Representative for Offline Access",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/forms/aut-01.html",
    accessedOn,
  },
  {
    id: "cra-efile",
    title: "EFILE eligibility",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-individuals/efile-electronic-filers/eligibility.html",
    accessedOn,
  },
  {
    id: "ita-150-1",
    title: "Income Tax Act, section 150.1",
    publisher: "Justice Laws",
    url: "https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-150.1.html",
    accessedOn,
  },
  {
    id: "cra-mef",
    title: "Mandatory electronic filing for tax preparers",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/e-services/digital-services-tax-preparers/mandatory-electronic-filing-tax-preparers.html",
    accessedOn,
  },
  {
    id: "sc-pensions-consent",
    title: "Apply and manage your public pensions",
    publisher: "Service Canada",
    url: "https://www.canada.ca/en/services/life-events/retirement/apply-manage-your-pensions.html",
    accessedOn,
  },
  {
    id: "isp-1603",
    title: "Consent to Communicate Information to an Authorized Person (ISP1603)",
    publisher: "Service Canada",
    url: "https://catalogue.servicecanada.gc.ca/apps/EForms/pdf/en/ISP-1603_OAS.pdf",
    accessedOn,
  },
  {
    id: "passport-third-party",
    title: "Applying for a passport",
    publisher: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/help-centre/apply.html",
    accessedOn,
  },
  {
    id: "prtd-apply",
    title: "Permanent resident travel document: How to apply",
    publisher: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/permanent-residents/travel-document/apply.html",
    accessedOn,
  },
  {
    id: "travel-doc-non-canadian",
    title: "Apply for a travel document for non-Canadians",
    publisher: "Immigration, Refugees and Citizenship Canada",
    url: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/travel-documents-non-canadians/apply-how.html",
    accessedOn,
  },
  {
    id: "pipa-act",
    title: "Personal Information Protection Act, RSA 2003, c P-6.5",
    publisher: "Alberta King's Printer",
    url: "https://kings-printer.alberta.ca/serve_pdf.cfm?file=P06P5.pdf&type=Acts",
    accessedOn,
  },
  {
    id: "oipc-pipa",
    title: "Personal Information Protection Act overview",
    publisher: "Office of the Information and Privacy Commissioner of Alberta",
    url: "https://oipc.ab.ca/legislation/pipa/",
    accessedOn,
  },
  {
    id: "pipeda-provincial",
    title: "Provincial laws that may apply instead of PIPEDA",
    publisher: "Office of the Privacy Commissioner of Canada",
    url: "https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/r_o_p/prov-pipeda/",
    accessedOn,
  },
  {
    id: "cpa-act",
    title: "Chartered Professional Accountants Act, SA 2014, c C-10.2",
    publisher: "CanLII",
    url: "https://www.canlii.org/en/ab/laws/stat/sa-2014-c-c-10.2/latest/sa-2014-c-c-10.2.html",
    accessedOn,
  },
  {
    id: "cpa-public-practice",
    title: "Public practice and professional accounting firm registration",
    publisher: "CPA Alberta",
    url: "https://www.cpaalberta.ca/Public-Practice",
    accessedOn,
  },
  {
    id: "alberta-employment-agency",
    title: "Employment agency licence",
    publisher: "Government of Alberta",
    url: "https://www.alberta.ca/employment-agency-licence",
    accessedOn,
  },
  {
    id: "alberta-eablr-standards",
    title: "Employment Agency Compliance Standards",
    publisher: "Government of Alberta",
    url: "https://open.alberta.ca/dataset/ab4c0437-4c19-4db1-ae5f-e697375dfbcc/resource/ef7cc714-6a05-4e20-8379-ce4b2c683e20/download/sartr-employment-agency-compliance-standards-2023.pdf",
    accessedOn,
  },
  {
    id: "roe-web",
    title: "EI record of employment and ROE Web access",
    publisher: "Employment and Social Development Canada",
    url: "https://www.canada.ca/en/employment-social-development/programs/ei/ei-list/ei-roe.html",
    accessedOn,
  },
  {
    id: "cra-employer-accounts",
    title: "Employer Accounts Program privacy impact assessment",
    publisher: "Canada Revenue Agency",
    url: "https://www.canada.ca/en/revenue-agency/services/about-canada-revenue-agency-cra/protecting-your-privacy/privacy-impact-assessment/employer-accounts-program-pia-v3-ic-129717.html",
    accessedOn,
  },
];

export function officialSourcesParse(): boolean {
  return officialSources.every((source) => officialSourceSchema.safeParse(source).success);
}
