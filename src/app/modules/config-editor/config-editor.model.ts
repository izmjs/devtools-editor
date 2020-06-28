import { State as AppState } from '@modules/toolbar/toolbar.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface IField {
  type: string;
  options?: any;
}

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
  field?: IField;
  show?: boolean;
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

export interface ISharedSettings {
  port?: number;
  secure?: boolean;
  cors?: boolean;
  host?: string;
  prefix?: string;
}

export interface IConfigEditorState {
  loading: boolean;
  config: IConfig[];
  error: any;
  settings: ISharedSettings;
}

export interface State extends AppState {
  'config-editor': IConfigEditorState;
}
