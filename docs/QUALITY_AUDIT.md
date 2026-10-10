# Accessibility and performance audit

This is a review of the development preview. It is not an accessibility certification, and the timing numbers below are not field data from real visitors.

Targets used as goals: WCAG 2.2 AA, largest contentful paint within 2.5 seconds, interaction to next paint within 200 milliseconds, and cumulative layout shift within 0.1. A local check cannot promise those field results.

## What changed

Page content was held behind a “This page is loading.” line. The heading was in a hidden template until a script revealed it. That delayed the largest text, shifted the layout when the page appeared, and hid the page from anyone without JavaScript.

Each page now renders its content in the first HTML response. Public questions are in the page as headings and paragraphs, so they do not need a client accordion. The inquiry error summary is one live region, and a focus style stays visible when script moves focus to that summary or to a service-finder result. Reduced motion now stops transitions and animations, including ones whose duration is set by a utility class. The skip link is at least 44px tall. Noto Sans keeps a size-adjusted fallback and `font-display: swap`. Noto Sans Ethiopic is not preloaded.

## Before and after

Measured on the production homepage.

| Check | Before | After |
| --- | --- | --- |
| First visible page text | “This page is loading.” | The homepage heading, in the document body |
| Navigation | Streamed into a hidden slot after an empty header box | Links are in the first HTML |
| Narrow header at 320px | The language control extended the page to 335px | The header wraps. Scroll width matches the screen at 320, 390, 768, and 1280 |
| Public questions | Collapsed until a client control opened them | Nine questions are in the HTML |
| Inquiry errors | A summary alert plus an alert on every field | One assertive live region |
| Programmatic focus | `outline: none` on the error summary and finder result | A 2px focus ring |
| Reduced motion | Duration tokens only | Transitions and animations stopped as well |

A local Lighthouse run against `http://127.0.0.1:3001/en` is a lab check on this machine, not field data:

| Lab metric | Result | Goal |
| --- | --- | --- |
| Largest contentful paint | 3.7 s | 2.5 s |
| Cumulative layout shift | 0 | 0.1 |
| Total blocking time | 400 ms | Not the same measure as interaction to next paint |
| Server response | 30 ms | — |

The largest element was the homepage introduction. Layout shift in that lab run was 0. Interaction to next paint was not collected, because that score needs real visits. The 3.7 second paint time is from one headless run on this computer. It is not a promise about a public host.

No third-party script is loaded. There is no content photograph. The only image is the small SVG favicon. Unused JavaScript in that lab run was about 50 KB across two framework chunks.

## Accessibility review

Checked against WCAG 2.2 AA. Automated contrast tests cover text, muted text on panels, links, button labels, focus, and borders in both colour schemes. Gold remains ornament only.

| Area | Result |
| --- | --- |
| Semantic HTML | Header, main, footer, and navigation landmarks are present. One `h1` on each page template. Sections use `h2`, then `h3`. |
| Keyboard | Skip link, menu button, language button, form fields, finder choices, and resource filters are buttons or links. Escape closes an open menu and returns focus. |
| Focus | `:focus-visible` uses a 2px ink ring on ivory and an ivory ring in the dark scheme, offset 3px. |
| Contrast | Token pairs used for text and boundaries meet 4.5:1 for text and 3:1 for boundaries. |
| Forms | Visible labels, hints, and errors. The method choice is a fieldset. Radio and checkbox controls are 24px inside a 44px label. |
| Language | `html` and the locale region are `en` while the rendered copy is English. Amharic and Tigrinya names set `lang` and Noto Sans Ethiopic on that text. |
| Reflow and text size | Type uses `rem`. Controls use minimum height rather than a fixed height. Body text wraps. |
| Motion | The reduced-motion query stops animation and transition. |

## Manual checklist

- [ ] Tab from the skip link into main, then through the header, a form, and the footer.
- [ ] Open and close the menu and the language list with Enter, Arrow keys, and Escape.
- [ ] Submit an empty inquiry and confirm the summary receives a visible focus ring.
- [x] At 320px, 390px, 768px, and 1280px, the homepage scroll width matches the screen. Contact, Services, and Resources also match at 320px.
- [ ] Set the browser font size to 200% and confirm the heading and form remain usable.
- [ ] Turn on reduced motion and confirm the menu icon and panels do not animate.
- [ ] In a screen reader, confirm the page language is English and the Amharic language name is announced in Amharic.
- [x] On `/am`, `/ti`, and `/om` at 320px, one heading is present, the translation notice is visible, and the page does not scroll sideways.

The embedded browser did not move keyboard focus when Tab was pressed, so the skip-link, menu, and empty-inquiry checks still need a person at a keyboard.

## Unresolved

- Field largest-contentful-paint and interaction-to-next-paint scores do not exist yet. The local lab paint time was 3.7 seconds, above the 2.5 second goal. There is no public traffic to confirm either number.
- Lighthouse also reports relative canonical and hreflang URLs, and that the preview is `noindex`. Those stay until a public https origin and an approved launch exist.
- `html lang` stays `en`. That matches today’s English copy. When a full translation is approved, the document language has to follow that locale without making every page dynamic.
- The header menu on a narrow screen needs JavaScript to open. The same links are in the footer.
- The service finder and resource category filter are client controls. Their first state is in the HTML, and changing a filter needs hydration.
- Dark and light schemes follow the operating system. A manual contrast spot-check in both schemes is still worth doing before launch.
- No certification body has reviewed this site.
