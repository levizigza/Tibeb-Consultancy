import type { MetadataRoute } from "next";
import { complianceRecords } from "@/content/compliance/records";
import { guideIsPublic } from "@/content/resources/publication";
import { resourceGuides } from "@/content/resources/guides";
import { getPublicPricePresentations } from "@/content/services/price-presentation";
import { servicePageRecords } from "@/content/services/page-records";
import { selectPublicServicePage } from "@/content/services/page-publication";
import {
  allPublicPaths,
  primaryNavigation,
  serviceFamilies,
  servicePages,
} from "@/content/site/information-architecture";
import { replaceLocaleInPath } from "@/i18n/href";
import { localeCodes, type LocaleCode } from "@/i18n/locales";
import { localeCopyIsPublishable } from "@/i18n/review/validate";
import { publicSiteOrigin } from "@/lib/seo/origin";

/**
 * Leave this false until the owner approves a public launch.
 * The preview keeps `noindex` and `Disallow: /` while it is false.
 */
export const searchLaunchApproved = false;

export type SearchCatalog = {
  launchApproved: boolean;
  origin: string | null;
  allPaths: readonly string[];
  indexablePaths: readonly string[];
  readyLocales: readonly LocaleCode[];
};

export type SearchUrl = {
  path: string;
  loc: string;
  languages: Record<string, string>;
};

const shellPaths = new Set<string>(primaryNavigation.map((item) => item.path));

export function collectIndexablePaths(): string[] {
  const publishedServices = servicePages.filter((page) => {
    const record = servicePageRecords.find((item) => item.id === page.id);
    const compliance = complianceRecords.find((item) => item.id === page.id);
    return selectPublicServicePage(record, compliance) !== null;
  });
  const publishedFamilies = new Set(publishedServices.map((page) => page.familyId));
  const allowed = new Set<string>(shellPaths);

  for (const page of publishedServices) allowed.add(page.path);
  for (const family of serviceFamilies) {
    if (publishedFamilies.has(family.id)) allowed.add(family.path);
  }
  for (const guide of resourceGuides) {
    if (guideIsPublic(guide)) allowed.add(`/resources/${guide.id}`);
  }
  if (getPublicPricePresentations().length > 0) allowed.add("/pricing");

  return allPublicPaths().filter((path) => allowed.has(path) && !path.startsWith("/development"));
}

export function currentSearchCatalog(
  origin = publicSiteOrigin(),
  launchApproved = searchLaunchApproved,
): SearchCatalog {
  const readyLocales = localeCodes.filter(
    (locale) => locale === "en" || localeCopyIsPublishable(locale),
  );
  return {
    launchApproved,
    origin,
    allPaths: allPublicPaths(),
    indexablePaths: collectIndexablePaths(),
    readyLocales,
  };
}

export function siteAllowsCrawling(catalog: SearchCatalog = currentSearchCatalog()): boolean {
  return catalog.launchApproved && catalog.origin !== null;
}

export function localizedPathIsIndexable(
  path: string,
  locale: LocaleCode,
  catalog: SearchCatalog = currentSearchCatalog(),
): boolean {
  if (!siteAllowsCrawling(catalog)) return false;
  if (!catalog.indexablePaths.includes(path)) return false;
  if (path.startsWith("/development")) return false;
  return catalog.readyLocales.includes(locale);
}

function absolute(origin: string, path: string, locale: LocaleCode): string {
  return `${origin}${replaceLocaleInPath(path, locale)}`;
}

export function searchUrls(catalog: SearchCatalog): SearchUrl[] {
  if (!siteAllowsCrawling(catalog) || !catalog.origin) return [];
  const origin = catalog.origin;
  const urls: SearchUrl[] = [];

  for (const path of catalog.indexablePaths) {
    const languages: Record<string, string> = {
      "x-default": absolute(origin, path, "en"),
    };
    for (const locale of catalog.readyLocales) {
      languages[locale] = absolute(origin, path, locale);
    }
    for (const locale of catalog.readyLocales) {
      urls.push({
        path: replaceLocaleInPath(path, locale),
        loc: absolute(origin, path, locale),
        languages,
      });
    }
  }

  return urls;
}

export function buildRobots(catalog: SearchCatalog = currentSearchCatalog()): MetadataRoute.Robots {
  if (!siteAllowsCrawling(catalog) || !catalog.origin) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  const disallow = new Set<string>();
  for (const locale of localeCodes) {
    if (!catalog.readyLocales.includes(locale)) disallow.add(`/${locale}`);
  }
  for (const path of catalog.allPaths) {
    if (catalog.indexablePaths.includes(path)) continue;
    for (const locale of catalog.readyLocales) {
      disallow.add(replaceLocaleInPath(path, locale));
    }
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...disallow],
    },
    sitemap: `${catalog.origin}/sitemap.xml`,
  };
}
