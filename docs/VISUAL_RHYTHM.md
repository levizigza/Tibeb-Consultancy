# Visual rhythm

The shell uses the Clear ground tokens in `docs/DESIGN_SYSTEM.md` and the routes in `docs/INFORMATION_ARCHITECTURE.md`. Sections alternate in density. The same card grid is not repeated down a page.

No founder portrait or client quotation is invented. Decorative stills are licensed material photographs, and the page says they are not the business. A split section without a supplied image shows the sentence "No photograph has been supplied."

Motion is mixed with stillness. The title, the gold rule, cards, step numbers, and the closing button move once as they enter. The illustrative stills drift slowly. Reading sections, the header, and the footer stay still. `prefers-reduced-motion: reduce` keeps the whole page still.

## Breakpoints

| Width | Navigation | Section layout |
| --- | --- | --- |
| Under `lg` (64rem) | Menu button opens the page list and the four service groups. Languages is a separate disclosure. | One column. Hero and ending sections keep their large padding. |
| `lg` and up | The page list is a row. Services stays a link, and Service groups opens the four real group pages. | Service cards sit in two columns. The split section sits in two columns. |

Page content stays inside the 1200px container. Reading text stays inside 48rem. The same pages also stay inside a 240px-wide screen, a phone in landscape, a tablet, and a wide monitor. Side padding uses a small share of the screen so it cannot consume a narrow display. Open menus stay within the screen and scroll if the display is short. Text at twice the normal size wraps inside the page instead of widening it.

## Spacing by section

| Section | Mobile | From `md` (48rem) | From `lg` |
| --- | --- | --- | --- |
| Hero | 64px | 96px | 128px |
| Quiet editorial | 32px | 48px | 48px |
| Split | 48px | 64px | 64px |
| Service grid | 48px | 64px | 64px |
| Process | 48px | 64px | 64px |
| Proof | 24px | 32px | 32px |
| Questions | 48px | 64px | 64px |
| Final call to action | 64px | 96px | 96px |
| Internal page header | 48px above, 32px below | 64px above | 64px above |

Section titles use the heading size. Cards, steps, and prices use the small heading. Quiet sections keep the shorter padding, so the page still alternates in density.

## Section types

| Type | Role on the page | What it does not do |
| --- | --- | --- |
| Hero | One spacious opening, with the page title and at most two real links | It is not used again under the first screen |
| Quiet editorial | A short reading block | No cards |
| Split | Text beside a photograph, or beside the empty photograph notice | No stock portrait and no invented person |
| Service grid | Two-column cards from the medium breakpoint, each with a status in words | No purchase control. Child names are a text list inside the card, not a second grid |
| Process | Numbered steps | The number is text |
| Proof | A compact definition list | No quotation, staff portrait, or credential that has not been approved |
| Questions | An accordion, or one sentence when nothing is approved | Sample questions stay on the design-system preview |
| Final call to action | One link to a page that exists | Contact is the contact page. It does not submit a message |

## Shell

- The brand area is the public name.
- Desktop navigation is the primary list. Service groups and Languages are disclosures with `aria-expanded` and `aria-controls`. Arrow keys move inside an open menu. Escape closes it.
- Below `lg`, Menu opens the same destinations. The closed panel uses the `hidden` attribute, so those links are not in the tab order.
- Breadcrumbs appear under the translation notice on every page except home. The current page is text, not a link.
- The footer repeats the page list, the four service groups, the contact page, and the development notes.
- Internal pages share one page header: title, then a lede, inside the reading measure.

Unfinished work is not given a button that implies a file can be started. Group and service pages say they are not approved.
