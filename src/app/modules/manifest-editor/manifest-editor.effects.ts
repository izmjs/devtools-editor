import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import { ManifestEditorService } from './manifest-editor.service';
import { ManifestEditorActionTypes, ActionLoadMetadata, ActionLoadMetadataSuccess, ActionLoadMetadataError, ActionSaveMetadata, ActionListInstalled, ActionListInstalledSuccess, ActionListInstalledError, ActionSearchModule, ActionSearchModuleSuccess, ActionSearchModuleError, ActionInstallModule, ActionInstallModuleSuccess, ActionInstallModuleError } from './manifest-editor.actions';
import { withLatestFrom, filter, switchMap, map, catchError, tap } from 'rxjs/operators';
import { State } from './manifest-editor.model';
import { selectCurrentNamespace } from '@modules/toolbar/toolbar.selectors';
import { INamespace } from '@modules/toolbar/toolbar.model';
import { of } from 'rxjs';

@Injectable()
export class ManifestEditorEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private service: ManifestEditorService
  ) {}

  meta = createEffect(
    () => this.actions$.pipe(
      ofType(ManifestEditorActionTypes.ACTION_LOAD_METADATA),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [ActionLoadMetadata, INamespace]) =>
        this.service.meta(ns.key).pipe(
          map(data => new ActionLoadMetadataSuccess(data)),
          catchError(error => of(new ActionLoadMetadataError(error)))
        )
      )
    )
  );

  saveMeta = createEffect(
    () => this.actions$.pipe(
      ofType(ManifestEditorActionTypes.ACTION_SAVE_METADATA),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      tap(([action, ns]: [ActionSaveMetadata, INamespace]) => {
        this.service.saveMeta(action.payload, ns.key).subscribe();
      })
    ),
    { dispatch: false }
  );

  getInstalled = createEffect(
    () => this.actions$.pipe(
      ofType(ManifestEditorActionTypes.ACTION_LIST_INSTALLED),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [ActionListInstalled, INamespace]) =>
        this.service.installed(action.payload, ns.key).pipe(
          map(data => new ActionListInstalledSuccess(data)),
          catchError(error => of(new ActionListInstalledError(error)))
        )
      )
    )
  );

  searchModule = createEffect(
    () => this.actions$.pipe(
      ofType(ManifestEditorActionTypes.ACTION_SEACH_MODULE),
      switchMap((action: ActionSearchModule) =>
        this.service.search(action.payload, {}).pipe(
          map(data => new ActionSearchModuleSuccess(data)),
          catchError(error => of(new ActionSearchModuleError(error)))
        )
      )
    )
  );

  installModule = createEffect(
    () => this.actions$.pipe(
      ofType(ManifestEditorActionTypes.ACTION_INSTALL_MODULE),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [ActionInstallModule, INamespace]) =>
        this.service.install(action.payload, ns.key).pipe(
          map(() => new ActionInstallModuleSuccess()),
          catchError(error => of(new ActionInstallModuleError(error)))
        )
      )
    )
  );
}
