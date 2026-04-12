let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

const list = document.getElementById("checkout-items");
const totalSpan = document.getElementById("checkout-total");

// Show items
cart.forEach(item => {
  const li = document.createElement("li");
  li.textContent = `${item.name} - ₹${item.price}`;
  list.appendChild(li);
});

totalSpan.textContent = total;

// 🔄 Switch payment UI
function showPayment() {
  const method = document.querySelector('input[name="payment"]:checked').value;

  document.getElementById("upi-section").style.display =
    method === "upi" ? "block" : "none";

  document.getElementById("card-section").style.display =
    method === "card" ? "block" : "none";
}

// 💳 Place order
function placeOrder() {
  alert("🎉 Payment Successful! Order Placed.");

  localStorage.removeItem("cart");
  localStorage.removeItem("total");

  window.location.href = "index.html";
}