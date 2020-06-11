import { createFeatureSelector } from '@ngrx/store';
import { State, IModelDesignerState } from './model-designer.model';

export const selectModelDesignerState = createFeatureSelector<
  State,
  IModelDesignerState
>('model-designer');
