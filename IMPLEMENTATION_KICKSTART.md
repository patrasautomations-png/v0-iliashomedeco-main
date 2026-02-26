# ILIAS HOME DECO - Implementation Kickstart Plan

## Project Overview
A luxury furniture and interior design website for ILIAS HOME DECO based in Kefalonia, featuring an interactive portfolio, product collections, and lead generation capabilities.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS, Framer Motion, TypeScript

---

## Phase 1: Project Setup & Configuration
**Duration:** 1-2 days | **Dependencies:** None

### 1.1 Environment Setup
- [ ] Initialize Next.js 16 project with TypeScript and Tailwind CSS
- [ ] Install core dependencies:
  - `framer-motion` (animations and parallax)
  - `lucide-react` (gold-themed icons)
  - `swr` (data fetching and caching)
  - `resend` or `formspree` (form submission service)
  - `next/image` (optimized image handling)
- [ ] Configure `tailwind.config.ts` with:
  - Custom gold color palette (#B8860B, #DAA520, #FFD700)
  - Neutral grays and whites
  - Custom border-radius tokens
- [ ] Set up `globals.css` with:
  - Design tokens (colors, spacing, typography)
  - Baseline styles for luxury aesthetic

### 1.2 Environment Variables
Create `.env.local` with:
```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
RESEND_API_KEY=your_resend_key (or FORMSPREE_ENDPOINT)
NEXT_PUBLIC_VERCEL_BLOB_URL=optional
```

### 1.3 Project Structure
```
/app
  /layout.tsx
  /page.tsx
  /api
    /submit-lead (for form handling)
  /globals.css
/components
  /sections
    /hero.tsx
    /collections.tsx
    /portfolio.tsx
    /philosophy.tsx
    /contact-form.tsx
  /ui
    /hotspot-card.tsx
    /collection-tile.tsx
    /modal.tsx
    /carousel.tsx
/public
  /videos (hero video)
  /images (collection, portfolio images)
/lib
  /constants.ts (collections, portfolio data)
  /utils.ts
```

**Resources Needed:** Vercel project connected to GitHub

---

## Phase 2: Design System & Component Library
**Duration:** 2-3 days | **Dependencies:** Phase 1 complete

### 2.1 Base Components
- [ ] Implement responsive layout container
- [ ] Create button variants (primary, secondary, gold-outlined)
- [ ] Build card component with hover effects
- [ ] Design modal component for form success state
- [ ] Create navigation bar with smooth scroll anchor links

### 2.2 Specialized Components
- [ ] **Hotspot Card Component:**
  - Display product name, category, request button
  - Trigger on portfolio image click
  - Smooth fade-in animation
  
- [ ] **Collection Tile Component:**
  - Scale-up on hover (1.05)
  - Gold glow effect (box-shadow: 0 0 20px rgba(184, 134, 11, 0.3))
  - Image with smooth transition
  
- [ ] **Parallax Container:**
  - Speed: 0.1 (subtle effect)
  - Apply to hero and select sections

### 2.3 Typography & Colors
- [ ] Define font hierarchy (serif for headings, sans-serif for body)
- [ ] Create text color utilities for gold accents
- [ ] Establish spacing scale (4px, 8px, 12px, 16px, 24px, etc.)

**Resources Needed:** Design tokens finalized, Lucide-React icon set reviewed

---

## Phase 3: Core Page Development
**Duration:** 3-4 days | **Dependencies:** Phase 2 complete

### 3.1 Data Structure Setup
Create `/lib/constants.ts`:
- [ ] Define 4 collections:
  ```
  - Furniture (name, description, image URL)
  - Curtains (name, description, image URL)
  - Hanging Systems (name, description, image URL)
  - Mattresses (name, description, image URL)
  ```
- [ ] Define 5-6 portfolio projects with 2-3 hotspots each:
  ```
  - Project name
  - Main image URL
  - Hotspots: [{x, y, productName, category}]
  ```
- [ ] Define 3 philosophy values:
  - Precision (Measurement)
  - Personalization (Selection)
  - Perfection (Installation)

### 3.2 Hero Section
- [ ] Embed hero video (Pexels/Pixabay luxury interior placeholder)
  - Muted, autoplay, loop, playsinline attributes
  - Fallback image
  - Overlay with call-to-action text
- [ ] Add scroll-down indicator
- [ ] Ensure responsive video sizing

**Prerequisites:** Hero video sourced and uploaded to `/public/videos`

### 3.3 Collections Section
- [ ] Build collections grid:
  - Mobile: 1 column
  - Tablet: 2 columns
  - Desktop: 2x2 grid
- [ ] Implement collection tiles with:
  - Image, title, description
  - Hover scale effect (1.05)
  - Gold glow on hover
  - Smooth transitions

### 3.4 Portfolio Section
- [ ] Create interactive portfolio display:
  - Desktop: Horizontal scroll carousel
  - Tablet: 2-column grid
  - Mobile: Vertical stack / touch-enabled carousel
- [ ] Implement hotspot system:
  - Position hotspots on images via absolute positioning
  - Click to reveal mini-card with product details
  - "Request Details" button functionality

**Prerequisites:** Portfolio images and hotspot coordinate data prepared

### 3.5 Philosophy Section
- [ ] Display 3 values as visual cards:
  - Icon (from Lucide-React in gold)
  - Title (Precision, Personalization, Perfection)
  - Description (step-by-step process)
- [ ] Use subtle parallax (0.1 speed)
- [ ] Responsive layout

---

## Phase 4: Advanced Features & Interactions
**Duration:** 2-3 days | **Dependencies:** Phase 3 complete

### 4.1 Contact Form Development
- [ ] Build multi-step form with:
  - Step 1: Name, email, phone
  - Step 2: Room type, preferences, budget range
  - Step 3: Photo upload (Vercel Blob or client preview)
  - Step 4: Review & submit
- [ ] Form validation on each step
- [ ] Error handling with user-friendly messages

### 4.2 Form Submission Logic
- [ ] Integrate Resend or Formspree:
  ```
  POST /api/submit-lead
  - Validate data on backend
  - Send to email via Resend/Formspree
  - Return success response
  ```
- [ ] Photo upload handling (Vercel Blob setup if needed)
- [ ] Rate limiting to prevent spam

**Prerequisites:** Resend/Formspree API key configured

### 4.3 Success Modal
- [ ] Display after form submission:
  - Gold-themed modal
  - Message: "Thank you! Our design team in Kefalonia will contact you within 24 hours."
  - Close button
  - Auto-dismiss after 5 seconds (optional)

### 4.4 Animations & Interactions
- [ ] Framer Motion implementations:
  - Section fade-in on scroll
  - Staggered collection tile animations
  - Hotspot card slide-up animation
  - Modal entrance animation
- [ ] Smooth scroll behavior for anchor links
- [ ] Hover state transitions (200ms)

### 4.5 Footer & Navigation
- [ ] Sticky navigation with smooth scroll anchors
- [ ] Footer with:
  - Social media links
  - Contact info
  - Copyright information
  - Quick links to sections

---

## Phase 5: Responsive Design & Testing
**Duration:** 1-2 days | **Dependencies:** Phase 4 complete

### 5.1 Breakpoint Testing
- [ ] Mobile (375px - 640px):
  - Collections: 1 column
  - Portfolio: Vertical stack / carousel
  - Form: Full-width inputs, single column
  - Navigation: Hamburger menu (if needed)

- [ ] Tablet (641px - 1024px):
  - Collections: 2 columns
  - Portfolio: 2-column grid
  - Form: 2-column layout where applicable

- [ ] Desktop (1025px+):
  - Collections: 2x2 grid
  - Portfolio: Horizontal carousel
  - Full-width layouts with max-width container

### 5.2 Performance Testing
- [ ] Video optimization:
  - Ensure .mp4 and .webm formats provided
  - Test autoplay and lazy loading
  - Monitor Core Web Vitals (LCP, CLS, FID)
- [ ] Image optimization:
  - Use Next.js `<Image>` component
  - Implement responsive image sizes
  - Add blur placeholders
- [ ] Lighthouse audit (target: >90 performance score)

### 5.3 Cross-Browser Testing
- [ ] Test on Chrome, Firefox, Safari, Edge
- [ ] Verify all animations and interactions work smoothly
- [ ] Check form submission on all browsers

### 5.4 Accessibility Testing
- [ ] ARIA labels on interactive elements (hotspots, buttons)
- [ ] Keyboard navigation support
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] Video captions/transcripts (if applicable)

**Resources Needed:** Testing devices/emulators, Lighthouse CLI

---

## Phase 6: SEO & Metadata
**Duration:** 1 day | **Dependencies:** Phase 5 complete

### 6.1 Meta Tags & Open Graph
- [ ] Set `layout.tsx` metadata:
  ```
  title: "ILIAS HOME DECO - Luxury Furniture & Interior Design in Kefalonia"
  description: "Discover premium furniture collections, interior design services, and bespoke solutions for your Kefalonian home."
  viewport: "width=device-width, initial-scale=1"
  theme-color: "#B8860B"
  ```
- [ ] Open Graph tags:
  - og:title, og:description, og:image
  - twitter:card for social sharing

### 6.2 Structured Data
- [ ] Add JSON-LD schema for:
  - Organization (ILIAS HOME DECO)
  - Local Business (Kefalonia location)
  - Product schema for collections

### 6.3 Robots & Sitemap
- [ ] Create `robots.txt` (allow all for SEO)
- [ ] Generate `sitemap.xml` (auto-generated by Next.js)

---

## Phase 7: Deployment & Launch
**Duration:** 1 day | **Dependencies:** Phase 6 complete, all testing passed

### 7.1 Pre-Deployment Checklist
- [ ] All environment variables set in Vercel dashboard
- [ ] GitHub repository connected
- [ ] Domain configured (if applicable)
- [ ] SSL certificate verified
- [ ] CDN caching configured for static assets

### 7.2 Vercel Deployment
- [ ] Push code to main branch
- [ ] Vercel auto-deploys
- [ ] Verify deployment preview
- [ ] Run production Lighthouse audit
- [ ] Test form submission in production

### 7.3 Monitoring & Analytics
- [ ] Set up Vercel Analytics
- [ ] Configure error tracking (optional: Sentry)
- [ ] Monitor API performance (form submissions)
- [ ] Set up email notifications for failed submissions

### 7.4 Post-Launch
- [ ] Monitor uptime and performance
- [ ] Gather user feedback on form and interactions
- [ ] Plan future enhancements (blog, gallery, testimonials)
- [ ] Schedule content updates (seasonal collections, projects)

**Resources Needed:** Vercel Pro account (if needed for scalability), domain registrar access

---

## Timeline Summary

| Phase | Tasks | Duration | Cumulative |
|-------|-------|----------|-----------|
| Phase 1 | Setup & Config | 1-2 days | 1-2 days |
| Phase 2 | Design System | 2-3 days | 3-5 days |
| Phase 3 | Core Pages | 3-4 days | 6-9 days |
| Phase 4 | Advanced Features | 2-3 days | 8-12 days |
| Phase 5 | Testing | 1-2 days | 9-14 days |
| Phase 6 | SEO | 1 day | 10-15 days |
| Phase 7 | Deployment | 1 day | 11-16 days |

**Total Estimated Duration:** 2-3 weeks (with parallel work possible)

---

## Key Dependencies & Blockers

| Dependency | Status | Impact | Mitigation |
|------------|--------|--------|-----------|
| Hero video sourced | Pending | Critical | Use Pexels/Pixabay placeholder, replace later |
| Portfolio images & hotspot coords | Pending | Critical | Create dummy data, update after photography |
| Email service API key | Pending | High | Register Resend/Formspree account early |
| Domain name | Optional | Medium | Can deploy on Vercel subdomain first |
| SEO requirements finalized | Pending | Low | Use defaults, refine post-launch |

---

## Success Criteria & Acceptance

- [ ] All pages render correctly on mobile, tablet, desktop
- [ ] Form submissions deliver emails successfully
- [ ] Video autoplays and loops without issues
- [ ] Animations are smooth (60fps)
- [ ] Lighthouse score >90 on performance
- [ ] All interactive elements are keyboard-accessible
- [ ] SEO metadata properly configured
- [ ] Production deployment successful

---

## Notes for Future Phases

**MVP Complete:** Sections 1-7 deliver a fully functional MVP.

**Future Enhancements:**
- Blog section with dynamic content
- Testimonials/reviews carousel
- Advanced photo gallery with lightbox
- Client dashboard for order tracking
- Integration with CRM (Pipedrive) for lead management
- Multi-language support (Greek/English)
- Booking system for design consultations

---

**Version:** 1.0  
**Last Updated:** 2026-02-26  
**Project Lead:** [Your Name]  
**Status:** Ready for Development Kickoff
