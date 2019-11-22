import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';

import { ManifestEditorService } from './manifest-editor.service';
import {
  actionLoadMetadata,
  actionLoadMetadataSuccess,
  actionLoadMetadataError,
  actionSaveMetadata,
  actionListInstalled,
  actionListInstalledSuccess,
  actionListInstalledError,
  actionSearchModule,
  actionSearchModuleSuccess,
  actionSearchModuleError,
  actionInstallModule,
  actionInstallModuleSuccess,
  actionInstallModuleError
} from './manifest-editor.actions';
import {
  withLatestFrom,
  filter,
  switchMap,
  map,
  catchError,
  tap
} from 'rxjs/operators';
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

  meta = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLoadMetadata),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.meta(ns.key).pipe(
          map(data => actionLoadMetadataSuccess({ payload: data })),
          catchError(error => of(actionLoadMetadataError({ payload: error })))
        )
      )
    )
  );

  saveMeta = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSaveMetadata),
        withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
        filter(([action, ns]) => ns && !!ns.key),
        tap(([action, ns]: [any, INamespace]) => {
          this.service.saveMeta(action.payload, ns.key).subscribe();
        })
      ),
    { dispatch: false }
  );

  getInstalled = createEffect(() =>
    this.actions$.pipe(
      ofType(actionListInstalled),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.installed(action.payload, ns.key).pipe(
          map(data => actionListInstalledSuccess({ payload: data })),
          catchError(error => of(actionListInstalledError({ payload: error })))
        )
      )
    )
  );

  searchModule = createEffect(() =>
    this.actions$.pipe(
      ofType(actionSearchModule),
      switchMap((action: any) =>
        this.service.search(action.payload, {}).pipe(
          map(data => actionSearchModuleSuccess({ payload: data })),
          catchError(error => of(actionSearchModuleError({ payload: error })))
        )
      )
    )
  );

  installModule = createEffect(() =>
    this.actions$.pipe(
      ofType(actionInstallModule),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.install(action.payload, ns.key).pipe(
          map(() => actionInstallModuleSuccess()),
          catchError(error => of(actionInstallModuleError({ payload: error })))
        )
      )
    )
  );
}
