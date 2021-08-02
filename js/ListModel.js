import { Task } from "./Task.js";

export class ListModel {
  constructor() {
    this._taskList = [];
    this._currentId = 1;
  }

  addTask(value) {
    this.setCurrentId();
    this._taskList.push(new Task(this._currentId, value));
    this.sendUpdatedTasks(this._taskList);
  }

  setCurrentId() {
    if (this._taskList.length === 0) this._currentId = 1;
    else this._currentId++;
  }

  findTaskById(id) {
    // return task with matching id
    return this._taskList.indexOf(
      this._taskList.find((item) => item._id === id)
    );
  }

  findTasksByValue(text) {
    // return array of tasks which include text
    return this._taskList.filter((item) => item._value.includes(text));
  }

  filterTasks(property, value) {
    return this._taskList.filter((item) => item[`_${property}`] === value);
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
}
