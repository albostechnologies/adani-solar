# ASSET_LICENSES.md

**Audit date:** 20 August 2026  
**Status:** Template only — **no newly verified licensed downloads recorded yet**.

Production rule: do not ship an asset until this table has a complete, verified row.

| Asset | Source | Author | License | License URL | Download Date | Commercial Use | Attribution Required |
| ----- | ------ | ------ | ------- | ----------- | ------------- | -------------- | -------------------- |
| `/assets/home/hero-solar-facility.webp` | Unknown (ref: adanisolar.com / AI per worklog) | Unknown | **UNVERIFIED** | — | Prior project | Unknown | Unknown — **DO NOT TREAT AS CLEARED** |
| `/assets/home/about-solar-manufacturing.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/home/pv-value-chain.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/home/solar-products-modules.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/home/solar-plant-aerial.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/home/export-world-map.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/about/manufacturing-facility.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/about/md-portrait.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | **Likeness/authorization required** |
| `/assets/why-solar/*.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/contact/contact-hero.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/brand/logo-solar.webp` | Brand | Adani Solar (presumed) | Brand / project authorization | — | Prior | Only if authorized for this build | Per brand guidelines |
| `/assets/products/topcon-module.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/assets/products/monoperc-module.webp` | Unknown | Unknown | UNVERIFIED | — | Prior | Unknown | Unknown |
| `/logo.svg` | Project | Unknown | UNVERIFIED / brand | — | Prior | Unknown | Unknown |

## Replacement workflow (implementation phase)

1. Choose Unsplash / Pexels / Pixabay / Wikimedia (commercial-OK) or client files.  
2. Verify license + no watermark.  
3. Download into `public/assets/...` with descriptive names.  
4. Optimize WebP/AVIF.  
5. Add row here.  
6. Point UI to local path only.
