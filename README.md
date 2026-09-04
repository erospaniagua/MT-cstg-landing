# The CSTG Growth Engine — landing + legal pages

Static, framework-free. Deploy the folder at the site root (Vercel serves `main` at
www.cstgtraining.com). No build step, no dependencies, no analytics, nothing that sets a
cookie. Only external request: Google Fonts (Archivo + Inter).

## Files

| File | Purpose |
|---|---|
| `index.html` | the landing page — one H1, copy from the approved concept |
| `landing.css` | tokens, layout, motion, the three animated vignettes |
| `motion.js` | IntersectionObserver reveals, one-shot sequences, counters, mobile menu (no storage) |
| `privacy.html`, `terms.html` | legal pages on the same shell; the copy is the approved text, do not rewrite it |
| `legal.css` | legal template only; load **after** `landing.css` |
| `assets/` | brand images (see below) |
| `.well-known/microsoft-identity-association.json` | Azure publisher-domain verification |
| `docs/` | the Claude Design brief this page was built from |

Install order in `<head>`: fonts → `landing.css` → `legal.css` (legal pages only).
`motion.js` loads last, before `</body>`.

## Brand assets (`assets/`)

Generated with ImageMagick from the two originals in `assets/source/` (never served):

| File | Used for |
|---|---|
| `cstg-logo-white.png` (264×84, 3× of the 38px header height) | header and footer wordmark, `alt="Can't Stop The Growth"` |
| `cstg-arrow.png` (900px) | hero watermark (7% opacity, fades in on load), vignette window icon |
| `cstg-arrow-white.png` (720px) | watermark in the crimson final CTA |
| `favicon.ico` (48/32/16), `apple-touch-icon.png` (180, ink background) | browser and home-screen icons |
| `og-image.png` (1200×630) | link previews (`og:image`, Twitter summary_large_image) |

To regenerate after a logo change, re-run the `magick` commands in the git history of the
commit that added them (`-trim +repage` first, then resize).

## Timing knobs

CSS custom properties on `:root` in `landing.css`:

```css
--m-dur: 600ms;    /* section enter duration */
--m-stagger: 70ms; /* default child stagger */
--m-ease: cubic-bezier(.16,.72,.3,1);
```

Per-block overrides in markup:

- `data-motion` — marks a content group; its direct children fade + rise on enter, and fade to .25 / scale .985 on leave in either direction.
- `data-motion data-stagger="90"` — per-group stagger in ms (overrides `--m-stagger`).
- `data-seq` — one-shot sequence: plays at ≥35% visibility, holds its final state, resets only after being fully out of view for 1s. Used on the hero `.ledger`, both `.res-row` counter groups and the three `.vig` screens.
- `data-count="65"` on a number, with optional `data-delay`, `data-dur`, `data-group="1"` (thousands separators). Prefix/suffix are read from the element's own text, so the settled value is what ships in the HTML.
- Vignette beat timing lives in CSS: each animated element carries `style="--d:1.7s"` (its own delay); the fixed beats (tab cut 3.9s, warning dot 4.9s, save 5.3s; V2 panel 2.7s; V3 prescription 3.1s) are literal delays in the `.v1.play` / `.v2.play` / `.v3.play` rules near the end of `landing.css`.

## OAuth app-review checklist

- [x] Product name **Can't Stop The Growth** verbatim: header/footer logo `alt`, the hero kicker (visible text) and the footer line.
- [x] Platform name "The CSTG Growth Engine" used in `<title>` and meta description only.
- [x] Page is public, no login required, and describes what the product does.
- [x] **Calendar sync** section (`#calendar`) is visible on load — not collapsed, not tabbed — with the three-step connect flow and the "What calendar access is used for" transparency box. Header nav links to it.
- [x] Footer links `privacy.html` and `terms.html` as same-origin relative links, plus a Support mailto.
- [x] No analytics, no tag manager, no cookie banner, no cookies set. `motion.js` touches no storage.
- [x] Legal pages keep the Google API Services User Data Policy limited-use statement and the Microsoft equivalent, styled as quote blocks.
- [ ] Legal pages: fill in the registered entity type (`[ENTITY TYPE — e.g. LLC]`, once per page).
- [ ] Vercel answers `cstgtraining.com` with a 308 to `www.cstgtraining.com`. Microsoft's publisher-domain check does not follow redirects: set the publisher domain to `www.cstgtraining.com` or make the apex primary. Use the `www` URLs in the Google consent screen too.
- [ ] `.well-known/microsoft-identity-association.json` must list every Azure app registration that names this publisher domain (production AND staging).
- [ ] Retire the **Legacy app** button once `st.cstgtraining.com` is switched off.

## Temporary legacy-app button

Two anchors per page, both marked `<!-- TEMPORARY -->`: one in `.nav-cta`, one in
`#mobileMenu`. Delete the anchors; the `.btn-legacy` rule can stay or go.

## Editing the legal copy

Edit the `<article class="legal">` in `privacy.html` / `terms.html` directly. Every `<h2>`
needs an `id`; the table of contents at the top of each page is a plain list of those ids —
add or remove a line there when a section changes. Bump the `Effective …` date in the
title band.

## Checks before deploy

1. **No JavaScript** — every section renders in its settled state, ledger rails filled,
   counters at their final numbers, vignettes at their end frame.
2. **Reduced motion** — OS "reduce motion": no counters, no cursors, no rail fills; final
   states apply immediately.
3. **Layout shift** — every vignette window has a fixed aspect ratio (16:10, 4:3 under
   620px) and only `transform`/`opacity` animate; the two watermark images carry
   width/height attributes.
4. **Keyboard** — skip link, header CTAs, mobile toggle (Esc closes), nav anchors, all
   buttons show a crimson (white on dark) focus ring.
5. **Encoding** — files are UTF-8 with real `·`, `©`, `→`, `—` characters; if a deploy
   pipeline mangles them, check the `Content-Type` charset header.
