# VyaparSetu — Meesho Frontend & Supplier Hub Ecosystem Prototype
**Developed for Meesho Scripted By Her 2.0**

A high-fidelity, interactive frontend prototype replicating both the **Meesho E-Commerce Consumer Platform** and the complete **Meesho Supplier Hub Portal** (`supplier.meesho.com`), featuring full JWT Authentication, Influencer Marketing enrollment, and a live Catalog Database engine.

---

## 🌟 Prototype Features & Architecture

### 1. Consumer Shopping Frontend (`index.html`)
- **Sticky Top Header**: Meesho vector brand logo (`#9F2089`), live search autocomplete bar, and user action icons (Profile, Cart, Become a Supplier).
- **Mega-Menu Category Strip**: Interactive category tabs across *Women Ethnic, Women Western, Men, Kids, Home & Kitchen, Electronics*.
- **Live Search & Filtering**: Real-time product filtering, category tabs, sorting, quick view modals, and interactive shopping cart drawer.

### 2. Supplier Center Homepage (`supplier.html`)
- Replicates `https://supplier.meesho.com/`.
- **0% Commission Profit Calculator Widget**: Interactive profit estimation tool demonstrating Meesho's zero commission benefit.
- **Supplier Trust & Benefits Grid**: Features 14 Lakh+ supplier metrics, zero penalty guarantees, and automated payment schedules.

### 3. Supplier Authentication & JWT Engine (`supplier-auth.html`)
- Replicates `https://supplier.meesho.com/panel/v3/new/auth/signup`.
- Split promotional layout with live mobile/email OTP authentication tabs.
- **Real-Time JWT Generation (`auth.js`)**: Generates base64url signed tokens (`header.payload.signature`) with an interactive token inspector modal.

### 4. Authenticated Supplier Hub Dashboard (`supplier-dashboard.html`)
- **Dark Sidebar Navigation**: Store selector dropdown, quick notice bar, and navigation across *Orders, Returns, Pricing, Claims, Inventory, Catalog Uploads, Quality, Payments, Warehouse, Influencer Marketing, and Promotions*.
- **Dynamic Greeting Box**: Automatically displays `Welcome <Supplier Name>` from the JWT session.
- **3-Step Onboarding Stepper**: Interactive onboarding guide and single / bulk catalog upload blocks.

### 5. Catalog Database & Product Upload Portal (`supplier-catalog-upload.html`)
- **Tab Switcher**: Seamlessly toggle between **Add New Catalog** and **My Catalogs Database**.
- **Product Upload Form**: Enter product title, SKU, category, price, MRP, stock quantity, and photo URL (or select sample presets: Kurti, Saree, Watch) with live image preview.
- **Influencer Marketing Toggle**: Enable **Send to Influencers for Marketing (50K+ Creators)** to instantly tag products for video reel promotions.
- **Persistent Local Database (`localStorage.meesho_supplier_catalogs`)**: Stores all catalogs locally with full management table and live enrollment toggle.

### 6. Influencer Marketing Portal (`supplier-influencer.html`)
- Replicates Meesho's Influencer Marketing program interface.
- **E-Signature Verification Strip**: Interactive alert banner allowing suppliers to enter their e-signature to verify GST invoice creation.
- **Hero Video Reel Mockup**: Visual smartphone mockup showcasing model reels (`@lishapatel._`), product overlay tags, and Instagram/YouTube integration.
- **Synchronized Catalog Selection Modal**: Dynamically loads your live products from the Catalog Database (`localStorage.meesho_supplier_catalogs`) so you can enroll items in real time.

---

## 🚀 Running Locally

1. Clone or download this repository:
   ```bash
   git clone https://github.com/sshreya1809/VyaparSetu--Meesho-ScriptedBy-Her-2.0-.git
   cd VyaparSetu--Meesho-ScriptedBy-Her-2.0-
   ```
2. Launch a local web server (using Python, Node.js, or VS Code Live Server):
   ```bash
   python -m http.server 3000
   ```
3. Open **http://localhost:3000** in your browser.
