# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Astro dev server with hot reload
npm run build    # Production static build → dist/
npm run preview  # Preview production build locally
```

No lint or test commands are configured.

## Architecture

**Astro 4.x static site** deployed to Cloudflare Pages. Output is pure static HTML/CSS/JS — no server runtime. All components render to HTML at build time; no client-side framework (React/Vue) is used.

### Directory Structure

- `src/pages/` — File-based routing. Each `.astro` file becomes a route.
- `src/layouts/Layout.astro` — Root layout. Contains an anti-flicker inline script that reads `localStorage('rmr-theme')` and applies `.dark` or `.orange` to `<html>` before first paint.
- `src/components/` — Reusable Astro components (SEO, ThemeToggle, VerticalCard).
- `src/styles/global.css` — Global CSS with Tailwind directives and CSS custom properties for the design token system.
- `tailwind.config.mjs` — Defines the full design system: brand colors, typography, custom component classes, shadows, and background patterns.

### Theme System

Three-mode toggle: Light → Dark → Orange. Theme class (`.dark` or `.orange`) is applied to `<html>` via `ThemeToggle.astro`. The anti-flicker script in `Layout.astro` must run before any CSS to prevent FOUC — do not move it or make it async.

Theme persistence: `localStorage` key `rmr-theme`, with `prefers-color-scheme` as fallback.

### Design System

Defined entirely in `tailwind.config.mjs`. Key points:

- **Brand colors**: Industrial orange (`#e8651a` primary), charcoal gray scale.
- **Dark mode strategy**: `class`-based (not `media`).
- **Custom Tailwind plugin classes**: `.btn-industrial`, `.btn-ghost-industrial`, `.label-mono`.
- **Typography**: Barlow Condensed (display/headings), Barlow (body), IBM Plex Mono (labels, CTAs, code).
- **CSS custom properties**: All colors are exposed as `--color-*` tokens in `global.css` for each theme variant, enabling `:root`-level theme switching.

### SEO Component

`src/components/SEO.astro` handles all meta tags, Open Graph, Twitter Card, and JSON-LD structured data (Organization schema). Pass SEO props via the Layout, not directly from pages.

### Adding Pages

Create `src/pages/<route>/index.astro`. Import `Layout.astro` and pass `title`, `description`, `keywords`, `canonicalURL`, and optionally `ogImage` and `showTopbar`.

### Deployment

Cloudflare Pages via GitHub integration. Build command: `npm run build`. Output directory: `dist/`. The `@astrojs/cloudflare` adapter is installed but `astro.config.mjs` uses `output: 'static'` — the site is fully static.
