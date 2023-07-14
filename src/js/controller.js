import * as model from "./model.js";
import recipieView from "./views/recipieView.js";

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

const controlRecipies = async function () {
  try {
    // const id = window.location.hash.slice(1);
    const id = "5ed6604591c37cdc054bc886";
    console.log(id);

    if (!id) return; // this is a guard clause
    recipieView.renderSpinner();

    // loading data
    await model.loadRecipe(id); //async funciton - returns a promise that we have to handle

    // render data
    recipieView.render(model.state.recipie);
  } catch (err) {
    alert(err);
  }
};

// window.addEventListener("hashchange", controlRecipies);
// window.addEventListener("load", controlRecipies);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipies)
);
