# Prompt for Claude Design — full redesign of www.cstgtraining.com around the concept

Paste everything below the line into Claude Design and attach `cstg-platform-landing.html` (the concept). The current live site (www.cstgtraining.com) is only a reference for what exists today; the concept wins on content and color.

---

You are redesigning the complete marketing landing page of **The CSTG Growth Engine**, the platform behind **Can't Stop The Growth** (training, coaching and career mapping for HVAC, plumbing and electrical companies). The attached `cstg-platform-landing.html` is a rough concept and the **source of truth for copy, section order, and color tokens**. Your job is to turn it into a finished, production-grade page: sharper layout and hierarchy, a coherent motion language, three animated mini product screens in place of the screenshot placeholders, real responsive behavior, and a template for the two legal pages. Keep the messaging; elevate the execution. Then hand over an implementation package that replaces the current site files one for one.

## Hard constraints

- **Static, framework-free site** deployed as plain files on Vercel: `index.html`, one stylesheet, one small script, `privacy.html`, `terms.html`. No build step, no React, no Tailwind, no libraries, no Lottie or video, no external assets except Google Fonts (Archivo + Inter, already in the concept). Icons as inline SVG.
- **OAuth app-verification requirements** (Google and Microsoft review this page against the live app), non-negotiable:
  - The product name **Can't Stop The Growth** appears exactly like that, character for character, in the header wordmark, the hero, and the footer. "The CSTG Growth Engine" is the platform name and can be used in the H1 and title, but the app name must be present verbatim.
  - The page is public, requires no login, and describes what the product does.
  - A **Calendar sync section** must exist and be visible on load — not collapsed, not behind a tab. The concept omits it; add it (copy below). It must include the three-step connect flow and a "What calendar access is used for" transparency box.
  - Footer links to `privacy.html` and `terms.html` as same-origin relative links, plus a Support mailto.
  - No analytics, no cookie banner, nothing that sets a cookie.
- **Header CTAs**: `Member login` → `https://app.cstgtraining.com/login`; `Book a discovery call` → the Google Calendar appointment URL in the concept; plus a **temporary ghost button `Legacy app`** → `https://st.cstgtraining.com/` (users of the previous app still land here; mark it `<!-- TEMPORARY -->` so it is trivial to remove).
- Fix the concept's encoding artifacts (`Â·`, `Â©`) and never introduce mojibake.

## Visual system (from the concept; refine, do not replace)

- Tokens: `--ink #111820`, `--ink-2 #18222E`, `--crimson #B4142C`, `--crimson-dk #8A0F21`, `--paper #F6F4F1`, `--white`, `--steel #6E7F8F`, `--steel-lt #A8B6C2`, `--verified #1E7A5A` (light `#4FCB9B`), `--line rgba(255,255,255,.12)`, `--line-dk rgba(17,24,32,.14)`. Container 1120px. Radii 3–6px on panels; pills only for chips.
- Type: Archivo 600–800 for headings and big numbers (tight tracking, `-.02em`), Inter 400–600 for body and UI. Body 17px/1.6. Keep the concept's `clamp()` scale.
- Section rhythm: dark ink sections for the platform story, paper sections for proof and process, one white section for the verification thesis, crimson for the final CTA. Preserve that alternation; make the transitions feel deliberate (no two dark sections without a visual reason).
- Category accents from the real app, for chips and dots only, never large fills: Service `hsl(158,84%,34%)`, Sales `hsl(32,95%,44%)`, Leadership `hsl(251,60%,58%)`, Office `hsl(211,25%,42%)`, Install `hsl(357,60%,49%)`.
- The hero **skill ledger card** (`.ledger`, three-step rails, crimson = in progress, green = verified) is the product's signature visual. Reuse its language everywhere a skill or KPI state appears.
- Accessibility floor: 4.5:1 for all text, visible `:focus-visible`, 44px touch targets, semantic headings (one H1).

## Page structure and what each section needs

1. **Header** — sticky, ink at 96% with blur. Wordmark (crimson arrow mark + "Can't Stop The Growth"), nav (The platform, Career paths, Results, Calendar sync, Get started), then `Legacy app` (ghost, temporary), `Member login` (ghost), `Book a discovery call` (crimson). The concept hides nav links under 900px with no menu — design a real mobile menu (toggle, stacked links and buttons).
2. **Hero** — kicker "The platform behind Can't Stop The Growth", H1 and lede from the concept, two CTAs, the three trust notes, and the skill ledger card on the right. The card's rails should fill in on load (staggered), ending with the "Verified" step and the coach note.
3. **The platform** (dark) — the five tiles from the concept (Curriculum, Live, Career, Numbers, Coaching). Keep the asymmetric 2-2-2 / 3-3 grid idea, but make it feel designed rather than a table: tags, titles, one-line copy, thin inline icon.
4. **Four dashboards** (dark) — Technician / Manager / Coach / Owner, each with its one question. Consider a subtle horizontal reveal.
5. **Career paths** (`#paths`, paper) — H2, lede, role chips, then the **three animated vignettes** (spec below), each with its tag / title / one-liner on the left and the mini screen on the right (stacked on mobile).
6. **Verification thesis** (white) — "A finished course never fixed a bad call." with the Learned / Practiced / Verified stages.
7. **Results** (paper) — the two KPI groups. Numbers count up on enter.
8. **Calendar sync** (new; paper or ink, your call) — title "Your training schedule, on your own calendar." Copy: "Connect Outlook or Google Calendar with one click. The sessions you're enrolled in or invited to show up on the calendar you already live in, automatically, and they stay correct. Reschedule a cohort, rename a class or cancel a session in CSTG and the change lands on everyone's calendar within seconds." Three steps: `1 Connect — Open Settings → Calendar and pick Microsoft or Google.` `2 Approve on Microsoft's or Google's page — You grant access on their consent screen, never inside CSTG.` `3 Your sessions appear — Enrolled events populate immediately and keep syncing after that.` Transparency box "What calendar access is used for": `CSTG only creates, updates and removes the training events it puts on your calendar for you.` · `It does not read your other events, contacts or email.` · `You can disconnect anytime from Settings and the events it added are cleaned up.` · `You can also revoke access from your Microsoft or Google account at any time.` Include a small mock week calendar with CSTG-added events (category-colored dots) and two status pills: "Syncing" (green) and "Needs reconnect" (amber).
9. **How a company starts** (white) — three step cards (Discovery call, Business analysis, Membership) and the two CTAs.
10. **Final CTA** (crimson) — headline, copy, `Book a discovery call` (white on crimson) and `Member login` (ghost).
11. **Footer** (ink) — wordmark "Can't Stop The Growth", links: Learning & Development, About (both to cantstopthegrowth.com), Terms of Service (`terms.html`), Privacy Policy (`privacy.html`), Support (mailto). Bottom line: tagline, © 2026 Can't Stop The Growth, address 656 S. Graham Rd., Greenwood, IN 46143, email.

## Motion language — the "Xbox landing" feel, applied to the whole page

- Every section's content group fades and rises into place on enter (opacity 0→1, translateY 24px→0, 600ms, ease-out, children staggered 60–90ms) and fades back (opacity .25, scale .985) as it leaves in either direction. Driven by one IntersectionObserver with thresholds `[0, .35, .7, 1]`. No scroll-jacking, no sticky pinning, no parallax on text.
- One-shot sequences play when a block is ≥35% visible, hold their final state, and reset only after being fully out of view for 1s: hero ledger rails, results counters, the three vignettes.
- Counters use `requestAnimationFrame` with cubic ease-out. Only `transform` and `opacity` animate; nothing touches layout.
- `prefers-reduced-motion: reduce` → final states immediately, no counters, no cursors. With JavaScript disabled the page must be fully readable in its settled state.
- Zero layout shift: every animated container has a fixed aspect ratio or reserved height.

## The three vignettes (section 5) — faithful mini versions of real screens

Each sits in a light "app window": 28px chrome bar with three dots and a muted title (`app.cstgtraining.com · Company Settings` / `· Teams` / `· Reports`), then the screen. White surfaces on paper, `--line-dk` borders. Aspect 16:10 on desktop, 4:3 under 620px. Smallest text 12px desktop, 11px mobile. Root `role="img"` with a one-sentence `aria-label`; internals `aria-hidden`. All names and numbers fictional; keep the ones below so they match the hero card.

**V1 · Goals & career matrix ("Career mapping targets").** Grid: first column KPIs (`Close rate`, `Avg ticket`, `Options presented`, `Memberships sold`, `Turnovers`), then three tier columns per department (`Service`, `Sales`, `Install`) headed `Entry · Tier 2 · Master`. Trade tabs above: `HVAC` (active), `Plumbing`, `Electrical`. Empty cells show a faint "—". A small "Revenue and revenue goal" card with two inputs above the grid; `Save targets` button top-right. Animation: cells fill one by one as if typed (caret blinks, digits appear, soft crimson outline flash, settle), left to right then next row, 5–7 cells; a warning dot on the `Plumbing` tab disappears once its cells are filled (cut to that tab for the last two); ends with `Save targets` turning solid crimson and a check. ≈6s.

**V2 · Team cockpit ("Team map").** Header: `Service · North` and four counters: `needs attention 3`, `below target 2`, `no ride-along 1` (muted red/amber), `fully on target 6` (green). Roster table: `Name`, `Tier` chip (`Entry` / `Tier 2` / `Master`), `Close rate`, `Avg ticket`, `Memberships`, each value with a tiny up/down tick vs target, red when below. Six rows: `Marcus Reed`, `Tasha Ijeoma`, `Dev Patel`, `Ana Lucero`, `Jordan Kim`, `Ray Whitfield`. Animation: rows stagger in; a cursor moves to `Marcus Reed`, the row highlights, a detail panel slides in from the right (~45% width): name + `Service · Tech II`, card `Last 90 days` (three KPIs vs target), card `Ride-alongs` (`Mar 12 · Coach Dana · Verified: Diagnostic walkthrough`), `Placement` row (`Placed at Tier 2`, target `Master`), and a learned/practiced/verified skill rail. On replay the panel closes first. ≈7s.

**V3 · Performance and KPI report.** KPI strip of four tiles: `Avg ticket $1,240`, `Conversion rate 38%`, `Turnovers 12`, `Memberships sold 9`, each with a thin bar vs a `Target` marker. Below, a three-row per-technician table with the same KPIs and an empty `Prescribed classes` area. Animation: numbers count up with bars filling; `Conversion rate` lands at `31%` under its `38%` target, bar turns crimson with a `Below target` tag; `Tasha Ijeoma`'s row highlights on that KPI; `Prescribed classes` slides in with `Sales 204 · Presenting options without pressure` and `Sales 211 · Handling the price objection`, category dots, and an `Assigned to path` check that ticks in; footer line `Recommended intervention: ride-along with Coach Dana this week` fades in last. ≈6s.

## Legal pages

`privacy.html` and `terms.html` already have final copy (do not rewrite it). Design a **legal page template** in the new system: same header and footer as the landing, a title band, a sticky table of contents on desktop, comfortable reading measure (~70ch), `h2`/`h3` hierarchy, the highlighted "Limited use" quote blocks, and mobile behavior. Deliver it as `legal.css` plus the header/footer markup to drop into both files.

## Deliverables

1. **Canvas artboards**: the full landing at desktop (1120 container / 1440 viewport) and mobile (375), section by section; the mobile menu open state; motion storyboards (enter / mid / settled) for the hero ledger, the results counters and each vignette; the legal template at desktop and mobile.
2. **Implementation package**, ready to replace the current files: `index.html`, `landing.css`, `motion.js` (vanilla ES2018, IntersectionObserver + counters + vignette sequencers, ≤ 10KB unminified), `legal.css`, the header/footer snippet for the legal pages, and a `README.md` (install order, timing knobs as CSS custom properties `--m-dur` / `--m-stagger` and `data-motion` attributes, the OAuth-review checklist above, the no-JS and reduced-motion checks). Budget for the whole landing: CSS ≤ 40KB, JS ≤ 10KB, no images.
3. A short **decisions note**: anything you changed from the concept and why (layout, copy trims, section order), so it can be approved or reverted quickly.
