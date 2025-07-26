import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import {IToDoItem} from "../../types";

export class Item extends Component<IToDoItem> {
  protected itemTitle: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected copyButton: HTMLButtonElement;
  protected checkButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
    this.itemTitle = ensureElement('.todo-item__text', this.container);
    this.deleteButton = ensureElement('.todo-item__del', this.container) as HTMLButtonElement;
    this.copyButton = ensureElement('.todo-item__copy', this.container) as HTMLButtonElement;
    this.checkButton = ensureElement('.todo-item__flag-off', this.container) as HTMLButtonElement;


  }

  set title(value: string) {
    this.setText(this.itemTitle, value);
  }

  set completed(value: boolean) {
    this.toggleClass(this.checkButton, 'todo-item__flag-on', value);
    this.toggleClass(this.checkButton, 'todo-item__flag-off', !value);
  }
}