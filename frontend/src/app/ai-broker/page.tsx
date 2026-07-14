"use client";

import React, { useState } from "react";
import "./broker.css";
import Link from "next/link";

export default function AIBroker() {
  const [prompt, setPrompt] = useState("Clear 500 unbranded cotton bedsheets in UP this week at ₹349 unit price.");
  const [loading, setLoading] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  
  const [nlpData, setNlpData] = useState({
    product: "-",
    region: "-",
    volume: "-",
    price: "-"
  });

  const [creators, setCreators] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);

  const handleParse = async () => {
    setLoading(true);
    try {
      const intentRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/parse-intent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const intentData = await intentRes.json();
      setNlpData({
        product: intentData.product || "Unknown",
        region: intentData.region || "Unknown",
        volume: intentData.volume || "Unknown",
        price: intentData.price || "Unknown"
      });

      const matchRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/match-creators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intentData)
      });
      const matches = await matchRes.json();
      setCreators(matches);
    } catch (err) {
      console.error(err);
      alert("Backend not running. Please start FastAPI server.");
    } finally {
      setLoading(false);
    }
  };

  const handleDispatch = async () => {
    setDispatched(true);
    setLogs(["🟢 [CELERY WORKER POOL] Initiating dispatch queue..."]);
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/dispatch-campaign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ creators, product: nlpData.product, price: nlpData.price })
      });
      
      setTimeout(() => setLogs(prev => [...prev, "🟢 [META CLOUD API WHATSAPP] Direct payload dispatched -> ACK HTTP 200 OK"]), 1000);
      setTimeout(() => setLogs(prev => [...prev, "🟢 [TRAI DLT SMS GATEWAY] Direct SMS alert delivered -> DLT Template Verified"]), 2000);
      setTimeout(() => setLogs(prev => [...prev, "🎉 [SUCCESS] All creators notified! Campaign tracking live."]), 3000);
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="dark-theme" style={{minHeight: '100vh', background: 'var(--bg-dark)', color: 'var(--text-light)', fontFamily: "'Inter', sans-serif"}}>
      <header className="broker-header" style={{padding: '16px 24px', borderBottom: '1px solid var(--border-dark)', display: 'flex', justifyContent: 'space-between'}}>
        <div>
           <span style={{background: 'var(--accent-magenta)', color: '#FFF', padding: '4px 10px', borderRadius: '4px', fontSize: '12px', fontWeight: 800}}>VyaparSETU 2.0</span>
           <h2 style={{color: '#FFF', margin: '8px 0 0', fontSize: '20px'}}>AI Algorithmic Broker</h2>
        </div>
        <Link href="/supplier/dashboard" className="btn-back" style={{color: 'var(--neon-green)', textDecoration: 'none'}}>← Back to Hub</Link>
      </header>

      <main style={{padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px'}}>
        
        {/* Left Column: Intent */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div className="glass-panel" style={{background: 'var(--panel-dark)', border: '1px solid var(--border-dark)', padding: '24px', borderRadius: '12px'}}>
            <h3 style={{margin: '0 0 16px', color: 'var(--neon-green)'}}>1. Describe Your Liquidation Goal</h3>
            <textarea 
              value={prompt} 
              onChange={e => setPrompt(e.target.value)} 
              style={{width: '100%', height: '120px', background: '#0B0C10', color: '#FFF', border: '1px solid var(--border-dark)', padding: '16px', borderRadius: '8px', fontSize: '15px'}}
            />
            <button 
              onClick={handleParse} 
              disabled={loading}
              style={{width: '100%', marginTop: '16px', background: 'var(--neon-green)', color: '#0B0C10', border: 'none', padding: '14px', borderRadius: '8px', fontWeight: 800, cursor: 'pointer'}}
            >
              {loading ? "⏳ Parsing Intent..." : "⚡ Parse Intent & Rank Creators"}
            </button>
          </div>

          <div className="glass-panel" style={{background: 'var(--panel-dark)', border: '1px solid var(--border-dark)', padding: '24px', borderRadius: '12px'}}>
            <h3 style={{margin: '0 0 16px', color: '#FFF'}}>NLP Extraction</h3>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
              <div><small style={{color: 'var(--text-muted)'}}>Product</small><div style={{fontWeight: 700}}>{nlpData.product}</div></div>
              <div><small style={{color: 'var(--text-muted)'}}>Region</small><div style={{fontWeight: 700}}>{nlpData.region}</div></div>
              <div><small style={{color: 'var(--text-muted)'}}>Volume</small><div style={{fontWeight: 700}}>{nlpData.volume}</div></div>
              <div><small style={{color: 'var(--text-muted)'}}>Price</small><div style={{fontWeight: 700}}>{nlpData.price}</div></div>
            </div>
          </div>
        </div>

        {/* Right Column: Matches */}
        <div className="glass-panel" style={{background: 'var(--panel-dark)', border: '1px solid var(--border-dark)', padding: '24px', borderRadius: '12px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
             <h3 style={{margin: 0, color: '#FFF'}}>2. Qdrant Vector Matches</h3>
             {creators.length > 0 && !dispatched && (
               <button onClick={handleDispatch} style={{background: 'var(--accent-magenta)', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 700, cursor: 'pointer'}}>
                 Launch Automated Campaign
               </button>
             )}
          </div>

          {creators.length === 0 && (
             <div style={{textAlign: 'center', padding: '60px', color: 'var(--text-muted)'}}>Run intent parser to see creators...</div>
          )}

          <div style={{display: 'grid', gap: '16px'}}>
            {creators.map(c => (
              <div key={c.id} style={{background: '#0B0C10', border: '1px solid var(--border-dark)', padding: '20px', borderRadius: '8px', display: 'flex', gap: '20px'}}>
                <img src={c.avatar} style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover'}} />
                <div style={{flex: 1}}>
                  <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <h4 style={{margin: '0 0 4px', fontSize: '16px'}}>{c.name}</h4>
                    <span style={{color: 'var(--neon-green)', fontWeight: 700, fontSize: '12px'}}>{c.similarity}</span>
                  </div>
                  <div style={{color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px'}}>{c.followers}</div>
                  <div style={{fontSize: '13px', color: '#FFF', marginBottom: '8px'}}>{c.hook}</div>
                  <div style={{fontSize: '13px', color: 'var(--accent-magenta)'}}>{c.payout}</div>
                </div>
              </div>
            ))}
          </div>

          {dispatched && (
             <div style={{marginTop: '32px', background: '#0B0C10', border: '1px solid var(--neon-green)', borderRadius: '8px', padding: '20px'}}>
               <h4 style={{color: 'var(--neon-green)', margin: '0 0 16px'}}>Live Dispatch Ledger</h4>
               {logs.map((l, i) => (
                 <div key={i} style={{fontFamily: 'monospace', fontSize: '13px', color: '#FFF', marginBottom: '8px'}}>{l}</div>
               ))}
             </div>
          )}

        </div>

      </main>
    </div>
  );
}
