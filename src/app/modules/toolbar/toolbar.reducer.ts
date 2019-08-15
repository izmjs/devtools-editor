import { ToolbarState } from './toolbar.model';
import { ToolbarActions, ToolbarActionTypes } from './toolbar.actions';

export const initialState: ToolbarState = {
  namespaces: {
    loading: false,
    list: [],
    error: null,
    current: null
  },
  restart: {
    loading: false,
    error: null
  }
};

export function toolbarReducer(
  state: ToolbarState = initialState,
  action: ToolbarActions
): ToolbarState {
  switch (action.type) {
    case ToolbarActionTypes.RETRIEVE_NAMESPACES:
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          loading: true,
          error: null
        }
      };

    case ToolbarActionTypes.RETRIEVE_NAMESPACES_SUCCESS:
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          loading: false,
          error: null,
          list: action.payload
        }
      };

    case ToolbarActionTypes.RETRIEVE_NAMESPACES_ERROR:
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          loading: false,
          error: action.payload
        }
      };

    case ToolbarActionTypes.SET_CURRENT_NAMESPACE:
      return {
        ...state,
        namespaces: {
          ...state.namespaces,
          current: action.payload
        }
      };

    case ToolbarActionTypes.SERVER_RESTART:
      return {
        ...state,
        restart: {
          ...state.restart,
          loading: true
        }
      };

    case ToolbarActionTypes.SERVER_STARTED:
      return {
        ...state,
        restart: {
          ...state.restart,
          loading: false,
          error: null
        }
      };

    case ToolbarActionTypes.SERVER_RESTART_FAILED:
      return {
        ...state,
        restart: {
          ...state.restart,
          error: action.payload,
          loading: false
        }
      };

    default:
      return state;
  }
}
