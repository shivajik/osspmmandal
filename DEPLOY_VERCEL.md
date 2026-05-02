# Deploying OSSPM on Vercel

## Root cause

The Vercel failure was caused by the old Create React App stack:

- `react-scripts@5` + CRACO depends on older Webpack tooling.
- Those nested packages include fragile `ajv`, `ajv-keywords`, and `schema-utils` combinations.
- Vercel was using a newer Node.js runtime, which exposed dependency mismatches such as `Unknown keyword formatMinimum`.
- Overrides only patched one layer and could still leave nested dependency conflicts.

## Stable fix applied

The frontend has been migrated from CRA/CRACO to Vite.

The deployment now uses:

- **Frontend:** Vite + React, output in `frontend/dist`
- **Backend:** Node.js Vercel Serverless Function at `api/index.js`
- **Database:** MongoDB Atlas via `MONGO_URL`
- **Node:** `>=20 <25`, with the Vercel function pinned to `nodejs20.x`

This removes `react-scripts`, CRACO, Webpack, `schema-utils`, and the problematic `ajv-keywords` build path.

## Vercel settings

Import the repository in Vercel with these settings:

1. **Root Directory:** repository root, not `frontend`
2. **Framework Preset:** Other
3. **Install Command:** handled by `vercel.json`
4. **Build Command:** handled by `vercel.json`
5. **Output Directory:** handled by `vercel.json`

`vercel.json` now runs:

```json
{
  "installCommand": "npm install && npm --prefix frontend install",
  "buildCommand": "npm --prefix frontend run build",
  "outputDirectory": "frontend/dist"
}
```

## Environment variables

Add these in Vercel → Project → Settings → Environment Variables:

| Key | Required | Value |
| --- | --- | --- |
| `MONGO_URL` | Yes | MongoDB Atlas connection string |
| `DB_NAME` | Yes | Example: `osspm` |
| `CORS_ORIGINS` | Optional | `*` or your Vercel domain |
| `VITE_BACKEND_URL` | No | Leave empty on Vercel so the frontend uses same-origin `/api` |

## Local development

Install dependencies:

```bash
npm install
npm --prefix frontend install
```

Create local environment variables if using MongoDB locally or Atlas:

```bash
export MONGO_URL="mongodb+srv://USER:PASS@cluster.mongodb.net/?retryWrites=true&w=majority"
export DB_NAME="osspm"
```

Run frontend only:

```bash
npm run dev
```

Run frontend + Node backend together:

```bash
npm start
```

Local URLs:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api`

The Vite dev server proxies `/api` to `http://localhost:5000`, so contact form requests work locally.

## Deploy steps

1. Commit and push these changes to GitHub.
2. In Vercel, keep Root Directory as repo root.
3. Add the environment variables above.
4. Redeploy with a clean cache if Vercel still has old CRA/Yarn cache.
5. Open `/api` on the deployed domain to confirm the backend returns `OSSPM API is live`.
