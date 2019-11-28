import { IRouteDesignerState } from './route-designer.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionLoadItem,
  actionLoadItemSuccess,
  actionLoadItemError
} from './route-designer.actions';
export const initialState: IRouteDesignerState = {
  error: null,
  list: [],
  current: null
};

const reducer = createReducer(
  initialState,
  on(actionLoadItem, (state, action) => {
    if (!action.payload) {
      return state;
    }

    return {
      ...state,
      list: state.list.map(one =>
        one.path === action.payload.path ? { ...one, loading: true } : one
      )
    };
  }),
  on(actionLoadItemSuccess, (state, action) => ({
    ...state,
    error: null,
    list: action.payload.list,
    current: action.payload.current
  })),
  on(actionLoadItemError, (state, action) => ({
    ...state,
    error: action.payload.error
  }))
);

export function RouteDesignerReducer(
  state: IRouteDesignerState,
  action: Action
) {
  return reducer(state, action);
}
