import { resourceGuideSchema, type ResourceGuide } from "@/content/resources/schema";

/**
 * Starter guides. None is approved: no reviewer has been named.
 * Sections stay in this file for a future review. Public pages do not render them.
 */
export const resourceGuides: readonly ResourceGuide[] = resourceGuideSchema.array().parse([
  {
    id: "resume-information",
    title: "How to prepare information for a resume.",
    summary:
      "A draft about gathering facts a person already has before writing a resume. It is not published, and it does not review a resume.",
    audience: "A person collecting their own work history before they write a resume.",
    categoryId: "career-employment",
    reviewer: null,
    publicationStatus: "draft",
    verification: "unverified",
    requiresProfessionalReview: false,
    sourceIds: ["job-bank-resume"],
    publishedOn: null,
    lastReviewed: null,
    nextReview: null,
    sourceLocale: "en",
    sections: [
      {
        id: "facts",
        heading: "Facts to gather",
        paragraphs: [
          "List job titles, employer names, cities, and the months each role started and ended. Use dates the person can check against their own records.",
          "Job Bank publishes general resume guidance. This draft does not rewrite a resume and does not promise an interview.",
        ],
      },
    ],
    relatedIds: ["administrative-assistance"],
    siteLinks: [],
  },
  {
    id: "tax-appointment-documents",
    title: "Documents to organize before a tax appointment.",
    summary:
      "A draft about sorting papers before a tax appointment. It is not published, and it does not say what a person owes or which credits apply.",
    audience: "A person who wants papers in one place before talking with someone about a tax return.",
    categoryId: "tax-preparation",
    reviewer: null,
    publicationStatus: "draft",
    verification: "unverified",
    requiresProfessionalReview: true,
    sourceIds: ["cra-get-ready"],
    publishedOn: null,
    lastReviewed: null,
    nextReview: null,
    sourceLocale: "en",
    sections: [
      {
        id: "papers",
        heading: "Papers to set aside",
        paragraphs: [
          "The Canada Revenue Agency publishes a page on getting ready to do taxes. Read that page for the official list. This draft does not add a TIBEB list of slips, receipts, or credits.",
          "Do not send tax slips, a social insurance number, or a return through this website.",
        ],
      },
    ],
    relatedIds: ["small-business-bookkeeping"],
    siteLinks: [{ path: "/contact", label: "Contact" }],
  },
  {
    id: "small-business-bookkeeping",
    title: "Basic bookkeeping organization for small businesses.",
    summary:
      "A draft about grouping small-business records. It is not published, and it does not set up books or decide a tax treatment.",
    audience: "A person who keeps records for a small business and wants them grouped before asking for help.",
    categoryId: "bookkeeping",
    reviewer: null,
    publicationStatus: "draft",
    verification: "unverified",
    requiresProfessionalReview: true,
    sourceIds: ["cra-keeping-records"],
    publishedOn: null,
    lastReviewed: null,
    nextReview: null,
    sourceLocale: "en",
    sections: [
      {
        id: "records",
        heading: "Records to keep together",
        paragraphs: [
          "The Canada Revenue Agency publishes record-keeping guidance for businesses. That page is the official source for how long records must be kept and what a business should be able to show.",
          "This draft does not choose accounting software, categories, or a method of recording sales.",
        ],
      },
    ],
    relatedIds: ["tax-appointment-documents"],
    siteLinks: [],
  },
  {
    id: "official-government-forms",
    title: "Where to find official Canadian government forms.",
    summary:
      "A draft that names official pages where government forms are published. It is not published, and it does not complete a form.",
    audience: "A person looking for the office that publishes a form, rather than a copy from this website.",
    categoryId: "government-information",
    reviewer: null,
    publicationStatus: "draft",
    verification: "unverified",
    requiresProfessionalReview: true,
    sourceIds: ["cra-forms"],
    publishedOn: null,
    lastReviewed: null,
    nextReview: null,
    sourceLocale: "en",
    sections: [
      {
        id: "office",
        heading: "Which office publishes the form",
        paragraphs: [
          "The department that owns a program publishes its forms. The Canada Revenue Agency forms and publications page is one official index. Other departments publish their own forms on canada.ca.",
          "This website does not host government forms, and it is not a government channel.",
        ],
      },
    ],
    relatedIds: ["administrative-assistance"],
    siteLinks: [],
  },
  {
    id: "administrative-assistance",
    title: "What to expect when requesting administrative assistance.",
    summary:
      "A draft about what this website can accept in a general inquiry. It is not published, and it does not open a file.",
    audience: "A person deciding whether a short inquiry is the right next step.",
    categoryId: "client-checklists",
    reviewer: null,
    publicationStatus: "draft",
    verification: "unverified",
    requiresProfessionalReview: false,
    sourceIds: [],
    publishedOn: null,
    lastReviewed: null,
    nextReview: null,
    sourceLocale: "en",
    sections: [
      {
        id: "limits",
        heading: "What this website will not do",
        paragraphs: [
          "The contact form asks for a name, a way to reply, a language preference, a service group, and an optional short note. It does not book a consultation.",
          "Do not include a social insurance number, a password, a passport, a tax return, a bank statement, a payment card, or an immigration document.",
        ],
      },
    ],
    relatedIds: ["resume-information"],
    siteLinks: [
      { path: "/contact", label: "Contact" },
      { path: "/how-it-works", label: "How it works" },
    ],
  },
]);

export function resourceGuide(id: string): ResourceGuide | undefined {
  return resourceGuides.find((guide) => guide.id === id);
}

export function resourceGuidePaths(): string[] {
  return resourceGuides.map((guide) => `/resources/${guide.id}`);
}
