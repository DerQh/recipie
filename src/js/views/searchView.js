class SearchView {
  parentEL = document.querySelector(".search");

  getQuery() {
    const querry = this.parentEL.querySelector(".search__field").value;
    console.log(querry);
    this.#clearInput();
    return querry;
  }

  #clearInput() {
    this.parentEL.querySelector(".search__field").value = "";
  }

  addHandlerSearch(handlerfunction) {
    this.parentEL.addEventListener("submit", function (event) {
      event.preventDefault();
      handlerfunction();
    });
  }
}
export default new SearchView();
