export class Task {
  constructor(id, value) {
    this._id = id;
    this._value = value;
    this._complete = false;
    this._important = false;
  }

  changeCompletion() {
    this._complete = !this._complete;
  }

  changeImportance() {
    this._important = !this._important;
  }
}
