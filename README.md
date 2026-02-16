# Forex Widget Pro

This repo is the Git-friendly version of the Replit project behind `https://forex-widget-pro.replit.app/`.

It’s a **Vite + React (TypeScript)** client served by an **Express** server.

## 1) Run locally

### Prereqs
- Node.js 18+ (recommended 20+)

### Install + start (dev)
```bash
npm install
npm run dev
```
This runs:
- Express API on `http://localhost:5000`
- Vite dev middleware for the React client

Open: `http://localhost:5000/`

## 2) Environment variables

Create a `.env` file (or export env vars) if you want to persist leads.

```bash
cp .env.example .env
```

### DATABASE_URL (optional)
- If `DATABASE_URL` is set, `/api/leads` will write to Postgres using Drizzle.
- If `DATABASE_URL` is **not** set, the app still runs and `/api/leads` uses **in-memory** storage.

## 3) Build + run (production)

```bash
npm run build
npm run start
```

- Client build output: `dist/public`
- Server bundle: `dist/index.cjs`

## 4) API endpoints

- `GET /api/cities` – list cities + serviceability flags
- `GET /api/rates?city_code=DEL` – proxies BookMyForex rate card
- `POST /api/better-rate` – requests discount (better-rate) code
- `POST /api/leads` – stores a lead (DB if configured, otherwise memory)

## 5) Push to GitHub (typical flow)

From the project root:

```bash
git init
git add .
git commit -m "Initial commit: Forex Widget Pro"

git branch -M main
git remote add origin <YOUR_GITHUB_REPO_URL>
git push -u origin main
```

## 6) Notes

- The server calls BookMyForex APIs from the backend to avoid browser CORS/cookie limitations.
- `.config/` and `.local/` (Replit runtime artifacts) are intentionally excluded via `.gitignore`.
