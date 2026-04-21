# Design Brief

## Purpose
Gallery + upload hybrid for premium 4K stickers. Image-first editorial experience where stickers dominate visual hierarchy.

## Tone
Premium, clean, editorial. Professional curation. Modern minimalism with depth.

## Aesthetic
Dark mode gallery inspired by Unsplash and Adobe Stock. Deep charcoal foundation with vibrant teal accent. Sticker thumbnails as primary focal points. Smooth hover interactions and layered depth through shadows.

## Color Palette

| Token | OKLCH | Usage |
|-------|-------|-------|
| background | 0.11 0 0 | Page background (near-black) |
| card | 0.15 0 0 | Card surfaces, elevated panels |
| foreground | 0.95 0 0 | Primary text |
| border | 0.22 0 0 | Subtle dividers, input borders |
| primary / accent | 0.62 0.2 200 | CTAs, category badges, interactive highlights (teal) |
| secondary | 0.25 0 0 | Secondary UI, disabled states |
| muted | 0.22 0 0 | Tertiary text, secondary content |
| destructive | 0.61 0.24 30 | Delete, error states (coral) |

## Typography

| Layer | Font | Weight | Usage |
|-------|------|--------|-------|
| Display | Bricolage Grotesque | 700-900 | Page titles, hero section, category labels |
| Body | DM Sans | 400-600 | Body text, card content, descriptions |
| Mono | Geist Mono | 400 | Metadata, upload dates, file info |

## Structural Zones

| Zone | Background | Border | Depth |
|------|------------|--------|-------|
| Header | card | border-b | Elevated with shadow-card |
| Hero Banner | background + gradient accent overlay | none | Full-width immersive |
| Gallery Grid | background | none | Cards elevated with shadow-card |
| Upload Form | card | border subtle | Contained panel with shadow-elevated |
| Detail Modal | popover | border subtle | Overlay with shadow-elevated |
| Footer | background | border-t | Minimal contrast |

## Spacing & Rhythm
- Padding base: 1rem (16px)
- Grid gap: 1.5rem (24px)
- Card padding: 1.25rem (20px)
- Border radius: 12px (0.75rem)

## Component Patterns

### Gallery Cards
- Image container with aspect-square, rounded corners
- Hover: scale(1.05), shadow-elevated, smooth transition
- Content: title (font-display md), uploader (font-body sm), category badge (accent)

### Category Badges
- Pill-shaped, accent color background, border subtle, text accent
- Hover: bg-accent/20

### CTAs & Buttons
- Primary: bg-primary text-primary-foreground, rounded-lg, shadow-card
- Hover: shadow-elevated, brightness +5%
- Upload button: prominent, hero placement

### Input Fields
- bg-input border-border, rounded-md, text-foreground placeholder-muted-foreground
- Focus: ring-2 ring-accent

### Detail Modal
- Dark popover background, overlay shadow-elevated
- Large preview image, metadata below
- Close button top-right, accent color on hover

## Motion
- Card entrance: fade-in + scale-in (0.2s ease-out)
- Hover interactions: shadow and scale transitions (0.3s smooth)
- Modal backdrop: fade-in (0.3s)
- Category filters: smooth opacity transitions on active state

## Constraints
- No full-page gradients or ambient effects
- Accent color used sparingly: CTAs, badges, active states only
- No rounded-full except pills/badges
- Shadows convey depth, not decoration
- Text hierarchy through weight and size, not color

## Signature Detail
Large teal accent underlines on section titles + sticker category badges create visual continuity without overload. Smooth scale transforms on card hover make the gallery feel responsive and premium.

