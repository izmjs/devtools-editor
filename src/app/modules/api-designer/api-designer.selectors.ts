import { createFeatureSelector } from '@ngrx/store';
import { State, IApiDesignerState } from './api-designer.model';

export const selectApiDesignerState = createFeatureSelector<
  State,
  IApiDesignerState
>('api-designer');
