# Can't Stop The Growth — landing page implementation package

Static, framework-free. Four HTML files, two stylesheets, no build step, no dependencies
except Google Fonts (Inter) over CDN.

```
cstg-landing-package/
├── index.html      — the landing page (was site/landing.html)
├── landing.css     — landing page styles (the only CSS index.html needs)
├── privacy.html    — existing legal page
├── terms.html      — existing legal page
└── site.css        — styles for privacy.html + terms.html only
```

Deploy: upload the folder to any static host (S3+CloudFront, Netlify, Vercel, Nginx,
GitHub Pages). No server-side anything. `index.html` must be reachable **publicly,
without login**, at the domain listed on the OAuth consent screen.

## Requirements checklist (Google / Microsoft review)

- App name renders exactly as **Can't Stop The Growth** in the header, hero `<h1>`,
  `<title>` and footer. It must match the OAuth consent screen string character for
  character — if the consent screen says something else, change it here, not there.
- The calendar section (`#calendar`) is the reviewed feature: what is synced, the
  3-step consent flow, and the "What calendar access is used for" transparency box.
  Do not remove or collapse it behind an interaction — reviewers must see it on load.
- Footer links to Privacy Policy and Terms of Service resolve to same-origin pages.
- Support email `danny@cantstopthegrowth.com` appears in the footer and closing CTA.
- Before submitting: publish the same links your OAuth application record uses
  (homepage, privacy policy URL, terms URL) and confirm each returns 200 anonymously.

## Configuration points

| What | Where |
|---|---|
| Login / signup URL | `https://app.cstgtraining.com/login` — 3 `<a href>` in `index.html` |
| Legacy (ST) app link — TEMPORARY | `https://st.cstgtraining.com/` — the "Legacy app" ghost button next to "Get started" in the header nav; remove once the old app's users have moved |
| Support email | `danny@cantstopthegrowth.com` — footer + "Talk to us" CTA |
| Address, © year | footer `.foot-bottom` |
| Nav anchors | `#platform`, `#calendar` + `privacy.html`, `terms.html` |

## Design tokens (`landing.css` `:root`)

- Type: **Inter** 400/500/600/700/800. Headings `font-weight:700`, `letter-spacing:-.025em`
  (hero `-.04em`). Body 15px / 1.65.
- Neutrals: white base, `--s900:#0f172a` headings, `--s500:#64748b` body,
  `--s200:#e2e8f0` borders. Cards `--r-lg:16px`, `--shadow-sm` / `--shadow-lg`.
- Primary: `--blue:#2563eb`, hover `#1d4ed8`.
- Category accents (chips, dots, calendar events only — never large fills):
  `--service` `hsl(158,84%,34%)` · `--sales` `hsl(32,95%,44%)` ·
  `--leadership` `hsl(251,60%,58%)` · `--office` `hsl(211,25%,42%)` ·
  `--install` `hsl(357,60%,49%)`.
- Status pills: `.pillstat.ok` emerald "Syncing", `.pillstat.warn` amber "Needs reconnect".
- Icons: inline lucide-style line SVGs, class `.i` (18px, `stroke-width:1.6`,
  `stroke:currentColor`). Swap for the real lucide sprite if the app already ships one.

## JavaScript (one inline IIFE at the bottom of `index.html`, ~10 lines)

1. Mobile nav toggle (`#navToggle` → `.nav.open`, sets `aria-expanded`, closes on link tap).
2. `.head.stuck` border/shadow once `scrollY > 8`.
3. `IntersectionObserver` adds `.in` to every `.reveal` element once, at 15% visibility.

All motion is CSS. `.reveal` drives the section fade-up (stagger via inline
`--rd`), the hero progress bars (`--w` widths), and the calendar events dropping in
(stagger via inline `--d`). Everything is disabled under
`@media (prefers-reduced-motion: reduce)`. No JS = page still fully readable except the
reveal classes never fire — if you need a hard no-JS guarantee, add
`<noscript><style>.reveal{opacity:1;transform:none}</style></noscript>` to `<head>`.

## Responsive

- ≤960px: hero and calendar sections stack to one column; feature grid → 2 columns;
  the mock calendar stops being sticky.
- ≤720px: nav collapses to the toggle; feature grid → 1 column; mock calendar drops
  Thursday/Friday columns (`.cal-grid .hd:nth-child(n+5)`), stats → 2 columns.

## Accessibility notes

- Nav toggle carries `aria-expanded` / `aria-controls`; decorative SVGs are unlabeled
  inline and non-focusable.
- Body text is `--s500` on white (7.0:1); the `.eyebrow` blue on white is 5.9:1.
  Keep `--s400` for supporting metadata only, never body copy.
- Add `:focus-visible` outlines if your app's global stylesheet does not already
  provide them — this file relies on the browser default.

## Known gaps / decisions for you

- **Style split.** `index.html` is the new light SaaS system; `privacy.html` and
  `terms.html` still use the original navy CSTG brand (`site.css`). They work and link
  correctly, but a reviewer sees two visual languages. Say the word and the legal pages
  get restyled onto `landing.css`.
- Legal copy: every `[BRACKET]` placeholder was resolved on 2026-09-04 except the registered
  **entity type** (`[ENTITY TYPE — e.g. LLC]`, once per page). Defaults chosen that deserve a
  legal read: Indiana law / Johnson County venue, no arbitration clause, 12-month liability cap,
  30-day post-termination export window, no uptime commitment.
- **Apex redirects to www.** Vercel answers `cstgtraining.com` with a 308 to
  `www.cstgtraining.com`. Microsoft's publisher-domain check does not follow redirects, so
  either set the publisher domain to `www.cstgtraining.com` or make the apex the primary
  domain in Vercel. Use the `www` URLs in the Google consent-screen fields as well.
- `.well-known/microsoft-identity-association.json` lists ONE application id; every Azure app
  registration that names this publisher domain (production AND staging) must be in the array.
- No analytics, cookie banner, or forms are included — nothing on this page sets a
  cookie or collects data, which keeps the review surface small. Adding analytics means
  updating the privacy policy's technical-data section.
- Content in the mock dashboard and mock calendar is illustrative (names, percentages,
  session titles). It is clearly product chrome, not claimed customer data — but if you
  prefer, swap the names for generic role labels.
