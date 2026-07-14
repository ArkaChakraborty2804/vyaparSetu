/**
 * Meesho Supplier Prototype - Interactive Profit Calculator & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  setupProfitCalculator();
});

function setupProfitCalculator() {
  const priceInput = document.getElementById('calc-selling-price');
  const costInput = document.getElementById('calc-cost-price');

  const meeshoCommEl = document.getElementById('res-meesho-comm');
  const meeshoProfitEl = document.getElementById('res-meesho-profit');
  const otherProfitEl = document.getElementById('res-other-profit');
  const extraSavingsEl = document.getElementById('res-extra-savings');

  function calculate() {
    const sellingPrice = parseFloat(priceInput.value) || 0;
    const costPrice = parseFloat(costInput.value) || 0;

    // Meesho: 0% Commission
    const meeshoProfit = Math.max(0, sellingPrice - costPrice);

    // Other platforms: average 15% commission + payment fees (~20% deduction)
    const otherCommission = sellingPrice * 0.18;
    const otherProfit = Math.max(0, sellingPrice - costPrice - otherCommission);

    const extraSavings = Math.max(0, meeshoProfit - otherProfit);

    meeshoCommEl.textContent = '₹0 (0% Fee)';
    meeshoProfitEl.textContent = `₹${Math.round(meeshoProfit)}`;
    otherProfitEl.textContent = `₹${Math.round(otherProfit)}`;
    extraSavingsEl.textContent = `+₹${Math.round(extraSavings)}`;
  }

  if (priceInput && costInput) {
    priceInput.addEventListener('input', calculate);
    costInput.addEventListener('input', calculate);
    calculate();
  }
}
