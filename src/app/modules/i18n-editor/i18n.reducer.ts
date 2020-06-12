import { II18NState } from './i18n.model';
import {
  actionI18NRetrieve,
  actionI18NRetrieveError,
  actionI18NRetrieveSuccess
} from './i18n.actions';
import { createReducer, on, Action } from '@ngrx/store';

export const initialState: II18NState = {
  loading: false,
  entries: [],
  lngs: [],
  error: null
};

const reducer = createReducer(
  initialState,
  on(actionI18NRetrieve, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(actionI18NRetrieveSuccess, (state, action) => ({
    ...state,
    loading: false,
    error: null,
    entries: action.payload.entries,
    lngs: action.payload.lngs
  })),
  on(actionI18NRetrieveError, (state, action) => ({
    ...state,
    loading: false,
    error: action.payload.error
  }))
);

export function i18nReducer(state: II18NState, action: Action) {
  return reducer(state, action);
}
