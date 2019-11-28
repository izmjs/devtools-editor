import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CoreModule } from '@app/core';
import { Store } from '@ngrx/store';

import { initialState as toolbarState } from '@modules/toolbar/toolbar.reducer';
import { SharedModule } from '@app/shared';

import { ControllersExplorerComponent } from '../controllers-explorer/controllers-explorer.component';
import { RouterDesignerContainerComponent } from './container.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { IRouteDesignerState, State } from '../../route-designer.model';
import { RouteDesignerService } from '../../route-designer.service';
import { initialState } from '../../route-designer.reducer';
import { RouterModule } from '@angular/router';

function createState(state: IRouteDesignerState): State {
  return {
    'route-designer': state,
    toolbar: toolbarState
  } as State;
}

describe('Route designer main container', () => {
  let component: RouterDesignerContainerComponent;
  let fixture: ComponentFixture<RouterDesignerContainerComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RouterDesignerContainerComponent,
        ControllersExplorerComponent,
        BreadcrumbComponent
      ],
      imports: [RouterModule.forRoot([]), CoreModule, SharedModule],
      providers: [
        RouteDesignerService,
        provideMockStore({
          initialState: createState(initialState)
        })
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    fixture = TestBed.createComponent(RouterDesignerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
