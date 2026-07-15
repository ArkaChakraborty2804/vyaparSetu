"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import "./influencer.css";

export default function SupplierInfluencerMarketing() {
  const router = useRouter();

  useEffect(() => {
    // Basic auth check
    const jwt = localStorage.getItem("meesho_supplier_jwt") || sessionStorage.getItem("session_jwt");
    const user = localStorage.getItem("meesho_supplier_user");
    if (!jwt && !user) {
      router.push("/supplier/auth?mode=login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("meesho_supplier_jwt");
    sessionStorage.removeItem("session_jwt");
    localStorage.removeItem("meesho_supplier_user");
    router.push("/supplier/auth?mode=login");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#F8F8F9' }}>
      {/* ==================== LEFT DARK SIDEBAR ==================== */}
      <aside className="dashboard-sidebar">
        {/* Store Dropdown Selector */}
        <div className="store-selector-bar">
          <div className="store-info">
            <div className="store-avatar" id="store-avatar-char">F</div>
            <span className="store-name" id="store-name-display">Frostilicious</span>
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

          <Link href="/supplier/catalog-upload" className="nav-link">
            <div className="nav-link-content">
              <span className="nav-icon">📁</span>
              <span>Catalog Uploads</span>
            </div>
          </Link>

          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); alert('Image Bulk Upload feature: Select up to 100 product images to auto-extract attributes using AI!'); }}>
            <div className="nav-link-content">
              <span className="nav-icon">🖼️</span>
              <span>Image Bulk Upload</span>
            </div>
          </a>

          <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); alert('Payments Hub: 0% commission payouts directly to your registered bank account every 7 days.'); }}>
            <div className="nav-link-content">
              <span className="nav-icon">💳</span>
              <span>Payments</span>
            </div>
          </a>

          <div className="nav-section-title">Boost Sales</div>

          <Link href="/supplier/influencer" className="nav-link active">
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
      <main className="dashboard-main" style={{ flex: 1, paddingBottom: '60px' }}>
        
        {/* Top Hub Header */}
        <header className="top-hub-header">
          <div className="hub-breadcrumb">
            <span>Supplier Hub / Boost Sales / <strong>Influencer Marketing</strong></span>
          </div>
          <div className="hub-actions">
            <Link href="/supplier/dashboard" className="btn-hub-switch">← Back to Dashboard</Link>
            <Link href="/" className="btn-hub-switch">🛒 Shopping Front Page</Link>
          </div>
        </header>

        {/* Influencer Content Area */}
        <div className="influencer-content-pad">
          
          {/* Page Title Header Strip */}
          <div className="influencer-page-header">
            <h1>Influencer Marketing</h1>

            <div className="header-right-actions">
              <div className="btn-how-it-works" onClick={() => alert('Opening video walkthrough: How Meesho Influencer Marketing works!')}>
                <span className="yt-play-icon">▶</span>
                <span>How it Works?</span>
              </div>
              <button className="btn-select-catalogs-top" onClick={() => router.push('/supplier/catalog-upload')} type="button">Select Catalogs</button>
            </div>
          </div>

          {/* NEW: AI ROBOT AUTOMATION BANNER & BUTTON */}
          <div className="ai-robot-automate-strip">
            <div className="ai-strip-left">
              <div className="robot-avatar-badge">
                <div className="robot-pulse-ring"></div>
                <span>🤖</span>
              </div>
              <div className="ai-strip-text">
                <h2>
                  <span>VyaparSetu AI Auto-Pilot</span>
                  <span className="ai-status-pill">BOT 2.0 READY</span>
                </h2>
                <p>Let autonomous AI match your catalogs with high-converting Instagram & Meesho App creators 24/7.</p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
              {/* Small Helper Buttons / Icons Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button type="button" onClick={() => alert('AI Agent scans 50K creators based on aesthetics, price, and past performance.')} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FFF', color: '#3B169E', border: '1.5px solid #D6D0F2', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '14px' }}>💡</span>
                  <span>How it Works (AI Agent)</span>
                </button>

                <a href="#" onClick={(e) => { e.preventDefault(); alert("Demo video playing"); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#FF0000', color: '#FFFFFF', textDecoration: 'none', padding: '6px 14px', borderRadius: '8px', fontWeight: 700, fontSize: '12px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FFFFFF', color: '#FF0000', width: '16px', height: '12px', borderRadius: '3px', fontSize: '8px', fontWeight: 900 }}>▶</span>
                  <span>Demo Video</span>
                </a>
              </div>

              {/* Large Prominent Hero Automate Button */}
              <Link href="/ai-broker" target="_blank" className="btn-robot-automate" style={{ textDecoration: 'none', padding: '18px 36px', fontSize: '17px', borderRadius: '16px' }}>
                <span className="robot-btn-icon" style={{ fontSize: '26px' }}>🤖</span>
                <span>Automate Your Influencer Market ✨</span>
              </Link>
            </div>
          </div>

          {/* 3. Hero Composition Banner */}
          <section className="influencer-hero-banner">
            
            {/* Left Text Content */}
            <div className="hero-left-col">
              <h2>Grow Orders with Influencer Promotion! <span className="chart-emoji">📈</span></h2>

              <div className="bullet-rows">
                <div className="bullet-row">
                  <span className="check-circle-green">✓</span>
                  <span><strong>50K+ influencers</strong> can make videos on your products</span>
                </div>

                <div className="bullet-row">
                  <span className="check-circle-green">✓</span>
                  <span>Videos are posted on <span className="meesho-pink-hl">Meesho App</span> + <strong>Social Media</strong> = <strong>More Visibility, More Sales</strong></span>
                </div>
              </div>

              <button className="btn-select-catalogs-main" onClick={() => router.push('/supplier/catalog-upload')} type="button">Select Catalogs</button>
            </div>

            {/* Right Smartphone Reel Mockup */}
            <div className="hero-visual-col">
              {/* Floating Pills around phone */}
              <div className="floating-pill pill-top-right">Your Product</div>
              <div className="floating-pill pill-bottom-left">Your Product</div>
              <div className="floating-participate">
                <span>Participate</span>
                <span style={{ fontSize: '16px' }}>👆</span>
              </div>

              {/* Social Icons */}
              <div className="floating-icon-insta">📸</div>
              <div className="floating-icon-yt">▶</div>
              <div className="floating-icon-meesho">
                <span style={{ background: '#9F2089', color: 'white', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>m</span>
                <span>meesho</span>
              </div>

              {/* Phone Mockup */}
              <div className="phone-mockup-frame">
                <div className="phone-screen">
                  <div className="reel-user-head">
                    <div className="reel-avatar">L</div>
                    <span>lishapatel._</span>
                  </div>

                  <div className="reel-center-model">💃🏽</div>

                  <div className="reel-product-overlay">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="reel-prod-thumb">👗</div>
                      <div>
                        <div className="reel-prod-text">Designer Floral Kurti</div>
                        <div className="reel-prod-price">₹499 • Free COD</div>
                      </div>
                    </div>
                    <span style={{ color: '#9F2089', fontWeight: 800, fontSize: '12px' }}>View →</span>
                  </div>
                </div>
              </div>
            </div>

          </section>

          {/* 4. Yellow Guarantee Strip */}
          <div className="yellow-guarantee-strip">
            <span className="thumbs-up-icon">👍</span>
            <span><strong>The Best Part = Opt out anytime</strong> from the program, in just one click</span>
          </div>

          {/* 5. Feature Benefits Cards Grid + Floating Callback Pill */}
          <section className="influencer-footer-section">
            
            {/* Floating Request Callback Button */}
            <button className="floating-callback-btn" onClick={() => alert('Meesho Creator Account Manager callback requested for your store!')}>
              <span>📞 Request Callback</span>
            </button>

            <div className="feature-cards-grid">
              
              {/* Card 1 */}
              <div className="inf-feature-card">
                <div className="inf-card-icon">📦</div>
                <div>
                  <div className="inf-card-title">No charges on Returned / Cancelled Orders</div>
                  <div className="inf-card-text">You only pay influencer promotion commission on successfully delivered orders.</div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="inf-feature-card">
                <div className="inf-card-icon">🎯</div>
                <div>
                  <div className="inf-card-title">You are always in control</div>
                  <div className="inf-card-text">Select only the catalogs you want to promote. Track exactly how many creators shared them.</div>
                </div>
              </div>

            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
