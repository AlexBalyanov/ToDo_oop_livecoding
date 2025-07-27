import {Component} from "../base/Component";
import {IEvents} from "../base/Events";
import {ensureElement} from "../../utils/utils";

interface  IForm {
  value: string;
  buttonText: string;
}

export class Form extends Component<IForm> {
  protected inputField: HTMLInputElement;
  protected submitButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.inputField = ensureElement('.todo-form__input', this.container) as HTMLInputElement;
    this.submitButton = ensureElement('.todo-form__submit-btn', this.container) as HTMLButtonElement;

    this.container.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.events.emit('form:submit', {value: this.inputField.value});
    });
  }

  set value(value: string) {
    this.inputField.value = value;
  }

  set buttonText(value: string) {
    this.setText(this.submitButton, value);
  }

}