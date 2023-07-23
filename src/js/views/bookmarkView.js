import icons from "url:../../img/icons.svg";

import View from "./View.js";

class BookmarksView extends View {
  _parentEl = document.querySelector(".bookmarks__list");
  _errorMEssage = "No bookmarks yet, Find a recipe and bookmark ";
  _message = "";

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(results) {
    const id = window.location.hash.slice(1);
    // console.log(id === results.id);
    return `
       <li class="preview">
            <a class="preview__link ${
              results.id === id ? "preview__link--active" : ""
            }" href="#${results.id}">
              <figure class="preview__fig">
                <img src="${results.image}" alt="title" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${results.title}</h4>
                <p class="preview__publisher">${results.publisher}</p>
               
              </div>
            </a>
          </li>
          
        `;
  }
}

export default new BookmarksView();
