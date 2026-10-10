export const developmentPage = {
  title: "Development status",
  summary:
    "This screen is for people building the website. It is not a client service page.",
  repositoryNote:
    "The documents below live in the project repository. They are not published as public marketing pages.",
  catalogNote:
    "The service catalog is internal. Nothing in it is approved for the public site.",
  designSystemLabel: "Design system preview",
  designSystemPath: "/development/design-system",
  docs: [
    {
      path: "README.md",
      purpose: "Install the project and run local quality checks.",
    },
    {
      path: "AGENTS.md",
      purpose: "Engineering and publication standards for every change.",
    },
    {
      path: "docs/PROJECT_ARCHITECTURE.md",
      purpose: "How the application is organized.",
    },
    {
      path: "docs/adr/0001-content-locale-and-publication.md",
      purpose: "Why this architecture was chosen, and what was rejected.",
    },
    {
      path: "docs/IMPLEMENTATION_ROADMAP.md",
      purpose: "The next implementation steps.",
    },
    {
      path: "docs/BUSINESS_INFORMATION_REQUIRED.md",
      purpose: "Facts that must be confirmed before public copy is written.",
    },
    {
      path: "docs/CONTENT_APPROVAL_WORKFLOW.md",
      purpose: "How a stored fact becomes an established public claim.",
    },
    {
      path: "docs/SERVICE_COMPLIANCE_MATRIX.md",
      purpose: "Internal review before any proposed paid work can be booked.",
    },
    {
      path: "docs/BRAND_STRATEGY.md",
      purpose: "Clear ground direction. Logo, name meaning, and founder facts are still open.",
    },
    {
      path: "docs/INFORMATION_ARCHITECTURE.md",
      purpose: "Sitemap, journeys, and route names.",
    },
    {
      path: "docs/DESIGN_SYSTEM.md",
      purpose: "Tokens, type scale, spacing, and component rules.",
    },
    {
      path: "docs/VISUAL_RHYTHM.md",
      purpose: "Section spacing, navigation, and page rhythm.",
    },
    {
      path: "docs/HOMEPAGE_CONTENT_GAPS.md",
      purpose: "Facts the homepage still needs from the owner.",
    },
    {
      path: "docs/TRANSLATION_REVIEW.md",
      purpose: "How a locale translation is reviewed before it can replace English.",
    },
    {
      path: "docs/TRANSLATION_COVERAGE.md",
      purpose: "Which pages and shell strings still need a translation review.",
    },
    {
      path: "docs/INQUIRY_SECURITY.md",
      purpose: "How a general inquiry is checked and when it is not delivered.",
    },
    {
      path: "docs/SERVICE_FINDER.md",
      purpose: "How the service finder matches a question to a published page.",
    },
    {
      path: "docs/RESOURCE_CENTRE.md",
      purpose: "How a resource guide is held until a named reviewer approves it.",
    },
    {
      path: "docs/SEO.md",
      purpose: "How search metadata, the sitemap, and robots rules stay closed until launch.",
    },
    {
      path: "docs/QUALITY_AUDIT.md",
      purpose: "How the preview was checked for keyboard use, contrast, and page weight.",
    },
    {
      path: "docs/USABILITY_REVIEW.md",
      purpose: "How the preview was reviewed for task paths, layout, and a future session with real visitors.",
    },
    {
      path: "docs/MEASUREMENT.md",
      purpose: "How page visits are counted only after a privacy notice and consent exist.",
    },
    {
      path: "docs/LAUNCH_READINESS.md",
      purpose: "What the owner must confirm before the public site can open.",
    },
  ],
} as const;
