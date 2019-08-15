import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync
} from '@angular/core/testing';

import { I18nComponent } from './main.component';
import { FormsModule } from '@angular/forms';
import { ISentence, ILanguage } from '../../i18n.model';
import { CommonModule } from '@angular/common';
import { SuiSelectModule } from 'ng2-semantic-ui';
import { SimpleChange } from '@angular/core';

function createRows(length = 4, lngs: ILanguage[]): ISentence[] {
  const rows: ISentence[] = [];
  for (let i = 0; i < length; i++) {
    const row: ISentence = {
      key: `SENTENCE_KEY${i}`
    };

    for (const lng of lngs) {
      row[lng.key] = `Translation in ${lng.label}`;
    }

    rows.push(row);
  }
  return rows;
}
const ButtonClick = (row, m) => {
  const btn = row.querySelector(m).parentElement;
  btn.click();
};
const MouseClick = row => {
  const DoubleClickevent = new MouseEvent('dblclick', {
    view: window,
    bubbles: true,
    cancelable: true
  });
  row.dispatchEvent(DoubleClickevent);
};
function keyevent(keyk, rowinput) {
  switch (keyk) {
    case 'Escape':
      keyk = new KeyboardEvent('keyup', {
        key: 'Escape'
      });
      break;
    case 'Enter':
      keyk = new KeyboardEvent('keyup', {
        key: 'Enter'
      });
      break;
    case 'CtrlEnter':
      keyk = new KeyboardEvent('keyup', {
        ctrlKey: true,
        key: 'Enter'
      });
      break;
  }
  rowinput.dispatchEvent(keyk);
}

describe('I18nComponent', () => {
  let component: I18nComponent;
  let fixture: ComponentFixture<I18nComponent>;
  let lngs: ILanguage[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [I18nComponent],
      imports: [CommonModule, FormsModule, SuiSelectModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(I18nComponent);
    component = fixture.componentInstance;
    lngs = [
      {
        key: 'en',
        label: 'English'
      },
      {
        key: 'fr',
        label: 'French'
      }
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of the entries', () => {
    const entries = createRows(1, lngs);
    component.ngOnChanges({
      lngs: new SimpleChange(null, lngs, true),
      entries: new SimpleChange(null, entries, true)
    });
    fixture.detectChanges();
    const rows = fixture.nativeElement.querySelectorAll('table tbody tr');
    // Should contain only one row
    expect(rows.length).toEqual(1);
    const [firstRow] = rows;
    const columns = firstRow.querySelectorAll('td');
    // Should contain 4d columns (the key, both translations and the tools column)
    expect(columns.length).toEqual(4);
    const [key, en, fr] = columns;
    // Should each cell contain the right value
    expect(key.innerText).toEqual(entries[0].key);
    expect(en.innerText).toEqual(entries[0].en);
    expect(fr.innerText).toEqual(entries[0].fr);
  });

  it('should be editable when we double click on a row', () => {
    const entries = createRows(1, lngs);
    component.ngOnChanges({
      lngs: new SimpleChange(null, lngs, true),
      entries: new SimpleChange(null, entries, true)
    });
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('table tbody tr');
    // Fire the double click event
    MouseClick(row);
    fixture.detectChanges();
    // Should render two inputs (one for the 'en' translation, the other one for 'fr')
    expect(
      fixture.nativeElement.querySelectorAll('table tbody tr input').length
    ).toEqual(2);
  });

  it('should be editable when we click on the edit button', () => {
    const entries = createRows(1, lngs);
    component.ngOnChanges({
      lngs: new SimpleChange(null, lngs, true),
      entries: new SimpleChange(null, entries, true)
    });
    fixture.detectChanges();
    const row = fixture.nativeElement.querySelector('table tbody tr');
    ButtonClick(row, 'td:nth-child(4) button i.edit');
    fixture.detectChanges();
    // Should render two inputs (one for the 'en' translation, the other one for 'fr')
    expect(
      fixture.nativeElement.querySelectorAll('table tbody tr input').length
    ).toEqual(2);
  });

  it('should trigger the update event when we edit an entry', fakeAsync(() => {
    const entries = createRows(1, lngs);
    let value: ISentence;
    component.ngOnChanges({
      lngs: new SimpleChange(null, lngs, true),
      entries: new SimpleChange(null, entries, true)
    });
    component.update.subscribe(event => {
      value = event;
    });
    fixture.detectChanges();
    let row = fixture.nativeElement.querySelector('table tbody tr');
    ButtonClick(row, 'td:nth-child(4) button i.edit');
    fixture.detectChanges();
    tick();
    row = fixture.nativeElement.querySelector('table tbody tr');
    // Get the first input
    const enInput = row.querySelector('input');
    expect(enInput.value).toEqual(entries[0].en);
    enInput.value = 'Updated english value';
    enInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    row = fixture.nativeElement.querySelector('table tbody tr');
    ButtonClick(row, 'td:nth-child(4) button i.check');
    tick();
    expect(entries[0].key).toEqual(value.key);
    expect('Updated english value').toEqual(value.en);
    expect(entries[0].fr).toEqual(value.fr);
  }));
  it('should  show edit and delete buttons and not be editable when we click on the undo button ', () => {
    const entries = createRows(1, lngs);
    component.ngOnChanges({
      lngs: new SimpleChange(null, lngs, true),
      entries: new SimpleChange(null, entries, true)
    });
    fixture.detectChanges();
    let row = fixture.nativeElement.querySelector('table tbody tr');
    ButtonClick(row, 'td:nth-child(4) button i.edit');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('table tbody tr input').length
    ).toEqual(2);
    row = fixture.nativeElement.querySelector('table tbody tr');
    expect(row.querySelector('td:nth-child(4) button i.undo')).toBeTruthy();
    expect(row.querySelector('td:nth-child(4) button i.check')).toBeTruthy();
    ButtonClick(row, 'td:nth-child(4) button i.undo');
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelectorAll('table tbody tr input').length
    ).toEqual(0);
  });
  describe('create', () => {
    it('should add a new row with all fields editable  by Clicking the "add sentence" button', () => {
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      const AddSentenceBtn = fixture.nativeElement.querySelector(
        '.buttons button:nth-child(3)'
      );
      AddSentenceBtn.click();
      fixture.detectChanges();
      const AllRows = fixture.nativeElement.querySelectorAll('tbody tr');
      const NewRow = AllRows[1];
      const NumberInputs = NewRow.querySelectorAll('input').length;
      expect(AllRows.length).toEqual(2);
      expect(NumberInputs).toEqual(3);
    });
    it('Typing `ctrl + enter` on an editable field Should create a new editable entry and triggers the `create` event ', () => {
      let value: ISentence;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      component.create.subscribe(event => {
        value = event;
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      let AllRows = fixture.nativeElement.querySelectorAll('tbody tr');
      // Fire the double click event
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      fixture.detectChanges();
      keyevent('CtrlEnter', input);
      fixture.detectChanges();
      AllRows = fixture.nativeElement.querySelectorAll('tbody tr');
      const NewRow = AllRows[1];
      const SumInputs = NewRow.querySelectorAll('input').length;
      // Get the first input of new row
      const NewRowInput = NewRow.querySelector('input');
      NewRowInput.value = 'NEW_KEY_ENTRY';
      NewRowInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(AllRows.length).toEqual(2);
      expect(SumInputs).toEqual(3);
      const validateBtn = fixture.nativeElement.querySelector(
        'tbody tr:last-child button i.check'
      ).parentElement;
      validateBtn.click();
      fixture.detectChanges();
      expect(value.key).toEqual('NEW_KEY_ENTRY');
    });
    it('Typing `enter` on a new entry should trigger the `create` event', () => {
      let value: ISentence;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      component.create.subscribe(event => {
        value = event;
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      let AllRows = fixture.nativeElement.querySelectorAll('tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      keyevent('CtrlEnter', input);
      fixture.detectChanges();
      AllRows = fixture.nativeElement.querySelectorAll('tbody tr');
      const NewRow = AllRows[1];
      // Get the first input of new row
      const NewRowInput = NewRow.querySelector('input');
      NewRowInput.value = 'NEW-TEST-ENTRY';
      NewRowInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      keyevent('Enter', NewRowInput);
      fixture.detectChanges();
      expect(value.key).toEqual('NEW-TEST-ENTRY');
    });
    it('Clicking the `check` button should trigger the `create` event', () => {
      let value: ISentence;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      component.create.subscribe(event => {
        value = event;
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const FirstInput = row.querySelector('input');
      keyevent('CtrlEnter', FirstInput);
      fixture.detectChanges();
      const CheckBtn = fixture.nativeElement.querySelector(
        'tbody tr:last-child button i.check'
      ).parentElement;
      CheckBtn.click();
      fixture.detectChanges();
      expect(value.key).toEqual('NEW_ENTRY');
    });
    it('Clicking the `undo` button on a new created entry should remove the current entry', () => {
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.rows[0].isNew = true;
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      const SumInputs = row.querySelectorAll('input').length;
      expect(SumInputs).toEqual(3);
      ButtonClick(row, 'tbody tr:last-child button i.undo');
      fixture.detectChanges();
      const AllRows = fixture.nativeElement.querySelectorAll('tbody tr');
      expect(AllRows.length).toEqual(0);
    });
    it('Clicking the `undo` button on a new created entry should not trigger any event', () => {
      let isTriggred = false;
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.rows[0].isNew = true;
      fixture.detectChanges();
      ['remove', 'create', 'update', 'addLanguage'].forEach(evName => {
        component[evName].subscribe(() => (isTriggred = true));
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      const SumInputs = row.querySelectorAll('input').length;
      expect(SumInputs).toEqual(3);
      ButtonClick(row, 'tbody tr:last-child button i.undo');
      fixture.detectChanges();
      expect(isTriggred).toEqual(false);
    });
    it('Typing `Escape` key on an editable field of a new created entry should remove the current entry', () => {
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.rows[0].isNew = true;
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      keyevent('Escape', input);
      fixture.detectChanges();
      const { length } = fixture.nativeElement.querySelectorAll(
        'table tbody tr'
      );
      expect(length).toEqual(0);
    });
    it('Typing `Escape` key on an editable field of a new created entry should not trigger any event', () => {
      let isTriggred = false;
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.rows[0].isNew = true;
      ['remove', 'create', 'update', 'addLanguage'].forEach(evName => {
        component[evName].subscribe(() => (isTriggred = true));
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      keyevent('Escape', input);
      fixture.detectChanges();
      expect(isTriggred).toEqual(false);
    });
  });
  describe('remove', () => {
    it('Removing an entry should open a confirmation dialog', () => {
      spyOn(window, 'confirm');
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      ButtonClick(row, 'tbody tr:last-child button i.trash');
      fixture.detectChanges();
      expect(window.confirm).toHaveBeenCalled();
    });
    it('Canceling a confirmation dialog should not trigger any event', () => {
      let isTriggred = false;
      spyOn(window, 'confirm').and.returnValue(false);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.remove.subscribe(() => {
        isTriggred = true;
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      ButtonClick(row, 'tbody tr:last-child button i.trash');
      fixture.detectChanges();
      expect(window.confirm).toHaveBeenCalled();
      fixture.detectChanges();
      expect(isTriggred).toEqual(false);
    });
    it('Confirming should trigger the `remove` event', () => {
      let isTriggred = false;
      spyOn(window, 'confirm').and.returnValue(true);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.remove.subscribe(() => {
        isTriggred = true;
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      ButtonClick(row, 'tbody tr:last-child button i.trash');
      fixture.detectChanges();
      expect(window.confirm).toHaveBeenCalled();
      fixture.detectChanges();
      expect(isTriggred).toEqual(true);
    });
  });
  describe('update', () => {
    it('Clicking the `edit` button should make translations of the current row editable. The key should be kept not editable', () => {
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      ButtonClick(row, 'td:nth-child(4) button i.edit');
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelectorAll('table tbody tr input').length
      ).toEqual(2);
      expect(entries[0].key).toEqual('SENTENCE_KEY0');
    });
    it('Double clicking a row should make translations of the current row editable. The key should be kept not editable', () => {
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      const row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.querySelectorAll('table tbody tr input').length
      ).toEqual(2);
    });
    it('Typing `ctrl + enter` on an editable field Should create a new editable entry and triggers the `update`', () => {
      let isTriggered = false;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      component.update.subscribe(() => {
        isTriggered = true;
      });
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      input.value = 'NEW_KEY_ENTRY';
      input.dispatchEvent(new Event('input'));
      keyevent('CtrlEnter', input);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelectorAll('input').length).toEqual(3);
      expect(isTriggered).toEqual(true);
    });
    it('Typing `enter` on an editable entry triggers the `update` event', () => {
      let isTriggered = false;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      component.update.subscribe(() => {
        isTriggered = true;
      });
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const FirstInput = row.querySelector('input');
      FirstInput.value = 'NEW_KEY_ENTRY';
      FirstInput.dispatchEvent(new Event('input'));
      keyevent('Enter', FirstInput);
      fixture.detectChanges();
      expect(isTriggered).toEqual(true);
    });
    it('Clicking the `check` button should trigger the `update` event', () => {
      let isTriggered = false;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      component.update.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const NewRowInput = row.querySelector('input');
      NewRowInput.dispatchEvent(new Event('input'));
      ButtonClick(row, 'tbody tr:last-child button i.check');
      fixture.detectChanges();
      expect(isTriggered).toEqual(true);
    });
    it('Clicking  the `undo` button on an editable entry should undo changes', () => {
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const FirstInput = row.querySelector('input');
      FirstInput.value = 'NEW_KEY_ENTRY';
      FirstInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      ButtonClick(row, 'tbody tr:last-child button i.undo');
      fixture.detectChanges();
      expect(entries[0].en).toEqual('Translation in English');
    });
    it('Clicking the `undo` button on an editable entry should not trigger any event', () => {
      let isTriggered = false;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      ['remove', 'create', 'update', 'addLanguage'].forEach(evName => {
        component[evName].subscribe(() => (isTriggered = true));
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      ButtonClick(row, 'tbody tr:last-child button i.undo');
      fixture.detectChanges();
      expect(isTriggered).toEqual(false);
    });
    it('Typing `Escape` key on an editable field of an editable entry  should undo changes', () => {
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      fixture.detectChanges();
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      keyevent('Escape', input);
      fixture.detectChanges();
      expect(entries[0].en).toEqual('Translation in English');
    });
    it('Typing `Escape` key on an editable field of an editable entry should not trigger any event', () => {
      let isTriggered = false;
      const entries = createRows(1, lngs);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(null, entries, true)
      });
      ['remove', 'create', 'update', 'addLanguage'].forEach(evName => {
        component[evName].subscribe(() => (isTriggered = true));
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      fixture.detectChanges();
      MouseClick(row);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      keyevent('Escape', input);
      fixture.detectChanges();
      expect(isTriggered).toEqual(false);
    });
  });
  describe('Languages Test', () => {
    it('should not trigger addLanguage event if we click check button without selecting a language', () => {
      let isTriggered = false;
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY',
              fr: 'FR translation',
              en: 'EN translation'
            }
          ],
          true
        )
      });
      component.rows[0].isNew = true;
      component.addLanguage.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      //  let column = fixture.nativeElement.querySelector('div > table > thead > tr > th:nth-child(2)');
      const AddlngBtn = fixture.nativeElement.querySelector(
        'div > div > button.ui.yellow.button'
      );
      AddlngBtn.click();
      fixture.detectChanges();
      const Selector = fixture.nativeElement.querySelector(
        'div > div > sui-select'
      );
      Selector.click();
      fixture.detectChanges();
      const a = fixture.nativeElement.querySelector(
        'div > div > sui-select > div.menu.transition.hidden > sui-select-option:nth-child(1)'
      );
      a.click();
      fixture.detectChanges();
      const CheckBtn = fixture.nativeElement.querySelector(
        'div > div > button:nth-child(3)'
      );
      CheckBtn.click();
      fixture.detectChanges();
      expect(isTriggered).toEqual(false);
    });
    it('should not trigger the add language event if click undo button', () => {
      let isTriggered = false;
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.rows[0].isNew = true;
      component.addLanguage.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      //  let column = fixture.nativeElement.querySelector('div > table > thead > tr > th:nth-child(2)');
      const AddlngBtn = fixture.nativeElement.querySelector(
        'div > div > button.ui.yellow.button'
      );
      AddlngBtn.click();
      fixture.detectChanges();
      const Selector = fixture.nativeElement.querySelector(
        'div > div > sui-select'
      );
      Selector.click();
      fixture.detectChanges();
      const a = fixture.nativeElement.querySelector(
        'div > div > sui-select > div.menu.transition.hidden > sui-select-option:nth-child(1)'
      );
      a.click();
      fixture.detectChanges();
      const UndoBtn = fixture.nativeElement.querySelector(
        'div > div > button:nth-child(2)'
      );
      UndoBtn.click();
      fixture.detectChanges();
      expect(isTriggered).toEqual(false);
    });

    it('should be editable if click header', () => {
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector(
        'div > table > thead > tr > th:nth-child(2)'
      );
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(header);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const SumInputs = fixture.nativeElement.querySelectorAll('input').length;
      expect(SumInputs).toEqual(1);
    });
    it('should not be triggered or saved if click Escape', () => {
      let isTriggered = false;
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.addLanguage.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      const header = fixture.nativeElement.querySelector(
        'div > table > thead > tr > th:nth-child(2)'
      );
      let row = fixture.nativeElement.querySelector('table tbody tr');
      MouseClick(header);
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      keyevent('Escape', input);
      fixture.detectChanges();
      const SumInputs = fixture.nativeElement.querySelectorAll('input').length;
      expect(SumInputs).toEqual(0);
      expect(isTriggered).toEqual(false);
    });
    it('should trigger the remove language event if click trash button', () => {
      let isTriggered = false;
      spyOn(window, 'confirm').and.returnValue(true);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.removeLanguage.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      const TrashBtn = fixture.nativeElement.querySelector(
        'div > table > thead > tr > th:nth-child(2) > div > button:nth-child(2)'
      );
      TrashBtn.click();
      fixture.detectChanges();
      expect(window.confirm).toHaveBeenCalled();
      fixture.detectChanges();
      expect(isTriggered).toEqual(true);
    });
    it('should not trigger the remove language event if click trash button without confirm', () => {
      let isTriggered = false;
      spyOn(window, 'confirm').and.returnValue(false);
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.removeLanguage.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      const TrashBtn = fixture.nativeElement.querySelector(
        'div > table > thead > tr > th:nth-child(2) > div > button:nth-child(2)'
      );
      TrashBtn.click();
      fixture.detectChanges();
      expect(window.confirm).toHaveBeenCalled();
      fixture.detectChanges();
      expect(isTriggered).toEqual(false);
    });
    it('should trigger the update language event if click Enter', () => {
      let isTriggered = false;
      component.ngOnChanges({
        lngs: new SimpleChange(null, lngs, true),
        entries: new SimpleChange(
          null,
          [
            {
              key: 'NEW_KEY'
            }
          ],
          true
        )
      });
      component.updateLanguage.subscribe(() => {
        isTriggered = true;
      });
      fixture.detectChanges();
      let row = fixture.nativeElement.querySelector('table tbody tr');
      const UpdateBtn = fixture.nativeElement.querySelector(
        'div > table > thead > tr > th:nth-child(2) > div > button:nth-child(1)'
      );
      UpdateBtn.click();
      fixture.detectChanges();
      row = fixture.nativeElement.querySelector('table tbody tr');
      const input = row.querySelector('input');
      input.value = 'ITS NOT TIME TO MAKE A TEST JUST RELAX  TAKE IT EASY';
      input.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      keyevent('Enter', input);
      fixture.detectChanges();
      expect(input.value).toEqual(
        'ITS NOT TIME TO MAKE A TEST JUST RELAX  TAKE IT EASY'
      );
      expect(isTriggered).toEqual(true);
    });
  });
});
