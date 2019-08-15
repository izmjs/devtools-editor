import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ITranslations, ISentence, ILanguage } from './i18n.model';

export enum I18NActionTypes {
  RETRIEVE_LIST = '[I18N] Retrieve i18n',
  RETRIEVE_LIST_SUCCESS = '[I18N] I18N retrieved successfully',
  RETRIEVE_LIST_ERROR = '[I18N] Error while retrieving I18N',
  REMOVE_LANGUAGES = '[I18N] Remove one or more languages',
  REMOVE_ENTRIES = '[I18N] Remove one or more entries',
  UPDATE_ENTRY = '[I18N] Update an entry',
  UPDATE_ENTRIES = '[I18N] Update multiple entries',
  ADD_LANGUAGE = '[I18N] Add a new language'
}

export class ActionI18NRetrieve implements Action {
  readonly type = I18NActionTypes.RETRIEVE_LIST;
}

export class ActionI18NRetrieveSuccess implements Action {
  readonly type = I18NActionTypes.RETRIEVE_LIST_SUCCESS;
  constructor(readonly payload: ITranslations) {}
}

export class ActionI18NRetrieveError implements Action {
  readonly type = I18NActionTypes.RETRIEVE_LIST_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionI18NRemoveLanguages implements Action {
  readonly type = I18NActionTypes.REMOVE_LANGUAGES;
  constructor(readonly payload: string[]) {}
}

export class ActionI18NRemoveEntries implements Action {
  readonly type = I18NActionTypes.REMOVE_ENTRIES;
  constructor(readonly payload: string[]) {}
}

export class ActionI18NUpdateEntry implements Action {
  readonly type = I18NActionTypes.UPDATE_ENTRY;
  constructor(readonly payload: ISentence) {}
}

export class ActionI18NUpdateEntries implements Action {
  readonly type = I18NActionTypes.UPDATE_ENTRIES;
  constructor(readonly payload: ISentence[]) {}
}

export class ActionI18NAddLanguage implements Action {
  readonly type = I18NActionTypes.ADD_LANGUAGE;
  constructor(readonly payload: ILanguage) {}
}

export type I18NActions =
  | ActionI18NRetrieve
  | ActionI18NRetrieveSuccess
  | ActionI18NRetrieveError
  | ActionI18NRemoveLanguages
  | ActionI18NRemoveEntries
  | ActionI18NUpdateEntry
  | ActionI18NUpdateEntries
  | ActionI18NAddLanguage;
