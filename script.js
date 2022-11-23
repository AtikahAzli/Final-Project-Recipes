let output = document.getElementById("output");
let btnSrch = document.getElementById("search-btn");
let btnRan = document.getElementById("random");
let urlAPI = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
let ranAPI = "https://www.themealdb.com/api/json/v1/1/random.php";

let meal="" ; let count=0; let ingredients=""; let ingre=""; let measure="";
let ingredientCon = ""; let parent=""; let child=""; let recipe=""; let hideRecipe=""; let showRecipe="";

btnRan.addEventListener("click", () => {
  fetch(ranAPI)
    .then((response) => response.json())
    .then((data) => {
      meal = data.meals[0];
      count = 1;
      let ingredients = [];
      for (let i in meal) {
        ingre = "";
        measure = "";
        if (i.startsWith("strIngredient") && meal[i]) {
          ingre = meal[i];
          measure = meal[`strMeasure` + count];
          count += 1;
          ingredients.push(`${measure} ${ingre}`);
        }
      }

      output.innerHTML = `
  <img src=${meal.strMealThumb}>
  <div class="details">
      <h2>${meal.strMeal}</h2>
      <h4>${meal.strArea}</h4>
  </div>
  <div id="ingredient-con"></div>
  <div id="recipe">
      <button id="hide-recipe">X</button>
      <pre id="instructions">${meal.strInstructions}</pre>
  </div>
  <button id="show-recipe">View Recipe</button>
  `;
      ingredientCon = document.getElementById("ingredient-con");
      parent = document.createElement("ul");
      recipe = document.getElementById("recipe");
      hideRecipe = document.getElementById("hide-recipe");
      showRecipe = document.getElementById("show-recipe");

      ingredients.forEach((i) => {
        child = document.createElement("li");
        child.innerText = i;
        parent.appendChild(child);
        ingredientCon.appendChild(parent);
      });

      hideRecipe.addEventListener("click", () => {
        recipe.style.display = "none";
      });
      showRecipe.addEventListener("click", () => {
        recipe.style.display = "block";
      });
    })
    .catch(() => {
      output.innerHTML = `<h3>No match found</h3>`;
    });
});

btnSrch.addEventListener("click", () => {
  let userInput = document.getElementById("user-inp").value;
  if (userInput.length == 0) {
    output.innerHTML = `<h3>Please input any meal</h3>`;
  } else {
    fetch(urlAPI + userInput)
      .then((response) => response.json())
      .then((data) => {
        meal = data.meals[0];
        count = 1;
        ingredients = [];
        for (let j in meal) {
          ingre = "";
          measure = "";
          if (j.startsWith("strIngredient") && meal[j]) {
            ingre = meal[j];
            measure = meal[`strMeasure` + count];
            count += 1;
            ingredients.push(`${measure} ${ingre}`);
          }
        }

        output.innerHTML = `
    <img src=${meal.strMealThumb}>
    <div class="details">
        <h2>${meal.strMeal}</h2>
        <h4>${meal.strArea}</h4>
    </div>
    <div id="ingredient-con"></div>
    <div id="recipe">
        <button id="hide-recipe">X</button>
        <pre id="instructions">${meal.strInstructions}</pre>
    </div>
    <button id="show-recipe">View Recipe</button>
    `;
        ingredientCon = document.getElementById("ingredient-con");
        parent = document.createElement("ul");
        recipe = document.getElementById("recipe");
        hideRecipe = document.getElementById("hide-recipe");
        showRecipe = document.getElementById("show-recipe");

        ingredients.forEach((j) => {
          child = document.createElement("li");
          child.innerText = j;
          parent.appendChild(child);
          ingredientCon.appendChild(parent);
        });

        hideRecipe.addEventListener("click", () => {
          recipe.style.display = "none";
        });
        showRecipe.addEventListener("click", () => {
          recipe.style.display = "block";
        });
      })
      .catch(() => {
        output.innerHTML = `<h3>No match found</h3>`;
      });
  }
});
