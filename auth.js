// SIGNUP
function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  if (!username || !password) {
    alert("Fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  // ✅ STORE AS OBJECT (IMPORTANT FIX)
  const userData = {
    username: username,
    password: password,
    photo: "https://via.placeholder.com/40"
  };

  localStorage.setItem("user", JSON.stringify(userData));

  alert("Signup successful! Now login.");
}

// LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (
    storedUser &&
    username === storedUser.username &&
    password === storedUser.password
  ) {
    localStorage.setItem("loggedIn", "true");

    // ✅ REDIRECT
    window.location.href = "index.html";
  } else {
    alert("Invalid login");
  }
}

// GOOGLE LOGIN (FAKE)
function googleLogin() {
  const userData = {
    username: "Google User",
    password: "",
    photo: "https://via.placeholder.com/40"
  };

  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("loggedIn", "true");

  window.location.href = "index.html";
}

// SHOW PASSWORD
function togglePassword() {
  const pass = document.getElementById("password");
  pass.type = pass.type === "password" ? "text" : "password";
}