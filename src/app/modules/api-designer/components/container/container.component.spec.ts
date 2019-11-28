import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { State, IApiDesignerState } from '../../api-designer.model';
import { ContainerComponent } from './container.component';
import { ApiDesignerService } from '../../api-designer.service';

function createState(state: IApiDesignerState): State {
  return {
    'api-designer': state
  } as State;
}

describe('API designer main container', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports: [CoreModule, SharedModule, RouterModule.forRoot([])],
      providers: [
        ApiDesignerService,
        provideMockStore({
          initialState: createState({
            loading: false
          })
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(
      createState({
        loading: false
      })
    );

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
