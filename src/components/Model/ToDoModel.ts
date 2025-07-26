import {IToDoItem} from "../../types";

export class ToDoModel {
  protected items: IToDoItem[];

  constructor() {}

  addItem(item: IToDoItem) {
    this.items.push(item);
  }

  setItems(items: IToDoItem[]) {
    this.items = items;
  }

  deleteItem(id: number) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  getItems(): IToDoItem[] {
    return this.items;
  }

  getItem(id: number): IToDoItem {
    return this.items.find((item) => item.id === id);
  }

  checkItem(id: number) {
    const item = this.getItem(id);
    item.completed = !item.completed;
  }

  getTotal() {
    return this.items.length;
  }

  getDone() {
    return this.items.filter((item) => item.completed).length;
  }
}