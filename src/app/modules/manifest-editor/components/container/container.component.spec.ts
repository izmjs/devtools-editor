import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { State, IManifestEditorState } from '../../manifest-editor.model';
import { ManifestEditorService } from '../../manifest-editor.service';
import { ContainerComponent } from './container.component';
import { initialState } from '../../manifest-editor.reducer';
import { MetaComponent } from '../meta/meta.component';
import { DependenciesComponent } from '../dependencies/dependencies.component';
import { DependencyItemComponent } from '../dependency-item/dependency-item.component';
import { RouterModule } from '@angular/router';

function createState(state: IManifestEditorState): State {
  return {
    'manifest-editor': state,
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

describe('Manifest editor main container', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let store: MockStore<State>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        MetaComponent,
        ContainerComponent,
        DependenciesComponent,
        DependencyItemComponent
      ],
      imports: [RouterModule.forRoot([]), CoreModule, SharedModule],
      providers: [
        ManifestEditorService,
        provideMockStore({
          initialState: createState(initialState)
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
