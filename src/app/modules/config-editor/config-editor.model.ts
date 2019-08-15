import { State as AppState } from '@modules/toolbar/toolbar.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface IItem {
  key: string;
  envVar?: string;
  name?: string;
  value?: any;
  schema?: any;
  description?: string;
  defaultValue?: number;
  scope?: string;
  link?: string;
}

export interface IKeyValue {
  key: string;
  value?: any;
  remove?: boolean;
  scope?: string;
}

export interface IConfig {
  name: string;
  items: IItem[];
}

export interface IConfigEditorState {
  loading: boolean;
  config: IConfig[];
  error: HttpErrorResponse;
}

export interface State extends AppState {
  'config-editor': IConfigEditorState;
}
