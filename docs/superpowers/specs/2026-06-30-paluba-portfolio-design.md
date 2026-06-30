# Samuel Paluba Portfolio Design

Date: 2026-06-30
Site: paluba.me
Project: `my-site` Astro + EmDash portfolio

## Goal

Build an English personal portfolio for Samuel Paluba at `paluba.me`.

The site should work as a profile-first credibility hub with a visible values layer. It should introduce Samuel as a Prague-based cybersecurity student and software builder, show current focus areas, and point visitors to concrete public work. It should not launch as a ThinkHome sales page or as a full digital garden.

## Source Material

Use public source material for launch copy and links:

- `https://samuelpaluba.link` as the Gravatar/profile source for portrait, profile description, email, and values language.
- `https://github.com/SamuelPalubaCZ` for public personal projects.
- `https://github.com/thinkhome-org` for public ThinkHome organization work.
- Existing project seed content in `seed/seed.json`.

Do not publish the phone number exposed by Gravatar unless Samuel explicitly approves it later.

## Positioning

The homepage should lead with Samuel as a person:

- Samuel Paluba
- Prague, Czech Republic
- Cybersecurity student
- Software builder
- Founder/building ThinkHome
- Practical IT infrastructure, custom software, AI tooling, education systems, open technology

Values should be explicit but not dominate the page:

- Open software and hardware
- Bitcoin and decentralized systems
- Digital freedom
- Preference for practical technology over closed platforms and unnecessary control

The voice should be direct, specific, and grounded in current work. Avoid generic portfolio copy.

## Launch Scope

Launch pages:

- Home
- Work
- Project detail pages
- About
- Contact

Not in launch scope:

- Notes / digital garden section
- Blog/RSS expansion beyond the existing project RSS
- Legal/company registry detail pages
- Phone contact
- Custom admin plugins

The homepage can include a "Now" or "Current focus" section to make the site feel alive without creating a notes system.

## Information Architecture

Primary navigation:

- Work
- About
- Contact

Homepage structure:

1. Profile-first hero with Gravatar portrait.
2. Short positioning paragraph.
3. Primary actions: view work and contact.
4. Current focus tiles, such as ThinkHome, AI tooling, education systems, open systems.
5. Selected work grid.
6. Short values/about teaser linking to About.

Work page:

- Compact introduction.
- Grid of public projects.
- No heavy filtering unless the existing taxonomy UI already supports it cleanly.

About page:

- Longer bio.
- Stronger values language than the homepage.
- Clear relationship between school projects, ThinkHome, open tech, and practical software.

Contact page:

- Email first.
- Include GitHub, LinkedIn, X, ThinkHome, and Gravatar/profile links.
- No phone number for launch.

## Content Model

Keep the existing EmDash collections:

- `projects`
- `pages`

Keep project data in `seed/seed.json` for launch. Use the CMS/admin later for editing.

Initial project set:

- ThinkHome
- Inzenyri
- Bakalari API Skill
- OllamaCollabApi
- ISDS Bun
- Fakturoid TypeScript API
- CSOB CEB Business Connector

Project fields should remain:

- `title`
- `featured_image`
- `client` / area
- `year`
- `summary`
- `content`
- `url`

Use real public project URLs. Placeholder images are acceptable only where there is no better public asset, but the hero portrait should use the Gravatar image from `samuelpaluba.link`.

## Visual Direction

Use the existing EmDash portfolio template voice:

- Editorial and restrained.
- Near-monochrome palette.
- Typography-led layout.
- Minimal decoration.
- Real portrait as the key visual signal.

The chosen homepage direction is "Personal profile first":

- Portrait and name are first-viewport signals.
- Projects sit just below the introductory/current-focus layer.
- Values are visible in copy, not as a separate manifesto hero.

Avoid:

- Gradients and decorative blobs.
- Marketing-style hero sections.
- Generic "welcome to my portfolio" language.
- Overpacking the homepage with every project.

## Technical Design

Use the existing `my-site` Astro + EmDash project.

Primary implementation files:

- `seed/seed.json`: settings, about copy, project entries, images, links, taxonomy labels.
- `src/pages/index.astro`: profile-first hero, current focus tiles, selected work.
- `src/pages/about.astro`: keep CMS-driven page rendering.
- `src/pages/contact.astro`: contact links and copy.
- `src/styles/theme.css`: small color and spacing overrides only when the current layout needs them after implementation.

Follow EmDash rules already documented in `AGENTS.md`:

- Pages stay server-rendered.
- Use EmDash image objects correctly.
- Call `Astro.cache.set(cacheHint)` on queried pages.
- Keep `entry.id` and `entry.data.id` distinct.
- Verify EmDash APIs through the docs MCP when API or config details are uncertain.

## Verification

Run:

- `pnpm install` if dependencies are missing.
- `pnpm typecheck`
- `pnpm build`
- `pnpm dev` or `npx emdash dev` for visual inspection.

Inspect:

- Home desktop and mobile.
- Work index.
- At least one project detail page.
- About.
- Contact.

Check:

- Hero portrait loads.
- Text does not overlap or overflow on mobile.
- Project images render as images, not `[object Object]`.
- Public links open correctly.
- No phone number is exposed.

## Open Decisions

None blocking for implementation. If better portrait photography is provided later, replace the Gravatar image without changing the layout.
