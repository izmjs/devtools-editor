import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, ToolbarState } from './toolbar.model';

export const selectToolbarState = createFeatureSelector<
  State,
  ToolbarState
>(
  'toolbar'
);

export const selectNamespaces = createSelector(
  selectToolbarState,
  state => state.namespaces
);

export const selectCurrentNamespace = createSelector(
  selectNamespaces,
  state => state.current
);

export const selectRestartServer = createSelector(
  selectToolbarState,
  state => state.restart
);
