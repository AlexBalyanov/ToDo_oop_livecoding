import "./styles/styles.css"
import {ToDoModel} from "./components/ToDoModel";
import {todos} from "./utils/constants";

const toDoModel = new ToDoModel();

toDoModel.setItems(todos);
console.log(toDoModel);
console.log(toDoModel.getItem(2))