const products = [
  { name: "Shirt", price: 500, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b", category: "Clothes" },
  { name: "Shoes", price: 1500, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff", category: "Clothes" },
  { name: "Watch", price: 2000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", category: "Accessories" },
  { name: "T-Shirt", price: 400, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab", category: "Clothes" },
  { name: "Jeans", price: 1200, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246", category: "Clothes" },
  { name: "Bag", price: 800, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3", category: "Accessories" },
  { name: "Cap", price: 300, image: "https://images.unsplash.com/photo-1521369909029-2afed882baee", category: "Accessories" },
  { name: "Sunglasses", price: 700, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083", category: "Accessories" }
];

// STORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

// FILTER STATE
let currentCategory = "All";
let currentSort = null;

// DOM
const productDiv = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// 🔐 LOGIN CHECK
function checkLogin() {
  const loggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!loggedIn) {
    window.location.href = "login.html";
  } else {
    document.getElementById("user-name").textContent = "👤 " + user.username;
  }
}

// 🔐 LOGOUT
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

// DISPLAY PRODUCTS
function displayProducts(list) {
  productDiv.innerHTML = "";

  list.forEach((product) => {
    const isWishlisted = wishlist.some(item => item.name === product.name);

    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <span class="wishlist" onclick='toggleWishlist(${JSON.stringify(product)})'>
        ${isWishlisted ? "❤️" : "🤍"}
      </span>

      <img src="${product.image}" onerror="this.src='https://via.placeholder.com/150'">
      <h3>${product.name}</h3>
      <div class="rating">⭐⭐⭐⭐☆</div>
      <p><b>₹${product.price}</b></p>
      <button>Add</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      addToCart(product);
    });

    productDiv.appendChild(div);
  });
}

// ❤️ WISHLIST
function toggleWishlist(product) {
  const index = wishlist.findIndex(item => item.name === product.name);

  if (index > -1) wishlist.splice(index, 1);
  else wishlist.push(product);

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  applyFilters();
}

// FILTERS
function applyFilters() {
  let filtered = [...products];

  const search = document.getElementById("search").value.toLowerCase();
  filtered = filtered.filter(p => p.name.toLowerCase().includes(search));

  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (currentSort === "low") filtered.sort((a, b) => a.price - b.price);
  else if (currentSort === "high") filtered.sort((a, b) => b.price - a.price);

  displayProducts(filtered);
}

// CATEGORY
function setCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll(".sidebar button")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");
  applyFilters();
}

// SORT
function setSort(type) {
  currentSort = type;
  applyFilters();
}

// CART
function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);

  if (existing) existing.quantity = (existing.quantity || 0) + 1;
  else cart.push({ ...product, quantity: 1 });

  saveCart();
  updateCart();
}

// UPDATE CART
function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const qty = item.quantity || 1;
    total += item.price * qty;

    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₹${item.price} x ${qty}
      <button onclick="increaseQty(${index})">➕</button>
      <button onclick="decreaseQty(${index})">➖</button>
    `;

    cartList.appendChild(li);
  });

  totalSpan.textContent = total;
  cartCount.textContent = cart.length;
}

// ➕ ➖
function increaseQty(index) {
  cart[index].quantity++;
  saveCart();
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) cart[index].quantity--;
  else cart.splice(index, 1);

  saveCart();
  updateCart();
}

// SAVE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// NAVIGATION
function goToCheckout() {
  window.location.href = "checkout.html";
}

function goToWishlist() {
  window.location.href = "wishlist.html";
}

// 🚀 START APP
checkLogin();
displayProducts(products);
updateCart();