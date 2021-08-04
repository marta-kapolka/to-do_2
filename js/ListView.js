export class ListView {
  constructor() {
    this._taskInput = document.querySelector(".add-task__input--js");
    this._taskForm = document.querySelector(".add-task--js");
    this._template = document.querySelector(".template--js");
    this._list = document.querySelector(".list--js");
    this._errorMessage = document.querySelector(".add-task__error--js");
    this._searchInput = document.querySelector(".header-bar__search-input--js");
    this._searchInputClearButton = document.querySelector(
      ".search__clear-button--js"
    );
    this._filterMenu = document.querySelector(".filter--js");
    this._filterButton = document.querySelector(
      ".header-bar__filter-button--js"
    );
    this._filterButtons = document.querySelectorAll(".filter__button--js");
    this.manageFilterMenu();
    this._hideFilterMenuBinder = this.hideFilterMenu.bind(this);
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

  manageFilterMenu() {
    this._filterButton.addEventListener("click", () => {
      this._filterMenu.classList.contains("hidden")
        ? this.openFilterMenu()
        : this.closeFilterMenu();
    });
  }

  openFilterMenu() {
    this._filterMenu.classList.remove("hidden");
    for (let button of this._filterButtons) {
      button.classList.add("open");
    }
  }

  closeFilterMenu() {
    for (let button of this._filterButtons) {
      button.classList.add("closing");
      button.classList.remove("open");
    }
    this._filterButtons[2].addEventListener(
      "transitionend",
      this._hideFilterMenuBinder
    );
  }

  hideFilterMenu() {
    this._filterMenu.classList.add("hidden");
    for (let button of this._filterButtons) {
      button.classList.remove("closing");
    }
    this._filterButtons[2].removeEventListener(
      "transitionend",
      this._hideFilterMenuBinder
    );
  }

  manageErrorMessage(error) {
    if (error === "empty") {
      this._errorMessage.innerHTML = "Nie możesz dodać pustego zadania!";
      this._errorMessage.classList.remove("hidden");
    } else if (error === "repeated") {
      this._errorMessage.innerHTML = "To zadanie jest już na liście!";
      this._errorMessage.classList.remove("hidden");
    } else if (error === "ok") {
      this._errorMessage.innerHTML = "";
      this._errorMessage.classList.add("hidden");
    }
  }

  bindAddTask(handler) {
    this._taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handler(this._taskInput.value);
      if (this._errorMessage.innerHTML === "") {
        this.deleteInputValue(this._taskInput);
      }
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
    // action type taken from button data-type attribute -> completion, importance, delete
    // action id taken from list-item data-id attribute
    this._list.addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        handler({
          type: e.target.closest("button").dataset.type,
          id: +e.target.closest("button").parentNode.dataset.id,
        });
      }
    });
  }

  bindFilters(handler) {
    this._filterMenu.addEventListener("click", (e) => {
      handler(e.target.closest("button").dataset.filter);
      this.closeFilterMenu();
    });
  }

  renderList(tasks) {
    const listItem = this._template.content.querySelector(".list-item--js");
    this._list.innerHTML = "";
    tasks.forEach((task) => {
      this._template.content.querySelector(".list-item__text--js").innerText =
        task._value;
      listItem.setAttribute("data-id", `${task._id}`);
      if (task._important) {
        listItem.classList.add("list-item--important");
      } else {
        listItem.classList.remove("list-item--important");
      }
      if (task._complete) {
        listItem.classList.add("list-item--done");
        listItem.classList.remove("list-item--not-done");
      } else {
        listItem.classList.add("list-item--not-done");
        listItem.classList.remove("list-item--done");
      }
      this._list.appendChild(document.importNode(this._template.content, true));
    });
  }
}
