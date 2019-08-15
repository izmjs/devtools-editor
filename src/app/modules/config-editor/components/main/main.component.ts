import {
  Input,
  Output,
  Component,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import { IItem, IConfig } from '../../config-editor.model';

@Component({
  selector: 'app-config',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  activeTab: boolean[] = [];

  @Input() active: IConfig;
  @Input() items: IConfig[] = [];
  @Output() save: EventEmitter<IItem> = new EventEmitter();
  @Output() clear: EventEmitter<IItem> = new EventEmitter();

  onSave(item: IItem) {
    this.save.emit(item);
  }

  onClear(item: IItem) {
    this.clear.emit(item);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { active } = changes;

    if (!active || !active.currentValue) {
      return;
    }

    const { currentValue: current } = active;

    const index = this.items.findIndex(one => one.name === current.name);
    for (let i = 0; i < this.items.length; i += 1) {
      this.activeTab[i] = i === index;
    }
  }
}
