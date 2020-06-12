import { IManifestEditorState } from './manifest-editor.model';
import {
  actionLoadMetadata,
  actionLoadMetadataSuccess,
  actionLoadMetadataError,
  actionListInstalled,
  actionListInstalledSuccess,
  actionListInstalledError,
  actionSearchModule,
  actionSearchModuleSuccess,
  actionSearchModuleError
} from './manifest-editor.actions';
import { createReducer, Action, on } from '@ngrx/store';

const INITIAL_VALUE = {
  links: {},
  author: {},
  publisher: {},
  maintainers: [],
  keywords: []
};

export const initialState: IManifestEditorState = {
  current: 'prod',
  dependencies: {
    installed: [],
    error: null,
    list: [],
    loading: false
  },
  meta: {
    data: INITIAL_VALUE,
    error: null,
    loading: false
  }
};

const reducer = createReducer(
  initialState,
  on(actionLoadMetadata, state => ({
    ...state,
    meta: {
      ...state.meta,
      loading: true,
      error: null
    }
  })),
  on(actionLoadMetadataSuccess, (state, action) => ({
    ...state,
    meta: {
      ...state.meta,
      data: {
        ...INITIAL_VALUE,
        ...action.payload
      },
      loading: false,
      error: null
    }
  })),
  on(actionLoadMetadataError, (state, action) => ({
    ...state,
    meta: {
      ...state.meta,
      data: null,
      loading: true,
      error: action.payload.error
    }
  })),
  on(actionListInstalled, state => ({
    ...state,
    dependencies: {
      ...state.dependencies,
      loading: true,
      installed: [],
      error: null
    }
  })),
  on(actionListInstalledSuccess, (state, action) => ({
    ...state,
    dependencies: {
      ...state.dependencies,
      loading: false,
      installed: action.payload,
      error: null
    }
  })),
  on(actionListInstalledError, (state, action) => ({
    ...state,
    dependencies: {
      ...state.dependencies,
      loading: false,
      error: action.payload.error
    }
  })),
  on(actionSearchModule, state => ({
    ...state,
    dependencies: {
      ...state.dependencies,
      loading: true,
      error: null
    }
  })),
  on(actionSearchModuleSuccess, (state, action) => ({
    ...state,
    dependencies: {
      ...state.dependencies,
      loading: false,
      list: action.payload,
      error: null
    }
  })),
  on(actionSearchModuleError, (state, action) => ({
    ...state,
    dependencies: {
      ...state.dependencies,
      loading: false,
      error: action.payload.error
    }
  }))
);

export function ManifestEditorReducer(
  state: IManifestEditorState,
  action: Action
) {
  return reducer(state, action);
}
