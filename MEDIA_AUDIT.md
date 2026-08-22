# MEDIA_AUDIT.md

**Audit date:** 20 August 2026  
**Rule:** No external media hotlinks in production UI (current `src/` largely uses `/assets/...`).

| ID | Page | Section | Current Source | Type | Local? | License | Watermark? | Action |
| -- | ---- | ------- | -------------- | ---- | ------ | ------- | ---------- | ------ |
| M001 | Home | Hero | `/assets/home/hero-solar-facility.webp` | Image | Yes | Unverified (Adani ref / AI per worklog) | No | LICENSE VERIFICATION REQUIRED → replace with licensed stock or client asset |
| M002 | Home | About | `/assets/home/about-solar-manufacturing.webp` | Image | Yes | Unverified | No | Same |
| M003 | Home | Value chain steps | `/assets/home/pv-value-chain.webp` (reused) | Image | Yes | Unverified | No | Replace + diversify per step if possible |
| M004 | Home | Products tabs | `/assets/home/solar-products-modules.webp` | Image | Yes | Unverified | No | Prefer `/assets/products/*` after license OK, or new licensed product photos |
| M005 | Products | TOPCon file unused in home content | `/assets/products/topcon-module.webp` | Image | Yes | Unverified | No | License check; wire if compliant |
| M006 | Products | MonoPERC file | `/assets/products/monoperc-module.webp` | Image | Yes | Unverified | No | Same |
| M007 | Home | Ancillaries (5 cards) | `/assets/home/solar-plant-aerial.webp` (all) | Image | Yes | Unverified | No | Replace; stop identical reuse |
| M008 | Home | Plant walkthrough | Thumbnail local; `videoUrl: ""` | Video | Partial | N/A | N/A | Keep poster; no scrape; add licensed video later or remove section CTA |
| M009 | Home | Video gallery | Thumbnails only (aerial reuse) | Video | Partial | Unverified | No | Same |
| M010 | Home | Export map | `/assets/home/export-world-map.webp` | Image | Yes | Unverified | No | Replace if map is copyrighted |
| M011 | Home | Case studies / news / sustainability cards | Various home WebPs | Image | Yes | Unverified | No | Replace; remove unsupported stories first |
| M012 | About | Hero / intro | `/assets/about/manufacturing-facility.webp` | Image | Yes | Unverified | No | Replace |
| M013 | About | MD portrait | `/assets/about/md-portrait.webp` | Image | Yes | Unverified (likely personal likeness) | No | **Do not use** without authorization; remove or client-provided |
| M014 | Why Solar | Hero + benefit images | `/assets/why-solar/*.webp` | Image | Yes | Unverified | No | Replace |
| M015 | Contact | Hero | `/assets/contact/contact-hero.webp` | Image | Yes | Unverified | No | Replace |
| M016 | Brand | Logo | `/assets/brand/logo-solar.webp` + `/logo.svg` | Image | Yes | Brand mark | No | Client/brand use only; keep if project authorized |
| M017 | Sustainability | Initiatives | `/assets/home/solar-farm-aerial.webp` | Image | **No (404)** | — | — | Fix path: download licensed replacement |
| M018 | Sustainability | Initiatives | `/assets/home/solar-panels-closeup.webp` | Image | **No (404)** | — | — | Same |
| M019 | Sustainability | Initiatives | `/assets/home/solar-installation-roof.webp` | Image | **No (404)** | — | — | Same |
| M020 | Global OG | `siteConfig.ogImage` | `/assets/og-image.jpg` | Image | **No (404)** | — | — | Create local OG (1200×630) from licensed asset |
| M021 | Layout OG | `/assets/home/hero-solar-facility.webp` | Image | Yes | Unverified | No | Replace with licensed OG |
| M022 | CSS noise | `data:image/svg+xml` noise | Decorative SVG | Inline | N/A (generated) | No | Keep (not third-party media) |
| M023 | Root QA screenshots | `qa-*.png`, `final-*.png`, etc. | Image | Repo root | N/A | — | Cleanup later (not used in UI) |

## External media URLs in UI

- **No `https://...jpg/mp4` hotlinks found in production component `src` for media.**
- Social/share HTTPS links are not media embeds.

## License posture

Until each file has a verified commercial license entry in `ASSET_LICENSES.md`, treat production media as **non-compliant for final ship**.
