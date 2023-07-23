import * as model from "./model.js";
import recipieView from "./views/recipieView.js";
import resultsView from "./views/resultsView.js";
import searchView from "./views/searchView.js";
import paginateView from "./views/paginateView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipies = async function (id) {
  try {
    recipieView.renderSpinner();

    if (!id) return; // this is a guard clause

    // Results view to mark selected mark search results
    resultsView.update(model.getSearchResultsPage());

    // loading data
    await model.loadRecipe(id); //async funciton - returns a promise that we have to handle

    // render data
    recipieView.render(model.state.recipie);
  } catch (err) {
    console.log(err);
    recipieView.renderError();
  }
};

const searchResultsControl = async function () {
  try {
    // get search query
    const querry = searchView.getQuery();
    // console.log(querry);
    resultsView.renderSpinner();
    if (!querry) return;

    // load search results
    await model.loadSearchResults(querry);

    // Render Results
    // console.log(model.state.searchData.results);
    // resultsView.render(model.state.searchData.results);
    resultsView.render(model.getSearchResultsPage());

    // render the next and previous buttons
    paginateView.render(model.state.searchData);
  } catch (err) {}
};

const paginateControl = function (pagedata_num) {
  // console.log(pagedata_num);
  // render new resullts
  resultsView.render(model.getSearchResultsPage(pagedata_num));

  // render the next and previous buttons
  paginateView.render(model.state.searchData);
};

const servingControl = function (newServing) {
  // recipe update - servings :
  model.updateServings(newServing);

  // update the recipie view
  // recipieView.render(model.state.recipie);
  recipieView.update(model.state.recipie);
};

// cadd new bookmark
const bookmarkControl = function () {
  if (!model.state.recipie.bookmarked) {
    model.add_Bookmark(model.state.recipie);
  } else model.bookmark_Delete(model.state.recipie.id);

  // console.log(model.state.recipie);
  recipieView.update(model.state.recipie);
};

//  Publisher subscriber pattern to handle event listiners
// first initialize the function below which will call the function from recipeView
const init = function () {
  recipieView.addHandlerRender(controlRecipies);
  recipieView.addHandlerServingUpdate(servingControl);
  recipieView.addHandler_addBookmark(bookmarkControl);
  searchView.addHandlerSearch(searchResultsControl);
  paginateView.addClickHandler(paginateControl);
};
init();
