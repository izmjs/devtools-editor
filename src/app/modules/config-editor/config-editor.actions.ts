import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import {
  IConfig,
  IKeyValue
} from '@app/modules/config-editor/config-editor.model';

export enum ConfigEditorActionTypes {
  ACTION_FETCH_CONFIG = '[config-editor] Fetch configuration',
  ACTION_FETCH_CONFIG_SUCCESS = '[config-editor] Configuration fetched successfuly',
  ACTION_FETCH_CONFIG_ERROR = '[config-editor] Error while fetching configuration',
  ACTION_EDIT_SETTINGS_ITEM = '[config-editor] Edit a setting item',
  ACTION_EDIT_SETTINGS_ITEM_SUCCESS = '[config-editor] Item edited successfuly',
  ACTION_EDIT_SETTINGS_ITEM_ERROR = '[config-editor] Error while editing an item',
  ACTION_CLEAR_SETTINGS_ITEM = '[config-editor] Clear a setting item',
  ACTION_CLEAR_SETTINGS_ITEM_SUCCESS = '[config-editor] Item cleared successfuly',
  ACTION_CLEAR_SETTINGS_ITEM_ERROR = '[config-editor] Error while clearing an item',
  EDIT_SETTINGS = '[manifest-editor] Start editing settings'
}

export class ActionEditItem implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_EDIT_SETTINGS_ITEM;
  constructor(readonly payload: IKeyValue[]) {}
}

export class ActionEditItemSuccess implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_EDIT_SETTINGS_ITEM_SUCCESS;
}

export class ActionEditItemError implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_EDIT_SETTINGS_ITEM_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionClearItem implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_CLEAR_SETTINGS_ITEM;
  constructor(readonly payload: IKeyValue[]) {}
}

export class ActionClearItemSuccess implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_CLEAR_SETTINGS_ITEM_SUCCESS;
}

export class ActionClearItemError implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_CLEAR_SETTINGS_ITEM_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionFetchConfig implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_FETCH_CONFIG;
}

export class ActionFetchConfigSuccess implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_FETCH_CONFIG_SUCCESS;
  constructor(readonly payload: IConfig[]) {}
}

export class ActionFetchConfigError implements Action {
  readonly type = ConfigEditorActionTypes.ACTION_FETCH_CONFIG_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionEditSettings implements Action {
  readonly type = ConfigEditorActionTypes.EDIT_SETTINGS;
}

export type ConfigEditorActions =
  | ActionEditItem
  | ActionEditItemSuccess
  | ActionEditItemError
  | ActionClearItem
  | ActionClearItemSuccess
  | ActionClearItemError
  | ActionFetchConfig
  | ActionFetchConfigSuccess
  | ActionFetchConfigError
  | ActionEditSettings;
