# AI Prompt Library — Website Design & Development

> Complete cheat-sheet of prompts and reference materials you can give an AI
> to get **detailed, realistic, production-quality** website output.

---

## TABLE OF CONTENTS

1. [Wireframe prompts (lo-fi → hi-fi)](#1-wireframe-prompts)
2. [Brand & strategy prompts](#2-brand--strategy-prompts)
3. [Design-system prompts](#3-design-system-prompts)
4. [Content & copy prompts](#4-content--copy-prompts)
5. [User-flow & UX prompts](#5-user-flow--ux-prompts)
6. [Code prompts](#6-code-prompts)
7. [Reference materials to attach](#7-reference-materials)
8. [Prompt-engineering rules](#8-prompt-rules)

---

## 1. WIREFRAME PROMPTS

### A. **Detailed Realistic ASCII Wireframe** (what you asked for)

```
Create a detailed, realistic, production-grade ASCII wireframe for the
homepage of [WEBSITE-NAME], in the style of a real e-commerce blueprint.

Requirements:
- Use single-line box-drawing characters (┌─┐ └─┘ │ ├ ┤ ┬ ┴ ┼)
- Each section labeled with "← Section name" arrows on the right
- Show ALL elements inside each section: real button text, real product
  names, real price ranges, real social proof numbers, real CTAs
- Include both DESKTOP and MOBILE wireframes
- Show all 20+ sections (announcement, nav, hero, trust, categories,
  carousels, editorial splits, best sellers, brand story, collections,
  reviews, press, UGC, journal, newsletter, footer, floating buttons)
- Include real micro-copy (announcement text, hero headline + sub,
  button labels, eyebrow text)
- Add real example data (price points, review counts, ratings, customer
  names + countries)
- Include a "Section Cheat Sheet" table at the end with: section number,
  section name, source brand inspiration, goal/purpose
- Include a brief design system note at the end: color palette
  (with hex codes), typography pairing, spacing scale, accessibility notes

Brand context: [paste brand description here]
Inspiration brands: [list 3-5 reference websites]
```

### B. **Quick Lo-Fi Wireframe** (faster, less detail)

```
Create a low-fidelity ASCII wireframe for [WEBSITE-NAME]'s homepage.
Top-to-bottom box layout, no images, just structure and labels.
```

### C. **Mobile-Only Wireframe**

```
Create an ASCII wireframe of [WEBSITE-NAME] homepage for mobile only
(< 768px). Show how each section stacks, where carousels go horizontal,
where tiles drop to 2-per-row, and where the footer becomes accordions.
Single column, single-line boxes.
```

### D. **Inner-Page Wireframes** (very useful — most people forget!)

```
Create ASCII wireframes for these inner pages of [WEBSITE-NAME]:
1. Product detail page (PDP) — gallery, price, variants, size, ATC,
   accordion details, reviews, you-may-also-like
2. Collection / category page (PLP) — filters sidebar, sort, pagination,
   product grid
3. Custom product builder page — step-by-step configurator
4. About / Story page — editorial layout
5. Cart drawer + checkout flow
6. Account dashboard

Use the same single-line box style with "← Section" arrows.
```

### E. **Component-level Wireframe**

```
Zoom into a single component for [WEBSITE-NAME]: the [PRODUCT CARD].
Show every state: default, hover, sale, out-of-stock, new, wishlisted.
Show every element: image, badge, wishlist heart, name, color swatches,
star rating, price, was-price, add-to-cart button.
Use ASCII boxes.
```

---

## 2. BRAND & STRATEGY PROMPTS

These help AI understand WHY before HOW.

### A. **Brand Brief Generator**

```
Create a complete brand brief for [WEBSITE-NAME], a [CATEGORY] brand.
Include:
- Brand story (1 paragraph)
- Mission statement (1 sentence)
- Target audience (3 personas with age, income, lifestyle, pain points)
- Brand voice (3 adjectives + sample copy in that voice)
- Competitor positioning (where we sit vs 3 competitors)
- Unique selling propositions (top 5)
- Brand values (4-6 values)
- Tagline options (5 variations)
```

### B. **Audience Personas**

```
Generate 3 detailed user personas for [WEBSITE-NAME]:
For each persona include: name, age, location, occupation, income,
lifestyle, hobbies, pain points (when shopping for [PRODUCT]),
motivations, what they value, what objections they have, where they
hang out online, sample buying behavior.
Use real-feeling names and details, not generic placeholders.
```

### C. **Competitor Analysis**

```
Analyze these 5 competitors of [WEBSITE-NAME]: [LIST URLS]
For each, output:
- Brand positioning (1 line)
- Signature visual element
- Hero strategy (what they put first)
- Pricing strategy (premium/mid/budget)
- 3 things they do well
- 3 things they do poorly
- 1 thing we should steal from them
End with a "white space" summary: what gap can [WEBSITE-NAME] own?
```

### D. **Brand DNA Mash-up** (you already used this!)

```
Analyze these reference brands: [LIST URLS]
Output a table: Brand | Category | Signature element we borrow.
Then merge them into a hybrid positioning statement and 3 brand pillars.
```

---

## 3. DESIGN-SYSTEM PROMPTS

### A. **Full Design System**

```
Generate a production-ready design system for [WEBSITE-NAME].
Include:
- Color palette: 8-10 colors with hex codes, semantic names, usage rules
  (primary, secondary, accent, ink, muted, surface, success, warning,
   sale, gold)
- Typography: 2-font pairing (serif headline + sans body) with full type
  scale (h1-h6, body, small, eyebrow), font weights, line heights,
  letter spacing
- Spacing scale: 4px or 8px grid (xs, s, m, l, xl, 2xl, 3xl, 4xl)
- Border radius scale (sharp, soft, pill)
- Shadow scale (sm, md, lg, xl)
- Button system: primary/secondary/ghost variants × sizes
- Form fields: input, textarea, select, checkbox, radio
- Component naming convention
- Dark mode color tokens
- Accessibility rules (contrast ratios, focus styles, tap targets)
Output as both a markdown spec AND a CSS :root variables block.
```

### B. **Color Palette Only**

```
Suggest a color palette for [WEBSITE-NAME] — a [CATEGORY] brand
that wants to feel [LUXURY / MODERN / RUGGED / PLAYFUL / etc].
Output 8 colors with hex, RGB, semantic name, and example usage.
Include 2 alternative palettes I can compare against.
```

### C. **Typography Pairing**

```
Recommend 3 typography pairings for [WEBSITE-NAME] from Google Fonts.
Each pairing: serif headline + sans body OR display + body.
For each, give: font names, why this pairing fits the brand, sample
H1 + body paragraph in each, weights to use, letter-spacing rules.
```

---

## 4. CONTENT & COPY PROMPTS

### A. **Hero Headline Generator**

```
Write 10 hero headline options for [WEBSITE-NAME]'s homepage.
Brand: [description]. Tone: [voice].
For each, include: the headline (max 8 words), a 1-line subheadline,
and a primary CTA button label (max 3 words).
Make them emotional, not feature-led.
```

### B. **Section-by-Section Copy**

```
Write all the copy for [WEBSITE-NAME]'s homepage sections:
1. Announcement bar (3 rotating messages)
2. Hero (eyebrow, headline, sub, 2 CTAs)
3. Trust strip (6 USPs in 2-3 words each)
4. Category tile labels (6 categories)
5. New arrivals section (eyebrow, h2, sub)
6. Best sellers (eyebrow, h2, sub with social proof)
7. Brand story (eyebrow, h2, 3 pillars with name + 1-line description)
8. Custom CTA (eyebrow, h2, body, button)
9. Reviews (eyebrow, h2, sub) + 3 fake-but-realistic reviews
10. Newsletter (eyebrow, h2, body, placeholder, button)
Keep brand voice consistent. No corporate fluff.
```

### C. **Microcopy Audit**

```
Audit all microcopy for [WEBSITE-NAME]:
- 404 page
- Empty cart message
- Add to cart confirmation toast
- Form validation errors
- Loading states
- Out of stock message
- Search no-results
- Newsletter success / error
- Cookie banner
Make all copy on-brand, helpful, not robotic.
```

### D. **Product Description Generator**

```
Write product descriptions for these jackets: [list product names].
Each description:
- 1 hero line (emotional hook)
- 1 paragraph (story + key materials, ~50 words)
- 5-bullet feature list (specs)
- Care instructions (1 line)
- Sizing note (1 line)
Tone: [BRAND VOICE]
```

---

## 5. USER-FLOW & UX PROMPTS

### A. **User Journey Map**

```
Create a user journey map for [WEBSITE-NAME]:
Persona: [paste persona]
Goal: buy their first leather jacket
Steps from awareness → purchase → post-purchase
For each step include: action, thoughts, emotions, touchpoints,
pain points, opportunities to delight.
Output as a markdown table.
```

### B. **Site Map / Information Architecture**

```
Generate a complete site map for [WEBSITE-NAME].
Output as a nested list with all top-level pages and sub-pages.
Include URL slugs.
Mark which pages need filters (e.g., /collections/men → has filters).
Include utility pages (account, wishlist, cart, search, 404, legal).
```

### C. **User Flow Diagrams (text-based)**

```
Create a text-based flowchart for [USER FLOW NAME] on [WEBSITE-NAME]:
e.g., "Custom jacket configurator flow"
Use → arrows and decision diamonds.
Include all branches (guest checkout, account, error states).
```

### D. **Conversion Funnel**

```
Map the conversion funnel for [WEBSITE-NAME] from ad-click to purchase.
Identify drop-off risks at each stage and 1 mitigation per stage.
```

---

## 6. CODE PROMPTS

### A. **From Wireframe to Code**

```
Convert this ASCII wireframe into production-ready HTML + CSS + JS.
[paste wireframe]

Requirements:
- Semantic HTML5 (header, main, section, article, footer, nav)
- Modern responsive CSS (grid, flexbox, custom properties, clamp)
- Mobile-first with breakpoints at 480, 768, 1024, 1280
- Accessible: alt text, ARIA labels, focus states, prefers-reduced-motion
- Vanilla JS (no frameworks)
- Lazy-load below-the-fold images
- No emojis in code unless asked
- Use [BRAND COLORS / FONTS] from this spec: [paste design system]
- Use real placeholder images from Unsplash with proper attribution
```

### B. **React / Next.js Version**

```
Convert this homepage to Next.js 14 (App Router) + Tailwind CSS:
- Each section as its own component in /components/sections/
- Server components where possible
- Client components only for interactivity (carousel, mobile nav)
- Use next/image for all images
- Add metadata for SEO
- Add structured data (JSON-LD) for Organization, Product, Review
```

### C. **Performance Audit**

```
Audit the performance of [URL or pasted code]. Output:
- Lighthouse score predictions (Performance, A11y, Best Practices, SEO)
- Core Web Vitals risks (LCP, CLS, INP)
- Top 10 specific optimizations, ordered by impact
- Code examples for each fix
```

### D. **Accessibility Audit**

```
Audit accessibility of this code: [paste].
Check: semantic HTML, ARIA, color contrast, focus management,
keyboard navigation, alt text, form labels, screen reader flow,
prefers-reduced-motion, tap targets ≥ 44px.
Output a numbered list of issues + fixes.
```

---

## 7. REFERENCE MATERIALS YOU CAN ATTACH

The more you give the AI, the better the output. Drop any of these into
your prompt:

### A. **Reference website URLs**
> "Match the style of prada.com but with the energy of allsaints.com"

### B. **Mood board (text descriptions)**
> "Mood board: misty mountain dawn, weathered leather, brass zippers,
> single ray of light, ivory paper, charcoal ink"

### C. **Color hex codes**
> "Use #0E0C0A, #FAF8F5, #8B5A2B, #D4A24A as primary palette"

### D. **Font names**
> "Use Playfair Display for headings and Inter for body"

### E. **Sample copy from existing materials**
> "Match the tone of these 3 paragraphs from our about page: [paste]"

### F. **Competitor screenshots / URLs**
> "Layout inspiration: [URL1], [URL2]. Don't copy, take cues."

### G. **Product data**
> Even a CSV-style list:
> ```
> Name | Price | Category | Color | Image URL
> Classic Moto | $349 | Biker | Black | https://...
> ```

### H. **Existing brand assets**
> Logo SVG, brand guidelines PDF, existing CSS file, Figma export.

### I. **Constraints**
> "Must work on slow 3G. No external CDN. Max 100KB CSS bundle."

### J. **Out-of-scope list**
> "Don't generate: backend code, payment integration, admin dashboard."

---

## 8. PROMPT RULES (universal)

The 7 rules that make AI output 10× better:

### Rule 1 — **Be specific, not vague**
- ❌ "Make a website"
- ✅ "Make a homepage for a luxury leather brand targeting 30-50 year
     old men with $300+ disposable income, in the style of Prada × AllSaints"

### Rule 2 — **Give it a role**
- "Act as a senior UX designer with 15 years of e-commerce experience…"

### Rule 3 — **Specify the format**
- "Output as: 1. ASCII wireframe, 2. Section table, 3. Design notes."

### Rule 4 — **Provide examples**
- "Like this: [paste reference example]"

### Rule 5 — **Set constraints**
- Word counts, color palette, sections to include/exclude, tech stack.

### Rule 6 — **Iterate, don't redo**
- ❌ "Make it better"
- ✅ "Keep sections 1-5 the same. Replace section 6 with a 4-step
     configurator. Make hero copy 30% shorter. Use cognac instead of
     navy as accent."

### Rule 7 — **Ask for the WHY**
- "Explain why each section is in this order. Justify with conversion
   psychology."

---

## QUICK-COPY PROMPT TEMPLATES

Save these and fill the blanks:

### Template 1 — Wireframe
```
Create a detailed ASCII wireframe for [WEBSITE]'s homepage.
Style: single-line boxes (┌─┐), section arrows on right.
Include desktop + mobile + section cheat-sheet table + design system.
Brand: [DESCRIPTION]. Inspiration: [3 URLs].
```

### Template 2 — Code
```
Convert this wireframe into responsive HTML + CSS + vanilla JS.
[PASTE WIREFRAME]
Brand colors: [HEX]. Fonts: [NAMES]. Breakpoints: 480/768/1024/1280.
Accessibility: WCAG AA. Images: Unsplash placeholders.
```

### Template 3 — Brand
```
Generate a brand brief for [WEBSITE]. Output: story, mission, 3 personas,
voice (3 adjectives + samples), competitive position, top 5 USPs, values,
5 tagline options.
```

### Template 4 — Iterate
```
Keep sections [X-Y]. Replace section [Z] with [NEW DESCRIPTION].
Tighten copy in section [N] to under 20 words.
Change accent color from [OLD] to [NEW].
Don't touch anything else.
```

---

## TLDR — WHAT TO ASK FOR (in order)

When building a new website with AI:

1. **Brand brief** → understand WHO and WHY
2. **Site map** → understand WHAT pages exist
3. **Wireframe (lo-fi)** → understand WHERE things go
4. **Design system** → lock down colors, fonts, spacing
5. **Copy** → real text in every section
6. **Wireframe (detailed)** → final layout with real content
7. **Code** → build it
8. **A11y + perf audit** → polish
9. **Inner-page wireframes** → product, collection, about, custom, cart
10. **Iterate** → tighten, refine, ship
