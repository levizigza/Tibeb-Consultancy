import { z } from "zod";
import { claimMetaSchema, draftClaim } from "@/content/model/claim";

export const privacyNoticeSchema = claimMetaSchema.extend({
  controllerName: z.string().nullable(),
  privacyContact: z.string().nullable(),
  purposes: z.array(z.string()),
  consentStatement: z.string().nullable(),
});

export type PrivacyNotice = z.infer<typeof privacyNoticeSchema>;

/** No privacy notice or consent wording has been supplied. */
export const privacyNotice: PrivacyNotice = {
  id: "privacy-notice",
  controllerName: null,
  privacyContact: null,
  purposes: [],
  consentStatement: null,
  ...draftClaim,
  authorizationStatus: "pending",
};
