import { Action } from '@ngrx/store';

export enum ModelDesignerActionTypes {
  ACTION_TYPE_EXAMPLE = '[model-designer] Action example'
}

export class ActionModelDesignerExample implements Action {
  readonly type = ModelDesignerActionTypes.ACTION_TYPE_EXAMPLE;
}

export type ModelDesignerActions = ActionModelDesignerExample;
