# Information architecture

The public site is one route tree with a locale prefix. Business rules stay in `src/content`. Pages do not gain a second copy for Amharic, Tigrinya, or Afaan Oromoo.

These groups are proposed navigation. They are not authorization to provide the work. `getBookableServices()` is empty, and every service scaffold says the page cannot take a request.

English slugs are shared. A later translation changes the label, not the path. The XML sitemap is a separate file and stays empty while this preview is closed. Its rules are in [SEO.md](SEO.md).

## Sitemap

```text
/                         Redirects to /en
/{locale}                 Home
/{locale}/services        Service map
/{locale}/services/immigration-citizenship
/{locale}/services/immigration-citizenship/permanent-residence
/{locale}/services/immigration-citizenship/citizenship
/{locale}/services/immigration-citizenship/travel-documents
/{locale}/services/government-forms
/{locale}/services/government-forms/form-completion
/{locale}/services/government-forms/cra-services
/{locale}/services/government-forms/service-canada
/{locale}/services/career-employment
/{locale}/services/career-employment/resume-writing
/{locale}/services/career-employment/job-applications
/{locale}/services/tax-business-administration
/{locale}/services/tax-business-administration/bookkeeping
/{locale}/services/tax-business-administration/payroll
/{locale}/services/tax-business-administration/personal-tax
/{locale}/how-it-works
/{locale}/pricing
/{locale}/about
/{locale}/resources
/{locale}/contact
/{locale}/development     Builders' notes. Not primary navigation.
```

`{locale}` is `en`, `am`, `ti`, or `om`.

Concrete paths used by the route table:

- `/`
- `/services`
- `/services/immigration-citizenship`
- `/services/immigration-citizenship/permanent-residence`
- `/services/immigration-citizenship/citizenship`
- `/services/immigration-citizenship/travel-documents`
- `/services/government-forms`
- `/services/government-forms/form-completion`
- `/services/government-forms/cra-services`
- `/services/government-forms/service-canada`
- `/services/career-employment`
- `/services/career-employment/resume-writing`
- `/services/career-employment/job-applications`
- `/services/tax-business-administration`
- `/services/tax-business-administration/bookkeeping`
- `/services/tax-business-administration/payroll`
- `/services/tax-business-administration/personal-tax`
- `/how-it-works`
- `/pricing`
- `/about`
- `/resources`
- `/contact`
- `/development`
- `/development/design-system`

## Route conventions

| Rule | Convention |
| --- | --- |
| Prefix | Always. `/` redirects to `/en`. |
| Slug language | English kebab-case, shared by every locale. |
| Family slug | The category id: `immigration-citizenship`, `government-forms`, `career-employment`, `tax-business-administration`. |
| Service slug | The compliance id, for example `permanent-residence`. |
| Files | One `page.tsx` per pattern under `src/app/[locale]`. No locale-specific page file. |
| Unknown slugs | The page calls `notFound()` when the family or service is not in the map. `cacheComponents` does not allow `dynamicParams = false`. |
| Titles | The navigation label, plus the root template `· TIBEB Consultancy`. |
| Labels | Visible text. An exact primary link sets `aria-current="page"`. A page under Services sets `aria-current="true"` on Services. |

CRA-related administrative support is grouped under Government & Forms at `/services/government-forms/cra-services`. The compliance record `cra-services` still uses the tax category id, so the publication hold on the tax catalog is unchanged.

## Navigation

Primary and footer, in this order:

1. Home
2. Services
3. How it works
4. About
5. Resources
6. Contact

Languages stay a separate navigation list. Development documentation stays linked from the footer and from Resources, labeled as development documentation.

While a service is closed, the page links are:

- Primary: How it works
- Secondary: Contact

Contact does not link to itself. How it works links back to Services. Pricing is a separate page, linked from How it works and from Questions. It is not in the primary navigation. Questions stay on Resources.

## Service-to-page map

| Family | Page | Compliance id | Path |
| --- | --- | --- | --- |
| Immigration & Citizenship | Permanent residence applications | `permanent-residence` | `/services/immigration-citizenship/permanent-residence` |
| Immigration & Citizenship | Citizenship applications | `citizenship` | `/services/immigration-citizenship/citizenship` |
| Immigration & Citizenship | Travel documents | `travel-documents` | `/services/immigration-citizenship/travel-documents` |
| Government & Forms | Form completion | `form-completion` | `/services/government-forms/form-completion` |
| Government & Forms | CRA-related administrative support | `cra-services` | `/services/government-forms/cra-services` |
| Government & Forms | Service Canada-related administrative support | `service-canada` | `/services/government-forms/service-canada` |
| Career & Employment | Resume writing | `resume-writing` | `/services/career-employment/resume-writing` |
| Career & Employment | Job application assistance | `job-applications` | `/services/career-employment/job-applications` |
| Tax & Business Administration | Bookkeeping | `bookkeeping` | `/services/tax-business-administration/bookkeeping` |
| Tax & Business Administration | Payroll | `payroll` | `/services/tax-business-administration/payroll` |
| Tax & Business Administration | Personal tax | `personal-tax` | `/services/tax-business-administration/personal-tax` |

Resource guides live at `/resources/resume-information`, `/resources/tax-appointment-documents`, `/resources/small-business-bookkeeping`, `/resources/official-government-forms`, and `/resources/administrative-assistance`. None is published until a named reviewer approves it. The rules are in [RESOURCE_CENTRE.md](RESOURCE_CENTRE.md).

The Services page starts with a two-step finder. It links only to a service page that has passed the publication gate, and it offers the general inquiry when nothing is published. The four groups remain below it, each marked "Not approved". The decision map is in [SERVICE_FINDER.md](SERVICE_FINDER.md).

## User journeys

Each journey ends at a closed page. None of them ends in a purchase.

### Individual client

Home, Services, then the finder or the group that matches the task. A closed page says the work cannot be requested. How it works explains that no file can be started. Contact has a general inquiry form and does not book a consultation.

### Newcomer or family

Home, then Immigration & Citizenship. The three names are permanent residence, citizenship, and travel documents. The visitor can open one page and read that it is closed. The page does not ask for immigration history.

### Job seeker

Home, Career & Employment, then Resume writing or Job application assistance. Both are closed. The pages do not promise a job.

### Small-business owner

Home, Tax & Business Administration, then Bookkeeping, Payroll, or Personal tax. CRA-related administrative support is under Government & Forms, not in this group. All of those pages are closed.

### Multilingual customer

The language list keeps the same path and changes the locale prefix. Until a translation is approved, the page shows the English scaffold and the existing translation notice. Slugs do not change. Consultation languages are still a separate, empty record.

### Visitor who is unsure

Services is the whole decision. The finder offers five sentences and does not score the visitor. If nothing is published, the next step is the general inquiry. The groups below the finder stay closed.

## Page inventory

Shared rules for every scaffold: one `h1`, a publication-status region with text (not colour alone), no price, no form, no booking control. Trust evidence on these pages is the absence of a false claim: no licence, no government affiliation, no founder biography.

| Page | Audience | Problem | Main message | Required information | Trust evidence | Primary CTA | Secondary CTA | Internal links | Restriction |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | Everyone | Is this business open? | The site is being built. No service is approved. | Approved name and draft positioning only | Empty public catalog | Services | Development documentation | Languages, services | Do not list regulated names as open offers |
| `/services` | Unsure visitors | Which group is which? | The four groups are a map, not a menu of work for sale | Family labels and closed state | "Not approved" on every name | How it works | Contact | Four families and eleven names | Groups are not authorization |
| Family pages | People comparing names | What sits in this group? | Names in the group are proposed and closed | Child labels and the family restriction | Status text on each child | How it works | Contact | Child pages | Family restriction string |
| Service pages | People who found a name | Can I ask for this? | The name is reserved. No description or price is approved | The label only | Closed status, or a note that no request flow exists if the gate ever opens | Group page, then How it works | Contact | Family, how it works, contact | Compliance record still blocks booking |
| `/how-it-works` | Everyone | What do I do next? | The map can be read. A file cannot be started | The four steps | Steps say not to send documents | Services | Contact | Services, contact | No intake |
| `/about` | Everyone | Who is this? | No founder profile is approved | Draft positioning, marked as a draft | The draft label | Services | How it works | Services | Do not invent a biography |
| `/resources` | Everyone | Where are the guides? | None are approved | None | Empty list | Services | How it works | Development documentation | Do not publish unapproved articles |
| `/contact` | Everyone | How do I reach you? | No email, phone, address, or form is approved | None | The missing channel is stated | How it works | Services | Those two pages | Do not collect case data |
| `/development` | Builders | Where are the repo notes? | This is not a client page | Doc list | Existing catalog note | None in the primary nav | Footer documentation link | Repo docs | Keep it out of the primary nav |

## Wireframes

Narrow screen first. The header stacks the name, primary links, and languages. The footer repeats the primary links.

### Home

```text
[Preview label]
TIBEB Consultancy                 h1
Draft introduction
[This site is being built]
Published services
  No services are approved for publication.
  Services                        link
Languages planned for this website
Development documentation
```

### Services

```text
Services                          h1
Map, not a price list. No questionnaire.
[Publication status: not a menu of work for sale]
Immigration & Citizenship
  restriction
  Permanent residence applications    Not approved
  Citizenship applications            Not approved
  Travel documents                    Not approved
Government & Forms
Career & Employment
Tax & Business Administration
How it works
Contact
```

### Family

```text
[Family label]                    h1
The items below are proposed names. Each one is closed.
[Publication status: family restriction]
Name                              Not approved
Name                              Not approved
How it works
Contact
```

### Service

```text
[Service label]                   h1
This name is reserved. No description, price, or audience is approved.
[Publication status: cannot take a request]
Back to this group
How it works
Contact
```

### How it works, About, Resources, Contact

```text
[Page title]                      h1
One honest sentence
[Publication status]
Optional short list or draft positioning
Related pages
```

About may show the supplied positioning sentence under the heading "Draft positioning", with a line that it is not an approved public claim.

## Implementation dependencies

| Need | Where it lives | What is still missing |
| --- | --- | --- |
| Route table | `src/content/site/information-architecture.ts` | Translated labels |
| Scaffold sentences | `src/content/site/scaffold-copy.ts` | Owner-approved copy |
| Booking gate | `getBookableServices()` | Every record is closed |
| Family publication hold | `serviceBlockedByCompliance()` | Unchanged by these routes |
| Locale prefix | `src/proxy.ts`, `replaceLocaleInPath` | No per-locale page files |
| Navigation | `PrimaryNav` in the header and footer | Current page comes from the URL |
| Contact intake | Not built | Needs an approved channel before a form |
| Resources | Empty on purpose | Needs approved articles |
| About | Draft positioning only | Needs an approved founder record before a biography |
| Service copy | Not on the page | Needs the approval workflow and the compliance matrix |
| Brand visuals | Provisional tokens | `docs/BRAND_STRATEGY.md` is not approved |

Do not fill a scaffold with a service description, a fee, a credential, or a booking control in order to make the page look finished.
