import { API_URL, pageResult } from "./config";
import { getJSON, get_JSON } from "./helpers";

export const state = {
  recipie: {},
  searchData: {
    query: "",
    results: [],
    pageResults: pageResult,
    page: 1,
  },
  bookmarks: [],
};

export const loadRecipe = async function (id) {
  try {
    let recipie = await getJSON(API_URL);
    recipie = recipie.data.recipe;

    state.recipie = {
      id: recipie.id,
      title: recipie.title,
      publisher: recipie.publisher,
      sourceUrl: recipie.source_url,
      image: recipie.image_url,
      servings: recipie.servings,
      cookingTime: recipie.cooking_time,
      ingredients: recipie.ingredients,
    };

    if (state.bookmarks.some((bookmrk) => bookmrk.id === id)) {
      state.recipie.bookmarked = true;
    } else state.recipie.bookmarked = false;
    // console.log(state.recipie);
  } catch (err) {
    // temporary error handling
    console.log(`${err}`);
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.searchData.query = query;
    let data = await get_JSON(state.searchData.query);
    data = data.data.recipes;

    state.searchData.results = data.map((recipie) => {
      return {
        id: recipie.id,
        title: recipie.title,
        publisher: recipie.publisher,
        image: recipie.image_url,
      };
    });
    state.searchData.page = 1;

    // console.log(state.searchData.results);
  } catch (err) {
    console.error(`${err} !!!! `);
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.searchData.page) {
  state.searchData.page = page;
  const start = (page - 1) * state.searchData.pageResults;
  const end = page * state.searchData.pageResults;
  // console.log(start, end);
  return state.searchData.results.slice(start, end);
};

export const updateServings = function (newServing) {
  state.recipie.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServing) / state.recipie.servings;
    // newQuantity = oldQuantity * newServings/ old servings
  });
  state.recipie.servings = newServing;
};

export const add_Bookmark = function (recipe) {
  // Add recipie to bookmark
  state.bookmarks.push(recipe);

  // highlight recipe as bookmarked
  if (recipe.id === state.recipie.id) state.recipie.bookmarked = true;
};

export const bookmark_Delete = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);

  // unbookmark
  if (id === state.recipie.id) state.recipie.bookmarked = false;
};
