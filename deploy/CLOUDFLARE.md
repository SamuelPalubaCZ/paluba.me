# Cloudflare Deploy

This project is configured for Cloudflare Workers/Pages-style hosting with:

- Astro Cloudflare adapter
- EmDash D1 database binding: `DB`
- EmDash R2 media binding: `MEDIA`
- Astro session KV binding: `SESSION`
- Cloudflare Images binding: `IMAGES`

## Required Cloudflare Values

The API token alone may not let Wrangler discover accounts in a non-interactive shell.
Set the account id explicitly:

```bash
export CLOUDFLARE_ACCOUNT_ID=<account-id>
export CLOUDFLARE_API_TOKEN=<api-token>
```

## Create Resources

```bash
pnpm exec wrangler d1 create paluba-me
pnpm exec wrangler r2 bucket create paluba-me-media
pnpm exec wrangler kv namespace create SESSION
```

Copy the created D1 database id and KV namespace id into `wrangler.jsonc`.

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
