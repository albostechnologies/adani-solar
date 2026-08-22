# CONTENT_AUDIT.md

**Audit date:** 20 August 2026

## Content strategy matrix (target)

| Page | Primary intent | Primary keyword | Secondary | CTA |
| ---- | -------------- | --------------- | --------- | --- |
| Home | Brand + manufacturer discovery | solar PV manufacturer India | TOPCon, MonoPERC, Mundra | Explore modules / Contact |
| About | Company understanding | Adani Solar about | vertically integrated, Mundra | What we do / Contact |
| What We Do | Capabilities | solar manufacturing capabilities | value chain, cells, modules | Products / Contact |
| Why Solar | Educate buyers | why solar energy India | rooftop, LCOE, energy security | Contact / Products |
| TOPCon | Product research | TOPCon modules | bifacial, efficiency | Enquire / Compare |
| MonoPERC | Product research | MonoPERC modules | warranty, power range | Enquire / Compare |
| Compare | Decision support | TOPCon vs MonoPERC | efficiency, warranty | Contact |
| Manufacturing | Process education | solar manufacturing process | wafer, cell, module | Contact |
| Sustainability | ESG interest | solar sustainability | ZLD, recycling | Contact |
| Careers | Job seekers | Adani Solar careers | manufacturing jobs | View roles / Apply |
| Resources / Glossary | Support content | solar glossary / resources | PV terms | Related pages |
| Contact | Conversion | contact Adani Solar | channel partner, sales | Submit form |

## Issues by page

### Home (`src/content/home.ts`)

- Strengths: Clear manufacturer positioning; structured sections.
- Problems: AI-ish product adjectives; empty video sections; **fabricated testimonials**; **likely fabricated case studies & news**; heavy image reuse; hero primary CTA routes to `home`.
- Action: Rewrite tone; remove/fence unsupported blocks; fix CTAs; add contextual internal links.

### About (`src/content/about.ts`)

- Capacity “10 GW” vs official “4 GW cells & modules + 2 GW ingots/wafers” — **align carefully**.
- “cutting-edge / world-class / next-generation” phrases.
- MD identity + portrait — verify/authorize.
- Carbon/trees stats — keep only if sourced.

### Why Solar

- Generally useful educational content; some absolute claims (“ultimate”, “most versatile”) — tone down.
- India stats — keep if generally accepted public figures; avoid over-precise invented savings where unsupported.

### Contact

- Form copy OK.
- Channel partner names/phones look **fake** — remove until verified.
- Hours: header says Mon–Sat; contact info says Mon–Fri — **inconsistency**.

### Careers

- “5,000+ innovators”, culture stats, benefit amounts — verify or remove numbers.
- Typo: “India'solar”.
- Job listings may be demo data — label or verify.

### Sustainability / Manufacturing / Compare / Resources / Glossary

- Sustainability initiatives cite missing images + aggressive impact numbers — verify.
- Manufacturing “world-class / next-generation” — rewrite.
- Glossary/resources: useful SEO depth if accurate — light editorial pass.

### Legal

- Structure OK; lastUpdated Aug 2026 — fine if intentional.

## Unsupported / invent-risk inventory (remove or verify)

1. Named customer testimonials + star ratings  
2. Channel partner directory  
3. Several case-study projects & savings figures  
4. Newsroom article bodies with specific GW/export/BNEF claims  
5. Newsletter subscriber count  
6. Careers headcount / diversity / retention / ₹ benefits (unless verified)  
7. Absolute “largest” claims where reference wording differs  
8. Product datasheet-level numbers without official datasheet confirmation  

## Rewrite principles (implementation)

- Professional, concise, manufacturer voice  
- Humans first; natural keywords  
- No keyword stuffing  
- Prefer verified reference phrasing over invented marketing  
- Soften superlatives unless evidenced  
