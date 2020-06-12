import { IHomeState } from './home.model';
import { createReducer, Action, on } from '@ngrx/store';
import { actionLoadCollections, actionLoadCollectionsSuccess, actionLoadCollectionsError, actionSetCurrentCollection, actionSyncCurrentCollection, actionSyncCurrentCollectionSuccess, actionSyncCurrentCollectionError } from './home.actions';

export const initialState: IHomeState = {
  collections: {
    list: [],
    error: null,
    loading: false,
    current: null,
  },
};

const reducer = createReducer(
  initialState,
  on(
    actionLoadCollections,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          loading: true,
        }
      };
    }
  ),
  on(
    actionLoadCollectionsSuccess,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          loading: false,
          error: null,
          list: action.payload,
        }
      };
    }
  ),
  on(
    actionLoadCollectionsError,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          loading: false,
          error: action.payload.error,
        }
      };
    }
  ),
  on(
    actionSetCurrentCollection,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          current: action.payload,
        }
      };
    }
  ),
  on(
    actionSyncCurrentCollection,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          loading: true,
        }
      };
    }
  ),
  on(
    actionSyncCurrentCollectionSuccess,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          loading: false,
        }
      };
    }
  ),
  on(
    actionSyncCurrentCollectionError,
    (state, action) => {
      return {
        ...state,
        collections: {
          ...state.collections,
          loading: false,
          error: action.payload.error,
        }
      };
    }
  ),
)

export function HomeReducer(
  state: IHomeState,
  action: Action
) {
  return reducer(state, action);
}
