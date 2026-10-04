# Shift Marketing Agency & Academy — Production Guide

This repository contains the full-stack web application and administrative portal for **Shift Marketing Agency & Academy**.

---

## 1. Production Environment Variables

Configure the following environment variables on the production server (e.g. in `.env` or container environment). **Never commit real secret credentials to version control.**

| Variable | Required | Description | Safe Failure Behavior |
| :--- | :--- | :--- | :--- |
| `PORT` | Optional (default: `3000`) | Network port for Node.js Express server | Defaults to 3000 |
| `HOST` | Optional (default: `0.0.0.0`) | Network host bind address | Binds to all network interfaces |
| `SHIFT_ADMIN_EMAIL` | **Required** | Authorized administrator email address | If unset, admin login returns HTTP 503; no login is permitted |
| `SHIFT_ADMIN_PASSWORD` | **Required** | Strong production password (minimum 16 chars) | If unset, admin login returns HTTP 503; no login is permitted |
| `SHIFT_ADMIN_SESSION_SECRET` | **Required** | Cryptographic HMAC secret for signing sessions (min 32 chars) | If unset, admin login returns HTTP 503; no login is permitted |
| `GEMINI_API_KEY` | Optional | Google Gemini API key for server-side AI chatbot proxy | If unset, chatbot falls back to deterministic rule-based assistant |

### Security Guarantees:
- **Server-Side Only**: All secrets are accessed exclusively in Node.js server runtime (`server.js`). No secrets are bundled or referenced in client-side Vite builds (`dist/`).
- **Safe Failure**: Missing production variables trigger an immediate HTTP 503 service unavailable response with an explicit message. The system **never** silently falls back to hardcoded or insecure default credentials.
- **Git Ignored**: `.env` and all `.env.*` files are explicitly included in `.gitignore`.

---

## 2. Persistent Storage Architecture

The application requires a dedicated persistent volume mounted at:
```
<application working directory>/.shift-data/
```

### Storage Directory Structure:
```
.shift-data/
├── leads.json       # Form submissions, consultation requests, and audit leads
└── uploads/         # Uploaded images, case study assets, and media files (served via /uploads)
```

### Specifications:
- **Required Directory**: `<application_working_directory>/.shift-data/`
- **Permissions**: Read and write access (`chmod 750` or `770`) for the user running the Node.js process.
- **Persistence Requirement**: Must be mounted on persistent disk/volume storage across container restarts, zero-downtime rolling deploys, and server reboots.
- **Backup Consideration**: Regularly back up `.shift-data/leads.json` and `.shift-data/uploads/` via snapshot or remote object storage sync (e.g. daily cron to cloud storage).

---

## 3. Verified Contact Information

The official verified agency contact coordinates in production code are:
- **Primary Phone**: `041 88 24 80` (`tel:+37441882480`)
- **Secondary Phone**: `043 88 24 80` (`tel:+37443882480`)
- **WhatsApp**: `https://wa.me/37443882480`
- **Viber**: `viber://chat?number=%2B37443882480`
- **Location**: `Աբովյան, Հայաստան` / `Abovyan, Armenia`

---

## 4. Course Offerings Structure

`src/data/CoursesData.js` serves as the authoritative source of truth:
1. **SMM Course**: 18 Lessons + Graduation Exam & Certification
2. **Target Ads Intensive**: 5 Syllabus Entries
3. **Branding & Content**: 4 Syllabus Entries
4. **Photography Mastery**: 10 Lessons

---

## PRODUCTION DEPLOYMENT CHECKLIST

1. **Install dependencies**:
   ```bash
   npm install --production=false
   ```
2. **Configure environment variables**:
   Set `SHIFT_ADMIN_EMAIL`, `SHIFT_ADMIN_PASSWORD`, `SHIFT_ADMIN_SESSION_SECRET`, and `PORT` in the server environment (or `/path/to/app/.env`).
3. **Configure persistent `.shift-data/`**:
   Ensure `.shift-data/` and `.shift-data/uploads/` exist with write permissions for the application process.
4. **Build application**:
   ```bash
   npm run validate:production
   npm run build
   ```
5. **Start server**:
   ```bash
   NODE_ENV=production npm start
   ```
6. **Verify Admin login**:
   Visit `/admin/login`, submit configured `SHIFT_ADMIN_EMAIL` and `SHIFT_ADMIN_PASSWORD`, and confirm successful authentication redirect to `/admin/dashboard`. Test invalid password to confirm rejection.
7. **Verify public pages**:
   Test `/`, `/about`, `/services`, `/portfolio`, `/courses`, `/quiz`, `/faq`, `/blog`, and `/contact`. Ensure all routes load cleanly without console errors.
8. **Verify uploads**:
   Confirm uploaded media files save to `.shift-data/uploads/` and resolve through `GET /uploads/<filename>`.
9. **Verify forms/API**:
   Submit quick consultation modal, contact form, quiz lead form, and test `/api/leads` and `/api/chat`.
10. **Verify persistence after restart**:
    Restart the Node.js process / container and verify existing leads and files in `.shift-data/` remain intact.
11. **Verify HTTPS/domain configuration**:
    Ensure TLS/SSL certificate is valid, reverse proxy (Nginx/Caddy/Cloud Load Balancer) terminates HTTPS, passes `Host` and `X-Forwarded-For` headers, and enforces HSTS.
