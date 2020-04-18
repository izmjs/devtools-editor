import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import {
  IConfig,
  IKeyValue,
  ISharedSettings
} from '@app/modules/config-editor/config-editor.model';

export const actionEditItem = createAction(
  '[config-editor] Edit a setting item',
  props<{ payload: IKeyValue[] }>()
);

export const actionEditItemSuccess = createAction(
  '[config-editor] Item edited successfuly'
);

export const actionEditItemError = createAction(
  '[config-editor] Error while editing an item',
  props<{ payload: HttpErrorResponse }>()
);

export const actionClearItem = createAction(
  '[config-editor] Clear a setting item',
  props<{ payload: IKeyValue[] }>()
);

export const actionClearItemSuccess = createAction(
  '[config-editor] Item cleared successfuly'
);

export const actionClearItemError = createAction(
  '[config-editor] Error while clearing an item',
  props<{ payload: HttpErrorResponse }>()
);

export const actionFetchConfig = createAction(
  '[config-editor] Fetch configuration'
);

export const actionFetchConfigSuccess = createAction(
  '[config-editor] Configuration fetched successfuly',
  props<{ payload: IConfig[] }>()
);

export const actionFetchConfigError = createAction(
  '[config-editor] Error while fetching configuration',
  props<{ payload: HttpErrorResponse }>()
);

export const actionEditSettings = createAction(
  '[manifest-editor] Start editing settings'
);

export const actionEditSharedSettings = createAction(
  '[manifest-editor] Edit shared settings',
  props<{ payload: ISharedSettings }>()
);
