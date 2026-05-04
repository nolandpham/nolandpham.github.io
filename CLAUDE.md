# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deploy

Push to `origin/main` → GitHub Pages auto-deploys. Site live at https://nolandpham.github.io

No local build needed — GitHub Pages runs Jekyll automatically.

## Stack

- **Jekyll** (GitHub Pages) — static site generator
- **Minima theme** (`_config.yml`) with custom layout
- `index.jade` — Jade/Pug template (source), but the site uses `index.md`
- Single layout: `_layouts/default.html`
- CSS: `assets/css/style.css`

## Navigation structure

Sidebar uses the **PARA** system (Projects / Areas / Resources / Archives), hardcoded in `_layouts/default.html`. Adding a new section requires updating both the layout and creating the corresponding directory/file.

## Adding content

All `.md` files require frontmatter:
```yaml
---
title: Page title
layout: default
---
```
