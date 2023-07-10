// import icons from '../img/icons.svg' - parcel 1
import icons from "url:../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const renderSpinner = function (parentElement) {
  const markup = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `;
  parentElement.insertAdjacentHTML("afterbegin", markup);
};

const showRecipie = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return; // this is a guard clause
    // loading data
    const apiKey = "fe6c0263-055e-4cb7-a199-cd527b7f80ad";
    renderSpinner(recipeContainer);

    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${apiKey}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.mesaage} (${response.status})`);

    let recipie = data.data.recipe;
    recipie = {
      id: recipie.id,
      title: recipie.title,
      publisher: recipie.publisher,
      sourceUrl: recipie.source_url,
      image: recipie.image_url,
      servings: recipie.servings,
      cookingTime: recipie.cooking_time,
      ingredients: recipie.ingredients,
    };
    console.log(recipie);

    // render data
    const markup = `
      <figure class="recipe__fig">
          <img src="${recipie.image}" alt="${
      recipie.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipie.title}</span>
          </h1>
        </figure>

    <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipie.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipie.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipie.ingredients
            .map((ing) => {
              return `
             <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="${icons}#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                ${ing.description}
              </div>
            </li>
            `;
            })
            .join("")}

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipie.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipie.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
        `;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", markup);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener("hashchange", showRecipie);
// window.addEventListener("load", showRecipie);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, showRecipie)
);
