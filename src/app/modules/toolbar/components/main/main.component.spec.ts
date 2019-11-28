import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { SuiSelectModule } from 'ng2-semantic-ui';
import { SocketIoModule } from 'ngx-socket-io';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { State, ToolbarState } from '../../toolbar.model';
import { ToolbarService } from '../../toolbar.service';
import { ToolbarComponent } from './main.component';

function createState(toolbarState: ToolbarState): State {
  return {
    toolbar: toolbarState
  } as State;
}

describe('Toolbar main container', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      imports: [
        CoreModule,
        SharedModule,
        SuiSelectModule,
        RouterModule.forRoot([]),
        SocketIoModule.forRoot({ options: {}, url: '' })
      ],
      providers: [
        ToolbarService,
        provideMockStore({
          initialState: createState({
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
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
