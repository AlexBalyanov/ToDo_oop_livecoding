import {Component} from "../base/Component";
import {ensureElement} from "../../utils/utils";
import {IToDoItem} from "../../types";
import {IEvents} from "../base/Events";

export class Item extends Component<IToDoItem> {
  protected itemTitle: HTMLElement;
  protected deleteButton: HTMLButtonElement;
  protected copyButton: HTMLButtonElement;
  protected checkButton: HTMLButtonElement;
  protected itemId: number;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.itemTitle = ensureElement('.todo-item__text', this.container);
    this.deleteButton = ensureElement('.todo-item__del', this.container) as HTMLButtonElement;
    this.copyButton = ensureElement('.todo-item__copy', this.container) as HTMLButtonElement;
    this.checkButton = ensureElement('.todo-item__flag-off', this.container) as HTMLButtonElement;

    this.deleteButton.addEventListener('click', () => {
      events.emit('item:delete', {id: this.itemId});
    });

    this.copyButton.addEventListener('click', () => {
      events.emit('item:copy', {id: this.itemId});
    });

    this.checkButton.addEventListener('click', () => {
      events.emit('item:check', {id: this.itemId});
    });

  }

  set title(value: string) {
    this.setText(this.itemTitle, value);
  }

  set completed(value: boolean) {
    this.toggleClass(this.checkButton, 'todo-item__flag-on', value);
    this.toggleClass(this.checkButton, 'todo-item__flag-off', !value);
  }

  set id(value: number) {
    this.itemId = value;
  }
}