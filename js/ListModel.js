import { Task } from "./Task.js";

export class ListModel {
  constructor() {
    this._taskList = [];
    this._currentId = 1;
  }

  addTask(value) {
    if (value === "") {
      this.sendErrorMessage("empty");
    } else if (
      this._taskList.find((task) => task._value === value) !== undefined
    ) {
      this.sendErrorMessage("repeated");
    } else {
      this.setCurrentId();
      this._taskList.push(new Task(this._currentId, value));
      this.sendUpdatedTasks(this._taskList);
      this.sendErrorMessage("ok");
    }
  }

  setCurrentId() {
    if (this._taskList.length === 0) this._currentId = 1;
    else this._currentId++;
  }

  findTaskById(id) {
    // return task with matching id
    return this._taskList.indexOf(
      this._taskList.find((task) => task._id === id)
    );
  }

  searchTasks(text) {
    // return array of tasks which include text

    this.sendUpdatedTasks(
      this._taskList.filter((task) => task._value.includes(text))
    );
  }

  filterTasks(property, value) {
    this.sendUpdatedTasks(
      this._taskList.filter((task) => task[`_${property}`] === value)
    );
  }

  //   sortTasks() {    APPLY IN VIEW WHEN RENDERING..?
  //     return [
  //       ...this.filterTasks("important", true),
  //       ...this.filterTasks("important", false),
  //     ];
  //   }

  removeTask(id) {
    this._taskList.splice(this.findTaskById(id), 1);
    this.sendUpdatedTasks(this._taskList);
  }

  changeTaskImportance(id) {
    this._taskList[this.findTaskById(id)].changeImportance();
    this.sendUpdatedTasks(this._taskList);
  }

  changeTaskCompletion(id) {
    this._taskList[this.findTaskById(id)].changeCompletion();
    this.sendUpdatedTasks(this._taskList);
  }

  bindTaskListChanged(callback) {
    this.sendUpdatedTasks = callback;
  }

  bindErrorUpdated(callback) {
    this.sendErrorMessage = callback;
  }
}
