import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ConfigEditorService } from './config-editor.service';
import {
  ActionFetchConfigError,
  ConfigEditorActionTypes,
  ActionFetchConfigSuccess,
  ActionEditItem,
  ActionEditItemSuccess,
  ActionEditItemError,
  ActionClearItem,
  ActionClearItemSuccess,
  ActionClearItemError,
  ActionFetchConfig
} from '@app/modules/config-editor/config-editor.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ContainerComponent } from './components/container/container.component';

@Injectable()
export class ConfigEditorEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: ConfigEditorService,
    private dialog: MatDialog,
  ) {}

  @Effect()
  retrieve = this.actions$.pipe(
    ofType(ConfigEditorActionTypes.ACTION_FETCH_CONFIG),
    switchMap(() =>
      this.service.fetch().pipe(
        map(data => new ActionFetchConfigSuccess(data)),
        catchError(error => of(new ActionFetchConfigError(error)))
      )
    )
  );

  @Effect()
  setItems = this.actions$.pipe(
    ofType(ConfigEditorActionTypes.ACTION_EDIT_SETTINGS_ITEM),
    switchMap((action: ActionEditItem) =>
      this.service.set(action.payload).pipe(
        map(() => new ActionEditItemSuccess()),
        catchError(error => of(new ActionEditItemError(error)))
      )
    )
  );

  @Effect()
  clearItems = this.actions$.pipe(
    ofType(ConfigEditorActionTypes.ACTION_CLEAR_SETTINGS_ITEM),
    switchMap((action: ActionClearItem) =>
      this.service.set(action.payload).pipe(
        map(() => new ActionClearItemSuccess()),
        catchError(error => of(new ActionClearItemError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  editSettings = this.actions$.pipe(
    ofType(ConfigEditorActionTypes.EDIT_SETTINGS),
    tap(() =>
      this.dialog.open(ContainerComponent, {
        width: '60%',
        height: '500px'
      })
    )
  );
}
