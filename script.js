const products = [
  {
    name: "Shirt",
    price: 500,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b",
    category: "Clothes"
  },
  {
    name: "Shoes",
    price: 1500,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Clothes"
  },
  {
    name: "Watch",
    price: 2000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30", // ✅ FIXED
    category: "Accessories"
  },
  {
    name: "T-Shirt",
    price: 400,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Clothes"
  },
  {
    name: "Jeans",
    price: 1200,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "Clothes"
  },
  {
    name: "Bag",
    price: 800,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3",
    category: "Accessories"
  },
  {
    name: "Cap",
    price: 300,
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee",
    category: "Accessories"
  },
  {
    name: "Sunglasses",
    price: 700,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Accessories"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

let currentCategory = "All";
let currentSort = null;

const productDiv = document.getElementById("products");
const cartList = document.getElementById("cart");
const totalSpan = document.getElementById("total");
const cartCount = document.getElementById("cart-count");

// DISPLAY PRODUCTS
function displayProducts(list) {
  productDiv.innerHTML = "";

  list.forEach((product) => {
    const div = document.createElement("div");
    div.className = "product";

    div.innerHTML = `
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

// FILTERS
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

// CART WITH QUANTITY
function addToCart(product) {
  const existing = cart.find(item => item.name === product.name);

  if (existing) {
    existing.quantity = (existing.quantity || 0) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

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
  cart[index].quantity += 1;
  saveCart();
  updateCart();
}

function decreaseQty(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }

  saveCart();
  updateCart();
}

// SAVE
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// CHECKOUT
function goToCheckout() {
  window.location.href = "checkout.html";
}

// START
displayProducts(products);
updateCart();