import { of } from 'rxjs';
import { Action, select, Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, tap, withLatestFrom, filter } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { HomeService } from './home.service';
import {
  actionLoadCollections,
  actionLoadCollectionsError,
  actionLoadCollectionsSuccess,
  actionSetCurrentCollection,
  actionSyncCurrentCollectionSuccess,
  actionSyncCurrentCollection,
  actionSyncCurrentCollectionError,
} from './home.actions';
import { LocalStorageService } from '@app/core';
import { State } from './home.model';
import { selectHomeState, selectCurrentCollection } from './selectors';
import { MatDialog } from '@angular/material';
import { PostmanKeyComponent } from './components/postman-key/postman-key.component';
import { actionServerRestart } from '../toolbar/toolbar.actions';

export const HOME_KEY = 'HOME.COLLECTIONS';

@Injectable()
export class HomeEffects {
  constructor(
    private readonly localStorage: LocalStorageService,
    private readonly actions$: Actions<Action>,
    private readonly service: HomeService,
    private readonly store: Store<State>,
    private readonly dialog: MatDialog,
  ) {}

  loadCollections = createEffect(
    () => this.actions$.pipe(
      ofType(actionLoadCollections),
      switchMap((action) =>
        this.service.fetchCollections().pipe(
          map((data) => actionLoadCollectionsSuccess({ payload: data })),
          catchError(error => of(actionLoadCollectionsError({ payload: error })))
        )
      )
    )
  );

  syncCurrentCollection = createEffect(
    () => this.actions$.pipe(
      ofType(actionSyncCurrentCollection),
      withLatestFrom(this.store.select(selectCurrentCollection)),
      filter(([action, current]) => Boolean(current)),
      switchMap(([action, current]) => {
        return this.service.syncCollection(current).pipe(
          map((data) => actionSyncCurrentCollectionSuccess()),
          catchError(error => of(actionSyncCurrentCollectionError({ payload: error })))
        )
      })
    )
  );

  setCurrentCollection = createEffect(
    () => this.actions$.pipe(
      ofType(
        actionSetCurrentCollection,
        actionLoadCollectionsSuccess,
      ),
      withLatestFrom(this.store.select(selectHomeState)),
      tap(([action, { collections: { current, list } }]) => {
        this.localStorage.setItem(HOME_KEY, { current, list })
      })
    ),
    { dispatch: false }
  );

  onError = createEffect(
    () => this.actions$.pipe(
      ofType(
        actionLoadCollectionsError,
        actionSyncCurrentCollectionError,
      ),
      tap((action) => {
        if(action.payload.status === 400) {
          this.dialog.open(PostmanKeyComponent, {
            width: '390px',
          }).afterClosed().pipe(
            filter(key => Boolean(key)),
            switchMap((key) => this.service.setPostmanKey(key).pipe(
              map(() => this.store.dispatch(actionServerRestart()))
            ))
          ).subscribe();
        }
      })
    ),
    { dispatch: false }
  );
}
