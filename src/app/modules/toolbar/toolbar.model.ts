import { HttpErrorResponse } from '@angular/common/http';
import { AppState } from '@app/core';

export interface INamespace {
  key: string;
  name: string;
}

export interface IGenerateModuleData {
  name: string;
  git: boolean;
  install: boolean;
}

export interface ToolbarState {
  namespaces: {
    loading: boolean;
    list: INamespace[];
    error: any;
    current?: INamespace;
  };
  restart: {
    loading: boolean;
    error: any;
  };
}

export interface IFileLocation {
  file: string;
  loc: {
    line: number;
    column: number;
  };
  isAbsolute?: boolean;
}

export interface State extends AppState {
  toolbar: ToolbarState;
}

export interface IKeyValue {
  [key: string]: string;
}
