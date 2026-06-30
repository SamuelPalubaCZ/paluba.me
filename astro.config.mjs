import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { defineConfig, fontProviders } from "astro/config";
import { d1 } from "@emdash-cms/cloudflare";
import emdash from "emdash/astro";

const siteUrl = process.env.EMDASH_SITE_URL ?? process.env.SITE_URL ?? "https://paluba.me";
const allowedDomains = [
	{ hostname: "paluba.me", protocol: "https" },
	{ hostname: "www.paluba.me", protocol: "https" },
];
const devAllowedHosts = ["paluba.me", "www.paluba.me"];

export default defineConfig({
	site: siteUrl,
	output: "server",
	security: {
		allowedDomains,
	},
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			siteUrl,
			database: d1({ binding: "DB", session: "auto" }),
		}),
	],
	vite: {
		server: {
			allowedHosts: devAllowedHosts,
		},
	},
	fonts: [
		{
			provider: fontProviders.google(),
			name: "Playfair Display",
			cssVariable: "--font-serif",
			weights: [400, 500, 600, 700],
			fallbacks: ["serif"],
		},
	],
	devToolbar: { enabled: false },
});
