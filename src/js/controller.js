import * as model from "./model.js";
import recipieView from "./views/recipieView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipies = async function (id) {
  try {
    // const id = window.location.hash.slice(1);


    if (!id) return; // this is a guard clause
    // recipieView.renderSpinner();

    // loading data
    await model.loadRecipe(); //async funciton - returns a promise that we have to handle

    // render data
    recipieView.render(model.state.recipie);
  } catch (err) {
    console.log(err);
    recipieView.renderError();
  }
};

//  Publisher subscriber pattern to handle event listiners
// first initialize the function below which will call the function from recipeView
const init = function () {
  recipieView.addHandlerRender(controlRecipies);
};

init();
