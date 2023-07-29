import View from "./View.js";

class AddRecipieView extends View {
  _parentEl = document.querySelector(".upload");
  _message = "Recipe was loaded Sucessfully";

  _windowEL = document.querySelector(".add-recipe-window");
  _overlayEL = document.querySelector(".overlay");
  openBtn = document.querySelector(".nav__btn--add-recipe");
  closeBtn = document.querySelector(".btn--close-modal");

  constructor() {
    super();
    this._addHandler_ShowWindow();
    this._addhandler_Hidewindow();
  }

  windowToggel() {
    this._overlayEL.classList.toggle("hidden");
    this._windowEL.classList.toggle("hidden");
  }

  _addHandler_ShowWindow() {
    this.openBtn.addEventListener("click", this.windowToggel.bind(this));
  }

  _addhandler_Hidewindow() {
    this.closeBtn.addEventListener("click", this.windowToggel.bind(this));
  }
  addHander_Upload(handler) {
    this._parentEl.addEventListener("submit", function (event) {
      event.preventDefault();
      let data = [...new FormData(this)];
      data = Object.fromEntries(data); // convert ann arrray of entries and convertes it to an Object
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipieView();
