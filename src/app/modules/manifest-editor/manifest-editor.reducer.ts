import { IManifestEditorState } from './manifest-editor.model';
import { ManifestEditorActions, ManifestEditorActionTypes } from './manifest-editor.actions';

const INITIAL_VALUE = {
  links: {},
  author: {},
  publisher: {},
  maintainers: [],
  keywords: [],
};

export const initialState: IManifestEditorState = {
  current: 'prod',
  dependencies: {
    installed: [],
    error: null,
    list: [],
    loading: false,
  },
  meta: {
    data: INITIAL_VALUE,
    error: null,
    loading: false,
  }
};

export function ManifestEditorReducer(
  state: IManifestEditorState = initialState,
  action: ManifestEditorActions
): IManifestEditorState {
  switch (action.type) {
    case ManifestEditorActionTypes.ACTION_LOAD_METADATA:
      return {
        ...state,
        meta: {
          ...state.meta,
          loading: true,
          error: null,
        }
      }
    case ManifestEditorActionTypes.ACTION_LOAD_METADATA_SUCCESS:
      return {
        ...state,
        meta: {
          ...state.meta,
          data: {
            ...INITIAL_VALUE,
            ...action.payload,
          },
          loading: false,
          error: null,
        }
      }
    case ManifestEditorActionTypes.ACTION_LOAD_METADATA_ERROR:
      return {
        ...state,
        meta: {
          ...state.meta,
          data: null,
          loading: true,
          error: action.payload,
        }
      }
    case ManifestEditorActionTypes.ACTION_LIST_INSTALLED:
      return {
        ...state,
        dependencies: {
          ...state.dependencies,
          loading: true,
          installed: [],
          error: null,
        }
      }
    case ManifestEditorActionTypes.ACTION_LIST_INSTALLED_SUCCESS:
      return {
        ...state,
        dependencies: {
          ...state.dependencies,
          loading: false,
          installed: action.payload,
          error: null,
        }
      }
    case ManifestEditorActionTypes.ACTION_LIST_INSTALLED_ERROR:
      return {
        ...state,
        dependencies: {
          ...state.dependencies,
          loading: false,
          error: action.payload,
        }
      }
    case ManifestEditorActionTypes.ACTION_SEACH_MODULE:
      return {
        ...state,
        dependencies: {
          ...state.dependencies,
          loading: true,
          error: null,
        }
      }
    case ManifestEditorActionTypes.ACTION_SEACH_MODULE_SUCCESS:
      return {
        ...state,
        dependencies: {
          ...state.dependencies,
          loading: false,
          list: action.payload,
          error: null,
        }
      }
    case ManifestEditorActionTypes.ACTION_SEACH_MODULE_ERROR:
      return {
        ...state,
        dependencies: {
          ...state.dependencies,
          loading: false,
          error: action.payload,
        }
      }
    default:
      return state;
  }
}
