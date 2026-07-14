"use client";

import React, { useState, useEffect } from "react";
import { MEESHO_CATEGORIES, MEESHO_FEATURED_CATEGORIES } from "@/lib/data";

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState("all");
  const [currentSort, setCurrentSort] = useState("relevance");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Failed to fetch real products:", err));
  }, []);

  // Search logic
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Filter & Sort logic
  let filteredProducts = [...products];
  if (currentFilter !== "all") {
    if (currentFilter === "under-299") {
      filteredProducts = filteredProducts.filter((p) => p.price <= 299);
    } else {
      filteredProducts = filteredProducts.filter((p) => p.category === currentFilter);
    }
  }

  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase().trim();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subCategory.toLowerCase().includes(q) ||
        (p.badge && p.badge.toLowerCase().includes(q))
    );
  }

  switch (currentSort) {
    case "price-asc":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "discount":
      filteredProducts.sort((a, b) => b.discount - a.discount);
      break;
  }

  const addToCart = (product: any) => {
    setCart([...cart, product]);
    alert(`${product.title.slice(0, 24)}... added to Cart!`);
  };

  const calculateTotal = () => cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <>
      {/* Top Notification */}
      <div className="top-notice-bar">
        <span className="top-notice-badge">Prototype Ready</span>
        <span>Meesho Front Page Prototype — React/Next.js Migration!</span>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div className="header-container">
          <a href="#" className="brand-logo">
            <svg className="meesho-logo-svg" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="160" height="40" rx="6" fill="transparent" />
              <path d="M12 28V12L18.5 21L25 12V28" stroke="#9F2089" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <text x="32" y="27" fill="#9F2089" fontFamily="'Inter', sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.5px">meesho</text>
            </svg>
          </a>

          <div className="search-container">
            <div className="search-box">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" className="search-input" placeholder="Try Saree, Kurti or Search by Product Code" value={searchQuery} onChange={handleSearch} />
            </div>
          </div>

          <div className="header-actions">
            <a href="/supplier" className="header-nav-item">Become a Supplier</a>
            <div className="header-divider"></div>
            <div className="header-nav-item profile-action" onClick={() => setIsAuthModalOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>Profile</span>
            </div>
            <div className="header-divider"></div>
            <button className="cart-action" onClick={() => setIsCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
              <span className="cart-badge">{cart.length}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Category Nav */}
      <nav className="category-nav-bar">
        <div className="category-list">
          {MEESHO_CATEGORIES.map(cat => (
            <div key={cat.id} className="category-item" onClick={() => setCurrentFilter(cat.id)}>
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-banner">
          <div className="hero-content">
            <h1 className="hero-title">Lowest Prices<br />Best Quality Shopping</h1>
            <p className="hero-subtitle">Discover over 50 Lakh+ must-have products at unbeatable wholesale prices — From fashion wear to cutting-edge gadgets!</p>
            <div className="hero-features-box">
              <div className="hero-feature-pill">
                <span>Free Delivery</span>
              </div>
              <div className="hero-feature-pill">
                <span>Cash on Delivery</span>
              </div>
            </div>
            <button className="hero-cta-btn">
              <span>Explore Products</span>
            </button>
          </div>
          <div className="hero-visual">
            <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80" alt="Saree" className="hero-card-img" />
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="featured-section">
        <div className="section-header">
          <h2 className="section-title">Top Categories to Explore</h2>
        </div>
        <div className="featured-grid">
          {MEESHO_FEATURED_CATEGORIES.map(cat => (
            <div key={cat.id} className="featured-card" onClick={() => setCurrentFilter(cat.id)}>
              <img src={cat.image} alt={cat.title} className="featured-card-image" />
              <div className="featured-card-body">
                <h4 className="featured-card-title">{cat.title}</h4>
                <span className="featured-card-tag">{cat.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Feed */}
      <section className="feed-section">
        <div className="section-header">
          <h2 className="section-title">Products For You</h2>
        </div>
        
        <div className="feed-toolbar">
          <div className="filter-tabs">
            <button className={`filter-tab-btn ${currentFilter === 'all' ? 'active' : ''}`} onClick={() => setCurrentFilter('all')}>All Products</button>
            <button className={`filter-tab-btn ${currentFilter === 'women-ethnic' ? 'active' : ''}`} onClick={() => setCurrentFilter('women-ethnic')}>Women Ethnic</button>
            <button className={`filter-tab-btn ${currentFilter === 'electronics' ? 'active' : ''}`} onClick={() => setCurrentFilter('electronics')}>Electronics</button>
          </div>
          <div className="sort-control">
            <span className="sort-label">Sort by:</span>
            <select className="sort-select" value={currentSort} onChange={e => setCurrentSort(e.target.value)}>
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card" onClick={() => setSelectedProduct(product)}>
              <div className="product-image-wrap">
                <img src={product.image} alt={product.title} className="product-image" />
                {product.badge && <span className="product-badge">{product.badge}</span>}
              </div>
              <div className="product-info">
                <h4 className="product-title">{product.title}</h4>
                <div className="product-pricing">
                  <span className="current-price">₹{product.price}</span>
                  <span className="original-price">₹{product.originalPrice}</span>
                  <span className="discount-tag">{product.discount}% off</span>
                </div>
                {product.freeDelivery && <span className="product-delivery-tag">Free Delivery</span>}
                <div className="product-footer">
                  <div className="rating-pill">
                    <span>{product.rating}</span><span>★</span>
                  </div>
                  <button className="add-to-cart-sm-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>+ Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modals */}
      {selectedProduct && (
        <div className="modal-overlay active" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProduct(null)}>&times;</button>
            <div className="modal-image-box">
              <img src={selectedProduct.image} alt={selectedProduct.title} className="modal-image" />
            </div>
            <div className="modal-details">
              <div className="modal-category-tag">{selectedProduct.subCategory}</div>
              <h3 className="modal-title">{selectedProduct.title}</h3>
              <div className="modal-price-row">
                <span className="modal-current-price">₹{selectedProduct.price}</span>
              </div>
              <button className="btn-primary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to Cart</button>
            </div>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="cart-drawer-overlay active" onClick={() => setIsCartOpen(false)}>
          <div className="cart-drawer" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h3>Shopping Cart ({cart.length})</h3>
              <button onClick={() => setIsCartOpen(false)} style={{fontSize: '24px'}}>&times;</button>
            </div>
            <div className="cart-body">
              {cart.map((item, idx) => (
                <div key={idx} className="cart-item">
                  <img src={item.image} alt={item.title} className="cart-item-img" />
                  <div className="cart-item-info">
                    <h5 className="cart-item-title">{item.title}</h5>
                    <div className="cart-item-price">₹{item.price}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-footer">
              <div className="cart-summary-row">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
