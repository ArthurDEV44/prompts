[PRD]
# PRD: Skills Page Design Overhaul

## Overview

The `/skills` page serves as the community skills catalog for Claude Craft. A comprehensive design review (comparing against professional references like Framer Marketplace, Curated Supply, Agently, and Claude Pricing) identified 8 priority areas for improvement across visual flow, information hierarchy, spacing, interactivity, and responsiveness.

This PRD covers a full design overhaul of the page while keeping the existing warm amber brand identity and Fumadocs/Base UI/Tailwind v4 stack.

## Goals

- Improve visual rhythm and spacing to match professional catalog standards (Framer Marketplace, Curated Supply)
- Create clear section transitions between hero and grid
- Make the filter/search bar more usable when browsing 35+ skills
- Elevate card design with hover effects, color accents, and better information hierarchy
- Add missing UX elements (footer CTA, result count, interactive install block)
- Ensure all changes work correctly in both light and dark mode

## Quality Gates

These commands must pass for every user story:
- `npm run build` - Next.js production build
- `npm run lint` - Linting

## User Stories

---

### US-001: Improve hero and grid spacing with section divider

**Description:** As a visitor, I want clear visual rhythm between the hero section and the skills grid so that the page doesn't feel like a wall of uniformly-spaced elements.

**Acceptance Criteria:**
- [x] Hero bottom margin increased from `mb-12` to `mb-16` in `app/(home)/skills/page.tsx`
- [x] A visual separator (subtle `<Separator />` or a thin gradient line) is added between the hero and the grid section
- [x] Grid container (`max-w-5xl`) has a section heading "Browse Skills" (`text-2xl font-semibold`) above the search input in `components/skills-grid.tsx`
- [x] Grid cards gap increased from `gap-4` to `gap-6` in `components/skills-grid.tsx`
- [x] Hero `py-16` top padding remains, but bottom padding is reviewed to create at least 80px of visual space before the grid
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"hero section spacing generous whitespace section divider"` to find professional spacing references. Also inspect pin `3582` (Claude Pricing) via `get_pin_details` for their spacing strategy, and pin `6669` (Agently) via `get_layout_data` for section transition patterns.
- **context7 `resolve-library-id`**: Resolve `fumadocs` then `query-docs` with `"Separator component styling and usage"` to understand the existing Separator primitive. Also query `"HomeLayout custom page spacing and sections"` to ensure changes work within the Fumadocs layout system.

---

### US-002: Make the install code block interactive with copy button

**Description:** As a developer, I want to copy the install command with one click so that I can quickly install all skills without manually selecting text.

**Acceptance Criteria:**
- [x] The install hint block in `app/(home)/skills/page.tsx` has a copy-to-clipboard button on the right side (reuse the `CopyButton` pattern from `components/skills-grid.tsx`)
- [x] The block has a hover state (`hover:border-primary/30`) to signal interactivity
- [x] The block background is changed from `bg-card` to a more contrasted treatment (e.g., `bg-secondary` or a left-border accent using `border-l-2 border-primary`)
- [x] The block width is increased from `max-w-lg` to `max-w-xl` for better prominence
- [x] The `$` prompt marker remains non-selectable (`select-none`)
- [x] Copy button shows "Copied" feedback state for 2 seconds (same as existing CopyButton behavior)
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"terminal command code block copy button dark"` for professional code block treatments. Inspect pin `1489` (Trigger.dev) via `get_pin_details` for their terminal-style install blocks.
- **context7 `resolve-library-id`**: Resolve `fumadocs` then `query-docs` with `"code block component copy button styling"` to check if Fumadocs has a built-in code copy component that could be reused. Also resolve `tailwindcss` and query `"bg-clip-padding border-l accent left border styling"`.

---

### US-003: Make tabs horizontally scrollable

**Description:** As a mobile/tablet user, I want the category tabs to scroll horizontally instead of wrapping to multiple lines so that the tab indicator animation works correctly and the layout stays clean.

**Acceptance Criteria:**
- [x] `TabsList` in `components/skills-grid.tsx` uses `overflow-x-auto` instead of `flex-wrap`
- [x] Scrollbar is hidden visually (add `scrollbar-hide` utility class or CSS `scrollbar-width: none; -ms-overflow-style: none; &::-webkit-scrollbar { display: none }`)
- [x] Tabs remain horizontally aligned on all screen widths without wrapping
- [x] The animated tab indicator (`TabsPrimitive.Indicator`) tracks correctly when scrolling
- [x] Tab counts are wrapped in parentheses for clearer parsing: `"Rust (12)"` instead of `"Rust 12"`
- [x] On mobile (< 640px), the tabs are still accessible via horizontal scroll/swipe
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"horizontal scrollable tabs filter bar category"` to see how professional sites handle tab overflow. Inspect pin `881` (Framer Marketplace) via `get_pin_details` for their category filter treatment.
- **context7 `resolve-library-id`**: Resolve `@base-ui/react` then `query-docs` with `"Tabs component horizontal scroll overflow indicator position"` to understand how the Base UI Tabs indicator behaves with overflow. Also resolve `tailwindcss` and query `"scrollbar hide utility overflow-x-auto"`.

---

### US-004: Add footer CTA after the grid

**Description:** As a visitor who scrolled through all 35 skills, I want a call-to-action at the bottom so that I have a clear next step (contribute, go to docs, or view on GitHub).

**Acceptance Criteria:**
- [x] A footer section is added below the `SkillsGrid` component in `app/(home)/skills/page.tsx`
- [x] The footer contains a centered block (`max-w-xl`, `text-center`) with:
  - A heading like "Want to contribute?" or "Build your own skill" (`text-xl font-semibold`)
  - A short description (`text-muted-foreground`)
  - Two buttons: primary "Create a Skill" linking to `/docs/skills/create-skill`, and outline "View on GitHub" linking to `GITHUB_REPO`
- [x] Spacing above the footer is at least `mt-16` to separate from the grid
- [x] The section has a subtle visual distinction (e.g., a top separator or lighter background)
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"footer call to action contribute open source community"` for professional footer CTA patterns. Also inspect pin `1903` (Penpot) via `get_pin_details` — as an open-source tool, their CTA patterns are directly relevant.
- **context7 `resolve-library-id`**: Resolve `fumadocs` then `query-docs` with `"HomeLayout footer section custom content below main"` to ensure the footer CTA works correctly within the Fumadocs HomeLayout structure.

---

### US-005: Add card hover lift and category color accent

**Description:** As a visitor browsing skills, I want subtle hover animations and a visual color accent per category so that cards feel interactive and I can scan categories at a glance.

**Acceptance Criteria:**
- [x] Cards have a gentle lift on hover: `group-hover:-translate-y-0.5` added to the `<Card>` element in `components/skills-grid.tsx`
- [x] Each card has a thin colored top border (2px) matching the category color from `categoryMeta[skill.category].color` (extract the bg color and apply as `border-t-2`)
- [x] The existing hover border (`group-hover:border-primary/40`) and shadow (`group-hover:shadow-md`) are kept
- [x] The `transition-all duration-200` on cards is updated to include `transform` for smooth lift animation
- [x] The Badge component position remains in the CardHeader but the colored top border provides redundant category signaling
- [x] All 7 category colors (orange, blue, violet, cyan, emerald, red, neutral) render correctly on the top border
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"card grid hover lift animation shadow category color"` for professional card hover treatments. Inspect pin `4063` (Curated Supply) via `get_pin_details` — they use Geist font (same as this project) with category color accents on cards.
- **fontofweb `batch_color_operations`**: Use `contrast` operations to verify each category color has sufficient contrast against the card background in both light mode (`#edebe6` approx) and dark mode (`#181714` approx). Test all 7 colors: orange-500, blue-500, violet-500, cyan-500, emerald-500, red-500, neutral-500.
- **context7 `resolve-library-id`**: Resolve `tailwindcss` then `query-docs` with `"border-t color dynamic className conditional styling"` to find the right approach for dynamic top border colors from a data attribute or className.

---

### US-006: Add sticky filter bar for search and tabs

**Description:** As a visitor scrolling through 35+ skills, I want the search input and category tabs to stick to the top of the viewport so that I can filter without scrolling back up.

**Acceptance Criteria:**
- [x] The search + tabs container in `components/skills-grid.tsx` becomes sticky: `sticky top-14` (where `14` = 56px, the Fumadocs navbar height, adjust if different)
- [x] The sticky container has a background matching the page background (`bg-background`) to cover cards scrolling behind it
- [x] A subtle bottom border or shadow appears when the bar is stuck (`shadow-sm` or `border-b`) to distinguish it from page content
- [x] The sticky bar uses `z-10` to stay above card content
- [x] Padding is adjusted so the sticky state doesn't cause layout shift
- [x] The sticky behavior works correctly on mobile (iOS Safari scroll handling)
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"sticky search bar filter scroll navigation"` for professional sticky filter implementations. Inspect pin `881` (Framer Marketplace) via `get_pin_details` for their sticky filter approach on their marketplace page.
- **context7 `resolve-library-id`**: Resolve `fumadocs` then `query-docs` with `"navbar height CSS variable sticky positioning below nav"` to find the exact navbar height value/CSS variable to use for the `top` offset. Also resolve `tailwindcss` and query `"sticky top offset z-index backdrop blur"`.

---

### US-007: Show skill title as primary label with name as secondary

**Description:** As a visitor, I want to see human-readable skill titles (e.g., "Rust Async") as the primary heading and the package name (e.g., `rust-async`) as secondary info so that the grid is easier to scan.

**Acceptance Criteria:**
- [x] The `scripts/sync-skills.mjs` script is updated to ensure `title` is a properly formatted human-readable name (not just capitalizing each word — e.g., "TanStack Query" not "Tanstack Query", "SeaORM" not "Seaorm")
- [x] `lib/skills-data.ts` regenerated with corrected titles
- [x] In `components/skills-grid.tsx`, `CardTitle` displays `skill.title` instead of `skill.name`
- [x] `skill.name` is shown below the title in small mono text: `<p className="font-mono text-xs text-muted-foreground">{skill.name}</p>`
- [x] Search still matches against both `skill.title`, `skill.name`, and `skill.description`
- [x] The card layout remains balanced with the added secondary text
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"card title subtitle monospace package name label"` for professional card title/subtitle hierarchy patterns.
- **context7 `resolve-library-id`**: Resolve `next.js` then `query-docs` with `"scripts node.js file generation data sync"` to understand patterns for the sync script modification. Also resolve `tailwindcss` and query `"font-mono text-xs muted secondary label styling"`.

---

### US-008: Add result count when filtering

**Description:** As a visitor using search or category filters, I want to see how many skills match my current filter so that I know the scope of results at a glance.

**Acceptance Criteria:**
- [x] A result count line is displayed between the tabs and the card grid in `components/skills-grid.tsx`
- [x] Format: `"Showing {filtered.length} of {skills.length} skills"` when a filter is active (search non-empty OR tab !== "all")
- [x] When no filter is active (search empty AND tab === "all"), the count is hidden to avoid redundancy
- [x] The count uses `text-sm text-muted-foreground` styling
- [x] The count updates reactively as the user types in search or switches tabs
- [x] When the count is 0 (no results), it's hidden in favor of the existing "No skills found" empty state
- [x] Light and dark mode both render correctly

**MCP References for Implementation:**
- **fontofweb `search_design_inspiration`**: Search `"search results count filter showing N of total"` for professional result count patterns. Inspect pin `881` (Framer Marketplace) via `get_pin_details` for how they display result counts on their marketplace.
- **context7 `resolve-library-id`**: Resolve `@base-ui/react` then `query-docs` with `"Tabs panel content conditional rendering dynamic children"` to ensure the result count integrates well within the Base UI Tabs structure.

---

## Functional Requirements

- FR-1: All changes must work within the Fumadocs `HomeLayout` wrapper without conflicting styles
- FR-2: The warm amber color palette (`--primary: 30 60% 50%`) must remain the dominant brand color
- FR-3: All 7 category badge colors must remain distinguishable and accessible in both themes
- FR-4: The `CopyButton` behavior (clipboard API + 2s feedback) must be consistent across both the install block and individual skill cards
- FR-5: The sticky filter bar must not overlap or conflict with the Fumadocs navbar
- FR-6: Card hover effects must not cause layout reflow (use `transform` not margin/padding changes)
- FR-7: The sync script changes (US-007) must be backwards-compatible — running `npm run sync-skills` should regenerate `lib/skills-data.ts` without breaking existing functionality
- FR-8: All text must maintain WCAG AA contrast ratios in both light and dark mode

## Non-Goals (Out of Scope)

- Entrance/scroll animations (staggered fade-in on cards) — potential future enhancement
- Keyboard shortcut (`/` to focus search) — potential future enhancement
- Category descriptions when selecting a tab — potential future enhancement
- Redesigning the homepage (`app/(home)/page.tsx`) — separate effort
- Adding new data fields beyond fixing `title` formatting (e.g., no tags, no icons per skill)
- Changing the Fumadocs navbar or global layout structure
- Mobile-specific tab redesign (horizontal scroll is sufficient)

## Technical Considerations

- **Stack**: Next.js 15 + React 19 + Fumadocs UI 15 + Base UI React 1.2 + Tailwind CSS v4 + Geist Sans/Mono + CVA
- **Component library**: UI primitives are in `components/ui/` using Base UI + CVA pattern (coss-ui style)
- **CSS variables**: Custom theme in `app/global.css` using HSL with `hsl(var(--token))` pattern
- **Auto-generated data**: `lib/skills-data.ts` is generated by `scripts/sync-skills.mjs` — changes to skill data structure require updating both files
- **Fumadocs navbar height**: Verify exact height for sticky offset — typically 56px (`3.5rem`) but check `fumadocs-ui` source
- **Dark mode**: Uses `.dark` class variant via `@custom-variant dark (&:is(.dark *))` in Tailwind v4

## Success Metrics

- All 8 user stories pass quality gates (`npm run build && npm run lint`)
- Page visual hierarchy clearly separates hero, filter bar, and grid sections
- Cards are scannable by category via color accents without reading badges
- Install command is copyable in one click from the hero section
- Filter bar remains accessible while scrolling through 35+ skill cards
- No regression in light/dark mode rendering

## Open Questions

- Exact Fumadocs navbar height for sticky offset — needs verification at implementation time (US-006)
- Whether `scripts/sync-skills.mjs` has access to the original skill YAML/MD for proper title casing or needs manual overrides (US-007)
[/PRD]
