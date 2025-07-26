import {Api} from "../base/Api";
import {IToDoItem} from "../../types";

export class ToDoApi extends Api {

  getTasks(): Promise<IToDoItem[]> {
    return this.get<IToDoItem[]>('/todos');
  }

  deleteTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return  this.post<IToDoItem>('/todos', data, 'DELETE');
  }

  editTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>('/todos', data, 'PATCH');
  }

  addTask(data: Partial<IToDoItem>): Promise<IToDoItem> {
    return this.post<IToDoItem>('/todos', data);
  }
}