export const scaffoldCopy = {
  servicesTitle: "Services",
  servicesMessage:
    "These four groups are a map. They are not a list of work you can buy. The Services page includes a service finder. It matches a general question to a published service and does not collect personal details.",
  closedHeading: "Publication status",
  closedBody:
    "Not approved for publication. This page cannot take a request, and it does not mean the business is authorized to do this work.",
  gateOpenBody:
    "The publication gate is open for this record. A request flow has not been built.",
  familyMessage:
    "The items below are proposed names inside this group. Each one is closed.",
  howItWorksSteps: [
    "Open Services and choose a group.",
    "Read the publication status on the page. Closed means the business is not offering that work.",
    "Do not send documents or personal history through this site.",
    "The contact page has a general inquiry form. It does not start a file.",
  ],
  primaryCta: { label: "How it works", path: "/how-it-works" },
  secondaryCta: { label: "Contact", path: "/contact" },
  servicesLink: { label: "Services", path: "/services" },
} as const;
