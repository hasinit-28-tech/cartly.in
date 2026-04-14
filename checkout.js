let cart = JSON.parse(localStorage.getItem("cart")) || [];

const list = document.getElementById("checkout-items");
const totalSpan = document.getElementById("checkout-total");

// 🧠 AUTO LOAD SAVED ADDRESS
window.onload = function () {
  const saved = JSON.parse(localStorage.getItem("address"));

  if (saved) {
    document.getElementById("name").value = saved.name;
    document.getElementById("phone").value = saved.phone;
    document.getElementById("address").value = saved.address;
    document.getElementById("city").value = saved.city;
    document.getElementById("pincode").value = saved.pincode;

    // auto check checkbox
    document.getElementById("save-address").checked = true;
  }
};

// 🛒 SHOW ITEMS
let total = 0;

cart.forEach(item => {
  const li = document.createElement("li");

  const qty = item.quantity || 1;
  total += item.price * qty;

  li.textContent = `${item.name} - ₹${item.price} x ${qty}`;
  list.appendChild(li);
});

totalSpan.textContent = total;

// 💳 SHOW PAYMENT UI
function showPayment() {
  const method = document.querySelector('input[name="payment"]:checked').value;

  document.getElementById("upi-section").style.display =
    method === "upi" ? "block" : "none";

  document.getElementById("card-section").style.display =
    method === "card" ? "block" : "none";
}

// 📦 PLACE ORDER
function placeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const city = document.getElementById("city").value;
  const pincode = document.getElementById("pincode").value;

  if (!name || !phone || !address || !city || !pincode) {
    alert("Fill address ❌");
    return;
  }

  // 💾 SAVE ONLY IF CHECKED
  const save = document.getElementById("save-address").checked;

  if (save) {
    localStorage.setItem("address", JSON.stringify({
      name, phone, address, city, pincode
    }));
  }

  // PAYMENT
  const method = document.querySelector('input[name="payment"]:checked');

  if (!method) {
    alert("Select payment ❌");
    return;
  }

  const value = method.value;

  if (value === "upi") {
    const upi = document.getElementById("upi-id").value;
    if (!upi) {
      alert("Enter UPI ❌");
      return;
    }
  }

  if (value === "card") {
    const card = document.getElementById("card-number").value;
    if (!card) {
      alert("Enter card ❌");
      return;
    }
  }

  alert("🎉 Order placed successfully!");

  localStorage.removeItem("cart");

  window.location.href = "index.html";
}