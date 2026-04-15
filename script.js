// ==========================
// 🛒 ADD TO CART
// ==========================
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.name === name);

  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ name, price, image, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(name + " added to cart 🛍");
  updateCartCount();
}

// ==========================
// ❤️ WISHLIST
// ==========================
function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist.push({ name, price, image });
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

// ==========================
// 🌙 DARK MODE
// ==========================
function toggleDarkMode() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

// ==========================
// APPLY THEME + CART COUNT
// ==========================
window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
  updateCartCount();
};

// ==========================
// 🛒 CART COUNT
// ==========================
function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  let el = document.getElementById("cartCount");
  if (el) el.innerText = count;
}

// ==========================
// 🔍 SEARCH
// ==========================
function searchProducts() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let title = card.querySelector("h3").innerText.toLowerCase();
    card.style.display = title.includes(input) ? "block" : "none";
  });
}

// ==========================
// 🗂 CATEGORY FILTER
// ==========================
function filterCategory(cat) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display =
      cat === "all" || card.getAttribute("data-category") === cat
        ? "block"
        : "none";
  });
}

// ==========================
// 💰 SORT
// ==========================
function sortProducts(type) {
  let container = document.querySelector(".products");
  let cards = Array.from(container.children);

  cards.sort((a, b) => {
    let A = parseInt(a.querySelector("p").innerText.replace("₹",""));
    let B = parseInt(b.querySelector("p").innerText.replace("₹",""));
    return type === "low" ? A - B : B - A;
  });

  container.innerHTML = "";
  cards.forEach(c => container.appendChild(c));
}

// ==========================
// ⚡ BUY NOW
// ==========================
function buyNow(name, price, image) {
  localStorage.setItem("buyNowItem", JSON.stringify({ name, price, image }));
  window.location.href = "checkout.html";
}
