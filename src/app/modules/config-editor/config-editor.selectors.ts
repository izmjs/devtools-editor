import { createFeatureSelector } from '@ngrx/store';
import { State, IConfigEditorState } from './config-editor.model';

export const selectConfigEditorState = createFeatureSelector<
  State,
  IConfigEditorState
>('config-editor');
