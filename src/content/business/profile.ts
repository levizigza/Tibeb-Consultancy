import { identity } from "@/content/business/identity";
import { contactChannels } from "@/content/business/contact";

function channelValue(kind: (typeof contactChannels)[number]["kind"]) {
  return contactChannels.find((channel) => channel.kind === kind)?.value ?? null;
}

/**
 * Development-shell view of identity. Public pages that need an established
 * claim must use `getPublicIdentityClaims` instead of these raw values.
 */
export const businessProfile = {
  publicName: identity.publicName.value ?? "TIBEB Consultancy",
  legalName: identity.legalName.value,
  contact: {
    email: channelValue("email"),
    phone: channelValue("phone"),
    address: channelValue("address"),
  },
  positioning: {
    status: identity.positioning.publicationStatus,
    showInDevelopmentPreview: identity.positioning.showInDevelopmentPreview,
    text: identity.positioning.value ?? "",
  },
};
