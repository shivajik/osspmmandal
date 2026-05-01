# OSSPM Website — PRD

## Original Problem Statement
Create a Multi-page modern professional website for Om Shivkrupa Shikshan Prasarak Mandal (OSSPM) college trust, based on the existing osspmandal.com.

## User Choices (Dec 2025)
- Pages: Home, About, Branches (Marathi / English / Colleges), Admissions, News, Gallery, Contact
- Contact form: saves to MongoDB (real email integration via Resend — SKIPPED by user; can be enabled later by providing API key)
- Design direction: Deep Navy (#0A192F) + Gold (#D4AF37) on Parchment (#FBF9F6) — editorial academic aesthetic; Playfair Display headings + Outfit body
- Content: verbatim from reference screenshots (Executive Committee, 6 Marathi schools, 2 English schools, 3 Colleges, address, phones, 12AA & 80G donation notice)
- Extras: none (static + clean)

## Architecture
- Frontend: React 19 + React Router 7 + Tailwind + shadcn-ui + framer-motion + sonner toasts
- Backend: FastAPI + Motor (async MongoDB)
- Content lives in `/app/frontend/src/data/content.js` for easy edits

## Core Requirements
- 7 distinct pages, sticky glassmorphism header, massive inverted footer
- Executive committee table (7 members), complete branches list (11 institutions), FAQ accordion, gallery masonry, news list
- Contact form with validation, toast feedback, persistence to MongoDB

## Implemented (Dec 2025)
- [x] Backend: GET /api/, POST /api/contact (validated + persisted), GET /api/contact
- [x] Frontend: Layout (Header + Footer) + 7 routed pages
- [x] Content: all data verbatim from screenshots centralised in content.js
- [x] Fonts: Playfair Display + Outfit
- [x] Motion: framer-motion staggered fade-ups, ticker, hover underline
- [x] Gallery: 10-image tetris grid (fixed broken image)
- [x] Contact form: MongoDB persistence + toast feedback
- [x] Responsive (mobile menu), data-testid on all interactive elements
- [x] Tested via testing_agent_v3 — 8/8 backend pytest pass, 7/7 frontend pages OK

## P0 Backlog (next)
- [ ] Enable real email sending (Resend) — user skipped; will need API key
- [ ] Admin-protected GET /api/contact (currently public — PII risk in production)
- [ ] Restrict CORS_ORIGINS before production deploy
- [ ] Pagination on GET /api/contact

## P1 Backlog
- [ ] Replace placeholder gallery photos with real OSSPM campus photos
- [ ] Add branch-specific detail pages (one per institution)
- [ ] Add a structured Donations page with online payment (Razorpay/Stripe)
- [ ] Google Maps API embed with real lat/lng marker

## P2 Backlog
- [ ] Multi-language toggle (Marathi / English)
- [ ] Student login portal / results
- [ ] Alumni network page
- [ ] Blog / CMS integration
