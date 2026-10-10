import { businessProfile } from "@/content/business/profile";
import { scaffoldCopy } from "@/content/site/scaffold-copy";
import { previewCopy } from "@/content/translations/preview";

/**
 * Homepage sentences that are allowed on the development preview.
 * Outcome headlines, fees, and consultation promises stay in the gaps document.
 */
export const homePage = {
  title: businessProfile.publicName,
  description: previewCopy.description,
  eyebrow: previewCopy.previewLabel,
  heroLede: `${businessProfile.positioning.text} This sentence is a development draft. It is not an approved public claim. ${previewCopy.statusBody}`,
  contactLabel: "Contact",
  contactPath: "/contact",
  servicesLabel: scaffoldCopy.servicesLink.label,
  servicesPath: scaffoldCopy.servicesLink.path,
  trustTitle: "Language and trust",
  trustIntro: previewCopy.languagesNote,
  credentialLabel: "Credentials",
  credentialValue: "No credential is approved for publication.",
  governmentLabel: "Government relationship",
  governmentValue:
    "No statement about a government relationship has been approved. This page does not present the business as a government channel.",
  servicesTitle: "Services",
  servicesIntro: `${scaffoldCopy.servicesMessage} ${previewCopy.publishedServicesEmpty}`,
  closedStatus: "Not approved",
  howTitle: "How it works",
  howIntro:
    "The site has a service map so you can see how the work is grouped. Nothing on that map can be requested yet.",
  aboutTitle: "About",
  aboutDraftLabel: "Draft positioning",
  aboutDraftNote: "This sentence is a development draft. It is not an approved public claim.",
  aboutFounder:
    "No founder name, photograph, or history is approved. This page does not add a founder story.",
  photoTitle: "Photograph",
  photoBody: "A photograph appears in this space only after the owner supplies one.",
  supportListLead:
    "These consultation languages are approved for publication. Website language names stay separate from this list.",
  evidenceTitle: "Client evidence",
  evidenceEmpty: "No client statement or qualification is approved for publication.",
  supportTitle: "Language support",
  supportBody:
    "The language names above are planned website languages. They are not languages confirmed for a consultation. No consultation language has been confirmed. Amharic, Tigrinya, and Afaan Oromoo routes show this English copy until an approved translation exists.",
  faqTitle: "Questions",
  faqEmpty:
    "An approved question-and-answer policy does not exist yet. The Resources page lists preview answers about this site.",
  ctaTitle: "Contact",
  ctaText:
    "No public email, phone number, or address has been approved. The Contact page has a general inquiry form. It does not book a consultation.",
} as const;
