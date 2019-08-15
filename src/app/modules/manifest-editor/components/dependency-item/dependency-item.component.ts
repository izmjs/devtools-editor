import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { IMetadata, ModuleType } from '../../manifest-editor.model';

@Component({
  selector: 'app-dependency-item',
  templateUrl: './dependency-item.component.html',
  styleUrls: ['./dependency-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DependencyItemComponent implements OnInit {
  @Output() install: EventEmitter<IMetadata> = new EventEmitter();
  @Output() remove: EventEmitter<IMetadata> = new EventEmitter();
  @Input() item: IMetadata = {
    installed: true,
    name: 'express',
    version: '0.1.2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
  };
  @Input() type: ModuleType = 'fm';

  moduleLogo = require('../../../../../assets/module.png');
  npmLogo = require('../../../../../assets/npm-logo.png');

  constructor() {}

  ngOnInit() {}

  getLogo() {
    if (this.item.links && this.item.links.logo) {
      return this.item.links.logo;
    }

    if (this.type === 'fm') {
      return this.moduleLogo;
    }

    return this.npmLogo;
  }

  onInstall() {
    this.install.emit(this.item);
  }

  onRemove() {
    this.remove.emit(this.item);
  }
}
