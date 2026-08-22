# REDIRECT_REPORT.md

**Audit date:** 20 August 2026  
**Status:** No redirects implemented yet (audit phase only).

Hash SPA note: “redirects” here mean **router destination corrections** or future Next.js redirects if path-based routes are introduced.

| OLD URL | NEW URL | REASON | STATUS | IMPLEMENTATION METHOD |
| ------- | ------- | ------ | ------ | --------------------- |
| `#` (Footer Media) | TBD verified newsroom/media URL or remove link | Placeholder dead link | PLANNED | Navigation config fix |
| `#` (Footer Investors) | TBD official investors URL or remove | Placeholder dead link | PLANNED | Navigation config fix |
| Nav “Green Initiatives” → `#home` | `#sustainability` (proposed) | Misleading destination | PLANNED | `navigation.ts` route change |
| Nav “Export Manufacturing” → `#home` | Home export section or `#sustainability` | Misleading | PLANNED | Route or in-page anchor |
| Nav “PV Value Chain” → `#home` | Home value-chain section | Misleading | PLANNED | In-page anchor support |
| Nav “Solar Cells” → `#home` | Products/value-chain or new thin page | Missing dedicated IA | PLANNED | Decide in implement gate |
| Nav “Solar Glass” → `#contact` | Contact enquiry (or products ancillaries) | Soft dump | PLANNED | Clarify label or content |
| Unknown hash → `#home` | `#404` / Not Found page | Silent wrong content | PLANNED | Router + NotFound page |
| `metadataBase` example.com | Production origin | Invalid canonical/OG base | PLANNED | `layout.tsx` / env |
| YouTube `@AdaniGroupOfficial` | Verified channel URL | 404 | PLANNED | `site.ts` + contact content |

## Not planned

- Random redirects between unrelated topics  
- Scraping/mirroring adanisolar.com paths into this SPA without IA intent  
