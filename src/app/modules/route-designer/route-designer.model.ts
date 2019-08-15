import { State as AppState } from '@modules/toolbar/toolbar.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface IGeneric {
  name?: string;
  type?: 'file' | 'folder' | 'controller';
  path?: string;
}

export interface IFileFolder extends IGeneric {
  loaded?: Boolean;
  children?: (IFileFolder | IController)[];
}

export interface IController extends IGeneric {
  title?: string;
  description?: string;
  params?: IParam[];
  loc?: {
    line: number;
    column: number;
  };
}

export interface ILoadable extends IFileFolder, IController {
  loading?: boolean;
}
export interface IParam {
  name: string;
  description: string;
  type: string;
}

export interface IRouteDesignerState {
  list: ILoadable[];
  current: ILoadable;
  error: HttpErrorResponse;
}

export interface State extends AppState {
  'route-designer': IRouteDesignerState;
}
