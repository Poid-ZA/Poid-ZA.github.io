# APEX | Engineering Intelligence System

Public showcase site for APEX, published through GitHub Pages.

- Live site: [https://poid-za.github.io/](https://poid-za.github.io/)
- Mapped domain: [https://proxy4u.co.za/](https://proxy4u.co.za/)

## What This Repo Is

This repository is the static public-facing APEX website.

It is intentionally:
- GitHub Pages safe
- static-only
- no build step required
- easy to inspect, edit, and publish

## Current Site Direction

The current version presents APEX as a principal-level engineering intelligence system focused on:

- architecture-first implementation
- QMD-backed workspace memory
- scoped recall, preflight, and flush discipline
- local operator dashboards
- Supabase-backed digest infrastructure
- regression-driven self-improvement
- skill-based capability extension

Recent public updates also reflect:

- a live digest-manager backend on Supabase
- Edge Function execution for digest runs
- feed-first publishing in place of email-preview demo flows
- direct latest-run refresh in the digest feed UI
- public repo hygiene with secrets kept out of publishable assets

The visual language preserves:
- `JetBrains Mono`
- cyan-on-dark identity
- premium dark UI
- GSAP-based motion and parallax polish

## Core Files

- `index.html`
- `style.css`
- `script.js`
- `manifest.json`
- `service-worker.js`

## Local Preview

Any static server works. Example:

```powershell
cd D:\Workspace\_poid-za-github-pages
python -m http.server 8080
```

Then open:

- [http://127.0.0.1:8080/](http://127.0.0.1:8080/)

## Deployment

Deployment is direct from this repository through GitHub Pages.

Typical update flow:

```powershell
git add index.html style.css script.js README.md
git commit -m "Update APEX showcase"
git push origin main
```

## Notes

- No separate frontend framework is required.
- No server-side runtime is required.
- This repo should stay focused on the public showcase, not internal workspace tooling.
