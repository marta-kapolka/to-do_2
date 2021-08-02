export class ListController {
  constructor(listModel, listView) {
    this._listModel = listModel;
    this._listView = listView;
    this._listView.bindAddTask(this.handleAddTask);
    this._listView.bindTaskActions(this.handleTaskAction);
    this._listModel.bindTaskListChanged(this.onTaskListChanged);
    this.onTaskListChanged(this._listModel._taskList); // first task render (empty list)
  }

  handleTaskAction = (actionData) => {
    if (actionData.type === "completion") {
      this._listModel.changeTaskCompletion(actionData.id);
    }
    if (actionData.type === "importance") {
      this._listModel.changeTaskImportance(actionData.id);
    }
    if (actionData.type === "delete") {
      this._listModel.removeTask(actionData.id);
    }
  };

  handleAddTask = (taskText) => {
    this._listModel.addTask(taskText);
  };

  onTaskListChanged = (tasks) => {
    this._listView.renderList(tasks);
  };
}
