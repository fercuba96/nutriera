
const bcrypt = require("bcryptjs");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method not allowed" }),
    };
  }

  const { username, password } = JSON.parse(event.body);

  if (!username || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Missing username or password" }),
    };
  }

  try {
    const storedPasswordHash = "example_hashed_password_from_db"; 

    const isPasswordValid = await bcrypt.compare(password, storedPasswordHash);

    if (!isPasswordValid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid username or password" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error }),
    };
  }
};

/*
const registerForm = document.getElementById("register");
const loginForm = document.getElementById("login");
const welcomeSection = document.getElementById("welcome");
const showRegisterFormLink = document.getElementById("showRegisterForm");
const showLoginFormLink = document.getElementById("showLoginForm");
const userDisplay = document.getElementById("user");
const logoutButton = document.getElementById("logout");

showRegisterFormLink.addEventListener("click", () => {
  document.getElementById("registerForm").classList.remove("hidden");
  document.getElementById("loginForm").classList.add("hidden");
  welcomeSection.classList.add("hidden");
});

showLoginFormLink.addEventListener("click", () => {
  document.getElementById("loginForm").classList.remove("hidden");
  document.getElementById("registerForm").classList.add("hidden");
  welcomeSection.classList.add("hidden");
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  if (localStorage.getItem(username)) {
    alert("User already exists. Please choose a different username.");
  } else {
    localStorage.setItem(username, password);
    alert("Registration successful! Please log in.");
    registerForm.reset();
    showLoginFormLink.click();
  }
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  const storedPassword = localStorage.getItem(username);

  if (storedPassword && storedPassword === password) {
    userDisplay.textContent = username;
    loginForm.reset();
    document.getElementById("loginForm").classList.add("hidden");
    welcomeSection.classList.remove("hidden");
  } else {
    alert("Invalid username or password. Please try again.");
  }
});

logoutButton.addEventListener("click", () => {
  userDisplay.textContent = "";
  welcomeSection.classList.add("hidden");
  showLoginFormLink.click();
});*/