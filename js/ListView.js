export class ListView {
  constructor() {
    this._taskInput = this.selectHtmlElement(".add-task__input--js");
    this._taskForm = this.selectHtmlElement(".add-task--js");
    this._template = this.selectHtmlElement(".template");
    this._list = this.selectHtmlElement(".list");
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

  deleteInputValue(input) {
    input.value = "";
  }

  bindAddTask(handler) {
    this._taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this._taskInput.value);
      this.deleteInputValue(this._taskInput);
    });
  }

  renderList(tasks) {
    this._list.innerHTML = "";
    tasks.forEach((task) => {
      this._template.content.querySelector(".list-item__text--js").innerText =
        task._value;
      this._template.content
        .querySelector(".list-item--js")
        .setAttribute("data-id", `${task._id}`);
      this._list.appendChild(document.importNode(this._template.content, true));
    });
  }
}
