// Goal is to contain functions that are reused over and over in the project
import { method } from "lodash";
import { TIMEOUT_SEC } from "./config";
import { API_KEY } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    let id = window.location.hash.slice(1);
    const response = await Promise.race([
      fetch(`${url}/${id}`),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();
    if (!response.ok) throw new Error(`${data.mesaage} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

// use the functions below
export const get_JSON = async function (querry) {
  try {
    // const querry = "pizza";
    const link = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${querry}&key=${API_KEY}`;
    const response = await Promise.race([
      fetch(`${link}`),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();
    if (!response.ok) throw new Error(`${data.mesaage} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const send_JSON = async function (url, upload_data) {
  try {
    const post_data = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upload_data),
    });

    const post = await Promise.race([post_data, timeout(TIMEOUT_SEC)]);
    const data = await post.json();

    if (!post.ok) throw new Error(`${data.mesaage} (${post.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
