import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { INamespace, IFileLocation, IGenerateModuleData } from './toolbar.model';

export enum ToolbarActionTypes {
  RETRIEVE_NAMESPACES = '[toolbar] Retrieve namespaces',
  RETRIEVE_NAMESPACES_SUCCESS = '[toolbar] Namespaces retrieved successfully',
  RETRIEVE_NAMESPACES_ERROR = '[toolbar] Error while retrieving Namespaces',
  GENERATE_MODULE = '[toolbar] Generate new module',
  GENERATE_MODULE_SUCCESS = '[toolbar] Module generation in progress',
  GENERATE_MODULE_ERROR = '[toolbar] Error while generating new module',
  SET_CURRENT_NAMESPACE = '[toolbar] Set current namespace',
  SERVER_RESTART = '[toolbar] Restart the server',
  SERVER_RESTART_FAILED = '[toolbar] Error while restarting the server',
  SERVER_CHECK = '[toolbar] Check the server',
  SERVER_STARTED = '[toolbar] Server started successfully',
  EDIT_PROJECT = '[toolbar] Start editing project in vscode',
  EDIT_FILE = '[toolbar] Start editing file',
  ADD_MODULE = '[toolbar] Launch module generator modal',
}

export class ActionRetrieveNamespaces implements Action {
  readonly type = ToolbarActionTypes.RETRIEVE_NAMESPACES;
}

export class ActionRetrieveNamespacesSuccess implements Action {
  readonly type = ToolbarActionTypes.RETRIEVE_NAMESPACES_SUCCESS;
  constructor(readonly payload: INamespace[]) { }
}

export class ActionRetrieveNamespacesError implements Action {
  readonly type = ToolbarActionTypes.RETRIEVE_NAMESPACES_ERROR;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class ActionGenerateModule implements Action {
  readonly type = ToolbarActionTypes.GENERATE_MODULE;
  constructor(readonly payload: IGenerateModuleData) { }
}

export class ActionGenerateModuleSuccess implements Action {
  readonly type = ToolbarActionTypes.GENERATE_MODULE_SUCCESS;
}

export class ActionGenerateModuleError implements Action {
  readonly type = ToolbarActionTypes.GENERATE_MODULE_ERROR;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class ActionSetCurrentNamespace implements Action {
  readonly type = ToolbarActionTypes.SET_CURRENT_NAMESPACE;
  constructor(readonly payload: INamespace) { }
}

export class ActionServerRestart implements Action {
  readonly type = ToolbarActionTypes.SERVER_RESTART;
}

export class ActionServerStarted implements Action {
  readonly type = ToolbarActionTypes.SERVER_STARTED;
}

export class ActionServerCheck implements Action {
  readonly type = ToolbarActionTypes.SERVER_CHECK;
}

export class ActionServerRestartError implements Action {
  readonly type = ToolbarActionTypes.SERVER_RESTART_FAILED;
  constructor(readonly payload: HttpErrorResponse) { }
}

export class ActionEditProject implements Action {
  readonly type = ToolbarActionTypes.EDIT_PROJECT;
}

export class ActionEditFile implements Action {
  readonly type = ToolbarActionTypes.EDIT_FILE;
  constructor(readonly payload: IFileLocation) { }
}

export class ActionAddModule implements Action {
  readonly type = ToolbarActionTypes.ADD_MODULE;
}

export type ToolbarActions =
  | ActionGenerateModule
  | ActionGenerateModuleSuccess
  | ActionGenerateModuleError
  | ActionRetrieveNamespaces
  | ActionRetrieveNamespacesSuccess
  | ActionRetrieveNamespacesError
  | ActionSetCurrentNamespace
  | ActionServerRestart
  | ActionServerStarted
  | ActionServerRestartError
  | ActionServerCheck
  | ActionEditProject
  | ActionAddModule;
