import { II18NState } from './i18n.model';
import { I18NActions, I18NActionTypes } from './i18n.actions';

export const initialState: II18NState = {
  loading: false,
  entries: [],
  lngs: [],
  error: null
};

export function i18nReducer(
  state: II18NState = initialState,
  action: I18NActions
): II18NState {
  switch (action.type) {
    case I18NActionTypes.RETRIEVE_LIST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case I18NActionTypes.RETRIEVE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        entries: action.payload.entries,
        lngs: action.payload.lngs
      };

    case I18NActionTypes.RETRIEVE_LIST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
