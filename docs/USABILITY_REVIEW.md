# Usability and visual review

This is a technical review of the development preview, plus a protocol for a later session with real visitors. No participant took part, so there are no task times, success rates, or confidence scores.

The preview still says client services are unavailable. A task succeeds here when a person can find the page that states the limit, not when they can buy the service.

## Technical checks

Checked in the running site at 320, 390, 768, 1280, and 1536 pixels wide, and in the automated path tests.

| Check | Result |
| --- | --- |
| Navigation | Primary links are Home, Services, How it works, About, Resources, and Contact. Service groups and Languages are separate controls. Footer repeats the same pages. |
| Interactive components | Finder choices, resource filters, the menu, and the language list are buttons. Escape is wired to close an open menu. |
| Forms | The inquiry form has visible labels, hints, a method fieldset, and one error summary. It does not book a consultation. |
| Responsive layout | Homepage scroll width matched the screen at 320, 390, and 768. At desktop settings of 1280 and 1536 the layout width was 1265 and 1521 because of the browser frame, and the page did not scroll sideways. Services and Contact also matched at 320. |
| Language switching | The language control and the homepage language list go to `/en`, `/am`, `/ti`, and `/om`. Untranslated locales show English and a notice. |
| Missing content | Fees, a founder, credentials, a government statement, and translations are absent on purpose and said so on the page. |
| Broken links | Service names, groups, and the pricing link from How it works point at routes that exist. Official resource links stay on the recorded government hosts. |
| Images | No content photograph is rendered. The empty frame says "No photograph has been supplied." |
| Accessibility | One `h1` on the homepage. Section titles are `h2`. Cards and steps are `h3`. Skip link, labels, and the inquiry live region remain as in the quality audit. This is not a certification. |
| Page consistency | Internal pages share the page header, the reading measure, and the closing contact link. |

### Task paths

| Task | Path that works today | What the person learns |
| --- | --- | --- |
| Find resume-writing assistance | Services, then Resume writing, or Career & Employment, then Resume writing | The page is reserved and not approved. The finder does not link to it, because no service page is published. |
| Find bookkeeping or payroll | Services, then Tax & Business Administration, then Bookkeeping or Payroll | Both names are listed and marked not approved. |
| Understand fees and limits | How it works links to Pricing. Resources answers "How are prices determined?" The homepage question block now links to Resources. | No amount is published. Each fee row says "Not approved." |
| Switch language | Languages, or a language name on the homepage | The address changes. The copy stays English, and the page says an approved translation is not available. |
| Submit a general inquiry | Contact, then the form | A completed valid form is checked. Delivery is off, so the page says the inquiry was not sent. |
| Find the founder and credentials | About, and the Credentials line on the homepage | No founder name, photograph, credential, or history is approved. |
| Government affiliation | The Government relationship line on the homepage, and the Resources question | No affiliation statement is approved. The site does not present the business as a government channel. |

## Visual consistency

| Topic | Finding |
| --- | --- |
| Typography | The page title uses the title size. Section titles now share the heading size. Cards, steps, prices, and the finder result use the small heading. Footer column labels stay at the meta size. |
| Section spacing | Hero, quiet, split, grid, process, proof, questions, and the closing link still use the spacing in `src/components/sections/rhythm.ts`. Quiet blocks keep the shorter padding. |
| Card alignment | Service cards are one column, then two from the `md` breakpoint. Status is text under the description, not colour alone. |
| Whitespace | Reading text stays in the 48rem measure. The empty photograph notice is a short panel, not a cropped picture. |
| Colour | Text, links, and borders use the existing tokens. Gold is not used for text. The faint `foreground/30` underline on service names was replaced with the shared link colour. |
| Image crop | A supplied photograph with alt text is framed at 3:2 and cropped with `object-cover`. None is supplied. |
| Line wrapping | Long service names and the language control wrap inside the header. Body text uses the page wrap rule. |
| Density | The homepage alternates a short editorial block with a larger section. Service names inside a card are a list, not a second grid. |

## Fixes applied

- The empty homepage question block links to Resources, where the fee and government answers already are.
- Resume writing, bookkeeping, payroll, and the other service names use the shared link style and a 44px minimum height.
- Section titles that were using the small heading size now use the heading size. Card and step titles stay small.
- Official source links and the footer documentation link meet the same 44px height.
- A future photograph is reserved at 3:2 so the crop does not depend on the file's own ratio.

## Human test protocol

Run this only with people who have agreed to the session. Do not collect a social insurance number, passport, tax return, immigration history, or a document. Do not tell a participant that a service, fee, founder, credential, or translation exists. Record what they do. Do not fill in a success rate before the session.

### Who to invite

Intended clients of a Canadian professional-services practice, including people who read English. When an Amharic, Tigrinya, or Afaan Oromoo translation is approved, repeat the session with a reader of that language and a moderator who can work in it. Until then, those locales show English, so a session in those languages would be testing the notice, not a translation.

Five to eight people per language is enough to see repeated confusion. That number is a plan, not a count of people already recruited.

### Setup

Use the participant's own phone, and one desktop width. Ask them to think aloud. Time each task from the moment the task is read to the moment they say they are done or they stop. Note the page they stop on, any wrong turn, and a confidence score they choose from 1 (not confident) to 5 (confident).

### Tasks

Read these as written. Do not hint at the menu.

1. Find where this site talks about help with a resume. Say whether that help is available.
2. Find where this site talks about bookkeeping or payroll. Say whether that help is available.
3. Find what this site says about fees, and what it says it will not do.
4. Switch the site from English to another language it lists. Say what changed.
5. Start a general inquiry and stop before you enter a real phone number, email address, or personal story. Say what the form asks for, and what it refuses.
6. Find who founded the business and which credentials are shown.
7. Say whether this business is part of the Canadian government, using only this site.

### What to record

| Measure | How |
| --- | --- |
| Task success | The participant reaches the page that states the limit, and their spoken answer matches that page. |
| Completion time | Seconds, per task, including time spent lost. |
| Confusion points | Quote the words they misread, and the control they expected. |
| Errors | Wrong page, a form field they could not identify, or a language they thought was fully translated. |
| Confidence | Their 1 to 5 score after each task. |
| Form usability | Whether they can name every required field, the error summary, and the fact that the form does not book a consultation. |

Task 5 stops before personal data. Do not submit a real inquiry during the session. A separate check of an empty submission can be done by the moderator on a test profile.

### Moderator reminders

- The finder will not open an unpublished service. That is expected.
- Pricing is not in the top menu. How it works and Resources lead to it.
- A language change does not mean a consultation is offered in that language.
- If email delivery is off, a real submission would say it was not sent. Do not describe that as a successful booking.

## Issue backlog

| Priority | Issue | State |
| --- | --- | --- |
| Done | Homepage questions named Resources without a link | Fixed |
| Done | Service names used a fainter underline and a short hit area | Fixed |
| Done | Some section titles used a smaller size than other titles at the same level | Fixed |
| Done | Footer documentation link was shorter than the other footer links | Fixed |
| Done | A future photograph had no shared crop frame | Fixed |
| Owner | Pricing stays out of the primary menu until the owner asks for that change | Open |
| Owner | No fee, founder, credential, photograph, or government statement is approved to publish | Open |
| Owner | Amharic, Tigrinya, and Afaan Oromoo copy is not approved, so those sessions cannot test a translation | Open |
| Owner | Inquiry delivery stays off until a privacy notice, retention, and recipient are approved | Open |
| Later | A person still needs to tab through the skip link, menu, and an empty inquiry. The embedded browser did not move focus. | Open |
| Later | Text at 200% and a screen reader were not run in this pass | Open |

## Automated coverage

`tests/visual-review.test.ts` locks the spacing scale, the shared section-title size, the absence of the faint service underline, the 3:2 photograph frame, the resume, bookkeeping, and payroll routes, and the Resources link from the empty question block.
