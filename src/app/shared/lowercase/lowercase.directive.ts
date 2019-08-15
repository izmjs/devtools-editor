import { Directive, Output, EventEmitter } from '@angular/core';

const REGEX = /[^0-9a-zA-Z]/g;

@Directive({
  selector: 'input[ngModel][appLowercase]',
  host: {
    '(input)': 'onInputChange($event)'
  }
})
export class LowercaseDirective {
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter();
  value = '';

  onInputChange(ev: KeyboardEvent) {
    const { value } = <HTMLInputElement>ev.target;
    this.value = (value || '').replace(REGEX, '-').toLowerCase();
    this.ngModelChange.emit(this.value);
  }
}
