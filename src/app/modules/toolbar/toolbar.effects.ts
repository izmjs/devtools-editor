import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  tap,
  map,
  delay,
  switchMap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';
import { ToolbarService } from './toolbar.service';
import {
  actionEditFile,
  actionAddModule,
  actionServerCheck,
  actionServerRestart,
  actionServerStarted,
  actionGenerateModule,
  actionServerRestartError,
  actionRetrieveNamespaces,
  actionGenerateModuleError,
  actionSetCurrentNamespace,
  actionGenerateModuleSuccess,
  actionRetrieveNamespacesError,
  actionRetrieveNamespacesSuccess,
  actionEditProject
} from './toolbar.actions';
import { State, INamespace } from './toolbar.model';
import { LocalStorageService, NotificationService } from '@app/core';
import { selectCurrentNamespace } from './toolbar.selectors';
import { MatDialog } from '@angular/material/dialog';
import { GenerateModuleComponent } from './components/generate-module/generate-module.component';

export const CURRENT_NAMESPACE_KEY = 'CURRENT_NS';

@Injectable()
export class ToolbarEffects {
  constructor(
    private dialog: MatDialog,
    private store: Store<State>,
    private service: ToolbarService,
    private actions$: Actions<Action>,
    private localStorage: LocalStorageService,
    private notificationsService: NotificationService
  ) {}

  retrieveNamespaces = createEffect(() =>
    this.actions$.pipe(
      ofType(actionRetrieveNamespaces),
      withLatestFrom(this.store.select(selectCurrentNamespace)),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.namespaces().pipe(
          map(data => {
            if (Array.isArray(data) && data.length > 0) {
              const key = this.localStorage.getItem(CURRENT_NAMESPACE_KEY);
              const found = data.find(one => one.key === key);

              if (!found || !ns || found.key !== ns.key) {
                this.store.dispatch(
                  actionSetCurrentNamespace({ payload: found || data[0] })
                );
              }
            }
            return actionRetrieveNamespacesSuccess({ payload: data });
          }),
          catchError(error =>
            of(actionRetrieveNamespacesError({ payload: error }))
          )
        )
      )
    )
  );

  restartServer = createEffect(() =>
    this.actions$.pipe(
      ofType(actionServerRestart),
      switchMap(() =>
        this.service.restartServer().pipe(
          delay(1000),
          map(() => actionServerCheck()),
          catchError(error => of(actionServerRestartError(error)))
        )
      )
    )
  );

  checkServer = createEffect(() =>
    this.actions$.pipe(
      ofType(actionServerCheck),
      switchMap(() =>
        this.service.checkServer().pipe(map(() => actionServerStarted()))
      )
    )
  );

  editProject = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionEditProject),
        switchMap(() =>
          this.service.editProject().pipe(
            catchError(() => {
              // Do nothing
              return of(true);
            })
          )
        )
      ),
    { dispatch: false }
  );

  saveNamespace = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionSetCurrentNamespace),
        tap(action =>
          this.localStorage.setItem(CURRENT_NAMESPACE_KEY, action.payload.key)
        )
      ),
    { dispatch: false }
  );

  editFile = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionEditFile),
        withLatestFrom(this.store.select(selectCurrentNamespace)),
        tap(([action, ns]: [any, INamespace]) =>
          this.service.editFile(action.payload, ns.key).subscribe()
        )
      ),
    { dispatch: false }
  );

  generateModule = createEffect(() =>
    this.actions$.pipe(
      ofType(actionGenerateModule),
      switchMap((action: any) =>
        this.service.generateModule(action.payload).pipe(
          map(() => actionGenerateModuleSuccess()),
          catchError(error => of(actionGenerateModuleError({ payload: error })))
        )
      )
    )
  );

  editSettings = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionAddModule),
        tap(() =>
          this.dialog.open(GenerateModuleComponent, {
            width: '350px'
          })
        )
      ),
    { dispatch: false }
  );

  moduleGenerated = createEffect(
    () =>
      this.actions$.pipe(
        ofType(actionGenerateModuleSuccess),
        tap(() =>
          this.notificationsService.info(
            'The generation of the module is in progress.'
          )
        )
      ),
    { dispatch: false }
  );
}
