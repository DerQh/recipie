import View from "./View.js";
import icons from "url:../../img/icons.svg";


class PaginateView extends View {
  _parentEl = document.querySelector(".paginate");

  addClickHandler(handlerfunction) {
    this._parentEl.addEventListener("click", function (event) {
      const btn = event.target.closest(".btn--inline ");
      //   console.log(btn);
      if (!btn) return;

      const pagedata_num = +btn.dataset.page;
    //   console.log(pagedata_num);
      handlerfunction(pagedata_num);
    });
  }

  _generateMarkup() {
    const curr_page = this._data.page;
    const page_num = Math.ceil(
      this._data.results.length / this._data.pageResults
    );
    // console.log(page_num);
    // page 1 and there are other pagees
    if (curr_page === 1 && page_num > 1) {
      return `
      <button data-page="${
        curr_page + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curr_page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>`;
    }
    // Denier page
    if (curr_page === page_num && page_num > 1) {
      return `
       <button data-page="${curr_page}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curr_page}</span>
          </button>
          `;
    }
    // Other pages
    if (curr_page < page_num) {
      return `
      <button data-page="${curr_page - 1}"  class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curr_page - 1}</span>
          </button>
         <button data-page="${
           curr_page + 1
         }"  class="btn--inline pagination__btn--next">
            <span>Page ${curr_page + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
          
      `;
    }

    // Page 1  and no other pages
    return "";
  }
} 

export default new PaginateView();
