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
};

export const loadRecipe = async function () {
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
