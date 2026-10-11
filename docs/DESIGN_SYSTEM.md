# Design system

This is the Clear ground interface kit. It uses the colour roles from `docs/BRAND_STRATEGY.md`. The Latin wordmark is in the header. Name meaning, Ge'ez spelling, founder facts, and photographs stay out until those checklist rows are approved.

Tokens live in `src/app/globals.css`. Components live in `src/components/ui`. The development preview is `/development/design-system`.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#F3F1EB` ivory | `#0B1220` | Page |
| `--foreground` | `#101C2E` navy | `#F3F1EB` | Text. About 15.2:1 on ivory, 16.6:1 on the dark page |
| `--surface` | `#E4E7EE` slate | `#162033` | Panels |
| `--muted` | `#3A4960` | `#D2D6DE` | Secondary text. About 8.1:1 on ivory and 12.9:1 on the dark page |
| `--accent` | `#15263C` navy | `#F3F1EB` | Button fill. The label is ivory on navy, or navy on ivory in the dark scheme |
| `--accent-foreground` | `#F3F1EB` | `#101C2E` | Text on the primary control. About 13.5:1 in the light scheme |
| `--link` | `#15263C` | `#F3F1EB` | Link text, always underlined |
| `--focus` | `#101C2E` | `#F3F1EB` | 2px ring, 3px offset |
| `--line` | `#5A6A82` | `#A7B0C2` | Borders. About 4.9:1 on ivory |
| `--notice-surface` | `#E4E7EE` | `#162033` | Status panels, with navy or ivory text and a border |
| `--ornament` | `#C4A15A` gold | `#D4B56A` | Hairline beside the navy rule |

Gold on ivory is about 2.2:1. It is not a text colour, a link colour, a focus colour, or the only border. On navy it is about 7:1, so the diamond-chain band, the corner brackets, and the gold foot of the primary control sit on that navy. Navy and gold are complementary: the cool field does the corporate work, and the metal is the royal accent. In the dark scheme the control is ivory, because a navy button on the dark page would fall under the 3:1 boundary rule.

A dark panel stays close to the dark page, so panels keep a line border.

## Type

Latin text, including Afaan Oromoo, uses Noto Sans through `--font-noto-sans`. Amharic and Tigrinya use Noto Sans Ethiopic on the element that contains that text. The Ethiopic font is not stacked on `body`, because the Latin fallback covers the whole Unicode range and would hide Ge'ez glyphs.

There is no display face.

| Style | Size | Line height |
| --- | --- | --- |
| Meta | 0.875rem | 1.4 |
| Body | 1rem | 1.75 |
| Lead | 1.125rem | 1.7 |
| Small heading | 1.125rem to 1.25rem | 1.35 |
| Heading | 1.375rem to 1.75rem | 1.25 |
| Title | 1.75rem to 2.25rem | 1.15 |
| Display | 2.25rem to 4.25rem | 1.08 |

The title and headings use `clamp`, so the scale grows with the viewport without a second font. Display is the homepage title only. The wordmark is outlined Noto Sans: TIBEB, a gold hairline, and CONSULTANCY on one measure. No Ge'ez lockup.

Reading text stays inside `max-w-content` (48rem).

## Spacing

The scale is 4px and 8px steps.

| Token | Size |
| --- | --- |
| `2xs` | 4px |
| `xs` | 8px |
| `sm` | 12px |
| `md` / gutter | 16px |
| `lg` / gutter-lg | 24px |
| `xl` | 32px |
| `2xl` | 48px |
| `3xl` | 64px |

Page padding is the gutter: 16px, then 24px from the `sm` breakpoint (40rem).

## Grid

| Rule | Value |
| --- | --- |
| Page container | `max-w-page`, 75rem (1200px), centered |
| Reading measure | `max-w-content`, 48rem, inside the page container |
| Content grid | 1 column, 2 from `md` (48rem), 3 from `lg` (64rem), 24px gap |
| Editorial split | 1 column, 2 from `md`, 32px gap |
| Breakpoints | `sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem |

Layout is written for a narrow viewport first.

## Shape, shadow, motion

| Token | Value |
| --- | --- |
| Radius sm | 2px |
| Radius md | 4px |
| Radius lg | 4px |
| Rest shadow | 1px blur, 6% ink |
| Raised shadow | 8px offset, 16px blur, 8% ink |

Motion is 150ms and 250ms, with the standard ease. `prefers-reduced-motion: reduce` sets both durations to 0ms and stops transitions and animations. The question panel fade runs only when motion is allowed. Public questions are written in the page, so the answer is available without opening a control.

The first visit in a session opens on a navy curtain. The wordmark settles, the gold line draws, and the curtain rises. Skip and Escape close it. A return visit in the same session, and anyone who asks for reduced motion, sees the page directly.

After that, motion and stillness alternate. A small document mark draws beside section titles: the sheet, the writing lines, then the gold seal. Service cards, process steps, questions, form fields, and each section’s copy slide in once. Illustrative stills drift slowly inside a navy frame. The header and the footer stay still. Reduced motion leaves every one of those still, with the document mark already complete.

Gold sits on navy as a repeating diamond chain: under the header, over the footer, across each service card, under page titles, and along the closing panel. Photograph frames use gold corner brackets on the same navy. On ivory alone the metal is too faint to see. The stills are Unsplash photographs of paperwork and the subjects on the service map: a pen on paper, travel, a blank application, a blank resume, and file folders. Each caption says the still is illustrative and not a picture of the business.

## Components

| Component | Variants and states |
| --- | --- |
| Button | Primary (navy, ivory label, gold foot), secondary (ivory, line border), quiet (underlined link colour). Sizes `sm` and `md`, at least 40px and 44px tall. Disabled uses slate and muted text, which stay above 4.5:1. |
| Link | Underlined. Light scheme is navy. Dark scheme is ivory. |
| Container | Page width or reading measure. |
| Section | Landmark labelled by its heading. |
| Heading | Levels 1 to 4. One `h1` on a page. |
| Card | Stone, line border, rest shadow. Raised uses the deeper shadow. |
| Badge | Always includes words. The surface is ivory with a line, not a colour-only dot. |
| Icon | 24px, 1.5px stroke, `currentColor`. Decorative icons are hidden from assistive technology. A named icon exposes `aria-label`. |
| Form field | Visible label, optional hint, optional error with `role="alert"`. The error also thickens the border to ink. |
| Divider | A line rule, not a gold rule. |
| Content grid | The column counts above. |
| Editorial split | Text, then a stone panel. |
| Process step | Ordered list. The step number is text inside a circle. |
| Testimonial | Quote and optional attribution. An ink bar marks the quote so the edge is not gold. |
| FAQ accordion | One question open at a time. The control is a button with `aria-expanded` and `aria-controls`. |

## Accessibility decisions

- Body text, secondary text, button labels, and field errors meet WCAG 2.2 AA.
- Focus is a 2px navy ring on ivory, offset 3px. In the dark scheme the ring is ivory. Gold is not the focus colour.
- Status, steps, and errors include text.
- Controls are keyboard reachable and at least 44px on the medium button and navigation links.
- Ethiopic text sets `lang` and the Ethiopic font on that element only.
- The preview does not publish a client quotation, a founder, or a service offer.

Section spacing, the shell, and the alternating page rhythm are in `docs/VISUAL_RHYTHM.md`.

## Preview

`/{locale}/development/design-system` shows the states. It is linked from the development page and is not in the primary navigation. Sample sentences on that page are interface fixtures.
