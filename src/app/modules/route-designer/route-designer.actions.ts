import { Action } from '@ngrx/store';
import { ILoadable } from './route-designer.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum RouteDesignerActionTypes {
  ACTION_LOAD_ITEM = '[route-designer] Loading the item',
  ACTION_LOAD_ITEM_SUCCESS = '[route-designer] Item loaded successfully',
  ACTION_LOAD_ITEM_ERROR = '[route-designer] Error while loading the item',
}

export class ActionLoadItem implements Action {
  readonly type = RouteDesignerActionTypes.ACTION_LOAD_ITEM;
  constructor(readonly payload?: ILoadable) {}
}

export class ActionLoadItemSuccess implements Action {
  readonly type = RouteDesignerActionTypes.ACTION_LOAD_ITEM_SUCCESS;

  constructor(readonly payload: {
    list: ILoadable[];
    current: ILoadable;
  }) {}
}

export class ActionLoadItemError implements Action {
  readonly type = RouteDesignerActionTypes.ACTION_LOAD_ITEM_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) {}
}

export type RouteDesignerActions =
  | ActionLoadItem
  | ActionLoadItemSuccess
  | ActionLoadItemError;
