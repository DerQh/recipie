import { async } from "regenerator-runtime";
import { API_URL, pageResult, API_KEY } from "./config";
import { getJSON, get_JSON, send_JSON } from "./helpers";

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

const recipe_Object = function (data) {
  let recipie = data.data.recipe;

  return (recipie = {
    id: recipie.id,
    title: recipie.title,
    publisher: recipie.publisher,
    sourceUrl: recipie.source_url,
    image: recipie.image_url,
    servings: recipie.servings,
    cookingTime: recipie.cooking_time,
    ingredients: recipie.ingredients,
    ...(recipie.key && { key: recipie.key }), // if there is some value the second part is executed, if first value is null, it exits
  });
};

export const loadRecipe = async function (id) {
  try {
    const id_test = window.location.hash.slice(1);
    id = id_test;

    let recipie = await getJSON(`${API_URL}${id}?key=${API_KEY}`);

    state.recipie = recipe_Object(recipie); //

    if (state.bookmarks.some((bookmrk) => bookmrk.id === id_test)) {
      state.recipie.bookmarked = true;
    } else state.recipie.bookmarked = false;

    // console.log(id_test);
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
        ...(recipie.key && { key: recipie.key }),
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
const storeBookmark = function () {
  // Add Bookmark
  localStorage.setItem("bookmarks", JSON.stringify(state.bookmarks));
};

export const add_Bookmark = function (recipe) {
  // Add recipie to bookmark
  state.bookmarks.push(recipe);

  // highlight recipe as bookmarked
  if (recipe.id === state.recipie.id) state.recipie.bookmarked = true;

  storeBookmark();
};

export const bookmark_Delete = function (id) {
  // delete bookmark
  const index = state.bookmarks.findIndex((element) => element.id === id);
  state.bookmarks.splice(index, 1);

  // unbookmark
  if (id === state.recipie.id) state.recipie.bookmarked = false;

  storeBookmark();
};

function init() {
  const storage = localStorage.getItem("bookmarks");
  if (storage) state.bookmarks = JSON.parse(storage);
}

init();

const clearBookmarks = function () {
  localStorage.clear("bookmarks");
};

clearBookmarks();

export const RecipeUpload = async function (newRecipe) {
  try {
    let ingredients = Object.entries(newRecipe); // Object to Array
    ingredients = ingredients
      .filter((entry) => entry[0].startsWith("ingredient") && entry[1] !== "")
      .map((ing) => {
        const ingArray = ing[1].replaceAll(" ", "").split(",");
        if (ingArray.length !== 3)
          throw new Error(
            "Wrong ingredient format! Please use the correct format."
          );
        const [quantity, unit, description] = ingArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);

    const data = await send_JSON(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipie = recipe_Object(data);
    add_Bookmark(state.recipie);
    // console.log(data);
    // console.log(state.recipie);
  } catch (err) {
    throw err;
  }
};
