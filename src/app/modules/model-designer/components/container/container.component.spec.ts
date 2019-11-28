import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { State, IModelDesignerState } from '../../model-designer.model';
import { ModelDesignerService } from '../../model-designer.service';
import { ContainerComponent } from './container.component';
import { RouterModule } from '@angular/router';

function createState(state: IModelDesignerState): State {
  return {
    'model-designer': state
  } as State;
}

describe('Model designer main container', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports: [RouterModule.forRoot([]), CoreModule, SharedModule],
      providers: [
        ModelDesignerService,
        provideMockStore({
          initialState: createState({
            loading: false
          })
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
