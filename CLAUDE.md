# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Branch workflow

```
draft   ← write new posts (unpublished)
  ↓ merge PR
master  ← review and edit
  ↓ merge PR
release ← triggers CI/CD → deploys to public internet
```

## Deploy

Merging into `release` triggers `.github/workflows/publish.yml`, which builds Jekyll and deploys to GitHub Pages. Site live at https://nolandpham.github.io

No local build needed.

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
