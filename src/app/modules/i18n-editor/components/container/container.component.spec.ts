import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { I18NContainerComponent } from './container.component';
import { CoreModule } from '@app/core';
import { TestingModule, MockStore } from '@testing/utils';
import { I18nComponent } from '../main/main.component';
import { I18NService } from '../../i18n.service';
import { II18NState, State } from '../../i18n.model';
import { Store } from '@ngrx/store';
import { SharedModule } from '@app/shared';

function createState(i18nState: II18NState): State {
  return {
    i18n: i18nState,
    toolbar: {
      namespaces: {
        current: null,
        list: [],
        error: null,
        loading: false
      }
    }
  } as State;
}

describe('I18NContainerComponent', () => {
  let component: I18NContainerComponent;
  let fixture: ComponentFixture<I18NContainerComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [I18NContainerComponent, I18nComponent],
      imports: [CoreModule, TestingModule, SharedModule],
      providers: [I18NService]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(
      createState({
        entries: [],
        error: null,
        lngs: [],
        loading: false
      })
    );

    fixture = TestBed.createComponent(I18NContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
