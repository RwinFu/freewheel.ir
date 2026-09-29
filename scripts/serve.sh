#!/bin/sh
# Rebuild and restart the preview server on :3000. The sandbox has no
# process manager, so this is the whole deploy loop.
set -e
cd "$(dirname "$0")/.."
pkill -9 -f "next-server" 2>/dev/null || true
pkill -9 -f "static-server.mjs" 2>/dev/null || true
sleep 1
if [ "$1" != "--no-build" ]; then
  npx next build > /tmp/build.log 2>&1 || { tail -40 /tmp/build.log; exit 1; }
fi
# Static export: `next start` does not apply. Serve the generated `out/`
# directory with the tiny dependency-free static server instead.
nohup node scripts/static-server.mjs > /tmp/next.log 2>&1 &
for i in $(seq 1 40); do
  sleep 0.5
  if curl -sf -o /dev/null http://localhost:3000/; then
    echo "ready on :3000"
    exit 0
  fi
done
echo "server did not come up"
tail -20 /tmp/next.log
exit 1
