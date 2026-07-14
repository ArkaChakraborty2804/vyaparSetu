"use client";

import React from "react";
import "./supplier.css";
import Link from "next/link";

export default function SupplierMarketingHub() {
  return (
    <div className="marketing-hub">
      <header className="main-header" style={{borderBottom: '1px solid #EAEAF2', background: '#FFF'}}>
        <div className="header-container" style={{display: 'flex', justifyContent: 'space-between', padding: '16px 24px'}}>
          <Link href="/" style={{textDecoration: 'none'}}>
            <h2 style={{color: '#9F2089', margin: 0, fontWeight: 800}}>meesho <span style={{fontSize: '14px', color: '#616173', fontWeight: 500}}>Supplier Hub</span></h2>
          </Link>
          <div style={{display: 'flex', gap: '12px'}}>
            <Link href="/supplier/auth?mode=login" className="btn-outline" style={{padding: '10px 20px', borderRadius: '8px', border: '1px solid #9F2089', color: '#9F2089', textDecoration: 'none', fontWeight: 700}}>Login</Link>
            <Link href="/supplier/auth?mode=signup" className="btn-primary" style={{padding: '10px 20px', borderRadius: '8px', background: '#9F2089', color: '#FFF', textDecoration: 'none', fontWeight: 700}}>Start Selling</Link>
          </div>
        </div>
      </header>

      <section className="hero-section" style={{textAlign: 'center', padding: '80px 20px', background: '#FDEEFA'}}>
        <span style={{background: '#9F2089', color: '#FFF', padding: '4px 12px', borderRadius: '16px', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', marginBottom: '20px', display: 'inline-block'}}>NEW: VyaparSetu 2.0</span>
        <h1 style={{fontSize: '48px', color: '#1E1F2C', marginBottom: '20px'}}>10x Your Sales with our AI Broker</h1>
        <p style={{fontSize: '20px', color: '#616173', maxWidth: '600px', margin: '0 auto 40px'}}>
          Upload your catalog and let our intelligent AI instantly match your products with the best regional creators across WhatsApp and SMS.
        </p>
        <Link href="/supplier/auth?mode=signup" style={{background: '#9F2089', color: '#FFF', padding: '16px 32px', borderRadius: '8px', fontSize: '18px', fontWeight: 700, textDecoration: 'none', display: 'inline-block'}}>
          Create Free Supplier Account
        </Link>
      </section>
    </div>
  );
}
