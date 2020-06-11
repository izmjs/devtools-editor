import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

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
  actionEditItemError,
  actionEditSharedSettings
} from '@app/modules/config-editor/config-editor.actions';
import {
  switchMap,
  map,
  catchError,
  tap,
  withLatestFrom,
  distinctUntilChanged
} from 'rxjs/operators';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ContainerComponent } from './components/container/container.component';
import { State } from '../toolbar/toolbar.model';
import {
  selectSharedSettingsValue,
  selectBaseUrl,
  selectConfigEditorState
} from './config-editor.selectors';
import { LocalStorageService } from '@app/core';

export const CONFIG_EDITOR_KEY = 'CONFIG-EDITOR';

@Injectable()
export class ConfigEditorEffects {
  constructor(
    private readonly actions$: Actions<Action>,
    private readonly service: ConfigEditorService,
    private readonly store: Store<State>,
    private readonly storage: LocalStorageService,
    private readonly dialog: MatDialog
  ) {}

  retrieve = createEffect(() =>
    this.actions$.pipe(
      ofType(actionFetchConfig),
      switchMap(() =>
        this.service.fetch().pipe(
          map(data => actionFetchConfigSuccess({ payload: data })),
          catchError(error => of(actionFetchConfigError({ payload: error })))
        )
      )
    )
  );

  setItems = createEffect(() =>
    this.actions$.pipe(
      ofType(actionEditItem),
      switchMap(action =>
        this.service.set(action.payload).pipe(
          map(data => {
            this.store.dispatch(actionFetchConfigSuccess({ payload: data }));
            return actionEditItemSuccess();
          }),
          catchError(error => of(actionEditItemError({ payload: error })))
        )
      )
    )
  );

  clearItems = createEffect(() =>
    this.actions$.pipe(
      ofType(actionClearItem),
      switchMap(action =>
        this.service.set(action.payload).pipe(
          map(data => {
            this.store.dispatch(actionClearItemSuccess());
            return actionFetchConfigSuccess({ payload: data });
          }),
          catchError(error => of(actionClearItemError({ payload: error })))
        )
      )
    )
  );

  editSettings = createEffect(
    () =>
      this.actions$.pipe(
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

  editSharedSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFetchConfigSuccess),
        withLatestFrom(
          this.store.pipe(
            select(selectSharedSettingsValue),
            distinctUntilChanged()
          )
        ),
        tap(([action, value]) => {
          this.store.dispatch(actionEditSharedSettings({ payload: value }));
        })
      ),
    { dispatch: false }
  );

  persistConfig = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionFetchConfigSuccess, actionEditSharedSettings),
        withLatestFrom(this.store.pipe(select(selectConfigEditorState))),
        tap(([action, state]) => this.storage.setItem(CONFIG_EDITOR_KEY, state))
      ),
    { dispatch: false }
  );
}
