import {
  Input,
  Output,
  OnChanges,
  ViewChild,
  Component,
  ElementRef,
  EventEmitter,
  SimpleChanges
} from '@angular/core';
import {
  ILanguage,
  ISentence,
  ITranslation,
  IEditableSentence
} from '../../i18n.model';
import { ALL_LANGUAGES } from './languages.helper';

@Component({
  selector: 'app-i18n',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class I18nComponent implements OnChanges {
  @Input() lngs: ILanguage[] = [];
  @Input() entries: ISentence[] = [];
  @Input() working = false;

  @Output() create: EventEmitter<ISentence> = new EventEmitter();
  @Output() remove: EventEmitter<ISentence> = new EventEmitter();
  @Output() update: EventEmitter<ISentence> = new EventEmitter();
  @Output() addLanguage: EventEmitter<ILanguage> = new EventEmitter();
  @Output() removeLanguage: EventEmitter<ILanguage> = new EventEmitter();
  @Output() updateLanguage: EventEmitter<ITranslation> = new EventEmitter();

  @ViewChild('table', { static: false }) private table: ElementRef;

  editableEntries: number[] = [];
  editableLngs: number[] = [];
  rows: IEditableSentence[];
  isAddLanguage = false;
  lngToAdd: ILanguage;

  ngOnChanges(changes: SimpleChanges): void {
    const {
      currentValue: currentLngValue,
      previousValue: previousLngValue
    } = changes.lngs;
    if (currentLngValue !== previousLngValue) {
      this.lngs = changes.lngs.currentValue;
    }

    const { currentValue, previousValue } = changes.entries;
    this.rows =
      Array.isArray(currentValue) && currentValue !== previousValue
        ? currentValue.map((sentence: ISentence) =>
            this.sentenceToRow(sentence)
          )
        : [];
  }

  /**
   * Will be executed every time we cancel the edition of an entry
   * @param entry The entry to update
   */
  onCancel(entry: IEditableSentence, index: number) {
    const { key, data } = entry;

    if (entry.isNew) {
      this.rows = this.rows.filter((one, i) => i !== index);
    }

    Object.keys(data).forEach(lng => {
      data[lng].current = data[lng].origin;
    });

    this.editableEntries = this.editableEntries.filter(i => index !== i);
    this.focus();
  }

  /**
   * Will be executed every time we remove an entry
   * @param entry The sentence to remove
   */
  async onRemove(entry: IEditableSentence, index: number) {
    if (confirm('Would you like to remove this entry?')) {
      this.remove.emit(this.rowToSentence(entry));
    }
  }

  /**
   * Will be executed every time we update an entry
   * @param entry The entry to update
   * @param index The index of the entry
   */
  onSave(entry: IEditableSentence, index: number) {
    const result = this.rowToSentence(entry);

    if (!entry.isNew) {
      let touched = false;
      for (const lng of this.lngs) {
        const { current, origin } = entry.data[lng.key];
        if (origin !== current) {
          touched = true;
          break;
        }
      }

      if (touched) {
        this.update.emit(result);
      }
    } else {
      if (!entry.key) {
        entry.type = 'danger';
        entry.icon = 'times circle';
        entry.message = 'The key can not be empty';
        this.focus(index);
        return;
      }

      const i = this.rows.findIndex(
        (row, rowIndex) => row.key === entry.key && rowIndex !== index
      );

      if (i >= 0) {
        entry.type = 'danger';
        entry.icon = 'times circle';
        entry.message = 'Dupplicated key, please choose an other one.';
        this.focus(index);
        return;
      }

      this.create.emit(result);
      delete entry.isNew;
    }

    this.editableEntries = this.editableEntries.filter(one => one !== index);
  }

  /**
   * Will be executed every time we update an entry
   * @param entry The entry to update
   * @param index The index of the entry
   */
  onEdit(entry: IEditableSentence, index: number, ev?: MouseEvent) {
    if (this.working || this.editableEntries.includes(index)) {
      return;
    }

    if (ev && ev.target && (ev.target as any).nodeName === 'INPUT') {
      return;
    }

    this.editableEntries.push(index);
    this.focus(index);
  }

  /**
   * Will be executed every time we cancel the edition of a language
   * @param lng The language to update
   * @param index The index of the language
   */
  onLngCancel(lng: ILanguage, index: number) {
    this.rows = this.rows.map(entry => {
      const { key, data } = entry;
      Object.keys(data).forEach((lngKey, i) => {
        if (i === index) {
          data[lngKey].current = data[lngKey].origin;
        }
      });
      return entry;
    });
    this.editableLngs = this.editableLngs.filter(i => index !== i);
    this.focus();
  }

  /**
   * Will be executed every time we remove a language
   * @param lng The language to remove
   * @param index The index of the language
   */
  async onLngRemove(lng: ILanguage) {
    if (confirm('Would you like to remove this language?')) {
      this.removeLanguage.emit(lng);
    }
  }

  /**
   * Will be executed every time we update a language
   * @param lng The language to update
   * @param index The index of the language
   */
  onLngSave(lng: ILanguage, index: number) {
    let touched = false;
    const event: ITranslation = {
      lng,
      entries: []
    };

    event.entries = this.rows.map(row => {
      const { current, origin } = row.data[lng.key];
      const entry: ISentence = {
        key: row.key
      };

      if (current !== origin) {
        touched = true;
      }

      entry[lng.key] = current;

      return entry;
    });

    this.editableLngs = this.editableLngs.filter(one => one !== index);
    if (touched) {
      this.updateLanguage.emit(event);
    }
  }

  /**
   * Will be executed every time we update a language
   * @param lng The language to update
   * @param index The index of the language
   */
  onLngEdit(lng: ILanguage, index: number) {
    if (this.working || this.editableLngs.includes(index)) {
      return;
    }

    this.editableLngs.push(index);
    this.focus(index, true);
  }

  /**
   * Will be executed every time we click the add language button
   */
  onAddLanguage(lng: ILanguage) {
    debugger;
    if (lng) {
      this.addLanguage.emit(lng);
    }
    this.isAddLanguage = false;
  }

  /**
   * Will be executed every time we click the add sentence button
   */
  onAddSentence() {
    let key = 'NEW_ENTRY';
    let counter = 0;

    while (this.rows.find(row => row.key === key)) {
      key = 'NEW_ENTRY_' + counter++;
    }

    const newSentence: IEditableSentence = this.sentenceToRow({
      key
    });
    newSentence.isNew = true;

    this.rows = [...this.rows, newSentence];

    this.focus(this.rows.length - 1);
  }

  /**
   * Will be executed every time the keyup event was fired
   */
  onKeyUp(ev: KeyboardEvent, entry: IEditableSentence, line, col?: number) {
    switch (ev.key) {
      case 'Escape':
        if (this.editableEntries.includes(line) || entry.isNew) {
          this.onCancel(entry, line);
        } else if (this.editableLngs.includes(col)) {
          this.onLngCancel(this.lngs[col], col);
        }
        break;
      case 'Enter':
        if (ev.ctrlKey) {
          this.onAddSentence();
        }
        if (this.editableEntries.includes(line) || entry.isNew) {
          this.onSave(entry, line);
        } else if (this.editableLngs.includes(col)) {
          this.onLngSave(this.lngs[col], col);
        }
        break;
    }
  }

  /**
   * Check if a cell is editable
   */
  isCellEditable(entry: IEditableSentence, lng: ILanguage, index: number) {
    const lngIndex = this.lngs.findIndex(one => one.key === lng.key);
    return (
      this.editableEntries.includes(index) ||
      this.editableLngs.includes(lngIndex) ||
      entry.isNew
    );
  }

  availableLanguages() {
    return ALL_LANGUAGES.filter(lng => {
      return this.lngs.findIndex(item => item.key === lng.key) < 0;
    });
  }

  formatter(lng: ILanguage) {
    return `${lng.label} ( ${lng.name} )`;
  }

  focus(index?: number, isCol = false) {
    setTimeout(() => {
      let el;

      if (!this.table) {
        return;
      }

      if (typeof index === 'undefined') {
        el = this.table.nativeElement.querySelector('input');
      } else {
        el =
          isCol === true
            ? this.table.nativeElement.querySelector(
                `tr td:nth-child(${index + 2}) input`
              )
            : this.table.nativeElement.querySelector(
                `tr:nth-child(${index + 1}) input`
              );
      }

      if (el) {
        el.select();
      }
    }, 0);
  }

  private rowToSentence(entry: IEditableSentence, isCancel = false): ISentence {
    const result: ISentence = {
      key: entry.key
    };

    this.lngs.forEach(lng => {
      if (!entry.data[lng.key]) {
        result[lng.key] = '';
        return;
      }

      result[lng.key] =
        isCancel === true
          ? entry.data[lng.key].origin
          : entry.data[lng.key].current;
    });

    return result;
  }

  private sentenceToRow(sentence: ISentence): IEditableSentence {
    const result: IEditableSentence = {
      key: sentence.key,
      data: {}
    };

    (Array.isArray(this.lngs) && this.lngs.length > 0
      ? this.lngs.map(lng => lng.key)
      : Object.keys(sentence)
    ).forEach(attr => {
      if (attr === 'key') {
        return;
      }

      result.data[attr] = {
        origin: sentence[attr] || '',
        current: sentence[attr] || ''
      };
    });

    return result;
  }
}
