import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, TestingModule } from '@testing/utils';
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

describe('ContainerComponent', () => {
  let component: ContainerComponent;
  let fixture: ComponentFixture<ContainerComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MetaComponent,
        ContainerComponent,
        DependenciesComponent,
        DependencyItemComponent
      ],
      imports: [CoreModule, TestingModule, SharedModule],
      providers: [ManifestEditorService]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(createState(initialState));

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
