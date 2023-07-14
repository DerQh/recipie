import { async } from "regenerator-runtime";

export const state = {
  recipie: {},
};

export const loadRecipe = async function (id) {
  try {
    const apiKey = "fe6c0263-055e-4cb7-a199-cd527b7f80ad";
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${apiKey}`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.mesaage} (${response.status})`);

    let recipie = data.data.recipe;
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
    alert(err);
  }
};
