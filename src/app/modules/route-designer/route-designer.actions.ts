import { createAction, props } from '@ngrx/store';
import { ILoadable } from './route-designer.model';
import { HttpErrorResponse } from '@angular/common/http';

export const actionLoadItem = createAction(
  '[route-designer] Loading the item',
  props<{ payload?: ILoadable }>()
);

export const actionLoadItemSuccess = createAction(
  '[route-designer] Item loaded successfully',
  props<{
    payload: {
      list: ILoadable[];
      current: ILoadable;
    };
  }>()
);

export const actionLoadItemError = createAction(
  '[route-designer] Error while loading the item',
  props<{ payload: HttpErrorResponse }>()
);
