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

  bindTaskActions(handler) {
    this._list.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        handler({
          type: e.target.closest("button").dataset.type,
          id: +e.target.closest("button").parentNode.dataset.id,
        });
      }
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
      if (task._important) {
        this._template.content
          .querySelector(".list-item--js")
          .classList.add("list-item--important");
      } else {
        this._template.content
          .querySelector(".list-item--js")
          .classList.remove("list-item--important");
      }
      if (task._complete) {
        this._template.content
          .querySelector(".list-item--js")
          .classList.add("list-item--done");
        this._template.content
          .querySelector(".list-item--js")
          .classList.remove("list-item--not-done");
      } else {
        this._template.content
          .querySelector(".list-item--js")
          .classList.add("list-item--not-done");
        this._template.content
          .querySelector(".list-item--js")
          .classList.remove("list-item--done");
      }
      this._list.appendChild(document.importNode(this._template.content, true));
    });
  }
}
