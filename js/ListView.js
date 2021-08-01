export class ListView {
  constructor() {
    this._taskInput = this.selectHtmlElement(".add-task__input--js");
    this._taskForm = this.selectHtmlElement(".add-task--js");
  }

  createHtmlElement(tag, ...className) {
    const element = document.createElement(tag);
    className.forEach((item) => element.classList.add(item));
    return element;
  }

  selectHtmlElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  getTaskInputValue() {
    console.log(this._taskInput.value);
  }

  deleteInputValue(input) {
    input.value = "";
  }
}
