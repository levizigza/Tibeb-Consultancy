import { privacyNotice } from "@/content/business/privacy";
import { hasText, isEstablishedPublicClaim } from "@/content/model/claim";

/**
 * Owner switch for a future aggregate counter.
 * It stays false. Turning it on does nothing until the privacy notice is an established public claim.
 */
export const measurementOwnerSwitch = false;

/** The privacy notice does not yet name a controller, a contact, a purpose, or consent wording. */
export function privacyNoticeAllowsMeasurement(): boolean {
  const purposes = privacyNotice.purposes.filter((purpose) => purpose.trim().length > 0);
  return isEstablishedPublicClaim({
    verification: privacyNotice.verification,
    publicationStatus: privacyNotice.publicationStatus,
    authorizationStatus: privacyNotice.authorizationStatus,
    requiresRegulatoryReview: privacyNotice.requiresRegulatoryReview,
    lastReviewed: privacyNotice.lastReviewed,
    valuePresent:
      hasText(privacyNotice.controllerName) &&
      hasText(privacyNotice.privacyContact) &&
      hasText(privacyNotice.consentStatement) &&
      purposes.length > 0,
  });
}

export function measurementCollectionEnabled(): boolean {
  return measurementOwnerSwitch && privacyNoticeAllowsMeasurement();
}
