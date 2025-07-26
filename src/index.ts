import "./styles/styles.css"
import {ToDoModel} from "./components/Model/ToDoModel";
import {todos} from "./utils/constants";
import {ToDoApi} from "./components/Model/ToDoApi";

const toDoModel = new ToDoModel();

// Проверка модели данных
// toDoModel.setItems(todos);
// console.log(toDoModel);
// console.log(toDoModel.getItem(2))

const api = new ToDoApi('https://jsonplaceholder.typicode.com');

api.getTasks()
  .then((data) => {
    toDoModel.setItems(data);
    console.log(toDoModel);
  })
  .catch(err => console.error(err));

