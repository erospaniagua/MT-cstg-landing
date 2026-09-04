# Decisions note — landing v2 (2026-09-04)

What changed from the approved concept (`cstg-platform-landing.html`) and from the
Claude Design package, and why. Nothing in the approved messaging was rewritten.

## Added

1. **Calendar sync section** (`#calendar`, ink) — required by the Google/Microsoft OAuth
   review. Copy exactly as on the previous site. Placed between Results and "How a company
   starts": after the proof, before the sales ask. Rendered on ink so the transparency box
   (green rule) reads as a system statement, not marketing.
2. **Mobile menu** — the concept hid nav links under 900px with no replacement. Real
   toggle, stacked links, all three CTAs, Esc to close, 48px rows.
3. **Legacy app** ghost button in the header and the mobile menu, both marked
   `<!-- TEMPORARY -->`.
4. **Three animated vignettes** replacing the screenshot placeholders, plus a small grey
   line under each headline naming where the screen lives in the app
   ("Company Settings → Career mapping. Example data.").
5. **Skip link** and `role="img"` + one-sentence `aria-label` on each vignette, with
   internals hidden from assistive tech.
6. **Brand assets** (`assets/`): the real CSTG logo (arrow + "CSTG" wordmark, white on ink)
   replaces the concept's inline arrow-plus-text mark in the header and footer; the red
   arrow is a 7% watermark behind the hero, a tiny window icon in each vignette's chrome
   bar and, in white, a watermark in the crimson final CTA; favicon, apple-touch-icon and
   an Open Graph image were generated from the same source files.
7. Footer links `terms.html` / `privacy.html` relatively — the review requires
   same-origin links.

## Changed

8. Because the logo wordmark reads "CSTG", the verbatim app name **Can't Stop The Growth**
   is carried by visible text in the hero kicker and the footer line, and by the logo's
   `alt`. "The CSTG Growth Engine" stays in `<title>` and meta only.
9. **Calendar sync** added to the nav, so the nav is five items.
10. **Section rhythm**: platform tiles and the four dashboards are one continuous ink field
    split by a hairline rule. Verification thesis and "How a company starts" are white;
    Career paths and Results are paper; final CTA crimson.
11. **Tiles** gained a thin inline icon and an uppercase tag; the 2-2-2 / 3-3 grid is
    unchanged. Hover lifts the tile to `--ink-2`.
12. **Role chips** carry the app's category dots — accent colours appear only as dots and
    chips, never as fills.
13. **Hero trust notes** sit below a hairline rule with crimson dots.
14. **Results** gained a one-line source note ("Averages across participating
    companies…") — new copy, deletable.
15. **Legal pages**: the package shipped the *old* legal copy (placeholders, wrong app
    domain, three brand-name variants). Discarded; the approved copy from `main` (PR #1)
    was re-templated onto the new shell by script, table of contents generated from the
    `h2` ids. One placeholder remains by design: the registered entity type.
16. Encoding artefacts from the package (`Â·`, `â`) replaced with real `·`, `©`, `→`, `—`,
    `▴`, `▾`; all files are clean UTF-8.

## Motion

17. One IntersectionObserver, thresholds `[0,.35,.7,1]`. Content groups fade/rise in and
    fade back on leave; one-shot sequences (ledger, counters, vignettes) play at 35%
    visibility, hold, and reset 1s after being fully out of view. No scroll-jacking, no
    pinning, no parallax. Only `transform` and `opacity` animate.
18. Vignette choreography is CSS-driven (delays per element); JS only toggles a `.play`
    class and runs counters, so every beat is editable without touching JS.

## Deliberately not done

19. No hero screenshot carousel, no logo wall, no pricing table — nothing was invented
    that the concept did not claim.
20. `site.css` from the previous site is superseded by `landing.css` + `legal.css` and
    was deleted.
