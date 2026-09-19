# SkillPulse — Frontend Client

A production-grade, responsive skilling outcomes and field operations web client for India. Built with pure HTML5, Vanilla CSS3, modern JavaScript modules, Chart.js visualizations, Lucide icons, and 11-language localization.

---

## Architecture

- **Stack**: Pure HTML5, Vanilla CSS3, Vanilla JS (Zero heavy bundler overhead).
- **Backend Communication**: Speaks to the Django REST Framework Backend API with session credentials and CSRF support.
- **Visualizations**: Dynamic Chart.js visualizations for wage progression, funnel conversion, and provider metrics.
- **Icons**: Lucide Icons CDN.
- **Typography**: Google Fonts (Plus Jakarta Sans and JetBrains Mono).
- **Hosting Ready**: Pre-configured with `vercel.json` for 1-click deployment to [Vercel](https://vercel.com).

---

## Project Structure

```text
SkillPulse-Frontend/
├── index.html                   # Entry point with smart auth-based routing
├── login.html                   # Sign in with email or SkillPulse ID
├── register.html                # Self-registration with email OTP validation
├── verify-otp.html              # 6-digit cryptographic email OTP verification
├── forgot-password.html         # Password recovery screen
├── trainer-dashboard.html       # Comprehensive operational dashboard for trainers
├── trainee-dashboard.html       # Self-service learner portal & progress timeline
├── profile.html                 # Profile editor, photo upload, and credentials
├── certificate-verify.html      # Public tamper-evident credential verification
├── css/
│   ├── field-atlas.css          # Core design tokens, components, and layout
│   └── responsive.css           # Mobile navigation and breakpoint styles
├── js/
│   ├── config.js                # Configurable API base URL (Local & Production)
│   ├── api.js                   # REST client wrapper with credentials & toast system
│   ├── auth.js                  # Authentication & OTP flows
│   ├── charts.js                # Chart.js renderers
│   ├── i18n.js                  # 11-Language localization dictionary
│   ├── notifications.js         # Real-time notification bell & popover
│   ├── profile.js               # Profile and photo management
│   ├── trainer-dashboard.js     # Trainer dashboard logic & filters
│   └── trainee-dashboard.js     # Trainee dashboard logic & timeline
├── images/
│   └── avatar-placeholder.png   # Default user avatar
├── vercel.json                  # Clean URL rewrites & headers for Vercel
├── package.json                 # Local development scripts
└── README.md
```

---

## Local Quickstart

### 1. Configure the Backend URL
By default, `js/config.js` points to `http://127.0.0.1:8000` when running locally.

To change the backend API endpoint at runtime, open your browser developer console on any page and execute:
```javascript
window.FIELD_ATLAS_CONFIG.setApiBaseUrl("https://your-deployed-backend-url.com");
```

### 2. Start Local Web Server
Using Node / npx:
```bash
npx serve -s . -l 3000
```
Or with Python:
```bash
python -m http.server 3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Deploying to Vercel

1. Import this repository into [Vercel](https://vercel.com).
2. Framework preset: **Other**.
3. Root directory: `./`.
4. Deploy! All routes (`/login`, `/register`, `/trainer`, `/trainee`, `/certificate/verify/:token`) will automatically map cleanly via `vercel.json`.

---

## Default Demo Credentials

| Role | Email | SkillPulse ID | Password |
| :--- | :--- | :--- | :--- |
| **Trainer** | `trainer@skillpulse.in` | `FA-TR-1001` | `Atlas@2026!` |
| **Trainee** | `trainee@skillpulse.in` | `FA-24-0182` | `Atlas@2026!` |
| **Admin** | `admin@skillpulse.in` | `FA-AD-0001` | `Atlas@2026!` |
