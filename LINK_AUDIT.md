# LINK_AUDIT.md

**Audit date:** 20 August 2026  
**Method:** Static code review of `navigation.ts`, `router.tsx`, Footer/Header, content CTAs + HTTP checks for key external URLs.

| Source | Destination | Type | Status | Action |
| ------ | ----------- | ---- | ------ | ------ |
| Header → About | `#about` | Internal hash | WORKING | Keep |
| Header → What We Do | `#about-what-we-do` | Internal hash | WORKING | Keep; ensure AboutPage anchors/scroll |
| Header → Why Solar | `#why-solar` | Internal hash | WORKING | Keep |
| Header → TOPCon Modules | `#product-topcon` | Internal hash | WORKING | Keep |
| Header → MonoPERC Modules | `#product-monoperc` | Internal hash | WORKING | Keep |
| Header → Solar Cells | `#home` | Internal hash | NEEDS REVIEW | Misleading; retarget to products/value-chain section or dedicated page |
| Header → Compare Products | `#compare` | Internal hash | WORKING | Keep |
| Header → Solar Glass | `#contact` | Internal hash | NEEDS REVIEW | Soft redirect to Contact; prefer dedicated content or remove |
| Header → Sustainability Dashboard | `#sustainability` | Internal hash | WORKING | Keep |
| Header → Green Initiatives | `#home` | Internal hash | MISSING PAGE / NEEDS REVIEW | Retarget to `#sustainability` or create section |
| Header → Export Manufacturing | `#home` | Internal hash | NEEDS REVIEW | Retarget to home export section or sustainability |
| Header → PV Value Chain | `#home` | Internal hash | NEEDS REVIEW | Retarget to home value-chain section |
| Header → Manufacturing Process | `#manufacturing` | Internal hash | WORKING | Keep |
| Header → Contact Us | `#contact` | Internal hash | WORKING | Keep |
| Header → Channel Partners | `#contact` | Internal hash | WORKING | Intentional section on Contact |
| Header → Ask Our Expert | `#contact` | Internal hash | WORKING | Intentional |
| Header → Careers | `#careers` | Internal hash | WORKING | Keep |
| Footer Company links | same as above | Internal | WORKING | Keep |
| Footer Products → Solar Cells | `#home` | Internal | NEEDS REVIEW | Same as header |
| Footer Sustainability → Green/Export/PV | `#home` | Internal | NEEDS REVIEW | Same as header |
| Footer Resources → Resource Center | `#resources` | Internal | WORKING | Keep |
| Footer Resources → Glossary | `#glossary` | Internal | WORKING | Keep |
| Footer → Careers / Open Positions | `#careers` | Internal | WORKING | Duplicate OK |
| Footer single → Media | `#` | Placeholder | BROKEN | Remove or link verified media/newsroom destination |
| Footer single → Investors | `#` | Placeholder | BROKEN | Remove or link verified Adani investor page (do not guess) |
| Footer Legal → Privacy | `#privacy` | Internal | WORKING | Keep |
| Footer Legal → Terms | `#terms` | Internal | WORKING | Keep |
| Footer Legal → Disclaimer | `#terms` | Internal | NEEDS REVIEW | Same as Terms; split page or clarify label |
| Home hero CTA Explore Products | `#home` | Internal | NEEDS REVIEW | Should scroll to products section or `#product-topcon` |
| Home about CTA | `#about` | Internal | WORKING | Keep |
| Social LinkedIn (site/contact) | `linkedin.com/company/adani-group` | External | NEEDS REVIEW | Prefer `linkedin.com/company/adani-solar` after verification |
| Social Twitter | `twitter.com/AdaniOnline` | External | WORKING | Confirm vs `x.com/AdaniSolar` |
| Social YouTube | `youtube.com/@AdaniGroupOfficial` | External | BROKEN (404) | Replace with verified official channel URL |
| Social Facebook | `facebook.com/AdaniGroup` | External | WORKING | Keep if intentional Group page |
| Site URL config | `https://www.adanisolar.com` | External | WORKING | Config only |
| metadataBase | `https://adanisolar.example.com` | Config | BROKEN | Replace with real production base |
| Unknown hash | falls to Home | Internal | NEEDS REVIEW | Add proper 404 route/page |
| Manufacturing (skeleton flag) | `#manufacturing` | Internal | WORKING | Fix `isHomePage` exclusion list |
| Share links (news modal) | WhatsApp/LinkedIn/Twitter intents | External | INTENTIONAL | Keep |

## Notes

- Hash routes cannot be validated as separate HTTP paths; validation is client-router map coverage.
- No Next.js path redirects configured in `next.config.ts` today.
- Do not invent Media/Investors URLs — mark NEEDS VERIFICATION until official URLs confirmed.
