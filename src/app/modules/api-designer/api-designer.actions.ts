import { Action } from '@ngrx/store';

export enum ApiDesignerActionTypes {
  ACTION_TYPE_EXAMPLE = '[api-designer] Action example'
}

export class ActionApiDesignerExample implements Action {
  readonly type = ApiDesignerActionTypes.ACTION_TYPE_EXAMPLE;
}

export type ApiDesignerActions = ActionApiDesignerExample;
