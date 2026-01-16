# Testloop Site

Personal portfolio and professional landing page.

## Overview

A static single-page site built with vanilla HTML, CSS, and JavaScript. No build tools or frameworks required.

## Features

- **Accessible** — WCAG 2.2 AA compliant, semantic HTML, proper focus states
- **Progressive enhancement** — Works without JavaScript
- **Responsive** — Mobile-first design
- **Dark mode** — Respects system preference, with manual toggle (persisted to localStorage)
- **Reduced motion** — Respects `prefers-reduced-motion`
- **No dependencies** — Pure HTML, CSS, JS

## Local Development

No build step required. Just serve the files:

```bash
# Python
python -m http.server 3000

# Node (with npx)
npx serve

# etc
```

## Deployment

Static files, deploy anywhere (S3, Netlify, Vercel, GitHub Pages, etc.).
