import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const seed = JSON.parse(await readFile(new URL("../seed/seed.json", import.meta.url), "utf8"));
const homePage = await readFile(new URL("../src/pages/index.astro", import.meta.url), "utf8");
const contactPage = await readFile(new URL("../src/pages/contact.astro", import.meta.url), "utf8");

const textFromBlocks = (blocks) =>
	blocks
		.flatMap((block) => block.children?.map((child) => child.text) ?? [])
		.join("\n");

test("portfolio launch content uses approved profile-first positioning", () => {
	assert.equal(seed.settings.title, "Samuel Paluba");
	assert.match(seed.settings.tagline, /Cybersecurity student and software builder in Prague/);
	assert.match(homePage, /f82d12d78b7a65404663d5091762be0c44c638a8b0c2be16c8a86d6140ec0ef5/);
	assert.match(homePage, /Open systems/);
	assert.match(homePage, /digital freedom/);
});

test("portfolio launch seed includes approved public project set", () => {
	const projects = new Map(seed.content.projects.map((project) => [project.slug, project]));
	const expectedProjects = [
		["thinkhome", "https://thinkhome.cz"],
		["inzenyri", "https://github.com/SamuelPalubaCZ/inzenyri"],
		["bakalari-api-skill", "https://github.com/SamuelPalubaCZ/bakalari-api-skill"],
		["ollama-collab-api", "https://github.com/SamuelPalubaCZ/OllamaCollabApi"],
		["isds-bun", "https://github.com/thinkhome-org/isds-bun"],
		["fakturoid-typescript-api", "https://github.com/thinkhome-org/fakturoid-typescript-api"],
		["csob-ceb-bc", "https://github.com/thinkhome-org/csob-ceb-bc"],
	];

	for (const [slug, url] of expectedProjects) {
		assert.equal(projects.get(slug)?.status, "published", `${slug} should be published`);
		assert.equal(projects.get(slug)?.data.url, url);
	}
});

test("portfolio launch does not expose phone contact", () => {
	const seedText = JSON.stringify(seed);
	const aboutText = textFromBlocks(seed.content.pages.find((page) => page.slug === "about").data.content);

	assert.doesNotMatch(seedText, /\+420|728981602/);
	assert.doesNotMatch(homePage, /\+420|728981602/);
	assert.doesNotMatch(contactPage, /\+420|728981602/);
	assert.match(aboutText, /open software and hardware/);
});

test("contact page includes approved public links", () => {
	assert.match(contactPage, /samuel\.paluba@thinkhome\.org/);
	assert.match(contactPage, /https:\/\/github\.com\/SamuelPalubaCZ/);
	assert.match(contactPage, /https:\/\/www\.linkedin\.com\/in\/samuel-paluba/);
	assert.match(contactPage, /https:\/\/x\.com\/PalubaSamuel/);
	assert.match(contactPage, /https:\/\/thinkhome\.cz/);
	assert.match(contactPage, /https:\/\/samuelpaluba\.link/);
});
