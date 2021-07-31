import { ListController } from "./ListController.js";
import { ListModel } from "./ListModel.js";
import { ListView } from "./ListView.js";

const app = new ListController(new ListModel(), new ListView());

console.log(app);
