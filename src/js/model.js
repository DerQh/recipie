import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipie: {},
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
    console.log(state.recipie);
  } catch (err) {
    // temporary error handling
    console.log(`${err}`);
    throw err;
  }
};
