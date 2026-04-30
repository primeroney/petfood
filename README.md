# PetVital – D2C Pet Food Brand Design System
## Complete Shopify Design Handoff Package

**Status**: ✅ Ready for Developer Implementation  
**Format**: HTML/CSS Prototypes + Comprehensive Documentation  
**Scope**: Desktop (1440px) + Mobile (375px) | All Key User Flows  
**Date**: April 29, 2026

---

## 📦 WHAT'S INCLUDED

This package contains everything your developers need to build the Shopify theme:

### Visual Prototypes (Open in Browser)
- **`components.html`** – Interactive component library with all UI elements
- **`homepage.html`** – Homepage hero to footer (annotated layouts)
- **`product-detail.html`** – Full product page specs + related items
- **`cart-checkout.html`** – Cart → checkout → confirmation (all 3 steps)

### Documentation
- **`DESIGN_SYSTEM.md`** – Complete design specification (colors, typography, spacing, shadows)
- **`HANDOFF_GUIDE.md`** – Detailed developer handoff with CSS patterns, Liquid integration, Figma organization
- **`README.md`** – This file

---

## 🚀 QUICK START (5 MINUTES)

### Full-Stack React + Express + MongoDB App
```
npm run install:all
npm run seed
npm run dev
```
Then open:
```
http://localhost:5173
```
See `SETUP_FULLSTACK.md` for the complete React, Node.js, Express, and MongoDB setup.

### Optional: Run Only the Express Backend
```
npm start
```
Then open:
```
http://localhost:5000/api/health
```
This starts only the backend API. See `BACKEND_SETUP.md` for route details.

### Step 1: View the Design System
```
Open: components.html
In your browser
```
You'll see every button, form, card, and layout option with all states (hover, focus, active, disabled).

### Step 2: Review Page Layouts
```
Open in separate tabs:
- homepage.html        (hero + products + CTA)
- product-detail.html  (product page specs)
- cart-checkout.html   (checkout flow + confirmation)
```
Resize your browser to ~375px (mobile) and see how everything reflows.

### Step 3: Read Design System
```
Open: DESIGN_SYSTEM.md
Review:
- Color palette (with hex values)
- Typography scale (font sizes + weights)
- Spacing scale (4px base)
- Component specs (buttons, forms, cards)
```

### Step 4: Start Building
```
Copy CSS variables into your SCSS
Use HTML structure as template
Follow interaction states for polish
Reference hex values for exact colors
```

---

## 📐 DESIGN SYSTEM AT A GLANCE

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Forest Green | `#2D5C3F` | Primary CTAs, trust elements |
| Warm Tan | `#D4A574` | Secondary accents, highlights |
| Soft Cream | `#FFFBF5` | Page background |
| Text Primary | `#2C3E50` | Headlines, body copy |
| Text Secondary | `#7A8A99` | Captions, helper text |
| Border | `#E8ECEF` | Inputs, dividers, cards |
| Success | `#27AE60` | Confirmations, "In Stock" |
| Error | `#E74C3C` | Form errors, warnings |

### Spacing Scale (4px Base)
```
4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px
```

### Typography
```
H1: 48px, 700 weight (hero headlines)
H2: 36px, 700 weight (section titles)
H3: 28px, 600 weight (subsections)
H4: 20px, 600 weight (cards, products)
Body: 14px, 400 weight (default text)
```

### Responsive Breakpoints
```
Mobile:   320px – 767px   (single column)
Tablet:   768px – 1023px  (2-column, 8-column grid)
Desktop:  1440px+         (full layout, 12-column grid)
```

---

## 📄 FILE DESCRIPTIONS

### `components.html`
**What**: Interactive component library  
**Use**: Reference for button states, form inputs, cards, navigation  
**Contains**:
- Button variants (primary, secondary, tertiary, action)
- Button sizes (small, regular, large) + states (default, hover, disabled)
- Product cards & feature cards with hover effects
- Forms (inputs, selects, textareas, validation states)
- Navigation bar (desktop & mobile menu structure)
- Badges & tags (colored variants)
- Color palette swatches with hex values
- Typography scale (all heading & text sizes)
- Spacing scale visual reference

**How to use**:
1. Open in browser → see all components
2. Hover over elements → see interaction states
3. Inspect HTML/CSS → copy structure & styles
4. Use as reference while building theme

---

### `homepage.html`
**What**: Complete homepage design comp (desktop + mobile responsive)  
**Use**: Layout reference for hero, products, CTA sections  
**Sections**:
- Navigation (sticky header, 64px height)
- Hero (gradient background, centered text, 2 CTAs)
- Trust Section (4 badges highlighting brand values)
- Featured Products (4-column grid, product cards)
- CTA Section (newsletter signup / subscription promo)
- Footer (4-column nav, links, company info)

**Responsive Behavior**:
- Desktop (1440px): 4-product grid, full nav
- Tablet (768px): 2-product grid, sticky nav
- Mobile (375px): 1-column, hamburger menu

**Annotations**: Yellow boxes explain layout decisions, spacing, hover states

**How to use**:
1. Study the component placement and spacing
2. Copy section structure to Shopify sections
3. Use as guide for store homepage
4. Note breakpoints where layouts change

---

### `product-detail.html`
**What**: Product page design with all specifications  
**Use**: Reference for product layout, image treatment, option selectors  
**Sections**:
- Breadcrumbs (navigation path)
- Product Image (1:1 aspect ratio, "New" badge)
- Product Info
  - Title, rating, stock status
  - Price display (large, bold, primary color)
  - Description box
  - Size selector (4 size buttons)
  - Quantity selector (−/+/input)
  - CTAs (Add to Cart, Subscribe & Save, Wishlist)
  - Product specs table (2-column label/value)
- Related Products (4-column grid below)

**Responsive**:
- Desktop: 2-column (image | info)
- Mobile: 1-column (image stacks on info)

**Annotations**: Explain grid layouts, focus states, color usage

**How to use**:
1. Reference image sizing & aspect ratio
2. Copy spec table structure
3. Use button arrangement as template
4. Implement option selectors from pattern

---

### `cart-checkout.html`
**What**: Cart page → Checkout form → Order confirmation (all 3 steps)  
**Use**: Reference for form fields, progress indicators, summary layout  
**Sections**:
- **Progress Bar**: Step 1 (Cart✓) → Step 2 (Checkout → active) → Step 3 (Confirm)
- **Cart Page**:
  - Cart items list (image | details | price)
  - Edit/Remove actions per item
  - Order summary sidebar (subtotal, shipping, tax, total)
- **Checkout Page**:
  - Shipping address form (email, names, address, city, state, zip)
  - Shipping method selector (Standard Free / Express $12.99 / Overnight $24.99)
  - Payment method selector (Card / PayPal)
  - Card form (name, card#, expiry, CVV)
  - Order review (items recap + total)
  - Place Order button
- **Confirmation Page**:
  - Success icon + message
  - Order number
  - What's next (processing, shipping, tracking)
  - CTAs (Continue Shopping, View Account)

**Form States**:
- Focus: Blue border + subtle glow
- Error: Red border + error message
- Filled: Normal state
- Disabled: Gray out

**Annotations**: Form field patterns, radio/checkbox styling, progress indicator

**How to use**:
1. Copy form structures for Shopify checkout
2. Reference progress bar implementation
3. Use order summary layout (sticky on desktop)
4. Implement confirmation message pattern

---

### `DESIGN_SYSTEM.md`
**What**: Complete specification document  
**Use**: Reference for exact values (colors, sizes, spacing, shadows)  
**Contains**:
- Color palette (all colors, hex, RGB, usage)
- Color accessibility (contrast ratios)
- Typography (font stack, type scale table)
- Spacing scale (with application rules)
- Grid system (12-col desktop, 8-col tablet, 1-col mobile)
- Component specs (buttons, cards, forms, navigation)
- Shadow system (4 levels with pixel values)
- Border radius (4 sizes)
- Animations & transitions (timing functions, keyframes)
- Iconography (style guide, 24px default)
- Image treatment (dimensions, formats, optimization)
- Interaction states (hover, focus, active, disabled, loading)
- Responsive breakpoints

**How to use**:
1. Copy color hex values into CSS variables
2. Reference font sizes for all text elements
3. Use spacing scale for padding/margins
4. Check accessibility contrast ratios
5. Implement button/form states exactly

---

### `HANDOFF_GUIDE.md`
**What**: Comprehensive developer guide  
**Use**: Step-by-step instructions for building the theme  
**Contains**:
- Quick start checklist
- Project overview & brand context
- Design system deep-dive
- Component specifications (detailed)
- Page layout architecture
- Assets & icons guide
- Development notes (CSS patterns, accessibility, Shopify Liquid integration)
- Interaction state examples
- Mobile & responsive rules
- Figma file organization (if transferring to Figma)
- Quick reference cheat sheet

**Sections**:
- **CSS Architecture**: Variables, mobile-first, BEM naming
- **Accessibility**: Focus states, contrast, semantic HTML, ARIA
- **Shopify Integration**: Liquid syntax examples for products, loops
- **Responsive**: Breakpoints, grid changes, touch-sizing
- **Performance**: Image optimization, WebP, lazy loading

**How to use**:
1. Read "Quick Start" section first
2. Reference CSS patterns when building components
3. Copy color/spacing variables
4. Check accessibility section for focus states
5. Review Shopify Liquid examples for theme integration
6. Use cheat sheet while coding

---

## 🎨 DESIGN HIGHLIGHTS

### Modern & Clean Aesthetic
- Generous whitespace (breathing room)
- High-quality product photography
- Clear visual hierarchy
- Minimal visual clutter

### Pet-Friendly & Approachable
- Warm color palette (forest green + tan)
- Friendly icons & illustrations
- Trust badges prominent
- Conversational, not clinical language

### E-Commerce Optimized
- Progress indicators guide users
- Clear CTAs (primary button always visible)
- Product recommendations throughout
- Easy cart/checkout flow
- Mobile-first responsive design

### Accessibility First
- 4.5:1+ contrast ratios (WCAG AA)
- All interactive elements keyboard accessible
- Focus states clearly visible
- Semantic HTML structure
- ARIA labels where needed

---

## 💻 FOR DEVELOPERS

### Getting Started
1. **View all files** in browser (open HTML files)
2. **Review** DESIGN_SYSTEM.md for exact specifications
3. **Read** HANDOFF_GUIDE.md for integration patterns
4. **Copy** CSS structure from `<style>` tags
5. **Build** Shopify theme using these as templates
6. **Test** responsiveness (375px, 768px, 1440px)
7. **Verify** accessibility (focus states, contrast)

### Key Takeaways
- ✅ All colors use CSS variables (easy to theme)
- ✅ Spacing is based on 4px base (predictable)
- ✅ Typography scale is documented (no guessing)
- ✅ Component states are annotated (hover, focus, disabled)
- ✅ Responsive breakpoints clearly defined
- ✅ Forms have validation states designed
- ✅ Navigation has mobile menu pattern

### What to Build First
1. Colors & typography (CSS variables)
2. Buttons (all variants + states)
3. Form inputs (focus, error, disabled states)
4. Cards (product + feature)
5. Navigation (desktop + mobile menu)
6. Grids (12-col, 8-col, 1-col)
7. Product detail page
8. Cart & checkout flow
9. Homepage sections
10. Polish & micro-interactions

---

## 📱 RESPONSIVE DESIGN

All comps provided for **2 viewports**:
- **Desktop**: 1440px (full layout)
- **Mobile**: 375px (touch-friendly)

All HTML files are fully responsive. **Resize your browser to see**:
- Navigation → hamburger menu
- Grids → single column
- Form rows → stack
- Hero height → reduce

### Breakpoints Used
- Mobile: 320px – 767px
- Tablet: 768px – 1023px
- Desktop: 1440px+

---

## 🎯 WHAT'S NOT INCLUDED

This is a **design system & visual specification**, not a complete theme build:
- ❌ No Shopify Liquid code (you'll write this from scratch)
- ❌ No backend integration (connect your own API)
- ❌ No payment processing (use Shopify's native solution)
- ❌ No inventory management (use Shopify dashboard)
- ❌ No user accounts (Shopify handles this)

What you **do get**:
- ✅ Complete visual design specification
- ✅ Interactive prototypes (HTML/CSS)
- ✅ All colors, fonts, spacing documented
- ✅ Component patterns ready to code
- ✅ Responsive layouts with annotations
- ✅ Interaction states (hover, focus, etc)
- ✅ Developer integration guide

---

## 🔧 TECHNICAL SPECS

### Viewport Sizes
```
Mobile:   375px × 667px (iPhone 8/SE)
Tablet:   768px × 1024px (iPad)
Desktop:  1440px × 900px (standard laptop)
```

### File Formats
```
HTML:     Semantic HTML5, no frameworks
CSS:      Plain CSS with custom properties (ready for SCSS)
Assets:   Emojis as placeholders (replace with SVGs)
Images:   JPG/PNG specs provided (implement your own)
```

### Browser Support
```
✅ Chrome/Edge (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Mobile browsers (iOS Safari, Chrome Android)
```

---

## 📋 HANDOFF CHECKLIST

Before you start building, confirm you have:

- ✅ Reviewed all 4 HTML files in browser
- ✅ Read DESIGN_SYSTEM.md (colors, typography, spacing)
- ✅ Read HANDOFF_GUIDE.md (CSS patterns, accessibility, Liquid)
- ✅ Noted all color hex values (8 main colors)
- ✅ Understood spacing scale (4px base)
- ✅ Identified responsive breakpoints (375px, 768px, 1440px)
- ✅ Reviewed button states (hover, focus, active, disabled)
- ✅ Checked form focus states (border + glow)
- ✅ Noted navigation pattern (sticky header, mobile menu)
- ✅ Understood product page layout (image/info side-by-side)
- ✅ Reviewed cart/checkout flow (3-step progress)

---

## 🎨 FOR DESIGNERS (If Converting to Figma)

If you need to convert these specs to native Figma:

1. **Create pages** for each major component
2. **Set up CSS variables** as Figma variables
3. **Build components** with Auto Layout
4. **Create component variants** for all states
5. **Use grid layouts** with proper spacing
6. **Document interactions** in prototypes
7. **Export assets** (icons, icons, illustrations)
8. **Set up specs** annotations for developers

See "Figma File Organization" in HANDOFF_GUIDE.md for detailed structure.

---

## 📞 QUESTIONS?

### Common Questions

**Q: Should I use this exactly or customize colors?**  
A: This is your brand's visual system. Stick to these colors for launch; then adjust if data suggests changes.

**Q: Can I use different spacing?**  
A: Use the 4px system consistently. Only deviate if you have a strong reason (maintains rhythm).

**Q: What about animations?**  
A: All transitions are 250ms ease (standard). See DESIGN_SYSTEM.md for specific easing functions.

**Q: Do I need to implement all components?**  
A: Yes. These are the core components used throughout the site.

**Q: How do I handle dark mode?**  
A: Not in scope for v1. Focus on light theme first, then add dark mode variants.

**Q: What about loading states?**  
A: Design shows default + hover. Implement loading spinners for buttons during form submission.

---

## 📊 PROJECT STATS

- **Colors**: 8 primary + 4 semantic
- **Typography**: 8 sizes (H1–H4, Body regular/small, Button, Label)
- **Spacing**: 8 scale values (4px–96px)
- **Components**: 8+ major (buttons, cards, forms, nav, badges, etc)
- **Pages**: 5 major flows (home, product, cart, checkout, confirmation)
- **Breakpoints**: 3 (mobile, tablet, desktop)
- **Responsive Patterns**: 15+ layout variations
- **States**: 40+ interactive states documented

---

## 🚀 READY TO BUILD?

1. Open `components.html` in browser → Get familiar with system
2. Open individual page comps → Study layout patterns
3. Read `DESIGN_SYSTEM.md` → Understand specs
4. Read `HANDOFF_GUIDE.md` → Learn implementation
5. Start building → Reference files as you code
6. Test → Desktop (1440px) + Mobile (375px)
7. Polish → Implement all hover/focus states
8. Launch → Your beautiful Shopify store! 🎉

---

## 📄 FILE MANIFEST

```
petfood-shopify-design/
├── README.md                    (You are here)
├── DESIGN_SYSTEM.md             (Specifications: colors, typography, spacing)
├── HANDOFF_GUIDE.md             (Developer guide: CSS patterns, integration)
├── components.html              (Component library: all UI elements + states)
├── homepage.html                (Homepage comp: hero to footer)
├── product-detail.html          (Product page: full detail + specs)
├── cart-checkout.html           (Cart → Checkout → Confirmation flow)
└── /assets/                     (Future: SVG icons, images)
```

---

**PetVital Design System v1.0**  
**Status**: ✅ Complete & Ready for Theme Development  
**Last Updated**: April 29, 2026  

**Questions? Check the HANDOFF_GUIDE.md for detailed developer instructions.**

---

### Quick Links
- 🎨 **Design System**: DESIGN_SYSTEM.md
- 👨‍💻 **Developer Guide**: HANDOFF_GUIDE.md
- 🧩 **Components**: components.html
- 🏠 **Pages**: homepage.html, product-detail.html, cart-checkout.html

**Ready to build? Open components.html in your browser first!**
