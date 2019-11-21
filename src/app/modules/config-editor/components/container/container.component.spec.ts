import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';

import { State, IConfigEditorState } from '../../config-editor.model';
import { ConfigEditorService } from '../../config-editor.service';
import { ContainerComponent } from './container.component';
import { FieldComponent } from '../field/field.component';
import { AsTitlePipe } from '../../pipes/as-title.pipe';
import { MainComponent } from '../main/main.component';

function createState(state: IConfigEditorState): State {
  return {
    'config-editor': state,
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
        AsTitlePipe,
        MainComponent,
        FieldComponent,
        ContainerComponent
      ],
      imports: [
        CoreModule,
        SharedModule,
      ],
      providers: [
        provideMockStore({
          initialState: createState({
            loading: false,
            error: null,
            config: []
          })
        }),
        ConfigEditorService,
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);

    fixture = TestBed.createComponent(ContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
