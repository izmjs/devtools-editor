import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  tap,
  map,
  delay,
  switchMap,
  catchError,
  withLatestFrom,
} from 'rxjs/operators';
import { ToolbarService } from './toolbar.service';
import {
  ActionEditFile,
  ActionEditProject,
  ActionServerCheck,
  ToolbarActionTypes,
  ActionServerRestart,
  ActionServerStarted,
  ActionGenerateModule,
  ActionServerRestartError,
  ActionRetrieveNamespaces,
  ActionGenerateModuleError,
  ActionSetCurrentNamespace,
  ActionGenerateModuleSuccess,
  ActionRetrieveNamespacesError,
  ActionRetrieveNamespacesSuccess,
} from './toolbar.actions';
import { State, INamespace } from './toolbar.model';
import { LocalStorageService, NotificationService } from '@app/core';
import { selectCurrentNamespace } from './toolbar.selectors';
import { MatDialog } from '@angular/material';
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
    private notificationsService: NotificationService,
  ) {}

  @Effect()
  retrieveNamespaces = this.actions$.pipe(
    ofType(ToolbarActionTypes.RETRIEVE_NAMESPACES),
    withLatestFrom(this.store.select(selectCurrentNamespace)),
    switchMap(([action, ns]: [ActionRetrieveNamespaces, INamespace]) =>
      this.service.namespaces().pipe(
        map(data => {
          if (Array.isArray(data) && data.length > 0) {
            const key = this.localStorage.getItem(CURRENT_NAMESPACE_KEY);
            const found = data.find(one => one.key === key);

            if(!found || !ns || found.key !== ns.key) {
              this.store.dispatch(
                new ActionSetCurrentNamespace(found || data[0])
              );
            }
          }
          return new ActionRetrieveNamespacesSuccess(data);
        }),
        catchError(error => of(new ActionRetrieveNamespacesError(error)))
      )
    )
  );

  @Effect()
  restartServer = this.actions$.pipe(
    ofType(ToolbarActionTypes.SERVER_RESTART),
    switchMap((action: ActionServerRestart) =>
      this.service.restartServer().pipe(
        delay(1000),
        map(() => new ActionServerCheck()),
        catchError(error => of(new ActionServerRestartError(error)))
      )
    )
  );

  @Effect()
  checkServer = this.actions$.pipe(
    ofType(ToolbarActionTypes.SERVER_CHECK),
    switchMap((action: ActionServerCheck) =>
      this.service.checkServer().pipe(map(() => new ActionServerStarted()))
    )
  );

  @Effect({ dispatch: false })
  editProject = this.actions$.pipe(
    ofType(ToolbarActionTypes.EDIT_PROJECT),
    switchMap((action: ActionEditProject) =>
      this.service.editProject().pipe(
        catchError(() => {
          // Do nothing
          return of(true);
        })
      )
    )
  );

  @Effect({ dispatch: false })
  saveNamespace = this.actions$.pipe(
    ofType(ToolbarActionTypes.SET_CURRENT_NAMESPACE),
    tap((action: ActionSetCurrentNamespace) =>
      this.localStorage.setItem(CURRENT_NAMESPACE_KEY, action.payload.key)
    )
  );

  @Effect({ dispatch: false })
  editFile = this.actions$.pipe(
    ofType(ToolbarActionTypes.EDIT_FILE),
    withLatestFrom(this.store.select(selectCurrentNamespace)),
    tap(([action, ns]: [ActionEditFile, INamespace]) =>
      this.service.editFile(action.payload, ns.key).subscribe()
    )
  );

  @Effect({})
  generateModule = this.actions$.pipe(
    ofType(ToolbarActionTypes.GENERATE_MODULE),
    switchMap((action: ActionGenerateModule) =>
      this.service.generateModule(action.payload).pipe(
        map(() => new ActionGenerateModuleSuccess()),
        catchError(error => of(new ActionGenerateModuleError(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  editSettings = this.actions$.pipe(
    ofType(ToolbarActionTypes.ADD_MODULE),
    tap(() =>
      this.dialog.open(GenerateModuleComponent, {
        width: '350px',
      })
    )
  );

  @Effect({ dispatch: false })
  moduleGenerated = this.actions$.pipe(
    ofType(ToolbarActionTypes.GENERATE_MODULE_SUCCESS),
    tap(() =>
      this.notificationsService.info('The generation of the module is in progress.')
    )
  );
}
