import { resourceGuide } from "@/content/resources/guides";
import { buildServicePageModel } from "@/content/services/page-model";
import {
  serviceFamilies,
  servicePages,
  staticPages,
} from "@/content/site/information-architecture";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { developmentPage } from "@/content/translations/development";
import { homePage } from "@/content/translations/home";

export type PageSearchFields = {
  title: string;
  description: string;
};

const designSystemDescription =
  "Interface components and visual states. The words are samples, not business claims.";

/**
 * One title and description for each public path.
 * The words describe the page that exists. They do not add a service offer.
 */
export function pageSearchFields(path: string): PageSearchFields | null {
  if (path === "/") {
    return { title: homePage.title, description: homePage.description };
  }
  if (path === "/services") {
    return { title: scaffoldCopy.servicesTitle, description: scaffoldCopy.servicesMessage };
  }
  if (path === "/development") {
    return { title: developmentPage.title, description: developmentPage.summary };
  }
  if (path === "/development/design-system") {
    return { title: "Design system", description: designSystemDescription };
  }

  const family = serviceFamilies.find((item) => item.path === path);
  if (family) return { title: family.label, description: family.restriction };

  const service = servicePages.find((item) => item.path === path);
  if (service) {
    const model = buildServicePageModel(service.familyId, service.id, "en");
    if (!model) return null;
    return { title: model.title, description: model.metaDescription };
  }

  if (path.startsWith("/resources/")) {
    const guide = resourceGuide(path.slice("/resources/".length));
    if (!guide) return null;
    return { title: guide.title, description: guide.summary };
  }

  const page = staticPages.find((item) => item.path === path);
  if (page) return { title: page.label, description: page.message };
  return null;
}
