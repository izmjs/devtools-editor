import {
  Input,
  Output,
  Component,
  EventEmitter,
} from '@angular/core';
import { IMetadata, ModuleType, IModuleType } from '../../manifest-editor.model';

@Component({
  selector: 'app-dependencies',
  templateUrl: './dependencies.component.html',
  styleUrls: ['./dependencies.component.scss']
})
export class DependenciesComponent {
  @Output() install: EventEmitter<{
    item: IMetadata;
    mode: ModuleType;
  }> = new EventEmitter();
  @Output() remove: EventEmitter<IMetadata> = new EventEmitter();
  @Output() type: EventEmitter<IModuleType> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();

  @Input() loading = false;
  @Input() items: IMetadata[] = [];
  @Input() current: ModuleType = 'prod';
  @Input() installed: IMetadata[] = [];

  text = '';

  types: IModuleType[] = [/*{
    title: 'Functional Modules',
    type: 'fm'
  }, */{
    title: 'Production',
    type: 'prod'
  }, {
    title: 'Development',
    type: 'dev'
  }];

  onTabChanged(ev: IModuleType) {
    this.current = ev.type;
    this.text = '';
    this.type.emit(ev);
  }

  onRemove(item: IMetadata) {
    this.remove.emit(item);
  }

  onInstall(item: IMetadata) {
    this.install.emit({item, mode: this.current});
  }

  onSearch(text: string) {
    this.text = '';
    this.search.emit(text);
  }
}
