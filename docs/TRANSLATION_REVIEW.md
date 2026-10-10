# Translation review

English is the only website copy. `/am`, `/ti`, and `/om` are addresses for a future translation. Until a target record is approved, the page shows the English development copy and a notice that it is not fully localized. The region `lang` stays `en`.

Website languages are separate from consultation languages. No consultation language is confirmed.

The current coverage table is [TRANSLATION_COVERAGE.md](TRANSLATION_COVERAGE.md).

## What a translator receives

Each target record in `src/i18n/review/records.ts` stores:

| Field | Meaning |
| --- | --- |
| Source locale | Always English |
| Target locale | `am`, `ti`, or `om` |
| Source version | The English version this translation was written against |
| Reviewer | Empty until the business names the person. Do not invent a name |
| Review date | Empty until that review happens |
| Approval status | One of the statuses below |
| Last-updated date | Empty until the record changes |
| Comments | Reviewer notes. Author stays empty until a person is named |
| Correction notes | Changes a translator still needs to make |

Chrome strings also live in `src/i18n/messages/catalog.ts`. A translated catalog is not published on its own. The review record for that surface has to pass the same gate.

## Statuses

| Status | Meaning |
| --- | --- |
| Missing | No target text. The page uses the English fallback |
| Draft | A person started a translation. It is not published |
| Machine-assisted draft | Machine output was used. It is never published |
| Human-reviewed | A named person has read it. It is still not published |
| Approved | The business has accepted it after human review, and the source version still matches |
| Outdated | The English source version changed after the translation was written |

Do not mark a record approved to finish a task. Approval needs a reviewer, a review date, a last-updated date, target text, and `machineAssisted: false`.

## High-stakes copy

These topics need human review before they can be approved:

- Immigration and citizenship information
- Tax-related information
- Service agreements
- Pricing explanations
- Privacy and consent wording
- Government authorization instructions
- Payment instructions

`human-reviewed` is not enough for those topics. Machine-assisted text cannot be moved to `human-reviewed` or `approved`.

When the English source version on a unit in `src/i18n/review/units.ts` changes, run the stale check. A started translation becomes `outdated`. A missing record stays missing. The check does not add a reviewer.

## Fallback

`TranslationFallback` is the notice at the top of an unfinished locale. It names the language in that language's script and says the page is not fully localized. hreflang lists only locales whose review records can all be published. Today that is English only. The canonical URL of an unfinished page is the English URL.

Amharic and Tigrinya endonyms use Noto Sans Ethiopic. English and Afaan Oromoo use Noto Sans. The page font switches to Ethiopic only after that locale's review records can be published.

## Checks

`formatTranslationCoverageReport()` prints the coverage table. `listReviewIssues()` lists every record that cannot be published. `shellControlsFit()` and the body `overflow-wrap` rule guard short controls and long lines. Locale layout tests cover the four routes, the fallback, and the font class.
