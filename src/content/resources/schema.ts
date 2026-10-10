import { z } from "zod";
import { containsProhibitedServiceClaim } from "@/content/compliance/schema";
import { factualVerifications, publicationStatuses } from "@/content/model/status";

export const resourceCategoryIds = [
  "career-employment",
  "government-information",
  "tax-preparation",
  "bookkeeping",
  "payroll-fundamentals",
  "client-checklists",
] as const;

export type ResourceCategoryId = (typeof resourceCategoryIds)[number];

const officialHosts = ["canada.ca", "gc.ca", "justice.gc.ca"];

export const resourceSourceSchema = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1),
    publisher: z.string().trim().min(1),
    url: z.url(),
    accessedOn: z.iso.date(),
  })
  .superRefine((source, context) => {
    const host = new URL(source.url).hostname;
    const official = officialHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
    if (!official) {
      context.addIssue({ code: "custom", message: "Resource sources must be official Canadian government pages." });
    }
  });

export type ResourceSource = z.infer<typeof resourceSourceSchema>;

export const resourceSectionSchema = z.object({
  id: z.string().trim().min(1),
  heading: z.string().trim().min(1),
  paragraphs: z.array(z.string().trim().min(1)).min(1),
});

export type ResourceSection = z.infer<typeof resourceSectionSchema>;

const advicePattern = /\byou are eligible\b|\byou qualify\b|\byou should (claim|deduct|file)\b/i;

export const resourceGuideSchema = z
  .object({
    id: z.string().trim().min(1),
    title: z.string().trim().min(1),
    summary: z.string().trim().min(1),
    audience: z.string().trim().min(1),
    categoryId: z.enum(resourceCategoryIds),
    reviewer: z.string().trim().min(1).nullable(),
    publicationStatus: z.enum(publicationStatuses),
    verification: z.enum(factualVerifications),
    requiresProfessionalReview: z.boolean(),
    sourceIds: z.array(z.string().trim().min(1)),
    publishedOn: z.iso.date().nullable(),
    lastReviewed: z.iso.date().nullable(),
    nextReview: z.iso.date().nullable(),
    sourceLocale: z.literal("en"),
    sections: z.array(resourceSectionSchema).min(1),
    relatedIds: z.array(z.string().trim().min(1)),
    siteLinks: z.array(
      z.object({
        path: z.string().trim().startsWith("/"),
        label: z.string().trim().min(1),
      }),
    ),
  })
  .superRefine((guide, context) => {
    const text = [guide.title, guide.summary, guide.audience, ...guide.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join(" ");
    if (containsProhibitedServiceClaim(text) || advicePattern.test(text)) {
      context.addIssue({ code: "custom", message: "Guide copy gives advice or makes a prohibited claim." });
    }
    if (guide.nextReview && guide.lastReviewed && guide.nextReview < guide.lastReviewed) {
      context.addIssue({ code: "custom", message: "The next review date is before the last review." });
    }
    const professional = guide.categoryId === "tax-preparation" || guide.categoryId === "bookkeeping" || guide.categoryId === "payroll-fundamentals" || guide.categoryId === "government-information";
    if (professional && !guide.requiresProfessionalReview) {
      context.addIssue({ code: "custom", message: "This category stays unpublished until a professional review is required." });
    }
  });

export type ResourceGuide = z.infer<typeof resourceGuideSchema>;
