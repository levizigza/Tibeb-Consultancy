import type { ComplianceServiceId } from "@/content/compliance/schema";
import { resourceGuidePaths } from "@/content/resources/guides";
import { clientProcess } from "@/content/site/client-process";
import type { ServiceCategoryId } from "@/content/services/categories";
import { pricingPage } from "@/content/services/price-presentation";

/**
 * Locale-agnostic paths. `replaceLocaleInPath` adds /en, /am, /ti, or /om.
 * Slugs stay in English so the four locales share one route tree.
 */

export const primaryNavigation = [
  { id: "home", label: "Home", path: "/" },
  { id: "services", label: "Services", path: "/services" },
  { id: "how-it-works", label: "How it works", path: "/how-it-works" },
  { id: "about", label: "About", path: "/about" },
  { id: "resources", label: "Resources", path: "/resources" },
  { id: "contact", label: "Contact", path: "/contact" },
] as const;

export type PrimaryNavId = (typeof primaryNavigation)[number]["id"];

export const serviceFamilies = [
  {
    id: "immigration-citizenship",
    label: "Immigration & Citizenship",
    path: "/services/immigration-citizenship",
    restriction:
      "Paid immigration and citizenship help stays unpublished until authorization is verified. This group is not an offer.",
  },
  {
    id: "government-forms",
    label: "Government & Forms",
    path: "/services/government-forms",
    restriction:
      "Form help and government-account help stay unpublished. This group is not an official government channel.",
  },
  {
    id: "career-employment",
    label: "Career & Employment",
    path: "/services/career-employment",
    restriction:
      "Resume and job-application help stay unpublished until the owner approves the scope.",
  },
  {
    id: "tax-business-administration",
    label: "Tax & Business Administration",
    path: "/services/tax-business-administration",
    restriction:
      "Bookkeeping, payroll, and personal tax stay unpublished until the owner approves the scope.",
  },
] as const satisfies readonly {
  id: ServiceCategoryId;
  label: string;
  path: string;
  restriction: string;
}[];

export type ServiceFamily = (typeof serviceFamilies)[number];

/**
 * Navigation grouping. `cra-services` is listed under Government & Forms here.
 * Its compliance record remains in the tax catalog so the publication hold still applies.
 */
export const servicePages = [
  {
    id: "permanent-residence",
    familyId: "immigration-citizenship",
    label: "Permanent residence applications",
    path: "/services/immigration-citizenship/permanent-residence",
  },
  {
    id: "citizenship",
    familyId: "immigration-citizenship",
    label: "Citizenship applications",
    path: "/services/immigration-citizenship/citizenship",
  },
  {
    id: "travel-documents",
    familyId: "immigration-citizenship",
    label: "Travel documents",
    path: "/services/immigration-citizenship/travel-documents",
  },
  {
    id: "form-completion",
    familyId: "government-forms",
    label: "Form completion",
    path: "/services/government-forms/form-completion",
  },
  {
    id: "cra-services",
    familyId: "government-forms",
    label: "CRA-related administrative support",
    path: "/services/government-forms/cra-services",
  },
  {
    id: "service-canada",
    familyId: "government-forms",
    label: "Service Canada-related administrative support",
    path: "/services/government-forms/service-canada",
  },
  {
    id: "resume-writing",
    familyId: "career-employment",
    label: "Resume writing",
    path: "/services/career-employment/resume-writing",
  },
  {
    id: "job-applications",
    familyId: "career-employment",
    label: "Job application assistance",
    path: "/services/career-employment/job-applications",
  },
  {
    id: "bookkeeping",
    familyId: "tax-business-administration",
    label: "Bookkeeping",
    path: "/services/tax-business-administration/bookkeeping",
  },
  {
    id: "payroll",
    familyId: "tax-business-administration",
    label: "Payroll",
    path: "/services/tax-business-administration/payroll",
  },
  {
    id: "personal-tax",
    familyId: "tax-business-administration",
    label: "Personal tax",
    path: "/services/tax-business-administration/personal-tax",
  },
] as const satisfies readonly {
  id: ComplianceServiceId;
  familyId: ServiceCategoryId;
  label: string;
  path: string;
}[];

export type ServicePage = (typeof servicePages)[number];

export const staticPages = [
  {
    id: "how-it-works",
    label: "How it works",
    path: "/how-it-works",
    message: clientProcess.lede,
  },
  {
    id: "pricing",
    label: pricingPage.title,
    path: "/pricing",
    message: pricingPage.lede,
  },
  {
    id: "about",
    label: "About",
    path: "/about",
    message:
      "A founder profile, history, and public biography have not been approved. This page does not add them.",
  },
  {
    id: "resources",
    label: "Resources",
    path: "/resources",
    message:
      "Guides stay unpublished until a named reviewer approves them. The questions further down describe this website while it is being built.",
  },
  {
    id: "contact",
    label: "Contact",
    path: "/contact",
    message:
      "This page has a general inquiry form. It does not publish a business email, phone number, or address, and it does not book a consultation.",
  },
] as const;

export function getServiceFamily(familyId: string): ServiceFamily | undefined {
  return serviceFamilies.find((family) => family.id === familyId);
}

export function getServicePage(familyId: string, serviceId: string): ServicePage | undefined {
  return servicePages.find((page) => page.familyId === familyId && page.id === serviceId);
}

export function servicesInFamily(familyId: ServiceCategoryId): ServicePage[] {
  return servicePages.filter((page) => page.familyId === familyId);
}

export function allPublicPaths(): string[] {
  return [
    ...primaryNavigation.map((item) => item.path),
    ...serviceFamilies.map((family) => family.path),
    ...servicePages.map((page) => page.path),
    "/pricing",
    ...resourceGuidePaths(),
    "/development",
    "/development/design-system",
  ];
}
