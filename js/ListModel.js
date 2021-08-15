import { Task } from "./Task.js";

export class ListModel {
  constructor() {
    this._taskList = [];
    this._currentId = 1;
  }

  createNewTask(taskText) {
    this.setCurrentId();
    return new Task(this._currentId, taskText);
  }

  addTask(taskText) {
    if (this.validateTaskToAdd(taskText)) {
      this._taskList.push(this.createNewTask(taskText));
      this.sendUpdatedTasks(this._taskList);
    }
  }

  validateTaskToAdd(taskText) {
    if (taskText === "") {
      this.sendErrorMessage("empty");
      return false;
    } else if (
      this._taskList.find((task) => task._value === taskText) !== undefined
    ) {
      this.sendErrorMessage("repeated");
      return false;
    } else {
      this.sendErrorMessage("ok");
      return true;
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
    // update view with array of tasks which include given text
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

  changeTaskFlag(type, id) {
    if (type === "completion")
      this._taskList[this.findTaskById(id)].changeCompletion();
    if (type === "importance")
      this._taskList[this.findTaskById(id)].changeImportance();
    this.sendUpdatedTasks(this._taskList);
  }

  bindTaskListChanged(callback) {
    this.sendUpdatedTasks = callback;
  }

  bindErrorUpdated(callback) {
    this.sendErrorMessage = callback;
  }
}
