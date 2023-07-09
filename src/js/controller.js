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

const showRecipie = async function () {
  const apiKey = "fe6c0263-055e-4cb7-a199-cd527b7f80ad";

  try {
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=${apiKey}`
    );
    const data = await response.json();

    if(!response.ok) throw new Error(`${data.mesaage} (${response.status})`)
    console.log(response,data);
  } catch (err) {
    alert(err);
  }
};

showRecipie();
