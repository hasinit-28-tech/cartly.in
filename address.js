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

  fetch("http://localhost:5000/api/address/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newAddress)
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      clearForm();
      displayAddresses();
    })
    .catch(err => console.log(err));
}

//////////////////////////////////////////////////////

// DISPLAY ADDRESSES
function displayAddresses() {
  const addressList = document.getElementById("address-list");
  addressList.innerHTML = "";

  fetch("http://localhost:5000/api/address")
    .then(res => res.json())
    .then(addresses => {
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
            <button onclick="deleteAddress('${addr._id}')" class="delete">Delete</button>
          </div>
        `;
      });

      window.currentAddresses = addresses;
    })
    .catch(err => console.log(err));
}

//////////////////////////////////////////////////////

// SELECT ADDRESS
function selectAddress(index) {
  const selected = window.currentAddresses[index];

  localStorage.setItem("selectedAddress", JSON.stringify(selected));

  alert("Address selected for checkout ✅");
}

//////////////////////////////////////////////////////

// DELETE ADDRESS
function deleteAddress(id) {
  if (!confirm("Are you sure you want to delete this address?")) return;

  fetch(`http://localhost:5000/api/address/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message);
      displayAddresses();
    })
    .catch(err => console.log(err));
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

// LOAD ON START
window.onload = function () {
  displayAddresses();
};