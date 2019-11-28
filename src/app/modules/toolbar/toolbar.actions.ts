import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import {
  INamespace,
  IFileLocation,
  IGenerateModuleData
} from './toolbar.model';

const TOOLBAR_ACTION_TYPES = {
  RETRIEVE_NAMESPACES: '[toolbar] Retrieve namespaces',
  RETRIEVE_NAMESPACES_SUCCESS: '[toolbar] Namespaces retrieved successfully',
  RETRIEVE_NAMESPACES_ERROR: '[toolbar] Error while retrieving Namespaces',
  GENERATE_MODULE: '[toolbar] Generate new module',
  GENERATE_MODULE_SUCCESS: '[toolbar] Module generation in progress',
  GENERATE_MODULE_ERROR: '[toolbar] Error while generating new module',
  SET_CURRENT_NAMESPACE: '[toolbar] Set current namespace',
  SERVER_RESTART: '[toolbar] Restart the server',
  SERVER_RESTART_FAILED: '[toolbar] Error while restarting the server',
  SERVER_CHECK: '[toolbar] Check the server',
  SERVER_STARTED: '[toolbar] Server started successfully',
  EDIT_PROJECT: '[toolbar] Start editing project in vscode',
  EDIT_FILE: '[toolbar] Start editing file',
  ADD_MODULE: '[toolbar] Launch module generator modal'
};

export const actionRetrieveNamespaces = createAction(
  TOOLBAR_ACTION_TYPES.RETRIEVE_NAMESPACES
);

export const actionRetrieveNamespacesSuccess = createAction(
  TOOLBAR_ACTION_TYPES.RETRIEVE_NAMESPACES_SUCCESS,
  props<{ payload: INamespace[] }>()
);

export const actionRetrieveNamespacesError = createAction(
  TOOLBAR_ACTION_TYPES.RETRIEVE_NAMESPACES_ERROR,
  props<{ payload: HttpErrorResponse }>()
);

export const actionGenerateModule = createAction(
  TOOLBAR_ACTION_TYPES.GENERATE_MODULE,
  props<{ payload: IGenerateModuleData }>()
);

export const actionGenerateModuleSuccess = createAction(
  TOOLBAR_ACTION_TYPES.GENERATE_MODULE_SUCCESS
);

export const actionGenerateModuleError = createAction(
  TOOLBAR_ACTION_TYPES.GENERATE_MODULE_ERROR,
  props<{ payload: HttpErrorResponse }>()
);

export const actionSetCurrentNamespace = createAction(
  TOOLBAR_ACTION_TYPES.SET_CURRENT_NAMESPACE,
  props<{ payload: INamespace }>()
);

export const actionServerStarted = createAction(
  TOOLBAR_ACTION_TYPES.SERVER_STARTED
);

export const actionServerCheck = createAction(
  TOOLBAR_ACTION_TYPES.SERVER_CHECK
);

export const actionServerRestart = createAction(
  TOOLBAR_ACTION_TYPES.SERVER_RESTART
);

export const actionServerRestartError = createAction(
  TOOLBAR_ACTION_TYPES.SERVER_RESTART_FAILED,
  props<{ payload: HttpErrorResponse }>()
);

export const actionEditProject = createAction(
  TOOLBAR_ACTION_TYPES.EDIT_PROJECT
);

export const actionEditFile = createAction(
  TOOLBAR_ACTION_TYPES.EDIT_FILE,
  props<{ payload: IFileLocation }>()
);

export const actionAddModule = createAction(TOOLBAR_ACTION_TYPES.ADD_MODULE);
