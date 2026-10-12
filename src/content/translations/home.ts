import { businessProfile } from "@/content/business/profile";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { previewCopy } from "@/content/translations/preview";

/**
 * Public homepage sentences.
 * Fees, credentials, and a founder profile stay off the page until the business supplies them.
 */
export const homePage = {
  title: businessProfile.publicName,
  description: previewCopy.description,
  heroLede: `${businessProfile.positioning.text} ${previewCopy.statusBody}`,
  contactLabel: "Contact",
  contactPath: "/contact",
  servicesLabel: scaffoldCopy.servicesLink.label,
  servicesPath: scaffoldCopy.servicesLink.path,
  trustTitle: "Languages",
  trustIntro: previewCopy.languagesNote,
  servicesTitle: "Services",
  servicesIntro: `${scaffoldCopy.servicesMessage} ${previewCopy.publishedServicesEmpty}`,
  howTitle: "How it works",
  howIntro: "A short path from the first note to a clear scope. Nothing begins before that.",
  aboutTitle: "About",
  aboutBody: businessProfile.positioning.text,
  aboutIndependent: "TIBEB Consultancy is an independent firm. It is not part of the Canadian government.",
  faqTitle: "Questions",
  faqEmpty: "Common questions are answered on the Resources page.",
  ctaTitle: "Contact",
  ctaText:
    "Send a general question. Include a name and a way to reply. Do not attach an identity document, a tax paper, or an immigration file.",
} as const;
