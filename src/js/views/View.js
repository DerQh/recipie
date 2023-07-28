import icons from "url:../../img/icons.svg";

export default class View {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  // ----------------Developing a DOM Updating algorithm------------------- //
  update(data) {
    this._data = data;
    const markupNew = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(markupNew);
    const newElement = Array.from(newDOM.querySelectorAll("*"));
    const currElement = Array.from(this._parentEl.querySelectorAll("*"));
    // console.log(newElement);
    // console.log(currElement);

    newElement.forEach((newElem, i) => {
      const singleCurrElement = currElement[i];
      // console.log(singleCurrElement, newElem.isEqualNode(singleCurrElement));

      // Update chnaged TEXT
      if (
        !newElem.isEqualNode(singleCurrElement) &&
        newElem.firstChild?.nodeValue.trim() !== ""
      ) {
        // console.log(newElem.firstChild.nodeValue.trim());
        singleCurrElement.textContent = newElem.textContent;
      }
      // Update changed ATTRIBUTES
      if (!newElem.isEqualNode(singleCurrElement)) {
        // console.log(Array.from(newElem.attributes));
        Array.from(newElem.attributes).forEach((attr) => {
          singleCurrElement.setAttribute(attr.name, attr.value);
        });
      }
    });
  }

  // Clear Parent Element //
  _clear() {
    this._parentEl.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `
       <div class="spinner">
          <svg>
            <use href="${icons}#icon-loader"></use>
          </svg>
        </div> 
        `;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  };

  // Render Errors
  renderError(message = this._errorMEssage) {
    const markup = `<div class="error">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  // render Sucess message
  renderMessage(message) {
    const markup = `<div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    this._clear();
    this._parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessageLoad() {
    const parentEL = document.querySelector(".add-recipe-window ");
    const markup = `<div class="message">
            <div>
              <svg>
                <use href="src/img/icons.svg#icon-alert-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>`;
    parentEL.innerHTML = "";
    parentEL.insertAdjacentHTML("afterbegin", markup);
  }
}
