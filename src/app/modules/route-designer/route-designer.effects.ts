import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { asyncScheduler, of } from 'rxjs';

import {
  map,
  filter,
  switchMap,
  catchError,
  withLatestFrom,
  distinctUntilChanged
} from 'rxjs/operators';
import {
  ActionLoadItem,
  ActionLoadItemSuccess,
  ActionLoadItemError,
  RouteDesignerActionTypes
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

  @Effect()
  retrieve = this.actions$.pipe(
    ofType(RouteDesignerActionTypes.ACTION_LOAD_ITEM),
    withLatestFrom(this.store.select(selectCurrentNamespace)),
    filter(([action, ns]: [ActionLoadItem, INamespace]) => ns && !!ns.key),
    switchMap(([action, ns]: [ActionLoadItem, INamespace]) =>
      this.service
        .getContent(
          action.payload ? action.payload.path : '',
          ns.key
        )
        .pipe(
          map(list => new ActionLoadItemSuccess({ list, current: action.payload })),
          catchError(error => of(new ActionLoadItemError(error)))
        )
    )
  );
}
