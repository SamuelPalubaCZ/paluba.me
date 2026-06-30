# Cloudflare Deploy

This project is configured for Cloudflare Workers/Pages-style hosting with:

- Astro Cloudflare adapter
- EmDash D1 database binding: `DB`
- Astro session KV binding: `SESSION`
- Cloudflare Images binding: `IMAGES`

## Required Cloudflare Values

The account id is already recorded in `.env.example`; set the API token only in
your shell or CI secrets, not in git:

```bash
export CLOUDFLARE_ACCOUNT_ID=0862b64fc33c0302d2a4338826847e70
export CLOUDFLARE_API_TOKEN=<api-token>
```

## Create Resources

The D1 database and KV namespace have already been created and are wired in
`wrangler.jsonc`:

- D1 database: `paluba-me`
- KV namespace: `paluba-me-SESSION`

R2 is not required to serve the current portfolio. It is only needed if you want
production CMS media uploads. Cloudflare currently reports that R2 must be
enabled once in the dashboard before the bucket can be created. After enabling
R2, run:

```bash
pnpm exec wrangler r2 bucket create paluba-me-media
```

Then add the `MEDIA` R2 binding back to `wrangler.jsonc` and configure EmDash
storage with `r2({ binding: "MEDIA" })` in `astro.config.mjs`.

## Build And Deploy

```bash
EMDASH_SITE_URL=https://paluba.me SITE_URL=https://paluba.me pnpm build
pnpm exec wrangler deploy
```

## Domain

After the Worker deploys, attach `paluba.me` in Cloudflare:

```bash
pnpm exec wrangler triggers deploy --help
```

If Wrangler route commands are not enough for the account setup, attach the custom domain in the Cloudflare dashboard:

```text
Workers & Pages -> paluba-me -> Settings -> Domains & Routes -> Add Custom Domain -> paluba.me
```

## Content

The repository seed is the initial content source. For production D1, apply migrations/seed through the deployed runtime or EmDash tooling once the Worker is reachable.
