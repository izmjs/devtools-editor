import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule, MockStore } from '@testing/utils';
import { SuiSelectModule } from 'ng2-semantic-ui';

import { CoreModule } from '@app/core';

import { State, ToolbarState } from '../../toolbar.model';
import { ToolbarService } from '../../toolbar.service';
import { ToolbarComponent } from './main.component';
import { Store } from '@ngrx/store';

function createState(toolbarState: ToolbarState): State {
  return {
    toolbar: toolbarState
  } as State;
}

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [CoreModule, TestingModule, SuiSelectModule],
      providers: [ToolbarService]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(
      createState({
        namespaces: {
          error: null,
          loading: false,
          list: []
        },
        restart: {
          error: null,
          loading: false
        }
      })
    );

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
