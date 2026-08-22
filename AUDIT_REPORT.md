# AUDIT REPORT — Adani Solar Website

**Last cleanup:** 22 August 2026 — removed z.ai scaffolding, unused QA media, empty video placeholders, and dead components.

**Audit date:** 20 August 2026  
**Reference:** https://www.adanisolar.com/  
**Scope:** SEO, content, media/copyright, routes/links, design-system preservation

---

## Cleanup completed (22 Aug 2026)

Removed from the project:

| Item | Reason |
| ---- | ------ |
| `z-ai-web-dev-sdk` dependency | z.ai branding / tooling |
| Package rename → `adani-solar` | Template name was `nextjs_tailwind_shadcn_ts` |
| `.zscripts/`, `mini-services/`, `examples/`, `tests/`, `agent-ctx/`, `tool-results/`, `download/` | z.ai platform scaffolding / QA dumps |
| `Caddyfile`, `worklog.md`, `bun.lock`, reference manifests | Non-product / platform leftovers |
| Root `qa-*.png`, `final-*.png`, `screenshot-*.png` | Unrelated QA screenshots |
| Plant walkthrough + video gallery UI/content | Empty video placeholders (no real video) |
| Dead components: Newsroom, Testimonials, Partners, ProjectShowcase, Lightbox, NewsTicker, AnimatedSolarSVG, SolarIllustration | Only served removed / unused content |

Production assets remain under `public/assets/` for Adani Solar pages only.

---

## 1. Project snapshot

| Item | Finding |
| ---- | ------- |
| Framework | Next.js 16 + React 19 + TypeScript + Tailwind v4 |
| UI | shadcn/ui + project solar tokens in `globals.css` |
| Routing | **Client-side hash SPA** (`#home`, `#about`, …) via `src/lib/router.tsx` |
| App routes | Single page: `src/app/page.tsx` (+ API under `src/app/api/`) |
| Content | Centralized in `src/content/*.ts` |
| Config | `src/config/site.ts`, `src/config/navigation.ts` |
| Design system | Locked solar tokens (`solar-green`, `solar-dark`, Poppins/Geist) — **preserve** |
| Business logic | Contact API, Prisma present — **do not change** unless required |

**Design constraint confirmed:** Do not redesign. Fix content, SEO, media licensing, and routing issues only.

---

## 2. Problem groups (summary)

| Group | Severity | Count (approx.) |
| ----- | -------- | --------------- |
| Content / unsupported claims | Critical | High |
| SEO (hash routing, metadata, sitemap) | Critical | High |
| Media / copyright / missing files | Critical | Medium |
| Links / dead destinations / placeholders | High | Medium |
| Redirects / 404 | High | Low–Medium |
| Accessibility / alt / performance | Medium | Medium |
| Design system violations | Low (preserve; don’t expand) | — |

---

## 3. Architecture risks (SEO)

1. **Hash-based SPA** means crawlers/social previews largely see one URL (`/`) and one set of Next.js `metadata`.
2. Per-route titles are set only via `document.title` in the client router — **no unique meta description / OG / canonical per route**.
3. `metadataBase` is `https://adanisolar.example.com` (placeholder).
4. **No `sitemap.xml`**. `robots.txt` allows all agents but has **no Sitemap directive**.
5. **No dedicated 404** — unknown hashes fall through to Home.
6. `siteConfig.ogImage` points to `/assets/og-image.jpg` which **does not exist**.

---

## 4. Content / facts (do-not-invent)

Compared to the public reference site and site copy:

| Claim in this project | Issue |
| --------------------- | ----- |
| “10 GW” as current capacity | Official site describes **4 GW cells & modules + 2 GW ingots & wafers**, with **10 GW as vision**. Treat current “10 GW” as **NEEDS VERIFICATION / likely overstated**. |
| Testimonials (named people/companies, ratings) | Appear **fabricated** — remove or mark for client verification. |
| Channel partners (names/phones) | Appear **placeholder/invented** — remove or verify. |
| Case studies (Roha, floating pilot, microgrid, IT park, etc.) | Several look **unsupported**; Kamuthi is a known Adani project but module-supplier attribution needs verification. |
| Careers “5,000+”, 32% women, 95% retention, benefit ₹ amounts | **Unsupported** — verify or soften/remove. |
| Newsletter “12,000+ professionals” | **Unsupported**. |
| Newsroom articles with specific GW/export/BNEF claims | Dates/figures **need verification**; do not invent replacements. |
| MD name “Jawahar Vadivelu” | **NEEDS VERIFICATION** against official sources. |
| Product electrical specs / warranties | Spec sheets may be approximate — **verify against real datasheets** before presenting as authoritative. |

AI-ish / weak phrases found (examples): “cutting-edge”, “next-generation”, “world-class”, “pioneering”.

---

## 5. Media / copyright

- Local WebP assets exist under `public/assets/{home,about,why-solar,contact,brand,products}/`.
- `reference-media-manifest.md` attributes sources to **adanisolar.com**.
- `worklog.md` also records plan for **AI-generated** visuals.
- **Neither Adani site scrape nor unverified AI art is proven copyright-safe for production.**
- **No `ASSET_LICENSES.md` yet.**
- Missing files referenced in code:
  - `/assets/home/solar-farm-aerial.webp`
  - `/assets/home/solar-panels-closeup.webp`
  - `/assets/home/solar-installation-roof.webp`
  - `/assets/og-image.jpg`
- Videos: empty `videoUrl` / placeholder gallery — no hotlinked video found in `src/`.
- Product-specific WebPs exist but many UI spots reuse generic home images.

---

## 6. Links / navigation

| Issue | Detail |
| ----- | ------ |
| Nav items → `home` | Solar Cells, Green Initiatives, Export Manufacturing, PV Value Chain (header) |
| Footer Media / Investors | `href: "#"` — non-functional |
| Disclaimer → Terms | Same route as Terms — intentional? NEEDS REVIEW |
| YouTube `@AdaniGroupOfficial` | **HTTP 404** on check |
| LinkedIn → `company/adani-group` | Should prefer **Adani Solar** company page (`/company/adani-solar`) once verified |
| Twitter `@AdaniOnline` | Works; official Solar handle `@AdaniSolar` also exists — NEEDS REVIEW which to use |
| Manufacturing route | Implemented; skeleton `isHomePage` list omits `manufacturing` (minor) |

---

## 7. Design system

- Tokens and layout patterns are established; **locked**.
- Implementation phase must **reuse** Header/Footer/Hero/sections — no new visual language, no decorative AI chrome, no new color/type scales.

---

## 8. Proposed change plan (awaiting approval to implement)

See section **Proposed fixes** below and detailed companion reports:

- `LINK_AUDIT.md`
- `MEDIA_AUDIT.md`
- `SEO_AUDIT.md`
- `CONTENT_AUDIT.md`
- `REDIRECT_REPORT.md` (planned redirects; none implemented yet)
- `ASSET_LICENSES.md` (template; assets not yet re-licensed/replaced)

### Phase A — Content hygiene (no redesign)

1. Rewrite awkward / AI-ish copy to professional enterprise tone.
2. Remove or fence **unsupported** stats, testimonials, partners, case studies, news claims.
3. Align capacity language with verified reference wording (vision vs current) pending client confirmation.
4. Improve CTAs and internal contextual links (About ↔ What We Do ↔ Why Solar ↔ Contact).

### Phase B — SEO within existing architecture

1. Fix `metadataBase` to real production URL (or configurable env).
2. Unique title + description map per hash route (extend router / head management carefully).
3. Add `public/sitemap.xml` (honest about SPA limitations) + Sitemap line in `robots.txt`.
4. Add Organization/WebSite JSON-LD only with **non-fabricated** fields.
5. Canonical for `/` ; document hash SEO limits.
6. Simple Design-System 404 for unknown hashes (or soft-404 page), not illustrated fluff.

### Phase C — Media compliance

1. Inventory every asset; mark Adani-sourced / AI / unknown as **LICENSE VERIFICATION REQUIRED**.
2. Replace with **commercially licensed** Unsplash/Pexels/Pixabay/Wikimedia (or client-provided) assets.
3. Download locally, optimize WebP/AVIF, update paths, fill `ASSET_LICENSES.md`.
4. Fix broken sustainability image paths; add real OG image locally.
5. Keep videos as non-hotlinked placeholders until licensed footage exists — do not scrape Adani video.

### Phase D — Links / routes

1. Retarget misleading `home` nav items to real sections/pages or create thin DS-compliant pages only if IA requires it.
2. Fix Media/Investors (`#`) — real destinations or remove until verified.
3. Fix YouTube / LinkedIn / Twitter to verified official profiles.
4. Record redirects in `REDIRECT_REPORT.md` if any path aliases are added.

### Phase E — Validation

1. `npm run lint` / `npm run build` / typecheck as available.
2. Manual route + link + media + a11y pass.
3. Update final reports with **what changed**.

---

## 9. Explicit non-goals

- No visual redesign / new design system
- No business-logic / auth / Prisma / env changes unless required for SEO URL config
- No inventing capacity, awards, partners, quotes, or certifications
- No hotlinking or watermarked stock

---

## 10. Gate

**Implementation has not started.**  
Proceed only after confirmation of this audit + proposed plan (especially: how to treat capacity numbers and invented testimonials/partners/case studies).
