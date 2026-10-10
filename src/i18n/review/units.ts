import { resourceGuide } from "@/content/resources/guides";
import {
  allPublicPaths,
  primaryNavigation,
  serviceFamilies,
  servicePages,
  staticPages,
} from "@/content/site/information-architecture";
import { englishChrome } from "@/i18n/messages/catalog";
import {
  type ContentUnit,
  type HighStakesTopic,
} from "@/i18n/review/schema";

/** Bump a unit when its approved English source changes in a way a translator must revisit. */
export const sourceContentVersion = "2026-10-10";

/**
 * Inquiry errors are stored for translation tracking.
 * The contact form renders the English development copy until a translation is approved.
 */
export const inquiryErrorSource = {
  name: "Enter your full name.",
  email: "Enter a valid email address.",
  phone: "Enter a phone number you can answer.",
  privacy: "Confirm the privacy acknowledgement.",
  sensitive:
    "Remove government identifiers, account passwords, passport details, tax returns, bank statements, and payment card numbers. This form cannot accept them.",
} as const;

export function topicsForPath(path: string): HighStakesTopic[] {
  if (path === "/pricing") return ["pricing", "payment"];
  if (path === "/how-it-works") return ["service-agreement"];
  if (path === "/resources") return ["privacy-consent"];
  if (path === "/resources/tax-appointment-documents" || path === "/resources/small-business-bookkeeping") {
    return ["tax"];
  }
  if (path === "/resources/official-government-forms") return ["government-authorization"];
  if (path.startsWith("/services/immigration-citizenship")) return ["immigration-citizenship"];
  if (path === "/services/government-forms/cra-services") {
    return ["government-authorization", "tax"];
  }
  if (path.startsWith("/services/government-forms")) return ["government-authorization"];
  if (path.startsWith("/services/tax-business-administration")) return ["tax"];
  return [];
}

function labelForPath(path: string): string {
  const nav = primaryNavigation.find((item) => item.path === path);
  if (nav) return nav.label;
  const page = staticPages.find((item) => item.path === path);
  if (page) return page.label;
  const family = serviceFamilies.find((item) => item.path === path);
  if (family) return family.label;
  const service = servicePages.find((item) => item.path === path);
  if (service) return service.label;
  if (path === "/development") return "Development status";
  if (path === "/development/design-system") return "Design system preview";
  const guideId = path.startsWith("/resources/") ? path.slice("/resources/".length) : "";
  const guide = guideId ? resourceGuide(guideId) : undefined;
  if (guide) return guide.title;
  return path;
}

function pageUnits(): ContentUnit[] {
  return [...new Set(allPublicPaths())]
    .sort()
    .map((path) => ({
      id: `page:${path}`,
      path,
      surface: "page" as const,
      topics: topicsForPath(path),
      label: labelForPath(path),
      currentVersion: sourceContentVersion,
      sourceText: null,
    }));
}

const chromeUnits: readonly ContentUnit[] = [
  {
    id: "chrome:navigation",
    path: "/",
    surface: "navigation",
    topics: [],
    label: "Navigation labels",
    currentVersion: sourceContentVersion,
    sourceText: primaryNavigation.map((item) => item.label).join(", "),
  },
  {
    id: "chrome:buttons",
    path: "/",
    surface: "button",
    topics: [],
    label: "Buttons",
    currentVersion: sourceContentVersion,
    sourceText: [englishChrome.menu, englishChrome.closeMenu, englishChrome.languages, englishChrome.serviceGroups, englishChrome.inquiry.submit].join(", "),
  },
  {
    id: "chrome:headings",
    path: "/",
    surface: "heading",
    topics: [],
    label: "Shell headings and skip link",
    currentVersion: sourceContentVersion,
    sourceText: [englishChrome.skip, englishChrome.pages, englishChrome.serviceGroups].join(", "),
  },
  {
    id: "chrome:forms",
    path: "/contact",
    surface: "form",
    topics: [],
    label: "Inquiry labels",
    currentVersion: sourceContentVersion,
    sourceText: "Full name, Email address, Phone number, Preferred contact method, Preferred language, Service group, Inquiry",
  },
  {
    id: "chrome:errors",
    path: "/contact",
    surface: "error",
    topics: [],
    label: "Inquiry errors",
    currentVersion: sourceContentVersion,
    sourceText: [inquiryErrorSource.name, inquiryErrorSource.email, inquiryErrorSource.phone, inquiryErrorSource.privacy].join(" "),
  },
];

export const contentUnits: readonly ContentUnit[] = [...pageUnits(), ...chromeUnits];

export function unitById(id: string): ContentUnit | undefined {
  return contentUnits.find((unit) => unit.id === id);
}

export function unitsForPath(path: string): ContentUnit[] {
  return contentUnits.filter((unit) => {
    if (unit.surface === "page") return unit.path === path;
    if (unit.surface === "form" || unit.surface === "error") return path === "/contact";
    return true;
  });
}
