// Goal is to contain functions that are reused over and over in the project
import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const id = "5ed6604591c37cdc054bc886";
    const apiKey = "fe6c0263-055e-4cb7-a199-cd527b7f80ad";
    const response = await Promise.race([
      fetch(`${url}/${id}?key=${apiKey}`),
      timeout(TIMEOUT_SEC),
    ]);

    const data = await response.json();
    if (!response.ok) throw new Error(`${data.mesaage} (${response.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
