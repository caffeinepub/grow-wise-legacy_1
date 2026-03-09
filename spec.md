# Grow Wise Legacy

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full knowledge platform website with public-facing sections and an admin CMS
- Sticky header with logo "Grow Wise" and nav: Home, Blog, Personal Growth, Wealth, Lifestyle, Tools, About
- Hero section: headline, subtext, two CTAs ("Explore Articles", "Recommended Tools")
- "Explore Topics" section: 3 topic cards (Personal Growth, Wealth, Lifestyle) — editable via admin
- "Featured Guides" section: 3 guide cards — editable via admin
- "Recommended Tools" section: tool list with "View Tool" button — managed via admin
- "Join The Growth Circle" email capture section (no backend email sending; just stores email subscribers)
- "Latest Articles" / Blog section: article cards — managed via admin
- Footer with copyright "2026 Grow Wise Legacy"
- Fade-up scroll animations on section entry
- Admin panel at `/admin` route for managing: Articles, Featured Guides, Tools, Topic Cards
- Authorization (Internet Identity login) to protect the admin route

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan

### Backend (Motoko)
- `Article` type: id, title, summary, category, content, publishedAt
- `Guide` type: id, title, description
- `Tool` type: id, name, description, link
- `TopicCard` type: id, title, description
- `Subscriber` type: email, subscribedAt
- CRUD operations for Article, Guide, Tool, TopicCard
- Add subscriber (email capture)
- Seed data: sample articles, guides, tools, topic cards
- Admin-only mutations protected by caller principal check (authorization component)

### Frontend
- React + TypeScript + Tailwind CSS
- Google Fonts: Poppins (headings), Inter (body)
- Color tokens: dark primary #1F2933, gold accent #C9A227, light background #F9FAFB
- Public routes: `/` (landing page with all sections), `/blog`, `/admin`
- `IntersectionObserver`-based fade-up animation hook for section entry
- Header: sticky, logo + nav links
- Hero: full-width, headline + subtext + CTA buttons
- Explore Topics: 3 cards (dynamic from backend)
- Featured Guides: 3 centered cards (dynamic)
- Recommended Tools: list with "View Tool" button (dynamic)
- Email Capture: dark-bg section, email input + Join button (calls addSubscriber)
- Latest Articles: article card grid (dynamic, latest 6)
- Footer: copyright
- Admin panel `/admin`: tabbed CMS for Articles, Guides, Tools, Topic Cards — full add/edit/delete UI
- Authorization: Internet Identity login required for admin mutations; admin checks caller
