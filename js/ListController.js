export class ListController {
  constructor(listModel, listView) {
    this._listModel = listModel;
    this._listView = listView;
    this._listView.bindAddTask(this.handleAddTask);
    this._listModel.bindTaskListChanged(this.onTaskListChanged);
    this.onTaskListChanged(this._listModel._taskList); // first task render (empty list)
  }

  handleAddTask = (taskText) => {
    this._listModel.addTask(taskText);
  };

  onTaskListChanged = (tasks) => {
    this._listView.renderList(tasks);
  };
}
