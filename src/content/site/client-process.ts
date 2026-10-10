/**
 * The client sequence this website is prepared to explain.
 * None of the stages is an open service, a fee, or a government outcome.
 */
export const clientProcess = {
  lede: "No client service can be requested from this site. The six stages below are the sequence this page is prepared to explain. They are not a promise that any stage is open.",
  differs:
    "Actual stages may differ by service. When a service is approved, its page will say how. No service is approved, so no difference is published.",
  noOutcome: "This page does not state a government outcome or a processing time.",
  mapTitle: "Reading the service map",
  mapIntro: "These steps are about using this website. They do not start client work.",
  relatedTitle: "Pricing and questions",
  relatedBody: "Fee records and the preview answers live on their own pages. Neither page opens a file.",
  steps: [
    {
      title: "Initial inquiry",
      detail:
        "The contact page has a general inquiry form. No public email, phone, or address is approved. The form does not start a consultation.",
      href: "/contact",
      linkLabel: "Contact",
    },
    {
      title: "Service suitability and scope review",
      detail:
        "No service is approved for publication. A suitability or scope review cannot begin from this site.",
      href: "/services",
      linkLabel: "Services",
    },
    {
      title: "Confirmation of fees and agreement",
      detail:
        "No fee and no agreement text are approved for publication. The pricing page does not show an amount.",
      href: "/pricing",
      linkLabel: "Pricing",
    },
    {
      title: "Appropriate information collection",
      detail:
        "Do not send documents or personal history through this site. No list of required information is approved.",
    },
    {
      title: "Service delivery",
      detail:
        "No service can be delivered from this preview. This stage does not describe a government outcome.",
    },
    {
      title: "Completion and next steps",
      detail: "No completion step or follow-up is approved for publication.",
      href: "/resources",
      linkLabel: "Questions",
    },
  ],
} as const;
