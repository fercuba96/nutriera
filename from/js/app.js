import {loadHeaderFooter} from "./general.mjs";

loadHeaderFooter();

//const APP_ID = "eef4ee3e";
//const APP_KEY = "ad38f0479ab02300d2429eddee32310a"; 

const form = document.getElementById("mealForm");
const resultsDiv = document.getElementById("results");
const savedRecipesDiv = document.createElement("div");
savedRecipesDiv.id = "saved-recipes";
document.body.appendChild(savedRecipesDiv);

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  
  const query = document.getElementById("query").value;
  const diet = document.getElementById("diet").value;
  const health = document.getElementById("health").value;
  const calories = document.getElementById("calories").value;

  let apiUrl = `https://api.edamam.com/search?q=${query}&app_id=eef4ee3e&app_key=ad38f0479ab02300d2429eddee32310a`;
  if (diet) apiUrl += `&diet=${diet}`;
  if (health) apiUrl += `&health=${health}`;
  if (calories) apiUrl += `&calories=${calories}`;
  
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("Failed to fetch recipes");
    const data = await response.json();

    displayResults(data.hits);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    resultsDiv.innerHTML = `<p style="color:red;">Error fetching recipes. Please try again later.</p>`;
  }
});

function displayResults(meals) {
  resultsDiv.innerHTML = ""; 
  
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
      <button class="save-btn">Save Recipe</button>
    `;
    const saveButton = mealDiv.querySelector(".save-btn");
    saveButton.addEventListener("click", () => saveRecipe(meal.recipe));

    resultsDiv.appendChild(mealDiv);
  });
}

function saveRecipe(recipe) {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    const isAlreadySaved = savedRecipes.some((r) => r.url === recipe.url);
  
    if (isAlreadySaved) {
      alert("Recipe is already saved!");
      return;
    }
  
    savedRecipes.push({
      label: recipe.label,
      url: recipe.url,
      image: recipe.image,
      calories: Math.round(recipe.calories),
    });
  
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    alert("Recipe saved!");
    displaySavedRecipes();
  }
  
  function displaySavedRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipesDiv.innerHTML = "<h2>Saved Recipes</h2>";
  
    if (savedRecipes.length === 0) {
      savedRecipesDiv.innerHTML += "<p>No saved recipes.</p>";
      return;
    }
  
    savedRecipes.forEach((recipe, index) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("saved-recipe");
  
      recipeDiv.innerHTML = `
        <h3>${recipe.label}</h3>
        <img src="${recipe.image}" alt="${recipe.label}">
        <p><strong>Calories:</strong> ${recipe.calories}</p>
        <a href="${recipe.url}" target="_blank">View Recipe</a>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
    const deleteButton = recipeDiv.querySelector(".delete-btn");
    deleteButton.addEventListener("click", () => deleteRecipe(index));
      savedRecipesDiv.appendChild(recipeDiv);
    });
  }

  function deleteRecipe(index) {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes")) || [];
    savedRecipes.splice(index, 1); 
    localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes));
    displaySavedRecipes();
  }
  
  displaySavedRecipes();