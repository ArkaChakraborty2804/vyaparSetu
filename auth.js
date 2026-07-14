/**
 * Meesho Supplier Prototype - JWT Authentication Engine & Auth Panel Logic
 */

let currentAuthMode = 'signup';
let activeJwtData = null;

document.addEventListener('DOMContentLoaded', () => {
  // Check URL query parameters for ?mode=login or ?mode=signup
  const params = new URLSearchParams(window.location.search);
  const mode = params.get('mode');
  if (mode === 'login') {
    switchAuthTab('login');
  } else {
    switchAuthTab('signup');
  }

  setupAuthListeners();
});

function switchAuthTab(mode) {
  currentAuthMode = mode;
  const signupTab = document.getElementById('tab-signup');
  const loginTab = document.getElementById('tab-login');
  const gstField = document.getElementById('field-gstin');
  const confirmField = document.getElementById('field-confirm-pass');
  const submitBtn = document.getElementById('auth-submit-btn');
  const formTitle = document.getElementById('auth-title');
  const formSubtitle = document.getElementById('auth-subtitle');

  if (mode === 'login') {
    if (loginTab) loginTab.classList.add('active');
    if (signupTab) signupTab.classList.remove('active');
    if (gstField) gstField.style.display = 'none';
    if (confirmField) confirmField.style.display = 'none';
    if (formTitle) formTitle.textContent = 'Login to Supplier Panel';
    if (formSubtitle) formSubtitle.textContent = 'Enter your registered mobile number or email ID';
    if (submitBtn) submitBtn.textContent = 'Login with JWT Session';
  } else {
    if (signupTab) signupTab.classList.add('active');
    if (loginTab) loginTab.classList.remove('active');
    if (gstField) gstField.style.display = 'block';
    if (confirmField) confirmField.style.display = 'block';
    if (formTitle) formTitle.textContent = 'Create Supplier Account';
    if (formSubtitle) formSubtitle.textContent = 'Start selling to crores of customers at 0% commission';
    if (submitBtn) submitBtn.textContent = 'Generate JWT & Register';
  }
}

function setupAuthListeners() {
  document.getElementById('tab-signup')?.addEventListener('click', () => switchAuthTab('signup'));
  document.getElementById('tab-login')?.addEventListener('click', () => switchAuthTab('login'));

  document.getElementById('auth-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleJwtAuth();
  });

  document.getElementById('jwt-modal-close')?.addEventListener('click', closeJwtModal);
  document.getElementById('btn-copy-jwt')?.addEventListener('click', copyJwtToClipboard);
  document.getElementById('btn-dashboard-continue')?.addEventListener('click', finishLoginRedirect);
}

/* ============================ JWT GENERATOR & AUTH LOGIC ============================ */
function base64urlEncode(obj) {
  const jsonStr = JSON.stringify(obj);
  return btoa(unescape(encodeURIComponent(jsonStr)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function simulateHMACSHA256Signature(headerBase64, payloadBase64) {
  // Generates realistic deterministic base64url signature string
  const input = headerBase64 + '.' + payloadBase64;
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) - hash) + input.charCodeAt(i);
    hash |= 0;
  }
  const simulatedSigHex = Math.abs(hash).toString(16).padStart(8, '0') + 
    'f9e2d4a8b7c6103982736451a0b9c8d7e6f5' + Math.abs(hash * 31).toString(16);
  return btoa(simulatedSigHex).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function handleJwtAuth() {
  const identifier = document.getElementById('input-identifier')?.value || '9876543210';
  const gstin = document.getElementById('input-gstin')?.value || '29ABCDE1234F1Z5';
  const password = document.getElementById('input-password')?.value || '';

  if (!identifier.trim()) {
    alert('Please enter your mobile number or email ID');
    return;
  }

  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 86400; // 24 hours

  // 1. JWT Header
  const jwtHeader = {
    alg: 'HS256',
    typ: 'JWT'
  };

  // 2. JWT Payload (Captured Login Details)
  const jwtPayload = {
    sub: `SUP_${Math.floor(1000 + Math.random() * 9000)}`,
    identifier: identifier,
    auth_type: currentAuthMode.toUpperCase(),
    gstin: currentAuthMode === 'signup' ? gstin : 'VERIFIED_ON_FILE',
    role: 'MEESHO_VERIFIED_SUPPLIER',
    commission_tier: '0% COMMISSION',
    permissions: ['CATALOG_CREATE', 'ORDERS_MANAGE', 'PAYMENTS_VIEW'],
    iat: iat,
    exp: exp
  };

  const headerB64 = base64urlEncode(jwtHeader);
  const payloadB64 = base64urlEncode(jwtPayload);
  const sigB64 = simulateHMACSHA256Signature(headerB64, payloadB64);

  const fullJwtString = `${headerB64}.${payloadB64}.${sigB64}`;

  activeJwtData = {
    token: fullJwtString,
    header: jwtHeader,
    payload: jwtPayload,
    headerB64: headerB64,
    payloadB64: payloadB64,
    sigB64: sigB64
  };

  // Save to browser session
  localStorage.setItem('meesho_supplier_jwt', fullJwtString);
  localStorage.setItem('meesho_supplier_user', JSON.stringify(jwtPayload));

  displayJwtInspectorModal(activeJwtData);
}

function displayJwtInspectorModal(jwtData) {
  const modal = document.getElementById('jwt-inspector-modal');
  const tokenDisplay = document.getElementById('jwt-token-formatted');
  const payloadDisplay = document.getElementById('jwt-payload-json');

  if (!modal || !tokenDisplay || !payloadDisplay) return;

  tokenDisplay.innerHTML = `
    <span class="jwt-part-header">${jwtData.headerB64}</span>.<span class="jwt-part-payload">${jwtData.payloadB64}</span>.<span class="jwt-part-signature">${jwtData.sigB64}</span>
  `;

  payloadDisplay.textContent = JSON.stringify(jwtData.payload, null, 2);

  modal.classList.add('active');
}

function closeJwtModal() {
  document.getElementById('jwt-inspector-modal')?.classList.remove('active');
}

function copyJwtToClipboard() {
  if (!activeJwtData) return;
  navigator.clipboard.writeText(activeJwtData.token);
  const copyBtn = document.getElementById('btn-copy-jwt');
  if (copyBtn) {
    const origText = copyBtn.textContent;
    copyBtn.textContent = 'Copied!';
    setTimeout(() => copyBtn.textContent = origText, 2000);
  }
}

function finishLoginRedirect() {
  window.location.href = 'supplier-dashboard.html';
}
