// ==========================
// 🛒 ADD TO CART
// ==========================
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({
    name: name,
    price: price,
    image: image
  });

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(name + " added to cart 🛍");
}


// ==========================
// ❤️ ADD TO WISHLIST
// ==========================
function addToWishlist(name, price, image) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

  wishlist.push({
    name: name,
    price: price,
    image: image
  });

  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  alert(name + " added to wishlist ❤️");
}


// ==========================
// 🌙 DARK MODE
// ==========================
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}


// ==========================
// 🎯 APPLY SAVED THEME
// ==========================
window.onload = function () {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
};


// ==========================
// 🗂️ CATEGORY FILTER
// ==========================
function filterCategory(category) {
  let products = document.querySelectorAll(".card");

  products.forEach(function(card) {
    if (
      category === "all" ||
      card.getAttribute("data-category") === category
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}