#!/usr/bin/env bash
# Build a GitHub Pages demo without removing API routes from the Node app.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
stage="$(mktemp -d "$root/.pages-stage.XXXXXX")"
trap 'rm -rf "$stage"' EXIT

cp -R "$root/src" "$root/public" "$stage/"
cp "$root/package.json" "$root/next.config.ts" \
   "$root/postcss.config.mjs" "$root/tsconfig.json" "$stage/"
rm -rf "$stage/src/app/api"
ln -s "$root/node_modules" "$stage/node_modules"

(cd "$stage" && \
  PAGES_EXPORT=1 \
  NEXT_PUBLIC_STATIC_SITE=1 \
  NEXT_PUBLIC_SITE_URL=https://rwinfu.github.io/freewheel.ir \
  "$root/node_modules/.bin/next" build)

rm -rf "$root/pages-out"
cp -R "$stage/out" "$root/pages-out"
touch "$root/pages-out/.nojekyll"
echo "GitHub Pages demo ready: $root/pages-out"
