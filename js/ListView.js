export class ListView {
  constructor() {
    this._taskInput = document.querySelector(".add-task__input--js");
    this._taskForm = document.querySelector(".add-task--js");
    this._template = document.querySelector(".template--js");
    this._list = document.querySelector(".list--js");
    this._searchInput = document.querySelector(".header-bar__search-input--js");
    this._searchInputClearButton = document.querySelector(
      ".search__clear-button--js"
    );
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

  bindSearchTasks(handler) {
    // create named function to be able to remove event listener on keyup when input is not focused, created inside bindSearchTask because of using handler
    const search = () => {
      // enable / disable clear button
      if (this._searchInput.value !== "") {
        this._searchInputClearButton.classList.remove(
          "search__clear-button--not-active"
        );
        this._searchInputClearButton.disabled = false;
      } else {
        this._searchInputClearButton.classList.add(
          "search__clear-button--not-active"
        );
        this._searchInputClearButton.disabled = true;
      }
      // search tasks in model
      handler(this._searchInput.value);
    };

    // create named function to be able to remove event listener on click when input is empty, created inside bindSearchTask because of using search that uses handler
    const clearSearchInput = () => {
      this._searchInput.value = "";
      this._searchInputClearButton.removeEventListener(
        "click",
        clearSearchInput
      );
      // disable clear button, search (all) tasks in model -> render tasks
      search();
    };

    this._searchInput.addEventListener("focusin", () => {
      this._searchInput.addEventListener("keyup", search);
      this._searchInputClearButton.addEventListener("click", clearSearchInput);
    });

    this._searchInput.addEventListener("focusout", () => {
      this._searchInput.removeEventListener("keyup", search);
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
