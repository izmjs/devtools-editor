import { ToolbarState } from './toolbar.model';
import { Action, createReducer, on } from '@ngrx/store';
import {
  actionServerRestart,
  actionServerStarted,
  actionRetrieveNamespaces,
  actionServerRestartError,
  actionSetCurrentNamespace,
  actionRetrieveNamespacesSuccess,
  actionRetrieveNamespacesError
} from './toolbar.actions';

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

const reducer = createReducer(
  initialState,
  on(actionRetrieveNamespaces, state => ({
    ...state,
    namespaces: {
      ...state.namespaces,
      loading: true,
      error: null
    }
  })),
  on(actionRetrieveNamespacesSuccess, (state, action) => ({
    ...state,
    namespaces: {
      ...state.namespaces,
      loading: false,
      error: null,
      list: action.payload
    }
  })),
  on(actionRetrieveNamespacesError, (state, action) => ({
    ...state,
    namespaces: {
      ...state.namespaces,
      loading: false,
      error: action.payload.error
    }
  })),
  on(actionSetCurrentNamespace, (state, action) => ({
    ...state,
    namespaces: {
      ...state.namespaces,
      current: action.payload
    }
  })),
  on(actionServerRestart, state => ({
    ...state,
    restart: {
      ...state.restart,
      loading: true
    }
  })),
  on(actionServerStarted, state => ({
    ...state,
    restart: {
      ...state.restart,
      loading: false,
      error: null
    }
  })),
  on(actionServerRestartError, (state, action) => ({
    ...state,
    restart: {
      ...state.restart,
      error: action.payload.error,
      loading: false
    }
  }))
);

export function toolbarReducer(state: ToolbarState, action: Action) {
  return reducer(state, action);
}
