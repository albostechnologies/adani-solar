# SEO_AUDIT.md

**Audit date:** 20 August 2026

## Technical SEO

| Check | Status | Notes |
| ----- | ------ | ----- |
| Unique `<title>` per page | PARTIAL | Client `ROUTE_TITLES` only; About duplicated for `about` + `about-what-we-do` |
| Unique meta description | FAIL | Only root `layout.tsx` description |
| Canonical | FAIL | No per-page canonical; placeholder `metadataBase` |
| Open Graph | PARTIAL | Single site-wide OG; image OK path exists; `ogImage` config file missing |
| Twitter cards | PARTIAL | Site-wide only |
| `sitemap.xml` | FAIL | Missing |
| `robots.txt` | PARTIAL | Allows crawl; no Sitemap line; no host |
| Structured data | FAIL | None |
| `lang` | PASS | `lang="en"` |
| Viewport | PASS | Next default |
| Favicon | PASS | `/logo.svg` |
| Heading hierarchy | NEEDS REVIEW | Hero uses H1; some pages OK; need full pass for multiple H1 |
| Hash SPA crawlability | CRITICAL LIMIT | Most “pages” are `#` routes — limited indexation of deep pages |
| Internal linking | WEAK | Many nav items dump to `#home` |
| Image alt | PARTIAL | Some alts generic (`Export World Map`, `Plant Walkthrough`) |
| 404 | FAIL | Unknown hash → Home |

## Title map (current)

| Route | Current title | Issue |
| ----- | ------------- | ----- |
| home | Adani Solar - Solar PV Manufacturing | OK-ish; align with layout metadata |
| about | About Us - Adani Solar | Duplicate with what-we-do |
| about-what-we-do | About Us - Adani Solar | Duplicate |
| why-solar | Why Solar - Adani Solar | OK |
| contact | Contact Us - Adani Solar | OK |
| terms / privacy | Distinct | OK |
| products / careers / glossary / resources / sustainability / compare / manufacturing | Distinct short titles | Need unique descriptions |

## Proposed SEO titles (implementation phase)

| Route | Proposed title |
| ----- | -------------- |
| home | Solar PV Manufacturing \| Adani Solar |
| about | About Adani Solar \| Integrated PV Manufacturer |
| about-what-we-do | What We Do \| Adani Solar Manufacturing |
| why-solar | Why Solar Energy \| Adani Solar |
| product-topcon | TOPCon Solar Modules \| Adani Solar |
| product-monoperc | MonoPERC Solar Modules \| Adani Solar |
| contact | Contact Adani Solar \| Sales & Support |
| careers | Careers \| Adani Solar |
| glossary | Solar Glossary \| Adani Solar |
| resources | Resource Center \| Adani Solar |
| sustainability | Sustainability \| Adani Solar |
| compare | Compare Solar Modules \| Adani Solar |
| manufacturing | Manufacturing Process \| Adani Solar |
| terms | Terms & Conditions \| Adani Solar |
| privacy | Privacy Notice \| Adani Solar |

## Structured data (proposed, non-fabricated only)

- `Organization` + `WebSite` using verified name/URL/logo only.
- `ContactPage` on contact route if content supports it.
- `FAQPage` only where FAQ content remains after fact scrub.
- **Do not** add AggregateRating, fake reviews, or invented Product offers.

## Honest limitation

Full multi-URL SEO ideally needs real Next.js routes (`/about`, `/contact`, …). This audit proposes **maximum improvement within the existing hash router** unless the project explicitly authorizes a routing architecture change (still design-preserving).
