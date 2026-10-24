// راه‌اندازی با PM2 روی VPS (از ریشه‌ی پروژه، بعد از `npm run build:standalone`):
//   pm2 start deploy/ecosystem.config.cjs
//   pm2 save && pm2 startup        ← بالا آمدن خودکار بعد از ریبوت
module.exports = {
  apps: [
    {
      name: "freewheel",
      script: ".next/standalone/server.js",
      cwd: "./",
      instances: 1,
      exec_mode: "fork",
      // فقط Nginx روی همین سرور باید به اپ دسترسی داشته باشد.
      env: {
        NODE_ENV: "production",
        PORT: 3000,
        HOSTNAME: "127.0.0.1",
      },
      // متغیرهای حساس (DATABASE_URL و ...) از .env.local یا env سیستم
      // خوانده می‌شوند؛ این‌جا چیزی هاردکد نکنید.
      max_memory_restart: "512M",
      out_file: "logs/pm2-out.log",
      error_file: "logs/pm2-error.log",
      merge_logs: true,
      autorestart: true,
      watch: false,
    },
  ],
};
