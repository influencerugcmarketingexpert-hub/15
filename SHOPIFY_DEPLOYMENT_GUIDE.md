# Shopify Deployment — Custom Code to Shopify Store

> Architect's guide to deploying a custom-coded frontend on top of Shopify.
> 3 approaches, with full deployment workflow, pitfalls, and recommendation.

---

## THE 3 APPROACHES (decision matrix)

| Approach | What you build | What Shopify does | Difficulty | Cost / mo | Best for |
|----------|---------------|-------------------|------------|-----------|----------|
| **1. Shopify Theme (Liquid)** | HTML/CSS/JS converted to Liquid templates | Cart, checkout, payments, inventory, admin | Easy-Medium | $39+ (Basic plan) | Most stores. Full Shopify ecosystem |
| **2. Headless (Storefront API)** | 100% custom frontend (Next.js, Vue, etc.) | Backend only (products, cart, checkout, payments) | Hard | $39+ store + $20+ hosting | Brands wanting full design control + speed |
| **3. Shopify Hydrogen** | React/Remix frontend (Shopify's official framework) | Backend + Oxygen hosting | Medium-Hard | $39+ (free Oxygen hosting) | New headless builds, future-proof |

---

## APPROACH 1: SHOPIFY THEME (Liquid) — RECOMMENDED for 90% of stores

This is what **most stores use**. Aapka custom HTML/CSS/JS ko **Shopify Theme** mein convert karna hai using **Liquid** (Shopify's template language).

### What you keep, what you replace:

| Your custom code | What happens |
|-----------------|--------------|
| HTML structure | Keep (gets wrapped in `.liquid` files) |
| CSS | Keep (goes in `assets/` folder) |
| JS | Keep (goes in `assets/` folder) |
| Product data (hardcoded) | Replace with Liquid: `{{ product.title }}`, `{{ product.price }}` |
| Cart logic | Replace with Shopify cart API |
| Forms | Replace with Shopify forms |
| Hardcoded prices/images | Replace with `{{ product.price }}`, `{{ product.featured_image }}` |

### Liquid syntax basics (you'll use these everywhere):

```liquid
<!-- Output a variable -->
<h1>{{ product.title }}</h1>

<!-- Loop -->
{% for product in collections.frontpage.products %}
  <div class="product-card">
    <img src="{{ product.featured_image | img_url: '500x' }}" alt="{{ product.title }}">
    <h3>{{ product.title }}</h3>
    <p>{{ product.price | money }}</p>
  </div>
{% endfor %}

<!-- Conditional -->
{% if product.available %}
  <button>Add to Cart</button>
{% else %}
  <button disabled>Sold Out</button>
{% endif %}

<!-- Include another file (snippet) -->
{% render 'product-card', product: product %}
```

### Shopify theme folder structure (mandatory):

```
your-theme/
|-- assets/                    <- CSS, JS, images, fonts
|   |-- styles.css
|   |-- main.js
|   |-- logo.svg
|-- config/                    <- Theme settings (JSON)
|   |-- settings_schema.json
|   |-- settings_data.json
|-- layout/
|   |-- theme.liquid           <- Main wrapper (header + footer)
|-- locales/                   <- Translations
|   |-- en.default.json
|-- sections/                  <- Reusable sections (hero, footer, nav)
|   |-- header.liquid
|   |-- footer.liquid
|   |-- hero.liquid
|   |-- featured-products.liquid
|-- snippets/                  <- Small reusable components
|   |-- product-card.liquid
|   |-- icon-cart.liquid
|-- templates/                 <- Page templates
    |-- index.liquid           <- Homepage
    |-- product.liquid         <- Product detail page (PDP)
    |-- collection.liquid      <- Category/collection page (PLP)
    |-- cart.liquid
    |-- search.liquid
    |-- page.liquid            <- About, Contact, etc.
    |-- 404.liquid
```

### Mapping your custom code to Shopify theme:

| Your file | Goes into Shopify as |
|-----------|---------------------|
| `index.html` (header part) | `layout/theme.liquid` (top half) |
| `index.html` (homepage body) | `templates/index.liquid` + `sections/*.liquid` |
| `index.html` (footer part) | `layout/theme.liquid` (bottom half) |
| `css/styles.css` | `assets/styles.css` |
| `js/main.js` | `assets/main.js` |
| Product cards | `snippets/product-card.liquid` |
| Hero, trust strip, etc. | `sections/hero.liquid`, `sections/trust.liquid` |

### Step-by-step deployment workflow:

```
STEP 1: Sign up for Shopify
  -> shopify.com/signup
  -> Pick a plan (Basic $39/mo) — start with 3-day free trial
  -> Get your store URL: yourstore.myshopify.com

STEP 2: Install Shopify CLI on your computer
  -> npm install -g @shopify/cli @shopify/theme
  -> shopify --version

STEP 3: Initialize a theme
  -> shopify theme init my-theme
  -> cd my-theme
  -> This downloads "Dawn" (Shopify's default theme) as a starting point

STEP 4: Replace Dawn's files with your custom code
  -> Copy your CSS into assets/
  -> Copy your JS into assets/
  -> Convert your sections to Liquid (see snippet examples above)

STEP 5: Login + connect to your store
  -> shopify auth login
  -> shopify theme dev --store=yourstore.myshopify.com
  -> Opens a live preview at localhost:9292
  -> Hot-reloads as you edit

STEP 6: Add products to Shopify admin
  -> yourstore.myshopify.com/admin
  -> Products -> Add Product -> fill name, price, images, variants
  -> Collections -> Create collection (e.g., "Biker Jackets")
  -> Now your Liquid loops will pull real data

STEP 7: Push your theme to Shopify
  -> shopify theme push --unpublished     (draft mode)
  -> shopify theme push --live            (replaces live theme — careful!)

STEP 8: Connect a custom domain
  -> Shopify admin -> Settings -> Domains
  -> Buy domain ($14/yr) OR connect existing
  -> Update DNS records (A + CNAME)
  -> SSL auto-issued by Shopify

STEP 9: Set up payments
  -> Settings -> Payments -> Activate Shopify Payments (or Stripe/PayPal)
  -> 2.9% + 30c per transaction (varies by country)

STEP 10: Add legal pages
  -> Settings -> Legal -> Auto-generate Terms, Privacy, Refund policies

STEP 11: Configure shipping + taxes
  -> Settings -> Shipping -> Add zones + rates
  -> Settings -> Taxes -> Auto-configured by region

STEP 12: Test end-to-end
  -> Place a test order with bogus card: 1
  -> Test on mobile, desktop, slow 3G
  -> Test add-to-cart, checkout, refund

STEP 13: Launch
  -> Settings -> Plan -> Choose plan
  -> Disable password protection
  -> Add Google Analytics, Facebook Pixel, etc. (Settings -> Apps)
```

### Where you'll get stuck (common pitfalls):

| Problem | Why it happens | Fix |
|---------|---------------|-----|
| **Cart doesn't update without page reload** | Used hardcoded HTML cart instead of Shopify cart | Use Shopify's Cart AJAX API: `fetch('/cart/add.js', {...})` |
| **Images look pixelated on retina** | Used Shopify's default size | Use `{{ image \| img_url: '1500x' }}` for 2x displays |
| **Layout breaks on collection pages** | Forgot to make sections work in different contexts | Use `{% if template == 'index' %}` checks |
| **Custom JS conflicts with Shopify's JS** | Shopify auto-loads its own scripts | Wrap your JS in `DOMContentLoaded`, namespace functions |
| **Cart drawer doesn't show after add-to-cart** | Missing `cart.attributes` event listener | Use Shopify's cart event hooks |
| **SEO: meta tags missing** | Forgot to add to `theme.liquid` | Use `{{ page_title }}`, `{{ page_description }}`, `{{ canonical_url }}` |
| **Speed: theme is slow** | Loading too many assets | Inline critical CSS, defer non-critical JS, lazy-load images |
| **Translation issues** | Hardcoded English text | Use `{{ 'general.add_to_cart' \| t }}` from `locales/` |
| **Apps clash with custom code** | Apps inject HTML/CSS that fights yours | Disable conflicting apps, use specific selectors |
| **Search doesn't work** | Used custom search instead of Shopify's | Use `/search?q={query}` and Shopify's predictive search API |

---

## APPROACH 2: HEADLESS SHOPIFY (Storefront API)

100% custom frontend (Next.js, React, Vue, etc.). Shopify only handles backend.

### Architecture:

```
+-------------------------------------------------------------+
|  YOUR CUSTOM FRONTEND (Next.js / React / Vue)               |
|  Hosted on: Vercel / Netlify / Cloudflare Pages             |
|  Domain: yourstore.com                                       |
+----------------+--------------------------------------------+
                 | GraphQL / REST
                 v
+-------------------------------------------------------------+
|  SHOPIFY STOREFRONT API                                      |
|  - Products, collections, search                             |
|  - Cart create / update / checkout                           |
|  - Customer auth                                             |
+----------------+--------------------------------------------+
                 |
                 v
+-------------------------------------------------------------+
|  SHOPIFY BACKEND                                             |
|  - Inventory, orders, customers, payments                    |
|  - Admin panel: yourstore.myshopify.com/admin                |
+-------------------------------------------------------------+
```

### What you do:

```javascript
// Example: fetch products in Next.js
const SHOPIFY_DOMAIN = 'yourstore.myshopify.com';
const STOREFRONT_TOKEN = 'your-public-token';

async function getProducts() {
  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        products(first: 12) {
          edges {
            node {
              id title handle
              priceRange { minVariantPrice { amount currencyCode } }
              images(first: 1) { edges { node { url altText } } }
            }
          }
        }
      }`
    }),
  });
  return res.json();
}
```

### Headless pros and cons:

**Pros:**
- Total design freedom — no Liquid limits
- Use modern stack: React, Next.js, TypeScript
- Faster than themes when optimized (SSR + ISR)
- Can use any CMS (Sanity, Contentful) alongside Shopify

**Cons:**
- More expensive (Shopify plan + hosting + dev time)
- Checkout happens on Shopify domain (looks different unless you pay for Shopify Plus = $2,300/mo)
- Most Shopify apps don't work (they inject Liquid)
- You build a lot from scratch (search, filters, account, etc.)
- SEO needs more manual work
- Editing requires a developer (no theme editor for marketers)

### Headless pitfalls:

| Problem | Fix |
|---------|-----|
| Checkout URL is myshopify.com | Pay for Shopify Plus or accept the redirect |
| Cart doesn't persist across visits | Store cart ID in localStorage |
| Search is bad | Add Algolia or Searchanise |
| No marketer-friendly editor | Build custom CMS or use Sanity |
| Apps don't work | Find headless-friendly alternatives or build features yourself |
| Image optimization | Use Shopify's image_url params or next/image |

---

## APPROACH 3: SHOPIFY HYDROGEN (Shopify's official headless)

React + Remix framework, designed by Shopify for headless.

**Why use it:**
- Built-in Storefront API integration
- Free hosting on Shopify Oxygen
- Server components, SEO-ready
- Future-proof — Shopify is investing heavily here

**Pros:**
- Free hosting (Oxygen)
- Built-in optimizations (caching, streaming, image)
- React + Remix = modern DX
- Official Shopify support

**Cons:**
- Steep learning curve if you don't know React/Remix
- Locked into Shopify ecosystem
- Less mature than Next.js (smaller community)

---

## COST COMPARISON (annual)

| Item | Theme (Liquid) | Headless | Hydrogen |
|------|---------------|----------|----------|
| Shopify plan (Basic) | $468/yr ($39/mo) | $468 | $468 |
| Frontend hosting | $0 (Shopify) | $240/yr (Vercel Pro) | $0 (Oxygen free) |
| Domain | $14/yr | $14 | $14 |
| Email (workspace) | $72/yr (Google) | $72 | $72 |
| Dev time (initial) | 40-80 hrs | 100-200 hrs | 80-150 hrs |
| **Total / year** | **~$554** | **~$794+** | **~$554** |

For Shopify Plus (custom checkout, 100k+ orders): **$27,600+/yr**.

---

## ARCHITECT'S RECOMMENDATION

### For YOU (first ecommerce, custom design, fast launch):

**-> APPROACH 1: Shopify Theme (Liquid)**

Reasons:
1. **Cheapest** — only $39/mo, no extra hosting
2. **Fastest to launch** — 1-2 weeks vs 1-2 months for headless
3. **Full ecosystem** — 8,000+ apps work out of the box
4. **Marketer-friendly** — non-developers can edit via Shopify admin
5. **SEO baked in** — Shopify handles canonical URLs, sitemaps, structured data
6. **Future-proof** — you can migrate to headless later if needed
7. **Your custom HTML/CSS/JS works** — just convert templates to Liquid

### Migration path (when to upgrade later):

```
Year 1: Shopify Theme (Liquid)            <- start here
        |
        v
Year 2: $50k+ revenue, want more speed
        |
        v
        Headless (Next.js + Storefront API)
        |
        v
Year 3+: $1M+ revenue, custom checkout needed
        |
        v
        Shopify Plus + Hydrogen
```

---

## YOUR PERSONAL ROADMAP (concrete steps)

Since you've already built `index.html` + `styles.css` + `main.js`:

```
WEEK 1: Setup
  [ ] Sign up for Shopify Basic ($39/mo, 3-day trial)
  [ ] Install Node.js + Shopify CLI
  [ ] Run: shopify theme init my-theme
  [ ] Familiarize with folder structure

WEEK 2: Convert custom code to Liquid theme
  [ ] Copy your styles.css -> assets/styles.css
  [ ] Copy your main.js -> assets/main.js
  [ ] Split index.html into:
    - layout/theme.liquid (head + header + footer wrapper)
    - templates/index.liquid (homepage)
    - sections/announcement.liquid
    - sections/header.liquid
    - sections/hero.liquid
    - sections/categories.liquid
    - sections/new-arrivals.liquid
    - sections/best-sellers.liquid
    - sections/footer.liquid
  [ ] Replace hardcoded products with Liquid loops
  [ ] Create snippets/product-card.liquid

WEEK 3: Add real data
  [ ] Add 10-20 products in Shopify admin
  [ ] Create collections (Men, Women, Biker, Bomber, etc.)
  [ ] Upload product images
  [ ] Set up variants (size, color)
  [ ] Configure inventory

WEEK 4: Build remaining pages
  [ ] templates/product.liquid (PDP)
  [ ] templates/collection.liquid (PLP)
  [ ] templates/cart.liquid
  [ ] templates/page.about.liquid
  [ ] templates/page.contact.liquid
  [ ] Build cart drawer with Shopify Cart AJAX API

WEEK 5: Polish + integrations
  [ ] Set up custom domain (yourstore.com)
  [ ] Activate Shopify Payments
  [ ] Configure shipping zones + rates
  [ ] Install essential apps:
    - Klaviyo (email marketing)
    - Judge.me (reviews)
    - Klarna (BNPL)
    - Loox (UGC photo reviews)
    - PageFly (drag-drop builder, optional)
  [ ] Add Google Analytics + Facebook Pixel
  [ ] Test on real devices
  [ ] Add legal pages (Terms, Privacy, Refund)

WEEK 6: Soft launch
  [ ] Invite 10 friends to test
  [ ] Place test orders
  [ ] Fix bugs
  [ ] Hard launch with marketing
```

---

## CRITICAL THINGS YOU'LL FORGET (architect's checklist)

- [ ] **Mobile speed** — must score 80+ on PageSpeed
- [ ] **Cart drawer animation** — most stores get this wrong
- [ ] **Variant selector logic** — out of stock combos must be greyed out
- [ ] **Size guide modal** — fashion stores lose 30% of sales without one
- [ ] **Sticky add-to-cart on mobile PDP** — must on mobile
- [ ] **Product image zoom on hover** — desktop expects this
- [ ] **Quick-view modal from collection page** — speeds up browsing
- [ ] **Wishlist** (use app like "Wishlist Plus")
- [ ] **Search with autocomplete** (Shopify's predictive search or Algolia)
- [ ] **Review schema markup** — for Google star ratings in search
- [ ] **Abandoned cart emails** — recover 10-20% of lost sales (Klaviyo)
- [ ] **Browser-tab favicon + title** — looks unprofessional without
- [ ] **404 page** — branded, with search + popular products
- [ ] **Email confirmation templates** — customize, don't use default
- [ ] **Social share previews** — Open Graph + Twitter Card meta tags
- [ ] **Terms / Privacy / Refund / Shipping policy pages** — legal requirement
- [ ] **GDPR cookie banner** — required in EU
- [ ] **Multi-currency + multi-language** — if selling internationally
- [ ] **Backup theme** — duplicate before any major edit

---

## ONE-LINE TLDR

> **Build your custom HTML/CSS/JS like you're already doing -> convert it into a Shopify Theme by replacing data with Liquid tags -> upload via Shopify CLI -> done. Headless only if you have $1M+ revenue or specific reasons.**
