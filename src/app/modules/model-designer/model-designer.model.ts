import { State as AppState } from '@modules/toolbar/toolbar.model';

export interface IModelDesignerState {
  loading: boolean;
}

export interface State extends AppState {
  'model-designer': IModelDesignerState;
}
