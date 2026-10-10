export const experimentsEnabled = false;

/**
 * Parked comparisons. No variant copy is stored here, and none is assigned to a visitor.
 */
export const experimentBacklog = [
  {
    id: "hero-headline",
    status: "parked",
    implemented: false,
    needs: "Two owner-approved headlines and a stable count of homepage visits.",
  },
  {
    id: "service-card-layout",
    status: "parked",
    implemented: false,
    needs: "Enough service-page visits to compare layouts, and a layout that still shows the publication status.",
  },
  {
    id: "primary-cta-wording",
    status: "parked",
    implemented: false,
    needs: "Owner-approved labels for the Contact control. A label must not say a consultation is booked.",
  },
] as const;

export type ExperimentId = (typeof experimentBacklog)[number]["id"];

export function assignExperiment(id: ExperimentId): null {
  const item = experimentBacklog.find((entry) => entry.id === id);
  if (item?.implemented) return null;
  return null;
}
