import { createAction, props } from '@ngrx/store';
import { IPostmanCollection } from './home.model';
import { HttpErrorResponse } from '@angular/common/http';

export enum ActionsHomeTypes {
  LOAD_ACTION = '[home] Loading postman actions',
  LOAD_ACTION_SUCCESS = '[home] Loading postman actions succeeded',
  LOAD_ACTION_ERROR = '[home] Error while loading postman actions',
  SET_CURRENT_COLLECTION = '[home] Setting current collection',
  SYNC_CURRENT_COLLECTION = '[home] Synchronize the current collection',
  SYNC_CURRENT_COLLECTION_SUCCESS = '[home] Synchronizing the current collection',
  SYNC_CURRENT_COLLECTION_ERROR = '[home] Error while syncing the current collection',
}

export const actionLoadCollections = createAction(
  ActionsHomeTypes.LOAD_ACTION,
);

export const actionLoadCollectionsSuccess = createAction(
  ActionsHomeTypes.LOAD_ACTION_SUCCESS,
  props<{ payload: IPostmanCollection[] }>(),
);

export const actionLoadCollectionsError = createAction(
  ActionsHomeTypes.LOAD_ACTION_ERROR,
  props<{ payload: HttpErrorResponse }>(),
);

export const actionSetCurrentCollection = createAction(
  ActionsHomeTypes.SET_CURRENT_COLLECTION,
  props<{ payload: IPostmanCollection }>(),
);

export const actionSyncCurrentCollection = createAction(
  ActionsHomeTypes.SYNC_CURRENT_COLLECTION,
);

export const actionSyncCurrentCollectionSuccess = createAction(
  ActionsHomeTypes.SYNC_CURRENT_COLLECTION_SUCCESS,
);

export const actionSyncCurrentCollectionError = createAction(
  ActionsHomeTypes.SYNC_CURRENT_COLLECTION_ERROR,
  props<{ payload: HttpErrorResponse }>(),
);
