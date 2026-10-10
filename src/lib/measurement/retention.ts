/** Proposed aggregate window. It is not an approved retention period, and nothing is stored today. */
export const measurementRetention = {
  rawEventsStored: false,
  approvedAggregateDays: null,
  proposedAggregateDays: 90,
  storesIp: false,
  storesUserAgent: false,
  usesCookie: false,
  usesThirdPartyScript: false,
} as const;
