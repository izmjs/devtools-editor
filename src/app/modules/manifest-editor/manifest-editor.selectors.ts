import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State, IManifestEditorState } from './manifest-editor.model';

export const selectManifestEditorState = createFeatureSelector<
  State,
  IManifestEditorState
>('manifest-editor');

export const selectMetadata = createSelector(
  selectManifestEditorState,
  state => state.meta.data
);

export const selectInstalledModules = createSelector(
  selectManifestEditorState,
  state => state.dependencies.installed
);

export const selectDepsLoading = createSelector(
  selectManifestEditorState,
  state => state.dependencies.loading
);

export const selectSearchResult = createSelector(
  selectManifestEditorState,
  state => state.dependencies.list
);
