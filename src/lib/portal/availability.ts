export type PortalStatus = "not-configured" | "configured";

/**
 * Seam for a future authenticated client portal.
 * No accounts, sessions, or portal routes exist.
 */
export const portalBoundary: {
  status: PortalStatus;
  pathSegment: "portal";
} = {
  status: "not-configured",
  pathSegment: "portal",
};

export function isPortalEnabled(): boolean {
  return portalBoundary.status === "configured";
}
