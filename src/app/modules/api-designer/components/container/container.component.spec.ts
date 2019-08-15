import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, TestingModule } from '@testing/utils';
import { Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { State, IApiDesignerState } from '../../api-designer.model';
import { ApiDesignerService } from '../../api-designer.service';
import { ContainerComponent } from './container.component';

function createState(state: IApiDesignerState): State {
  return {
    'api-designer': state
  } as State;
}

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContainerComponent],
      imports: [CoreModule, TestingModule, SharedModule],
      providers: [ApiDesignerService]
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
