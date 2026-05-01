# Deploying OSSPM to Vercel

The app is now structured to deploy on Vercel as:
- **Frontend** → static CRA build served by Vercel
- **Backend** → FastAPI ASGI app running as a Vercel Python Serverless Function at `/api/*`
- **Database** → MongoDB Atlas (cloud — replaces local MongoDB)

---

## 1. One-time setup

### 1a. MongoDB Atlas (free tier works)
1. Create a free cluster: https://www.mongodb.com/cloud/atlas/register
2. Add a database user (username + password).
3. In **Network Access** → allow from anywhere (`0.0.0.0/0`) for Vercel.
4. Copy the connection string:
   `mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

### 1b. Push the repo to GitHub
Vercel deploys from Git.

---

## 2. Deploy on Vercel

1. Go to https://vercel.com/new → import the repository.
2. **Framework Preset**: leave it on `Other` (the `vercel.json` in this repo handles it).
3. **Root Directory**: leave as repo root (do NOT set it to `frontend`).
4. Under **Environment Variables**, add:

| Key                     | Value                                                                 |
|-------------------------|-----------------------------------------------------------------------|
| `MONGO_URL`             | your MongoDB Atlas connection string                                  |
| `DB_NAME`               | `osspm` (or any name you want)                                        |
| `CORS_ORIGINS`          | `*` (or the final Vercel domain)                                      |
| `REACT_APP_BACKEND_URL` | *leave empty* — frontend will use same-origin `/api` via rewrite      |

5. Click **Deploy**.

---

## 3. What the repo layout does

```
/vercel.json           ← build + routing config
/api/index.py          ← Vercel entrypoint, re-exports FastAPI app
/requirements.txt      ← Python deps for the serverless function (root level)
/backend/server.py     ← actual FastAPI logic (unchanged)
/frontend/             ← CRA React app
/.vercelignore         ← excludes .env files, tests, memory, etc.
```

`vercel.json` does:
- `buildCommand` builds the frontend with yarn
- `outputDirectory` points Vercel at `frontend/build` for static hosting
- `rewrites` routes any `/api/*` request to the Python serverless function at `api/index.py`

Because `REACT_APP_BACKEND_URL` is empty in production, the frontend calls relative URLs like `/api/contact` — Vercel rewrites them to the Python function on the same domain (no CORS preflight).

---

## 4. Local dev is unchanged
Run locally exactly as before — Emergent supervisor + local MongoDB still work because:
- `frontend/.env` still sets `REACT_APP_BACKEND_URL` for local preview
- `backend/.env` still sets local `MONGO_URL`
- Vercel-specific files (`vercel.json`, `api/`, root `requirements.txt`) are only read by Vercel

---

## 5. Known Vercel limitations vs native hosting

| Concern              | Implication                                                    |
|----------------------|---------------------------------------------------------------|
| Cold starts          | First request after idle may take 1–2 seconds                 |
| 10s function timeout | Free plan; long LLM streams or heavy jobs may hit the limit   |
| No persistent disk   | Don't store uploads locally — use S3/Cloudinary               |
| MongoDB connections  | Each cold start opens a fresh client; Atlas connection limits |

If any of these bite you, consider the split deploy model (Vercel frontend + Railway/Render backend + Atlas) or Emergent's native one-click deploy.
