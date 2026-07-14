"use client";

import React, { useState } from "react";
import "./auth.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export default function SupplierAuth() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile) return alert("Please enter mobile number");
    
    // Simulate JWT Session
    localStorage.setItem("meesho_supplier_jwt", "dummy_jwt_token");
    localStorage.setItem("meesho_supplier_user", JSON.stringify({ identifier: mobile, role: "SUPPLIER" }));
    
    router.push("/supplier/dashboard");
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const decoded: any = jwtDecode(credentialResponse.credential);
      console.log("Real Google OAuth Success:", decoded);
      
      // Store the real JWT and user data
      localStorage.setItem("meesho_supplier_jwt", credentialResponse.credential);
      localStorage.setItem("meesho_supplier_user", JSON.stringify({ 
        identifier: decoded.email, 
        name: decoded.name,
        picture: decoded.picture,
        role: "SUPPLIER" 
      }));
      
      router.push("/supplier/dashboard");
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
    alert("Google Login Failed. Please try again.");
  };

  return (
    <div className="auth-layout" style={{display: 'flex', minHeight: '100vh', background: '#F8F8FA'}}>
      <div className="auth-form-container" style={{margin: 'auto', background: '#FFF', padding: '40px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', width: '100%', maxWidth: '440px'}}>
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <Link href="/">
             <h2 style={{color: '#9F2089', margin: '0 0 8px 0'}}>meesho</h2>
          </Link>
          <h3 style={{fontSize: '24px', color: '#1E1F2C', marginBottom: '8px'}}>Supplier Hub Login</h3>
          <p style={{color: '#616173', fontSize: '14px'}}>Manage your catalog & AI Broker campaigns.</p>
        </div>

        <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            shape="rectangular"
            theme="outline"
            size="large"
            width="100%"
          />
        </div>

        <div style={{display: 'flex', alignItems: 'center', margin: '20px 0'}}>
          <div style={{flex: 1, height: '1px', background: '#EAEAF2'}}></div>
          <span style={{padding: '0 10px', color: '#616173', fontSize: '13px'}}>OR</span>
          <div style={{flex: 1, height: '1px', background: '#EAEAF2'}}></div>
        </div>

        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: '#353543'}}>Mobile Number</label>
            <input 
              type="text" 
              value={mobile} 
              onChange={e => setMobile(e.target.value)} 
              placeholder="Enter your 10 digit number" 
              style={{width: '100%', padding: '12px', border: '1px solid #EAEAF2', borderRadius: '8px'}} 
            />
          </div>
          <div>
            <label style={{display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: 700, color: '#353543'}}>Email (Optional)</label>
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="For Google Login simulation" 
              style={{width: '100%', padding: '12px', border: '1px solid #EAEAF2', borderRadius: '8px'}} 
            />
          </div>
          <button type="submit" style={{background: '#9F2089', color: '#FFF', padding: '14px', borderRadius: '8px', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: '10px'}}>
            Send OTP & Login
          </button>
        </form>
      </div>
    </div>
  );
}
