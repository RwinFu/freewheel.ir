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
# The app has server-side API routes (`/api/*`) and database-backed forms, so
# it is served by the Next.js Node server, not by the static file server.
HOSTNAME=0.0.0.0 nohup npx next start -p 3000 > /tmp/next.log 2>&1 &
for i in $(seq 1 60); do
  sleep 0.5
  if curl -sf -o /dev/null http://localhost:3000/; then
    echo "ready on :3000"
    exit 0
  fi
done
echo "server did not come up"
tail -20 /tmp/next.log
exit 1
