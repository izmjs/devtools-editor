import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { ConfigEditorService } from './config-editor.service';
import {
  actionFetchConfig,
  actionFetchConfigError,
  actionFetchConfigSuccess,
  actionEditItemSuccess,
  actionClearItem,
  actionClearItemSuccess,
  actionClearItemError,
  actionEditItem,
  actionEditSettings,
  actionEditItemError
} from '@app/modules/config-editor/config-editor.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContainerComponent } from './components/container/container.component';

@Injectable()
export class ConfigEditorEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: ConfigEditorService,
    private dialog: MatDialog,
  ) {}

  retrieve = createEffect(
    () => this.actions$.pipe(
      ofType(actionFetchConfig),
      switchMap(() =>
        this.service.fetch().pipe(
          map(data => actionFetchConfigSuccess({payload: data})),
          catchError(error => of(actionFetchConfigError({ payload: error })))
        )
      )
    )
  );

  setItems = createEffect(
    () => this.actions$.pipe(
      ofType(actionEditItem),
      switchMap((action) =>
        this.service.set(action.payload).pipe(
          map(() => actionEditItemSuccess()),
          catchError(error => of(actionEditItemError({payload: error})))
        )
      )
    )
  );

  clearItems = createEffect(
    () => this.actions$.pipe(
      ofType(actionClearItem),
      switchMap((action) =>
        this.service.set(action.payload).pipe(
          map(() => actionClearItemSuccess()),
          catchError(error => of(actionClearItemError({payload: error})))
        )
      )
    )
  );

  editSettings = createEffect(
    () => this.actions$.pipe(
      ofType(actionEditSettings),
      tap(() =>
        this.dialog.open(ContainerComponent, {
          width: '60%',
          height: '500px'
        })
      )
    ),
    { dispatch: false }
  );
}
