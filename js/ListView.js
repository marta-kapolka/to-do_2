export class ListView {
  constructor() {
    this._taskInput = this.selectHtmlElement(".add-task__input--js");
    this._taskForm = this.selectHtmlElement(".add-task--js");
    this._template = this.selectHtmlElement(".template");
  }

  //   createHtmlElement(tag, ...className) {
  //     const element = document.createElement(tag);
  //     className.forEach((item) => element.classList.add(item));
  //     return element;
  //   }

  selectHtmlElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  fillTemplate(taskText) {
    this._template.content.querySelector(".list-item__text--js").innerHtml =
      taskText;
  }

  createNode() {
    return document.importNode(this._template.content, true);
  }

  getTaskInputValue() {
    console.log(this._taskInput.value);
  }

  deleteInputValue(input) {
    input.value = "";
  }
}
