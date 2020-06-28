import { Injectable } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

import { State, IHomeState, IPostmanCollection } from '../../home.model';
import { selectHomeState, selectCollections, selectCollectionsLoading, selectCurrentCollection } from '../../selectors';
import { takeUntil, withLatestFrom, map } from 'rxjs/operators';
import { actionLoadCollections, actionSetCurrentCollection, actionSyncCurrentCollection } from '../../home.actions';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private unsubscribe$: Subject<void> = new Subject<void>();

  collections$: Observable<IPostmanCollection[]>;
  loading$: Observable<boolean>;
  currentCol$: Observable<IPostmanCollection>;

  constructor(private store: Store<State>) {}

  /**
   * Initialize subscribers & event listeners
   */
  listen() {
    this.collections$ = this.store.select(selectCollections);
    this.loading$ = this.store.select(selectCollectionsLoading);
    this.currentCol$ = combineLatest(
      this.store.select(selectCurrentCollection),
      this.store.select(selectCollections),
    ).pipe(
      map(([current, list]) => {
        return current ? list.find(one => one.id === current.id) : current
      }),
    );
  }

  loadCollections() {
    this.store.dispatch(actionLoadCollections());
  }

  setCurrentCol(item: IPostmanCollection) {
    this.store.dispatch(actionSetCurrentCollection({ payload: item }));
  }

  syncCurrentCol() {
    this.store.dispatch(actionSyncCurrentCollection());
  }

  /**
   * Stop listening
   */
  unlisten() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
