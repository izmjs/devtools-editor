import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, TestingModule } from '@testing/utils';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { GenerateModuleComponent } from './generate-module.component';
import { State, ToolbarState } from '../../toolbar.model';
import { ToolbarService } from '../../toolbar.service';

function createState(state: ToolbarState): State {
  return {
    toolbar: state
  } as State;
}

describe('GenerateModuleComponent', () => {
  let component: GenerateModuleComponent;
  let fixture: ComponentFixture<GenerateModuleComponent>;
  let store: MockStore<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateModuleComponent],
      imports: [CoreModule, TestingModule, SharedModule],
      providers: [
        ToolbarService,
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    store.setState(
      createState({
        namespaces: {
          current: null,
          list: [],
          error: null,
          loading: false
        },
        restart: {
          error: null,
          loading: false
        }
      })
    );

    fixture = TestBed.createComponent(GenerateModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
