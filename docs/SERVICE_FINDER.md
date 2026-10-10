# Service finder

The finder is a two-step control on the Services page. It is not a chatbot, a booking calendar, or an eligibility tool.

## Steps

1. The visitor chooses one of five sentences.
2. The page explains that choice. It lists a service only when that service page has passed the publication gate. Otherwise it says the work is not currently offered and links to the general inquiry.

Back returns to the five sentences and keeps the last choice marked Selected. Start again clears the choice. Both controls are buttons. The result heading can take keyboard focus.

Links use the locale already in the URL. The sentences stay in English until a translation of the Services page is approved. The section is marked `lang="en"`.

## Decision map

| Sentence | Family | Published link today |
| --- | --- | --- |
| I need help with a resume or finding employment. | Career & Employment | None |
| I need help with taxes or business records. | Tax & Business Administration | None |
| I need help understanding general government paperwork. | Government & Forms | None |
| I'm looking for immigration or citizenship information. | Immigration & Citizenship | None |
| I'm not sure which service I need. | None. The finder does not guess. | None |

A link is included only when `selectPublicServicePage` accepts the page and the path is the registered path for that family. Closed and draft pages stay off the result. The internal catalog ids, such as the unpublished assistance records, are not finder destinations.

The result repeats that the step does not ask for financial records or immigration documents, does not decide whether someone can apply, and is not legal advice. It does not calculate tax, complete a form, or start an application.

## Unresolved

- No service page is approved, so every choice ends on "Not currently offered" and the inquiry.
- The inquiry itself is not delivered until email is configured. See [INQUIRY_SECURITY.md](INQUIRY_SECURITY.md).
- The owner has not confirmed that these five sentences are the public menu. They are a development map onto the four existing families.
- Amharic, Tigrinya, and Afaan Oromoo do not have approved finder text. Those routes show this English copy with the existing translation notice.
- The finder is a section of `/services`, not its own URL.
- "I'm not sure" does not list unpublished service names.
