import { IConfigEditorState } from './config-editor.model';
import {
  ConfigEditorActions,
  ConfigEditorActionTypes
} from './config-editor.actions';

export const initialState: IConfigEditorState = {
  loading: false,
  error: null,
  config: []
};

export function ConfigEditorReducer(
  state: IConfigEditorState = initialState,
  action: ConfigEditorActions
): IConfigEditorState {
  switch (action.type) {
    case ConfigEditorActionTypes.ACTION_FETCH_CONFIG:
      return {
        ...state,
        loading: true,
        error: null,
        config: []
      };
    case ConfigEditorActionTypes.ACTION_FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        config: action.payload
      };
    case ConfigEditorActionTypes.ACTION_FETCH_CONFIG_ERROR:
      return {
        ...state,
        loading: true,
        error: action.payload,
        config: []
      };
    default:
      return state;
  }
}
