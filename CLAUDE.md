# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The GigaFleet commercial marketing website (giga-fleet-home.web.app) — a **static single-page site**. No build system, no framework, no `package.json`, no npm. Just hand-authored `index.html` + `css/style.css` + `js/main.js`. Edit the files directly; there is nothing to compile.

## Layout

- `index.html` — the entire page (~1500 lines). All sections live inline, numbered in comments (`1. NAV`, `2. HERO`, … `13. DEMO CTA`, then footer + modal). CSS section comments in `css/style.css` mirror the same ordering — when styling a section, find its matching banner comment there.
- `css/style.css` — all styles, single file. Uses `gf-`-prefixed BEM-ish classes.
- `js/main.js` — the only script. IIFE, vanilla JS, no dependencies. Handles: scroll-to-top button, CTA entrance animation (IntersectionObserver), and the Book-a-Demo modal.
- `assets/screenshots/` — product screenshots (`home`, `mobile`, `tablet`, `client-portal`, `dispatch`). Referenced from `index.html` with explicit `width`/`height`; keep new images at the same aspect (`mobile` 375×812, `dispatch` 1200×750, `home` used as OG image at 1200×630) and compressed to match the others (~28–37 KB JPG).

## Book-a-Demo modal (the site's one interactive flow)

- Any element with class `js-book-demo` opens the modal (`main.js` wires them all via `openModal()`). **When adding a new "Book a Demo" button, it must have `js-book-demo`** or it silently does nothing — a prior bug shipped a CTA button missing this class.
- The form (`#gf-demo-form`) does **not** post to a backend — on submit it builds a `mailto:sales@gigaent.com` link and opens the visitor's email client. No lead is captured server-side.

## Deploy

Two independent deploy targets, both from `main`:

- **Firebase Hosting** (primary — giga-fleet-home.web.app): `firebase deploy --only hosting`. Config in `firebase.json` (`site: giga-fleet-home`, serves repo root); Firebase project in `.firebaserc` (`giga-fleet`). `firebase.json` sets long cache headers on js/css/images and security headers (X-Frame-Options, nosniff).
- **GitHub Pages**: `.github/workflows/pages.yml` auto-deploys the repo root on every push to `main`.

There is no local dev server config; open `index.html` directly or serve the folder with any static server.
