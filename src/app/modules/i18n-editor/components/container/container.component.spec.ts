import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { I18NContainerComponent } from './container.component';
import { I18nComponent } from '../main/main.component';
import { I18NService } from '../../i18n.service';
import { II18NState, State } from '../../i18n.model';

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

describe('I18N editor main container', () => {
  let component: I18NContainerComponent;
  let fixture: ComponentFixture<I18NContainerComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [I18NContainerComponent, I18nComponent],
      imports: [RouterModule.forRoot([]), CoreModule, SharedModule],
      providers: [
        I18NService,
        provideMockStore({
          initialState: createState({
            entries: [],
            error: null,
            lngs: [],
            loading: false
          })
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(I18NContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
