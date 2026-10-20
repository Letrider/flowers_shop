#!/usr/bin/env bash
set -Eeuo pipefail

app_dir=/opt/flowers_shop
domain=dagcvettorg.ru

cd "$app_dir"

test -f server/.env || {
  echo 'Missing /opt/flowers_shop/server/.env' >&2
  exit 1
}

test -f server/data.json || {
  echo 'Missing /opt/flowers_shop/server/data.json' >&2
  exit 1
}

mkdir -p server/uploads

docker build --pull --tag flowers-shop-api:latest server
docker rm --force flowers-shop-api 2>/dev/null || true
docker run --detach \
  --name flowers-shop-api \
  --restart unless-stopped \
  --env-file "$app_dir/server/.env" \
  --publish 127.0.0.1:4000:4000 \
  --volume "$app_dir/server/data.json:/app/data.json" \
  --volume "$app_dir/server/uploads:/app/uploads" \
  flowers-shop-api:latest

docker run --rm \
  --env VITE_API_URL="https://$domain" \
  --volume "$app_dir:/app" \
  --workdir /app \
  node:20-alpine \
  sh -lc 'npm ci && npm run build'

install -D -m 644 deployment/nginx-flowers-shop.conf /etc/nginx/sites-available/flowers-shop
ln -sfn /etc/nginx/sites-available/flowers-shop /etc/nginx/sites-enabled/flowers-shop
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

curl --fail --silent --show-error \
  --header "Host: $domain" \
  http://127.0.0.1/api/products >/dev/null

echo 'Deployment completed successfully.'
