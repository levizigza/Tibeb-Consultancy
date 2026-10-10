# Resource centre

The resource centre is the Resources page plus one page for each starter guide. It is a catalogue with a publication gate, not a set of finished articles.

## What a guide records

Each guide stores a title, summary, audience, category, reviewer, publication status, verification, official source links, publication date, last-reviewed date, next review date, source locale, sections, related guides, and links to existing site pages.

English is the only source locale. Amharic, Tigrinya, and Afaan Oromoo have no guide text. Those routes show the English source and the existing translation notice. The guide page says an approved translation is not available.

## Publication gate

A guide is rendered in full only when all of these are true:

1. Publication status is `approved` and verification is `verified`.
2. A reviewer name is present. No name is invented.
3. Publication, last-reviewed, and next-review dates are set, and the next review is not earlier than the last review.
4. Tax preparation, bookkeeping, payroll, and government-information guides cite at least one official Canadian government page.
5. The copy does not make a prohibited service claim or tell a reader what they qualify for, what they should claim, or what they should deduct.

Until then, the public page shows the title, summary, audience, status, and official source links. The section text stays in `src/content/resources/guides.ts`.

Official sources used today were checked on 2026-10-10:

- Job Bank, “How to write a resume”
- Canada Revenue Agency, “Get ready to do your taxes”
- Canada Revenue Agency, “Keeping records”
- Canada Revenue Agency, “Forms and publications”

A source link is not an interpretation of that page.

## Starter guides

| Guide | Category | Professional review | Published |
| --- | --- | --- | --- |
| How to prepare information for a resume. | Career and employment | No. Still needs a named reviewer. | No |
| Documents to organize before a tax appointment. | Tax preparation | Yes | No |
| Basic bookkeeping organization for small businesses. | Bookkeeping | Yes | No |
| Where to find official Canadian government forms. | General government information | Yes | No |
| What to expect when requesting administrative assistance. | Client preparation checklists | No. Still needs a named reviewer. | No |

Payroll fundamentals is a category with no guide. A payroll article was not drafted. It would need professional review before it could be added.

## Categories

The listing has an All control and one control for each category. The filter is on the page because six categories share one URL. Empty categories say that nothing is published there.

## Review before a guide can be approved

Tax preparation, bookkeeping, and government-form guides need a person qualified to review that topic. The owner still has to name the reviewer and set the three dates. Career and website-process drafts need the owner’s review, not a regulated-profession sign-off.

Do not approve a guide that calculates tax, chooses deductions, assesses immigration eligibility, or completes a government form. Do not add an author biography or credential that the business has not supplied.

Suggested next review is six months after the last review, once a person has actually reviewed the guide. No next-review date is stored yet.
