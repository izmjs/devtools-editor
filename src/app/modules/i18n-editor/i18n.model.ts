import { HttpErrorResponse } from '@angular/common/http';
import { State as AppState } from '@modules/toolbar/toolbar.model';

export interface ILanguage {
  label: string;
  name?: string;
  key: string;
  editable?: boolean;
}

export interface ISentence {
  key: string;
  [lngKey: string]: string;
}

export interface IEditableSentence {
  key: string;
  isNew?: boolean;
  message?: string;
  type?: 'warning' | 'info' | 'danger';
  icon?: string;
  data: {
    [lngKey: string]: IEditableItem;
  };
}

export interface IEditableItem {
  origin: string;
  current: string;
  message?: string;
  type?: 'warning' | 'info' | 'danger';
  icon?: string;
}

export interface ITranslation {
  lng: ILanguage;
  entries: ISentence[];
}

export interface ITranslations {
  lngs: ILanguage[];
  entries: ISentence[];
}

export interface II18NState {
  loading: boolean;
  lngs: ILanguage[];
  entries: ISentence[];
  error: HttpErrorResponse;
}

export interface State extends AppState {
  i18n: II18NState;
}

export interface IKeyValue {
  [key: string]: string;
}
