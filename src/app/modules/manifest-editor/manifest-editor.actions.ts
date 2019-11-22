import { createAction, props } from '@ngrx/store';
import { IMetadata, ModuleType, ILightMetadata } from './manifest-editor.model';
import { HttpErrorResponse } from '@angular/common/http';

export const actionLoadMetadata = createAction(
  '[manifest-editor] Load metadata'
);

export const actionLoadMetadataSuccess = createAction(
  '[manifest-editor] Metadata loaded successfully',
  props<{ payload: IMetadata }>()
);

export const actionLoadMetadataError = createAction(
  '[manifest-editor] Error while loading the metadata',
  props<{ payload: HttpErrorResponse }>()
);

export const actionSaveMetadata = createAction(
  '[manifest-editor] Save the metadata',
  props<{ payload: IMetadata }>()
);

export const actionListInstalled = createAction(
  '[manifest-editor] List installed modules',
  props<{ payload: ModuleType }>()
);

export const actionListInstalledSuccess = createAction(
  '[manifest-editor] Installed modules listed successfully',
  props<{ payload: ILightMetadata[] }>()
);

export const actionListInstalledError = createAction(
  '[manifest-editor] Error while loading the list of installed modules',
  props<{ payload: HttpErrorResponse }>()
);

export const actionInstallModule = createAction(
  '[manifest-editor] Install a module',
  props<{ payload: { name: string; version: string; mode: ModuleType } }>()
);

export const actionInstallModuleSuccess = createAction(
  '[manifest-editor] Module installed successfully'
);

export const actionInstallModuleError = createAction(
  '[manifest-editor] Error while installing a new module',
  props<{ payload: HttpErrorResponse }>()
);

export const actionSearchModule = createAction(
  '[manifest-editor] Looking for a module',
  props<{ payload: string }>()
);

export const actionSearchModuleSuccess = createAction(
  '[manifest-editor] The search result retrieved successfully',
  props<{ payload: IMetadata[] }>()
);

export const actionSearchModuleError = createAction(
  '[manifest-editor] Error while searching a module',
  props<{ payload: HttpErrorResponse }>()
);
