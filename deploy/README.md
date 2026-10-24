# راهنمای استقرار freewheel.ir روی VPS + Nginx + PM2/systemd

این سایت یک اپ **Next.js** است و روی هاست اشتراکی PHP (cPanel/دایرکت‌ادمین)
بالا نمی‌آید؛ به یک VPS لینوکسی با **Node.js 22** نیاز دارید. این راهنما
به‌ترتیبِ اجراست؛ هر بخش را که قبلاً انجام داده‌اید رد کنید.

فایل‌های این پوشه:

| فایل | کاربرد |
|---|---|
| `nginx.conf` | پروکسی معکوس + کش استاتیک + آماده برای SSL |
| `ecosystem.config.cjs` | اجرای دائمی اپ با PM2 و بالا آمدن بعد از ریبوت |
| `freewheel.service` | جایگزین PM2 — اجرای اپ با systemd |
| `deploy.sh` | به‌روزرسانی خودکار: pull ← نصب ← بیلد ← ری‌استارت |

---

## ۱) آماده‌سازی سرور

حداقل منابع پیشنهادی: **۲ گیگ رم** (با ۱ گیگ هم می‌شود ولی حتماً swap بسازید)،
۲ گیگ فضای خالی، Ubuntu 22.04/24.04.

```bash
# به‌روزرسانی و ابزارهای پایه
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl nginx ufw

# فایروال
sudo ufw allow OpenSSH && sudo ufw allow 'Nginx Full' && sudo ufw enable

# Node.js 22 (از NodeSource)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

# PM2 (اگر systemd را ترجیح نمی‌دهید)
sudo npm install -g pm2
```

### ساخت swap (فقط اگر رم ۱ گیگ است)

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

## ۲) دامین و DNS

- ثبت/تمدید دامنه `.ir` از **nic.ir** و ست کردن NS به DNS‌provider (یا هاست
  DNS خود nic.ir).
- دو رکورد **A** بسازید: `freewheel.ir` و `www.freewheel.ir` به‌سمت IP سرور.
- رکوردهای AAAA (IPv6) را یا درست ست کنید یا حذفشان کنید؛ AAAA اشتباه یعنی
  سایت برای بخشی از کاربران باز نمی‌شود.

## ۳) کلون پروژه و متغیرهای محیطی

```bash
sudo mkdir -p /var/www && cd /var/www
sudo git clone https://github.com/RwinFu/freewheel.ir.git
sudo chown -R $USER:$USER freewheel.ir && cd freewheel.ir

cp .env.example .env.local
nano .env.local
```

در `.env.local` حداقل این‌ها را پر کنید:

```dotenv
NEXT_PUBLIC_SITE_URL=https://freewheel.ir
NEXT_PUBLIC_CONTACT_PHONE=021-xxxxxxxx
NEXT_PUBLIC_CONTACT_MOBILE=0912xxxxxxx
NEXT_PUBLIC_CONTACT_EMAIL=info@freewheel.ir
NEXT_PUBLIC_CONTACT_ADDRESS=...
```

> نکته‌ی مهم: متغیرهای `NEXT_PUBLIC_*` **موقع بیلد** داخل خروجی سوار می‌شوند؛
> بعد از هر تغییر در آن‌ها باید دوباره بیلد بگیرید.

## ۴) PostgreSQL (اختیاری — برای فرم استعلام و جست‌وجوی دیتابیسی)

بدون این بخش سایت کامل بالا می‌آید؛ فقط فرم، کاربر را به فروشگاه آنلاین
هدایت می‌کند. برای فعال شدن:

```bash
sudo apt install -y postgresql
sudo -u postgres psql <<'SQL'
CREATE USER freewheel WITH PASSWORD 'یک-رمز-قوی';
CREATE DATABASE freewheel OWNER freewheel;
SQL
```

و در `.env.local`:

```dotenv
DATABASE_URL=postgresql://freewheel:یک-رمز-قوی@127.0.0.1:5432/freewheel
```

جداول (`inquiries` و `catalog_items`) در اولین استفاده **خودکار** ساخته
می‌شوند؛ مایگریشن دستی لازم نیست.

## ۵) بیلد و اجرا

```bash
npm ci --no-audit --no-fund
npm run build:standalone    # بیلد + آماده‌سازی .next/standalone
```

### گزینه‌ی الف: PM2

```bash
mkdir -p logs
pm2 start deploy/ecosystem.config.cjs
pm2 save
pm2 startup        # دستوری که می‌دهد را با sudo اجرا کنید
curl http://127.0.0.1:3000/api/health   # باید {"status":"ok",...} ببینید
```

### گزینه‌ی ب: systemd

```bash
sudo cp deploy/freewheel.service /etc/systemd/system/freewheel.service
sudo nano /etc/systemd/system/freewheel.service   # مسیر و کاربر را چک کنید
# اگر .env.local دارید، به‌جای Environment داخل فایل، بهتر است قبل از شروع
# آن را کنار سرور کپی کنید:  cp .env.local .next/standalone/.env.local
sudo systemctl daemon-reload
sudo systemctl enable --now freewheel
curl http://127.0.0.1:3000/api/health
```

> در هر دو گزینه اپ فقط روی `127.0.0.1:3000` گوش می‌دهد و از بیرون مستقیماً
> در دسترس نیست؛ Nginx جلوی آن می‌ایستد.

## ۶) Nginx و SSL

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/freewheel.ir
sudo ln -s /etc/nginx/sites-available/freewheel.ir /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

حالا سایت روی HTTP باید بالا باشد. سپس گواهی رایگان Let's Encrypt:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d freewheel.ir -d www.freewheel.ir
```

certbot خودش بلوک HTTPS و ریدایرکت را تنظیم می‌کند و تمدید هم خودکار است
(`sudo certbot renew --dry-run` برای تست).

## ۷) به‌روزرسانی‌های بعدی

هر بار که کد روی `main` تغییر کرد، روی سرور:

```bash
cd /var/www/freewheel.ir
bash deploy/deploy.sh
```

اسکریپت، کد را pull می‌کند، بیلد standalone می‌گیرد، env را کنار سرور کپی
می‌کند، سرویس را ری‌استارت و سلامتش را چک می‌کند.

---

## ۸) دیپلوی خودکار با گیت‌هاب‌اکشن (اختیاری)

ورک‌فلوی `.github/workflows/deploy-vps.yml` با هر push روی `main`، از طریق
SSH همان `deploy/deploy.sh` را روی سرور اجرا می‌کند. راه‌اندازی یک‌باره:

```bash
# روی سیستم خودتان یک کلید مخصوص دیپلوی بسازید
ssh-keygen -t ed25519 -f freewheel-deploy -N "" -C "github-actions"

# کلید عمومی را روی سرور برای کاربر دیپلوی فعال کنید
ssh-copy-id -i freewheel-deploy.pub VPS_USER@VPS_HOST
```

بعد در گیت‌هاب: **Settings → Secrets and variables → Actions** و این Secretها:

| Secret | مقدار |
|---|---|
| `VPS_HOST` | IP یا هاست‌نیم سرور |
| `VPS_USER` | کاربر SSH |
| `VPS_SSH_KEY` | محتوای فایل کلید خصوصی (`freewheel-deploy`) |
| `VPS_PORT` | اختیاری — پیش‌فرض ۲۲ |
| `VPS_APP_DIR` | اختیاری — پیش‌فرض `/var/www/freewheel.ir` |

> تا وقتی Secretها ساخته نشده‌اند، ورک‌فلو فقط رد می‌شود و قرمز نمی‌شود.

نکته: مسیر PM2 به sudo نیاز ندارد. اگر از مسیر **systemd** استفاده می‌کنید،
چون `deploy.sh` آخرش `sudo systemctl restart freewheel` می‌زند، به کاربر
دیپلوی sudo بدون رمز فقط برای همین دستور بدهید:

```bash
echo 'VPS_USER ALL=(root) NOPASSWD: /usr/bin/systemctl restart freewheel' | sudo tee /etc/sudoers.d/freewheel
```

---

## عیب‌یابی سریع

| علامت | علت محتمل | راه‌حل |
|---|---|---|
| `502 Bad Gateway` | اپ اجرا نیست | `pm2 logs` یا `journalctl -u freewheel -e` |
| فرم استعلام 503 می‌دهد | `DATABASE_URL` خالی/اشتباه | مقدار را در `.env.local` ست و **دوباره بیلد+کپی env** کنید |
| جست‌وجو نتیجه نمی‌دهد | دیتابیس خالی است | طبیعی است؛ کاتالوگ ایستا جایگزین می‌شود |
| استایل/تصویر لود نمی‌شود | `prepare-standalone` اجرا نشده | `npm run build:standalone` را کامل اجرا کنید |
| خطای ENOMEM موقع بیلد | رم کم | swap بسازید یا بیلد را روی CI/لوکال بگیرید و `out`/artifact منتقل کنید |
| تغییر شماره تماس اعمال نمی‌شود | `NEXT_PUBLIC_*` موقع بیلد سوار می‌شود | بعد از ویرایش env، دوباره بیلد بگیرید |

بررسی سلامت دیتابیس و وضعیت جست‌وجو:

```bash
curl http://127.0.0.1:3000/api/health
```
