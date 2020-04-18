import { IConfigEditorState } from './config-editor.model';
import {
  actionFetchConfigError,
  actionFetchConfigSuccess,
  actionEditSharedSettings
} from './config-editor.actions';
import { on, createReducer, Action } from '@ngrx/store';

export const initialState: IConfigEditorState = {
  loading: false,
  error: null,
  config: [],
  settings: {
    port: 3000,
    prefix: '/api/v1'
  }
};

const reducer = createReducer(
  initialState,
  on(actionFetchConfigSuccess, (state, action) => ({
    ...state,
    loading: true,
    error: null,
    config: action.payload
  })),
  on(actionFetchConfigError, (state, action) => ({
    ...state,
    loading: true,
    error: action.payload,
    config: []
  })),
  on(actionEditSharedSettings, (state, action) => ({
    ...state,
    settings: {
      ...state.settings,
      ...action.payload
    }
  }))
);

export function ConfigEditorReducer(state: IConfigEditorState, action: Action) {
  return reducer(state, action);
}
