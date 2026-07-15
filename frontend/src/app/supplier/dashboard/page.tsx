"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./dashboard.scss";

export default function SupplierDashboard() {
  useEffect(() => {
    // Interactive scripts can be wired here later
  }, []);

  return (
    <div className="scope-supplier-dashboard">


  {/* ==================== LEFT DARK SIDEBAR ==================== */}
  <aside className="dashboard-sidebar">
    {/* Store Dropdown Selector */}
    <div className="store-selector-bar">
      <div className="store-info">
        <div className="store-avatar" id="store-avatar-char">F</div>
        <span className="store-name" id="store-name-display">Frostilicious</span>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>

    {/* Quick Action Notices & Support */}
    <div className="quick-notices-bar">
      <a href="#" className="notice-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
        <span>Notices</span>
      </a>
      <a href="#" className="notice-item">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
        <span>Support</span>
      </a>
    </div>

    {/* Scrollable Sidebar Links */}
    <nav className="sidebar-nav-scroll">
      <a href="supplier-dashboard.html" className="nav-link active">
        <div className="nav-link-content">
          <span className="nav-icon">🏪</span>
          <span>Home</span>
        </div>
      </a>

      <div className="nav-section-title">Manage Business</div>

      <a href="supplier-catalog-upload.html" className="nav-link">
        <div className="nav-link-content">
          <span className="nav-icon">📁</span>
          <span>Catalog Uploads</span>
        </div>
      </a>

      <a href="#" className="nav-link" onClick={() => { alert('Image Bulk Upload feature: Select up to 100 product images to auto-extract attributes using AI!') }}>
        <div className="nav-link-content">
          <span className="nav-icon">🖼️</span>
          <span>Image Bulk Upload</span>
        </div>
      </a>

      <a href="#" className="nav-link" onClick={() => { alert('Payments Hub: 0% commission payouts directly to your registered bank account every 7 days.') }}>
        <div className="nav-link-content">
          <span className="nav-icon">💳</span>
          <span>Payments</span>
        </div>
      </a>

      <div className="nav-section-title">Boost Sales</div>

      <a href="supplier-influencer.html" className="nav-link">
        <div className="nav-link-content">
          <span className="nav-icon">🌟</span>
          <span>Influencer Marketing</span>
        </div>
      </a>
    </nav>

    {/* Sidebar Footer */}
    <div className="sidebar-footer" style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between', 'padding': '14px 18px'}}>
      <a href="index.html" style={{'textDecoration': 'none'}} title="Go to Meesho Main Shopping Home">
        <div className="sidebar-meesho-logo">meesho</div>
        <div className="sidebar-meesho-sub">Supplier Hub</div>
      </a>
      <button type="button" id="sidebar-logout-btn" className="sidebar-logout-btn" onClick={() => { console.log('handleSupplierLogout') }} style={{'background': 'rgba(239, 68, 68, 0.15)', 'color': '#F87171', 'border': '1px solid rgba(239, 68, 68, 0.3)', 'borderRadius': '6px', 'padding': '6px 10px', 'fontSize': '11.5px', 'fontWeight': '700', 'cursor': 'pointer', 'display': 'flex', 'alignItems': 'center', 'gap': '4px'}} title="Log out and erase session data">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        <span>Logout</span>
      </button>
    </div>
  </aside>

  {/* ==================== MAIN CONTENT AREA ==================== */}
  <main className="dashboard-main">
    
    {/* Top Return Header */}
    <header className="top-hub-header">
      <div className="hub-breadcrumb">
        <span>Supplier Hub / <strong>Dashboard Home</strong></span>
      </div>
      <div className="hub-actions">
        <a href="supplier.html" className="btn-hub-switch">← Supplier Front Page</a>
        <a href="index.html" className="btn-hub-switch">🛒 Shopping Front Page</a>
      </div>
    </header>

    {/* Dashboard Content Pad */}
    <div className="dashboard-content-pad">
      
      {/* Top Alert Banner: Bank Verification Pending */}
      <div className="alert-banner">
        <div className="alert-icon">🕒</div>
        <div>
          <div className="alert-title">Bank Verification Pending</div>
          <div className="alert-text">We will inform you once your account is verified, please continue to upload your catalogs.</div>
        </div>
      </div>

      {/* Welcome Header Card */}
      <div className="welcome-header-card">
        <div>
          <h1 id="hub-welcome-name">Welcome Frostilicious</h1>
          <p>Let's get your business started in 3 steps</p>
        </div>
        <button className="btn-need-help" onClick={() => { alert('Connecting to Meesho Seller Support...') }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
          <span>Need Help?</span>
        </button>
      </div>

      {/* Main Dashboard 2-Column Grid */}
      <div className="dashboard-grid">
        
        {/* LEFT CARD: STEPPER & CATALOG UPLOAD */}
        <section className="catalog-onboard-card">
          {/* Stepper Tabs */}
          <div className="onboard-stepper">
            <div className="stepper-tab active">
              <span className="stepper-num">1</span>
              <span>Upload catalogs to get started</span>
            </div>
            <div className="stepper-tab">
              <span className="stepper-num">2</span>
              <span>Catalogs go live on Meesho</span>
            </div>
            <div className="stepper-tab">
              <span className="stepper-num">3</span>
              <span>Get your first order</span>
            </div>
          </div>

          <h3 className="upload-section-title" id="stepper-dynamic-header">Choose how you would like to upload your catalog</h3>

          {/* Upload Options Grid */}
          <div className="upload-options-grid">
            
            {/* Option 1: Single Catalog */}
            <div className="upload-card-col">
              <div className="upload-col-header">Upload Single Catalog</div>
              
              <div className="upload-visual-preview">
                <div className="preview-model-avatar">👩🏽‍💼</div>
                <div className="preview-play-icon">▶</div>
                <div className="preview-badge-swatch">Sarees • Kurtis • Ethnic</div>
              </div>

              <div className="upload-bullet-list">
                <div className="upload-bullet">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Add one catalog at a time</span>
                </div>
                <div className="upload-bullet">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Excel sheet not required</span>
                </div>
              </div>

              <button className="btn-upload-primary" id="btn-add-single" type="button">Add Single Catalog</button>
            </div>

            {/* Option 2: Bulk Catalog */}
            <div className="upload-card-col">
              <div className="upload-col-header">Upload Bulk Catalog</div>
              
              <div className="upload-visual-preview">
                <div className="preview-model-avatar">👩🏽‍💼</div>
                <div className="preview-play-icon">▶</div>
                <div className="preview-badge-swatch" style={{'background': '#1D6F42', 'color': '#FFFFFF'}}>XLSX Sheet</div>
              </div>

              <div className="upload-bullet-list">
                <div className="upload-bullet">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Add multiple catalog at a time</span>
                </div>
                <div className="upload-bullet">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  <span>Requires excel sheet</span>
                </div>
              </div>

              <button className="btn-upload-outline" id="btn-add-bulk" type="button">Add Catalogs in Bulk</button>
            </div>

          </div>
        </section>

        {/* RIGHT STACKED CARDS */}
        <div className="right-col-stack">
          
          {/* Card 1: Complete your account setup */}
          <div className="account-setup-card">
            <h3 className="setup-card-title">Complete your account setup</h3>
            <p className="setup-card-sub">Add the below information to improve your selling journey</p>

            <div className="setup-action-row" onClick={() => { alert('Password configuration interface opened.') }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              <span>Set Password</span>
            </div>
          </div>

          {/* Card 2: Learn & Grow On Meesho */}
          <div className="learn-grow-card">
            <h3 className="setup-card-title" style={{'marginBottom': '12px'}}>Learn & Grow On Meesho</h3>

            <div className="learn-list">
              {/* Item 1 */}
              <div className="learn-row" onClick={() => { alert('Live Seller Training registration opened!') }}>
                <div className="learn-row-left">
                  <div className="learn-icon">🎧</div>
                  <div>
                    <div className="learn-text-head">
                      <span>Book free live training</span>
                      <span className="expert-pill">Expert Led</span>
                    </div>
                    <div className="learn-text-sub">Learn to operate and grow your business on meesho.</div>
                  </div>
                </div>
                <span className="chevron-right">&gt;</span>
              </div>

              {/* Item 2 */}
              <div className="learn-row" onClick={() => { alert('Catalog preparation tutorial loaded.') }}>
                <div className="learn-row-left">
                  <div className="learn-icon red">▶</div>
                  <div className="learn-text-head" style={{'marginTop': '6px'}}>Prepare catalogs for meesho</div>
                </div>
                <span className="chevron-right">&gt;</span>
              </div>

              {/* Item 3 */}
              <div className="learn-row" onClick={() => { alert('0% Commission & Pricing structure guide opened.') }}>
                <div className="learn-row-left">
                  <div className="learn-icon blue">%</div>
                  <div className="learn-text-head" style={{'marginTop': '6px'}}>Pricing & commission</div>
                </div>
                <span className="chevron-right">&gt;</span>
              </div>

              {/* Item 4 */}
              <div className="learn-row" onClick={() => { alert('Logistics, Free Doorstep Pickup & Returns FAQ opened.') }}>
                <div className="learn-row-left">
                  <div className="learn-icon">🚚</div>
                  <div className="learn-text-head" style={{'marginTop': '6px'}}>Delivery & Returns</div>
                </div>
                <span className="chevron-right">&gt;</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  </main>

  {/* ==================== INTERACTIVE SINGLE CATALOG UPLOAD MODAL ==================== */}
  <div className="catalog-modal-overlay" id="single-catalog-modal">
    <div className="catalog-modal">
      <div className="modal-head">
        <h3>Upload Single Product Catalog</h3>
        <button id="btn-close-catalog-modal" style={{'fontSize': '22px', 'color': '#888'}}>&times;</button>
      </div>

      <form id="single-catalog-form">
        <div className="modal-body">
          <div className="form-row">
            <label htmlFor="cat-prod-name">Product Title</label>
            <input type="text" id="cat-prod-name" placeholder="e.g. Designer Georgette Saree with Blouse" required value="Designer Floral Silk Kurti" />
          </div>

          <div className="form-row">
            <label htmlFor="cat-prod-price">Selling Price (₹)</label>
            <input type="number" id="cat-prod-price" placeholder="499" required value="599" min="50" />
          </div>

          <div className="form-row">
            <label htmlFor="cat-prod-cat">Category</label>
            <select id="cat-prod-cat">
              <option value="Women Ethnic">Women Ethnic</option>
              <option value="Women Western">Women Western</option>
              <option value="Men">Men Fashion</option>
              <option value="Home & Kitchen">Home & Kitchen</option>
              <option value="Electronics">Electronics</option>
            </select>
          </div>
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-cancel" id="btn-cancel-catalog-modal">Cancel</button>
          <button type="submit" className="btn-submit-catalog">Submit Catalog Live</button>
        </div>
      </form>
    </div>
  </div>

  

    </div>
  );
}
