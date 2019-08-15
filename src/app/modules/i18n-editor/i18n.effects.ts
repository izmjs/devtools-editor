import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import {
  switchMap,
  map,
  catchError,
  withLatestFrom,
  filter
} from 'rxjs/operators';
import {
  I18NActionTypes,
  ActionI18NRetrieve,
  ActionI18NRetrieveSuccess,
  ActionI18NRetrieveError,
  ActionI18NRemoveLanguages,
  ActionI18NRemoveEntries,
  ActionI18NUpdateEntry,
  ActionI18NUpdateEntries,
  ActionI18NAddLanguage
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

  @Effect()
  retrieve = this.actions$.pipe(
    ofType(I18NActionTypes.RETRIEVE_LIST),
    withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
    filter(([action, ns]) => ns && !!ns.key),
    switchMap(([action, ns]: [ActionI18NRetrieve, INamespace]) =>
      this.service.retrieve(ns.key).pipe(
        map(data => new ActionI18NRetrieveSuccess(data)),
        catchError(error => of(new ActionI18NRetrieveError(error)))
      )
    )
  );

  @Effect()
  removeLanguages = this.actions$.pipe(
    ofType(I18NActionTypes.REMOVE_LANGUAGES),
    withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
    filter(([action, ns]) => ns && !!ns.key),
    switchMap(([action, ns]: [ActionI18NRemoveLanguages, INamespace]) =>
      this.service.removeLanguages(action.payload, ns.key).pipe(
        map(() => new ActionI18NRetrieve()),
        catchError(error => of(new ActionI18NRetrieveError(error)))
      )
    )
  );

  @Effect()
  removeEntries = this.actions$.pipe(
    ofType(I18NActionTypes.REMOVE_ENTRIES),
    withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
    filter(([action, ns]) => ns && !!ns.key),
    switchMap(([action, ns]: [ActionI18NRemoveEntries, INamespace]) =>
      this.service.remove(action.payload, ns.key).pipe(
        map(() => new ActionI18NRetrieve()),
        catchError(error => of(new ActionI18NRetrieveError(error)))
      )
    )
  );

  @Effect()
  updateEntry = this.actions$.pipe(
    ofType(I18NActionTypes.UPDATE_ENTRY, I18NActionTypes.UPDATE_ENTRIES),
    withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
    filter(([action, ns]) => ns && !!ns.key),
    switchMap(
      ([action, ns]: [
        ActionI18NUpdateEntry | ActionI18NUpdateEntries,
        INamespace
      ]) =>
        this.service.set(action.payload, ns.key).pipe(
          map(() => new ActionI18NRetrieve()),
          catchError(error => of(new ActionI18NRetrieveError(error)))
        )
    )
  );

  @Effect()
  addLanguage = this.actions$.pipe(
    ofType(I18NActionTypes.ADD_LANGUAGE),
    withLatestFrom(this.store.pipe(select(selectCurrentNamespace))),
    filter(([action, ns]) => ns && !!ns.key),
    switchMap(([action, ns]: [ActionI18NAddLanguage, INamespace]) =>
      this.service.translate(action.payload.key, ns.key).pipe(
        map(() => new ActionI18NRetrieve()),
        catchError(error => of(new ActionI18NRetrieveError(error)))
      )
    )
  );
}
