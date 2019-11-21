import { IApiDesignerState } from './api-designer.model';
import { createReducer, Action } from '@ngrx/store';

export const initialState: IApiDesignerState = {
  loading: false
};

const reducer = createReducer(initialState);

export function ApiDesignerReducer(state: IApiDesignerState, action: Action) {
  return reducer(state, action);
}
