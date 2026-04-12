<<<<<<< HEAD
const products = [
  { name: "Shirt", price: 500, image: "images/shirt.webp", category: "Clothes" },
  { name: "Shoes", price: 1500, image: "images/shoes.jpg", category: "Clothes" },
  { name: "Watch", price: 2000, image: "images/watch.jpg", category: "Accessories" },
  { name: "T-Shirt", price: 400, image: "images/tshirt.jpg", category: "Clothes" },
  { name: "Jeans", price: 1200, image: "images/jeans.jpg", category: "Clothes" },
  { name: "Bag", price: 800, image: "images/bag.jpg", category: "Accessories" },
  { name: "Cap", price: 300, image: "images/cap.jpg", category: "Accessories" },
  { name: "Sunglasses", price: 700, image: "images/sunglasses.jpg", category: "Accessories" }
];

// Load saved cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

let currentCategory = "All";
let currentSort = null;

const productDiv = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// Display products
function displayProducts(list) {
  productDiv.innerHTML = "";

  list.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${index})">Add</button>
    `;

    productDiv.appendChild(div);
  });
}

// Filters
function applyFilters() {
  let filtered = [...products];

  const search = document.getElementById("search").value.toLowerCase();
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (currentSort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// Category
function setCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll(".sidebar button")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");

  applyFilters();
}

// Sort
function setSort(type) {
  currentSort = type;
  applyFilters();
}

// Cart
function addToCart(index) {
  cart.push(products[index]);
  total += products[index].price;
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));
}

function updateCart() {
  cartList.innerHTML = "";

  cart.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeItem(${i})">❌</button>
    `;

    cartList.appendChild(li);
  });

  totalSpan.textContent = total;
  cartCount.textContent = cart.length;
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// ✅ GO TO CHECKOUT
function goToCheckout() {
  window.location.href = "checkout.html";
}

// Load
displayProducts(products);
=======
const products = [
  { name: "Shirt", price: 500, image: "images/shirt.webp", category: "Clothes" },
  { name: "Shoes", price: 1500, image: "images/shoes.jpg", category: "Clothes" },
  { name: "Watch", price: 2000, image: "images/watch.jpg", category: "Accessories" },
  { name: "T-Shirt", price: 400, image: "images/tshirt.jpg", category: "Clothes" },
  { name: "Jeans", price: 1200, image: "images/jeans.jpg", category: "Clothes" },
  { name: "Bag", price: 800, image: "images/bag.jpg", category: "Accessories" },
  { name: "Cap", price: 300, image: "images/cap.jpg", category: "Accessories" },
  { name: "Sunglasses", price: 700, image: "images/sunglasses.jpg", category: "Accessories" }
];

// Load saved cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

let currentCategory = "All";
let currentSort = null;

const productDiv = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// Display products
function displayProducts(list) {
  productDiv.innerHTML = "";

  list.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
      <img src="${product.image}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button onclick="addToCart(${index})">Add</button>
    `;

    productDiv.appendChild(div);
  });
}

// Filters
function applyFilters() {
  let filtered = [...products];

  const search = document.getElementById("search").value.toLowerCase();
  filtered = filtered.filter(p =>
    p.name.toLowerCase().includes(search)
  );

  if (currentCategory !== "All") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  if (currentSort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

// Category
function setCategory(category, button) {
  currentCategory = category;

  document.querySelectorAll(".sidebar button")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");

  applyFilters();
}

// Sort
function setSort(type) {
  currentSort = type;
  applyFilters();
}

// Cart
function addToCart(index) {
  cart.push(products[index]);
  total += products[index].price;
  saveCart();
  updateCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("total", JSON.stringify(total));
}

function updateCart() {
  cartList.innerHTML = "";

  cart.forEach((item, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeItem(${i})">❌</button>
    `;

    cartList.appendChild(li);
  });

  totalSpan.textContent = total;
  cartCount.textContent = cart.length;
}

function removeItem(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  saveCart();
  updateCart();
}

// ✅ GO TO CHECKOUT
function goToCheckout() {
  window.location.href = "checkout.html";
}

// Load
displayProducts(products);
>>>>>>> 6bc390ea62c2d58cbaedcf6da43f387efca4ae90
updateCart();