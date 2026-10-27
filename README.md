# HS Collection - Luxury Pakistani Fashion & Prêt E-Commerce Website

A complete, modern, elegant, and fully responsive e-commerce web application created for **HS Collection**, a premium Pakistani fashion and accessories brand based in Lahore, Pakistan.

---

## 🌟 Brand & Overview

- **Brand Name:** HS Collection
- **Market:** Pakistan (Nationwide Delivery)
- **Currency:** Pakistani Rupees (PKR / Rs.)
- **Aesthetic:** Editorial luxury with an elegant black, white, and soft champagne/beige palette
- **Categories:** Ladies Suits (Luxury Lawn & Chiffon Pret), Gents Suits (Royal Boski & Egyptian Cotton), Fashion Accessories (Kashmiri Pashmina Shawls, Embellished Khussas, Clutches, Cufflinks), New Arrivals, Best Sellers, and Special Festive Offers.

---

## 🛍️ Completed Features

### 1. Storefront & Luxury Design
- **Announcement Bar:** Rotating promotional alerts (Free nationwide delivery over Rs. 3,500, Cash on Delivery nationwide, direct phone & WhatsApp helpline).
- **Brand Identity & Header:** Refined HS monogram crest with gold typography, responsive desktop navigation, instant search trigger, wishlist counter, shopping bag with subtotal, and an Admin Portal shortcut.
- **Hero Slider:** Full-width editorial fashion carousel featuring high-resolution photography, Urdu poetry accents, and direct category & WhatsApp ordering CTAs.
- **Nationwide Trust Pillars:** Cash on Delivery across 200+ Pakistani cities, 7-day hassle-free exchange policy, 100% authentic designer fabrics, and WhatsApp concierge.
- **Category Showcase:** Visual tiles for the 6 core categories with real-time product counts.
- **Curated Product Tabs:** Interactive switching between "Trending Now", "New Arrivals 2026", "Ladies Suits", and "Gents Collection".
- **Artisanal Heritage Story:** Narrative section detailing Pakistani craftsmanship, zardozi needlework, and fabric grade specifications.
- **Customer Testimonials:** Verified reviews from buyers in Lahore, Karachi, Islamabad, Peshawar, and Faisalabad.
- **Instagram / Lookbook Gallery:** `#HSCollectionLook` social community grid.
- **Newsletter Subscription:** Instant coupon code reward (`WELCOME10` for 10% off).
- **Footer:** Brand narrative, customer service links, policy shortcuts, payment provider badges (COD, Meezan Bank, HBL), and store address (MM Alam Road, Gulberg III, Lahore).

### 2. Shopping & Product Detail Experience
- **Live Search Modal:** Fast live keyword search across names, Urdu titles, fabric descriptions, and tags with keyboard shortcut (`/` or `Cmd+K`).
- **Catalog Filtering & Sorting:** Filter by category, subcategory, price slider (Rs. 2,000 – Rs. 20,000+), size (XS to XXL & Unstitched), and in-stock only. Sort by price, rating, or newest.
- **Product Cards:** Image hover effects, discount badges, stock indicators, size pills, color swatches, Quick Add, Quick Preview, Wishlist, and WhatsApp inquiry buttons.
- **Product Quick View Modal:** Pop-up preview for fast browsing without navigating away.
- **Dedicated Product Page:** Multi-image gallery with thumbnails, SKU, stock count, fabric composition, size selector with interactive **Size Guide modal (measurements in inches for ladies & gents)**, color picker, quantity stepper, "Add to Bag", "Direct Checkout", and pre-filled "Order via WhatsApp".
- **Slide-Over Cart Drawer:** Free delivery progress bar, line items with size and color, quantity update, item removal, and promo code system (`WELCOME10`, `EID2026`, `FREESHIP`).

### 3. Pakistan-Specific Checkout Flow
- **Pakistani Mobile Phone Validation:** Formats and validates 11-digit numbers (`0300 1234567` or `+92 3XX XXXXXXX`).
- **City & Destination Support:** Dropdown covering major Pakistani cities (Lahore, Karachi, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, Sialkot, Gujranwala, Hyderabad, Abbottabad, Bahawalpur, etc.) plus a custom town input.
- **Cash on Delivery (COD):** First-class checkout option with clear explanation of payment to courier upon delivery.
- **Direct Bank Transfer:** Complete account details displayed (Meezan Bank, Account Title, IBAN) with transfer screenshot instructions.
- **Order Review & Summary:** Automatic calculation of subtotal, nationwide delivery fee, promo discount, and total.

### 4. Order Confirmation & Tracking
- **Order Reference Generation:** Unique order reference numbers (e.g. `HSC-2026-XXXX`).
- **Transparent Demo Mode:** Clearly identifies demo mode while storing orders in browser storage so store workflows can be fully tested.
- **One-Click WhatsApp Order Submission:** Button that formats the entire order with reference number, customer address, and items, opening WhatsApp ready to send to the business team.
- **Printable Order Receipt:** Formatted receipt for printing or PDF saving.
- **Order Tracking Portal:** Look up any order by reference number or phone number to view live courier status with a visual timeline (Order Placed ➔ Confirmed ➔ Quality Check ➔ Dispatched via TCS/Trax ➔ Delivered).

### 5. Store Owner Admin Portal
- **Dashboard KPIs:** Total Orders, Recorded PKR Revenue, Pending Dispatches, and Low Stock alerts.
- **Order Management:** View full customer details, update order status (Pending, Confirmed, Processing, Shipped, Delivered), and directly message customer on WhatsApp.
- **Catalog & Inventory:** Quick-edit prices in PKR, adjust stock counts, toggle availability, add new designs with image URL, and delete items.
- **Export Orders:** Download all placed orders as a structured JSON file.
- **Settings Tab:** Update business WhatsApp phone number, delivery fees, free delivery threshold, and bank details.

### 6. WhatsApp Concierge Integration
- **Configurable in one single place:** `src/config/storeConfig.ts`.
- **Floating WhatsApp Widget:** Persistent bottom-right button with live stylist indicator.
- **Formatted Templates:** Built-in generators for individual product inquiries, whole cart orders, and post-purchase confirmation messages.

---

## 📁 Project File Structure

```
├── .env.example                # Environment variables template
├── index.html                  # HTML entry with Cormorant Garamond luxury fonts & metadata
├── metadata.json               # AI Studio app metadata
├── netlify.toml                # Netlify deployment and SPA redirect configuration
├── package.json                # Dependencies and build scripts
├── public/
│   └── _redirects              # Netlify client-side routing fallback
├── src/
│   ├── main.tsx                # React application entry point
│   ├── index.css               # Tailwind CSS styles and luxury typography variables
│   ├── App.tsx                 # Master view routing and modal providers
│   ├── config/
│   │   └── storeConfig.ts      # Central store settings (WhatsApp #, bank details, delivery rules)
│   ├── types/
│   │   └── index.ts            # TypeScript definitions (Product, Cart, Order, Customer)
│   ├── data/
│   │   └── products.ts         # Sample Pakistani fashion catalog, reviews, and coupons
│   ├── utils/
│   │   └── formatters.ts       # PKR currency formatter, phone validator, WhatsApp builder
│   ├── context/
│   │   └── StoreContext.tsx    # State management for cart, orders, catalog, and filters
│   └── components/
│       ├── AnnouncementBar.tsx       # Top promotional message ticker
│       ├── Header.tsx                # Brand crest, navigation, search, wishlist & cart badges
│       ├── HeroSlider.tsx            # Full-width editorial fashion hero carousel
│       ├── ValueProps.tsx            # Nationwide COD and trust pillars
│       ├── CategoryShowcase.tsx      # 6 main category image cards
│       ├── ProductCard.tsx           # Product tile with badges, size pills, and quick add
│       ├── ProductQuickViewModal.tsx # Fast product preview modal
│       ├── ProductDetailView.tsx     # Full product page with tabs & WhatsApp ordering
│       ├── ShopView.tsx              # Full catalog with sidebar filters & search
│       ├── CartDrawer.tsx            # Slide-over cart with free shipping bar & coupons
│       ├── CheckoutView.tsx          # Pakistani checkout with phone & city validation
│       ├── OrderConfirmationView.tsx # Order confirmation with print & WhatsApp push
│       ├── OrderTrackingView.tsx     # Order status lookup with visual progress timeline
│       ├── AdminPortal.tsx           # Store owner dashboard for orders & inventory
│       ├── ReviewsSection.tsx        # Pakistani customer testimonials
│       ├── PromoBanner.tsx           # Festive discount banner with code copy
│       ├── Newsletter.tsx            # Email signup with instant coupon
│       ├── Footer.tsx                # Brand story, Pakistan payment badges, contact info
│       ├── PolicyModal.tsx           # Shipping, return, FAQ, privacy & size chart modal
│       ├── WhatsAppFloatingButton.tsx# Bottom-right WhatsApp concierge widget
│       ├── SearchModal.tsx           # Live search popup with keyboard shortcuts
│       ├── WishlistView.tsx          # Saved items view
│       └── Toast.tsx                 # Notification alerts
├── tsconfig.json               # TypeScript compiler configuration
└── vite.config.ts              # Vite configuration with Tailwind CSS plugin
```

---

## 🚀 Previewing & Running Locally

1. **Clone or Download the Project:**
   ```bash
   git clone <your-repository-url>
   cd hs-collection
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000` (or the port specified in terminal).

4. **Build for Production:**
   ```bash
   npm run build
   ```
   This compiles the project into the `dist/` directory.

---

## ⚙️ Configuration Guide: Personalizing Your Store

Before launching your store to real customers, customize the following settings:

### 1. Update Your Business WhatsApp Number
Open `/src/config/storeConfig.ts` and replace the placeholder WhatsApp number:
```typescript
// Format: Country code (92 for Pakistan) followed by your mobile number without leading 0
whatsAppNumber: "923001234567", // <-- Replace with your real business WhatsApp number
whatsAppDisplay: "+92 300 1234567",
```
*Note: You can also update this dynamically at any time inside the **Admin Portal**.*

### 2. Configure Delivery Fees & Free Shipping Threshold
In `/src/config/storeConfig.ts`:
```typescript
shipping: {
  freeShippingThreshold: 3500, // Orders over Rs. 3,500 enjoy free nationwide delivery
  standardShippingFee: 250,    // Standard delivery fee across Pakistan
  expressShippingFee: 450,
  deliveryEstimate: "3 to 5 business days nationwide",
}
```

### 3. Update Official Bank Account Details
In `/src/config/storeConfig.ts`:
```typescript
bankDetails: {
  bankName: "Meezan Bank Limited",
  accountTitle: "HS COLLECTION APPAREL",
  accountNumber: "0201-0105849301",
  iban: "PK42MEZN0002010105849301",
  branchCode: "0201 (MM Alam Branch, Lahore)",
}
```

### 4. Replace Sample Products With Your Real Inventory
Open `/src/data/products.ts` and replace the items in `INITIAL_PRODUCTS` with your actual garments, photography, fabric compositions, and pricing. You can also add or delete products directly in the **Admin Portal**!

---

## 📦 How to Export and Push Code to GitHub

1. **Initialize Git (if not already initialized):**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: HS Collection Pakistani fashion store"
   ```

2. **Create a New Repository on GitHub:**
   - Log in to your GitHub account at [github.com](https://github.com).
   - Click **New Repository**.
   - Give it a name (e.g., `hs-collection-store`) and choose Public or Private.
   - Do **not** initialize with README or .gitignore (they already exist in this project).

3. **Link Your Local Code to GitHub and Push:**
   ```bash
   git remote add origin https://github.com/<your-username>/hs-collection-store.git
   git branch -M main
   git push -u origin main
   ```

---

## 🌐 How to Deploy on Netlify

This repository is already pre-configured for Netlify with `netlify.toml` and `public/_redirects`.

### Option A: Deploy via GitHub (Recommended for automatic continuous deployment)
1. Sign up or log in at [netlify.com](https://www.netlify.com).
2. Click **Add new site** ➔ **Import an existing project**.
3. Select **GitHub** and authorize access to your repository.
4. Select the repository: `hs-collection-store`.
5. Netlify will automatically detect the settings:
   - **Build Command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **Deploy hs-collection**.
7. In ~60 seconds, your website will be live with a secure HTTPS URL!

### Option B: Deploy via Netlify CLI
1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
2. Build the project:
   ```bash
   npm run build
   ```
3. Deploy to production:
   ```bash
   netlify deploy --prod --dir=dist
   ```

---

## 🔒 Checklist Before Accepting Real Customer Payments

Before taking real customer transactions in production:
1. **Business WhatsApp Number:** Set your active Pakistani business WhatsApp number in `src/config/storeConfig.ts`.
2. **Actual Product Photography & Inventory:** Update the sample photos in `src/data/products.ts` with your genuine high-resolution apparel images and actual stock numbers.
3. **Logistics Agreement:** Sign a corporate Cash on Delivery (COD) merchant contract with TCS Express, Leopards Courier, or Trax Logistics to receive booking API credentials and rider pickups.
4. **Online Card Payment Gateway (Optional):** If you wish to accept Visa/Mastercard, integrate a licensed Pakistani gateway such as PayFast, Safepay, JazzCash Business, or EasyPaisa.
5. **Backend Database:** When ready to sync orders and catalog across multiple staff members simultaneously, connect a persistent cloud database (e.g. Firebase Firestore or PostgreSQL).
