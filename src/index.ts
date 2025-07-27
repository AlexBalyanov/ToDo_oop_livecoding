import "./styles/styles.css"
import {ToDoModel} from "./components/Model/ToDoModel";
import {todos} from "./utils/constants";
import {ToDoApi} from "./components/CommunicationApi/ToDoApi";
import {Item} from "./components/View/Item";
import {cloneTemplate} from "./utils/utils";
import {EventEmitter} from "./components/base/Events";
import {Page} from "./components/View/Page";
import {Form} from "./components/View/Form";

const api = new ToDoApi('https://jsonplaceholder.typicode.com');
const itemTemplate = document.querySelector('#todo-item-template') as HTMLTemplateElement;
const events = new EventEmitter();
const toDoModel = new ToDoModel(events);
const page = new Page(document.querySelector('.page__content') as HTMLElement);
const form = new Form(document.querySelector('.todos__form') as HTMLElement, events);

api.getTasks()
  .then((data) => {
    toDoModel.setItems(data);
    console.log(toDoModel);
  })
  .catch(err => console.error(err));

events.on('items:changed', () => {
  const itemsHTMLArray = toDoModel.getItems()
    .map((item) => new Item(cloneTemplate(itemTemplate), events).render(item));
  page.render({
      toDoList: itemsHTMLArray,
      tasksTotal: toDoModel.getTotal(),
      tasksDone: toDoModel.getDone(),
    })
});

events.on('item:check', ({id}: {id: number}) => {
  toDoModel.checkItem(id);
  //тут по-хорошему так же нужен запрос на сервер, после чего работать уже с ответом
});

events.on('item:delete', ({id}: {id: number}) => {
  toDoModel.deleteItem(id);
  //тут по-хорошему так же нужен запрос на сервер, после чего работать уже с ответом
});

events.on('item:copy', ({id}: {id: number}) => {
  const {title} = toDoModel.getItem(id);
  api.addTask({title, completed: false})
    .then((item) => {
      toDoModel.addItem(item);
      //фейковый сервер jsonplaceholder не создает новый айди, поэтому копирование работает некорректно
    })
    .catch(err => console.error(err));
});

events.on('form:submit', ({value}: {value: string}) => {
  api.addTask({title: value, completed: false})
    .then((item) => {
      toDoModel.addItem(item);
      form.render({value: ''});
    })
    .catch(err => console.error(err));
});

//Проверка модели представления
// const listElement = document.querySelector('.todos__list') as HTMLUListElement;
//
// const card1 = new Item(cloneTemplate(itemTemplate));
// const testObj = {
//   name: 'watch a gachi videos',
//   completed: true,
// }
//
// listElement.prepend(card1.render(testObj))
// card1.render({name: 'MAKE a gachi video'})

// Проверка модели данных
// toDoModel.setItems(todos);
// console.log(toDoModel);
// console.log(toDoModel.getItem(2))

