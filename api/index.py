# Vercel Python Serverless entrypoint.
# Vercel routes /api/* (see /vercel.json rewrites) to this file.
# It re-exports the FastAPI app defined in /backend/server.py so we
# keep a single source of truth for routes, models and DB logic.

import sys
from pathlib import Path

# Make the backend package importable
ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from backend.server import app  # noqa: E402  # re-export FastAPI app

# Vercel's Python runtime auto-detects the `app` ASGI callable.
