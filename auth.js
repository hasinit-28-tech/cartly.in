// 👁️ TOGGLE PASSWORD + ANIMATION
function togglePassword() {
  const pass = document.getElementById("password");
  const eye = document.getElementById("eye");

  if (pass.type === "password") {
    pass.type = "text";
    eye.textContent = "🙈"; // closed eye
  } else {
    pass.type = "password";
    eye.textContent = "👁️";
  }
}

// 🔍 EMOJI CHECK
function containsEmoji(str) {
  const regex = /[\p{Emoji}]/u;
  return regex.test(str);
}

// 📊 VALIDATION + STRENGTH BAR
function validatePassword() {
  const password = document.getElementById("password").value;
  const fill = document.getElementById("strength-fill");

  const lengthRule = document.getElementById("length-rule");
  const emojiRule = document.getElementById("emoji-rule");

  let strength = 0;

  if (password.length >= 6) {
    lengthRule.textContent = "✅ At least 6 characters";
    lengthRule.style.color = "green";
    strength++;
  } else {
    lengthRule.textContent = "❌ At least 6 characters";
    lengthRule.style.color = "red";
  }

  if (containsEmoji(password)) {
    emojiRule.textContent = "✅ Emoji included";
    emojiRule.style.color = "green";
    strength++;
  } else {
    emojiRule.textContent = "❌ Must include emoji 😄";
    emojiRule.style.color = "red";
  }

  // strength bar
  if (strength === 0) {
    fill.style.width = "30%";
    fill.style.background = "red";
  } else if (strength === 1) {
    fill.style.width = "60%";
    fill.style.background = "orange";
  } else {
    fill.style.width = "100%";
    fill.style.background = "green";
  }
}

// 📝 SIGNUP
function signup() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm-password").value;

  if (!username || !password || !confirm) {
    alert("Fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  if (password.length < 6 || !containsEmoji(password)) {
    alert("Password not strong enough");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Signup successful 🎉");
}

// 🔐 LOGIN
function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    alert("No account found");
    return;
  }

  if (user.username === username && user.password === password) {
    localStorage.setItem("loggedIn", true);
    window.location.href = "index.html";
  } else {
    alert("Invalid credentials");
  }
}

// 🌙 DARK MODE
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}