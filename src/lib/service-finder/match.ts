import { complianceRecords } from "@/content/compliance/records";
import { finderIntentById, type FinderIntentId } from "@/content/site/service-finder";
import { servicePages } from "@/content/site/information-architecture";
import { servicePageRecords } from "@/content/services/page-records";
import { selectPublicServicePage } from "@/content/services/page-publication";
import type { ServiceCategoryId } from "@/content/services/categories";

export type FinderPublishedLink = {
  id: string;
  familyId: ServiceCategoryId;
  name: string;
  summary: string;
  path: string;
};

/**
 * A finder link exists only when the service page passes the publication gate
 * and the path is the one already registered for that page.
 */
export function linksForIntentFromPages(
  intentId: FinderIntentId,
  pages: readonly FinderPublishedLink[],
): FinderPublishedLink[] {
  const intent = finderIntentById(intentId);
  if (!intent?.categoryId) return [];
  return pages.filter((item) => {
    const registered = servicePages.find(
      (page) => page.id === item.id && page.familyId === item.familyId && page.path === item.path,
    );
    return registered?.familyId === intent.categoryId;
  });
}

export function publishedServicePages(): FinderPublishedLink[] {
  return servicePages.flatMap((page) => {
    const record = servicePageRecords.find((item) => item.id === page.id);
    const compliance = complianceRecords.find((item) => item.id === page.id);
    const published = selectPublicServicePage(record, compliance);
    if (!published) return [];
    return [
      {
        id: published.id,
        familyId: page.familyId,
        name: published.title,
        summary: published.description,
        path: page.path,
      },
    ];
  });
}

export function publishedLinksForIntent(intentId: FinderIntentId): FinderPublishedLink[] {
  return linksForIntentFromPages(intentId, publishedServicePages());
}
