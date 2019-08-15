import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, IRouteDesignerState } from './route-designer.model';

export const selectRouteDesignerState = createFeatureSelector<
  State,
  IRouteDesignerState
>('route-designer');

export const selectCurrentFolder = createSelector(
  selectRouteDesignerState,
  state => state.current
);
