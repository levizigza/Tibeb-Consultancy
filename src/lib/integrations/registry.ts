export type IntegrationRecord = {
  id: string;
  status: "not-configured";
  purpose: string;
};

/**
 * External systems are registered here when a workflow needs one.
 * The list is empty on purpose. Do not add credentials before a system is chosen.
 */
export const integrations: readonly IntegrationRecord[] = [];
