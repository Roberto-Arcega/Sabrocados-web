# Sabrocados

Landing page for Sabrocados - artisanal dehydrated pork snacks with lime and triple black sauce. High in protein, low in carbs, keto-friendly.

## Tech Stack

- **Next.js 16** with App Router
- **React 19** and **TypeScript**
- **Tailwind CSS v4**
- **Geist** font family

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

```bash
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm test             # Run unit tests (Vitest)
pnpm test:run         # Run unit tests once
pnpm test:coverage    # Run tests with coverage
pnpm test:e2e         # Run E2E tests (Playwright)
pnpm test:e2e:ui      # Run E2E tests with UI
```

## Project Structure

```
app/
├── components/
│   ├── sections/       # Page sections (Hero, FAQ, Testimonials, etc.)
│   ├── seo/            # SEO components (JsonLd)
│   └── ui/             # UI components (WhatsAppButton, SectionHeading)
├── layout.tsx          # Root layout with metadata and fonts
├── page.tsx            # Home page
├── globals.css         # Global styles and Tailwind theme
├── robots.ts           # Robots.txt configuration
└── sitemap.ts          # Sitemap configuration
public/                 # Static assets (images, favicons)
```

## Features

- Responsive landing page with dark theme
- WhatsApp integration for orders
- SEO optimized with structured data (JSON-LD)
- Contact form
- Smooth scroll navigation
