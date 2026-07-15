"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./broker.scss";

export default function AIBroker() {
  useEffect(() => {
    // Interactive scripts can be wired here later
  }, []);

  return (
    <div className="scope-ai-broker">


  {/* ==================== STICKY TOP MEESHO NAVBAR ==================== */}
  <header className="vyapar-navbar">
    <a href="supplier-influencer.html" className="vyapar-logo">
      <div className="vyapar-logo-badge">me</div>
      <div className="vyapar-logo-text">
        <h1>VyaparSETU 2.0</h1>
        <span>MEESHO AI BROKER AGENT</span>
      </div>
    </a>

    <nav className="vyapar-nav-tabs">
      <button className="nav-tab-btn active" data-tab="broker">🤖 AI Broker Dashboard</button>
      <button className="nav-tab-btn" data-tab="economics">📈 Unit Economics & ROI</button>
    </nav>

    <div className="vyapar-nav-actions">
      <div className="latency-badge" title="Simulated Sub-50ms Qdrant Vector ANN Search Latency">
        <span className="pulse-dot"></span>
        <span id="qdrant-latency">Qdrant ANN: 34ms</span>
      </div>
      <button type="button" id="btn-theme-toggle" className="btn-theme-toggle" title="Toggle Light / Dark Mode">
        <span id="theme-icon">🌙</span>
        <span id="theme-label">Dark</span>
      </button>
      <a href="supplier-influencer.html" id="btn-back-meesho" className="btn-back-hub">
        <span>← Back to Meesho</span>
      </a>
    </div>
  </header>

  {/* ==================== MAIN WORKSPACE ==================== */}
  <main className="vyapar-main">

    {/* TAB 1: AI BROKER DASHBOARD */}
    <div className="tab-view active" id="tab-broker">
      
      {/* Live Campaign Status Banner (Dynamically updated when launched) */}
      <div id="campaign-status-banner" className="status-banner-box" style={{'display': 'none'}}>
        <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between', 'flexWrap': 'wrap', 'gap': '16px'}}>
          <div style={{'display': 'flex', 'alignItems': 'center', 'gap': '14px'}}>
            <div style={{'width': '44px', 'height': '44px', 'borderRadius': '12px', 'background': '#038D63', 'color': '#FFF', 'fontSize': '22px', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center'}}>🎉</div>
            <div>
              <h2 style={{'fontSize': '18px', 'fontWeight': '800', 'color': '#038D63', 'margin': '0'}}>CAMPAIGN LIVE & ACTIVE</h2>
              <p style={{'fontSize': '13.5px', 'color': 'var(--text-dark)', 'margin': '2px 0 0'}}>Automated outreach dispatched! Click the WhatsApp, SMS, or Email buttons below to view live sent messages.</p>
            </div>
          </div>
          <div style={{'display': 'flex', 'gap': '12px', 'alignItems': 'center', 'flexWrap': 'wrap'}}>
            <button type="button" onClick={() => { console.log('openAllLiveDispatches') }} style={{'background': '#25D366', 'color': '#FFF', 'fontWeight': '800', 'fontSize': '12.5px', 'padding': '8px 16px', 'borderRadius': '8px', 'border': 'none', 'cursor': 'pointer', 'display': 'flex', 'alignItems': 'center', 'gap': '6px', 'boxShadow': '0 4px 12px rgba(37, 211, 102, 0.3)'}}>
              <span>💬 Open WhatsApp & ✉️ Gmail Now</span>
              <span>↗</span>
            </button>
            <span style={{'background': '#FFFFFF', 'border': '1px solid #038D63', 'color': '#038D63', 'fontWeight': '700', 'fontSize': '12px', 'padding': '6px 14px', 'borderRadius': '20px'}}>✓ Delivery Rate: 100%</span>
            <span style={{'background': '#038D63', 'color': '#FFFFFF', 'fontWeight': '700', 'fontSize': '12px', 'padding': '6px 14px', 'borderRadius': '20px'}}>⚡ Tracking Active</span>
          </div>
        </div>
      </div>

      {/* Real-Time Live Outreach & Influencer Response Stream */}
      <div id="realtime-outreach-center" className="realtime-outreach-box" style={{'display': 'none'}}>
        <div style={{'display': 'flex', 'alignItems': 'center', 'justifyContent': 'space-between', 'borderBottom': '1px solid var(--border-color)', 'paddingBottom': '14px', 'marginBottom': '18px'}}>
          <div style={{'display': 'flex', 'alignItems': 'center', 'gap': '10px'}}>
            <span style={{'width': '10px', 'height': '10px', 'borderRadius': '50%', 'background': '#038D63', 'boxShadow': '0 0 10px #038D63', 'display': 'inline-block'}}></span>
            <h3 style={{'fontSize': '16px', 'fontWeight': '800', 'color': 'var(--text-dark)', 'margin': '0'}}>🟢 LIVE REAL-TIME INFLUENCER MESSAGING FEED</h3>
          </div>
          <span style={{'fontSize': '12px', 'fontWeight': '700', 'color': 'var(--primary-purple)', 'background': '#EEECFA', 'padding': '4px 12px', 'borderRadius': '20px'}}>Real-Time Webhook Active</span>
        </div>

        <div id="realtime-message-feed" style={{'display': 'flex', 'flexDirection': 'column', 'gap': '14px', 'maxHeight': '380px', 'overflowY': 'auto', 'paddingRight': '8px'}}>
          {/* Real-time outgoing & incoming message bubbles stream here */}
        </div>
      </div>
      
      {/* Scenario Selector Banner */}
      <div className="scenario-selector-bar">
        <div>
          <h2 style={{'fontSize': '17px', 'fontWeight': '800', 'marginBottom': '4px', 'color': 'var(--text-dark)'}}>⚡ Select Live Inventory Liquidation Campaign</h2>
          <p style={{'fontSize': '13.5px', 'color': 'var(--text-muted)'}}>Switch between real-world Meesho supplier scenarios solved by VyaparSETU AI</p>
        </div>
        <div className="scenario-pills">
          <button className="scenario-pill active" data-scenario="up-bedsheets">1. UP East Bedsheet Liquidation (₹349)</button>
          <button className="scenario-pill" data-scenario="biar-sarees">2. Bihar Banarasi Saree Surplus (₹699)</button>
          <button className="scenario-pill" data-scenario="raj-kurtis">3. Rajasthan Printed Kurti Set (₹499)</button>
        </div>
      </div>

      {/* Conversational Intent Input & NLP Extractor Grid */}
      <div className="intent-parse-grid">
        {/* Left: Natural Language Goal Input */}
        <div className="intent-card">
          <div className="intent-card-header">
            <h3>💬 Natural Language Seller Intent (Gemini Pro NLP)</h3>
            <span style={{'fontSize': '11px', 'background': '#EEECFA', 'color': 'var(--primary-purple)', 'padding': '4px 10px', 'borderRadius': '12px', 'fontWeight': '800'}}>STAGE 1 & 2</span>
          </div>
          <textarea id="raw-intent-prompt" className="prompt-textarea" placeholder="Speak or type your liquidation goal..."></textarea>
          <div className="prompt-actions">
            <button className="nav-tab-btn" id="btn-voice-record" style={{'background': '#F3EEFB', 'color': 'var(--primary-purple)'}}>
              🎙️ Speak Goal (Hindi / Hinglish)
            </button>
            <button className="btn-run-intent" id="btn-run-intent">
              <span>⚡ Parse Intent & Rank Creators</span>
            </button>
          </div>
        </div>

        {/* Right: Extracted NLP Parameters */}
        <div className="intent-card">
          <div className="intent-card-header">
            <h3>🧠 Parsed Intent & Qdrant Vector Search</h3>
            <span style={{'fontSize': '11px', 'background': '#E8F7F0', 'color': '#038D63', 'padding': '4px 10px', 'borderRadius': '12px', 'fontWeight': '800'}}>ANN MATCHED</span>
          </div>
          <div className="nlp-tags-grid">
            <div className="nlp-field">
              <div className="nlp-label">Product SKU / Category</div>
              <div className="nlp-val" id="nlp-product">Jaipuri Double Cotton Bedsheets</div>
            </div>
            <div className="nlp-field">
              <div className="nlp-label">Target Region</div>
              <div className="nlp-val" id="nlp-region">Uttar Pradesh (Lucknow / Varanasi)</div>
            </div>
            <div className="nlp-field">
              <div className="nlp-label">Target Liquidation Volume</div>
              <div className="nlp-val" id="nlp-volume">500 Units</div>
            </div>
            <div className="nlp-field">
              <div className="nlp-label">Unit Price & Urgency</div>
              <div className="nlp-val" id="nlp-price">₹349 • HIGH URGENCY</div>
            </div>
          </div>
        </div>
      </div>

      {/* Human-in-the-Loop Vernacular Ad Review Card */}
      <div className="human-review-box">
        <div>
          <div style={{'display': 'flex', 'alignItems': 'center', 'gap': '10px', 'marginBottom': '6px'}}>
            <span style={{'background': 'var(--primary-purple)', 'color': '#FFFFFF', 'fontWeight': '800', 'fontSize': '11px', 'padding': '4px 12px', 'borderRadius': '20px'}}>STAGE 4 REQUIRED</span>
            <h2 style={{'fontSize': '18px', 'fontWeight': '800', 'color': 'var(--text-dark)', 'margin': '0'}}>🧑‍⚖️ Human-in-the-Loop Vernacular Ad Review</h2>
          </div>
          <p style={{'fontSize': '13.5px', 'color': 'var(--text-muted)', 'margin': '0'}}>
            AI generates localized copy in Avadhi, Bhojpuri & Hindi. As the Human-in-the-Loop, inspect and Approve or Veto creators before dispatching messages.
          </p>
        </div>
      </div>

      <div className="creators-grid" id="creators-container">
        {/* Creators rendered dynamically by JS */}
      </div>

      {/* Bottom Launch Campaign Action Bar */}
      <div className="bottom-launch-bar">
        <div className="launch-left">
          <h3>🚀 Stage 5: Launch Automated Multi-Channel Outreach</h3>
          <p>Dispatches deep links & localized scripts via WhatsApp Cloud API, TRAI DLT SMS, and Gmail Relay</p>
        </div>
        <button className="btn-launch-campaign" id="btn-launch-campaign">
          <span>⚡ Launch Automated Campaign Now</span>
          <span>→</span>
        </button>
      </div>
    </div>

    {/* TAB 2: UNIT ECONOMICS & ROI */}
    <div className="tab-view" id="tab-economics">
      <div className="intent-card" style={{'marginBottom': '24px'}}>
        <h2 style={{'fontSize': '22px', 'fontWeight': '800', 'marginBottom': '8px', 'color': 'var(--text-dark)'}}>📊 Unit Economics Impact: Shifting from Ad PPC to Performance Micro-Influencers</h2>
        <p style={{'color': 'var(--text-muted)', 'fontSize': '14px', 'marginBottom': '24px'}}>
          Traditional Pay-Per-Click ads drain seller budgets with low conversion. VyaparSETU AI Broker bridges the gap by enabling near-100% margin affiliate payouts.
        </p>

        <div style={{'display': 'grid', 'gridTemplateColumns': 'repeat(3, 1fr)', 'gap': '20px'}}>
          <div className="nlp-field" style={{'padding': '24px'}}>
            <div className="nlp-label" style={{'fontSize': '12.5px'}}>Traditional Buyer CAC (PPC)</div>
            <div style={{'fontSize': '28px', 'fontWeight': '800', 'color': '#D3184B', 'marginTop': '8px'}}>₹145 / Order</div>
            <div style={{'fontSize': '12.5px', 'color': 'var(--text-muted)', 'marginTop': '4px'}}>High upfront cost, zero guarantee</div>
          </div>

          <div className="nlp-field" style={{'padding': '24px'}}>
            <div className="nlp-label" style={{'fontSize': '12.5px'}}>VyaparSETU AI Broker CAC</div>
            <div style={{'fontSize': '28px', 'fontWeight': '800', 'color': '#038D63', 'marginTop': '8px'}}>₹18 / Order</div>
            <div style={{'fontSize': '12.5px', 'color': 'var(--text-muted)', 'marginTop': '4px'}}>87.5% reduction in acquisition cost</div>
          </div>

          <div className="nlp-field" style={{'padding': '24px'}}>
            <div className="nlp-label" style={{'fontSize': '12.5px'}}>Net Supplier ROI Boost</div>
            <div style={{'fontSize': '28px', 'fontWeight': '800', 'color': 'var(--primary-purple)', 'marginTop': '8px'}}>+420% ROI</div>
            <div style={{'fontSize': '12.5px', 'color': 'var(--text-muted)', 'marginTop': '4px'}}>Accelerating Meesho EBITDA profitability</div>
          </div>
        </div>
      </div>
    </div>

  </main>

  {/* ==================== LIVE GATEWAY TERMINAL DISPATCH MODAL ==================== */}
  <div className="dispatch-modal-overlay" id="dispatch-modal">
    <div className="dispatch-console-box">
      <div className="dispatch-console-head">
        <h3>⚡ VYAPARSETU GATEWAY LEDGER — LIVE DISPATCH</h3>
        <button id="btn-close-dispatch" style={{'background': 'transparent', 'border': 'none', 'color': '#fff', 'fontSize': '18px', 'cursor': 'pointer'}}>✕</button>
      </div>
      <div className="dispatch-console-body" id="dispatch-log-body">
        {/* Live step-by-step logs */}
      </div>
      <div className="dispatch-console-foot">
        <button className="nav-tab-btn active" id="btn-done-dispatch" style={{'background': '#4A1FB8', 'color': '#fff'}}>Done</button>
      </div>
    </div>
  </div>

  

    </div>
  );
}
