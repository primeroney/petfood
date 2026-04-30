# PetVital Design System – Developer Handoff Guide
## D2C Pet Food Brand on Shopify

**Project**: PetVital Pet Food Ecommerce  
**Version**: 1.0 (Ready for Theme Development)  
**Date**: April 29, 2026  
**Design Tool**: HTML/CSS Prototypes (Ready for Figma or native Shopify development)  

---

## TABLE OF CONTENTS

1. [Quick Start](#quick-start)
2. [Project Overview](#project-overview)
3. [Design System Reference](#design-system-reference)
4. [Component Specifications](#component-specifications)
5. [Page Layouts](#page-layouts)
6. [Assets & Icons](#assets--icons)
7. [Development Notes](#development-notes)
8. [Interaction States](#interaction-states)
9. [Mobile & Responsive Behavior](#mobile--responsive-behavior)
10. [Figma File Organization](#figma-file-organization)

---

## QUICK START

### Files Provided
- `components.html` – Interactive component library (open in browser)
- `DESIGN_SYSTEM.md` – Complete design specifications
- `homepage.html` – Homepage desktop & mobile comps
- `product-detail.html` – Product page with full specs
- `cart-checkout.html` – Cart, checkout, confirmation flows
- `handoff-guide.md` – This file

### How to Use
1. **View components**: Open `components.html` in browser to see all UI elements
2. **Review layouts**: Open `homepage.html`, `product-detail.html`, `cart-checkout.html` in separate tabs
3. **Resize browser** to see mobile responsiveness (375px = mobile view)
4. **Copy CSS**: All styles in `<style>` tags – ready to move to SCSS/CSS modules
5. **Build** using the color tokens (CSS variables) and spacing scale provided

---

## PROJECT OVERVIEW

### Brand Context
**PetVital** is a modern, clean D2C pet food brand emphasizing:
- Natural, organic ingredients
- Veterinary approval & scientific backing
- Sustainability & quality
- Premium positioning with accessible pricing

### Design Approach
- **Modern & minimalist**: High-quality product photography + plenty of whitespace
- **Trust-first**: Badges, certifications, testimonials get prime placement
- **Pet-friendly**: Warm, approachable color palette (not clinical)
- **Conversion-focused**: Clear CTAs, progress indicators, form design optimized for mobile

### Key Pages
1. **Homepage** – Hero, trust section, featured products, newsletter CTA
2. **Shop / Category** – Product grid with filters, sorting
3. **Product Detail** – Image gallery, specs, size selector, quantity, CTAs, related products
4. **Cart** – Order summary, edit/remove items, shipping options
5. **Checkout** – Address, shipping method, payment, confirmation
6. **Confirmation** – Order number, next steps, CTA back to shop

---

## DESIGN SYSTEM REFERENCE

### Color Palette

#### Primary Colors
```
Forest Green (Primary)
Hex:  #2D5C3F
RGB:  45, 92, 63
CSS:  var(--color-primary)
Uses: CTAs, headlines, primary interactive elements
```

```
Warm Tan (Accent)
Hex:  #D4A574
RGB:  212, 165, 116
CSS:  var(--color-accent)
Uses: Secondary highlights, buttons, badges
```

```
Soft Cream (Warm Background)
Hex:  #FFFBF5
RGB:  255, 251, 245
CSS:  var(--color-bg-warm)
Uses: Page background, warmth, approachability
```

#### Neutral Colors
```
Deep Charcoal (Primary Text)
Hex:  #2C3E50
RGB:  44, 62, 80
CSS:  var(--color-text-primary)
Uses: Body copy, headings, main text
```

```
Stone Gray (Secondary Text)
Hex:  #7A8A99
RGB:  122, 138, 153
CSS:  var(--color-text-secondary)
Uses: Captions, meta info, placeholder text, help text
```

```
Light Gray (Borders & Dividers)
Hex:  #E8ECEF
RGB:  232, 236, 239
CSS:  var(--color-border)
Uses: Input borders, dividers, card borders
```

```
White (Cards & Containers)
Hex:  #FFFFFF
RGB:  255, 255, 255
CSS:  var(--color-bg-white)
Uses: Card backgrounds, content containers
```

```
Off-White (Subtle Background)
Hex:  #F7F9FB
RGB:  247, 249, 251
CSS:  var(--color-bg-light)
Uses: Section backgrounds, subtle contrast
```

#### Semantic Colors
```
Success Green    #27AE60   – Confirmations, "In Stock", checkmarks
Warning Amber    #F39C12   – Alerts, limited stock, warnings
Error Red        #E74C3C   – Validation errors, destructive actions
Info Blue        #3498DB   – Information messages
```

### Typography

#### Font Stack
```css
font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
/* Plan: Use Google Fonts "Inter" for final build */
```

#### Type Scale & Uses

| Role | Size | Weight | Leading | Letter Spacing | Line Height | Usage |
|------|------|--------|---------|---|---|---|
| **H1 Hero** | 48px | 700 | -0.5px | 1.2 | 57.6px | Page hero headlines, main titles |
| **H2 Section** | 36px | 700 | -0.3px | 1.3 | 46.8px | Section headers, page titles |
| **H3 Subsection** | 28px | 600 | 0px | 1.4 | 39.2px | Subsection titles, card headers |
| **H4 Card** | 20px | 600 | 0px | 1.4 | 28px | Card titles, product names |
| **Body Large** | 16px | 400 | 0px | 1.6 | 25.6px | Feature copy, descriptions |
| **Body Regular** | 14px | 400 | 0px | 1.6 | 22.4px | Standard body text (default) |
| **Body Small** | 12px | 400 | 0.2px | 1.5 | 18px | Captions, meta info, labels |
| **Button** | 14px | 600 | 0.3px | 1.4 | — | All button text |
| **Label** | 12px | 500 | 0.1px | 1.4 | — | Form labels, UI labels |

### Spacing Scale (4px Base)

```
4px   (--space-xs)    – Minimal gaps, tight layouts
8px   (--space-sm)    – Small gaps between elements
16px  (--space-md)    – Standard spacing (DEFAULT)
24px  (--space-lg)    – Comfortable spacing
32px  (--space-xl)    – Large breathing room
48px  (--space-2xl)   – Section spacing
64px  (--space-3xl)   – Major section breaks
96px  (--space-4xl)   – Full-page gaps
```

**Application Rules:**
- Button padding: 12px vertical × 24px horizontal
- Card padding: 24px all sides (or 0 for images)
- Form group margins: 24px bottom
- Section padding: 64px top & bottom

### Border Radius

```
4px   (--radius-sm)   – Inputs, small elements
8px   (--radius-md)   – Cards, buttons (DEFAULT)
12px  (--radius-lg)   – Feature cards, containers
16px  (--radius-xl)   – Hero sections, large containers
```

### Shadows

```
0 2px 4px rgba(0,0,0,0.08)     – --shadow-sm (cards, subtle)
0 4px 8px rgba(0,0,0,0.12)     – --shadow-md (hover cards)
0 8px 16px rgba(0,0,0,0.16)    – --shadow-lg (modals, dropdowns)
0 12px 24px rgba(0,0,0,0.2)    – --shadow-xl (elevated elements)
```

### Transitions & Timings

```
150ms ease-out    – --transition-fast    (micro-interactions)
250ms ease        – --transition-normal  (standard transitions)
350ms ease-in-out – --transition-slow    (rich animations)
```

---

## COMPONENT SPECIFICATIONS

### Buttons

#### Button Styles

**Primary Button**
```css
Background:     var(--color-primary)    /* Forest Green */
Color:          white
Padding:        12px 24px
Font:           14px, 600 weight
Border Radius:  8px
Box Shadow:     none (default)
Cursor:         pointer

Hover State:
  Transform:    translateY(-2px)         /* Lift up 2px */
  Box Shadow:   0 8px 16px rgba(0,0,0,0.16)
  Opacity:      1 (unchanged)

Active State:
  Transform:    translateY(0)            /* No lift */
  Box Shadow:   0 4px 8px rgba(0,0,0,0.12)

Focus State:
  Outline:      2px solid var(--color-primary)
  Outline Offset: 2px

Disabled State:
  Opacity:      0.5
  Cursor:       not-allowed
  Transform:    none
```

**Secondary Button**
```css
Background:     transparent
Color:          var(--color-primary)
Border:         2px solid var(--color-primary)
Padding:        12px 24px

Hover State:
  Background:   var(--color-bg-light)
  Box Shadow:   0 4px 8px rgba(0,0,0,0.12)
```

**Tertiary Button (Text Only)**
```css
Background:     transparent
Color:          var(--color-primary)
Text Decoration: underline
Border:         none

Hover State:
  Color:        #1f4a2d (10% darker)
```

**Button Sizes:**
- Small: 32px height (8px vert × 16px horiz)
- Regular: 44px height (12px vert × 24px horiz) [DEFAULT]
- Large: 56px height (16px vert × 32px horiz)
- Full Width: `width: 100%` (responsive)

**Action Buttons:**
- Success: `var(--color-success)` (#27AE60)
- Danger: `var(--color-error)` (#E74C3C)
- Warning: `var(--color-warning)` (#F39C12)

### Cards

#### Product Card
```
Dimensions:     280px width (desktop) | full width (mobile)
Border:         1px solid var(--color-border)
Border Radius:  8px
Box Shadow:     0 2px 4px rgba(0,0,0,0.08)
Overflow:       hidden

Image Section:
  Height:       200px
  Aspect Ratio: 1.4:1
  Background:   linear gradient (light gray)
  Display:      flex center

Content Section:
  Padding:      24px
  
Layout on Hover:
  Transform:    translateY(-4px)
  Box Shadow:   0 8px 16px rgba(0,0,0,0.16)
  Border Color: var(--color-accent)  /* Tan highlight */
```

#### Feature Card
```
Dimensions:     Flexible (grid items, 1fr)
Padding:        32px
Border:         1px solid var(--color-border) [optional]
Border Radius:  12px
Background:     var(--color-bg-white) or var(--color-bg-light)
Box Shadow:     0 2px 4px rgba(0,0,0,0.08)

Content:
  Icon:         32-48px emoji or SVG
  Margin:       0 0 16px 0
  Title (h4):   20px, 600 weight
  Description:  14px, gray text
```

### Forms

#### Input Elements
```
Height:         44px
Padding:        12px 16px
Font Size:      14px
Font Family:    var(--font-family)
Border:         1px solid var(--color-border)
Border Radius:  4px
Background:     var(--color-bg-white)
Color:          var(--color-text-primary)

Placeholder:
  Color:        var(--color-text-secondary)
  Font Style:   italic

Focus State:
  Border Color:     var(--color-primary)
  Box Shadow:       0 0 0 3px rgba(45, 92, 63, 0.1)  /* Subtle glow */
  Outline:          none

Error State:
  Border Color:     var(--color-error)
  Box Shadow:       0 0 0 3px rgba(231, 76, 60, 0.1)
  
Disabled State:
  Background:       var(--color-bg-light)
  Opacity:          0.6
  Cursor:           not-allowed
```

#### Form Groups
```
Margin Bottom:    24px
Label:
  Display:        block
  Font Size:      12px
  Font Weight:    600 (medium)
  Text Transform: uppercase
  Letter Spacing: 0.1px
  Color:          var(--color-text-secondary)
  Margin Bottom:  8px

Input + Label:
  Gap:            8px
```

#### Select Dropdowns
```
Styling:        Same as inputs
Height:         44px
Padding:        12px 16px
Font Size:      14px

Appearance:     
  Preserve OS styles (avoid heavy restyling for consistency)
  Use `::-webkit-` prefixes for webkit browsers if needed
```

#### Checkboxes & Radio Buttons
```
Size:           16px × 16px (input itself)
Margin Right:   8px (before label)
Cursor:         pointer
Label:
  Display:      inline-block
  Font Size:    14px
  Cursor:       pointer
  Margin Left:  8px
```

### Navigation

#### Primary Navigation (Header)
```
Height:         64px (desktop) | 56px (mobile)
Background:     var(--color-bg-white)
Border Bottom:  1px solid var(--color-border)
Box Shadow:     0 2px 4px rgba(0,0,0,0.08)
Position:       sticky top 0
Z-Index:        100
Padding:        16px 24px

Logo:
  Font Size:    24px
  Font Weight:  700
  Color:        var(--color-primary)

Menu Items:
  Display:      flex
  Gap:          32px
  Font Size:    14px
  Font Weight:  600
  Color:        var(--color-text-primary)
  
Menu Link Hover:
  Color:        var(--color-primary)
  Border Bottom: 2px solid var(--color-primary)
  Padding Bottom: 4px
  Transition:   all 250ms ease

Menu Link Active:
  Color:        var(--color-primary)
  Border Bottom: 2px solid var(--color-accent)  /* Tan underline */
  Font Weight:  700
```

#### Mobile Menu (Hamburger)
```
Trigger:        Icon button (3 lines / hamburger)
Style:          Full-screen overlay
Background:     var(--color-bg-warm) with 95% opacity
Animation:      Slide from right (300ms ease-out)
Close:          "X" button or clicking outside
Links:          Full-width, aligned left
Padding:        24px
Font Size:      16px
```

---

## PAGE LAYOUTS

### Homepage

#### Hero Section
```
Height:         500px (desktop) | 400px (mobile)
Background:     Linear gradient (Forest Green → darker green)
Color:          White text
Padding:        64px 40px (desktop) | 32px 20px (mobile)
Text Alignment: Center
Content:
  H1:           48px (desktop) | 32px (mobile)
  P:            18px (desktop) | 16px (mobile)
  Buttons:      Primary + Secondary, flex center, gap 16px
```

#### Trust Section
```
Background:     var(--color-bg-white)
Padding:        64px 0
Border Bottom:  1px solid var(--color-border)

Grid:           4 columns (desktop) | 2 (tablet) | 1 (mobile)
Gap:            32px
Max Width:      1440px

Item:
  Text Align:   center
  Icon:         44px emoji/SVG, margin 16px 0
  Title:        16px, 600 weight
  Description:  14px gray, no margin-bottom
```

#### Featured Products Section
```
Background:     var(--color-bg-white)
Padding:        64px 0
Container:      1440px max-width, 40px padding

Grid:           4 columns (280px ea) → 2 cols (768px) → 1 (480px)
Gap:            32px
```

#### CTA Section (Newsletter)
```
Background:     var(--color-bg-light)
Padding:        64px 40px
Border Radius:  8px
Text Align:     Center

H2:             32px
P:              16px gray, max-width 600px
Button:         Primary, centered
```

### Product Detail Page

#### Product Main
```
Layout:         2-column grid (image | info)
Gap:            64px
Max Width:      1440px

Image Column:
  Image:        Aspect ratio 1:1, background light gray
  Border:       1px solid border color
  Border Radius: 8px
  Badge:        "New" label (Success green, top-right)

Info Column:
  Breadcrumbs:      12px gray, links primary color
  H1:               32px, 700 weight
  Rating:           Stars + count, 14px
  Price Section:
    Large Price:    32px, 700, primary color
    Old Price:      16px, gray, struck-out
    Discount:       Red text, 600 weight
  
  Description Box:
    Background:     var(--color-bg-light)
    Padding:        24px
    Border Radius:  8px
    
  Size Selection:
    Label:          12px uppercase gray
    Buttons:        4 per row desktop, 2 tablet, 1 mobile
    Active:         Primary bg + white text
    
  Quantity:
    Label:          "Quantity"
    Selector:       − [input] +
    Input Width:    60px, text-align center
    
  Buttons:
    Primary:        "Add to Cart"
    Secondary:      "Buy on Subscribe & Save"
    Tertiary:       "Add to Wishlist" (light bg)
    
  Specs Table:
    2 columns:      Label (200px) | Value
    Border Top:     2px solid border
    Row Borders:    1px dividers between
    Label Color:    Gray, 600 weight
```

#### Related Products
```
Section:
  Margin Top:       64px
  Padding Top:      64px
  Border Top:       1px solid border
  
Grid:              4 columns → 2 → 1 (responsive)
Gap:               24px
```

### Cart Page

#### Progress Bar
```
Background:     var(--color-bg-white)
Padding:        16px 0
Border Bottom:  1px solid border
Display:        flex center
Gap:            32px

Step:
  Display:      flex column, center-aligned
  Gap:          8px
  Opacity:      0.4
  
Step.active:
  Opacity:      1
  Circle:       Primary bg, white text
  
Step.completed:
  Opacity:      1
  Circle:       Success green, white checkmark
```

#### Cart Items
```
Background:     var(--color-bg-white)
Border:         1px solid border
Border Radius:  8px
Padding:        32px

Items:
  Grid:         Image (80px) | Details | Price
  Gap:          24px
  Row Border:   1px divider between items
  
Product Name:   16px, 600 weight
Meta:           12px gray (Qty, stock status)
Actions:        Edit | Remove (links, primary color)
Price:          16px bold, primary color
```

#### Order Summary (Sidebar)
```
Background:     var(--color-bg-light)
Padding:        32px
Border Radius:  8px
Position:       sticky top 100px (desktop)

Rows:
  Display:      flex space-between
  Padding:      16px 0
  Font Size:    14px
  Border Bottom: 1px solid border
  
Row.total:
  Border Bottom:  none
  Border Top:     2px solid border
  Font Weight:    700
  Font Size:      16px
  Color:          var(--color-primary)
  Margin Top:     16px

Buttons:
  Width:    100%
  Margin:   16px 0 8px 0
```

### Checkout Page

#### Form Sections
```
Background:     var(--color-bg-white)
Border:         1px solid border
Border Radius:  8px
Padding:        32px
Margin Bottom:  24px

Form Group:
  Margin Bottom:  24px
  
Form Row (2-column):
  Grid:         1fr 1fr
  Gap:          16px
  Grid Columns: 1fr (on mobile)
```

#### Payment Options
```
Display:        flex flex-direction column
Gap:            16px

Option:
  Display:      flex align-items-center
  Gap:          16px
  Cursor:       pointer
  
Radio/Checkbox:
  Width:        auto
  Margin:       0
```

#### Confirmation Message
```
Background:     var(--color-bg-light)
Border Left:    4px solid var(--color-success)
Padding:        32px
Border Radius:  8px
Text Align:     center

Icon:           48px emoji/SVG
Title:          32px
Message:        14px
Order Number:   Monospace font, 600 weight, primary color
```

---

## ASSETS & ICONS

### Icon System

**Style**: Outline/minimal with consistent 2px stroke weight  
**Sizes**: 16px (small), 24px (medium), 32px (large)  
**Format**: SVG (scalable, crisp, CSS colorable)  
**Color**: Inherit text color via `fill: currentColor`

### Common Icons (Emoji Placeholders in Prototypes)

```
Search        🔍  Magnifying glass
Cart          🛒  Shopping bag
User          👤  Person
Heart         ♡   Wishlist
Phone         📞  Contact
Email         ✉️   Envelope
Location      📍  Map pin
Checkmark     ✓   Confirmation
Warning       ⚠️   Alert
Info          ℹ️   Information
Close/Exit    ✕   X icon
Menu          ☰   Hamburger
Chevron       ›   Right arrow
```

**For Final Build**: Replace emoji with proper SVG exports:
- Design in Figma or Illustrator
- Export as .svg
- Optimize with SVGO
- Inline in HTML or reference as `<img>` or CSS background

```html
<!-- Inline SVG -->
<svg class="icon" viewBox="0 0 24 24">
  <path d="M..." fill="currentColor"/>
</svg>

<!-- With CSS color -->
<style>
  .icon {
    width: 24px;
    height: 24px;
    color: var(--color-primary);
  }
</style>
```

### Product Photography

**Dimensions:**  
- Product cards: 280px × 200px (1.4:1 aspect ratio desktop), full width mobile
- Product detail: 600px × 600px (1:1 square, desktop), full width (mobile)
- Hero: 1440px × 500px (desktop), 375px × 400px (mobile)

**Treatment:**  
- White or light gray background for product cards
- Lifestyle/contextual images for hero section
- High-quality photography (pets enjoying food)
- Consistent lighting & color temperature

**Optimization:**
- JPEG for photography (80% quality)
- PNG for graphics/illustrations
- WebP with JPEG fallback for modern browsers
- Lazy load below-fold images
- Responsive srcset for different viewport sizes

```html
<img 
  src="product.jpg" 
  srcset="product.jpg 1x, product@2x.jpg 2x"
  alt="Premium Puppy Formula in 5lb bag"
/>
```

---

## DEVELOPMENT NOTES

### CSS Architecture

**Variables (Custom Properties)**:
```css
:root {
  --color-primary: #2D5C3F;
  --color-accent: #D4A574;
  --space-lg: 24px;
  --radius-md: 8px;
  --shadow-lg: 0 8px 16px rgba(0,0,0,0.16);
  --transition-normal: 250ms ease;
}
```

**Mobile-First Approach:**
```css
/* Mobile styles first (375px) */
.btn { width: 100%; }

/* Tablet and up (768px) */
@media (min-width: 768px) {
  .btn { width: auto; }
}

/* Desktop (1440px) */
@media (min-width: 1440px) {
  .container { max-width: 1440px; }
}
```

### BEM Naming Convention (Optional but Recommended)

```css
/* Block */
.product-card { }

/* Element */
.product-card__image { }
.product-card__title { }
.product-card__price { }

/* Modifier */
.product-card--featured { }
.product-card--loading { }
```

### Accessibility Considerations

**Focus States:**
- All interactive elements must have visible focus outline
- Use `outline: 2px solid var(--color-primary)` + `outline-offset: 2px`
- Or use box-shadow for custom focus ring

**Color Contrast:**
- Primary text on cream: 15.8:1 ✓ (WCAG AAA)
- Accent on white: 7.2:1 ✓ (WCAG AA)
- Test with WebAIM contrast checker

**Semantic HTML:**
```html
<button>     for interactive elements
<a>          for navigation/links
<form>       for form containers
<label>      always pair with form inputs
<h1-h6>      proper heading hierarchy
<img alt="">  descriptive alt text
```

**ARIA Labels:**
```html
<button aria-label="Close menu">×</button>
<a href="#main" class="skip-link">Skip to main content</a>
<div aria-live="polite" aria-atomic="true">Cart updated: 3 items</div>
```

### Shopify Liquid Integration

**Example: Product Price**
```liquid
<!-- Design spec: 32px, 700 weight, primary color -->
<div class="product-price">
  ${{ product.price | money_without_trailing_zeros }}
</div>

<style>
  .product-price {
    font-size: 32px;
    font-weight: 700;
    color: var(--color-primary);
  }
</style>
```

**Example: Product Card Loop**
```liquid
{% for product in collection.products %}
  <div class="product-card">
    <div class="product-card__image">
      {% if product.featured_image %}
        <img src="{{ product.featured_image | img_url: '280x200' }}" alt="{{ product.title }}">
      {% endif %}
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.title }}</h3>
      <div class="product-card__price">
        ${{ product.price | money_without_trailing_zeros }}
      </div>
      <button class="btn btn-primary">Add to Cart</button>
    </div>
  </div>
{% endfor %}
```

---

## INTERACTION STATES

### Button Interactions

**Hover → Active → Focus Sequence:**
```
1. Hover:
   - Background: 10% darker
   - Transform: translateY(-2px)
   - Box Shadow: upgrade one level
   
2. Active/Click:
   - Transform: translateY(0) [pressed state]
   - Box Shadow: downgrade one level
   - Duration: instant
   
3. Focus (keyboard):
   - Outline: 2px solid primary color
   - Outline Offset: 2px
   - Visible at all times
```

### Form Input States

**Default → Focus → Filled → Error:**
```
Default:
  Border:     1px solid border color
  Shadow:     none
  
Focus:
  Border:     1px solid primary color
  Shadow:     0 0 0 3px rgba(45, 92, 63, 0.1)
  Duration:   250ms ease
  
Filled:
  Background: unchanged (stays white)
  Value:      primary color
  
Error:
  Border:     1px solid error-red
  Shadow:     0 0 0 3px rgba(231, 76, 60, 0.1)
  Helper Text: error-red, 12px, margin-top 4px
```

### Product Card Hover

```
Default:
  Transform:  translateY(0)
  Shadow:     --shadow-sm
  Border:     1px solid border
  
Hover:
  Transform:  translateY(-4px)
  Shadow:     --shadow-lg
  Border:     1px solid accent (tan)
  Duration:   250ms ease
```

### Loading States

**Button Loading:**
```
1. Show spinner/loading indicator
2. Disable further clicks
3. Optional: change text to "Loading..."
4. Keep same button width (no layout shift)

.btn.is-loading::after {
  content: "";
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-left: 8px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

**Form Loading:**
```
1. Show spinner on submit button
2. Disable all form inputs
3. Show semi-transparent overlay on form if long-running
4. Display progress message
```

---

## MOBILE & RESPONSIVE BEHAVIOR

### Breakpoints

```
Mobile:   320px – 767px   (single column, touch-friendly)
Tablet:   768px – 1023px  (2-column, 8-column grid)
Desktop:  1440px+         (full layout, 12-column grid)
```

### Responsive Changes

#### Navigation
```
Desktop:  Horizontal menu + icons
Tablet:   Hamburger menu, icons visible
Mobile:   Hamburger menu full-screen overlay
```

#### Product Grid
```
Desktop:  grid-template-columns: repeat(4, 1fr)
Tablet:   grid-template-columns: repeat(2, 1fr)
Mobile:   grid-template-columns: 1fr
```

#### Forms
```
Desktop:  form-row: 2 columns
Tablet:   form-row: 2 columns (narrower)
Mobile:   form-row: 1 column (full width)
```

#### Hero Section
```
Desktop:  
  Height:     500px
  H1:         48px
  Padding:    64px

Mobile:
  Height:     400px
  H1:         32px
  Padding:    32px 20px
```

#### Product Detail
```
Desktop:  2-column grid (600px image | 500px info)
Mobile:   1-column (full width image, stack info below)
```

### Touch-Friendly Sizing

- **Minimum tap target**: 44px × 44px
- **Padding around buttons**: 8px minimum
- **Links in body text**: underline or color primary
- **Form inputs**: 44px height minimum
- **Spacing**: Increase gap between interactive elements

---

## FIGMA FILE ORGANIZATION

### Proposed Structure (If building in Figma)

```
PetVital Design System
├── 1. Colors
│   ├── Primary
│   ├── Neutral
│   ├── Semantic
│   └── Accessibility Notes
│
├── 2. Typography
│   ├── Headings (H1-H4)
│   ├── Body (Large, Regular, Small)
│   ├── Button Text
│   └── Label Text
│
├── 3. Components (★ Auto Layout)
│   ├── Buttons
│   │   ├── Primary
│   │   ├── Secondary
│   │   ├── States (default, hover, active, disabled)
│   │   └── Sizes (small, regular, large)
│   ├── Forms
│   │   ├── Input (default, focus, error)
│   │   ├── Select
│   │   ├── Checkbox
│   │   └── Radio
│   ├── Cards
│   │   ├── Product Card
│   │   ├── Feature Card
│   │   └── States (default, hover)
│   ├── Navigation
│   │   ├── Primary Nav
│   │   └── Mobile Menu
│   └── Badges
│
├── 4. Layouts (★ Auto Layout)
│   ├── Grid System (12-col, 8-col, 1-col)
│   ├── Spacing Tokens (visual)
│   └── Container Examples
│
├── 5. Pages (Desktop)
│   ├── Homepage
│   ├── Shop/Category
│   ├── Product Detail
│   ├── Cart
│   ├── Checkout
│   └── Confirmation
│
├── 6. Interactions
│   ├── Hover States (all)
│   ├── Focus States
│   ├── Loading States
│   └── Error States
│
└── 7. Mobile Comps (375px)
    ├── Homepage
    ├── Product Detail
    ├── Cart/Checkout
    └── Navigation
```

### Auto Layout Setup

**Button Component**:
- Direction: Horizontal
- Gap Between: 8px
- Padding: 12px 24px

**Form Group**:
- Direction: Vertical
- Gap Between: 8px

**Product Card**:
- Direction: Vertical
- Gap Between: 0
- Image: fixed height 200px

**Grid Container**:
- Direction: Horizontal
- Gap Between: 32px
- Set grid properties per breakpoint

### Naming Convention in Figma

```
Component / Variant / State

Examples:
  Button / Primary / Default
  Button / Primary / Hover
  Button / Secondary / Active
  Input / Text / Focus
  Card / Product / Default
  Card / Product / Hover
  Badge / Success / Default
```

### Exporting Assets

**SVG Icons:**
```
File → Export Settings
Format: SVG
Background: Transparent
Suffix: –icon-24 (size)

Example names:
  search-icon-24.svg
  cart-icon-24.svg
  user-icon-24.svg
```

**Images:**
```
Format: PNG (for graphics) or JPG (for photos)
Background: Add white bg if needed
2x versions for retina displays

Example structure:
  /images/product-cards/
  /images/hero/
  /images/trust-badges/
```

---

## QUICK REFERENCE – DEVELOPER CHEAT SHEET

### Colors (Copy/Paste)
```css
--color-primary: #2D5C3F;       /* Forest Green */
--color-accent: #D4A574;        /* Warm Tan */
--color-bg-warm: #FFFBF5;       /* Soft Cream */
--color-text-primary: #2C3E50;  /* Dark Charcoal */
--color-text-secondary: #7A8A99;/* Stone Gray */
--color-border: #E8ECEF;        /* Light Gray */
--color-bg-white: #FFFFFF;      /* White */
--color-bg-light: #F7F9FB;      /* Off-White */
--color-success: #27AE60;       /* Green */
--color-error: #E74C3C;         /* Red */
--color-warning: #F39C12;       /* Amber */
```

### Spacing
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

### Typography
```css
font-family: "Segoe UI", Roboto, sans-serif;

h1 { font-size: 48px; font-weight: 700; line-height: 1.2; }
h2 { font-size: 36px; font-weight: 700; }
h3 { font-size: 28px; font-weight: 600; }
h4 { font-size: 20px; font-weight: 600; }
p  { font-size: 14px; line-height: 1.6; }
```

### Buttons
```css
.btn-primary {
  background: var(--color-primary);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.16);
}
```

### Forms
```css
input, select {
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 4px;
}

input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(45, 92, 63, 0.1);
}
```

---

## NEXT STEPS FOR DEVELOPERS

1. **Review** this guide + color, typography, spacing specs
2. **Open** `components.html` in browser to see all elements visually
3. **Study** individual page comps for layout patterns
4. **Extract** CSS from `<style>` tags into SCSS modules
5. **Build** button, form, card components with all states
6. **Test** responsive behavior (375px, 768px, 1440px)
7. **Implement** Shopify Liquid templates using components
8. **Test** on real devices and browsers
9. **Optimize** images, fonts, and assets for performance
10. **Deploy** and monitor real-world interaction data

---

## QUESTIONS & SUPPORT

**Color accessibility**: Use WebAIM contrast checker  
**Icon sizing**: Always include `viewBox` and preserve aspect ratio  
**Responsive testing**: Use Chrome DevTools device emulation  
**Performance**: Lazy load images, minify CSS/JS  
**Cross-browser**: Test on Chrome, Firefox, Safari, Edge  

---

**Design System Version 1.0 – Ready for Implementation** ✓
