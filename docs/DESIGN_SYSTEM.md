# Design system

This is the Clear ground interface kit. It uses the colour roles from `docs/BRAND_STRATEGY.md`. Logo, name meaning, Ge'ez spelling, founder facts, and photographs stay out until those checklist rows are approved.

Tokens live in `src/app/globals.css`. Components live in `src/components/ui`. The development preview is `/development/design-system`.

## Colour

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--background` | `#F7F4EE` ivory | `#17232D` ink | Page |
| `--foreground` | `#17232D` | `#F7F4EE` | Text. 14.55:1 on the page |
| `--surface` | `#E7E3DB` stone | `#24343C` | Panels. Ink on stone is 12.48:1 |
| `--muted` | `#3E4C57` | `#C8C2B8` | Secondary text. 8.05:1 on ivory, 9.02:1 on ink |
| `--accent` | `#17675E` teal | `#17675E` | Button fill. Ivory label is 6.10:1 |
| `--accent-foreground` | `#F7F4EE` | `#F7F4EE` | Text on a teal control |
| `--link` | `#17675E` | `#F7F4EE` | Link text. Teal on ink is 2.39:1, so dark-scheme links are ivory and underlined |
| `--focus` | `#17232D` | `#F7F4EE` | 2px ring, 3px offset |
| `--line` | `#857E76` | `#857E76` | Borders. 3.65:1 on ivory and 3.99:1 on ink |
| `--notice-surface` | `#E7E3DB` | `#24343C` | Status panels, with ink or ivory text and a border |
| `--ornament` | `#B6883F` gold | `#B6883F` | Swatch only |

Gold on ivory is 2.91:1. It is not a text colour, a link colour, a focus colour, or the only border. The strategy suggested `#C8C2B8` for lines. That pair is 1.61:1 on ivory, so the line token is `#857E76`.

A dark panel is only 1.24:1 against the ink page, so panels keep a line border.

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

The title and headings use `clamp`, so the scale grows with the viewport without a second font. The wordmark is the public name: the first word at weight 600 and `0.04em` tracking, the rest at weight 500. No Ge'ez lockup.

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
| Radius sm | 4px |
| Radius md | 8px |
| Radius lg | 12px |
| Rest shadow | 1px blur, 6% ink |
| Raised shadow | 8px offset, 16px blur, 8% ink |

Motion is 150ms and 250ms, with the standard ease. `prefers-reduced-motion: reduce` sets both durations to 0ms and stops transitions and animations. The question panel fade runs only when motion is allowed. Public questions are written in the page, so the answer is available without opening a control.

## Components

| Component | Variants and states |
| --- | --- |
| Button | Primary (teal, ivory label), secondary (ivory, line border), quiet (underlined link colour). Sizes `sm` and `md`, at least 40px and 44px tall. Disabled uses stone and muted text, which stay above 4.5:1. |
| Link | Underlined. Light scheme is teal. Dark scheme is ivory. |
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
- Focus is a 2px ink ring on ivory, offset 3px, including on teal buttons. An ivory ring offset onto an ivory page would disappear, so the ring uses ink wherever the page is ivory. In the dark scheme the ring is ivory on ink.
- Status, steps, and errors include text.
- Controls are keyboard reachable and at least 44px on the medium button and navigation links.
- Ethiopic text sets `lang` and the Ethiopic font on that element only.
- The preview does not publish a client quotation, a founder, or a service offer.

Section spacing, the shell, and the alternating page rhythm are in `docs/VISUAL_RHYTHM.md`.

## Preview

`/{locale}/development/design-system` shows the states. It is linked from the development page and is not in the primary navigation. Sample sentences on that page are interface fixtures.
