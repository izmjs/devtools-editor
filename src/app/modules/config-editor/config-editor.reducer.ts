import { IConfigEditorState } from './config-editor.model';
import {
  actionFetchConfigError,
  actionFetchConfigSuccess,
} from './config-editor.actions';
import { on, createReducer, Action } from '@ngrx/store';

export const initialState: IConfigEditorState = {
  loading: false,
  error: null,
  config: []
};

const reducer = createReducer(
  initialState,
  on(
    actionFetchConfigSuccess,
    (state, action) => ({
      ...state,
      loading: true,
      error: null,
      config: action.payload,
    }),
  ),
  on(
    actionFetchConfigError,
    (state, action) => ({
      ...state,
      loading: true,
      error: action.payload,
      config: [],
    }),
  ),
)

export function ConfigEditorReducer(
  state: IConfigEditorState,
  action: Action
) {
  return reducer(state, action);
}
