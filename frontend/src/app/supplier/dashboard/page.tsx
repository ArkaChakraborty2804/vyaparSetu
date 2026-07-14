"use client";

import React, { useEffect, useState } from "react";
import "./dashboard.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SupplierDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const jwt = localStorage.getItem("meesho_supplier_jwt");
    if (!jwt) {
      router.push("/supplier/auth");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("meesho_supplier_user") || "{}");
    setUser(userData);
  }, [router]);

  if (!user) return <div style={{padding: '40px', textAlign: 'center'}}>Loading secure dashboard...</div>;

  return (
    <div className="dashboard-layout" style={{background: '#F8F8FA', minHeight: '100vh'}}>
      <header className="dash-header" style={{background: '#FFF', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #EAEAF2'}}>
        <h2 style={{color: '#9F2089', margin: 0}}>meesho <span style={{fontSize: '14px', color: '#616173'}}>Dashboard</span></h2>
        <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
          <span style={{fontSize: '14px', fontWeight: 700}}>{user.identifier}</span>
          <button 
            onClick={() => { localStorage.removeItem("meesho_supplier_jwt"); router.push("/supplier/auth"); }}
            style={{background: '#FEE2E2', color: '#DC2626', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer'}}
          >
            Logout
          </button>
        </div>
      </header>

      <main style={{padding: '40px 32px', maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{background: 'linear-gradient(135deg, #9F2089, #4A1FB8)', padding: '40px', borderRadius: '16px', color: '#FFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px'}}>
          <div>
            <h1 style={{margin: '0 0 12px 0', fontSize: '32px'}}>Liquidate Inventory Fast with VyaparSetu AI</h1>
            <p style={{margin: 0, fontSize: '16px', opacity: 0.9}}>Access the brand new AI Algorithmic Broker to match your products with regional influencers automatically.</p>
          </div>
          <Link href="/ai-broker" style={{background: '#FFF', color: '#9F2089', padding: '16px 32px', borderRadius: '8px', fontWeight: 800, textDecoration: 'none', fontSize: '16px'}}>
            Open AI Broker Terminal →
          </Link>
        </div>

        <h3 style={{fontSize: '20px', marginBottom: '20px'}}>Your Active Catalogs</h3>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px'}}>
          <div style={{background: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAF2'}}>
            <h4 style={{margin: '0 0 8px 0'}}>UP East Bedsheet Liquidation</h4>
            <p style={{margin: '0 0 16px 0', color: '#616173', fontSize: '14px'}}>500 Units at ₹349 • 2 Active Campaigns</p>
            <div style={{background: '#E8F7F0', color: '#038D63', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', display: 'inline-block', fontWeight: 700}}>ACTIVE</div>
          </div>
          <div style={{background: '#FFF', padding: '24px', borderRadius: '12px', border: '1px solid #EAEAF2'}}>
            <h4 style={{margin: '0 0 8px 0'}}>Bihar Banarasi Saree Surplus</h4>
            <p style={{margin: '0 0 16px 0', color: '#616173', fontSize: '14px'}}>300 Units at ₹699 • Setup Pending</p>
            <div style={{background: '#FFF5F7', color: '#D3184B', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', display: 'inline-block', fontWeight: 700}}>REQUIRES ATTENTION</div>
          </div>
        </div>
      </main>
    </div>
  );
}
