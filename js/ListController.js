export class ListController {
  constructor(listModel, listView) {
    this._listModel = listModel;
    this._listView = listView;
    this._listView.bindAddTask(this.handleAddTask);
    this._listView.bindTaskActions(this.handleTaskActions);
    this._listView.bindSearchTasks(this.handleSearchTasks);
    this._listView.bindFilters(this.handleFilters);
    this._listModel.bindTaskListChanged(this.handleRenderList);
    this.handleRenderList(this._listModel._taskList); // first task render (empty list)
  }

  handleTaskActions = (actionData) => {
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

  handleSearchTasks = (text) => {
    this._listModel.searchTasks(text);
  };

  handleFilters = (filter) => {
    if (filter === "done") {
      this._listModel.filterTasks("complete", true);
    } else if (filter === "not-done") {
      this._listModel.filterTasks("complete", false);
    } else {
      this._listModel.sendUpdatedTasks(this._listModel._taskList);
    }
  };

  handleRenderList = (tasks) => {
    this._listView.renderList(tasks);
  };
}
