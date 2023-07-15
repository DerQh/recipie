import * as model from "./model.js";
import recipieView from "./views/recipieView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipies = async function () {
  try {
    // const id = window.location.hash.slice(1);

    // if (!id) return; // this is a guard clause
    recipieView.renderSpinner();

    // loading data
    await model.loadRecipe(); //async funciton - returns a promise that we have to handle

    // render data
    recipieView.render(model.state.recipie);
  } catch (err) {
    console.log(err);
  }
};

// window.addEventListener("hashchange", controlRecipies);
// window.addEventListener("load", controlRecipies);

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipies)
);
