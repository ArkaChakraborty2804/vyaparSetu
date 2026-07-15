"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./upload.scss";

interface CatalogItem {
  id: string;
  title: string;
  category: string;
  price: number;
  mrp: number;
  stock: number;
  image: string;
  influencerEnrolled: boolean;
  roi: string;
}

const DEFAULT_CATALOGS: CatalogItem[] = [
  {
    id: "MSH-KRTI-101",
    title: "Designer Floral Silk Anarkali Kurti",
    category: "Women Ethnic",
    price: 599,
    mrp: 1499,
    stock: 120,
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80",
    influencerEnrolled: true,
    roi: "8% ROI"
  },
  {
    id: "MSH-SRE-204",
    title: "Georgette Embroidered Saree with Blouse",
    category: "Women Ethnic",
    price: 1299,
    mrp: 2999,
    stock: 85,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
    influencerEnrolled: true,
    roi: "6% ROI"
  },
  {
    id: "MSH-WTCH-88",
    title: "Men Luxury Chronograph Wrist Watch",
    category: "Men Fashion",
    price: 849,
    mrp: 1999,
    stock: 40,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80",
    influencerEnrolled: false,
    roi: "10% ROI"
  }
];

export default function CatalogUpload() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"view-add-catalog" | "view-my-catalogs">("view-add-catalog");
  const [catalogs, setCatalogs] = useState<CatalogItem[]>([]);
  
  // Form state
  const [title, setTitle] = useState("Handwoven Banarasi Silk Kurta Set");
  const [sku, setSku] = useState("MSH-SLK-408");
  const [category, setCategory] = useState("Women Ethnic");
  const [price, setPrice] = useState(799);
  const [mrp, setMrp] = useState(1899);
  const [stock, setStock] = useState(75);
  const [image, setImage] = useState("https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80");
  const [influencerEnrolled, setInfluencerEnrolled] = useState(true);

  useEffect(() => {
    // Authenticate
    const jwt = localStorage.getItem("meesho_supplier_jwt") || sessionStorage.getItem("session_jwt");
    const user = localStorage.getItem("meesho_supplier_user");
    if (!jwt && !user) {
      router.push("/supplier/auth?mode=login");
    }

    // Load Catalogs
    try {
      const raw = localStorage.getItem("meesho_supplier_catalogs");
      if (raw) {
        setCatalogs(JSON.parse(raw));
      } else {
        setCatalogs(DEFAULT_CATALOGS);
        localStorage.setItem("meesho_supplier_catalogs", JSON.stringify(DEFAULT_CATALOGS));
      }
    } catch (e) {
      setCatalogs(DEFAULT_CATALOGS);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("meesho_supplier_jwt");
    sessionStorage.removeItem("session_jwt");
    localStorage.removeItem("meesho_supplier_user");
    router.push("/supplier/auth?mode=login");
  };

  const saveCatalogs = (newCatalogs: CatalogItem[]) => {
    setCatalogs(newCatalogs);
    localStorage.setItem("meesho_supplier_catalogs", JSON.stringify(newCatalogs));
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const newCat: CatalogItem = {
      id: sku,
      title,
      category,
      price,
      mrp,
      stock,
      image,
      influencerEnrolled,
      roi: influencerEnrolled ? "8% ROI" : "Not Enrolled"
    };

    const updatedCatalogs = [newCat, ...catalogs];
    saveCatalogs(updatedCatalogs);

    alert(`✅ Product "${title}" (${sku}) successfully stored in your Meesho Catalog Database!\n\nSent to Influencer Program: ${influencerEnrolled ? "YES (50K+ Creators)" : "NO"}`);
    setActiveTab("view-my-catalogs");
  };

  const toggleMarketing = (index: number) => {
    const updated = [...catalogs];
    updated[index].influencerEnrolled = !updated[index].influencerEnrolled;
    updated[index].roi = updated[index].influencerEnrolled ? "8% ROI" : "Not Enrolled";
    saveCatalogs(updated);
  };

  const deleteCatalog = (index: number) => {
    if (confirm("Remove this catalog from your database?")) {
      const updated = catalogs.filter((_, i) => i !== index);
      saveCatalogs(updated);
    }
  };

  return (
    <div className="scope-supplier-catalog-upload"><div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* ==================== LEFT DARK SIDEBAR ==================== */}
      <aside className="dashboard-sidebar">
        {/* Store Dropdown Selector */}
        <div className="store-selector-bar">
          <div className="store-info">
            <div className="store-avatar">F</div>
            <span className="store-name">Frostilicious</span>
          </div>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>

        {/* Quick Action Notices & Support */}
        <div className="quick-notices-bar">
          <a href="#" className="notice-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span>Notices</span>
          </a>
          <a href="#" className="notice-item">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
            <span>Support</span>
          </a>
        </div>

        {/* Scrollable Sidebar Links */}
        <nav className="sidebar-nav-scroll">
          <Link href="/supplier/dashboard" className="nav-link">
            <div className="nav-link-content">
              <span className="nav-icon">🏪</span>
              <span>Home</span>
            </div>
          </Link>

          <div className="nav-section-title">Manage Business</div>

          <Link href="/supplier/catalog-upload" className="nav-link active">
            <div className="nav-link-content">
              <span className="nav-icon">📁</span>
              <span>Catalog Uploads</span>
            </div>
          </Link>

          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); alert("Image Bulk Upload feature: Select up to 100 product images to auto-extract attributes using AI!"); }}>
            <div className="nav-link-content">
              <span className="nav-icon">🖼️</span>
              <span>Image Bulk Upload</span>
            </div>
          </a>

          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); alert("Payments Hub: 0% commission payouts directly to your registered bank account every 7 days."); }}>
            <div className="nav-link-content">
              <span className="nav-icon">💳</span>
              <span>Payments</span>
            </div>
          </a>

          <div className="nav-section-title">Boost Sales</div>

          <Link href="/supplier/influencer" className="nav-link">
            <div className="nav-link-content">
              <span className="nav-icon">🌟</span>
              <span>Influencer Marketing</span>
            </div>
          </Link>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px' }}>
          <Link href="/" style={{ textDecoration: 'none' }} title="Go to Meesho Main Shopping Home">
            <div className="sidebar-meesho-logo">meesho</div>
            <div className="sidebar-meesho-sub">Supplier Hub</div>
          </Link>
          <button type="button" onClick={handleLogout} className="sidebar-logout-btn" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#F87171', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '6px', padding: '6px 10px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }} title="Log out and erase session data">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ==================== MAIN CONTENT AREA ==================== */}
      <main className="dashboard-main" style={{ flex: 1 }}>
        
        {/* Top Hub Header */}
        <header className="top-hub-header">
          <div className="hub-breadcrumb">
            <span>Supplier Hub / Manage Business / <strong>Catalog Database & Uploads</strong></span>
          </div>
          <div className="hub-actions">
            <Link href="/supplier/dashboard" className="btn-hub-switch">← Back to Dashboard</Link>
            <Link href="/supplier/influencer" className="btn-hub-switch">🌟 Influencer Marketing</Link>
            <Link href="/" className="btn-hub-switch">🛒 Shopping Front Page</Link>
          </div>
        </header>

        {/* Content Pad */}
        <div className="catalog-content-pad">
          
          {/* Top Tab Switcher Bar */}
          <div className="catalog-tabs-bar">
            <div className="catalog-tab-buttons">
              <button 
                className={`tab-btn ${activeTab === 'view-add-catalog' ? 'active' : ''}`} 
                onClick={() => setActiveTab('view-add-catalog')} 
                type="button"
              >
                <span>➕ Add New Catalog</span>
              </button>
              <button 
                className={`tab-btn ${activeTab === 'view-my-catalogs' ? 'active' : ''}`} 
                onClick={() => setActiveTab('view-my-catalogs')} 
                type="button"
              >
                <span>📦 My Catalogs</span>
                <span className="tab-badge">{catalogs.length}</span>
              </button>
            </div>

            <div className="catalog-search-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              <input type="text" placeholder="Search SKU, Product Title..." onChange={() => {}} />
            </div>
          </div>

          {/* ==================== TAB 1: ADD NEW CATALOG FORM ==================== */}
          <div className={`tab-view ${activeTab === 'view-add-catalog' ? 'active' : ''}`} id="view-add-catalog">
            <div className="add-catalog-card">
              <h2>Upload Product Catalog & Enroll in Marketing</h2>
              <p className="form-subtitle">Add product details and photos. Enable Influencer Marketing to let 50,000+ Meesho Creators promote this item.</p>

              <form id="new-catalog-form" onSubmit={handlePublish}>
                <div className="form-grid-2col">
                  
                  {/* Left Form Fields */}
                  <div className="form-left-fields">
                    <div className="field-group">
                      <label htmlFor="cat-title">Product Title *</label>
                      <input type="text" id="cat-title" required placeholder="e.g. Designer Embroidered Georgette Anarkali Gown" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>

                    <div className="form-row-2">
                      <div className="field-group">
                        <label htmlFor="cat-sku">SKU ID *</label>
                        <input type="text" id="cat-sku" required placeholder="e.g. MSH-KRTI-501" value={sku} onChange={(e) => setSku(e.target.value)} />
                      </div>
                      <div className="field-group">
                        <label htmlFor="cat-category">Category *</label>
                        <select id="cat-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option value="Women Ethnic">Women Ethnic</option>
                          <option value="Women Western">Women Western</option>
                          <option value="Men Fashion">Men Fashion</option>
                          <option value="Kids & Baby">Kids & Baby</option>
                          <option value="Home & Kitchen">Home & Kitchen</option>
                          <option value="Electronics">Electronics</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="field-group">
                        <label htmlFor="cat-price">Selling Price (₹) *</label>
                        <input type="number" id="cat-price" required placeholder="499" value={price} onChange={(e) => setPrice(Number(e.target.value))} min="50" />
                      </div>
                      <div className="field-group">
                        <label htmlFor="cat-mrp">MRP (₹)</label>
                        <input type="number" id="cat-mrp" placeholder="1499" value={mrp} onChange={(e) => setMrp(Number(e.target.value))} />
                      </div>
                    </div>

                    <div className="field-group">
                      <label htmlFor="cat-stock">Initial Stock Quantity *</label>
                      <input type="number" id="cat-stock" required placeholder="100" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
                    </div>

                    <div className="field-group">
                      <label htmlFor="cat-img-url">Product Photo URL *</label>
                      <input type="url" id="cat-img-url" required placeholder="https://..." value={image} onChange={(e) => setImage(e.target.value)} />
                    </div>

                    {/* Special Box: Send to Influencers for Marketing */}
                    <div className="influencer-optin-box">
                      <div className="inf-optin-head">
                        <div className="inf-optin-title">
                          <span>🌟</span>
                          <span>Send to Influencers for Marketing (50K+ Creators)</span>
                        </div>
                        <label className="inf-switch">
                          <input type="checkbox" id="inf-enroll-toggle" checked={influencerEnrolled} onChange={(e) => setInfluencerEnrolled(e.target.checked)} />
                          <span className="slider-toggle"></span>
                        </label>
                      </div>
                      <p style={{ fontSize: '12.5px', color: '#6E5A1C', lineHeight: 1.4 }}>
                        When enabled, this product is immediately sent to 50,000+ Meesho creators to create video reels on Meesho App & Instagram. Only pay commission on successfully delivered orders!
                      </p>
                    </div>
                  </div>

                  {/* Right Image Preview Block */}
                  <div className="form-right-visual">
                    <label style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--text-dark)' }}>Product Photo Preview</label>
                    
                    <div className="img-preview-card" id="dropzone-card">
                      <img id="preview-img-display" className="preview-img-display" src={image} style={{ display: 'block' }} alt="Preview" />
                    </div>

                    <div>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px', textAlign: 'center' }}>Or Click Sample Product Presets:</div>
                      <div className="preset-thumbs-row">
                        <div className={`preset-thumb ${image.includes('1583391733956') ? 'active' : ''}`} onClick={() => setImage('https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80')}>
                          <img src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=300&q=80" alt="Kurti" />
                        </div>
                        <div className={`preset-thumb ${image.includes('1610030469983') ? 'active' : ''}`} onClick={() => setImage('https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80')}>
                          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80" alt="Saree" />
                        </div>
                        <div className={`preset-thumb ${image.includes('1524592094714') ? 'active' : ''}`} onClick={() => setImage('https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80')}>
                          <img src="https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=300&q=80" alt="Watch" />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="form-submit-row">
                  <button type="button" className="btn-cancel-form" onClick={() => alert('Form reset')}>Reset Form</button>
                  <button type="submit" className="btn-publish-catalog">Publish Catalog & Save to Database →</button>
                </div>
              </form>
            </div>
          </div>

          {/* ==================== TAB 2: MY CATALOGS DATABASE VIEW ==================== */}
          <div className={`tab-view ${activeTab === 'view-my-catalogs' ? 'active' : ''}`} id="view-my-catalogs">
            <div className="catalogs-table-card">
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontFamily: "'Poppins', sans-serif", fontSize: '20px', fontWeight: 700 }}>My Catalogs Database</h3>
                  <p style={{ fontSize: '13.5px', color: '#58596B' }}>Manage stored catalogs and toggle real-time Influencer Marketing enrollment.</p>
                </div>
                <button className="btn-hub-switch" onClick={() => setActiveTab('view-add-catalog')}>+ Add Another Catalog</button>
              </div>

              <table className="catalog-data-table">
                <thead>
                  <tr>
                    <th>Product Information</th>
                    <th>Category</th>
                    <th>Price & MRP</th>
                    <th>Stock Status</th>
                    <th>Influencer Marketing Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {catalogs.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#8B8BA3' }}>
                        No catalogs found in database. Click "Add New Catalog" above to upload your first product!
                      </td>
                    </tr>
                  ) : (
                    catalogs.map((cat, index) => (
                      <tr key={cat.id}>
                        <td>
                          <div className="prod-cell">
                            <img src={cat.image} alt={cat.title} className="prod-thumb-img" />
                            <div>
                              <div className="prod-title">{cat.title}</div>
                              <div className="prod-sku">SKU: {cat.id}</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="cat-badge">{cat.category}</span>
                        </td>
                        <td>
                          <div className="price-text">₹{cat.price}</div>
                          <div style={{ fontSize: '11.5px', textDecoration: 'line-through', color: '#8B8BA3' }}>MRP ₹{cat.mrp || cat.price * 2}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: '#1E1F2C' }}>{cat.stock} Units</div>
                          {cat.stock > 10 ? (
                            <div style={{ fontSize: '12px', color: '#1E8E3E', marginTop: '2px' }}>In Stock</div>
                          ) : (
                            <div style={{ fontSize: '12px', color: '#F59E0B', marginTop: '2px' }}>Low Stock</div>
                          )}
                        </td>
                        <td>
                          {cat.influencerEnrolled ? (
                            <div className="status-enrolled">
                              <span>✓ Enrolled in Marketing</span>
                              <div style={{ fontSize: '11px', marginTop: '4px' }}>Expected: {cat.roi}</div>
                            </div>
                          ) : (
                            <div className="status-not-enrolled">
                              <span>⚠️ Not Enrolled</span>
                            </div>
                          )}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button className="btn-action-outline" onClick={() => toggleMarketing(index)}>
                              {cat.influencerEnrolled ? 'Stop Marketing' : 'Boost Sales'}
                            </button>
                            <button className="btn-action-text" onClick={() => deleteCatalog(index)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
      </div>
  );
}
