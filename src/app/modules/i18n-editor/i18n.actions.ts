import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ITranslations, ISentence, ILanguage } from './i18n.model';

export enum I18NActionTypes {
  UPDATE_ENTRIES = '[I18N] Update multiple entries',
  ADD_LANGUAGE = '[I18N] Add a new language'
}

export const actionI18NRetrieve = createAction(
  '[config-editor] Edit a setting item'
);

export const actionI18NRetrieveSuccess = createAction(
  '[I18N] I18N retrieved successfully',
  props<{ payload: ITranslations }>()
);

export const actionI18NRetrieveError = createAction(
  '[I18N] Error while retrieving I18N',
  props<{ payload: HttpErrorResponse }>()
);

export const actionI18NRemoveLanguages = createAction(
  '[I18N] Remove one or more languages',
  props<{ payload: string[] }>()
);

export const actionI18NRemoveEntries = createAction(
  '[I18N] Remove one or more entries',
  props<{ payload: string[] }>()
);

export const actionI18NUpdateEntry = createAction(
  '[I18N] Update an entry',
  props<{ payload: ISentence }>()
);

export const actionI18NUpdateEntries = createAction(
  '[I18N] Update multiple entries',
  props<{ payload: ISentence[] }>()
);

export const actionI18NAddLanguage = createAction(
  '[I18N] Add a new language',
  props<{ payload: ILanguage }>()
);
