# Samuel Paluba Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved English profile-first portfolio for Samuel Paluba at `paluba.me`.

**Architecture:** Keep the existing Astro + EmDash site. Store launch content in `seed/seed.json`, keep content pages server-rendered, and reshape the homepage into a profile-first layout with current-focus tiles and selected work.

**Tech Stack:** Astro 7, EmDash 0.24, TypeScript/Astro components, SQLite-backed EmDash seed data, pnpm.

---

## File Structure

- Modify `seed/seed.json`: source of truth for site settings, About page copy, projects, project links, media URLs, and taxonomy labels.
- Modify `src/pages/index.astro`: profile-first homepage hero, Gravatar portrait, current-focus tiles, values teaser, selected projects.
- Modify `src/pages/work/index.astro`: update work-page copy to match launch positioning.
- Modify `src/pages/contact.astro`: update contact links and remove any phone exposure.
- Modify `src/pages/about.astro`: keep CMS rendering and align sidebar "currently" copy with no-Notes launch scope.
- Modify `src/pages/rss.xml.ts`: align fallback RSS title/description with personal portfolio language.
- Optionally modify `src/styles/theme.css`: only if final visual check shows the current variables need small overrides.

## Task 1: Update Seed Content

**Files:**
- Modify: `seed/seed.json`

- [ ] **Step 1: Update settings and About copy**

Set `settings.title` to `Samuel Paluba` and set `settings.tagline` to:

```text
Cybersecurity student and software builder in Prague, building ThinkHome and practical tools around IT infrastructure, AI workflows, education systems, and open technology.
```

Replace the `pages.about.data.content` portable-text blocks with four paragraphs:

```text
I am a cybersecurity student based in Prague, Czech Republic, and the founder of ThinkHome. I build practical software, IT infrastructure, AI tooling, and education-system experiments around real problems instead of abstract demos.

ThinkHome is my main current focus: a Prague-based IT company built around taking responsibility for business technology, internal tools, training, and custom software so teams can spend less time dealing with vendors, outages, and configuration issues.

My school projects are often a sandbox for improving ThinkHome's services and internal tooling. Public work includes Apple-platform apps, API documentation, AI assistant skills, SDKs, and infrastructure experiments.

I care about open software and hardware, Bitcoin, decentralized systems, and digital freedom. I prefer technology that gives people more agency over closed platforms, unnecessary control, and systems that make practical work harder.
```

- [ ] **Step 2: Update project set**

Seed these seven `projects` entries with published status and real public URLs:

```text
thinkhome -> https://thinkhome.cz
inzenyri -> https://github.com/SamuelPalubaCZ/inzenyri
bakalari-api-skill -> https://github.com/SamuelPalubaCZ/bakalari-api-skill
ollama-collab-api -> https://github.com/SamuelPalubaCZ/OllamaCollabApi
isds-bun -> https://github.com/thinkhome-org/isds-bun
fakturoid-typescript-api -> https://github.com/thinkhome-org/fakturoid-typescript-api
csob-ceb-bc -> https://github.com/thinkhome-org/csob-ceb-bc
```

Use these project areas:

```text
ThinkHome: Company
Inzenyri: Apple platforms
Bakalari API Skill: AI tooling
OllamaCollabApi: AI infrastructure
ISDS Bun: TypeScript SDK
Fakturoid TypeScript API: TypeScript SDK
CSOB CEB Business Connector: Python SDK
```

- [ ] **Step 3: Run JSON validation**

Run:

```bash
python3 -m json.tool seed/seed.json >/tmp/paluba-seed.json
```

Expected: command exits `0` with no output.

## Task 2: Build Profile-First Homepage

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Keep existing EmDash query pattern**

Keep this data-loading shape:

```astro
const [settings, { entries: featuredProjects, cacheHint }] = await Promise.all([
	getSiteSettings(),
	getEmDashCollection("projects", {
		orderBy: { published_at: "desc" },
		limit: 4,
	}),
]);

if (Astro.cache?.enabled) Astro.cache.set(cacheHint);
```

- [ ] **Step 2: Set profile constants**

Use this Gravatar URL and current focus data:

```ts
const profileImage =
	"https://0.gravatar.com/avatar/f82d12d78b7a65404663d5091762be0c44c638a8b0c2be16c8a86d6140ec0ef5?size=512";

const focusItems = [
	{
		label: "ThinkHome",
		text: "Building practical IT management, training, and custom software for small and medium-sized businesses.",
	},
	{
		label: "AI tooling",
		text: "Packaging repeatable assistant workflows, API knowledge, and local-model experiments into useful tools.",
	},
	{
		label: "Education systems",
		text: "Exploring cleaner software around Bakalari and other Czech school-system workflows.",
	},
	{
		label: "Open systems",
		text: "Working around open software, hardware, Bitcoin, decentralized systems, and digital freedom.",
	},
];
```

- [ ] **Step 3: Replace homepage markup**

Render sections in this order:

```text
hero -> current-focus -> featured projects -> values teaser
```

Hero copy:

```text
Prague / Cybersecurity / Open tech
Samuel Paluba
Cybersecurity student and software builder in Prague, building ThinkHome and practical tools around IT infrastructure, AI workflows, education systems, and open technology.
```

Hero actions:

```text
View work -> /work
Contact -> /contact
```

Values teaser copy:

```text
I care about open software and hardware, Bitcoin, decentralized systems, and digital freedom. The common thread is practical technology that gives people more agency, not less.
```

- [ ] **Step 4: Update homepage CSS**

Implement responsive CSS with these rules:

```text
Desktop hero: two columns, portrait left, copy right.
Mobile hero: single column, portrait before copy.
Portrait: square aspect ratio, 8px radius, 1px border, object-fit cover.
Focus tiles: four-column desktop grid, two-column medium grid, one-column mobile grid.
No viewport-scaled font sizes.
No gradients, decorative blobs, or nested cards.
```

## Task 3: Align Work, About, Contact, and RSS Copy

**Files:**
- Modify: `src/pages/work/index.astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/rss.xml.ts`

- [ ] **Step 1: Update work page copy**

Use:

```text
Work
Public projects, tools, and experiments.
A compact view of software, AI tooling, SDKs, infrastructure experiments, and education-system work connected to Samuel Paluba and ThinkHome.
```

- [ ] **Step 2: Update About sidebar**

Set the `Currently` aside text to:

```text
Building ThinkHome, shipping public tools, and using school projects as a practical sandbox for software, infrastructure, and AI workflows.
```

- [ ] **Step 3: Update contact links**

Use these links in this order:

```text
Email -> samuel.paluba@thinkhome.org -> mailto:samuel.paluba@thinkhome.org
GitHub -> SamuelPalubaCZ -> https://github.com/SamuelPalubaCZ
LinkedIn -> samuel-paluba -> https://www.linkedin.com/in/samuel-paluba
X -> @PalubaSamuel -> https://x.com/PalubaSamuel
ThinkHome -> thinkhome.cz -> https://thinkhome.cz
Gravatar -> samuelpaluba.link -> https://samuelpaluba.link
```

Use this contact heading:

```text
Start with email.
```

Use this contact body:

```text
For projects, collaboration, questions, or a quick introduction, email is the best place to start. I am most interested in practical software, IT infrastructure, AI tooling, education systems, and open technology.
```

- [ ] **Step 4: Update RSS fallback copy**

Use fallback title `Samuel Paluba` and fallback description:

```text
Public projects and experiments by Samuel Paluba.
```

## Task 4: Verify and Inspect

**Files:**
- Read/verify only unless fixes are required.

- [ ] **Step 1: Install dependencies if needed**

Run:

```bash
pnpm install
```

Expected: dependencies install successfully or lockfile is already up to date.

- [ ] **Step 2: Typecheck**

Run:

```bash
pnpm typecheck
```

Expected: Astro check completes without TypeScript errors.

- [ ] **Step 3: Build**

Run:

```bash
pnpm build
```

Expected: server build completes successfully.

- [ ] **Step 4: Run local dev server**

Run:

```bash
pnpm dev -- --host 127.0.0.1
```

Expected: local URL is printed and site serves.

- [ ] **Step 5: Browser inspection**

Inspect:

```text
/
/work
/work/thinkhome
/about
/contact
```

Expected:

```text
Hero portrait loads from Gravatar.
No phone number appears in rendered text.
Homepage is profile-first on desktop and mobile.
Text does not overlap or overflow on mobile.
Project images render as actual images.
Contact links include email, GitHub, LinkedIn, X, ThinkHome, and Gravatar.
```
