import { TestBed, async } from '@angular/core/testing';

import { TestingModule, MockStore } from '@testing/utils';
import { CoreModule } from '@app/core';
import { Store } from '@ngrx/store';

import { initialState } from '@modules/toolbar/toolbar.reducer';
import { ToolbarState, State } from '@modules/toolbar/toolbar.model';
import { ToolbarComponent } from '@modules/toolbar/components/main/main.component';

import { AppComponent } from './app.component';
import { SocketIoModule } from 'ngx-socket-io';

function createState(state: ToolbarState): State {
  return {
    toolbar: initialState
  } as State;
}

describe('AppComponent', () => {
  let store: MockStore<State>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CoreModule,
        TestingModule,
        SocketIoModule.forRoot({ options: {}, url: '' })
      ],
      declarations: [AppComponent, ToolbarComponent]
    }).compileComponents();

    store = TestBed.get(Store);
    store.setState(createState(initialState));
  }));

  it('should create the app', done => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    done();
  });
});
