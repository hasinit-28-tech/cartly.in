// ==========================
// 🛒 ADD TO CART
// ==========================

function addToCart(name, price, image) {

  let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

  let existing =
  cart.find(item => item.name === name);

  if (existing) {

    existing.qty =
    (existing.qty || 1) + 1;

  } else {

    cart.push({

      name: name,
      price: price,
      image: image,
      qty: 1

    });

  }

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  alert(name + " added to cart 🛍️");

}

// ==========================
// ❤️ WISHLIST
// ==========================

function addToWishlist(name, price, image) {

  let wishlist =
  JSON.parse(localStorage.getItem("wishlist"))
  || [];

  wishlist.push({

    name: name,
    price: price,
    image: image

  });

  localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
  );

  alert(name + " added to wishlist ❤️");

}

// ==========================
// 🌙 DARK MODE
// ==========================

function toggleDarkMode() {

  document.body.classList.toggle("dark");

  localStorage.setItem(

    "theme",

    document.body.classList.contains("dark")
    ? "dark"
    : "light"

  );

}

// ==========================
// ⚡ APPLY SAVED SETTINGS
// ==========================

window.onload = function () {

  // APPLY THEME

  if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

  }

  // UPDATE CART

  updateCartCount();

  // SHOW USERNAME

  showUsername();

};

// ==========================
// 👤 SHOW USERNAME
// ==========================

function showUsername(){

  const username =
  localStorage.getItem("username");

  const userEl =
  document.getElementById("usernameDisplay");

  if(userEl && username){

    userEl.innerText =
    "Welcome, " + username + " ✨";

  }

}

// ==========================
// 🛒 CART COUNT
// ==========================

function updateCartCount() {

  let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

  let count =
  cart.reduce(

    (sum, item) =>
    sum + (item.qty || 1),

    0

  );

  let el =
  document.getElementById("cartCount");

  if (el){

    el.innerText = count;

  }

}

// ==========================
// ❌ REMOVE FROM CART
// ==========================

function removeFromCart(index){

  let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

  cart.splice(index, 1);

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  location.reload();

}

// ==========================
// 💰 CALCULATE TOTAL
// ==========================

function calculateTotal(){

  let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

  let total = 0;

  cart.forEach(item => {

    total +=
    item.price * (item.qty || 1);

  });

  return total;

}

// ==========================
// ⚡ BUY NOW
// ==========================

function buyNow(name, price, image) {

  localStorage.setItem(

    "buyNowItem",

    JSON.stringify({

      name:name,
      price:price,
      image:image

    })

  );

  window.location.href =
  "checkout.html";

}

// ==========================
// 🔍 SEARCH PRODUCTS
// ==========================

function searchProducts() {

  let input =

  document.getElementById(
    "searchInput"
  ).value.toLowerCase();

  let cards =
  document.querySelectorAll(".card");

  cards.forEach(card => {

    let title =

    card.querySelector("h3")
    .innerText
    .toLowerCase();

    card.style.display =

    title.includes(input)
    ? "block"
    : "none";

  });

}

// ==========================
// 🗂 FILTER CATEGORY
// ==========================

function filterCategory(cat) {

  let cards =
  document.querySelectorAll(".card");

  cards.forEach(card => {

    card.style.display =

      cat === "all" ||

      card.getAttribute(
        "data-category"
      ) === cat

      ? "block"
      : "none";

  });

}

// ==========================
// 💸 SORT PRODUCTS
// ==========================

function sortProducts(type) {

  let container =
  document.querySelector(".products");

  if(!container) return;

  let cards =
  Array.from(container.children);

  cards.sort((a, b) => {

    let A = parseInt(

      a.querySelector(".price")
      .innerText
      .replace("₹","")

    );

    let B = parseInt(

      b.querySelector(".price")
      .innerText
      .replace("₹","")

    );

    return type === "low"

    ? A - B

    : B - A;

  });

  container.innerHTML = "";

  cards.forEach(card => {

    container.appendChild(card);

  });

}

// ==========================
// ✨ OPEN AURAWEAR
// ==========================

function openAuraWear(){

  window.location.href =
  "index.html";

}

// ==========================
// 🛍️ CONTINUE SHOPPING
// ==========================

function continueShopping(){

  window.location.href =
  "home.html";

}
/* =====================================================
   CARTLY.IN - DARK MODE
===================================================== */


/* -----------------------------------------------
   Toggle Dark Mode
------------------------------------------------ */

function toggleDarkMode() {

    document.body.classList.toggle("dark-mode");

    const isDark =
        document.body.classList.contains("dark-mode");


    /* Save user's preference */

    localStorage.setItem(
        "cartlyDarkMode",
        isDark ? "enabled" : "disabled"
    );


    /* Change button icon */

    updateThemeIcon();
}


/* -----------------------------------------------
   Update Moon / Sun Icon
------------------------------------------------ */

function updateThemeIcon() {

    const button =
        document.getElementById("themeToggle");

    if (!button) return;


    const isDark =
        document.body.classList.contains("dark-mode");


    if (isDark) {

        button.innerHTML = "☀️";

        button.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

    } else {

        button.innerHTML = "🌙";

        button.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );
    }
}


/* -----------------------------------------------
   Load Saved Theme
------------------------------------------------ */

function loadDarkMode() {

    const savedTheme =
        localStorage.getItem("cartlyDarkMode");


    if (savedTheme === "enabled") {

        document.body.classList.add("dark-mode");

    }


    updateThemeIcon();
}


/* -----------------------------------------------
   Run When Page Loads
------------------------------------------------ */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDarkMode();

    }
);