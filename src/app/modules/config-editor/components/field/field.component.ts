import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IItem, IConfig } from '../../config-editor.model';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-config-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent {
  @Input() item: IItem;
  @Input() scope: IConfig;
  @Output() edit: EventEmitter<IItem> = new EventEmitter();
  @Output() clear: EventEmitter<IItem> = new EventEmitter();

  onEdit(model: NgModel, item: IItem, force = false) {
    if (!force && !model.dirty) {
      return;
    }
    this.item = {
      ...item,
      scope: this.scope.name,
      value: model.value
    };
    this.edit.emit(this.item);
  }

  onClear(item: IItem) {
    this.item = {
      ...item,
      value: item.defaultValue
    };
    this.clear.emit({
      ...item,
      scope: this.scope.name
    });
  }
}
