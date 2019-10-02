import {
  Input,
  Output,
  Component,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { IMetadata } from '../../manifest-editor.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-meta',
  templateUrl: './meta.component.html',
  styleUrls: ['./meta.component.scss']
})
export class MetaComponent {
  logo = '';
  defaultLogo = require('../../../../../assets/module.png');

  @ViewChild('logoInput', { static: false }) logoEl: { nativeElement: HTMLInputElement };
  @ViewChild('form', { static: false }) form: NgForm;

  @Output() save: EventEmitter<IMetadata> = new EventEmitter();
  @Input() metadata: IMetadata = {
    links: {},
    author: {},
    maintainers: [],
    publisher: {}
  };

  getLogo() {
    return this.metadata && this.metadata.links && this.metadata.links.logo
      ? this.metadata.links.logo
      : this.defaultLogo;
  }

  onSave() {
    const { value: v } = this.form;
    const data: IMetadata = {
      name: v.name,
      description: v.description,
      version: v.version,
      license: v.license
    };

    if (v.logo) {
      data.links = {
        ...this.metadata.links,
        logo: v.logo
      };
    }

    if (v['author.email']) {
      data.author = {
        ...this.metadata.author,
        email: v['author.email']
      };
    }

    this.save.emit(data);
  }

  onSetLogo(logo: string) {
    this.form.value.logo = logo;
    this.logo = '';
    this.onSave();
  }

  onCancelLogo() {
    this.logo = '';
  }

  onLogo() {
    this.logo = this.getLogo();
    setTimeout(() => {
      this.logoEl.nativeElement.select();
    }, 0);
  }

  onLogoKeyUp(ev: KeyboardEvent) {
    switch (ev.key) {
      case 'Escape':
        return this.onCancelLogo();
      case 'Enter':
        return this.onSetLogo(this.logo);
      default:
        return;
    }
  }
}
