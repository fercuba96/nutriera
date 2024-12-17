import {loadHeaderFooter} from "./general.mjs";

loadHeaderFooter();

//const APP_ID = "eef4ee3e"; // Replace with your Edamam Application ID
//const APP_KEY = "ad38f0479ab02300d2429eddee32310a"; // Replace with your Edamam API Key

const form = document.getElementById("mealForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  // Get user inputs
  const query = document.getElementById("query").value;
  const diet = document.getElementById("diet").value;
  const health = document.getElementById("health").value;
  const calories = document.getElementById("calories").value;

  // Build the API URL
  let apiUrl = `https://api.edamam.com/search?q=${query}&app_id=eef4ee3e&app_key=ad38f0479ab02300d2429eddee32310a`;
  if (diet) apiUrl += `&diet=${diet}`;
  if (health) apiUrl += `&health=${health}`;
  if (calories) apiUrl += `&calories=${calories}`;
  
  try {
    // Fetch data from Edamam API
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    const data = await response.json();
    console.log("API URL:", apiUrl); // Log the URL to verify it's correct

    // Render results
    displayResults(data.hits);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    resultsDiv.innerHTML = `<p style="color:red;">Error fetching recipes. Please try again later.</p>`;
  }
});

function displayResults(meals) {
  resultsDiv.innerHTML = ""; // Clear previous results
  
  if (meals.length === 0) {
    resultsDiv.innerHTML = `<p>No recipes found. Try different filters.</p>`;
    return;
  }
  
  meals.forEach((meal) => {
    const mealDiv = document.createElement("div");
    mealDiv.classList.add("meal");

    mealDiv.innerHTML = `
      <h2>${meal.recipe.label}</h2>
      <img src="${meal.recipe.image}" alt="${meal.recipe.label}">
      <p><strong>Calories:</strong> ${Math.round(meal.recipe.calories)}</p>
      <p><strong>Diet Labels:</strong> ${meal.recipe.dietLabels.join(", ") || "None"}</p>
      <a href="${meal.recipe.url}" target="_blank">View Recipe</a>
    `;

    resultsDiv.appendChild(mealDiv);
  });
}