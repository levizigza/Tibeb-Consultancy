import { hasText } from "@/content/model/claim";
import { resourceCategory } from "@/content/resources/categories";
import { resourceGuide, resourceGuides } from "@/content/resources/guides";
import type { ResourceCategoryId, ResourceGuide, ResourceSection, ResourceSource } from "@/content/resources/schema";
import { resourceSource } from "@/content/resources/sources";
import type { LocaleCode } from "@/i18n/locales";

export type GuideLink = {
  path: string;
  title: string;
};

export type GuidePresentation = {
  id: string;
  path: string;
  title: string;
  summary: string;
  audience: string;
  categoryId: ResourceCategoryId;
  categoryLabel: string;
  reviewer: string | null;
  publicationStatus: ResourceGuide["publicationStatus"];
  published: boolean;
  publishedOn: string | null;
  lastReviewed: string | null;
  nextReview: string | null;
  sourceLocale: "en";
  translationStatus: "source" | "missing";
  requiresProfessionalReview: boolean;
  sections: ResourceSection[];
  sources: ResourceSource[];
  related: GuideLink[];
  siteLinks: GuideLink[];
};

const siteLinkPaths = new Set(["/contact", "/how-it-works", "/services"]);

const sourcedCategories = new Set<ResourceGuide["categoryId"]>([
  "government-information",
  "tax-preparation",
  "bookkeeping",
  "payroll-fundamentals",
]);

export function guideIsPublic(guide: ResourceGuide): boolean {
  if (guide.publicationStatus !== "approved" || guide.verification !== "verified") return false;
  if (!hasText(guide.reviewer)) return false;
  if (!guide.publishedOn || !guide.lastReviewed || !guide.nextReview) return false;
  if (guide.nextReview < guide.lastReviewed) return false;
  if (guide.sourceIds.some((id) => !resourceSource(id))) return false;
  if (sourcedCategories.has(guide.categoryId) && guide.sourceIds.length === 0) return false;
  return true;
}

function present(guide: ResourceGuide, locale: LocaleCode): GuidePresentation {
  const published = guideIsPublic(guide);
  const category = resourceCategory(guide.categoryId);
  return {
    id: guide.id,
    path: `/resources/${guide.id}`,
    title: guide.title,
    summary: guide.summary,
    audience: guide.audience,
    categoryId: guide.categoryId,
    categoryLabel: category?.label ?? guide.categoryId,
    reviewer: guide.reviewer,
    publicationStatus: guide.publicationStatus,
    published,
    publishedOn: published ? guide.publishedOn : null,
    lastReviewed: published ? guide.lastReviewed : null,
    nextReview: published ? guide.nextReview : null,
    sourceLocale: "en",
    translationStatus: locale === "en" ? "source" : "missing",
    requiresProfessionalReview: guide.requiresProfessionalReview,
    sections: published ? guide.sections : [],
    sources: guide.sourceIds.flatMap((id) => {
      const source = resourceSource(id);
      return source ? [source] : [];
    }),
    related: guide.relatedIds.flatMap((id) => {
      const related = resourceGuide(id);
      return related ? [{ path: `/resources/${related.id}`, title: related.title }] : [];
    }),
    siteLinks: guide.siteLinks
      .filter((link) => siteLinkPaths.has(link.path))
      .map((link) => ({ path: link.path, title: link.label })),
  };
}

export function guidePresentations(locale: LocaleCode): GuidePresentation[] {
  return resourceGuides.map((guide) => present(guide, locale));
}

export function guidePresentation(id: string, locale: LocaleCode): GuidePresentation | null {
  const guide = resourceGuide(id);
  if (!guide) return null;
  return present(guide, locale);
}

export function guidesNeedingProfessionalReview(): ResourceGuide[] {
  return resourceGuides.filter((guide) => guide.requiresProfessionalReview);
}
