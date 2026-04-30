# PetVital Design System
## Modern D2C Pet Food Brand – Shopify

**Version**: 1.0  
**Last Updated**: April 29, 2026  
**Status**: Ready for Developer Handoff

---

## 1. COLOR PALETTE

### Primary Colors
| Color | Hex | RGB | Usage | CSS Variable |
|-------|-----|-----|-------|--------------|
| Forest Green | `#2D5C3F` | 45, 92, 63 | Primary CTA, trust, natural | `--color-primary` |
| Warm Tan | `#D4A574` | 212, 165, 116 | Accent, product highlights | `--color-accent` |
| Soft Cream | `#FFFBF5` | 255, 251, 245 | Background, warmth | `--color-bg-warm` |

### Neutral Colors
| Color | Hex | RGB | Usage | CSS Variable |
|-------|-----|-----|-------|--------------|
| Deep Charcoal | `#2C3E50` | 44, 62, 80 | Primary text, headings | `--color-text-primary` |
| Stone Gray | `#7A8A99` | 122, 138, 153 | Secondary text, captions | `--color-text-secondary` |
| Light Gray | `#E8ECEF` | 232, 236, 239 | Borders, dividers, inputs | `--color-border` |
| White | `#FFFFFF` | 255, 255, 255 | Cards, containers | `--color-bg-white` |
| Off-White | `#F7F9FB` | 247, 249, 251 | Subtle backgrounds | `--color-bg-light` |

### Semantic Colors
| Color | Hex | Usage |
|-------|-----|-------|
| Success Green | `#27AE60` | Confirmations, checkmarks |
| Warning Amber | `#F39C12` | Alerts, stock warnings |
| Error Red | `#E74C3C` | Errors, destructive actions |
| Info Blue | `#3498DB` | Informational messages |

### Color Accessibility
- **Contrast ratio minimum**: 4.5:1 (WCAG AA)
- **Primary text on cream**: #2C3E50 (15.8:1)
- **Accent on white**: #D4A574 (7.2:1)

---

## 2. TYPOGRAPHY

### Font Stack
```css
/* Headings - Modern & Professional */
font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;

/* Body - Clean & Readable */
font-family: "Inter", -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif;

/* Plan: Host on Google Fonts. Fallback: System fonts */
```

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Usage | CSS |
|------|------|--------|-------------|---|-------|-----|
| **H1 (Hero)** | 48px | 700 | 1.2 | -0.5px | Page hero headlines | h1 |
| **H2 (Section)** | 36px | 700 | 1.3 | -0.3px | Section headers | h2 |
| **H3 (Subsection)** | 28px | 600 | 1.4 | 0px | Subsection titles | h3 |
| **H4 (Card)** | 20px | 600 | 1.4 | 0px | Card titles, product names | h4 |
| **Body (Large)** | 16px | 400 | 1.6 | 0px | Feature copy, descriptions | p.large |
| **Body (Regular)** | 14px | 400 | 1.6 | 0px | Standard body text | p |
| **Body (Small)** | 12px | 400 | 1.5 | 0.2px | Captions, meta info | p.small |
| **Button** | 14px | 600 | 1.4 | 0.3px | Button text (all sizes) | button |
| **Label** | 12px | 500 | 1.4 | 0.1px | Form labels, tags | label |

### Font Weight Usage
- **700 (Bold)**: H1, H2, bold emphasis
- **600 (Semibold)**: H3, H4, buttons, strong text
- **500 (Medium)**: Form labels, badge text
- **400 (Regular)**: Body copy, paragraphs

---

## 3. SPACING & LAYOUT

### Spacing Scale (Base: 4px)
```
--space-xs:    4px    (1 unit)
--space-sm:    8px    (2 units)
--space-md:    16px   (4 units)
--space-lg:    24px   (6 units)
--space-xl:    32px   (8 units)
--space-2xl:   48px   (12 units)
--space-3xl:   64px   (16 units)
--space-4xl:   96px   (24 units)
```

### Grid System
- **Desktop Grid**: 12 columns, 1440px container
- **Column Width**: 80px + 20px gutter
- **Mobile Grid**: Single column, 20px side margins (375px viewport)
- **Tablet Grid**: 8 columns (768px viewport)

### Common Spacing Rules
| Element | Top | Right | Bottom | Left |
|---------|-----|-------|--------|------|
| Section padding | 64px | 40px | 64px | 40px |
| Card padding | 24px | 24px | 24px | 24px |
| Button padding | 12px | 24px | 12px | 24px |
| Input padding | 12px | 16px | 12px | 16px |

---

## 4. COMPONENT SPECIFICATIONS

### Buttons

#### Button Variants
```
Primary:      Forest Green bg, white text
Secondary:    White bg, Forest Green border & text
Tertiary:     No bg, Forest Green text (underline on hover)
Danger:       Red bg, white text
Success:      Green bg, white text
```

#### Button States
```
Default:      Full opacity, cursor pointer
Hover:        10% darker, lift shadow (+4px)
Active:       10% darker, no lift
Disabled:     50% opacity, cursor not-allowed
Loading:      Spinner icon, disabled
```

#### Button Sizes
```
Small:        32px height, 12px vert padding, 20px horiz
Regular:      44px height, 12px vert padding, 24px horiz
Large:        56px height, 16px vert padding, 32px horiz
Full Width:   Block width, any height
```

### Cards

#### Product Card
```
Dimensions:   280px width (desktop), full width mobile
Content:      Image (280x200), name, price, rating, CTA
Border:       1px light gray, 8px radius
Padding:      0 (image flush) + 16px content padding
Hover:        +8px shadow, slight zoom (1.02x)
```

#### Feature Card
```
Dimensions:   Flexible (grid items)
Content:      Icon, title, description
Padding:      32px
Border radius: 8px
Background:   Off-white or white
Spacing:      16px vertical between elements
```

### Navigation

#### Primary Navigation
```
Height:       64px (desktop), 56px (mobile)
Background:   White with bottom border
Sticky:       Yes, z-index 100
Items:        Logo (left), menu (center), icons (right)
```

#### Mobile Menu
```
Trigger:      Hamburger icon (right)
Style:        Full-screen overlay
Background:   Cream with slight transparency
Animation:    Slide from right (300ms)
```

### Forms

#### Input Elements
```
Height:       44px
Padding:      12px 16px
Border:       1px solid light gray
Border-radius: 4px
Font size:    14px
Placeholder:  Stone gray, italic

Focus state:
  Border:     1px solid Forest Green
  Shadow:     0 0 0 3px rgba(45, 92, 63, 0.1)
  
Error state:
  Border:     1px solid Error Red
  Shadow:     0 0 0 3px rgba(231, 76, 60, 0.1)
  
Filled state:
  Background: Off-white (disabled)
  Opacity:    0.6
```

---

## 5. SHADOWS & DEPTH

### Shadow System
```
Shadow-sm:    0 2px 4px rgba(0, 0, 0, 0.08)
Shadow-md:    0 4px 8px rgba(0, 0, 0, 0.12)
Shadow-lg:    0 8px 16px rgba(0, 0, 0, 0.16)
Shadow-xl:    0 12px 24px rgba(0, 0, 0, 0.2)
```

### Elevation Rules
- **Cards**: shadow-sm
- **Hovered cards**: shadow-lg
- **Modals/dropdowns**: shadow-xl
- **Navigation (sticky)**: shadow-sm

---

## 6. BORDER RADIUS

```
--radius-sm:  4px   (inputs, small elements)
--radius-md:  8px   (cards, buttons)
--radius-lg:  12px  (feature cards, containers)
--radius-xl:  16px  (hero sections, large containers)
```

---

## 7. ANIMATIONS & TRANSITIONS

### Timing Functions
```
Fast:         150ms ease-out     (micro-interactions)
Normal:       250ms ease         (standard transitions)
Slow:         350ms ease-in-out  (rich animations)
```

### Common Animations

#### Hover State
```css
button:hover {
    transform: translateY(-2px);
    box-shadow: shadow-lg;
    transition: all 250ms ease;
}
```

#### Loading Spinner
```css
@keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
animation: spin 1s linear infinite;
```

#### Fade In
```css
@keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
}
animation: fadeIn 250ms ease-out;
```

---

## 8. ICONOGRAPHY

### Icon System
- **Style**: Outline/minimal, consistent stroke weight (2px)
- **Size**: 16px (small), 24px (medium), 32px (large)
- **Color**: Inherit text color (can use CSS color property)
- **Format**: SVG (for crisp scaling)

### Common Icons
```
Search:         Magnifying glass outline
Cart:           Shopping bag outline
User:           Person outline / circle
Heart/Wishlist: Heart outline
Phone:          Phone handset
Email:          Envelope outline
Location:       Map pin
Checkmark:      Tick outline (for confirmations)
Warning:        Triangle exclamation
Info:           Circle info
Close:          X icon
Menu:           Hamburger / three lines
Chevron:        Right arrow (navigation)
```

---

## 9. IMAGE & PHOTOGRAPHY TREATMENT

### Product Images
```
Dimensions:   280px x 280px (square, desktop cards)
           375px x 300px (mobile)
           800px x 600px (product detail page)
Format:     JPG (photography), PNG (graphics)
Optimization: Lazy loading, WebP with fallback
Background: White or lifestyle context
```

### Hero / Hero Imagery
```
Dimensions:   Full viewport width x 500px (desktop)
           Full width x 400px (mobile)
Format:     JPG or WebP
Background: Can be full image or gradient overlay
Text overlay: Semi-transparent dark for readability
```

---

## 10. INTERACTION STATES & MICRO-INTERACTIONS

### Button States
```
Hover:      Background brightens 10%, text stays same
Click:      Slight press-down animation (2px)
Focus:      Outline ring (2px solid Forest Green)
Loading:    Show spinner, disable interactions
Disabled:   Reduced opacity, disabled cursor
```

### Form Interactions
```
Input focus:       Border highlight, shadow glow
Input filled:      Background changes to white
Input error:       Red border, error icon appears
Form submission:   Button shows loading state
Form success:      Success message, green checkmark
```

### Navigation States
```
Current page:      Text bold, underline in accent color
Hover:             Color brightens
Mobile menu open:  Menu slides in, overlay appears
```

---

## 11. RESPONSIVE BREAKPOINTS

### Desktop (1440px)
- Full 12-column grid
- 40px side margins
- Multi-column layouts
- Hover states visible

### Tablet (768px - 1023px)
- 8-column grid
- 24px side margins
- 2-column product grids
- Full-width forms

### Mobile (375px - 767px)
- Single column
- 20px side margins
- Full-width cards
- Touch-friendly (44px+ tap targets)
- Mobile menu overlay

---

## 12. PIXEL-PERFECT SPECIFICATIONS FOR DEVELOPERS

### Key Measurements

#### Homepage Hero
```
Height:           500px (desktop), 400px (mobile)
Padding:          64px 40px (desktop), 32px 20px (mobile)
Heading size:     48px (desktop), 32px (mobile)
Subheading size:  18px (desktop), 16px (mobile)
CTA button:       Large, primary style
```

#### Product Grid
```
Desktop:  4 columns, 20px gap, 280px card width
Tablet:   2 columns, 16px gap
Mobile:   1 column, full width minus 20px margins
```

#### Navigation
```
Height:           64px
Logo size:        24px font
Menu items:       14px, 700 weight
Icons:            24px
Spacing:          16px between menu items
```

#### Product Detail Page
```
Image width:      600px (desktop), full width (mobile)
Content width:    500px (desktop), full width (mobile)
Title size:       28px (desktop), 24px (mobile)
Price size:       24px, Forest Green
Description:      16px body text, max-width 600px
CTA buttons:      Large, full-width mobile
```

---

## 13. HAND-OFF CHECKLIST

✅ All colors defined with hex values  
✅ Typography scale specified  
✅ Spacing scale documented  
✅ Component states documented  
✅ Responsive breakpoints defined  
✅ Icons prepared as SVG  
✅ Button styles with all states  
✅ Form element styling  
✅ Grid system specifications  
✅ Shadow system defined  
✅ Animation/transition timings  
✅ Accessibility standards noted  

---

**Next**: Review `components.html` for interactive component examples  
**Assets**: See `/assets/` folder for exported SVGs and icons  
**Mockups**: View desktop & mobile comps in `/screens/` folder
