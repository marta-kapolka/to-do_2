import { ListController } from "./ListController.js";
import { ListModel } from "./ListModel.js";
import { ListView } from "./ListView.js";

const app = new ListController(new ListModel(), new ListView());

console.log(app);
app._listModel.addTask("cosik");
app._listModel.addTask("cosik jeszcze");
app._listModel.addTask("i następne");
app._listModel.addTask("i jeszcze kolejne");

app._listView.createHtmlElement("div", "ąśdasdas", "sdfasfsdf");
app._listView.selectHtmlElement(".list");
app._listView.getTaskInputValue();
