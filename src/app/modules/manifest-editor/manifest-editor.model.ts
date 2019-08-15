import { State as AppState } from '@modules/toolbar/toolbar.model';
import { HttpErrorResponse } from '@angular/common/http';

export interface IUser {
  email?: string;
  username?: string;
  name?: string;
}

export interface ILightMetadata {
  name?: string;
  version?: string;
  from?: string;
  resolved?: string;
}

export interface IMetadata {
  links?: {
    bugs?: string;
    logo?: string;
    homepage?: string;
    repository?: string;
    [name: string]: string;
  };
  name?: string;
  author?: IUser;
  publisher?: IUser;
  maintainers?: IUser[];
  keywords?: string[];
  version?: string;
  description?: string;
  license?: string;
  installed?: boolean;
  removed?: boolean;
}

export type ModuleType = 'fm' | 'prod' | 'dev';

export interface IManifestEditorState {
  meta: {
    loading: boolean;
    data: IMetadata;
    error: HttpErrorResponse;
  };
  dependencies: {
    loading: boolean;
    error: HttpErrorResponse;
    list: IMetadata[];
    installed: ILightMetadata[];
  };
  current: ModuleType;
}

export interface IModuleType {
  type: ModuleType;
  title: string;
}

export interface State extends AppState {
  'manifest-editor': IManifestEditorState;
}
