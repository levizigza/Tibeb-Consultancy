# Technical SEO

This preview is not a public launch. Every page sends `noindex`, and `robots.txt` disallows `/`. `sitemap.xml` lists no URLs. Those rules stay in place until the owner approves launch copy and a public https origin.

`searchLaunchApproved` in `src/lib/seo/indexability.ts` is false. `NEXT_PUBLIC_SITE_URL` is unset, so there is no `metadataBase` and structured data that needs an absolute URL is not rendered.

## Titles and descriptions

The title template is `%s · TIBEB Consultancy`. The homepage title is the brand name on its own. Every other route has its own title and description in `src/content/site/search-metadata.ts`. The description matches the page: a closed service says the work is not approved, and a draft guide says it is not published. Descriptions are not repeated across routes.

## Headings

Each page template has one `h1`: the hero, the page header, the guide title, or the development title. Later sections use `h2`. The homepage “Draft positioning” line is an `h3` inside the About section.

## Routes

Slugs stay short English names such as `/services/career-employment/resume-writing`. A translation changes the label, not the path. Development notes stay under `/development`.

## Canonical URLs and hreflang

An unfinished locale URL uses the English path as its canonical URL. `hreflang` lists English and `x-default`. Amharic, Tigrinya, and Afaan Oromoo are omitted until every review record for that locale can be published. An approved locale is added on both the English page and the translated page. Incomplete translations are not indexed.

## Sitemap and robots

While the preview is closed, crawlers are disallowed and the sitemap is empty.

After launch, the sitemap includes only:

- Home, Services, How it works, About, Resources, and Contact
- A service family page, once a service in that family is published
- A service page, once `selectPublicServicePage` accepts it
- A guide, once a named reviewer approves it
- Pricing, once a public price exists

`/development` stays disallowed. Unpublished service, guide, and price URLs stay disallowed. A locale that is not approved is disallowed as a prefix. Each sitemap URL carries reciprocal `hreflang` links for the locales that are actually approved.

## Structured data

Visible breadcrumbs can emit `BreadcrumbList` once a public origin exists. The script is omitted today because there is no origin.

`Organization` is omitted. The public name is still an unverified draft, and there is no approved email, phone, or address. The graph will not include `LocalBusiness`, `AggregateRating`, or `Review`.

## Local search

No street address, city, service area, opening hours, rating, or customer review is on file. Do not create a Google Business Profile listing from this site. A listing needs the owner to confirm either a public location or a defined service area. A home address should not be published to fill that gap.

## Images and assets

The wordmark is text. The favicon is a small SVG. Content photographs render only with a written alternative; a blank alternative is treated as no photograph. Noto Sans is the body font. Noto Sans Ethiopic is not preloaded, because English pages use it only for language names.

## What still needs the owner

- A public https domain
- Approval to set `searchLaunchApproved`
- Launch copy that can replace the development preview wording
- A verified public name before `Organization` markup
- A confirmed location or service area before any local listing
- Approved translations before those locales enter `hreflang` or the sitemap
