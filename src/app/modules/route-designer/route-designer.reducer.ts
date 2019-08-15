import { IRouteDesignerState } from './route-designer.model';
import {
  RouteDesignerActions,
  RouteDesignerActionTypes
} from './route-designer.actions';
export const initialState: IRouteDesignerState = {
  error: null,
  list: [],
  current: null
};

export function RouteDesignerReducer(
  state: IRouteDesignerState = initialState,
  action: RouteDesignerActions
): IRouteDesignerState {
  switch (action.type) {
    case RouteDesignerActionTypes.ACTION_LOAD_ITEM_SUCCESS:
      return {
        ...state,
        error: null,
        list: action.payload.list,
        current: action.payload.current,
      };

    case RouteDesignerActionTypes.ACTION_LOAD_ITEM_ERROR:
      return {
        ...state,
        error: action.payload.error
      };
    case RouteDesignerActionTypes.ACTION_LOAD_ITEM:
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        list: state.list.map(one =>
          one.path === action.payload.path
            ? { ...one, loading: true }
            : one
        )
      };

    default:
      return state;
  }
}
