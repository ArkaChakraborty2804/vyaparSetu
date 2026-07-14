/**
 * Meesho Supplier Hub Panel - Interactive Dashboard Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  window.name = 'meesho_supplier_hub_main';
  loadJwtSessionProfile();
  setupStepperTabs();
  setupCatalogModal();
  setupSidebarNavigation();
});

function loadJwtSessionProfile() {
  const userJson = localStorage.getItem('meesho_supplier_user');
  let supplierName = 'Frostilicious'; // Default store name from user's screenshot

  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      if (user.identifier) {
        // Create a display name if identifier was entered
        const cleanId = user.identifier.split('@')[0];
        supplierName = cleanId.charAt(0).toUpperCase() + cleanId.slice(1);
      }
    } catch (err) {
      console.warn('Error reading session user:', err);
    }
  }

  const nameEl = document.getElementById('hub-welcome-name');
  const storeSelectorEl = document.getElementById('store-name-display');
  const storeAvatarEl = document.getElementById('store-avatar-char');

  if (nameEl) nameEl.textContent = `Welcome ${supplierName}`;
  if (storeSelectorEl) storeSelectorEl.textContent = supplierName;
  if (storeAvatarEl) storeAvatarEl.textContent = supplierName.charAt(0).toUpperCase();
}

function setupStepperTabs() {
  const tabs = document.querySelectorAll('.stepper-tab');
  const stepContentBox = document.getElementById('stepper-dynamic-header');

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (stepContentBox) {
        if (index === 0) {
          stepContentBox.textContent = 'Choose how you would like to upload your catalog';
        } else if (index === 1) {
          stepContentBox.textContent = 'Catalog Quality Check & Live Verification Status';
        } else {
          stepContentBox.textContent = 'Manage Inventory & Track Your First Orders';
        }
      }
    });
  });
}

function setupCatalogModal() {
  const modal = document.getElementById('single-catalog-modal');
  const btnSingle = document.getElementById('btn-add-single');
  const btnBulk = document.getElementById('btn-add-bulk');
  const btnClose = document.getElementById('btn-close-catalog-modal');
  const btnCancel = document.getElementById('btn-cancel-catalog-modal');
  const form = document.getElementById('single-catalog-form');

  if (btnSingle) {
    btnSingle.addEventListener('click', () => {
      window.location.href = 'supplier-catalog-upload.html';
    });
  }

  if (btnBulk) {
    btnBulk.addEventListener('click', () => {
      window.location.href = 'supplier-catalog-upload.html';
    });
  }

  const closeModal = () => modal?.classList.remove('active');

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const prodName = document.getElementById('cat-prod-name')?.value || 'New Product';
      const prodPrice = document.getElementById('cat-prod-price')?.value || '499';

      alert(`Catalog successfully uploaded for "${prodName}" at ₹${prodPrice}! It will go live after standard 0% Commission QC.`);
      closeModal();
      form.reset();
    });
  }
}

function setupSidebarNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && href.endsWith('.html')) {
        // Allow standard navigation to supplier-influencer.html or other HTML pages
        return;
      }
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });
}
