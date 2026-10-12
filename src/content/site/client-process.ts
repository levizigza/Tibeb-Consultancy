/**
 * The client sequence this website explains.
 * None of the stages is a fee, a processing time, or a government outcome.
 */
export const clientProcess = {
  lede: "You write. We say whether we can help, and what the work would involve. Nothing starts until that is clear.",
  differs:
    "Actual stages may differ by service. When a matter is accepted, its scope is confirmed with you first.",
  noOutcome: "This page does not state a government outcome or a processing time.",
  mapTitle: "Using this website",
  mapIntro: "These steps are about finding the right page and writing a clear question.",
  relatedTitle: "Fees and questions",
  relatedBody: "Fees and common questions each have their own page.",
  steps: [
    {
      title: "Initial inquiry",
      detail:
        "The contact page is for a general question. Include a name and a way to reply.",
      href: "/contact",
      linkLabel: "Contact",
    },
    {
      title: "Service suitability and scope review",
      detail: "We read the question and say whether the work fits, and what it would involve.",
      href: "/services",
      linkLabel: "Services",
    },
    {
      title: "Confirmation of fees and agreement",
      detail: "Any fee is discussed with you before work begins. This site does not list an amount.",
      href: "/pricing",
      linkLabel: "Pricing",
    },
    {
      title: "Appropriate information collection",
      detail: "Do not send identity documents, tax papers, or immigration files through this site.",
    },
    {
      title: "Service delivery",
      detail: "Work begins only after the scope is clear. This page does not describe a government outcome.",
    },
    {
      title: "Completion and next steps",
      detail: "When the work is finished, we tell you what, if anything, comes next.",
      href: "/resources",
      linkLabel: "Questions",
    },
  ],
} as const;
