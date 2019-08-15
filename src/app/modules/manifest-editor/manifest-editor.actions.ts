import { Action } from '@ngrx/store';
import { IMetadata, ModuleType, ILightMetadata } from './manifest-editor.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum ManifestEditorActionTypes {
  ACTION_LOAD_METADATA = '[manifest-editor] Load metadata',
  ACTION_LOAD_METADATA_SUCCESS = '[manifest-editor] Metadata loaded successfully',
  ACTION_LOAD_METADATA_ERROR = '[manifest-editor] Error while loading the metadata',
  ACTION_SAVE_METADATA = '[manifest-editor] Save the metadata',
  ACTION_LIST_INSTALLED = '[manifest-editor] List installed modules',
  ACTION_LIST_INSTALLED_SUCCESS = '[manifest-editor] Installed modules listed successfully',
  ACTION_LIST_INSTALLED_ERROR = '[manifest-editor] Error while loading the list of installed modules',
  ACTION_INSTALL_MODULE = '[manifest-editor] Install a module',
  ACTION_INSTALL_MODULE_SUCCESS = '[manifest-editor] Module installed successfully',
  ACTION_INSTALL_MODULE_ERROR = '[manifest-editor] Error while installing a new module',
  ACTION_SEACH_MODULE = '[manifest-editor] Looking for a module',
  ACTION_SEACH_MODULE_SUCCESS = '[manifest-editor] The search result retrieved successfully',
  ACTION_SEACH_MODULE_ERROR = '[manifest-editor] Error while searching a module',
}

export class ActionLoadMetadata implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_LOAD_METADATA;
}

export class ActionLoadMetadataSuccess implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_LOAD_METADATA_SUCCESS;
  constructor(readonly payload: IMetadata) {}
}

export class ActionLoadMetadataError implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_LOAD_METADATA_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionSaveMetadata implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_SAVE_METADATA;
  constructor(readonly payload: IMetadata) {}
}

export class ActionListInstalled implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_LIST_INSTALLED;
  constructor(readonly payload: ModuleType) {}
}

export class ActionListInstalledSuccess implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_LIST_INSTALLED_SUCCESS;
  constructor(readonly payload: ILightMetadata[]) {}
}

export class ActionListInstalledError implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_LIST_INSTALLED_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionInstallModule implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_INSTALL_MODULE;
  constructor(readonly payload: { name: string; version: string; mode: ModuleType }) {}
}

export class ActionInstallModuleSuccess implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_INSTALL_MODULE_SUCCESS;
}

export class ActionInstallModuleError implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_INSTALL_MODULE_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export class ActionSearchModule implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_SEACH_MODULE;
  constructor(readonly payload: string) {}
}

export class ActionSearchModuleSuccess implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_SEACH_MODULE_SUCCESS;
  constructor(readonly payload: IMetadata[]) {}
}

export class ActionSearchModuleError implements Action {
  readonly type = ManifestEditorActionTypes.ACTION_SEACH_MODULE_ERROR;
  constructor(readonly payload: HttpErrorResponse) {}
}

export type ManifestEditorActions = ActionLoadMetadata
  | ActionLoadMetadataSuccess
  | ActionLoadMetadataError
  | ActionSaveMetadata
  | ActionListInstalled
  | ActionListInstalledSuccess
  | ActionListInstalledError
  | ActionInstallModule
  | ActionInstallModuleSuccess
  | ActionInstallModuleError
  | ActionSearchModule
  | ActionSearchModuleSuccess
  | ActionSearchModuleError;
