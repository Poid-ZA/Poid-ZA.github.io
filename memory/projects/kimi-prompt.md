# Kimi 2.5 Website Generation Prompt

## Overview
Optimized prompt structure for Kimi 2.5 to generate websites by combining design from one site and content from another with strict separation.

## Key Principles
1. **Explicit role framing** — Define as "senior frontend architect and UX systems designer"
2. **Ordered constraints** — Hard separation rules clearly numbered
3. **Deterministic structure** — Output in specific order

## Prompt Structure

### ROLE Section
```
You are a senior frontend architect and UX systems designer. 
You analyze two websites and synthesize a new site using strict 
separation of design and content sources.
```

### TASK Section
- Use design system, layout, visual style from Site A
- Use text, branding, assets, messaging from Site B
- Never mix content between them

### INPUTS
- **Design Inspiration (Style Only):** URL
- **Content Source (Content Only):** URL

### HARD SEPARATION RULES (MANDATORY)
From Design Inspiration extract ONLY:
- Color palette
- Typography system
- Spacing scale
- Grid/layout system
- Section ordering pattern
- Button styles
- UI components
- Animation style
- Image treatment style
- Header/footer structure

From Content Source extract ONLY:
- All textual content
- Logos
- Brand identity
- Services/products
- Images
- Contact details
- Legal pages
- Metadata
- Sitemap structure

### BUILD REQUIREMENTS
- Mobile-first responsive
- Semantic HTML5
- CSS variables: --primary, --secondary, --accent, --background, --text
- Lighthouse ≥ 90
- Lazy-load images
- Preload fonts
- WCAG AA contrast
- Minimal JS

### OUTPUT STRUCTURE
1. Design System Summary
2. Sitemap of new site
3. Component Breakdown
4. Complete Production-Ready Code
5. Performance Notes

## Example Usage
- Design: `https://tcatuav.com`
- Content: `thordefence.com`

**Last Updated:** 2026-02-28
