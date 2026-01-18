# Sabrocados Design System

This document outlines the design system for the Sabrocados crypto wallet landing page.

## Color Palette

### Background Colors

| Name | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Background | `--background` | `#0A0A0A` | Main dark background |
| Surface | `--surface` | `#1A1A1A` | Card backgrounds, elevated surfaces |
| Surface Light | `--surface-light` | `#2A2A2A` | Higher elevation surfaces, borders |

### Primary Colors

| Name | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Primary | `--primary` | `#F97316` | CTAs, accents, active states |
| Primary Hover | `--primary-hover` | `#EA580C` | Button hover states |
| Primary Light | `--primary-light` | `#FDBA74` | Gradient endpoints, subtle accents |

### Text Colors

| Name | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Text Primary | `--text-primary` | `#FFFFFF` | Headlines, primary text |
| Text Secondary | `--text-secondary` | `#9CA3AF` | Descriptions, secondary text |
| Text Muted | `--text-muted` | `#6B7280` | Subtle text, labels |

### Status Colors

| Name | CSS Variable | Hex | Usage |
|------|-------------|-----|-------|
| Success | `--success` | `#22C55E` | Positive indicators, gains |
| Danger | `--danger` | `#EF4444` | Negative indicators, losses |

### Borders

| Name | CSS Variable | Value | Usage |
|------|-------------|-------|-------|
| Border | `--border` | `rgba(255,255,255,0.1)` | Card borders, dividers |
| Border Light | `--border-light` | `rgba(255,255,255,0.05)` | Subtle borders |

### Gradients

| Name | Colors | Usage |
|------|--------|-------|
| Warm Gradient | `#F97316 → #FDBA74` | Accent gradients, text highlights |
| Pink Gradient | `#FDA4AF → #FB7185` | Balance card background |

---

## Typography

### Font Family

- **Sans-serif:** Geist Sans (`--font-sans`)
- **Monospace:** Geist Mono (`--font-mono`)

### Font Sizes (Tailwind)

| Class | Size | Usage |
|-------|------|-------|
| `text-7xl` | 72px | Hero headline (desktop) |
| `text-5xl` | 48px | Hero headline (tablet) |
| `text-4xl` | 36px | Hero headline (mobile) |
| `text-xl` | 20px | Hero description |
| `text-lg` | 18px | Large body text |
| `text-base` | 16px | Body text, buttons |
| `text-sm` | 14px | Navigation links, card text |
| `text-xs` | 12px | Labels, small text |

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-bold` | 700 | Headlines, emphasis |
| `font-semibold` | 600 | Subheadings, card titles |
| `font-medium` | 500 | Buttons, navigation |
| Default | 400 | Body text |

---

## Components

### Button

```tsx
import Button from "@/app/components/Button";

// Primary (default)
<Button variant="primary" size="md">Get Started</Button>

// Ghost
<Button variant="ghost" size="sm">Log in</Button>

// Outline
<Button variant="outline" size="lg">Learn More</Button>
```

**Variants:**
- `primary` - Orange fill, white text
- `ghost` - Transparent, hover shows surface
- `outline` - Border only, transparent fill

**Sizes:**
- `sm` - `px-4 py-2 text-sm`
- `md` - `px-6 py-3 text-base`
- `lg` - `px-8 py-4 text-lg`

### Badge

```tsx
import Badge from "@/app/components/Badge";

<Badge>
  <span>✨</span>
  <span>AI-driven crypto experience</span>
</Badge>
```

### Floating Cards

```tsx
import SendCard from "@/app/components/FloatingCards/SendCard";
import PriceCard from "@/app/components/FloatingCards/PriceCard";
import BalanceCard from "@/app/components/FloatingCards/BalanceCard";

// Send transaction card
<SendCard />

// Price card (dark or light theme)
<PriceCard coin="ethereum" price="$3,421.67" change={2.34} />
<PriceCard coin="bitcoin" price="$42,891.23" change={-0.87} light />

// Balance card with pink gradient
<BalanceCard />
```

---

## Spacing Scale (Tailwind)

| Class | Size | Usage |
|-------|------|-------|
| `gap-2` | 8px | Tight spacing (icons, badges) |
| `gap-3` | 12px | Card internal spacing |
| `gap-4` | 16px | Button groups, list items |
| `gap-6` | 24px | Section internal spacing |
| `gap-8` | 32px | Navigation links |
| `px-6` | 24px | Container horizontal padding |
| `py-4` | 16px | Header vertical padding |
| `pt-32` | 128px | Hero top padding (accounts for header) |
| `pb-24` | 96px | Section bottom padding |

---

## Effects

### Glass Effect

```css
.glass {
  background: rgba(26, 26, 26, 0.8);
  backdrop-filter: blur(12px);
  border: 1px solid var(--border);
}
```

### Background Gradients

The landing page uses warm corner gradients for ambiance:

```css
.bg-warm-corners::before {
  background:
    radial-gradient(ellipse 80% 50% at 0% 0%, rgba(249, 115, 22, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse 80% 50% at 100% 100%, rgba(253, 186, 116, 0.1) 0%, transparent 50%);
}
```

---

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| Default | 0px | Mobile-first base styles |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets, desktop nav visible |
| `lg:` | 1024px | Desktop, floating cards visible |
| `xl:` | 1280px | Large desktop |

---

## File Structure

```
app/
├── components/
│   ├── Badge.tsx           # Pill badge component
│   ├── Button.tsx          # Reusable button with variants
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section
│   ├── PhoneMockup.tsx     # iPhone frame with floating cards
│   └── FloatingCards/
│       ├── SendCard.tsx    # BTC send transaction card
│       ├── PriceCard.tsx   # Crypto price display card
│       └── BalanceCard.tsx # Pink gradient balance card
├── globals.css             # Color system and utilities
├── layout.tsx              # Root layout
└── page.tsx                # Landing page composition
```
