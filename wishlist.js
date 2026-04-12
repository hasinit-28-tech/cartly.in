let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const list = document.getElementById("wishlist-items");

// DISPLAY WISHLIST WITH IMAGE
wishlist.forEach((item, index) => {
  const div = document.createElement("div");
  div.className = "product";

  div.innerHTML = `
    <img src="${item.image}" onerror="this.src='https://via.placeholder.com/150'">
    <h3>${item.name}</h3>
    <p><b>₹${item.price}</b></p>
    <button onclick="removeItem(${index})">❌ Remove</button>
  `;

  list.appendChild(div);
});

// REMOVE ITEM
function removeItem(index) {
  wishlist.splice(index, 1);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  location.reload();
}

// BACK
function goBack() {
  window.location.href = "index.html";
}