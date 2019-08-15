import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreModule } from '@app/core';
import { TestingModule, MockStore } from '@testing/utils';
import { Store } from '@ngrx/store';

import { SharedModule } from '@app/shared';
import { initialState as toolbarState } from '@modules/toolbar/toolbar.reducer';

import { ControllersExplorerComponent } from '../controllers-explorer/controllers-explorer.component';
import { RouterDesignerContainerComponent } from './container.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { RouteDesignerService } from '../../route-designer.service';
import { IRouteDesignerState, State } from '../../route-designer.model';
import { initialState } from '../../route-designer.reducer';

function createState(state: IRouteDesignerState): State {
  return {
    'route-designer': state,
    toolbar: toolbarState
  } as State;
}

describe('ContainerComponent', () => {
  let component: RouterDesignerContainerComponent;
  let fixture: ComponentFixture<RouterDesignerContainerComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouterDesignerContainerComponent,
        ControllersExplorerComponent,
        BreadcrumbComponent
      ],
      imports: [CoreModule, TestingModule, SharedModule],
      providers: [RouteDesignerService]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(createState(initialState));

    fixture = TestBed.createComponent(RouterDesignerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
