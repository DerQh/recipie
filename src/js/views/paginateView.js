import View from "./View.js";
import icons from "url:../../img/icons.svg";
import { Fraction } from "fractional";
// console.log(Fraction);

class PaginateView extends View {
  _parentEl = document.querySelector(".paginate");
  _generateMarkup() {
    const page_num = Math.ceil(
      this._data.results.length / this._data.pageResults
    );
    console.log(page_num);
    // page 1 and there are other pagees
    if (this._data.page === 1 && page_num > 1) {
      return `Page 1, others`;
    }
    // Denier page
    if (this._data.page === page_num) {
      return `Last Page`;
    }
    // Other pages
    if (this._data.page < page_num) {
      return "Other ";
    }

    // Page 1  and no other pages
    
  }
}

export default new PaginateView();
