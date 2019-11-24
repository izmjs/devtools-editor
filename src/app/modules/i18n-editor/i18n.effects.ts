import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import {
  actionI18NAddLanguage,
  actionI18NRemoveEntries,
  actionI18NRemoveLanguages,
  actionI18NRetrieve,
  actionI18NRetrieveError,
  actionI18NRetrieveSuccess,
  actionI18NUpdateEntries,
  actionI18NUpdateEntry
} from './i18n.actions';
import { I18NService } from './i18n.service';
import { State } from './i18n.model';
import { selectCurrentNamespace } from '@modules/toolbar/toolbar.selectors';
import { INamespace } from '@modules/toolbar/toolbar.model';

@Injectable()
export class I18NEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private service: I18NService
  ) {}

  retrieve = createEffect(() =>
    this.actions$.pipe(
      ofType(actionI18NRetrieve),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [Action, INamespace]) =>
        this.service.retrieve(ns.key).pipe(
          map(data => actionI18NRetrieveSuccess({ payload: data })),
          catchError(error => of(actionI18NRetrieveError({ payload: error })))
        )
      )
    )
  );

  removeLanguages = createEffect(() =>
    this.actions$.pipe(
      ofType(actionI18NRemoveLanguages),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.removeLanguages(action.payload, ns.key).pipe(
          map(() => actionI18NRetrieve()),
          catchError(error => of(actionI18NRetrieveError({ payload: error })))
        )
      )
    )
  );

  removeEntries = createEffect(() =>
    this.actions$.pipe(
      ofType(actionI18NRemoveEntries),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.remove(action.payload, ns.key).pipe(
          map(() => actionI18NRetrieve()),
          catchError(error => of(actionI18NRetrieveError({ payload: error })))
        )
      )
    )
  );

  updateEntry = createEffect(() =>
    this.actions$.pipe(
      ofType(actionI18NUpdateEntry, actionI18NUpdateEntries),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.set(action.payload, ns.key).pipe(
          map(() => actionI18NRetrieve()),
          catchError(error => of(actionI18NRetrieveError({ payload: error })))
        )
      )
    )
  );

  addLanguage = createEffect(() =>
    this.actions$.pipe(
      ofType(actionI18NAddLanguage),
      withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
      filter(([action, ns]) => ns && !!ns.key),
      switchMap(([action, ns]: [any, INamespace]) =>
        this.service.translate(action.payload.key, ns.key).pipe(
          map(() => actionI18NRetrieve()),
          catchError(error => of(actionI18NRetrieveError({ payload: error })))
        )
      )
    )
  );
}
