import { IModelDesignerState } from './model-designer.model';
import { createReducer, State, Action } from '@ngrx/store';

export const initialState: IModelDesignerState = {
  loading: false
};

const reducer = createReducer(initialState);

export function ModelDesignerReducer(
  state: IModelDesignerState,
  action: Action
) {
  return reducer(state, action);
}
