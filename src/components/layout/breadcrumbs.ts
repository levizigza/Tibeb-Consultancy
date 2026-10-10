import { resourceGuide } from "@/content/resources/guides";
import { serviceFamilies, servicePages, staticPages } from "@/content/site/information-architecture";
import { localeCodes, type LocaleCode } from "@/i18n/locales";

export type Breadcrumb = {
  label: string;
  path: string;
};

const staticLabels: Record<string, string> = {
  services: "Services",
  "how-it-works": "How it works",
  about: "About",
  resources: "Resources",
  contact: "Contact",
  development: "Development documentation",
  "design-system": "Design system",
};

function labelFor(segment: string): string {
  return (
    staticLabels[segment] ??
    staticPages.find((page) => page.id === segment)?.label ??
    serviceFamilies.find((family) => family.id === segment)?.label ??
    servicePages.find((page) => page.id === segment)?.label ??
    resourceGuide(segment)?.title ??
    segment
  );
}

export function buildBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split("/").filter(Boolean);
  const hasLocale = localeCodes.includes(segments[0] as LocaleCode);
  const locale = hasLocale ? (segments[0] as LocaleCode) : "en";
  const rest = hasLocale ? segments.slice(1) : segments;
  if (rest.length === 0) return [];

  const crumbs: Breadcrumb[] = [{ label: "Home", path: `/${locale}` }];
  let acc = "";
  for (const segment of rest) {
    acc += `/${segment}`;
    crumbs.push({ label: labelFor(segment), path: `/${locale}${acc}` });
  }
  return crumbs;
}
