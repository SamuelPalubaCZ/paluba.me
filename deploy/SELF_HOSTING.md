# Self-Hosting paluba.me

This site is an Astro server app with EmDash, SQLite, and local media uploads.
The production shape is:

```text
Nginx/Caddy TLS proxy -> 127.0.0.1:4321 -> Astro standalone server
data.db + uploads/ persisted on disk
```

## Files To Persist

Back these up:

```text
/var/www/paluba/my-site/data.db
/var/www/paluba/my-site/uploads/
```

Do not rely on `seed/seed.json` as the live database after editors change content in the admin UI. Seed is useful for first install and reproducible baseline content.

## First Deploy

```bash
sudo useradd --system --create-home --shell /usr/sbin/nologin paluba
sudo mkdir -p /var/www
sudo chown paluba:paluba /var/www

sudo -u paluba git clone <repo-url> /var/www/paluba
cd /var/www/paluba/my-site

corepack enable
corepack prepare pnpm@11.1.3 --activate
pnpm install --frozen-lockfile

pnpm exec emdash seed seed/seed.json --on-conflict update \
  --uploads-dir ./uploads \
  --media-base-url /_emdash/api/media/file

EMDASH_SITE_URL=https://paluba.me SITE_URL=https://paluba.me pnpm build
```

## Systemd

Copy and adjust the unit if your path/user differs:

```bash
sudo cp deploy/paluba.service /etc/systemd/system/paluba.service
sudo systemctl daemon-reload
sudo systemctl enable --now paluba
sudo systemctl status paluba
```

Logs:

```bash
journalctl -u paluba -f
```

## Nginx

```bash
sudo cp deploy/nginx-paluba.me.conf /etc/nginx/sites-available/paluba.me
sudo ln -s /etc/nginx/sites-available/paluba.me /etc/nginx/sites-enabled/paluba.me
sudo nginx -t
sudo systemctl reload nginx
```

Then issue TLS certificates, for example:

```bash
sudo certbot --nginx -d paluba.me -d www.paluba.me
```

## Updating The Site

```bash
cd /var/www/paluba/my-site
git pull
pnpm install --frozen-lockfile
EMDASH_SITE_URL=https://paluba.me SITE_URL=https://paluba.me pnpm build
sudo systemctl restart paluba
```

Only re-run `emdash seed --on-conflict update` when you intentionally want repository seed content to overwrite/update CMS content.

## Admin UI

The admin UI is available at:

```text
https://paluba.me/_emdash/admin
```

Because the app sits behind a TLS reverse proxy, production must set:

```text
EMDASH_SITE_URL=https://paluba.me
SITE_URL=https://paluba.me
```

The Astro config also declares `paluba.me` and `www.paluba.me` as allowed domains so forwarded proxy headers reconstruct the public URL correctly.
