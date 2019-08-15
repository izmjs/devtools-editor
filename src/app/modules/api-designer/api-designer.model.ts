import { State as AppState } from '@modules/toolbar/toolbar.model';

export interface IApiDesignerState {
  loading: boolean;
}

export interface State extends AppState {
  'api-designer': IApiDesignerState;
}
