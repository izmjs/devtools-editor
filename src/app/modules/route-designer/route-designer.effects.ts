import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { of } from 'rxjs';

import {
  map,
  filter,
  switchMap,
  catchError,
  withLatestFrom
} from 'rxjs/operators';
import {
  actionLoadItem,
  actionLoadItemSuccess,
  actionLoadItemError
} from './route-designer.actions';
import { RouteDesignerService } from './route-designer.service';
import { State } from './route-designer.model';
import { selectCurrentNamespace } from '@modules/toolbar/toolbar.selectors';
import { INamespace } from '@modules/toolbar/toolbar.model';

@Injectable()
export class RouteDesignerEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private service: RouteDesignerService
  ) {}

  retrieve = createEffect(() =>
    this.actions$.pipe(
      ofType(actionLoadItem),
      withLatestFrom(this.store.select(selectCurrentNamespace)),
      filter(([action, ns]: [any, INamespace]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service
          .getContent(action.payload ? action.payload.path : '', ns.key)
          .pipe(
            map(list =>
              actionLoadItemSuccess({
                payload: { list, current: action.payload }
              })
            ),
            catchError(error => of(actionLoadItemError({ payload: error })))
          )
      )
    )
  );
}
