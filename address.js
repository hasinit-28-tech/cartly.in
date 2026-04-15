// SAVE ADDRESS
function saveAddress() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;

  if (!name || !phone || !address || !pincode) {
    alert("Please fill all fields ❌");
    return;
  }

  const newAddress = { name, phone, address, pincode };

  // GET EXISTING ADDRESSES
  let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  // ADD NEW ADDRESS
  addresses.push(newAddress);

  // SAVE BACK
  localStorage.setItem("addresses", JSON.stringify(addresses));

  alert("Address saved successfully ✅");

  clearForm();
  displayAddresses();
}

//////////////////////////////////////////////////////

// DISPLAY ALL ADDRESSES
function displayAddresses() {
  const addressList = document.getElementById("address-list");
  addressList.innerHTML = "";

  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  if (addresses.length === 0) {
    addressList.innerHTML = "<p>No addresses saved.</p>";
    return;
  }

  addresses.forEach((addr, index) => {
    addressList.innerHTML += `
      <div class="address-card">
        <p><b>${addr.name}</b></p>
        <p>${addr.phone}</p>
        <p>${addr.address}</p>
        <p>${addr.pincode}</p>

        <button onclick="selectAddress(${index})">Select</button>
        <button class="delete" onclick="deleteAddress(${index})">Delete</button>
      </div>
    `;
  });
}

//////////////////////////////////////////////////////

// ✅ SELECT ADDRESS (IMPORTANT FOR CHECKOUT)
function selectAddress(index) {
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  // THIS IS THE IMPORTANT LINE YOU ASKED
  localStorage.setItem("selectedAddress", JSON.stringify(addresses[index]));

  alert("Address selected for checkout ✅");
}

//////////////////////////////////////////////////////

// DELETE ADDRESS
function deleteAddress(index) {
  let addresses = JSON.parse(localStorage.getItem("addresses")) || [];

  addresses.splice(index, 1);

  localStorage.setItem("addresses", JSON.stringify(addresses));

  displayAddresses();
}

//////////////////////////////////////////////////////

// CLEAR FORM
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("phone").value = "";
  document.getElementById("address").value = "";
  document.getElementById("pincode").value = "";
}

//////////////////////////////////////////////////////

// LOAD ON PAGE START
window.onload = function () {
  displayAddresses();
};