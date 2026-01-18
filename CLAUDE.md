# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## Architecture

This is a Next.js 16 project using the App Router with:
- **React 19** and **TypeScript**
- **Tailwind CSS v4** (using `@import "tailwindcss"` syntax in CSS, with `@theme inline` for custom properties)
- **Geist font** via `next/font/google`

### Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).

### App Structure

- `app/layout.tsx` - Root layout with font configuration and metadata
- `app/page.tsx` - Home page
- `app/globals.css` - Global styles and Tailwind theme configuration
- `public/` - Static assets
