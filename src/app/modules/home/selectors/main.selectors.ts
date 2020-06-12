import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, IHomeState } from '../home.model';

export const selectHomeState = createFeatureSelector<
  State,
  IHomeState
>('home');

export const selectCollectionsState = createSelector(
  selectHomeState,
  state => state.collections,
);

export const selectCollectionsLoading = createSelector(
  selectCollectionsState,
  state => state.loading,
);

export const selectCollections = createSelector(
  selectCollectionsState,
  state => state.list,
);

export const selectCollectionsError = createSelector(
  selectCollectionsState,
  state => state.error,
);

export const selectCurrentCollection = createSelector(
  selectCollectionsState,
  state => state.current,
);
