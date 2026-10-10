# Measurement plan

This plan describes how the public site could be measured later. Collection is off. No analytics script is loaded, no cookie is set, and no event is stored. The numbers below are definitions, not results. A design change has not been shown to increase inquiries.

The province where the business operates is not on file. If personal information is collected in a commercial activity in Alberta, Alberta's Personal Information Protection Act can apply, including consent, notice at collection, withdrawal, safeguards, and limits on retention. Personal information that crosses a provincial or international boundary can also fall under PIPEDA. This note is a product constraint, not a legal opinion. A third-party analytics host, including one outside Canada, stays out until the owner approves a privacy notice that names that host.

## Approach

The suitable system is a first-party counter of aggregate events. It would increment a daily tally for an event name plus a few closed identifiers. It would not keep a visitor id, a session cookie, an IP address, or a browser string.

That is simpler than a marketing suite, and it avoids sending identifiers to another organization. It cannot say how many people converted. It can say how many events of one kind occurred beside events of another kind.

`src/lib/measurement` holds the contract. `acceptMeasurement` checks an event and then discards it. `measurementCollectionEnabled` is false because the owner switch is off and `privacyNotice` is not an established public claim. `integrations` stays empty. No analytics variable is added to `.env.example`.

## Event taxonomy

Names are `object_action` in snake case. Values are identifiers already used by the site. Free text is rejected.

| Event | What it counts | Allowed fields |
| --- | --- | --- |
| `page_view_home` | A homepage response | Locale, form factor |
| `service_category_select` | A service group | Locale, form factor, category id |
| `service_page_view` | One service page | Locale, form factor, service id, matching category id |
| `contact_cta_click` | The Contact control, which is the consultation-request path | Locale, form factor, placement: navigation, hero, footer, finder, or page-end |
| `inquiry_form_start` | The first interaction with the inquiry form | Locale, form factor |
| `inquiry_submit_success` | A submission only after delivery is confirmed | Locale, form factor, service group id |
| `language_change` | A move from one locale to another | Locale, form factor, destination locale |
| `service_finder_complete` | A finder result | Locale, form factor, intent id, outcome |
| `resource_engage` | A guide view, a category filter, or an official source link | Locale, form factor, and the id that action needs |

`contact_cta_click` is the consultation CTA in this catalogue. The control says Contact. The form does not book a consultation, so the event does not mean a booking.

Form factor is `mobile` when the viewport is under 48rem (768px) and `desktop` from that width up, including tablet. The exact width is not stored.

Finder outcomes are `published_page`, `not_offered`, and `general_inquiry`. While no service page is public, `published_page` cannot occur from the live finder.

A development inquiry returns `not-delivered`. That status does not create `inquiry_submit_success`.

These call sites are not connected. Wiring them would record nothing useful until a store and a privacy notice exist, and it would add client script to pages that are static today.

| Event | Future call site |
| --- | --- |
| `page_view_home` | Homepage render |
| `service_category_select` | Service group page |
| `service_page_view` | Service page render |
| `contact_cta_click` | Contact links in the header, hero, footer, finder, and page end |
| `inquiry_form_start` | First focus in the inquiry form, once per view |
| `inquiry_submit_success` | Server result `delivered` only |
| `language_change` | Language menu |
| `service_finder_complete` | Finder step 2 |
| `resource_engage` | Guide page, category filter, official source link |

## Data minimization

An event may contain only the fields in the table. `acceptMeasurement` rejects:

- Names, email addresses, phone numbers, free-text messages, and document names
- Immigration status, tax details, and the honeypot
- IP addresses, user-agent strings, cookies, and visitor or session ids
- Any string with an `@`, a run of seven digits, whitespace, or more than 64 characters
- A service id paired with the wrong group
- A guide or source id that is not in the catalogue

The inquiry body stays in the inquiry path described in [INQUIRY_SECURITY.md](INQUIRY_SECURITY.md). It is not copied into an event.

## Consent

Nothing non-essential is collected, so the site does not show a measurement banner. A banner would imply tracking that is not happening.

The inquiry acknowledgement is not consent for analytics. When collection is proposed later:

- Publish a privacy notice that names the purpose, the controller, a contact, and how to withdraw.
- Ask before the first event. Leave the choice unticked.
- Keep the choice separate from the inquiry form.
- Stop counting when consent is withdrawn. Aggregate tallies are not a profile that can be handed back as a person's record.
- Write the notice in the language of an approved translation. Until then the only copy is English.

Host access logs are not this measurement system. They must not be mined for the dashboard.

## Retention

No measurement record is kept. There is no approved retention period.

If a counter is approved later, the working expectation is 90 days of daily aggregates and no raw event log. That number is a proposal. The owner still has to set it in the privacy notice. IP addresses and browser strings would stay out of the tally.

## Dashboard

Read these as formulas for a future board. They are not current figures.

| Board | Formula | Split |
| --- | --- | --- |
| Inquiry conversion | `inquiry_submit_success` / `inquiry_form_start` | Locale, form factor |
| Most visited services | Count of `service_page_view` | Service id, category, locale |
| Where inquiries stop | `inquiry_form_start` beside `inquiry_submit_success`, with `contact_cta_click` shown next to starts | Locale, form factor |
| Mobile and desktop | Count of `page_view_home` | Form factor |
| Language | Count of `page_view_home` and `language_change` | Locale |
| Finder | Count of `service_finder_complete` | Intent, outcome, locale |

Resource engagement is a companion count of `resource_engage` by guide, category, or source. It is not a conversion.

Without a visitor id, a click cannot be tied to a later form start for the same person. The drop-off view is a comparison of counts.

## Experiment backlog

All three experiments are parked. `assignExperiment` returns no variant. Do not run them on the current preview: there is no traffic baseline, and there is no operational owner for a test.

| Id | What would vary | What has to exist first |
| --- | --- | --- |
| `hero-headline` | The homepage heading | Two headlines approved by the owner, and a stable homepage visit count |
| `service-card-layout` | The arrangement of service cards | Enough service-page visits to compare, and a layout that still shows publication status |
| `primary-cta-wording` | The Contact label | Owner-approved labels. A label must not say a consultation is booked |

Variant sentences are not written in the repository. A later test may be reported only from stored event counts collected under the privacy notice. A local preview is not that evidence.

## Still disabled

- The owner switch and the privacy-notice gate
- Any analytics vendor, script, cookie, or environment variable
- Storage of events, including successful inquiries
- Calls from pages, the language menu, the finder, resources, and the inquiry action
- All three experiments
