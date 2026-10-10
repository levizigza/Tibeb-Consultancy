export const publicationStatuses = [
  "draft",
  "verified",
  "approved",
  "blocked",
  "retired",
] as const;

export type PublicationStatus = (typeof publicationStatuses)[number];

/** Whether a fact has been checked. This is not permission to publish. */
export const factualVerifications = ["unverified", "verified"] as const;

export type FactualVerification = (typeof factualVerifications)[number];

/**
 * Permission to publish a fact or offer a service.
 * `not-required` applies only when regulatory review is not required.
 */
export const authorizationStatuses = [
  "not-required",
  "pending",
  "granted",
  "denied",
] as const;

export type AuthorizationStatus = (typeof authorizationStatuses)[number];
