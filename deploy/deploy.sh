#!/usr/bin/env bash
# اسکریپت به‌روزرسانی سایت روی VPS — از ریشه‌ی پروژه اجرا می‌شود:
#   bash deploy/deploy.sh
# پیش‌نیاز: Node 22، git، و PM2 (یا systemd؛ آخر اسکریپت را ببینید).
set -euo pipefail
cd "$(dirname "$0")/.."

echo "==> دریافت آخرین نسخه"
git pull --ff-only origin main

echo "==> نصب وابستگی‌ها"
npm ci --no-audit --no-fund

echo "==> بیلد نسخه‌ی standalone"
# متغیرهای NEXT_PUBLIC_* باید «قبل از بیلد» از .env.local/env خوانده شوند
npm run build:standalone

echo "==> انتقال متغیرهای محیطی به خروجی standalone"
# سرور standalone فایل‌های env را از پوشه‌ی خودش (.next/standalone) می‌خواند،
# نه از ریشه‌ی پروژه؛ پس .env.local را کنار server.js کپی می‌کنیم.
if [ -f .env.local ]; then
  cp .env.local .next/standalone/.env.local
fi

echo "==> ری‌استارت سرویس"
if command -v pm2 >/dev/null 2>&1; then
  pm2 startOrReload deploy/ecosystem.config.cjs --update-env
  pm2 save
elif command -v systemctl >/dev/null 2>&1; then
  sudo systemctl restart freewheel
else
  echo "!! نه PM2 نه systemd پیدا نشد؛ سرویس را دستی ری‌استارت کنید." >&2
  exit 1
fi

echo "==> بررسی سلامت"
sleep 2
curl -fsS http://127.0.0.1:3000/api/health && echo
echo "✔ استقرار کامل شد."
